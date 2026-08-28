import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { prisma } from "@/lib/db";
import { MARKETING_IMAGES } from "@/lib/marketing-images";
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
      <section className="relative isolate overflow-hidden border-b border-line/70">
        <div className="bg-hero-grid absolute inset-0 -z-20" aria-hidden />
        <div className="absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-brand-300/35 blur-3xl" aria-hidden />
        <div className="absolute -right-16 top-24 -z-10 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Full-service technology partner
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mx-auto mt-6 max-w-2xl text-[clamp(2.5rem,10vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-ink lg:mx-0">
                Everything you need to{" "}
                <span className="animate-gradient text-gradient-brand">build, launch & grow.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0">
                From Shopify stores to custom software, mobile apps to marketing — one senior team to design,
                build, and run the technology behind your business.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <ButtonLink href="/contact" size="lg" className="w-full rounded-full px-7 sm:w-auto">
                  Book a free consultation <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
                <ButtonLink
                  href="#services"
                  variant="secondary"
                  size="lg"
                  className="w-full rounded-full px-7 sm:w-auto"
                >
                  Explore services
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140} className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="image-frame relative aspect-[4/3] rounded-[1.75rem] sm:aspect-[5/4] sm:rounded-[2rem]">
              <Image
                src={MARKETING_IMAGES.studio.src}
                alt={MARKETING_IMAGES.studio.alt}
                fill
                preload
                sizes="(max-width: 1024px) 92vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                {["Strategy", "Craft", "Results"].map((label) => (
                  <span
                    key={label}
                    className="rounded-xl border border-white/20 bg-slate-950/50 px-3 py-2 text-center text-xs font-semibold text-white backdrop-blur-md"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-panel absolute -bottom-5 left-3 rounded-2xl px-4 py-3 sm:left-6">
              <p className="text-sm font-semibold text-ink">One accountable team</p>
              <p className="mt-0.5 text-xs text-slate-500">from first sketch to steady growth</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
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
                  className="premium-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
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
      <section className="dark-panel relative overflow-hidden border-y border-emerald-950/40">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full border border-white/5" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <p className="section-kicker !text-emerald-300">Delivery system</p>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">How we work</h2>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-300/30 hover:bg-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-widest text-emerald-300">{s.n}</span>
                      <span className="h-px flex-1 bg-gradient-to-r from-emerald-300/35 to-transparent" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={100} className="tech-feature-visual relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-emerald-300/15 bg-slate-950 shadow-2xl shadow-black/25 sm:rounded-[2rem]">
              <Image
                src="/tech-growth-visual.png"
                alt="A connected digital growth system linking storefront, customer, and analytics tools"
                fill
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover"
              />
              <div className="tech-scan-line absolute inset-x-0 top-0 h-px bg-emerald-200/80" aria-hidden />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-slate-950/65 p-4 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                <p className="text-sm font-semibold">Clear milestones. Visible momentum.</p>
                <p className="mt-1 text-xs text-white/55">Strategy, build, launch, and growth stay connected.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="animate-gradient overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 px-5 py-12 text-center text-white sm:rounded-3xl sm:px-12 sm:py-14">
            <h2 className="text-3xl font-bold tracking-tight">Have a project in mind?</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-100">
              Tell us what you&apos;re building. You&apos;ll get a tailored plan and a clear, GST-inclusive quote — usually within one business day.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="accent" size="lg" className="w-full sm:w-auto">
                Book a consultation <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/signup" variant="secondary" size="lg" className="w-full sm:w-auto">
                Start free instead
              </ButtonLink>
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
