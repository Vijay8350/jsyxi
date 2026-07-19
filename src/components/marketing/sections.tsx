import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

type Cta = { href: string; label: string };

const START_FREE: Cta = { href: "/signup", label: "Start free" };
const BOOK_CALL: Cta = { href: "/contact", label: "Book a consultation" };

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
    <section className="bg-hero-grid">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-16 text-center">
        {badge && (
          <Badge tone="brand" className="mx-auto">
            {badge}
          </Badge>
        )}
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          {title} {highlight && <span className="text-brand-600">{highlight}</span>}
        </h1>
        {description && <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">{description}</p>}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={primary.href} size="lg">
            {primary.label} <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="secondary" size="lg">
            {secondary.label}
          </ButtonLink>
        </div>
        {note && <p className="mt-4 text-xs text-slate-500">{note}</p>}
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
    <section className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">{description}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href={primary.href} size="lg">
          {primary.label} <ArrowRight className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink href={secondary.href} variant="secondary" size="lg">
          {secondary.label}
        </ButtonLink>
      </div>
    </section>
  );
}

/** Simple centered section heading. */
export function SectionHeading({ title, description }: { title: React.ReactNode; description?: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-ink">{title}</h2>
      {description && <p className="mx-auto mt-3 max-w-2xl text-slate-600">{description}</p>}
    </div>
  );
}

/** Renders a plain-text body (paragraphs split on blank lines) as readable prose. */
export function ArticleBody({ body }: { body: string }) {
  const blocks = body
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <div className="space-y-4 text-[17px] leading-relaxed text-slate-700">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-4 text-2xl font-bold text-ink">
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith("# ")) {
          return (
            <h2 key={i} className="pt-4 text-2xl font-bold text-ink">
              {block.slice(2)}
            </h2>
          );
        }
        return <p key={i}>{block}</p>;
      })}
    </div>
  );
}

/** No-JS FAQ list built on native <details>. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-xl border border-line bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
            {item.q}
            <span className="text-brand-600 transition-transform group-open:rotate-180">⌄</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
