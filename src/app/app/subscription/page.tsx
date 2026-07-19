import type { Metadata } from "next";
import { Check, X, Download, FileText, Sparkles } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { getWorkspaceUsage } from "@/lib/metering";
import { formatMoney } from "@/lib/money";
import { formatInTz } from "@/lib/time";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { PlanUpgradeButton } from "@/components/app/panel-upgrade-buttons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Subscription" };

const invoiceTone = { issued: "amber", paid: "green", void: "slate" } as const;

function Entitlement({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      {on ? <Check className="h-4 w-4 shrink-0 text-emerald-600" /> : <X className="h-4 w-4 shrink-0 text-slate-300" />}
      <span className={on ? "text-slate-700" : "text-slate-400"}>{children}</span>
    </li>
  );
}

export default async function SubscriptionPage() {
  const ctx = await requireWorkspaceContext();
  const wsId = ctx.workspace.id;

  const [usage, plans, invoices] = await Promise.all([
    getWorkspaceUsage(wsId),
    prisma.plan.findMany({ where: { status: "active" }, orderBy: [{ sortOrder: "asc" }, { priceAmount: "asc" }] }),
    prisma.invoice.findMany({ where: { workspaceId: wsId }, orderBy: { issueDate: "desc" } }),
  ]);

  const current = ctx.plan;
  const priceLabel = (p: (typeof plans)[number]) =>
    p.isFree || p.priceAmount == null ? "Free" : formatMoney(p.priceAmount, p.priceCurrency);
  const barPct = usage.limit > 0 ? Math.min(100, Math.round((usage.used / usage.limit) * 100)) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Subscription &amp; billing</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your plan and download invoices for {ctx.workspace.name}.</p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {current.name} <Badge tone="brand">Current</Badge>
            </CardTitle>
            <CardDescription>
              {priceLabel(current)}
              {!current.isFree && current.priceAmount != null && ` / ${current.billingInterval === "annual" ? "year" : "month"}`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardBody className="grid gap-6 pt-0 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <span className="text-sm font-medium text-slate-600">Views this period</span>
              <span className="text-sm text-slate-500">
                <strong className="text-ink">{usage.used.toLocaleString("en-IN")}</strong> / {usage.limit.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className={cn("h-full rounded-full", usage.overLimit ? "bg-amber-500" : "bg-brand-600")} style={{ width: `${Math.max(2, barPct)}%` }} />
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
              <li className="flex justify-between"><span>Live widgets</span><span className="font-medium text-ink">{current.maxWidgets}</span></li>
              <li className="flex justify-between"><span>Monthly views</span><span className="font-medium text-ink">{current.maxMonthlyViews.toLocaleString("en-IN")}</span></li>
              <li className="flex justify-between"><span>Team members</span><span className="font-medium text-ink">{current.maxMembers}</span></li>
            </ul>
          </div>
          <ul className="space-y-2">
            <Entitlement on={current.aiAccess}>AI-powered tools</Entitlement>
            <Entitlement on={current.brandingRemovable}>Remove jsyxi branding</Entitlement>
            <Entitlement on={current.prioritySupport}>Priority support</Entitlement>
            <Entitlement on={current.freeInstallation}>Free installation help</Entitlement>
          </ul>
        </CardBody>
      </Card>

      {/* Plan comparison */}
      <div>
        <h2 className="text-lg font-semibold text-ink">Plans</h2>
        <p className="mt-1 text-sm text-slate-500">Upgrades are applied by our team — request one and we&apos;ll reach out.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => {
            const isCurrent = p.id === current.id;
            return (
              <div
                key={p.id}
                className={cn(
                  "flex flex-col rounded-xl border bg-white p-5 shadow-sm",
                  isCurrent ? "border-brand-300 ring-1 ring-brand-100" : "border-line",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-ink">{p.name}</h3>
                  {isCurrent && <Badge tone="brand">Current plan</Badge>}
                  {!isCurrent && p.aiAccess && <Badge tone="blue"><Sparkles className="h-3 w-3" /> AI</Badge>}
                </div>
                <p className="mt-3 text-2xl font-bold text-ink">
                  {priceLabel(p)}
                  {!p.isFree && p.priceAmount != null && (
                    <span className="text-sm font-normal text-slate-500"> / {p.billingInterval === "annual" ? "yr" : "mo"}</span>
                  )}
                </p>
                <ul className="mt-4 flex-1 space-y-1.5 text-sm text-slate-600">
                  <li className="flex justify-between"><span>Live widgets</span><span className="font-medium text-ink">{p.maxWidgets}</span></li>
                  <li className="flex justify-between"><span>Monthly views</span><span className="font-medium text-ink">{p.maxMonthlyViews.toLocaleString("en-IN")}</span></li>
                  <li className="flex justify-between"><span>Team members</span><span className="font-medium text-ink">{p.maxMembers}</span></li>
                  {p.brandingRemovable && <li className="flex items-center gap-1.5 text-emerald-700"><Check className="h-3.5 w-3.5" /> No branding</li>}
                  {p.prioritySupport && <li className="flex items-center gap-1.5 text-emerald-700"><Check className="h-3.5 w-3.5" /> Priority support</li>}
                </ul>
                <div className="mt-5">
                  {isCurrent ? (
                    <div className="rounded-lg border border-line bg-slate-50 py-2 text-center text-sm font-medium text-slate-500">Your plan</div>
                  ) : p.isFree ? (
                    <div className="rounded-lg border border-line bg-slate-50 py-2 text-center text-sm text-slate-400">Downgrade — contact us</div>
                  ) : (
                    <PlanUpgradeButton planSlug={p.slug} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>GST invoices issued to {ctx.workspace.name}.</CardDescription>
        </CardHeader>
        <CardBody className="pt-0">
          {invoices.length === 0 ? (
            <EmptyState icon={<FileText className="h-6 w-6" />} title="No invoices yet" description="Invoices appear here once a paid plan is assigned to your workspace." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-2 py-2.5 font-medium">Invoice</th>
                    <th className="px-2 py-2.5 font-medium">Date</th>
                    <th className="px-2 py-2.5 font-medium">Status</th>
                    <th className="px-2 py-2.5 text-right font-medium">Total</th>
                    <th className="px-2 py-2.5 text-right font-medium">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="px-2 py-2.5 font-medium text-ink">{inv.invoiceNumber}</td>
                      <td className="px-2 py-2.5 text-slate-500">{formatInTz(inv.issueDate, ctx.workspace.timezone, "dd LLL yyyy")}</td>
                      <td className="px-2 py-2.5"><Badge tone={invoiceTone[inv.status]}>{inv.status}</Badge></td>
                      <td className="px-2 py-2.5 text-right tabular-nums text-ink">{formatMoney(inv.total, inv.currency)}</td>
                      <td className="px-2 py-2.5 text-right">
                        <a
                          href={`/app/subscription/invoices/${inv.id}`}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700"
                        >
                          <Download className="h-4 w-4" /> PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
