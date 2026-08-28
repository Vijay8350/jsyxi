import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { PageHero, DualCta } from "@/components/marketing/sections";
import { ContentCover } from "@/components/marketing/content-cover";
import { Reveal } from "@/components/marketing/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import {
  BLOG_SECTION_URL,
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  blogPageUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides on no-code growth: reviews, lead-gen, popups, countdowns, and conversion tips for online businesses.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: `Blog · ${SITE_NAME}`,
    description:
      "Practical guides on no-code growth: reviews, lead-gen, popups, countdowns, and conversion tips for online businesses.",
    url: "/blog",
    siteName: SITE_NAME,
  },
};

// ISR safety-net: refresh at most every 5 min. Publishing from admin also purges this
// path on-demand (revalidatePath), so new posts appear immediately.
export const revalidate = 300;

function formatDate(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await prisma.contentItem.findMany({
    where: { type: "blog", status: "published" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    include: { author: { select: { name: true } } },
  });

  const [featured, ...rest] = posts;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "Blog",
        "@id": `${BLOG_SECTION_URL}#blog`,
        url: BLOG_SECTION_URL,
        name: `${SITE_NAME} blog`,
        description:
          "Practical guides on no-code growth: reviews, lead-gen, popups, countdowns, and conversion tips for online businesses.",
        inLanguage: "en-IN",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        blogPost: posts.slice(0, 20).map((p) => ({
          "@type": "BlogPosting",
          "@id": `${blogPageUrl(p.slug)}#article`,
          url: blogPageUrl(p.slug),
          headline: p.title,
          ...(p.excerpt ? { description: p.excerpt } : {}),
          ...(p.publishedAt ? { datePublished: p.publishedAt.toISOString() } : {}),
          dateModified: p.updatedAt.toISOString(),
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BLOG_SECTION_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: BLOG_SECTION_URL },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd id="blog-index-json-ld" data={structuredData} />
      <PageHero
        badge="From the jsyxi team"
        title="No-code growth,"
        highlight="explained simply"
        description="Guides and playbooks to help you convert more of the traffic you already have."
      />

      <section className="mx-auto max-w-6xl px-4 py-20">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white">
            <EmptyState
              icon={<Newspaper className="h-6 w-6" />}
              title="No posts yet"
              description="We're working on our first articles. Check back soon, or start building in the meantime."
              action={<ButtonLink href="/signup">Start free</ButtonLink>}
            />
          </div>
        ) : (
          <>
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="premium-card group grid overflow-hidden rounded-[1.75rem] md:grid-cols-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-50 md:aspect-auto">
                  <ContentCover
                    src={featured.coverImage}
                    title={featured.title}
                    fallback="studio"
                    preload
                    sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1151px) calc((100vw - 2rem) / 2), 560px"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">Featured</span>
                  <h2 className="mt-2 text-2xl font-bold text-ink group-hover:text-brand-700">{featured.title}</h2>
                  {featured.excerpt && <p className="mt-3 text-slate-600">{featured.excerpt}</p>}
                  <p className="mt-4 text-sm text-slate-500">
                    {featured.author?.name ? `${featured.author.name} · ` : ""}
                    {formatDate(featured.publishedAt)}
                  </p>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, index) => (
                  <Reveal key={p.id} delay={(index % 3) * 70}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="premium-card group flex h-full flex-col overflow-hidden rounded-2xl"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-50">
                        <ContentCover
                          src={p.coverImage}
                          title={p.title}
                          fallback={index % 2 === 0 ? "merchant" : "workspace"}
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="font-semibold text-ink group-hover:text-brand-700">{p.title}</h2>
                        {p.excerpt && <p className="mt-2 flex-1 text-sm text-slate-500 line-clamp-3">{p.excerpt}</p>}
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                          Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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

      <DualCta />
    </>
  );
}
