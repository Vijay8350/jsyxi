import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { canManageBilling } from "@/lib/actions/admin/_helpers";
import { AccessDenied } from "@/components/admin/ui";
import { InvoiceDocument } from "@/components/admin/invoice-document";
import { PrintButton, VoidInvoiceButton } from "@/components/admin/invoice-actions";

export const metadata: Metadata = { title: "Invoice" };

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "invoices")) return <AccessDenied section="invoices" />;

  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { workspace: { include: { owner: true } } },
  });
  if (!invoice) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 print:hidden sm:flex-row sm:items-center sm:justify-between">
        <Link href="/admin/invoices" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Invoices
        </Link>
        <div className="flex items-center gap-2">
          <PrintButton />
          {canManageBilling(staff.staffRole) && invoice.status !== "void" && (
            <VoidInvoiceButton invoiceId={invoice.id} />
          )}
        </div>
      </div>

      <InvoiceDocument invoice={invoice} workspace={invoice.workspace} />
    </div>
  );
}
