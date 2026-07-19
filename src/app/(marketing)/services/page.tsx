import type { Metadata } from "next";
import { LayoutTemplate, Puzzle, Workflow, TrendingUp, Check, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero, DualCta, SectionHeading } from "@/components/marketing/sections";

export const metadata: Metadata = {
  title: "Agency Services",
  description:
    "Store & landing-page design, widget setup & installation, lead-gen & CRM automation, and conversion optimization — done for you by the jsyxi agency.",
};

const SERVICES = [
  {
    icon: LayoutTemplate,
    title: "Store & landing-page design",
    tagline: "Pages that look premium and convert.",
    body: "We design and build fast, mobile-first storefronts and campaign landing pages tuned to your brand. From wireframe to launch, you get a page that loads in under three seconds and is ready to sell.",
    points: ["Custom, on-brand design", "Mobile-first & sub-3s load", "SEO-ready markup", "Launch-ready in days"],
  },
  {
    icon: Puzzle,
    title: "Widget setup & installation",
    tagline: "The right widgets, installed correctly.",
    body: "We pick, configure, and install the widgets that move your numbers — reviews, forms, popups, countdowns, WhatsApp chat and more — and wire them into your site with a single line of code.",
    points: ["Widget strategy & selection", "Full configuration & theming", "One-line embed installation", "QA across devices"],
  },
  {
    icon: Workflow,
    title: "Lead-gen & CRM automation",
    tagline: "Turn traffic into a pipeline.",
    body: "We build lead-capture flows that route every enquiry straight into your CRM, assign it to the right queue, and trigger timely follow-ups — so no lead ever slips through the cracks.",
    points: ["Lead forms & routing", "CRM queue automation", "Consultation booking", "Follow-up sequences"],
  },
  {
    icon: TrendingUp,
    title: "Conversion optimization",
    tagline: "Compounding gains, month over month.",
    body: "With ongoing testing and analytics, we tighten your funnel: better copy, sharper offers, smarter social proof, and urgency where it counts — reviewed together in a simple monthly report.",
    points: ["Funnel & analytics review", "A/B testing", "Social proof & urgency", "Monthly growth reporting"],
  },
];

const STEPS = [
  { n: "1", t: "Free consultation", d: "We learn your goals and audit your current setup — no obligation." },
  { n: "2", t: "Tailored plan & quote", d: "You get a clear scope, timeline, and a GST-inclusive quote." },
  { n: "3", t: "Build & launch", d: "We design, build, install, and QA everything for you." },
  { n: "4", t: "Optimize & grow", d: "Optional retainers keep the improvements compounding." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        badge="Full-service growth agency"
        title="We build and run your"
        highlight="growth engine"
        description="Prefer we do it for you? Our in-house team designs your store, installs your widgets, automates your lead-gen, and optimizes conversions — so you can focus on the business."
        primary={{ href: "/contact", label: "Book a consultation" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
        note="Free consultation · GST-inclusive quotes · Made in India"
      />

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading
          title="What we do"
          description="Four services that cover the full journey from first visit to repeat sale."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="rounded-2xl border border-line bg-white p-7 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm font-medium text-brand-600">{s.tagline}</p>
                <p className="mt-3 text-slate-600">{s.body}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading title="How we work together" />
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency band */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="overflow-hidden rounded-2xl bg-brand-600 px-8 py-12 text-white sm:px-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Badge tone="brand" className="bg-white/15 text-white">
                Ready when you are
              </Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">Let&apos;s map your growth plan</h2>
              <p className="mt-3 text-brand-100">
                Book a free consultation and get a tailored plan with a clear scope and quote — usually within
                one business day.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <ButtonLink href="/contact" variant="accent" size="lg">
                Book a consultation <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/signup" variant="secondary" size="lg">
                Start free instead
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <DualCta
        title="Software or done-for-you — your call"
        description="Build it yourself for free, or hand it to our agency. Either way, you're growing today."
      />
    </>
  );
}
