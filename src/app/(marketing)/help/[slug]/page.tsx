import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { ArticleBody } from "@/components/marketing/sections";

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
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/help" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" /> Help center
      </Link>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{article.title}</h1>
      {article.excerpt && <p className="mt-3 text-lg text-slate-600">{article.excerpt}</p>}

      <div className="mt-8">
        <ArticleBody body={article.body} />
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-canvas p-6 sm:flex-row">
        <div>
          <p className="font-semibold text-ink">Still need help?</p>
          <p className="mt-1 text-sm text-slate-600">Reach our support team and we&apos;ll get you sorted.</p>
        </div>
        <ButtonLink href="/contact" variant="secondary">
          <MessageCircle className="h-4 w-4" /> Contact support
        </ButtonLink>
      </div>
    </article>
  );
}
