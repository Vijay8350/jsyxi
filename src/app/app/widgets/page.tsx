import type { Metadata } from "next";
import { Plus, LayoutGrid } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { WidgetsView, type WidgetRow } from "@/components/app/widgets-view";
import { EmptyState } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { widgetStatus } from "@/lib/widget-status";
import { formatInTz } from "@/lib/time";

export const metadata: Metadata = { title: "My Widgets" };

export default async function WidgetsPage() {
  const ctx = await requireWorkspaceContext();
  const widgets = await prisma.widget.findMany({
    where: { workspaceId: ctx.workspace.id, lifecycleState: { notIn: ["purged", "soft_deleted"] } },
    include: { tool: true },
    orderBy: { updatedAt: "desc" },
  });

  const rows: WidgetRow[] = widgets.map((w) => {
    const s = widgetStatus(w.lifecycleState);
    return {
      id: w.id, name: w.name, toolKey: w.tool.key, toolName: w.tool.name,
      statusLabel: s.label, statusTone: s.tone,
      createdAt: w.createdAt.toISOString(), updatedAt: w.updatedAt.toISOString(),
      updatedLabel: formatInTz(w.updatedAt, ctx.workspace.timezone, "dd LLL, HH:mm"),
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">My Widgets</h1>
          <p className="mt-1 text-sm text-slate-500">{rows.length} widget{rows.length === 1 ? "" : "s"} in {ctx.workspace.name}.</p>
        </div>
        <ButtonLink href="/app/catalog"><Plus className="h-4 w-4" /> New widget</ButtonLink>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          icon={<LayoutGrid className="h-6 w-6" />}
          title="No widgets yet"
          description="Browse the catalog and create your first widget in minutes."
          action={<ButtonLink href="/app/catalog"><Plus className="h-4 w-4" /> Browse tools</ButtonLink>}
        />
      ) : (
        <WidgetsView widgets={rows} />
      )}
    </div>
  );
}
