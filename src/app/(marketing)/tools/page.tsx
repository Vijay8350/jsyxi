import type { Metadata } from "next";
import { Sparkles, MousePointerClick, Code2, BarChart3 } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { ToolsCatalog, type CatalogTool } from "@/components/marketing/tools-catalog";
import { DualCta } from "@/components/marketing/sections";

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
      {/* Hero */}
      <section className="bg-hero-grid">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 text-center">
          <Badge tone="brand" className="mx-auto">
            <Sparkles className="h-3.5 w-3.5" /> {tools.length} no-code widgets · one line of code
          </Badge>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            The widget toolkit for <span className="text-brand-600">growing stores</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Everything you need to add social proof, capture leads, and create urgency — no developer required.
            Try any widget live, then sign up to publish and embed.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <ToolsCatalog tools={data} categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.t}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-slate-600">{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <DualCta />
    </>
  );
}
