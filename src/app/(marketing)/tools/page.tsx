import type { Metadata } from "next";
import Image from "next/image";
import { Activity, BarChart3, Code2, MousePointerClick, Palette, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import { ToolsCatalog, type CatalogTool } from "@/components/marketing/tools-catalog";
import { DualCta, PageHero } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "Tools catalog",
  description:
    "Browse jsyxi's no-code widgets — reviews, forms, popups, countdowns, WhatsApp chat, FAQ, Instagram feed, and maps. Try any of them live before you sign up.",
};

const STEPS = [
  { icon: MousePointerClick, t: "Pick & customize", d: "Choose a widget and tune every colour and word with a live preview." },
  { icon: Code2, t: "Publish & embed", d: "Copy one line of code into your site — updates go live in minutes." },
  { icon: BarChart3, t: "Measure & grow", d: "Track views and conversions, with leads routed to your CRM." },
];

const SYSTEM_FEATURES = [
  {
    icon: Palette,
    title: "Brand-native",
    description: "Match your colours, content, and storefront without rebuilding the experience.",
  },
  {
    icon: Activity,
    title: "Live by design",
    description: "Preview every change before publishing and keep improving from real signals.",
  },
  {
    icon: ShieldCheck,
    title: "Built to stay light",
    description: "Use one focused embed instead of stitching together another heavy workflow.",
  },
];

export default async function ToolsPage() {
  const [tools, categories] = await Promise.all([
    prisma.tool.findMany({
      where: { status: "published" },
      include: { category: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.toolCategory.findMany({ where: { status: "active" }, orderBy: { sortOrder: "asc" } }),
  ]);

  const data: CatalogTool[] = tools.map((t) => ({
    id: t.id,
    key: t.key,
    name: t.name,
    description: t.description,
    categorySlug: t.category.slug,
    badges: t.badges,
  }));

  return (
    <>
      <PageHero
        badge={`${tools.length} no-code widgets · one line of code`}
        title="The widget toolkit for"
        highlight="growing stores"
        description="Everything you need to add social proof, capture leads, and create urgency — no developer required. Try any widget live, then publish when it feels right."
        primary={{ href: "#catalog", label: "Browse tools" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
        note="Every tool includes a live, no-signup demo."
      />

      {/* Connected product visual */}
      <section
        aria-labelledby="toolkit-system-heading"
        className="relative z-10 mx-auto -mt-7 max-w-7xl px-4 sm:-mt-10 sm:px-6"
      >
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 p-3 shadow-2xl shadow-slate-950/20 sm:rounded-[2.25rem] sm:p-5">
            <div
              className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid items-stretch gap-4 lg:grid-cols-[1.12fr_0.88fr]">
              <div className="group relative min-h-[280px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-900 sm:min-h-[390px] lg:min-h-[460px]">
                <Image
                  src="/tech-growth-visual.png"
                  alt="Connected storefront widgets, customer signals, and growth analytics"
                  fill
                  sizes="(min-width: 1024px) 54vw, (min-width: 640px) 92vw, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2 sm:inset-x-5 sm:bottom-5">
                  {["Social proof", "Lead capture", "Live analytics"].map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                  One connected growth layer
                </p>
                <h2
                  id="toolkit-system-heading"
                  className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
                >
                  Make every storefront interaction feel intentional.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                  Turn reviews, forms, urgency, and chat into a consistent customer journey—with the feedback
                  loop to keep making it better.
                </p>

                <ul className="mt-7 space-y-3">
                  {SYSTEM_FEATURES.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Reveal key={feature.title} as="li" delay={100 + index * 70} y={10}>
                        <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3.5 transition-colors hover:bg-white/[0.075] motion-reduce:transition-none">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-400/15 text-brand-200">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-white">{feature.title}</span>
                            <span className="mt-0.5 block text-xs leading-5 text-slate-400">
                              {feature.description}
                            </span>
                          </span>
                        </div>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Catalog */}
      <section id="catalog" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <ToolsCatalog tools={data} categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />
        </Reveal>
      </section>

      {/* How it works */}
      <section aria-labelledby="toolkit-process-heading" className="relative overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.08),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">From idea to signal</p>
            <h2 id="toolkit-process-heading" className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ship a sharper storefront in three steps.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, index) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.t} delay={index * 80}>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-brand-300/30 hover:bg-white/[0.08] motion-reduce:transform-none motion-reduce:transition-none">
                    <span className="absolute right-5 top-4 text-5xl font-black text-white/[0.035]" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-400/15 text-brand-200">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-white">{s.t}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{s.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <DualCta />
    </>
  );
}
