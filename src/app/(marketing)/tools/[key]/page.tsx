import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MousePointerClick, Code2, Zap, ShieldCheck, Check } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { toolIcon } from "@/lib/tools/icons";
import type { ToolConfigSchema } from "@/lib/tools/types";
import { ToolDemo } from "@/components/marketing/tool-demo";
import { DualCta } from "@/components/marketing/sections";

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

  const Icon = toolIcon(tool.key);
  const schema = tool.configSchema as unknown as ToolConfigSchema;

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-grid">
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-10">
          <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700">
            <ArrowLeft className="h-4 w-4" /> All tools
          </Link>
          <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
              <Icon className="h-8 w-8" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{tool.name}</h1>
                {tool.badges.map((b) => (
                  <Badge key={b} tone={badgeTone(b)}>
                    {b}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 max-w-2xl text-lg text-slate-600">{tool.description}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/signup" size="lg">
              Sign up to publish &amp; embed
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See pricing
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Live demo */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 text-center">
          <Badge tone="brand" className="mx-auto">
            Live demo · no signup needed
          </Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">Try it now — tweak it live</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Edit the options on the left and watch the preview update instantly. Your changes are saved for when you
            sign up.
          </p>
        </div>
        <ToolDemo toolKey={tool.key} schema={schema} />
      </section>

      {/* Features */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink">Why teams use {tool.name}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Built to be quick to launch, easy to change, and light on your page.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => {
              const FIcon = f.icon;
              return (
                <div key={f.t} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <FIcon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{f.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{f.d}</p>
                </div>
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
            {tool.templates.map((tpl) => (
              <div key={tpl.id} className="rounded-xl border border-line bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <h3 className="font-semibold text-ink">{tpl.name}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  {[tpl.useCase, tpl.industry].filter(Boolean).join(" · ") || "Ready-to-use preset"}
                </p>
              </div>
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
