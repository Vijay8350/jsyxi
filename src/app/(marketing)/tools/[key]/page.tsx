import type { Metadata } from "next";
import { createElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MousePointerClick, Code2, Zap, ShieldCheck, Check, Star } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { toolIcon } from "@/lib/tools/icons";
import type { ToolConfigSchema } from "@/lib/tools/types";
import { ToolDemo } from "@/components/marketing/tool-demo";
import { DualCta, TechBackdrop } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";

type Params = { params: Promise<{ key: string }> };

async function getTool(key: string) {
  return prisma.tool.findFirst({
    where: { key, status: "published" },
    include: {
      category: true,
      templates: { where: { status: "published" }, orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function generateStaticParams() {
  const tools = await prisma.tool.findMany({ where: { status: "published" }, select: { key: true } });
  return tools.map((t) => ({ key: t.key }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { key } = await params;
  const tool = await getTool(key);
  if (!tool) return { title: "Tool not found" };
  return {
    title: `${tool.name} widget`,
    description: `${tool.description} Try the ${tool.name} widget live, then sign up to publish and embed it with one line of code.`,
  };
}

function badgeTone(b: string): "amber" | "green" | "brand" | "slate" {
  if (b === "Popular") return "amber";
  if (b === "New") return "green";
  if (b === "Conversion") return "brand";
  return "slate";
}

const FEATURES = [
  { icon: MousePointerClick, t: "No code needed", d: "Configure everything in a simple form with a live preview — no developer, no theme edits." },
  { icon: Code2, t: "One-line embed", d: "Publish and copy a single snippet into your site. Updates go live within minutes." },
  { icon: Zap, t: "Fast & lightweight", d: "Loads in under three seconds so it never slows down your page or hurts SEO." },
  { icon: ShieldCheck, t: "Trusted by default", d: "Bot and duplicate-view protection built in, with clear analytics you can rely on." },
];

export default async function ToolLandingPage({ params }: Params) {
  const { key } = await params;
  const tool = await getTool(key);
  if (!tool) notFound();

  const schema = tool.configSchema as unknown as ToolConfigSchema;

  // Approved reviews for this tool, with site-wide ones as fallback so the section
  // is never empty. Tool-specific reviews are shown first. Rating is the honest
  // average of the reviews actually shown.
  const reviewRows = await prisma.siteTestimonial.findMany({
    where: { approved: true, OR: [{ toolKey: key }, { toolKey: null }] },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 12,
  });
  const reviews = [...reviewRows]
    .sort((a, b) => Number(b.toolKey === key) - Number(a.toolKey === key))
    .slice(0, 6);
  const avgRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line/70 bg-hero-grid">
        <TechBackdrop className="-z-10" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <Link
            href="/tools"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" /> All tools
          </Link>
          <Reveal className="mt-5 max-w-3xl">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <span className="animate-float flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
                {createElement(toolIcon(tool.key), { className: "h-8 w-8" })}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-[clamp(2.35rem,9vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink">
                    {tool.name}
                  </h1>
                  {tool.badges.map((b) => (
                    <Badge key={b} tone={badgeTone(b)}>
                      {b}
                    </Badge>
                  ))}
                </div>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{tool.description}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/signup" size="lg" className="w-full rounded-full sm:w-auto">
              Sign up to publish &amp; embed
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg" className="w-full rounded-full sm:w-auto">
              See pricing
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Live demo */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <Reveal className="mb-6 text-center">
          <Badge tone="brand" className="mx-auto">
            Live demo · no signup needed
          </Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">Try it now — tweak it live</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Edit the options on the left and watch the preview update instantly. Your changes are saved for when you
            sign up.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ToolDemo toolKey={tool.key} schema={schema} />
        </Reveal>
      </section>

      {/* Ratings & reviews */}
      {reviews.length > 0 && (
        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <Reveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                <Badge tone="amber" className="mx-auto sm:mx-0">Ratings &amp; reviews</Badge>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">Loved by {tool.name} users</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-5xl font-extrabold leading-none text-ink">{avgRating.toFixed(1)}</span>
                <div>
                  <div className="flex gap-0.5" aria-label={`${avgRating.toFixed(1)} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={i < Math.round(avgRating) ? "h-5 w-5 fill-current text-amber-400" : "h-5 w-5 fill-none text-slate-200"}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {reviews.length} review{reviews.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {reviews.map((review, index) => (
                <Reveal key={review.id} delay={(index % 3) * 70}>
                  <figure className="premium-card flex h-full flex-col rounded-2xl p-6">
                    <div className="flex gap-0.5 text-amber-400" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700">
                      &ldquo;{review.body}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">
                        {review.authorName.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                      </span>
                      <span className="text-sm">
                        <span className="block font-semibold text-ink">{review.authorName}</span>
                        {review.authorRole && <span className="block text-xs text-slate-500">{review.authorRole}</span>}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink">Why teams use {tool.name}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Built to be quick to launch, easy to change, and light on your page.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, index) => {
              const FIcon = f.icon;
              return (
                <Reveal key={f.t} delay={(index % 4) * 70}>
                  <div className="premium-card h-full rounded-2xl p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <FIcon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-semibold text-ink">{f.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use cases (from templates) */}
      {tool.templates.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink">Popular use cases</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Start from a ready-made template and make it yours in minutes.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tool.templates.map((tpl, index) => (
              <Reveal key={tpl.id} delay={(index % 3) * 70}>
                <div className="premium-card h-full rounded-xl p-5">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <h3 className="font-semibold text-ink">{tpl.name}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {[tpl.useCase, tpl.industry].filter(Boolean).join(" · ") || "Ready-to-use preset"}
                </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Curious about limits and plans?{" "}
            <Link href="/pricing" className="font-medium text-brand-600 hover:text-brand-700">
              See pricing
            </Link>
            .
          </p>
        </section>
      )}

      <DualCta
        title={`Ready to launch ${tool.name}?`}
        description="Sign up free to publish and embed it — or let our agency set it up for you."
        primary={{ href: "/signup", label: "Start free" }}
      />
    </>
  );
}
