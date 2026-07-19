import Link from "next/link";
import { ArrowRight, Check, Sparkles, Star, Zap, Shield } from "lucide-react";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toolIcon } from "@/lib/tools/icons";

export default async function HomePage() {
  const [tools, testimonials] = await Promise.all([
    prisma.tool.findMany({ where: { status: "published" }, orderBy: { sortOrder: "asc" } }),
    prisma.siteTestimonial.findMany({ where: { approved: true, featured: true }, orderBy: { sortOrder: "asc" }, take: 3 }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-grid">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 text-center">
          <Badge tone="brand" className="mx-auto">
            <Sparkles className="h-3.5 w-3.5" /> 8 no-code widgets · one line of code
          </Badge>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Grow your store with widgets that <span className="text-brand-600">actually convert</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Add reviews, lead forms, popups, countdowns and more to any website — no developer needed.
            Or let our agency build and run your growth for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <ButtonLink href="/signup" size="lg">
              Start building free <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Book a free consultation
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs text-slate-500">No credit card required · Free plan forever</p>

          {/* Mock preview */}
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="rounded-2xl border border-line bg-white p-2 shadow-xl">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="grid gap-3 rounded-xl bg-canvas p-6 sm:grid-cols-3">
                {tools.slice(0, 6).map((t) => {
                  const Icon = toolIcon(t.key);
                  return (
                    <div key={t.id} className="flex items-center gap-3 rounded-lg border border-line bg-white p-3 text-left shadow-sm">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium text-ink">{t.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-6 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-brand-500" /> Loads in under 3s</span>
          <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-brand-500" /> Bot &amp; duplicate-view protection</span>
          <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-500" /> GST invoices included</span>
          <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" /> Loved by Indian brands</span>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink">Everything you need, in one place</h2>
          <p className="mt-3 text-slate-600">Pick a widget, customize it with a live preview, publish, and embed anywhere.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => {
            const Icon = toolIcon(t.key);
            return (
              <Link
                key={t.id}
                href={`/tools/${t.key}`}
                className="group rounded-xl border border-line bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-semibold text-ink group-hover:text-brand-700">{t.name}</h3>
                <p className="mt-1 text-sm text-slate-500 line-clamp-2">{t.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { n: "1", t: "Pick & customize", d: "Choose a tool, start from a template, and tune every colour and word with a live preview." },
              { n: "2", t: "Publish & embed", d: "Hit publish and copy one line of code into your site. Updates go live within minutes." },
              { n: "3", t: "Measure & grow", d: "Track views and conversions, and generate leads straight into your CRM." },
            ].map((s) => (
              <div key={s.n}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">{s.n}</span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-slate-600">{s.d}</p>
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
              <h2 className="text-3xl font-bold tracking-tight">Prefer we do it for you?</h2>
              <p className="mt-3 text-brand-100">
                Our agency designs, builds, and optimizes your storefront and campaigns — from setup to
                ongoing growth. Book a free consultation and get a plan tailored to your business.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="accent" size="lg">Book a consultation</ButtonLink>
                <ButtonLink href="/services" variant="secondary" size="lg">Explore services</ButtonLink>
              </div>
            </div>
            <ul className="space-y-3 text-brand-50">
              {["Store & landing-page design", "Widget setup & installation", "Lead-gen and CRM automation", "Ongoing conversion optimization"].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-accent-500" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-white border-y border-line">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="text-center text-3xl font-bold tracking-tight text-ink">Trusted by growing brands</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((r) => (
                <figure key={r.id} className="rounded-xl border border-line bg-canvas p-6">
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <blockquote className="mt-3 text-slate-700">&ldquo;{r.body}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold text-ink">{r.authorName}</span>
                    {r.authorRole && <span className="text-slate-500"> · {r.authorRole}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink">Start free in under a minute</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">Build your first widget today — upgrade only when you're ready.</p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/signup" size="lg">Create free account <ArrowRight className="h-4 w-4" /></ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" size="lg">See pricing</ButtonLink>
        </div>
      </section>
    </>
  );
}
