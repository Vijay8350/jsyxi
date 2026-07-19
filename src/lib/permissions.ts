import type { StaffRole, WorkspaceRole } from "@/generated/prisma";

// §10 permissions matrix. INC-1 ships Owner only (RW-10); Editor/Viewer defined for [LATER].

export type WorkspaceCapability =
  | "widget.read"
  | "widget.write"
  | "widget.publish"
  | "widget.delete"
  | "member.invite" // [LATER]
  | "billing.view"
  | "billing.manage" // Admin-only in INC-1 (assignment)
  | "project.manage"; // [LATER]

const WORKSPACE_ROLE_CAPS: Record<WorkspaceRole, WorkspaceCapability[]> = {
  owner: ["widget.read", "widget.write", "widget.publish", "widget.delete", "billing.view"],
  editor: ["widget.read", "widget.write", "widget.publish"],
  viewer: ["widget.read"],
};

export function workspaceCan(role: WorkspaceRole, cap: WorkspaceCapability): boolean {
  return WORKSPACE_ROLE_CAPS[role]?.includes(cap) ?? false;
}

// Staff (admin) sections keyed to seeded roles (§10 staff table).
export type AdminSection =
  | "dashboard"
  | "workspaces"
  | "catalog" // Tools + Templates + categories/badges
  | "plans" // Plans & pricing, manual assignment
  | "leads" // Leads / CRM
  | "invoices"
  | "content" // Content / Blog / CMS
  | "reviews" // Reviews/testimonials moderation
  | "tickets" // Support (stub)
  | "roles" // Staff & roles
  | "settings"
  | "audit";

const STAFF_ROLE_SECTIONS: Record<StaffRole, AdminSection[]> = {
  owner_admin: [
    "dashboard", "workspaces", "catalog", "plans", "leads", "invoices",
    "content", "reviews", "tickets", "roles", "settings", "audit",
  ],
  marketing: ["dashboard", "content", "reviews", "catalog"],
  sales: ["dashboard", "leads", "workspaces"],
  support: ["dashboard", "tickets", "workspaces"],
  content: ["dashboard", "content"],
  finance: ["dashboard", "invoices", "plans", "workspaces"],
};

export function staffCanAccess(role: StaffRole, section: AdminSection): boolean {
  return STAFF_ROLE_SECTIONS[role]?.includes(section) ?? false;
}

export function staffSections(role: StaffRole): AdminSection[] {
  return STAFF_ROLE_SECTIONS[role] ?? [];
}

export const STAFF_ROLE_LABELS: Record<StaffRole, string> = {
  owner_admin: "Owner / Admin",
  marketing: "Marketing",
  sales: "Sales",
  support: "Support",
  content: "Content",
  finance: "Finance",
};
