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
      <div
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
        role="group"
        aria-label="Billing frequency"
      >
        <button
          type="button"
          onClick={() => setYearly(false)}
          aria-pressed={!yearly}
          aria-controls="pricing-plans"
          className={cn(
            "rounded-md px-1 py-0.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 motion-reduce:transition-none",
            yearly ? "text-slate-500 hover:text-ink" : "text-ink",
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          aria-label="Yearly billing"
          aria-controls="pricing-plans"
          onClick={() => setYearly((v) => !v)}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-[background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 motion-reduce:transition-none",
            yearly ? "bg-brand-600" : "bg-slate-300",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ease-out motion-reduce:transition-none",
              yearly ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        </button>
        <button
          type="button"
          onClick={() => setYearly(true)}
          aria-pressed={yearly}
          aria-controls="pricing-plans"
          className={cn(
            "rounded-md px-1 py-0.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 motion-reduce:transition-none",
            yearly ? "text-ink" : "text-slate-500 hover:text-ink",
          )}
        >
          Yearly
          <span className="ml-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            2 months free
          </span>
        </button>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {yearly
          ? "Yearly billing selected. Prices show monthly equivalents billed yearly."
          : "Monthly billing selected."}
      </p>

      {/* Plan cards */}
      <div id="pricing-plans" className="mt-10 grid gap-6 lg:grid-cols-4">
        {plans.map((plan) => {
          const featured = plan.slug === highlight;
          const monthly = plan.priceAmount ?? 0;
          const annual = annualPrice(monthly, plan.annualDiscount);
          const monthlyDisplay = plan.isFree ? "₹0" : inr(monthly);
          const yearlyDisplay = plan.isFree ? "₹0" : inr(Math.round(annual / 12));

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
            <article
              key={plan.id}
              aria-labelledby={`pricing-plan-${plan.slug}`}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl motion-reduce:transform-none motion-reduce:transition-none",
                featured
                  ? "border-brand-300 shadow-brand-600/10 ring-2 ring-brand-100 hover:shadow-brand-600/15"
                  : "border-line hover:border-brand-200 hover:shadow-slate-200/70",
              )}
            >
              {featured && (
                <Badge tone="brand" className="absolute -top-3 left-6">
                  Most popular
                </Badge>
              )}
              <h3 id={`pricing-plan-${plan.slug}`} className="text-lg font-bold text-ink">
                {plan.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <AnimatedValue monthly={monthlyDisplay} yearly={yearlyDisplay} showYearly={yearly} />
                {!plan.isFree && <span className="text-sm text-slate-500">/mo</span>}
              </div>
              {plan.isFree ? (
                <p className="mt-1 h-4 text-xs text-slate-500">Free forever</p>
              ) : (
                <p className="mt-1 grid h-4 text-xs text-slate-500">
                  <span
                    aria-hidden={yearly}
                    className={cn(
                      "[grid-area:1/1] transition-[opacity,transform] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none",
                      yearly ? "-translate-y-1 opacity-0" : "translate-y-0 opacity-100",
                    )}
                  >
                    Billed monthly · incl. GST
                  </span>
                  <span
                    aria-hidden={!yearly}
                    className={cn(
                      "[grid-area:1/1] transition-[opacity,transform] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none",
                      yearly ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                    )}
                  >
                    {inr(annual)} billed yearly
                  </span>
                </p>
              )}

              <ButtonLink
                href="/signup"
                variant={featured ? "primary" : "secondary"}
                className="mt-5 w-full motion-reduce:transform-none motion-reduce:transition-none"
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
                  <li
                    key={f.label}
                    aria-label={`${f.label}: ${f.on ? "included" : "not included"}`}
                    className={cn("flex items-center gap-2", f.on ? "text-slate-700" : "text-slate-400")}
                  >
                    {f.on ? (
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                    ) : (
                      <Minus className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
                    )}
                    {f.label}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">
        All prices are in INR and inclusive of 18% GST. Upgrades are activated in-app after signup — no public checkout.
      </p>
    </div>
  );
}

function AnimatedValue({
  monthly,
  yearly,
  showYearly,
}: {
  monthly: string;
  yearly: string;
  showYearly: boolean;
}) {
  if (monthly === yearly) {
    return <span className="text-4xl font-extrabold tracking-tight text-ink">{monthly}</span>;
  }

  return (
    <span className="grid text-4xl font-extrabold tracking-tight text-ink">
      <span
        aria-hidden={showYearly}
        className={cn(
          "[grid-area:1/1] transition-[opacity,transform] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none",
          showYearly ? "-translate-y-1.5 opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        {monthly}
      </span>
      <span
        aria-hidden={!showYearly}
        className={cn(
          "[grid-area:1/1] transition-[opacity,transform] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none",
          showYearly ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
        )}
      >
        {yearly}
      </span>
    </span>
  );
}
