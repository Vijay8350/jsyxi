import type { Metadata } from "next";
import Image from "next/image";
import { Check, Gauge, Headphones, WandSparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingTable, type PricingPlan } from "@/components/marketing/pricing-table";
import { DualCta, FaqList, PageHero, SectionHeading } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

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

const PRICING_PROMISES = [
  { icon: WandSparkles, title: "Start free", detail: "No credit card required" },
  { icon: Gauge, title: "Scale smoothly", detail: "Soft view limits by default" },
  { icon: Headphones, title: "Real support", detail: "Help when you need it" },
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
      <PageHero
        badge="Transparent pricing · no surprises"
        title="Pricing that grows"
        highlight="with you"
        description="Start free and upgrade only when you're ready. Every plan includes the full widget builder, live preview, and one-line embed."
        primary={{ href: "#plans", label: "Compare plans" }}
        secondary={{ href: "/contact", label: "Talk to our team" }}
        note="All prices are GST-inclusive and shown in INR."
      />

      <section
        aria-label="Pricing assurances"
        className="relative z-10 mx-auto -mt-7 max-w-5xl px-4 sm:-mt-9 sm:px-6"
      >
        <Reveal>
          <ul className="grid overflow-hidden rounded-2xl border border-line/80 bg-white/90 shadow-xl shadow-slate-900/8 backdrop-blur sm:grid-cols-3 sm:rounded-3xl">
            {PRICING_PROMISES.map((promise, index) => {
              const Icon = promise.icon;
              return (
                <li
                  key={promise.title}
                  className={`flex items-center gap-3 px-5 py-4 ${
                    index > 0 ? "border-t border-line/80 sm:border-l sm:border-t-0" : ""
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{promise.title}</span>
                    <span className="block text-xs text-slate-500">{promise.detail}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>

      {/* Plans */}
      <section
        id="plans"
        className="relative mx-auto max-w-7xl scroll-mt-24 overflow-hidden px-4 py-16 sm:px-6 sm:py-24"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-16 -z-10 h-80 w-[90%] -translate-x-1/2 rounded-full bg-brand-100/45 blur-3xl"
          aria-hidden="true"
        />
        <Reveal>
          {plans.length > 0 ? (
            <PricingTable plans={plans} />
          ) : (
            <p className="py-16 text-center text-slate-500">
              Plans are being updated — please check back shortly.
            </p>
          )}
        </Reveal>
      </section>

      {/* Agency packages */}
      <section aria-labelledby="agency-packages-heading" className="relative overflow-hidden bg-slate-950">
        <div
          className="absolute -left-36 top-1/3 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <Reveal>
              <div>
                <Badge tone="brand" className="border border-brand-300/20 bg-brand-400/10 text-brand-200">
                  Done-for-you
                </Badge>
                <h2
                  id="agency-packages-heading"
                  className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  Agency packages, built around your next growth stage.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  Need more than software? Our in-house agency designs, builds, installs and optimizes your
                  store and campaigns end-to-end. Packages are tailored to your goals and quoted after a free
                  consultation — no fixed shelf price, because no two growth plans are alike.
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Store & landing-page design",
                    "Widget setup & installation",
                    "Lead-gen & CRM automation",
                    "Conversion-rate optimization",
                    "Monthly growth retainers",
                    "Priority support & reporting",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/15">
                        <Check className="h-3.5 w-3.5 text-brand-200" aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href="/contact" size="lg" className="w-full rounded-full sm:w-auto">
                    Get a custom quote
                  </ButtonLink>
                  <ButtonLink
                    href="/services"
                    variant="secondary"
                    size="lg"
                    className="w-full rounded-full border-white/15 bg-white/10 text-white hover:border-white/30 hover:bg-white/15 hover:text-white sm:w-auto"
                  >
                    Explore services
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <figure className="relative min-h-[330px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30 sm:min-h-[440px]">
                <Image
                  src={MARKETING_IMAGES.workspace.src}
                  alt={MARKETING_IMAGES.workspace.alt}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover transition duration-700 ease-out hover:scale-[1.025] motion-reduce:transition-none"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"
                  aria-hidden="true"
                />
                <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-slate-950/75 p-4 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">One senior team</p>
                  <p className="mt-1.5 text-lg font-semibold sm:text-xl">
                    Strategy, build, launch, and optimization—working as one system.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading title="Pricing questions" description="Everything you need to know before you start." />
          <div className="mt-10">
            <FaqList items={FAQ} />
          </div>
        </Reveal>
      </section>

      <DualCta />
    </>
  );
}
