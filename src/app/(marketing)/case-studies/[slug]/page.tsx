import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArticleBody, DualCta } from "@/components/marketing/sections";

type Params = { params: Promise<{ slug: string }> };

async function getStudy(slug: string) {
  return prisma.contentItem.findFirst({
    where: { slug, type: "case_study", status: "published" },
    include: { author: { select: { name: true } } },
  });
}

export async function generateStaticParams() {
  const items = await prisma.contentItem.findMany({
    where: { type: "case_study", status: "published" },
    select: { slug: true },
  });
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: study.title,
    description: study.excerpt ?? undefined,
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) notFound();

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <Link href="/case-studies" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" /> All case studies
        </Link>

        <Badge tone="brand" className="mt-6">
          Case study
        </Badge>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{study.title}</h1>
        {study.excerpt && <p className="mt-4 text-lg text-slate-600">{study.excerpt}</p>}
        {study.author?.name && (
          <p className="mt-4 text-sm text-slate-500">
            By {study.author.name}
            {study.publishedAt && (
              <>
                {" · "}
                {new Date(study.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </>
            )}
          </p>
        )}

        {study.coverImage && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-brand-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={study.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}

        <div className="mt-10">
          <ArticleBody body={study.body} />
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-canvas p-6 text-center">
          <p className="font-semibold text-ink">Could this be your store?</p>
          <p className="mt-1 text-sm text-slate-600">Start free, or book a consultation to plan your growth.</p>
          <div className="mt-4 flex justify-center gap-3">
            <ButtonLink href="/signup">Start free</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Book a consultation
            </ButtonLink>
          </div>
        </div>
      </article>

      <DualCta />
    </>
  );
}
