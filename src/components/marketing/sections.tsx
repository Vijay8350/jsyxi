import Image from "next/image";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";
import { renderMarkdown } from "@/lib/markdown";

type Cta = { href: string; label: string };

const START_FREE: Cta = { href: "/signup", label: "Start free" };
const BOOK_CALL: Cta = { href: "/contact", label: "Book a consultation" };

/**
 * Decorative brand visual for public-page heroes and feature bands.
 * It deliberately stays out of the accessibility tree: the surrounding copy
 * carries the meaning while this layer adds depth and a consistent tech feel.
 */
export function TechBackdrop({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`tech-backdrop ${dark ? "tech-backdrop--dark" : ""} ${className}`}
    >
      <Image
        src="/tech-growth-visual.png"
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 56vw"
        className="object-cover object-center"
      />
      <span className="tech-backdrop-node tech-backdrop-node--one" />
      <span className="tech-backdrop-node tech-backdrop-node--two" />
      <span className="tech-backdrop-node tech-backdrop-node--three" />
    </div>
  );
}

/** Canonical marketing hero (mirrors the home hero: bg-hero-grid, dual-CTA). */
export function PageHero({
  badge,
  title,
  highlight,
  description,
  primary = START_FREE,
  secondary = BOOK_CALL,
  note,
}: {
  badge?: React.ReactNode;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  description?: React.ReactNode;
  primary?: Cta;
  secondary?: Cta;
  note?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line/70">
      <div className="bg-hero-grid absolute inset-0 -z-20" aria-hidden />
      <div className="absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-brand-200/45 blur-3xl" aria-hidden />
      <div className="absolute -right-28 top-10 -z-10 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" aria-hidden />
      <TechBackdrop className="-z-10" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <Reveal>
          {badge && (
            <Badge tone="brand" className="mx-auto rounded-full bg-white/75 px-3 py-1.5 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> {badge}
            </Badge>
          )}
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.35rem,10.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-6xl">
            {title}{" "}
            {highlight && <span className="animate-gradient text-gradient-brand">{highlight}</span>}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">{description}</p>
          </Reveal>
        )}
        <Reveal delay={220}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primary.href} size="lg" className="w-full rounded-full px-7 sm:w-auto">
              {primary.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink
              href={secondary.href}
              variant="secondary"
              size="lg"
              className="w-full rounded-full px-7 sm:w-auto"
            >
              {secondary.label}
            </ButtonLink>
          </div>
          {note && <p className="mt-4 text-xs text-slate-500">{note}</p>}
        </Reveal>
        <div className="mx-auto mt-14 h-px max-w-4xl bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs font-medium text-slate-500">
          <span>Launch in minutes</span>
          <span className="hidden h-1 w-1 rounded-full bg-brand-400 sm:block" aria-hidden />
          <span>No developer required</span>
          <span className="hidden h-1 w-1 rounded-full bg-brand-400 sm:block" aria-hidden />
          <span>Built for fast storefronts</span>
        </div>
      </div>
    </section>
  );
}

/** Dual-CTA closing band used at the foot of every marketing page. */
export function DualCta({
  title = "Start free in under a minute",
  description = "Build your first widget today — or let our agency build and run your growth for you.",
  primary = { href: "/signup", label: "Create free account" },
  secondary = BOOK_CALL,
}: {
  title?: string;
  description?: string;
  primary?: Cta;
  secondary?: Cta;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <div className="dark-panel relative overflow-hidden rounded-[1.75rem] px-5 py-12 text-center text-white shadow-2xl shadow-emerald-950/15 sm:rounded-[2rem] sm:px-12 sm:py-16">
          <TechBackdrop dark />
          <div aria-hidden className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
          <div aria-hidden className="absolute -right-3 -top-3 h-36 w-36 rounded-full border border-white/10" />
          <p className="section-kicker relative justify-center !text-emerald-300">Ready when you are</p>
          <h2 className="relative mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/65">{description}</p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={primary.href}
              size="lg"
              className="w-full rounded-full bg-white px-7 text-ink hover:bg-emerald-50 sm:w-auto"
            >
              {primary.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink
              href={secondary.href}
              variant="ghost"
              size="lg"
              className="w-full rounded-full border border-white/15 px-7 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Simple centered section heading. */
export function SectionHeading({
  title,
  description,
  eyebrow,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
}) {
  return (
    <Reveal className="text-center">
      {eyebrow && <p className="section-kicker justify-center">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">{description}</p>}
    </Reveal>
  );
}

/** Renders a plain-text body (paragraphs split on blank lines) as readable prose. */
export function ArticleBody({ body }: { body: string }) {
  // Renders the article's Markdown (headings, bold/italic, links, images, lists)
  // as safe React elements. See src/lib/markdown.tsx.
  return renderMarkdown(body);
}

/** No-JS FAQ list built on native <details>. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="glass-panel mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-2xl">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-1 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-ink">
            {item.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-300 group-open:rotate-45">
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="max-w-2xl pb-5 text-sm leading-relaxed text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
