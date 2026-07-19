import Link from "next/link";
import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import type { Prisma } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { PageHeader, TableCard, AccessDenied } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Audit log" };

const ACTOR_TONE = { staff: "brand", user: "blue", system: "slate" } as const;

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ objectType?: string }> }) {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "audit")) return <AccessDenied section="audit" />;

  const { objectType } = await searchParams;
  const where: Prisma.AuditLogEntryWhereInput = objectType ? { objectType } : {};

  const [entries, distinct] = await Promise.all([
    prisma.auditLogEntry.findMany({ where, orderBy: { occurredAt: "desc" }, take: 300 }),
    prisma.auditLogEntry.findMany({ distinct: ["objectType"], select: { objectType: true }, orderBy: { objectType: "asc" } }),
  ]);
  const objectTypes = distinct.map((d) => d.objectType);

  return (
    <div className="space-y-6">
      <PageHeader title="Audit log" description="Every sensitive transition, newest first (INV-11, §12)." />

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-500">Object type:</span>
        <Link href="/admin/audit" className={!objectType ? "font-semibold text-brand-600" : "text-slate-500 hover:text-ink"}>All</Link>
        {objectTypes.map((t) => (
          <Link
            key={t}
            href={`/admin/audit?objectType=${encodeURIComponent(t)}`}
            className={objectType === t ? "font-semibold text-brand-600" : "text-slate-500 hover:text-ink"}
          >
            {t}
          </Link>
        ))}
      </div>

      {entries.length === 0 ? (
        <TableCard><EmptyState title="No audit entries" description="Actions will be logged here." /></TableCard>
      ) : (
        <TableCard>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Actor</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Object</th>
                <th className="px-4 py-3 font-medium">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {entries.map((e) => (
                <tr key={e.id} className="align-top hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatInTz(e.occurredAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Badge tone={ACTOR_TONE[e.actorType]}>{e.actorType}</Badge>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{e.actorLabel}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-600">{e.action}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {e.objectType}
                    {e.objectId && <div className="font-mono text-xs text-slate-400">{e.objectId}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{e.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      )}
    </div>
  );
}
