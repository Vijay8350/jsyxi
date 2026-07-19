"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/current-user";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import { createTotpSecret, totpQrDataUrl, verifyTotp } from "@/lib/auth/totp";
import { destroyUserSession } from "@/lib/auth/session";
import { writeAudit } from "@/lib/audit";
import { profileNameSchema, passwordChangeSchema, fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import type { User } from "@/generated/prisma";

function actorFor(user: Pick<User, "id" | "name" | "email">) {
  return { type: "user" as const, id: user.id, label: `${user.name} <${user.email}>` };
}

// ── (a) Profile ───────────────────────────────────────────────────────────────
export async function updateProfileAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = profileNameSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));

  await prisma.user.update({ where: { id: user.id }, data: { name: parsed.data.name } });
  revalidatePath("/app/profile");
  return succeed("Profile updated.");
}

// ── (b) Change password ───────────────────────────────────────────────────────
export async function changePasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = passwordChangeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));

  const fresh = await prisma.user.findUniqueOrThrow({ where: { id: user.id } });
  if (!(await verifyPassword(fresh.passwordHash, parsed.data.currentPassword))) {
    return fail("Your current password is incorrect.", { currentPassword: "Incorrect password" });
  }
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(parsed.data.newPassword) } });
  await writeAudit({ actor: actorFor(user), action: "user.password_change", objectType: "User", objectId: user.id, summary: "Changed password" });
  return succeed("Password changed.");
}

// ── (c) Two-factor ────────────────────────────────────────────────────────────
export type BeginEnableResult =
  | { ok: true; uri: string; qr: string; encrypted: string }
  | { ok: false; error: string };

/** Stash a pending encrypted secret client-side, render its QR; nothing is persisted yet. */
export async function beginEnable2FA(): Promise<BeginEnableResult> {
  const user = await requireUser();
  if (user.twoFactorEnabledAt) return { ok: false, error: "Two-factor is already enabled." };
  const { uri, encrypted } = createTotpSecret(user.email);
  const qr = await totpQrDataUrl(uri);
  return { ok: true, uri, qr, encrypted };
}

/** Confirm the pending secret with a code, then persist it + enable timestamp. */
export async function confirmEnable2FA(encrypted: string, code: string): Promise<ActionState> {
  const user = await requireUser();
  if (user.twoFactorEnabledAt) return fail("Two-factor is already enabled.");
  if (!/^\d{6}$/.test(code.trim())) return fail("Enter the 6-digit code.");
  if (!verifyTotp(encrypted, code, user.email)) return fail("That code is incorrect. Check your authenticator and try again.");

  await prisma.user.update({ where: { id: user.id }, data: { twoFactorSecret: encrypted, twoFactorEnabledAt: new Date() } });
  await writeAudit({ actor: actorFor(user), action: "user.2fa_enable", objectType: "User", objectId: user.id, summary: "Enabled two-factor authentication" });
  revalidatePath("/app/profile");
  return succeed("Two-factor authentication is on.");
}

export async function disable2FAAction(code: string): Promise<ActionState> {
  const user = await requireUser();
  const fresh = await prisma.user.findUniqueOrThrow({ where: { id: user.id } });
  if (!fresh.twoFactorEnabledAt || !fresh.twoFactorSecret) return fail("Two-factor isn't enabled.");
  if (!/^\d{6}$/.test(code.trim())) return fail("Enter the 6-digit code.");
  if (!verifyTotp(fresh.twoFactorSecret, code, user.email)) return fail("That code is incorrect.");

  await prisma.user.update({ where: { id: user.id }, data: { twoFactorSecret: null, twoFactorEnabledAt: null } });
  await writeAudit({ actor: actorFor(user), action: "user.2fa_disable", objectType: "User", objectId: user.id, summary: "Disabled two-factor authentication" });
  revalidatePath("/app/profile");
  return succeed("Two-factor authentication is off.");
}

// ── (d) Delete account (soft-delete) ──────────────────────────────────────────
export async function deleteAccountAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const confirm = String(formData.get("confirm") ?? "").trim();
  if (confirm !== "DELETE") return fail('Type "DELETE" to confirm.', { confirm: 'Type DELETE to confirm.' });

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { status: "deactivated" } }),
    prisma.workspace.updateMany({
      where: { ownerUserId: user.id, status: "active" },
      data: { status: "soft_deleted", deletedAt: new Date() },
    }),
  ]);
  await writeAudit({ actor: actorFor(user), action: "user.delete", objectType: "User", objectId: user.id, summary: "Soft-deleted account and owned workspaces (self-service)" });

  await destroyUserSession();
  redirect("/");
}
