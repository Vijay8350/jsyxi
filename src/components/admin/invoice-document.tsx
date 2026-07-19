import { formatMoney } from "@/lib/money";
import { formatInTz } from "@/lib/time";
import { Badge } from "@/components/ui/badge";
import type { Invoice, Workspace, User } from "@/generated/prisma";

type LineItem = { description: string; qty: number; unitAmount: number; amount: number };

const SELLER = {
  name: "jsyxi Technologies Pvt. Ltd.",
  address: "Bengaluru, Karnataka, India",
  gstin: "29AABCJ0000A1Z5",
  email: "billing@jsyxi.com",
};

export function InvoiceDocument({
  invoice,
  workspace,
}: {
  invoice: Invoice;
  workspace: Workspace & { owner: User };
}) {
  const items = (invoice.lineItems as unknown as LineItem[]) ?? [];
  const ratePct = Number(invoice.gstRate) * 100;
  const cgst = Math.round(invoice.gstAmount / 2);
  const sgst = invoice.gstAmount - cgst;

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-line bg-white p-8 shadow-sm print:border-0 print:shadow-none">
      <div className="flex flex-col justify-between gap-6 border-b border-line pb-6 sm:flex-row">
        <div>
          <div className="text-xl font-bold text-ink">{SELLER.name}</div>
          <div className="mt-1 text-sm text-slate-500">{SELLER.address}</div>
          <div className="text-sm text-slate-500">GSTIN: {SELLER.gstin}</div>
          <div className="text-sm text-slate-500">{SELLER.email}</div>
        </div>
        <div className="sm:text-right">
          <div className="text-lg font-bold uppercase tracking-wide text-slate-400">Tax Invoice</div>
          <div className="mt-1 text-sm font-semibold text-ink">{invoice.invoiceNumber}</div>
          <div className="text-sm text-slate-500">Date: {formatInTz(invoice.issueDate, workspace.timezone, "dd LLL yyyy")}</div>
          <div className="text-sm text-slate-500">FY: {invoice.financialYear}</div>
          <div className="mt-2">
            <Badge tone={invoice.status === "paid" ? "green" : invoice.status === "void" ? "red" : "amber"}>{invoice.status.toUpperCase()}</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 py-6 sm:grid-cols-2">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Billed to</div>
          <div className="mt-1 text-sm font-semibold text-ink">{workspace.name}</div>
          <div className="text-sm text-slate-500">{workspace.owner.name}</div>
          <div className="text-sm text-slate-500">{workspace.owner.email}</div>
          {invoice.gstin && <div className="text-sm text-slate-500">GSTIN: {invoice.gstin}</div>}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-y border-line text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-2 pr-2 font-medium">Description</th>
              <th className="py-2 px-2 text-right font-medium">Qty</th>
              <th className="py-2 px-2 text-right font-medium">Unit</th>
              <th className="py-2 pl-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.map((it, i) => (
              <tr key={i}>
                <td className="py-3 pr-2 text-ink">{it.description}</td>
                <td className="py-3 px-2 text-right tabular-nums text-slate-600">{it.qty}</td>
                <td className="py-3 px-2 text-right tabular-nums text-slate-600">{formatMoney(it.unitAmount, invoice.currency)}</td>
                <td className="py-3 pl-2 text-right tabular-nums text-ink">{formatMoney(it.amount, invoice.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <dl className="w-full max-w-xs space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Taxable value</dt>
            <dd className="tabular-nums text-ink">{formatMoney(invoice.subtotal, invoice.currency)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">CGST ({(ratePct / 2).toFixed(2)}%)</dt>
            <dd className="tabular-nums text-ink">{formatMoney(cgst, invoice.currency)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">SGST ({(ratePct / 2).toFixed(2)}%)</dt>
            <dd className="tabular-nums text-ink">{formatMoney(sgst, invoice.currency)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
            <dt className="text-ink">Total (incl. GST)</dt>
            <dd className="tabular-nums text-ink">{formatMoney(invoice.total, invoice.currency)}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-8 border-t border-line pt-4 text-xs text-slate-400">
        Prices are GST-inclusive (F-GST). This is a computer-generated tax invoice and does not require a signature.
      </p>
    </div>
  );
}
