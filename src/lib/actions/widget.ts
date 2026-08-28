"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireWorkspaceContext, type WorkspaceContext } from "@/lib/auth/current-user";
import { workspaceCan } from "@/lib/permissions";
import { newEmbedKey } from "@/lib/ids";
import { toolByKey } from "@/lib/tools/registry";
import { defaultsFromSchema } from "@/lib/tools/types";
import { activeWidgetCount } from "@/lib/metering";
import { writeAudit } from "@/lib/audit";
import { normalizeHost } from "@/lib/utils";
import { widgetCreateSchema, widgetRenameSchema, fieldErrors } from "@/lib/validation";
import { fail, type ActionState } from "@/lib/actions/result";
import type { Widget } from "@/generated/prisma";

async function loadOwnWidget(widgetId: string): Promise<{ ctx: WorkspaceContext; widget: Widget }> {
  const ctx = await requireWorkspaceContext();
  const widget = await prisma.widget.findUnique({ where: { id: widgetId } });
  if (!widget || widget.workspaceId !== ctx.workspace.id) redirect("/app/widgets");
  return { ctx, widget: widget! };
}

function auditActor(ctx: WorkspaceContext) {
  return { type: "user" as const, id: ctx.user.id, label: `${ctx.user.name} <${ctx.user.email}>` };
}

// ── Create ───────────────────────────────────────────────────────────────────
export async function createWidgetAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ctx = await requireWorkspaceContext();
  if (!workspaceCan(ctx.membership.workspaceRole, "widget.write")) return fail("You don't have permission to create widgets.");

  const parsed = widgetCreateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { toolKey, name, templateId } = parsed.data;

  const tool = await prisma.tool.findUnique({ where: { key: toolKey } });
  const def = toolByKey(toolKey);
  if (!tool || !def || tool.status !== "published") return fail("That tool isn't available.");

  // INV-5: Single-App workspaces may only create widgets of their chosen tool.
  if (ctx.workspace.purchaseMode === "single_app" && ctx.workspace.singleAppToolId && ctx.workspace.singleAppToolId !== tool.id) {
    return fail("Your plan only allows one tool type. Contact us to switch tools.");
  }

  let config = defaultsFromSchema(def.schema);
  if (templateId) {
    const tpl = await prisma.template.findUnique({ where: { id: templateId } });
    if (tpl && tpl.toolId === tool.id) config = { ...config, ...(tpl.presetConfig as Record<string, unknown>) };
  }

  const widget = await prisma.widget.create({
    data: {
      workspaceId: ctx.workspace.id,
      toolId: tool.id,
      name,
      embedKey: newEmbedKey(),
      draftConfig: config as object,
      lifecycleState: "draft",
      configVersion: 1,
    },
  });
  await writeAudit({ actor: auditActor(ctx), action: "widget.create", objectType: "Widget", objectId: widget.id, summary: `Created widget "${name}" (${tool.name})` });
  redirect(`/app/widgets/${widget.id}`);
}

// ── Autosave draft (optimistic concurrency INV-12) ───────────────────────────
export type SaveDraftResult = { ok: boolean; configVersion?: number; conflict?: boolean; error?: string };

export async function saveDraftAction(input: {
  widgetId: string;
  config: Record<string, unknown>;
  name?: string;
  configVersion: number;
}): Promise<SaveDraftResult> {
  const { ctx, widget } = await loadOwnWidget(input.widgetId);
  if (!workspaceCan(ctx.membership.workspaceRole, "widget.write")) return { ok: false, error: "No permission" };
  if (widget.lifecycleState === "purged" || widget.lifecycleState === "soft_deleted") return { ok: false, error: "Widget unavailable" };
  if (widget.configVersion !== input.configVersion) return { ok: false, conflict: true, configVersion: widget.configVersion };

  const updated = await prisma.widget.update({
    where: { id: widget.id },
    data: {
      draftConfig: input.config as object,
      name: input.name?.trim() || widget.name,
      configVersion: { increment: 1 },
    },
    select: { configVersion: true },
  });
  return { ok: true, configVersion: updated.configVersion };
}

