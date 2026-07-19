import Link from "next/link";
import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { formatInTz } from "@/lib/time";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { PageHeader, TableCard, AccessDenied } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Invoices" };

const STATUS_TONE = { issued: "amber", paid: "green", void: "red" } as const;

export default async function InvoicesPage() {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "invoices")) return <AccessDenied section="invoices" />;

  const invoices = await prisma.invoice.findMany({
    include: { workspace: true },
    orderBy: { issueDate: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" description="GST tax invoices issued to workspaces (gap-free per FY)." />

      {invoices.length === 0 ? (
        <TableCard><EmptyState title="No invoices yet" description="Invoices are issued when a paid plan is assigned." /></TableCard>
      ) : (
        <TableCard>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Number</th>
                <th className="px-4 py-3 font-medium">Workspace</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/invoices/${inv.id}`} className="font-medium text-brand-600 hover:text-brand-700">
                      {inv.invoiceNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{inv.workspace.name}</td>
                  <td className="px-4 py-3 text-slate-500">{formatInTz(inv.issueDate, inv.workspace.timezone, "dd LLL yyyy")}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums text-ink">{formatMoney(inv.total, inv.currency)}</td>
                  <td className="px-4 py-3"><Badge tone={STATUS_TONE[inv.status]}>{inv.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      )}
    </div>
  );
}
