"use server";

import { prisma } from "@/lib/db";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { createLead } from "@/lib/leads";
import { writeAudit } from "@/lib/audit";
import { fail, succeed, type ActionState } from "@/lib/actions/result";

// INC-1 has no self-serve checkout (A2-01 / INV-10). "Request upgrade" files a sales
// lead so the team can assign the plan manually.
export async function requestUpgradeAction(planSlug: string): Promise<ActionState> {
  const ctx = await requireWorkspaceContext();

  const plan = await prisma.plan.findUnique({ where: { slug: planSlug } });
  if (!plan || plan.status !== "active") return fail("That plan isn't available.");
  if (plan.id === ctx.plan.id) return fail("You're already on this plan.");

  await createLead({
    source: "request_upgrade",
    serviceTopic: "request-upgrade",
    name: ctx.user.name,
    email: ctx.user.email,
    message: `Requesting ${plan.name} for ${ctx.workspace.name}`,
    workspaceId: ctx.workspace.id,
  });

  await writeAudit({
    actor: { type: "user", id: ctx.user.id, label: `${ctx.user.name} <${ctx.user.email}>` },
    action: "plan.upgrade_request",
    objectType: "Workspace",
    objectId: ctx.workspace.id,
    summary: `Requested upgrade to ${plan.name}`,
  });

  return succeed("Thanks — our team will reach out shortly to help you upgrade.");
}
