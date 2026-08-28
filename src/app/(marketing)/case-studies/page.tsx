import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Trophy } from "lucide-react";
import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { PageHero, DualCta } from "@/components/marketing/sections";
import { ContentCover } from "@/components/marketing/content-cover";
import { Reveal } from "@/components/marketing/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import {
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteSiteUrl,
  caseStudyClusterLabel,
  caseStudyPageUrl,
} from "@/lib/seo";

export const revalidate = 300;

const PAGE_URL = `${SITE_URL}/case-studies`;
const PAGE_TITLE = "Ecommerce, CRM & Software Case Studies";
const PAGE_DESCRIPTION =
  "Explore practical ecommerce, lead-generation, CRM and software implementation stories, with illustrative scenarios clearly labelled.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1731,
        height: 909,
        type: "image/png",
        alt: "jsyxi ecommerce, CRM and software case studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/og.png`],
  },
};

export default async function CaseStudiesPage() {
  const studies = await prisma.contentItem.findMany({
    where: { type: "case_study", status: "published" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      updatedAt: true,
    },
  });
  const featured = studies[0];
  const rest = studies.slice(1);
  const itemList = studies.map((study, index) => {
    const url = caseStudyPageUrl(study.slug);
    const isIllustrative =
      study.excerpt?.toLowerCase().startsWith("illustrative case study:") ?? false;

    return {
      "@type": "ListItem",
      position: index + 1,
      url,
      item: {
        "@type": isIllustrative ? "Article" : "WebPage",
        "@id": `${url}#${isIllustrative ? "article" : "webpage"}`,
        url,
        name: study.title,
        ...(study.excerpt ? { description: study.excerpt } : {}),
        ...(study.publishedAt
          ? { datePublished: study.publishedAt.toISOString() }
          : {}),
        dateModified: study.updatedAt.toISOString(),
        ...(absoluteSiteUrl(study.coverImage)
          ? { image: absoluteSiteUrl(study.coverImage) }
          : {}),
      },
    };
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
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
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        mainEntity: { "@id": `${PAGE_URL}#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#itemlist`,
        name: "jsyxi case studies",
        numberOfItems: studies.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: itemList,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
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
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd id="case-studies-json-ld" data={structuredData} />

      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-sm text-slate-500 sm:px-6"
      >
        <Link href="/" className="hover:text-brand-700">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span aria-current="page" className="font-medium text-slate-700">
          Case studies
        </span>
      </nav>

      <PageHero
        badge={`${studies.length} implementation stories`}
        title="Ecommerce, CRM and software"
        highlight="case studies"
        description="Explore practical ecommerce conversion, lead-generation, CRM and custom software implementation stories. Illustrative scenarios are clearly labelled."
        primary={{ href: "/tools", label: "Explore conversion tools" }}
        secondary={{ href: "/services", label: "View agency services" }}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {studies.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white">
            <EmptyState
              icon={<Trophy className="h-6 w-6" />}
              title="Case studies are on the way"
              description="We're preparing practical implementation stories. In the meantime, start free or book a consultation."
              action={
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <ButtonLink href="/signup">Start free</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    Book a consultation
                  </ButtonLink>
                </div>
              }
            />
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50/70 p-5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Illustrative stories are explicitly labelled and describe representative scenarios, not guaranteed outcomes.
              </p>
              <span className="shrink-0 font-semibold text-brand-700">
                {studies.length} stories available
              </span>
            </div>

            {featured && (
              <Reveal>
                <Link
                  href={`/case-studies/${featured.slug}`}
                  className="premium-card group grid overflow-hidden rounded-[1.75rem] md:grid-cols-2"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-50 md:aspect-auto">
                    <ContentCover
                      src={featured.coverImage}
                      title={featured.title}
                      alt=""
                      fallback="skincare"
                      preload
                      sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1151px) calc((100vw - 2rem) / 2), 600px"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-10">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                      Featured · {caseStudyClusterLabel(featured.slug)}
                    </span>
                    <h2 className="mt-3 text-2xl font-bold text-ink transition-colors group-hover:text-brand-700 sm:text-3xl">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-4 leading-relaxed text-slate-600">{featured.excerpt}</p>
                    )}
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      Read the story
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}

            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((study, index) => (
                  <Reveal key={study.id} delay={(index % 3) * 80}>
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="premium-card group flex h-full flex-col overflow-hidden rounded-2xl"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-50">
                        <ContentCover
                          src={study.coverImage}
                          title={study.title}
                          alt=""
                          fallback="skincare"
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                          {caseStudyClusterLabel(study.slug)}
                        </span>
                        <h2 className="font-semibold text-ink transition-colors group-hover:text-brand-700">
                          {study.title}
                        </h2>
                        {study.excerpt && (
                          <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-500">
                            {study.excerpt}
                          </p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                          Read the story
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <DualCta
        title="Want a plan shaped around your business?"
        description="Start building free, or book a consultation and turn the most relevant playbook into a practical roadmap."
      />
    </>
  );
}
