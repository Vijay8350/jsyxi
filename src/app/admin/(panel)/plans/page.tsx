import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, AccessDenied } from "@/components/admin/ui";
import { PlanEditor, PlanCreate, type PlanValues } from "@/components/admin/plan-editor";

export const metadata: Metadata = { title: "Plans & Pricing" };

export default async function PlansPage() {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "plans")) return <AccessDenied section="plans" />;

  const plans = await prisma.plan.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-6">
      <PageHeader title="Plans & Pricing" description="Limits, prices and entitlements. Prices are stored in paise (minor units)." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <div key={p.id} className="rounded-xl border border-line bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-ink">{p.name}</p>
              <Badge tone={p.status === "active" ? "green" : "slate"}>{p.status}</Badge>
            </div>
            <p className="mt-2 text-2xl font-bold text-ink">{p.isFree || p.priceAmount == null ? "Free" : formatMoney(p.priceAmount, p.priceCurrency)}</p>
            <p className="mt-1 text-xs text-slate-500">{p.maxWidgets} widgets · {p.maxMonthlyViews.toLocaleString("en-IN")} views/mo</p>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Edit plans</CardTitle></CardHeader>
        <CardBody className="px-0 py-0">
          {plans.map((p) => (
            <PlanEditor key={p.id} plan={p as unknown as PlanValues} />
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Create a plan</CardTitle></CardHeader>
        <CardBody className="px-0 py-0">
          <PlanCreate />
        </CardBody>
      </Card>
    </div>
  );
}
