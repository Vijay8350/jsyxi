import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CircleGauge,
  Code2,
  Layers3,
  MousePointerClick,
  Radio,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { MARKETING_IMAGES } from "@/lib/marketing-images";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toolIcon } from "@/lib/tools/icons";
import { DualCta, SectionHeading } from "@/components/marketing/sections";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { Reveal } from "@/components/marketing/reveal";
import { TechNetwork } from "@/components/marketing/tech-network";

const STEPS = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Pick a growth moment",
    body: "Start with reviews, urgency, lead capture, chat, or another proven conversion pattern.",
  },
  {
    icon: Code2,
    number: "02",
    title: "Make it unmistakably yours",
    body: "Shape the copy, colours, and behavior while the live preview updates beside you.",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Publish, learn, improve",
    body: "Embed one line, track real views, and keep refining without another development cycle.",
  },
];

const INTEGRATIONS = ["Shopify", "WordPress", "WooCommerce", "Webflow", "Framer", "Custom storefronts"];

export default async function HomePage() {
  const [tools, toolCount, testimonials] = await Promise.all([
    prisma.tool.findMany({
      where: { status: "published" },
      orderBy: { sortOrder: "asc" },
      take: 8,
      select: {
        id: true,
        key: true,
        name: true,
        description: true,
      },
    }),
    prisma.tool.count({ where: { status: "published" } }),
    prisma.siteTestimonial.findMany({
      where: { approved: true, featured: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
  ]);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line/70">
        <div className="bg-hero-grid absolute inset-0 -z-20" aria-hidden />
        <div className="absolute -left-52 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-200/50 blur-3xl" aria-hidden />
        <div className="absolute -right-48 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-emerald-200/40 blur-3xl" aria-hidden />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-12 sm:gap-14 sm:px-6 sm:py-20 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:py-16">
          <div className="relative z-10 text-center lg:text-left">
            <Reveal>
              <Badge tone="brand" className="mx-auto rounded-full bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur lg:mx-0">
                <Sparkles className="h-3.5 w-3.5" />
                {toolCount || 8} no-code widgets · one growth workspace
              </Badge>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mx-auto mt-7 max-w-2xl text-[clamp(2.7rem,11.5vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:mx-0 lg:text-[4.45rem]">
                Turn more visits into{" "}
                <span className="animate-gradient text-gradient-brand">moments that convert.</span>
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-xl lg:mx-0">
                Launch polished reviews, forms, popups, countdowns, WhatsApp chat, and more—without waiting on a
                developer. Build it yourself or hand the whole growth stack to our agency.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink href="/signup" size="lg" className="w-full rounded-full px-7 sm:w-auto">
                  Start building free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="w-full rounded-full px-7 sm:w-auto"
                >
                  Book a free consultation
                </ButtonLink>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 lg:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> No credit card
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> Free plan forever
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> One-line embed
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} y={24} className="relative lg:-mr-10">
            <ProductShowcase />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line/70 bg-white/75 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-1 px-4 min-[420px]:grid-cols-2 sm:px-6 md:grid-cols-4">
          {[
            { value: "< 3s", label: "page-load target", icon: Zap },
            { value: `${toolCount || 8}+`, label: "conversion widgets", icon: Sparkles },
            { value: "1 line", label: "to embed anywhere", icon: Code2 },
            { value: "Protected", label: "from bots & duplicates", icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 border-b border-line/70 px-3 py-4 last:border-b-0 min-[420px]:[&:nth-child(3)]:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{item.value}</p>
                  <p className="text-[11px] text-slate-500">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden border-b border-line/70 bg-white/60 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 sm:px-6">
          <p className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">
            Works where you sell
          </p>
          <div className="integration-rail min-w-0 flex-1" role="list" aria-label="Compatible commerce platforms">
            <div className="integration-rail-track">
              {[...INTEGRATIONS, ...INTEGRATIONS].map((name, index) => (
                <span
                  key={`${name}-${index}`}
                  role={index < INTEGRATIONS.length ? "listitem" : undefined}
                  aria-hidden={index >= INTEGRATIONS.length}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-semibold text-slate-500"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_12px_rgba(45,212,191,0.7)]" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <div className="dark-panel tech-feature-grid overflow-hidden rounded-[2rem] text-white shadow-2xl shadow-emerald-950/15 sm:rounded-[2.5rem]">
            <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
              <p className="section-kicker !text-emerald-300">One connected growth layer</p>
              <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
                Every signal becomes a smarter next move.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
                See what visitors respond to, route high-intent leads, and improve the moments that matter without
                stitching together another stack.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  {
                    icon: Radio,
                    title: "Live visitor signals",
                    body: "Views, clicks, and leads arrive in one workspace.",
                  },
                  {
                    icon: CircleGauge,
                    title: "Conversion clarity",
                    body: "Know which widget and page created the action.",
                  },
                  {
                    icon: Layers3,
                    title: "Built to compound",
                    body: "Launch fast, learn quickly, and keep every win.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group flex gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition duration-300 hover:border-emerald-300/30 hover:bg-white/[0.085]"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-300/10 text-emerald-300 ring-1 ring-emerald-300/20">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-white">{item.title}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-white/50">{item.body}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <ButtonLink
                href="/tools"
                variant="ghost"
                className="mt-8 w-fit rounded-full border border-white/15 bg-white/[0.08] px-5 text-white hover:bg-white/[0.14] hover:text-white"
              >
                Explore the growth workspace <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <div className="tech-feature-visual relative aspect-[5/4] min-h-[340px] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[610px]">
              <Image
                src="/tech-growth-visual.png"
                alt="A connected commerce growth system with storefront, review, lead, and analytics modules"
                fill
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover object-[62%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071311] via-[#071311]/20 to-transparent lg:from-[#071311]/75" />
              <div
                className="tech-scan-line absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/90 to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-3.5 backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white">
                  <Activity className="h-4 w-4 text-emerald-300" />
                  Growth engine online
                </span>
                <span className="inline-flex items-center gap-2 text-[11px] text-white/55">
                  <span className="animate-pulse-ring h-2 w-2 rounded-full bg-emerald-300" />
                  Signals syncing live
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="The toolkit"
          title="Every conversion moment, in one place"
          description="Choose a focused widget, shape it around your brand, and launch while the opportunity is still fresh."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => {
            const Icon = toolIcon(tool.key);
            return (
              <Reveal key={tool.id} delay={(index % 4) * 70}>
                <Link
                  href={`/tools/${tool.key}`}
                  className="premium-card group relative flex h-full min-h-48 flex-col overflow-hidden rounded-2xl p-5 sm:min-h-52"
                >
                  <span
                    aria-hidden
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-100/70 blur-2xl transition-transform duration-500 group-hover:scale-125"
                  />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 font-semibold text-ink">{tool.name}</h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
                    {tool.description}
                  </p>
                  <span className="relative mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                    Try it live
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-8 text-center">
          <ButtonLink href="/tools" variant="secondary" className="rounded-full">
            Explore the full toolkit <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </section>

      <section className="dark-panel relative overflow-hidden py-20 text-white sm:py-28">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[size:30px_30px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div>
            <Reveal>
              <p className="section-kicker !text-emerald-300">From idea to live</p>
              <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                A faster path from traffic to growth.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
                No tool sprawl, no release queue, and no guesswork. Just a clear workflow your whole team can
                understand.
              </p>
            </Reveal>
            <div className="mt-9 grid gap-3">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.number} delay={index * 80}>
                    <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition duration-300 hover:border-emerald-300/30 hover:bg-white/[0.08]">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-300 text-emerald-950">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-semibold">{step.title}</h3>
                          <span className="text-[10px] font-semibold tracking-[0.2em] text-white/25">{step.number}</span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-white/50">{step.body}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <Reveal delay={120} y={24}>
            <TechNetwork />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="image-frame relative aspect-[4/3] rounded-[2rem]">
              <Image
                src={MARKETING_IMAGES.team.src}
                alt={MARKETING_IMAGES.team.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-slate-950/55 p-4 text-white backdrop-blur-md">
                <p className="text-sm font-semibold">One team, end to end</p>
                <p className="mt-1 text-xs text-white/65">Strategy · design · build · optimization</p>
              </div>
            </div>
            <div className="glass-panel absolute -bottom-6 -right-2 rounded-2xl p-4 sm:right-6">
              <p className="text-2xl font-bold text-brand-700">Done for you</p>
              <p className="mt-0.5 text-xs text-slate-500">when you want expert hands</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-kicker">The agency side</p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-ink sm:text-5xl">
              Prefer to hand us the outcome?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Our team can design the storefront, build the experience, install every widget, connect your CRM, and
              keep improving conversion after launch.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Store & landing-page design",
                "Widget setup & installation",
                "Lead-gen & CRM automation",
                "Ongoing conversion optimization",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg" className="rounded-full px-7">
                Book a consultation <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="lg" className="rounded-full px-7">
                Explore services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="border-y border-line/70 bg-white/70 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Customer notes"
              title="Built for the people doing the growing"
              description="Simple enough to launch today. Capable enough to stay with you as the business grows."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map((review, index) => (
                <Reveal key={review.id} delay={index * 80}>
                  <figure className="premium-card flex h-full flex-col rounded-2xl p-6">
                    <div className="flex gap-0.5 text-amber-400" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700">
                      “{review.body}”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">
                        {review.authorName
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
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

      <DualCta
        title="Your next growth idea can be live today."
        description="Start with the free toolkit, or bring us the outcome and let the agency handle the details."
      />
    </>
  );
}
