import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArticleBody, DualCta, TechBackdrop } from "@/components/marketing/sections";
import { ContentCover } from "@/components/marketing/content-cover";
import { Reveal } from "@/components/marketing/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import {
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteSiteUrl,
  caseStudyCluster,
  caseStudyClusterLabel,
  caseStudyPageUrl,
  caseStudySeoDescription,
  caseStudySeoTitle,
  isIndexableCaseStudy,
} from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 300;

const getStudy = cache(async (slug: string) => {
  return prisma.contentItem.findFirst({
    where: { slug, type: "case_study", status: "published" },
  });
});

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function isDifferentCalendarDate(first: Date, second: Date): boolean {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  });
  return formatter.format(first) !== formatter.format(second);
}

export async function generateStaticParams() {
  const items = await prisma.contentItem.findMany({
    where: { type: "case_study", status: "published" },
    select: { slug: true },
  });
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) {
    return {
      title: "Case study not found",
      robots: { index: false, follow: false },
    };
  }

  const pageUrl = caseStudyPageUrl(study.slug);
  const title = caseStudySeoTitle(study.slug, study.title);
  const description = caseStudySeoDescription(study.excerpt);
  const socialImage = absoluteSiteUrl(study.coverImage) ?? `${SITE_URL}/og.png`;
  const isIndexable = isIndexableCaseStudy(study.body);
  const image = study.coverImage?.startsWith("/case-study-covers/")
    ? {
        url: socialImage,
        width: 1600,
        height: 900,
        type: "image/webp",
        alt: `${study.title} case-study illustration`,
      }
    : { url: socialImage, alt: `${study.title} case-study illustration` };

  return {
    title,
    description,
    authors: [{ name: SITE_NAME, url: `${SITE_URL}/about` }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: { canonical: pageUrl },
    robots: {
      index: isIndexable,
      follow: true,
      googleBot: {
        index: isIndexable,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "article",
      url: pageUrl,
      siteName: SITE_NAME,
      locale: "en_IN",
      title,
      description,
      images: [image],
      ...(study.publishedAt
        ? { publishedTime: study.publishedAt.toISOString() }
        : {}),
      modifiedTime: study.updatedAt.toISOString(),
      section: caseStudyClusterLabel(study.slug),
      authors: [SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) notFound();

  const relatedCandidates = await prisma.contentItem.findMany({
    where: {
      type: "case_study",
      status: "published",
      id: { not: study.id },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      body: true,
    },
  });
  const currentCluster = caseStudyCluster(study.slug);
  const relatedStudies = relatedCandidates
    .filter((candidate) => isIndexableCaseStudy(candidate.body))
    .sort(
      (a, b) =>
        Number(caseStudyCluster(b.slug) === currentCluster) -
        Number(caseStudyCluster(a.slug) === currentCluster),
    )
    .slice(0, 3);

  const isIllustrative =
    study.excerpt?.toLowerCase().startsWith("illustrative case study:") ?? false;
  const isIndexable = isIndexableCaseStudy(study.body);
  const pageUrl = caseStudyPageUrl(study.slug);
  const imageUrl = absoluteSiteUrl(study.coverImage);
  const articleId = `${pageUrl}#article`;
  const webPageId = `${pageUrl}#webpage`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "WebPage",
      "@id": webPageId,
      url: pageUrl,
      name: study.title,
      ...(study.excerpt ? { description: study.excerpt } : {}),
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      ...(isIndexable ? { mainEntity: { "@id": articleId } } : {}),
      ...(imageUrl ? { primaryImageOfPage: { "@id": `${pageUrl}#primaryimage` } } : {}),
      dateModified: study.updatedAt.toISOString(),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Case studies",
          item: `${SITE_URL}/case-studies`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: study.title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (imageUrl) {
    graph.push({
      "@type": "ImageObject",
      "@id": `${pageUrl}#primaryimage`,
      url: imageUrl,
      contentUrl: imageUrl,
      caption: `${study.title} case-study illustration`,
      ...(study.coverImage?.startsWith("/case-study-covers/")
        ? { width: 1600, height: 900 }
        : {}),
    });
  }

  if (isIndexable) {
    graph.push({
      "@type": "Article",
      "@id": articleId,
      url: pageUrl,
      mainEntityOfPage: { "@id": webPageId },
      headline: study.title,
      ...(study.excerpt ? { description: study.excerpt } : {}),
      ...(study.publishedAt
        ? { datePublished: study.publishedAt.toISOString() }
        : {}),
      dateModified: study.updatedAt.toISOString(),
      articleSection: caseStudyClusterLabel(study.slug),
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      ...(imageUrl ? { image: { "@id": `${pageUrl}#primaryimage` } } : {}),
    });
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <>
      <JsonLd id="case-study-json-ld" data={structuredData} />

      <article>
        <section className="relative isolate overflow-hidden border-b border-line/70 bg-hero-grid">
          <TechBackdrop className="-z-10" />
          <div className="relative mx-auto max-w-3xl px-4 py-14 sm:py-20">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
                <li>
                  <Link href="/" className="hover:text-brand-700">
                    Home
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link href="/case-studies" className="hover:text-brand-700">
                    Case studies
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li className="max-w-full truncate font-medium text-slate-700" aria-current="page">
                  {study.title}
                </li>
              </ol>
            </nav>
            <Reveal className="mt-5">
              <Badge tone="brand" className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur">
                {isIllustrative ? "Illustrative case study" : "Customer story"}
              </Badge>
              <h1 className="mt-5 text-[clamp(2.35rem,8.5vw,4.4rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-ink">
                {study.title}
              </h1>
              {study.excerpt && (
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  {study.excerpt}
                </p>
              )}
              <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-slate-500">
                <span>
                  By{" "}
                  <Link href="/about" rel="author" className="text-brand-700 hover:text-brand-800">
                    {SITE_NAME}
                  </Link>
                </span>
                {study.publishedAt && (
                  <>
                    <span aria-hidden>·</span>
                    <span>
                      Published{" "}
                      <time dateTime={study.publishedAt.toISOString()}>
                        {formatDate(study.publishedAt)}
                      </time>
                    </span>
                  </>
                )}
                {study.publishedAt && isDifferentCalendarDate(study.publishedAt, study.updatedAt) && (
                  <>
                    <span aria-hidden>·</span>
                    <span>
                      Updated{" "}
                      <time dateTime={study.updatedAt.toISOString()}>
                        {formatDate(study.updatedAt)}
                      </time>
                    </span>
                  </>
                )}
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <Reveal>
            <div className="image-frame relative aspect-[16/9] w-full rounded-[1.35rem] sm:rounded-[1.75rem]">
              <ContentCover
                src={study.coverImage}
                title={study.title}
                alt={`${study.title} case-study illustration`}
                fallback="skincare"
                preload
                sizes="(max-width: 767px) calc(100vw - 2rem), 736px"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <ArticleBody body={study.body} />
          </Reveal>

          <Reveal delay={140}>
            <div className="premium-card mt-12 rounded-2xl p-6 text-center sm:p-8">
              <p className="font-semibold text-ink">Could this approach fit your business?</p>
              <p className="mt-2 text-sm text-slate-600">
                Start free, or book a consultation to turn the most relevant ideas into a practical plan.
              </p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/signup" className="w-full rounded-full sm:w-auto">
                  Start free
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" className="w-full rounded-full sm:w-auto">
                  Book a consultation
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>

        {relatedStudies.length > 0 && (
          <aside aria-labelledby="related-case-studies" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
                  Continue exploring
                </p>
                <h2 id="related-case-studies" className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Related case studies
                </h2>
              </div>
              <Link href="/case-studies" className="hidden items-center gap-1 text-sm font-semibold text-brand-700 sm:inline-flex">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedStudies.map((related) => (
                <Link
                  key={related.id}
                  href={`/case-studies/${related.slug}`}
                  className="premium-card group flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-brand-50">
                    <ContentCover
                      src={related.coverImage}
                      title={related.title}
                      alt=""
                      fallback="skincare"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                      {caseStudyClusterLabel(related.slug)}
                    </span>
                    <h3 className="mt-2 font-semibold text-ink transition-colors group-hover:text-brand-700">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-500">
                        {related.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                      Read the story
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>

      <DualCta />
    </>
  );
}
