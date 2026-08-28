import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { ArticleBody, DualCta, TechBackdrop } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";

type Params = { params: Promise<{ slug: string }> };

async function getArticle(slug: string) {
  return prisma.contentItem.findFirst({
    where: { slug, type: "help_article", status: "published" },
  });
}

export async function generateStaticParams() {
  const items = await prisma.contentItem.findMany({
    where: { type: "help_article", status: "published" },
    select: { slug: true },
  });
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt ?? undefined };
}

export default async function HelpArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line/70 bg-hero-grid">
        <TechBackdrop className="-z-10" />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:py-20">
          <Link
            href="/help"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" /> Help center
          </Link>
          <Reveal className="mt-5">
            <p className="section-kicker">Guide</p>
            <h1 className="mt-3 text-[clamp(2.35rem,9vw,4.25rem)] font-extrabold leading-[1.03] tracking-[-0.04em] text-ink">
              {article.title}
            </h1>
            {article.excerpt && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{article.excerpt}</p>}
          </Reveal>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <Reveal>
          <ArticleBody body={article.body} />
        </Reveal>

        <Reveal delay={100}>
          <div className="premium-card mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-ink">Still need help?</p>
              <p className="mt-1 text-sm text-slate-600">Reach our support team and we&apos;ll get you sorted.</p>
            </div>
            <ButtonLink href="/contact" variant="secondary" className="w-full rounded-full sm:w-auto">
              <MessageCircle className="h-4 w-4" /> Contact support
            </ButtonLink>
          </div>
        </Reveal>
      </article>

      <DualCta
        title="From question to working widget"
        description="Create your first widget free, or ask our team to help you choose and launch the right setup."
        secondary={{ href: "/contact", label: "Ask the team" }}
      />
    </>
  );
}
