import Link from "next/link";
import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import type { Prisma, TicketState } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { PageHeader, TableCard, AccessDenied } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Tickets" };

const STATE_TONE: Record<string, "amber" | "green" | "slate"> = { open: "amber", resolved: "green", pending: "slate", closed: "slate" };

export default async function TicketsPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "tickets")) return <AccessDenied section="tickets" />;

  const { state } = await searchParams;
  const stateFilter = state === "open" || state === "resolved" ? (state as TicketState) : undefined;
  const where: Prisma.TicketWhereInput = stateFilter ? { state: stateFilter } : {};

  const tickets = await prisma.ticket.findMany({
    where,
    include: { workspace: true, _count: { select: { messages: true } } },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const filters: { key: string; label: string; href: string }[] = [
    { key: "all", label: "All", href: "/admin/tickets" },
    { key: "open", label: "Open", href: "/admin/tickets?state=open" },
    { key: "resolved", label: "Resolved", href: "/admin/tickets?state=resolved" },
  ];
  const activeKey = stateFilter ?? "all";

  return (
    <div className="space-y-6">
      <PageHeader title="Tickets" description="Customer support (stub scope: open → resolved)." />

      <div className="flex gap-4 text-sm">
        {filters.map((f) => (
          <Link key={f.key} href={f.href} className={activeKey === f.key ? "font-semibold text-brand-600" : "text-slate-500 hover:text-ink"}>
            {f.label}
          </Link>
        ))}
      </div>

      {tickets.length === 0 ? (
        <TableCard><EmptyState title="No tickets" description="Support tickets will appear here." /></TableCard>
      ) : (
        <TableCard>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Workspace</th>
                <th className="px-4 py-3 font-medium">Messages</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/tickets/${t.id}`} className="font-medium text-brand-600 hover:text-brand-700">{t.subject}</Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{t.workspace.name}</td>
                  <td className="px-4 py-3 text-slate-500">{t._count.messages}</td>
                  <td className="px-4 py-3"><Badge tone={STATE_TONE[t.state]}>{t.state}</Badge></td>
                  <td className="px-4 py-3 text-slate-500">{formatInTz(t.createdAt, t.workspace.timezone, "dd LLL yyyy")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      )}
    </div>
  );
}
