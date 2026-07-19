"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser, ACTIVE_WORKSPACE_COOKIE } from "@/lib/auth/current-user";

/** Switch the active workspace (validates membership) and reload the app. */
export async function switchWorkspaceAction(workspaceId: string) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const membership = await prisma.membership.findFirst({
    where: { userId: user.id, workspaceId, status: "active" },
    select: { id: true },
  });
  if (membership) {
    const jar = await cookies();
    jar.set(ACTIVE_WORKSPACE_COOKIE, workspaceId, {
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  redirect("/app");
}
