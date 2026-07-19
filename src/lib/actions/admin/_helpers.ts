import "server-only";
import { getCurrentStaff } from "@/lib/auth/current-user";
import { staffCanAccess, type AdminSection } from "@/lib/permissions";
import type { StaffRole, StaffUser } from "@/generated/prisma";

// Shared guards for admin server actions. Not a "use server" module (exports sync helpers),
// so action files import from here rather than re-implementing gating.

export type StaffGuard =
  | { ok: true; staff: StaffUser }
  | { ok: false; error: string };

/** Ensure a live staff session that may access `section`. */
export async function requireStaffSection(section: AdminSection): Promise<StaffGuard> {
  const staff = await getCurrentStaff();
  if (!staff) return { ok: false, error: "Your staff session expired. Please sign in again." };
  if (!staffCanAccess(staff.staffRole, section)) {
    return { ok: false, error: "You don't have access to this section." };
  }
  return { ok: true, staff };
}

/** Ensure a live staff session whose role is one of `roles`. */
export async function requireStaffRole(...roles: StaffRole[]): Promise<StaffGuard> {
  const staff = await getCurrentStaff();
  if (!staff) return { ok: false, error: "Your staff session expired. Please sign in again." };
  if (!roles.includes(staff.staffRole)) {
    return { ok: false, error: "You don't have permission to perform this action." };
  }
  return { ok: true, staff };
}

/** Billing (plan assignment, invoice void) is Finance or Owner/Admin only (A2-01, §3.2). */
export function canManageBilling(role: StaffRole): boolean {
  return role === "finance" || role === "owner_admin";
}

export function staffActor(staff: StaffUser) {
  return { type: "staff" as const, id: staff.id, label: `${staff.name} <${staff.email}>` };
}
