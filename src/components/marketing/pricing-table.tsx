"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { annualPrice } from "@/lib/money";
import { cn } from "@/lib/utils";

export type PricingPlan = {
  id: string;
  name: string;
  slug: string;
  isFree: boolean;
  priceAmount: number | null;
  annualDiscount: number;
  maxWidgets: number;
  maxMonthlyViews: number;
  maxProjects: number;
  maxMembers: number;
  aiAccess: boolean;
  brandingRemovable: boolean;
  prioritySupport: boolean;
  freeInstallation: boolean;
};

function inr(minor: number): string {
  return `₹${(minor / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function limitLabel(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toLocaleString("en-IN")}M`;
  if (n >= 1000) return `${(n / 1000).toLocaleString("en-IN")}K`;
  return n.toLocaleString("en-IN");
}

export function PricingTable({ plans }: { plans: PricingPlan[] }) {
  const [yearly, setYearly] = useState(false);
  const highlight = "pro";

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setYearly(false)}
          className={cn("text-sm font-medium transition-colors", yearly ? "text-slate-500" : "text-ink")}
        >
          Monthly
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          aria-label="Toggle yearly billing"
          onClick={() => setYearly((v) => !v)}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
            yearly ? "bg-brand-600" : "bg-slate-300",
          )}
        >
          <span
            className={cn(
              "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
              yearly ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        </button>
        <span className={cn("text-sm font-medium transition-colors", yearly ? "text-ink" : "text-slate-500")}>
          Yearly
          <span className="ml-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            2 months free
          </span>
        </span>
      </div>

      {/* Plan cards */}
      <div className="mt-10 grid gap-6 lg:grid-cols-4">
        {plans.map((plan) => {
          const featured = plan.slug === highlight;
          const monthly = plan.priceAmount ?? 0;
          const annual = annualPrice(monthly, plan.annualDiscount);
          const displayPrice = plan.isFree
            ? "₹0"
            : yearly
              ? inr(Math.round(annual / 12))
              : inr(monthly);

          const rows: { label: string; value: React.ReactNode }[] = [
            { label: "Widgets", value: limitLabel(plan.maxWidgets) },
            { label: "Monthly views", value: limitLabel(plan.maxMonthlyViews) },
            { label: "Projects", value: plan.maxProjects > 0 ? limitLabel(plan.maxProjects) : "—" },
            { label: "Team members", value: limitLabel(plan.maxMembers) },
          ];
          const flags: { label: string; on: boolean }[] = [
            { label: "Remove jsyxi branding", on: plan.brandingRemovable },
            { label: "AI-powered tools", on: plan.aiAccess },
            { label: "Priority support", on: plan.prioritySupport },
            { label: "Free installation", on: plan.freeInstallation },
          ];

          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                featured ? "border-brand-300 ring-2 ring-brand-100" : "border-line",
              )}
            >
              {featured && (
                <Badge tone="brand" className="absolute -top-3 left-6">
                  Most popular
                </Badge>
              )}
              <h3 className="text-lg font-bold text-ink">{plan.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-ink">{displayPrice}</span>
                {!plan.isFree && <span className="text-sm text-slate-500">/mo</span>}
              </div>
              <p className="mt-1 h-4 text-xs text-slate-500">
                {plan.isFree
                  ? "Free forever"
                  : yearly
                    ? `${inr(annual)} billed yearly`
                    : "Billed monthly · incl. GST"}
              </p>

              <ButtonLink
                href="/signup"
                variant={featured ? "primary" : "secondary"}
                className="mt-5 w-full"
              >
                {plan.isFree ? "Get started free" : "Choose " + plan.name}
              </ButtonLink>

              <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
                {rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <dt className="text-slate-500">{r.label}</dt>
                    <dd className="font-semibold text-ink">{r.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                {flags.map((f) => (
                  <li key={f.label} className={cn("flex items-center gap-2", f.on ? "text-slate-700" : "text-slate-400")}>
                    {f.on ? (
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <Minus className="h-4 w-4 shrink-0 text-slate-300" />
                    )}
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">
        All prices are in INR and inclusive of 18% GST. Upgrades are activated in-app after signup — no public checkout.
      </p>
    </div>
  );
}
