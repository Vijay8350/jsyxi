import type { Metadata } from "next";
import { DateTime } from "luxon";
import { BarChart3 } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { getWorkspaceUsage } from "@/lib/metering";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatTile, EmptyState } from "@/components/ui/misc";
import { UsageChart, type UsagePoint } from "@/components/app/panel-usage-chart";

export const metadata: Metadata = { title: "Analytics" };

const WINDOW_DAYS = 30;

export default async function AnalyticsPage() {
  const ctx = await requireWorkspaceContext();
  const wsId = ctx.workspace.id;
  const tz = ctx.workspace.timezone;

  // Last 30 local days [start, today].
  const today = DateTime.now().setZone(tz).startOf("day");
  const start = today.minus({ days: WINDOW_DAYS - 1 });
  const startColumnDate = new Date(`${start.toISODate()}T00:00:00.000Z`);

  const [usage, byDate, byWidget, widgets] = await Promise.all([
    getWorkspaceUsage(wsId),
    prisma.viewDailyAggregate.groupBy({
      by: ["date"],
      where: { workspaceId: wsId, date: { gte: startColumnDate } },
      _sum: { viewCount: true },
    }),
    prisma.viewDailyAggregate.groupBy({
      by: ["widgetId"],
      where: { workspaceId: wsId, date: { gte: startColumnDate } },
      _sum: { viewCount: true },
    }),
    prisma.widget.findMany({
      where: { workspaceId: wsId, lifecycleState: { notIn: ["purged", "soft_deleted"] } },
      select: { id: true, name: true, tool: { select: { name: true } } },
    }),
  ]);

  // Fill a dense 30-day series (0 for gaps).
  const countByDate = new Map<string, number>();
  for (const r of byDate) {
    const key = r.date.toISOString().slice(0, 10);
    countByDate.set(key, r._sum.viewCount ?? 0);
  }
  const series: UsagePoint[] = [];
  for (let i = 0; i < WINDOW_DAYS; i++) {
    const d = start.plus({ days: i });
    const key = d.toISODate() ?? "";
    series.push({ date: key, label: d.toFormat("dd LLL"), views: countByDate.get(key) ?? 0 });
  }

  // Per-widget totals for the window.
  const nameById = new Map(widgets.map((w) => [w.id, { name: w.name, tool: w.tool.name }]));
  const perWidget = byWidget
    .map((r) => ({
      id: r.widgetId,
      name: nameById.get(r.widgetId)?.name ?? "Deleted widget",
      tool: nameById.get(r.widgetId)?.tool ?? "—",
      views: r._sum.viewCount ?? 0,
    }))
    .filter((r) => r.views > 0)
    .sort((a, b) => b.views - a.views);

  const windowTotal = series.reduce((sum, p) => sum + p.views, 0);
  const barPct = usage.limit > 0 ? Math.min(100, Math.round((usage.used / usage.limit) * 100)) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Views across your widgets in {ctx.workspace.name}.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Views this period" value={usage.used.toLocaleString("en-IN")} hint={`of ${usage.limit.toLocaleString("en-IN")} included`} tone={usage.overLimit ? "amber" : "green"} />
        <StatTile label="Usage" value={`${usage.percent}%`} hint="of your monthly limit" tone={usage.overLimit ? "amber" : "brand"} />
        <StatTile label="Projected views" value={usage.forecast === null ? "—" : usage.forecast.toLocaleString("en-IN")} hint="Linear run-rate" tone="slate" />
        <StatTile label="Views · last 30 days" value={windowTotal.toLocaleString("en-IN")} hint="All widgets" tone="slate" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Views · last 30 days</CardTitle>
          <CardDescription>Counted views (bots and duplicates excluded), by local day.</CardDescription>
        </CardHeader>
        <CardBody className="pt-0">
          <UsageChart data={series} />
        </CardBody>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Plan usage</CardTitle>
            <CardDescription>{ctx.plan.name} plan</CardDescription>
          </CardHeader>
          <CardBody className="space-y-3 pt-0">
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold tabular-nums text-ink">{usage.used.toLocaleString("en-IN")}</span>
              <span className="text-sm text-slate-500">/ {usage.limit.toLocaleString("en-IN")} views</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={usage.overLimit ? "h-full rounded-full bg-amber-500" : "h-full rounded-full bg-brand-600"}
                style={{ width: `${Math.max(2, barPct)}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">
              {usage.overLimit
                ? "Over your monthly limit — widgets keep running, but branding is shown until you upgrade."
                : `${usage.percent}% of your monthly views used this period.`}
            </p>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Views by widget</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardBody className="pt-0">
            {perWidget.length === 0 ? (
              <EmptyState icon={<BarChart3 className="h-6 w-6" />} title="No views yet" description="Once your widgets get traffic, per-widget totals show up here." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-2 py-2.5 font-medium">Widget</th>
                      <th className="px-2 py-2.5 font-medium">Tool</th>
                      <th className="px-2 py-2.5 text-right font-medium">Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {perWidget.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-50">
                        <td className="px-2 py-2.5 font-medium text-ink">{w.name}</td>
                        <td className="px-2 py-2.5 text-slate-500">{w.tool}</td>
                        <td className="px-2 py-2.5 text-right tabular-nums text-ink">{w.views.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
