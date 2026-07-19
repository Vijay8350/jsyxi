import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingTable, type PricingPlan } from "@/components/marketing/pricing-table";
import { DualCta, FaqList, SectionHeading } from "@/components/marketing/sections";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing in INR (incl. GST). Start free forever, or upgrade for more widgets, views, and agency-grade support.",
};

const FAQ = [
  {
    q: "Is there really a free plan?",
    a: "Yes. The Free plan is free forever — one widget and 1,000 monthly views, no credit card required. Upgrade only when you outgrow it.",
  },
  {
    q: "How do upgrades work?",
    a: "Pick a plan and create your account. Paid plans are activated for you inside the app after signup — there is no public checkout, so you always get a proper GST invoice.",
  },
  {
    q: "Are prices inclusive of GST?",
    a: "All prices shown are in Indian Rupees and are inclusive of 18% GST. You'll receive a gap-free, GST-compliant invoice for every payment.",
  },
  {
    q: "What counts as a view?",
    a: "A view is counted once per visitor per page load of a published widget, after excluding bots and duplicate views within a 30-minute window.",
  },
  {
    q: "What happens if I exceed my monthly views?",
    a: "By default limits are soft — your widgets keep working and we'll nudge you to upgrade. We never cut off your traffic without warning.",
  },
  {
    q: "Can I switch or cancel any time?",
    a: "Absolutely. Change plans whenever you like; changes apply from your next billing period and unused value is respected.",
  },
];

export default async function PricingPage() {
  const plansRaw = await prisma.plan.findMany({
    where: { status: "active" },
    orderBy: { sortOrder: "asc" },
  });

  const plans: PricingPlan[] = plansRaw.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    isFree: p.isFree,
    priceAmount: p.priceAmount,
    annualDiscount: p.annualDiscount,
    maxWidgets: p.maxWidgets,
    maxMonthlyViews: p.maxMonthlyViews,
    maxProjects: p.maxProjects,
    maxMembers: p.maxMembers,
    aiAccess: p.aiAccess,
    brandingRemovable: p.brandingRemovable,
    prioritySupport: p.prioritySupport,
    freeInstallation: p.freeInstallation,
  }));

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-grid">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 text-center">
          <Badge tone="brand" className="mx-auto">
            <Sparkles className="h-3.5 w-3.5" /> Transparent pricing · no surprises
          </Badge>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Pricing that grows <span className="text-brand-600">with you</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Start free and upgrade only when you&apos;re ready. Every plan includes the full widget builder,
            live preview, and one-line embed.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        {plans.length > 0 ? (
          <PricingTable plans={plans} />
        ) : (
          <p className="py-16 text-center text-slate-500">Plans are being updated — please check back shortly.</p>
        )}
      </section>

      {/* Agency packages */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <Badge tone="brand">Done-for-you</Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink">Agency packages</h2>
              <p className="mt-3 text-slate-600">
                Need more than software? Our in-house agency designs, builds, installs and optimizes your
                store and campaigns end-to-end. Packages are tailored to your goals and quoted after a free
                consultation — no fixed shelf price, because no two growth plans are alike.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg">
                  Get a custom quote
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary" size="lg">
                  Explore services
                </ButtonLink>
              </div>
            </div>
            <ul className="grid gap-3 rounded-2xl border border-line bg-canvas p-6 sm:grid-cols-2">
              {[
                "Store & landing-page design",
                "Widget setup & installation",
                "Lead-gen & CRM automation",
                "Conversion-rate optimization",
                "Monthly growth retainers",
                "Priority support & reporting",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Check className="h-5 w-5 shrink-0 text-brand-500" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading title="Pricing questions" description="Everything you need to know before you start." />
        <div className="mt-10">
          <FaqList items={FAQ} />
        </div>
      </section>

      <DualCta />
    </>
  );
}
