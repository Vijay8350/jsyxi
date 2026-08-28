import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Sparkles, Check, Clock, Puzzle, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { LeadForm } from "@/components/marketing/lead-form";
import { SectionHeading } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export const metadata: Metadata = {
  title: "jsyxi for Shopify",
  description:
    "Native jsyxi apps for Shopify are on the way. Use our widgets on your Shopify store today with a one-line embed — and get free install help from our team.",
};

const ROADMAP = [
  {
    icon: Wrench,
    title: "One-line embed — available today",
    body: "Every jsyxi widget already works on Shopify. Paste a single snippet into your theme and you're live — no app install required.",
    now: true,
  },
  {
    icon: Puzzle,
    title: "Native Shopify app — coming soon",
    body: "We're building a native app for the Shopify App Store: one-click install, theme-app-extension blocks, and deep product integration.",
    now: false,
  },
  {
    icon: Sparkles,
    title: "Product-aware widgets — on the roadmap",
    body: "Reviews tied to products, cart-aware popups, and countdowns that sync with your sales — powered directly by your Shopify catalog.",
    now: false,
  },
];

const BENEFITS = [
  "Works with any Shopify theme",
  "No developer or theme edits needed",
  "Loads in under 3 seconds",
  "GST-compliant invoicing for Indian merchants",
  "Reviews, forms, popups, countdowns & more",
  "Free installation help from our team",
];

export default function ShopifyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line/70">
        <div className="bg-hero-grid absolute inset-0 -z-20" aria-hidden />
        <div className="absolute -left-24 top-12 -z-10 h-72 w-72 rounded-full bg-brand-300/35 blur-3xl" aria-hidden />
        <div className="absolute -right-24 top-0 -z-10 h-96 w-96 rounded-full bg-emerald-300/25 blur-3xl" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
          <div className="text-center lg:text-left">
            <Reveal>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-700/20">
                  <ShoppingBag className="h-6 w-6" aria-hidden />
                </span>
                <Badge tone="brand">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden /> Native apps coming soon
                </Badge>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mx-auto mt-6 max-w-3xl text-[clamp(2.5rem,10vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-ink lg:mx-0">
                Supercharge your <span className="animate-gradient text-gradient-brand">Shopify store</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 lg:mx-0">
                Add reviews, lead forms, popups, countdowns and more to your Shopify store today with a one-line
                embed. Native Shopify apps are on the way — and our team will help you install everything for free.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <ButtonLink href="/signup" size="lg" className="w-full rounded-full px-7 sm:w-auto">
                  Start free{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </ButtonLink>
                <ButtonLink
                  href="#install-help"
                  variant="secondary"
                  size="lg"
                  className="w-full rounded-full px-7 sm:w-auto"
                >
                  Get free install help
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="tech-feature-visual relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-emerald-300/15 bg-[#071311] shadow-2xl shadow-emerald-950/20 sm:rounded-[2rem]">
              <Image
                src="/tech-growth-visual.png"
                alt="Connected Shopify growth tools for reviews, lead capture, and conversion analytics"
                fill
                preload
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover"
              />
              <div className="tech-scan-line absolute inset-x-0 top-0 h-px bg-emerald-200/80" aria-hidden />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/65 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md sm:left-6 sm:top-6">
                <span className="h-2 w-2 rounded-full bg-emerald-300 motion-safe:animate-pulse" aria-hidden />
                Storefront connected
              </div>
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 sm:inset-x-6 sm:bottom-6">
                {["Reviews", "Leads", "Urgency"].map((label) => (
                  <span
                    key={label}
                    className="rounded-xl border border-white/15 bg-slate-950/60 px-2 py-2 text-center text-[10px] font-semibold text-white backdrop-blur-md sm:px-3 sm:text-xs"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading
          title="Where we are with Shopify"
          description="Use jsyxi on Shopify right now, with more native power arriving soon."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ROADMAP.map((r, index) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={index * 80}>
                <div className="premium-card relative h-full overflow-hidden rounded-2xl p-6">
                  <span
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-emerald-300"
                    aria-hidden
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    {r.now ? (
                      <Badge tone="green">Available now</Badge>
                    ) : (
                      <Badge tone="slate">
                        <Clock className="h-3 w-3" aria-hidden /> Coming soon
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-5 font-semibold text-ink">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-ink">Built for Indian Shopify merchants</h2>
                <p className="mt-3 text-slate-600">
                  Everything you need to convert more of your store&apos;s traffic — without touching code or slowing
                  down your theme.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <Check className="h-5 w-5 shrink-0 text-brand-500" aria-hidden /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100} className="relative pb-8">
              <div className="image-frame relative aspect-[4/3] rounded-[1.75rem] sm:rounded-[2rem]">
                <Image
                  src={MARKETING_IMAGES.merchant.src}
                  alt={MARKETING_IMAGES.merchant.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
              </div>
              <div className="glass-panel absolute inset-x-4 bottom-0 rounded-2xl p-4 font-mono text-[11px] text-slate-600 sm:inset-x-8">
                <span className="text-brand-700">&lt;script</span> src=&quot;cdn.jsyxi.com/embed.js&quot;
                <br />
                &nbsp;&nbsp;data-widget=&quot;your-widget-key&quot;<span className="text-brand-700">&gt;&lt;/script&gt;</span>
                <p className="mt-2 font-sans text-xs text-slate-500">
                  One snippet, any theme. Or let us install it for you.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Install help lead form */}
      <section id="install-help" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6">
        <div className="dark-panel relative overflow-hidden rounded-[1.75rem] px-5 py-10 shadow-2xl shadow-emerald-950/15 sm:rounded-[2rem] sm:px-8 sm:py-12 lg:px-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" aria-hidden />
          <div className="absolute right-16 top-12 h-24 w-24 rounded-full border border-white/10" aria-hidden />
          <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Reveal>
              <div>
                <Badge tone="brand">Free install help</Badge>
                <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                  We&apos;ll set it up on your store
                </h2>
                <p className="mt-4 leading-relaxed text-white/65">
                  Tell us about your Shopify store and which widgets you&apos;d like. Our team will help you install
                  and configure everything — free of charge. We&apos;ll also let you know the moment our native Shopify
                  app is live.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Personalized widget recommendations",
                    "Hands-on installation on your theme",
                    "Early access to the native Shopify app",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/75">
                      <Check className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl border border-white/60 bg-white p-5 shadow-2xl shadow-black/20 sm:p-8">
                <h3 className="text-lg font-semibold text-ink">Request Shopify install help</h3>
                <p className="mt-1 mb-5 text-sm text-slate-500">
                  Share your store and goals — we&apos;ll take it from there.
                </p>
                <LeadForm
                  source="quote"
                  serviceTopic="shopify"
                  submitLabel="Request install help"
                  pendingText="Sending…"
                  messageLabel="Your store & what you need"
                  messagePlaceholder="Your Shopify store URL and the widgets you're interested in…"
                  successTitle="Request received!"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
