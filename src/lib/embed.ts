import { prisma } from "@/lib/db";
import { getWorkspaceUsage } from "@/lib/metering";
import type { Widget, Tool, Workspace, Plan } from "@/generated/prisma";

export type ResolvedEmbed = {
  widget: Widget;
  tool: Tool;
  workspace: Workspace & { plan: Plan };
  config: Record<string, unknown>;
  brandingShown: boolean;
};

/**
 * Resolve a published widget by embed key. Returns null unless published_active (INV-2).
 * Branding is shown when the plan can't remove it OR usage is over the soft limit (F-LIMIT).
 */
export async function resolveEmbed(embedKey: string): Promise<ResolvedEmbed | null> {
  const widget = await prisma.widget.findUnique({
    where: { embedKey },
    include: { tool: true, workspace: { include: { plan: true } } },
  });
  if (!widget || widget.lifecycleState !== "published_active" || !widget.publishedConfig) return null;
  if (widget.workspace.status !== "active") return null;

  const usage = await getWorkspaceUsage(widget.workspaceId);
  const brandingShown = !widget.workspace.plan.brandingRemovable || usage.forceBranding;

  return {
    widget,
    tool: widget.tool,
    workspace: widget.workspace,
    config: widget.publishedConfig as Record<string, unknown>,
    brandingShown,
  };
}
