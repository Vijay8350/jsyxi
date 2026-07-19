import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { getWorkspaceUsage } from "@/lib/metering";
import { formatMoney } from "@/lib/money";
import { formatInTz } from "@/lib/time";
import { canManageBilling } from "@/lib/actions/admin/_helpers";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { PageHeader, KeyValue, AccessDenied } from "@/components/admin/ui";
import { WorkspaceBilling } from "@/components/admin/workspace-billing";

export const metadata: Metadata = { title: "Workspace detail" };

const SUB_STATE_TONE = { free: "slate", paid_active: "green", cancelled: "red", paid_grace: "amber" } as const;

export default async function WorkspaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "workspaces")) return <AccessDenied section="workspaces" />;

  const { id } = await params;
  const ws = await prisma.workspace.findUnique({
    where: { id },
    include: {
      owner: true,
      plan: true,
      subscriptions: { orderBy: { createdAt: "desc" }, take: 1, include: { plan: true, assignedByAdmin: true } },
      invoices: { orderBy: { issueDate: "desc" } },
      singleAppTool: true,
    },
  });
  if (!ws) notFound();

  const [widgetTotal, liveWidgets, usage, paidPlans] = await Promise.all([
    prisma.widget.count({ where: { workspaceId: ws.id, lifecycleState: { not: "purged" } } }),
    prisma.widget.count({ where: { workspaceId: ws.id, lifecycleState: "published_active" } }),
    getWorkspaceUsage(ws.id),
    prisma.plan.findMany({ where: { isFree: false, status: "active" }, orderBy: { sortOrder: "asc" } }),
  ]);

  const sub = ws.subscriptions[0];

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/workspaces" className="mb-3 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Workspaces
        </Link>
        <PageHeader
          title={ws.name}
          description={`/${ws.slug} · ${ws.timezone} · ${ws.billingCurrency}`}
          actions={<Badge tone={ws.status === "active" ? "green" : "amber"}>{ws.status}</Badge>}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Owner &amp; workspace</CardTitle></CardHeader>
            <CardBody className="pt-0">
              <dl className="divide-y divide-line">
                <KeyValue label="Owner">{ws.owner.name}</KeyValue>
                <KeyValue label="Owner email">{ws.owner.email}</KeyValue>
                <KeyValue label="Plan"><Badge tone={ws.plan.isFree ? "slate" : "brand"}>{ws.plan.name}</Badge></KeyValue>
                <KeyValue label="Purchase mode">{ws.purchaseMode}{ws.singleAppTool ? ` · ${ws.singleAppTool.name}` : ""}</KeyValue>
                <KeyValue label="GSTIN">{ws.gstin ?? "—"}</KeyValue>
                <KeyValue label="Created">{formatInTz(ws.createdAt, ws.timezone)}</KeyValue>
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>Subscription &amp; usage</CardTitle></CardHeader>
            <CardBody className="pt-0">
              <dl className="divide-y divide-line">
                <KeyValue label="State">
                  {sub ? <Badge tone={SUB_STATE_TONE[sub.state]}>{sub.state}</Badge> : <span className="text-slate-400">none</span>}
                </KeyValue>
                {sub && (
                  <>
                    <KeyValue label="Current period">{formatInTz(sub.currentPeriodStart, ws.timezone, "dd LLL yyyy")} → {formatInTz(sub.currentPeriodEnd, ws.timezone, "dd LLL yyyy")}</KeyValue>
                    <KeyValue label="Payment ref">{sub.manualPaymentRef ?? "—"}</KeyValue>
                    <KeyValue label="Assigned by">{sub.assignedByAdmin ? `${sub.assignedByAdmin.name}` : "—"}</KeyValue>
                  </>
                )}
                <KeyValue label="Widgets">{liveWidgets} live · {widgetTotal} total (cap {ws.plan.maxWidgets})</KeyValue>
                <KeyValue label="Views this period">
                  <span className={usage.overLimit ? "text-amber-600" : ""}>
                    {usage.used.toLocaleString("en-IN")} / {usage.limit.toLocaleString("en-IN")}
                  </span>
                </KeyValue>
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Invoices</CardTitle>
              <span className="text-sm text-slate-400">{ws.invoices.length} total</span>
            </CardHeader>
            <CardBody className="pt-0">
              {ws.invoices.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-400">No invoices issued yet.</p>
              ) : (
                <ul className="divide-y divide-line">
                  {ws.invoices.map((inv) => (
                    <li key={inv.id}>
                      <Link href={`/admin/invoices/${inv.id}`} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-slate-50">
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium text-ink">{inv.invoiceNumber}</span>
                          <span className="block text-xs text-slate-500">{formatInTz(inv.issueDate, ws.timezone, "dd LLL yyyy")}</span>
                        </span>
                        <span className="font-medium tabular-nums text-ink">{formatMoney(inv.total, inv.currency)}</span>
                        <Badge tone={inv.status === "paid" ? "green" : inv.status === "void" ? "red" : "amber"}>{inv.status}</Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Manual billing</CardTitle></CardHeader>
            <CardBody className="pt-0">
              <WorkspaceBilling
                workspaceId={ws.id}
                paidPlans={paidPlans.map((p) => ({ id: p.id, name: p.name, priceLabel: formatMoney(p.priceAmount ?? 0, p.priceCurrency) }))}
                isFree={ws.plan.isFree}
                canManage={canManageBilling(staff.staffRole)}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
