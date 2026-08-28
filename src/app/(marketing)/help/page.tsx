import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, CreditCard, LifeBuoy, MessageCircle, Rocket } from "lucide-react";
import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpSearch, type HelpArticle } from "@/components/marketing/help-search";
import { DualCta } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";

export const metadata: Metadata = {
  title: "Help center",
  description:
    "Guides and answers for setting up, publishing, and embedding your jsyxi widgets, plus billing and account help.",
};

const HELP_TOPICS = [
  { icon: BookOpen, label: "Setup guides" },
  { icon: Rocket, label: "Publish & embed" },
  { icon: CreditCard, label: "Plans & billing" },
];

export default async function HelpPage() {
  const rows = await prisma.contentItem.findMany({
    where: { type: "help_article", status: "published" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: { id: true, slug: true, title: true, excerpt: true },
  });
  const articles: HelpArticle[] = rows;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(45,212,191,0.16),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(16,185,129,0.1),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:py-24">
          <Reveal>
            <div className="text-center lg:text-left">
              <Badge className="mx-auto border border-brand-300/20 bg-brand-400/10 px-3 py-1.5 text-brand-200 lg:mx-0">
                <LifeBuoy className="h-3.5 w-3.5" aria-hidden="true" />
                Help center
              </Badge>
              <h1 className="mt-5 text-[clamp(2.35rem,10vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white">
                Answers that get you <span className="text-brand-300">moving again.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300 lg:mx-0">
                Search our guides, or reach out to the team—we&apos;re here to help you set up, publish, and
                grow with confidence.
              </p>
              <ul
                aria-label="Help center topics"
                className="mx-auto mt-7 grid max-w-lg gap-2.5 text-left sm:grid-cols-3 lg:mx-0"
              >
                {HELP_TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <li
                      key={topic.label}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.055] px-3 py-2.5 text-xs font-medium text-slate-200 backdrop-blur"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-brand-200" aria-hidden="true" />
                      {topic.label}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <ButtonLink href="#help-library" size="lg" className="w-full rounded-full sm:w-auto">
                  Browse the library
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="w-full rounded-full border-white/15 bg-white/10 text-white hover:border-white/30 hover:bg-white/15 hover:text-white sm:w-auto"
                >
                  Contact support
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <figure className="group relative min-h-[300px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30 sm:min-h-[420px] sm:rounded-[2rem]">
              <Image
                src="/tech-growth-visual.png"
                alt="Connected storefront tools and analytics represented as a unified support system"
                fill
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/75 p-4 text-left text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-400/15 text-brand-200">
                  <LifeBuoy className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">Built for quick answers</span>
                  <span className="mt-0.5 block text-xs leading-5 text-slate-300">
                    Search first, then reach a real person whenever you need one.
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section id="help-library" aria-labelledby="help-library-heading" className="relative scroll-mt-24 overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-10 h-72 w-[80%] -translate-x-1/2 rounded-full bg-brand-100/45 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Knowledge base</p>
            <h2 id="help-library-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Find the guide you need.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Practical steps for your widgets, account, publishing workflow, and billing.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            {articles.length === 0 ? (
              <div className="rounded-3xl border border-line bg-white shadow-lg shadow-slate-900/5">
                <EmptyState
                  icon={<LifeBuoy className="h-6 w-6" aria-hidden="true" />}
                  title="Help articles coming soon"
                  description="We're writing up guides. In the meantime, our team is one message away."
                  action={
                    <ButtonLink href="/contact">
                      <MessageCircle className="h-4 w-4" aria-hidden="true" /> Contact support
                    </ButtonLink>
                  }
                />
              </div>
            ) : (
              <HelpSearch articles={articles} />
            )}
          </Reveal>
        </div>
      </section>

      {/* Contact strip */}
      <section aria-labelledby="help-contact-heading" className="border-y border-brand-800/40 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Reveal className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div>
              <h2 id="help-contact-heading" className="text-xl font-semibold text-white">
                Can&apos;t find an answer?
              </h2>
              <p className="mt-1 text-sm text-brand-100/75">
                Our support team typically replies within one business day.
              </p>
            </div>
            <ButtonLink
              href="/contact"
              size="lg"
              variant="secondary"
              className="w-full rounded-full border-white/15 bg-white/10 text-white hover:border-white/30 hover:bg-white/15 hover:text-white sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Contact us
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <DualCta />
    </>
  );
}