// ── Publish (INV-2/3/4 + audit INV-11) ───────────────────────────────────────
export async function publishWidgetAction(widgetId: string): Promise<ActionState> {
  const { ctx, widget } = await loadOwnWidget(widgetId);
  if (!workspaceCan(ctx.membership.workspaceRole, "widget.publish")) return fail("You don't have permission to publish.");

  const willBecomeActive = widget.lifecycleState !== "published_active";
  if (willBecomeActive) {
    const active = await activeWidgetCount(ctx.workspace.id);
    if (active >= ctx.plan.maxWidgets) {
      return fail(`Your ${ctx.plan.name} plan allows ${ctx.plan.maxWidgets} live widget${ctx.plan.maxWidgets === 1 ? "" : "s"}. Unpublish another or upgrade.`);
    }
  }

  await prisma.widget.update({
    where: { id: widget.id },
    data: {
      publishedConfig: widget.draftConfig as object,
      lifecycleState: "published_active",
      publishedAt: new Date(),
    },
  });
  await writeAudit({ actor: auditActor(ctx), action: "widget.publish", objectType: "Widget", objectId: widget.id, summary: `Published "${widget.name}"` });
  revalidatePath(`/app/widgets/${widget.id}`);
  return { ok: true, message: "Published — your changes are live." };
}

export async function unpublishWidgetAction(widgetId: string): Promise<ActionState> {
  const { ctx, widget } = await loadOwnWidget(widgetId);
  if (!workspaceCan(ctx.membership.workspaceRole, "widget.publish")) return fail("No permission.");
  await prisma.widget.update({ where: { id: widget.id }, data: { lifecycleState: "unpublished" } });
  await writeAudit({ actor: auditActor(ctx), action: "widget.unpublish", objectType: "Widget", objectId: widget.id, summary: `Unpublished "${widget.name}"` });
  revalidatePath(`/app/widgets/${widget.id}`);
  return { ok: true, message: "Widget unpublished." };
}

export async function softDeleteWidgetAction(widgetId: string): Promise<ActionState> {
  const { ctx, widget } = await loadOwnWidget(widgetId);
  if (!workspaceCan(ctx.membership.workspaceRole, "widget.delete")) return fail("No permission.");
  await prisma.widget.update({ where: { id: widget.id }, data: { lifecycleState: "soft_deleted", deletedAt: new Date() } });
  await writeAudit({ actor: auditActor(ctx), action: "widget.delete", objectType: "Widget", objectId: widget.id, summary: `Moved "${widget.name}" to trash` });
  redirect("/app/widgets");
}

export async function restoreWidgetAction(widgetId: string): Promise<ActionState> {
  const { ctx, widget } = await loadOwnWidget(widgetId);
  const restoreTo = widget.publishedConfig ? "unpublished" : "draft";
  await prisma.widget.update({ where: { id: widget.id }, data: { lifecycleState: restoreTo, deletedAt: null } });
  await writeAudit({ actor: auditActor(ctx), action: "widget.restore", objectType: "Widget", objectId: widget.id, summary: `Restored "${widget.name}"` });
  revalidatePath("/app/widgets");
  return { ok: true, message: "Widget restored." };
}

export async function renameWidgetAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = widgetRenameSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Enter a valid name.", fieldErrors(parsed.error));
  const { ctx, widget } = await loadOwnWidget(parsed.data.widgetId);
  if (!workspaceCan(ctx.membership.workspaceRole, "widget.write")) return fail("No permission.");
  await prisma.widget.update({ where: { id: widget.id }, data: { name: parsed.data.name } });
  revalidatePath(`/app/widgets/${widget.id}`);
  return { ok: true, message: "Renamed." };
}

export async function updateAllowedDomainsAction(widgetId: string, domainsRaw: string): Promise<ActionState> {
  const { ctx, widget } = await loadOwnWidget(widgetId);
  if (!workspaceCan(ctx.membership.workspaceRole, "widget.write")) return fail("No permission.");
  const domains = Array.from(
    new Set(
      domainsRaw
        .split(/[\n,]+/)
        .map((d) => normalizeHost(d))
        .filter(Boolean),
    ),
  );
  await prisma.widget.update({ where: { id: widget.id }, data: { allowedDomains: domains } });
  await writeAudit({ actor: auditActor(ctx), action: "widget.domains", objectType: "Widget", objectId: widget.id, summary: `Updated allowed domains (${domains.length || "any"})` });
  revalidatePath(`/app/widgets/${widget.id}`);
  return { ok: true, message: domains.length ? `Restricted to ${domains.length} domain(s).` : "Allowed on any domain." };
}
