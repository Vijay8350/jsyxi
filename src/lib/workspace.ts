import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { addMonths } from "@/lib/time";
import { newRefCode } from "@/lib/ids";

/** Generate a globally-unique workspace slug from a base string. */
export async function uniqueWorkspaceSlug(base: string): Promise<string> {
  const root = slugify(base) || "workspace";
  let candidate = root;
  for (let i = 0; i < 50; i++) {
    const exists = await prisma.workspace.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!exists) return candidate;
    candidate = `${root}-${newRefCode("").replace("-", "").toLowerCase().slice(0, 4)}`;
  }
  return `${root}-${Date.now().toString(36)}`;
}

/** Provision a new workspace on the Free plan with owner membership, subscription, usage counter. */
export async function provisionWorkspace(userId: string, name: string, timezone = "Asia/Kolkata") {
  const freePlan = await prisma.plan.findUniqueOrThrow({ where: { slug: "free" } });
  const slug = await uniqueWorkspaceSlug(name);
  const now = new Date();

  const workspace = await prisma.workspace.create({
    data: {
      name,
      slug,
      ownerUserId: userId,
      planId: freePlan.id,
      purchaseMode: "all_access",
      billingCurrency: "INR",
      timezone,
      status: "active",
      memberships: { create: { userId, workspaceRole: "owner", status: "active" } },
      subscriptions: {
        create: { planId: freePlan.id, state: "free", currentPeriodStart: now, currentPeriodEnd: addMonths(now, 1, timezone) },
      },
      usageRolling: {
        create: { currentPeriodViewTotal: 0, periodStart: now, periodEnd: addMonths(now, 1, timezone) },
      },
    },
  });

  return workspace;
}
