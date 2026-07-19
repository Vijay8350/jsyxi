"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword, randomToken, sha256hex, encryptSecret, decryptSecret } from "@/lib/crypto";
import { createUserSession, destroyUserSession } from "@/lib/auth/session";
import { verifyTotp } from "@/lib/auth/totp";
import { provisionWorkspace } from "@/lib/workspace";
import { sendMail } from "@/lib/mail";
import { signupSchema, loginSchema, forgotSchema, resetSchema, totpSchema, fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";

const TWOFA_COOKIE = "jsyxi_2fa";
const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

async function createVerification(userId: string, purpose: "email_verify" | "password_reset", ttlMinutes: number) {
  const token = randomToken();
  await prisma.verificationToken.create({
    data: { userId, hashed: sha256hex(token), purpose, expiresAt: new Date(Date.now() + ttlMinutes * 60000) },
  });
  return token;
}

async function reqMeta() {
  const h = await headers();
  return { userAgent: h.get("user-agent") ?? undefined, ip: h.get("x-forwarded-for")?.split(",")[0] ?? undefined };
}

export async function signupAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signupSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { name, email, password, workspaceName } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return fail("An account with this email already exists.", { email: "Email already in use" });

  const user = await prisma.user.create({
    data: { name, email, passwordHash: await hashPassword(password), status: "active" },
  });
  const ws = await provisionWorkspace(user.id, workspaceName?.trim() || `${name.split(" ")[0]}'s workspace`);
  await prisma.user.update({ where: { id: user.id }, data: { defaultWorkspaceId: ws.id } });

  const token = await createVerification(user.id, "email_verify", 60 * 24);
  await sendMail({
    to: email,
    templateKey: "email_verify",
    subject: "Verify your jsyxi email",
    body: `Welcome to jsyxi! Confirm your email:\n${APP_URL}/verify?token=${token}`,
    recipientUserId: user.id,
    linkHref: `/verify?token=${token}`,
  });

  await createUserSession(user.id, await reqMeta());
  redirect("/app");
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(user.passwordHash, password))) {
    return fail("Incorrect email or password.");
  }
  if (user.status === "deactivated") return fail("This account has been deactivated.");

  if (user.twoFactorEnabledAt && user.twoFactorSecret) {
    const jar = await cookies();
    jar.set(TWOFA_COOKIE, encryptSecret(JSON.stringify({ userId: user.id, exp: Date.now() + 10 * 60000 })), {
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 600,
    });
    redirect("/2fa");
  }

  await createUserSession(user.id, await reqMeta());
  redirect("/app");
}

export async function verifyTwoFactorLoginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = totpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Enter the 6-digit code.", fieldErrors(parsed.error));

  const jar = await cookies();
  const raw = jar.get(TWOFA_COOKIE)?.value;
  if (!raw) return fail("Your session expired. Please log in again.");
  let payload: { userId: string; exp: number };
  try {
    payload = JSON.parse(decryptSecret(raw));
  } catch {
    return fail("Your session expired. Please log in again.");
  }
  if (payload.exp < Date.now()) return fail("The code request expired. Please log in again.");

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user?.twoFactorSecret) return fail("Two-factor is not set up.");
  if (!verifyTotp(user.twoFactorSecret, parsed.data.code, user.email)) return fail("That code is incorrect.");

  jar.delete(TWOFA_COOKIE);
  await createUserSession(user.id, await reqMeta());
  redirect("/app");
}

export async function requestResetAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = forgotSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Enter a valid email.", fieldErrors(parsed.error));
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (user) {
    const token = await createVerification(user.id, "password_reset", 60);
    await sendMail({
      to: user.email,
      templateKey: "password_reset",
      subject: "Reset your jsyxi password",
      body: `Reset your password (valid 1 hour):\n${APP_URL}/reset?token=${token}`,
      recipientUserId: user.id,
      linkHref: `/reset?token=${token}`,
    });
  }
  // Always succeed (don't leak whether the email exists).
  return succeed("If that email exists, a reset link is on its way.");
}

export async function resetPasswordAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = resetSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please choose a stronger password.", fieldErrors(parsed.error));

  const rec = await prisma.verificationToken.findUnique({ where: { hashed: sha256hex(parsed.data.token) } });
  if (!rec || rec.purpose !== "password_reset" || rec.consumedAt || rec.expiresAt < new Date()) {
    return fail("This reset link is invalid or has expired.");
  }
  await prisma.$transaction([
    prisma.user.update({ where: { id: rec.userId }, data: { passwordHash: await hashPassword(parsed.data.password) } }),
    prisma.verificationToken.update({ where: { id: rec.id }, data: { consumedAt: new Date() } }),
    prisma.session.deleteMany({ where: { userId: rec.userId } }), // sign out other sessions
  ]);
  return succeed("Password updated. You can now log in.");
}

export async function logoutAction() {
  await destroyUserSession();
  redirect("/login");
}
