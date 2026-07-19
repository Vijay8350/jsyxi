import type { Metadata } from "next";
import { ShoppingBag, Sparkles, Check, Clock, Puzzle, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { LeadForm } from "@/components/marketing/lead-form";
import { SectionHeading } from "@/components/marketing/sections";

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
      <section className="bg-hero-grid">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
            <ShoppingBag className="h-7 w-7" />
          </span>
          <Badge tone="brand" className="mx-auto mt-5">
            <Sparkles className="h-3.5 w-3.5" /> Native apps coming soon
          </Badge>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Supercharge your <span className="text-brand-600">Shopify store</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Add reviews, lead forms, popups, countdowns and more to your Shopify store today with a one-line embed.
            Native Shopify apps are on the way — and our team will help you install everything for free.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/signup" size="lg">
              Start free
            </ButtonLink>
            <ButtonLink href="#install-help" variant="secondary" size="lg">
              Get free install help
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading
          title="Where we are with Shopify"
          description="Use jsyxi on Shopify right now, with more native power arriving soon."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ROADMAP.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  {r.now ? (
                    <Badge tone="green">Available now</Badge>
                  ) : (
                    <Badge tone="slate">
                      <Clock className="h-3 w-3" /> Coming soon
                    </Badge>
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{r.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-ink">Built for Indian Shopify merchants</h2>
              <p className="mt-3 text-slate-600">
                Everything you need to convert more of your store&apos;s traffic — without touching code or slowing
                down your theme.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <Check className="h-5 w-5 shrink-0 text-brand-500" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-canvas p-6">
              <div className="rounded-xl border border-line bg-white p-4 font-mono text-xs text-slate-600 shadow-sm">
                <span className="text-slate-400">&lt;!-- Paste before &lt;/body&gt; --&gt;</span>
                <br />
                &lt;script src=&quot;https://cdn.jsyxi.com/embed.js&quot;
                <br />
                &nbsp;&nbsp;data-widget=&quot;your-widget-key&quot;&gt;&lt;/script&gt;
              </div>
              <p className="mt-4 text-sm text-slate-500">
                One snippet, any theme. Publish a widget in jsyxi and copy its embed into your Shopify theme — or let
                us do it for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Install help lead form */}
      <section id="install-help" className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Badge tone="brand">Free install help</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink">We&apos;ll set it up on your store</h2>
            <p className="mt-3 text-slate-600">
              Tell us about your Shopify store and which widgets you&apos;d like. Our team will help you install and
              configure everything — free of charge. We&apos;ll also let you know the moment our native Shopify app is
              live.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Personalized widget recommendations",
                "Hands-on installation on your theme",
                "Early access to the native Shopify app",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Check className="h-5 w-5 shrink-0 text-emerald-500" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
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
        </div>
      </section>
    </>
  );
}
