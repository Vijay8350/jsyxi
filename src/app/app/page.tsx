import Link from "next/link";
import type { Metadata } from "next";
import { Plus, ArrowRight, Eye, LayoutGrid, TrendingUp, Inbox } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { getWorkspaceUsage } from "@/lib/metering";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile, EmptyState } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { toolIcon } from "@/lib/tools/icons";
import { widgetStatus } from "@/lib/widget-status";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const ctx = await requireWorkspaceContext();
  const wsId = ctx.workspace.id;

  const [usage, widgetTotal, activeCount, recentWidgets, leadCount, unreadNotes] = await Promise.all([
    getWorkspaceUsage(wsId),
    prisma.widget.count({ where: { workspaceId: wsId, lifecycleState: { not: "purged" } } }),
    prisma.widget.count({ where: { workspaceId: wsId, lifecycleState: "published_active" } }),
    prisma.widget.findMany({
      where: { workspaceId: wsId, lifecycleState: { notIn: ["purged", "soft_deleted"] } },
      include: { tool: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.lead.count({ where: { workspaceId: wsId } }),
    prisma.notification.findMany({ where: { recipientUserId: ctx.user.id, readAt: null }, orderBy: { createdAt: "desc" }, take: 4 }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Welcome back, {ctx.user.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening in {ctx.workspace.name}.</p>
        </div>
        <ButtonLink href="/app/catalog"><Plus className="h-4 w-4" /> New widget</ButtonLink>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Live widgets" value={`${activeCount}`} hint={`${widgetTotal} total`} tone="brand" />
        <StatTile label="Views this period" value={usage.used.toLocaleString("en-IN")} hint={`of ${usage.limit.toLocaleString("en-IN")} limit`} tone={usage.overLimit ? "amber" : "green"} />
        <StatTile label="Projected views" value={usage.forecast === null ? "—" : usage.forecast.toLocaleString("en-IN")} hint="Linear run-rate" tone="slate" />
        <StatTile label="Leads captured" value={`${leadCount}`} hint="All time" tone="slate" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent widgets */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent widgets</CardTitle>
            <Link href="/app/widgets" className="text-sm font-medium text-brand-600 hover:text-brand-700">View all</Link>
          </CardHeader>
          <CardBody className="pt-0">
            {recentWidgets.length === 0 ? (
              <EmptyState
                icon={<LayoutGrid className="h-6 w-6" />}
                title="No widgets yet"
                description="Create your first widget from the catalog and embed it anywhere."
                action={<ButtonLink href="/app/catalog"><Plus className="h-4 w-4" /> Browse tools</ButtonLink>}
              />
            ) : (
              <ul className="divide-y divide-line">
                {recentWidgets.map((w) => {
                  const Icon = toolIcon(w.tool.key);
                  const s = widgetStatus(w.lifecycleState);
                  return (
                    <li key={w.id}>
                      <Link href={`/app/widgets/${w.id}`} className="flex items-center gap-3 py-3 hover:bg-slate-50 -mx-2 px-2 rounded-lg">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Icon className="h-5 w-5" /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-ink">{w.name}</span>
                          <span className="block text-xs text-slate-500">{w.tool.name}</span>
                        </span>
                        <Badge tone={s.tone}>{s.label}</Badge>
                        <ArrowRight className="h-4 w-4 text-slate-300" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardBody>
        </Card>

        {/* Side column */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Quick actions</CardTitle></CardHeader>
            <CardBody className="space-y-2 pt-0">
              <Link href="/app/catalog" className="flex items-center gap-3 rounded-lg border border-line p-3 text-sm hover:bg-slate-50">
                <Plus className="h-4 w-4 text-brand-600" /> Create a widget
              </Link>
              <Link href="/app/analytics" className="flex items-center gap-3 rounded-lg border border-line p-3 text-sm hover:bg-slate-50">
                <TrendingUp className="h-4 w-4 text-brand-600" /> View analytics
              </Link>
              <Link href="/app/service-requests" className="flex items-center gap-3 rounded-lg border border-line p-3 text-sm hover:bg-slate-50">
                <Inbox className="h-4 w-4 text-brand-600" /> Service requests
              </Link>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
            <CardBody className="pt-0">
              {unreadNotes.length === 0 ? (
                <p className="py-4 text-center text-sm text-slate-400">You&apos;re all caught up.</p>
              ) : (
                <ul className="space-y-3">
                  {unreadNotes.map((n) => (
                    <li key={n.id} className="flex gap-2 text-sm">
                      <Eye className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span className="text-slate-600">{n.subject ?? n.body}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
