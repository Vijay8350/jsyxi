import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { formatInTz } from "@/lib/time";

type LineItem = { description: string; qty: number; unitAmount: number; amount: number };

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await requireWorkspaceContext();

  const invoice = await prisma.invoice.findUnique({ where: { id }, include: { workspace: true } });
  // Verify the invoice belongs to the active workspace, else 404.
  if (!invoice || invoice.workspaceId !== ctx.workspace.id) {
    return new Response("Invoice not found", { status: 404 });
  }

  const items = Array.isArray(invoice.lineItems) ? (invoice.lineItems as unknown as LineItem[]) : [];
  const cur = invoice.currency;
  const ratePct = (Number(invoice.gstRate) * 100).toFixed(2);
  const issued = formatInTz(invoice.issueDate, ctx.workspace.timezone, "dd LLL yyyy");

  const rows = items
    .map(
      (li) => `
      <tr>
        <td>${esc(li.description)}</td>
        <td class="num">${esc(li.qty)}</td>
        <td class="num">${esc(formatMoney(li.unitAmount, cur))}</td>
        <td class="num">${esc(formatMoney(li.amount, cur))}</td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Invoice ${esc(invoice.invoiceNumber)} — jsyxi</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; background: #f8fafc; }
    .sheet { max-width: 760px; margin: 24px auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 40px; }
    .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
    .brand { font-size: 22px; font-weight: 800; color: #4f46e5; letter-spacing: -0.02em; }
    .muted { color: #64748b; font-size: 13px; }
    h1 { font-size: 18px; margin: 0 0 4px; }
    .meta { text-align: right; font-size: 13px; }
    .meta strong { display: inline-block; min-width: 90px; color: #475569; font-weight: 500; }
    .parties { display: flex; justify-content: space-between; gap: 24px; margin: 28px 0; }
    .parties h2 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin: 0 0 6px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px; }
    th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; border-bottom: 1px solid #e2e8f0; padding: 8px 10px; }
    td { padding: 10px; border-bottom: 1px solid #f1f5f9; }
    .num { text-align: right; font-variant-numeric: tabular-nums; }
    .totals { margin-left: auto; margin-top: 16px; width: 280px; font-size: 14px; }
    .totals div { display: flex; justify-content: space-between; padding: 6px 0; }
    .totals .grand { border-top: 2px solid #0f172a; margin-top: 6px; padding-top: 10px; font-weight: 700; font-size: 16px; }
    .foot { margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; }
    .print-btn { position: fixed; top: 16px; right: 16px; background: #4f46e5; color: #fff; border: none; padding: 8px 14px; border-radius: 8px; font-size: 13px; cursor: pointer; }
    @media print { body { background: #fff; } .sheet { border: none; margin: 0; border-radius: 0; } .print-btn { display: none; } }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
  <div class="sheet">
    <div class="top">
      <div>
        <div class="brand">jsyxi</div>
        <div class="muted">Widget tools for growing businesses</div>
      </div>
      <div class="meta">
        <h1>Tax Invoice</h1>
        <div><strong>Invoice</strong> ${esc(invoice.invoiceNumber)}</div>
        <div><strong>Date</strong> ${esc(issued)}</div>
        <div><strong>FY</strong> ${esc(invoice.financialYear)}</div>
        <div><strong>Status</strong> ${esc(invoice.status)}</div>
      </div>
    </div>

    <div class="parties">
      <div>
        <h2>Billed to</h2>
        <div style="font-weight:600">${esc(invoice.workspace.name)}</div>
        ${invoice.workspace.gstin ? `<div class="muted">GSTIN: ${esc(invoice.workspace.gstin)}</div>` : ""}
      </div>
      <div style="text-align:right">
        <h2>From</h2>
        <div style="font-weight:600">jsyxi</div>
        ${invoice.gstin ? `<div class="muted">GSTIN: ${esc(invoice.gstin)}</div>` : ""}
      </div>
    </div>

    <table>
      <thead>
        <tr><th>Description</th><th class="num">Qty</th><th class="num">Unit</th><th class="num">Amount</th></tr>
      </thead>
      <tbody>
        ${rows || `<tr><td colspan="4" class="muted">No line items.</td></tr>`}
      </tbody>
    </table>

    <div class="totals">
      <div><span>Taxable value</span><span class="num">${esc(formatMoney(invoice.subtotal, cur))}</span></div>
      <div><span>GST (${esc(ratePct)}%)</span><span class="num">${esc(formatMoney(invoice.gstAmount, cur))}</span></div>
      <div class="grand"><span>Total</span><span class="num">${esc(formatMoney(invoice.total, cur))}</span></div>
    </div>

    <div class="foot">
      Amounts are GST-inclusive and shown in ${esc(cur)}. This is a computer-generated invoice and does not require a signature.
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store" },
  });
}
