import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, UserPlus, Users } from "lucide-react";
import { requireStaff } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { financialYear, formatInTz } from "@/lib/time";
import { formatMoney } from "@/lib/money";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatTile, EmptyState } from "@/components/ui/misc";
import { PageHeader } from "@/components/admin/ui";
import { LEAD_STAGE_TONE, LEAD_STAGE_LABEL } from "@/components/admin/lead-meta";

export const metadata: Metadata = { title: "Admin dashboard" };

const OPEN_STAGES = ["new", "contacted", "proposal"] as const;

export default async function AdminDashboardPage() {
  const staff = await requireStaff();
  const fy = financialYear(new Date());

  const [
    signups, activeWs, freeWs, paidWs, totalWidgets, liveWidgets,
    openLeads, openTickets, revenue, recentLeads, recentSignups,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.workspace.count({ where: { status: "active" } }),
    prisma.workspace.count({ where: { status: "active", plan: { isFree: true } } }),
    prisma.workspace.count({ where: { status: "active", plan: { isFree: false } } }),
    prisma.widget.count({ where: { lifecycleState: { not: "purged" } } }),
    prisma.widget.count({ where: { lifecycleState: "published_active" } }),
    prisma.lead.count({ where: { pipelineStage: { in: [...OPEN_STAGES] } } }),
    prisma.ticket.count({ where: { state: "open" } }),
    prisma.invoice.aggregate({ _sum: { total: true }, where: { status: "paid", financialYear: fy } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

  const fyRevenue = revenue._sum.total ?? 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome, ${staff.name.split(" ")[0]}`}
        description="Platform overview across all workspaces and pipelines."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Signups" value={signups.toLocaleString("en-IN")} hint="Total customer users" tone="brand" />
        <StatTile label="Active workspaces" value={activeWs.toLocaleString("en-IN")} hint={`${paidWs} paid · ${freeWs} free`} tone="green" />
        <StatTile label="Live widgets" value={liveWidgets.toLocaleString("en-IN")} hint={`${totalWidgets} total`} tone="slate" />
        <StatTile label={`Revenue FY ${fy}`} value={formatMoney(fyRevenue)} hint="Paid invoices, GST-incl." tone="green" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Paid workspaces" value={paidWs.toLocaleString("en-IN")} tone="brand" />
        <StatTile label="Free workspaces" value={freeWs.toLocaleString("en-IN")} tone="slate" />
        <StatTile label="Open leads" value={openLeads.toLocaleString("en-IN")} hint="New · contacted · proposal" tone="amber" />
        <StatTile label="Open tickets" value={openTickets.toLocaleString("en-IN")} tone="amber" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent leads</CardTitle>
            <Link href="/admin/leads" className="text-sm font-medium text-brand-600 hover:text-brand-700">View all</Link>
          </CardHeader>
          <CardBody className="pt-0">
            {recentLeads.length === 0 ? (
              <EmptyState icon={<Users className="h-6 w-6" />} title="No leads yet" description="Inbound leads will appear here." />
            ) : (
              <ul className="divide-y divide-line">
                {recentLeads.map((l) => (
                  <li key={l.id}>
                    <Link href={`/admin/leads/${l.id}`} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-slate-50">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">{l.contactName}</span>
                        <span className="block truncate text-xs text-slate-500">{l.contactEmail} · {l.source}</span>
                      </span>
                      <Badge tone={LEAD_STAGE_TONE[l.pipelineStage]}>{LEAD_STAGE_LABEL[l.pipelineStage]}</Badge>
                      <ArrowRight className="h-4 w-4 text-slate-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        {/* Recent signups */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent signups</CardTitle>
            <Link href="/admin/workspaces" className="text-sm font-medium text-brand-600 hover:text-brand-700">Workspaces</Link>
          </CardHeader>
          <CardBody className="pt-0">
            {recentSignups.length === 0 ? (
              <EmptyState icon={<UserPlus className="h-6 w-6" />} title="No signups yet" />
            ) : (
              <ul className="divide-y divide-line">
                {recentSignups.map((u) => (
                  <li key={u.id} className="flex items-center gap-3 py-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                      {u.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{u.name}</span>
                      <span className="block truncate text-xs text-slate-500">{u.email}</span>
                    </span>
                    <span className="shrink-0 text-xs text-slate-400">{formatInTz(u.createdAt, undefined, "dd LLL yyyy")}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
