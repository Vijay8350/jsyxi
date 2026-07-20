import Link from "next/link";
import { ArrowRight, Check, Sparkles, Star, Zap, Shield } from "lucide-react";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toolIcon } from "@/lib/tools/icons";
import { Reveal } from "@/components/marketing/reveal";

export default async function HomePage() {
  const [tools, testimonials] = await Promise.all([
    prisma.tool.findMany({ where: { status: "published" }, orderBy: { sortOrder: "asc" } }),
    prisma.siteTestimonial.findMany({ where: { approved: true, featured: true }, orderBy: { sortOrder: "asc" }, take: 3 }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-grid bg-brand-glow">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-float absolute -left-24 top-4 h-72 w-72 rounded-full bg-brand-300/40 blur-3xl" />
          <div className="animate-float absolute right-0 top-24 h-80 w-80 rounded-full bg-accent-400/25 blur-3xl" style={{ animationDelay: "1.6s" }} />
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 text-center">
          <Reveal>
            <Badge tone="brand" className="mx-auto ring-1 ring-brand-200">
              <Sparkles className="h-3.5 w-3.5" /> 8 no-code widgets · one line of code
            </Badge>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
              Grow your store with widgets that{" "}
              <span className="animate-gradient text-gradient-brand">actually convert</span>
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              Add reviews, lead forms, popups, countdowns and more to any website — no developer needed.
              Or let our agency build and run your growth for you.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink href="/signup" size="lg">
                Start building free <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Book a free consultation
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-slate-500">No credit card required · Free plan forever</p>
          </Reveal>

          {/* Mock preview */}
          <Reveal delay={300} className="mx-auto mt-14 max-w-4xl">
            <div className="rounded-2xl border border-line bg-white p-2 shadow-2xl shadow-brand-600/10">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="grid gap-3 rounded-xl bg-canvas p-6 sm:grid-cols-3">
                {tools.slice(0, 6).map((t, i) => {
                  const Icon = toolIcon(t.key);
                  return (
                    <div
                      key={t.id}
                      className="hover-lift flex items-center gap-3 rounded-lg border border-line bg-white p-3 text-left shadow-sm hover:border-brand-200"
                      style={{ animation: "jsyxi-fade-up 0.6s ease-out both", animationDelay: `${350 + i * 70}ms` }}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium text-ink">{t.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
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
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink">Everything you need, in one place</h2>
          <p className="mt-3 text-slate-600">Pick a widget, customize it with a live preview, publish, and embed anywhere.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t, i) => {
            const Icon = toolIcon(t.key);
            return (
              <Reveal key={t.id} delay={(i % 4) * 80}>
                <Link
                  href={`/tools/${t.key}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/10"
                >
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 -top-px h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-accent-400 transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink group-hover:text-brand-700">{t.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">{t.description}</p>
                </Link>
              </Reveal>
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
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <span className="bg-brand-gradient-deep flex h-11 w-11 items-center justify-center rounded-full font-bold text-white shadow-md shadow-brand-600/20">{s.n}</span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-slate-600">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agency band */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="bg-brand-gradient-deep animate-gradient relative overflow-hidden rounded-3xl px-8 py-14 text-white shadow-xl shadow-brand-600/20 sm:px-12">
            <div aria-hidden className="animate-float pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Prefer we do it for you?</h2>
                <p className="mt-3 text-white/85">
                  Our agency designs, builds, and optimizes your storefront and campaigns — from setup to
                  ongoing growth. Book a free consultation and get a plan tailored to your business.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" variant="secondary" size="lg">Book a consultation</ButtonLink>
                  <ButtonLink href="/services" variant="ghost" size="lg" className="text-white hover:bg-white/15 hover:text-white">Explore services</ButtonLink>
                </div>
              </div>
              <ul className="space-y-3 text-white/90">
                {["Store & landing-page design", "Widget setup & installation", "Lead-gen and CRM automation", "Ongoing conversion optimization"].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="h-5 w-5 shrink-0 text-white" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-white border-y border-line">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <Reveal><h2 className="text-center text-3xl font-bold tracking-tight text-ink">Trusted by growing brands</h2></Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((r, i) => (
                <Reveal key={r.id} delay={i * 90}>
                  <figure className="hover-lift h-full rounded-2xl border border-line bg-canvas p-6 hover:border-brand-200">
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                    </div>
                    <blockquote className="mt-3 text-slate-700">&ldquo;{r.body}&rdquo;</blockquote>
                    <figcaption className="mt-4 text-sm">
                      <span className="font-semibold text-ink">{r.authorName}</span>
                      {r.authorRole && <span className="text-slate-500"> · {r.authorRole}</span>}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-ink">
            Start free in{" "}
            <span className="animate-gradient text-gradient-brand">under a minute</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">Build your first widget today — upgrade only when you&apos;re ready.</p>
          <div className="mt-8 flex justify-center gap-3">
            <ButtonLink href="/signup" size="lg">Create free account <ArrowRight className="h-4 w-4" /></ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">See pricing</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
