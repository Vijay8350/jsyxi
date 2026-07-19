"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/crypto";
import { createStaffSession, destroyStaffSession } from "@/lib/auth/session";
import { getCurrentStaff } from "@/lib/auth/current-user";
import { writeAudit } from "@/lib/audit";
import { loginSchema, fieldErrors } from "@/lib/validation";
import { fail, type ActionState } from "@/lib/actions/result";

// Staff (E22) authentication — separate identity from customer Users (RW-07).
export async function staffLoginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { email, password } = parsed.data;

  const staff = await prisma.staffUser.findUnique({ where: { email } });
  if (!staff || !(await verifyPassword(staff.passwordHash, password))) {
    return fail("Incorrect email or password.");
  }
  if (staff.status !== "active") return fail("This staff account has been disabled.");

  await createStaffSession(staff.id);
  await writeAudit({
    actor: { type: "staff", id: staff.id, label: `${staff.name} <${staff.email}>` },
    action: "staff.login",
    objectType: "StaffUser",
    objectId: staff.id,
    summary: `${staff.name} signed in to the admin panel`,
  });
  redirect("/admin");
}

export async function staffLogoutAction() {
  const staff = await getCurrentStaff();
  if (staff) {
    await writeAudit({
      actor: { type: "staff", id: staff.id, label: `${staff.name} <${staff.email}>` },
      action: "staff.logout",
      objectType: "StaffUser",
      objectId: staff.id,
      summary: `${staff.name} signed out`,
    });
  }
  await destroyStaffSession();
  redirect("/admin/login");
}
