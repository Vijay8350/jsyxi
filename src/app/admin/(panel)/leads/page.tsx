import Link from "next/link";
import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import type { LeadStage, Prisma } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { StatTile, EmptyState } from "@/components/ui/misc";
import { PageHeader, TableCard, AccessDenied } from "@/components/admin/ui";
import { LEAD_STAGES, LEAD_STAGE_LABEL, LEAD_STAGE_TONE } from "@/components/admin/lead-meta";

export const metadata: Metadata = { title: "Leads / CRM" };

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ stage?: string; queue?: string }> }) {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "leads")) return <AccessDenied section="leads" />;

  const { stage, queue } = await searchParams;
  const stageFilter = LEAD_STAGES.includes(stage as LeadStage) ? (stage as LeadStage) : undefined;

  const where: Prisma.LeadWhereInput = {
    ...(stageFilter ? { pipelineStage: stageFilter } : {}),
    ...(queue ? { assignedQueueId: queue } : {}),
  };

  const [queues, leads, counts] = await Promise.all([
    prisma.leadQueue.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.lead.findMany({ where, include: { assignedQueue: true, assignedStaff: true }, orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.lead.groupBy({ by: ["pipelineStage"], _count: true }),
  ]);

  const countByStage = Object.fromEntries(counts.map((c) => [c.pipelineStage, c._count])) as Record<LeadStage, number>;

  const buildQuery = (patch: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { stage: stageFilter, queue, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v) params.set(k, v);
    const s = params.toString();
    return s ? `/admin/leads?${s}` : "/admin/leads";
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Leads / CRM" description="Inbound sales pipeline across all sources." />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {LEAD_STAGES.map((s) => (
          <Link key={s} href={buildQuery({ stage: stageFilter === s ? undefined : s })}>
            <StatTile label={LEAD_STAGE_LABEL[s]} value={countByStage[s] ?? 0} tone={stageFilter === s ? "brand" : "slate"} />
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-500">Queue:</span>
        <Link href={buildQuery({ queue: undefined })} className={!queue ? "font-semibold text-brand-600" : "text-slate-500 hover:text-ink"}>All</Link>
        {queues.map((q) => (
          <Link key={q.id} href={buildQuery({ queue: queue === q.id ? undefined : q.id })} className={queue === q.id ? "font-semibold text-brand-600" : "text-slate-500 hover:text-ink"}>
            {q.name}
          </Link>
        ))}
        {(stageFilter || queue) && (
          <Link href="/admin/leads" className="ml-auto text-xs text-slate-400 hover:text-ink">Clear filters</Link>
        )}
      </div>

      {leads.length === 0 ? (
        <TableCard><EmptyState title="No leads" description="No leads match the current filters." /></TableCard>
      ) : (
        <TableCard>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Queue</th>
                <th className="px-4 py-3 font-medium">Assignee</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${l.id}`} className="font-medium text-brand-600 hover:text-brand-700">{l.contactName}</Link>
                    <div className="text-xs text-slate-400">{l.contactEmail}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{l.source}</td>
                  <td className="px-4 py-3 text-slate-600">{l.assignedQueue?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{l.assignedStaff?.name ?? "—"}</td>
                  <td className="px-4 py-3"><Badge tone={LEAD_STAGE_TONE[l.pipelineStage]}>{LEAD_STAGE_LABEL[l.pipelineStage]}</Badge></td>
                  <td className="px-4 py-3 text-slate-500">{formatInTz(l.createdAt, undefined, "dd LLL yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      )}
    </div>
  );
}
