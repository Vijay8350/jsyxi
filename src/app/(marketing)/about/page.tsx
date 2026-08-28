import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Heart, Rocket, ShieldCheck, Sparkles, Users } from "lucide-react";
import { StatTile } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { DualCta, SectionHeading } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export const metadata: Metadata = {
  title: "About us",
  description:
    "jsyxi combines a no-code widget platform with a full-service growth agency, built in India to help online businesses convert more of their traffic.",
};

const VALUES = [
  {
    icon: Rocket,
    title: "Ship fast, stay light",
    body: "Every widget loads in under three seconds. Speed is a feature, not an afterthought.",
  },
  {
    icon: Heart,
    title: "No-code, no gatekeeping",
    body: "Growth tools shouldn't require a developer. If you can fill a form, you can launch.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by default",
    body: "Bot and duplicate protection, GST-compliant invoices, and clear pricing — no dark patterns.",
  },
  {
    icon: Users,
    title: "Partners, not vendors",
    body: "Whether you self-serve or hire our agency, we win only when you grow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line/70">
        <div className="bg-hero-grid absolute inset-0 -z-20" aria-hidden />
        <div
          className="absolute -left-24 top-16 -z-10 h-72 w-72 rounded-full bg-brand-300/35 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -right-20 top-0 -z-10 h-96 w-96 rounded-full bg-emerald-300/25 blur-3xl"
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Our story
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[clamp(2.5rem,10vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-ink">
                Growth tools for{" "}
                <span className="animate-gradient text-gradient-brand">every online business</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 lg:mx-0">
                We started jsyxi because great conversion tools were locked behind expensive agencies and developer
                time. So we built both: an easy no-code platform, and an agency for when you want it done for you.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <ButtonLink href="/signup" size="lg" className="w-full rounded-full px-7 sm:w-auto">
                  Start free{" "}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="w-full rounded-full px-7 sm:w-auto"
                >
                  Book a consultation
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 lg:justify-start">
                <span>Launch in minutes</span>
                <span className="h-1 w-1 rounded-full bg-brand-400" aria-hidden />
                <span>No developer required</span>
                <span className="h-1 w-1 rounded-full bg-brand-400" aria-hidden />
                <span>Built for fast storefronts</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="tech-feature-visual relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-emerald-300/15 bg-[#071311] shadow-2xl shadow-emerald-950/20 sm:rounded-[2rem]">
              <Image
                src="/tech-growth-visual.png"
                alt="Connected commerce tools visualizing reviews, leads, and storefront growth"
                fill
                preload
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/90 to-transparent" />
              <div className="tech-scan-line absolute inset-x-0 top-0 h-px bg-emerald-200/80" aria-hidden />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/65 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md sm:left-6 sm:top-6">
                <span className="h-2 w-2 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden />
                Growth system · Live
              </div>
              <div className="glass-panel absolute inset-x-4 bottom-4 rounded-2xl p-4 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-xs">
                <p className="text-sm font-semibold text-ink">Platform precision. Agency care.</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  One connected system for the moments that turn visits into customers.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="image-frame relative aspect-[4/5] rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={MARKETING_IMAGES.workspace.src}
              alt={MARKETING_IMAGES.workspace.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-slate-950/55 p-4 text-white backdrop-blur-md">
              <p className="text-sm font-semibold">Small team. Direct collaboration.</p>
              <p className="mt-1 text-xs text-white/65">The people you speak with are the people building.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-kicker">Our mission</p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-ink sm:text-5xl">
              Make growth tools feel beautifully simple.
            </h2>
            <div className="mt-7 space-y-5 text-[17px] leading-relaxed text-slate-600">
              <p>
                Indian brands are building world-class online businesses — but too many lose customers at the
                last mile: a slow page, a missing review, a lead form that goes nowhere. We think fixing that
                shouldn&apos;t need a big budget or a technical team.
              </p>
              <p>
                jsyxi puts a full toolkit — reviews, forms, popups, countdowns, WhatsApp chat and more — in your
                hands, with a live preview and a one-line embed. And when you&apos;d rather focus on the business,
                our agency designs, installs, and optimizes everything for you.
              </p>
              <p className="font-medium text-ink">
                Our goal is simple: help you turn more of the traffic you already have into customers, and give
                you the reporting to prove it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-white/75">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-3">
            <Reveal>
              <StatTile label="Flagship widgets" value="8" hint="From reviews to countdowns" />
            </Reveal>
            <Reveal delay={80}>
              <StatTile label="Page-load budget" value="< 3s" hint="Speed is a feature" tone="green" />
            </Reveal>
            <Reveal delay={160}>
              <StatTile label="Built in" value="India" hint="INR pricing · GST invoices" tone="amber" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading title="What we value" description="The principles behind every product and project decision." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, index) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={(index % 4) * 70}>
                <div className="premium-card h-full rounded-2xl p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{v.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            title="A small team with a big obsession"
            description="Designers, engineers, and growth specialists who care about your conversion rate as much as you do."
          />
          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="image-frame relative min-h-72 overflow-hidden rounded-[1.75rem] sm:min-h-96">
              <Image
                src={MARKETING_IMAGES.team.src}
                alt={MARKETING_IMAGES.team.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 54vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 sm:bottom-6 sm:left-6">
                {["Design", "Engineering", "Growth"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/20 bg-slate-950/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="dark-panel relative flex h-full min-h-72 items-end overflow-hidden rounded-[1.75rem] p-6 text-white sm:p-8">
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" aria-hidden />
                <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/10" aria-hidden />
                <div className="relative">
                  <p className="section-kicker !text-emerald-300">Built close to the work</p>
                  <p className="mt-5 text-lg leading-relaxed text-white/75">
                    We keep the team lean and the feedback loop tight. When you talk to jsyxi — in the product or
                    on a consultation — you&apos;re talking to the people who build and run it.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <DualCta
        title="Come build with us"
        description="Try the platform free, or book a call to see what our agency can do for your growth."
      />
    </>
  );
}
