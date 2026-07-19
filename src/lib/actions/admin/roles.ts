"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/crypto";
import { writeAudit } from "@/lib/audit";
import { emailSchema, fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffRole, staffActor } from "@/lib/actions/admin/_helpers";

const STAFF_ROLES = ["owner_admin", "marketing", "sales", "support", "content", "finance"] as const;

const createSchema = z.object({
  name: z.string().trim().min(1, "Enter a name").max(120),
  email: emailSchema,
  staffRole: z.enum(STAFF_ROLES),
  password: z.string().min(8, "Use at least 8 characters").max(200),
});

// owner_admin only.
export async function createStaffAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffRole("owner_admin");
  if (!guard.ok) return fail(guard.error);

  const parsed = createSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { name, email, staffRole, password } = parsed.data;

  const existing = await prisma.staffUser.findUnique({ where: { email } });
  if (existing) return fail("A staff account with this email already exists.", { email: "Email already in use" });

  const created = await prisma.staffUser.create({
    data: { name, email, staffRole, passwordHash: await hashPassword(password), status: "active" },
  });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "staff.create",
    objectType: "StaffUser",
    objectId: created.id,
    summary: `Created staff ${name} <${email}> as ${staffRole}`,
    after: { name, email, staffRole },
  });
  revalidatePath("/admin/roles");
  return succeed("Staff member created.");
}

export async function toggleStaffStatusAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffRole("owner_admin");
  if (!guard.ok) return fail(guard.error);

  const staffId = String(formData.get("staffId") ?? "");
  if (staffId === guard.staff.id) return fail("You can't change your own status.");

  const target = await prisma.staffUser.findUnique({ where: { id: staffId } });
  if (!target) return fail("Staff member not found.");
  const next = target.status === "active" ? "disabled" : "active";

  await prisma.staffUser.update({ where: { id: staffId }, data: { status: next } });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "staff.status",
    objectType: "StaffUser",
    objectId: staffId,
    summary: `${next === "active" ? "Enabled" : "Disabled"} staff ${target.name}`,
    before: { status: target.status },
    after: { status: next },
  });
  revalidatePath("/admin/roles");
  return succeed(`Staff ${next === "active" ? "enabled" : "disabled"}.`);
}
