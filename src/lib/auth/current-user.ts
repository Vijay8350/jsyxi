import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getUserSession, getStaffSession } from "@/lib/auth/session";
import type { User, Workspace, Membership, Plan } from "@/generated/prisma";

const ACTIVE_WS_COOKIE = "jsyxi_ws";

export async function getCurrentUser(): Promise<User | null> {
  const session = await getUserSession();
  return session?.user ?? null;
}

export type WorkspaceContext = {
  user: User;
  workspace: Workspace;
  membership: Membership;
  plan: Plan;
};

/** Resolve the user's active workspace (switch cookie → default → first membership). */
export async function getWorkspaceContext(): Promise<WorkspaceContext | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const memberships = await prisma.membership.findMany({
    where: { userId: user.id, status: "active" },
    include: { workspace: { include: { plan: true } } },
    orderBy: { createdAt: "asc" },
  });
  const active = memberships.filter((m) => m.workspace.status === "active");
  if (active.length === 0) return null;

  const jar = await cookies();
  const wanted = jar.get(ACTIVE_WS_COOKIE)?.value ?? user.defaultWorkspaceId ?? undefined;
  const chosen = active.find((m) => m.workspaceId === wanted) ?? active[0];

  return {
    user,
    workspace: chosen.workspace,
    membership: chosen,
    plan: chosen.workspace.plan,
  };
}

/** All workspaces the user can switch between (for the switcher UI). */
export async function listUserWorkspaces(userId: string) {
  const memberships = await prisma.membership.findMany({
    where: { userId, status: "active" },
    include: { workspace: { include: { plan: true } } },
    orderBy: { createdAt: "asc" },
  });
  return memberships
    .filter((m) => m.workspace.status === "active")
    .map((m) => ({ workspace: m.workspace, role: m.workspaceRole }));
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireWorkspaceContext(): Promise<WorkspaceContext> {
  const ctx = await getWorkspaceContext();
  if (!ctx) redirect("/login");
  return ctx;
}

// ── Staff ───────────────────────────────────────────────────────────────────
export async function getCurrentStaff() {
  const session = await getStaffSession();
  return session?.staff ?? null;
}

export async function requireStaff() {
  const staff = await getCurrentStaff();
  if (!staff) redirect("/admin/login");
  return staff;
}

export const ACTIVE_WORKSPACE_COOKIE = ACTIVE_WS_COOKIE;
