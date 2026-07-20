import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { serviceIcon } from "@/lib/services/icons";
import { ButtonLink } from "@/components/ui/button";
import { DualCta } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Shopify & e-commerce development, custom software & CRM, system applications, server & network solutions, mobile apps, and digital marketing & SEO — built by the jsyxi team.",
};

// Dynamic + on-demand revalidated when an admin edits services.
export const revalidate = 300;

const STEPS = [
  { n: "01", t: "Discovery", d: "We learn your goals and audit your current setup — no obligation." },
  { n: "02", t: "Proposal", d: "A clear scope, timeline, and GST-inclusive quote, usually within a day." },
  { n: "03", t: "Build & launch", d: "We design, build, integrate, and QA everything for you." },
  { n: "04", t: "Support & grow", d: "Optional retainers keep improvements compounding." },
];

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { status: "published" },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      {/* Animated hero */}
      <section className="relative overflow-hidden bg-hero-grid">
        {/* floating gradient blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-float absolute -left-24 top-8 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
          <div className="animate-float absolute -right-16 top-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
              <Sparkles className="h-3.5 w-3.5" /> Full-service technology partner
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Everything you need to{" "}
              <span className="animate-gradient bg-gradient-to-r from-brand-700 via-brand-500 to-accent-400 bg-clip-text text-transparent">
                build, launch & grow
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              From Shopify stores to custom software, mobile apps to marketing — one team to design, build,
              and run the technology behind your business.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg">Book a free consultation <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="#services" variant="secondary" size="lg">Explore services</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink">What we build</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            {services.length} services covering the full journey — pick one, or let us handle the whole stack.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcon(s.icon);
            return (
              <Reveal key={s.id} delay={(i % 3) * 90}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
                >
                  {/* gradient wash on hover */}
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 -top-px h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-emerald-400 transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                  {s.tagline && <p className="mt-1 text-sm font-medium text-brand-600">{s.tagline}</p>}
                  <p className="mt-3 flex-1 text-sm text-slate-600">{s.summary}</p>
                  {s.features.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {s.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink">How we work</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="relative">
                  <span className="text-4xl font-extrabold text-brand-100">{s.n}</span>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="animate-gradient overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 px-8 py-14 text-center text-white sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight">Have a project in mind?</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-100">
              Tell us what you&apos;re building. You&apos;ll get a tailored plan and a clear, GST-inclusive quote — usually within one business day.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="accent" size="lg">Book a consultation <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/signup" variant="secondary" size="lg">Start free instead</ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <DualCta
        title="Software or done-for-you — your call"
        description="Build it yourself for free, or hand it to our team. Either way, you're growing today."
      />
    </>
  );
}
