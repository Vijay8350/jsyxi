import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { ArticleBody, DualCta, TechBackdrop } from "@/components/marketing/sections";
import { ContentCover } from "@/components/marketing/content-cover";
import { Reveal } from "@/components/marketing/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import {
  BLOG_SECTION_URL,
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteSiteUrl,
  blogPageUrl,
  blogSeoDescription,
  extractFaqEntries,
  readingTimeMinutes,
} from "@/lib/seo";

// ISR + on-demand revalidation (admin publish purges this path). New slugs not in
// generateStaticParams render on demand (dynamicParams defaults to true).
export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

const getPost = cache(async (slug: string) => {
  return prisma.contentItem.findFirst({
    where: { slug, type: "blog", status: "published" },
    include: { author: { select: { name: true } } },
  });
});

export async function generateStaticParams() {
  const items = await prisma.contentItem.findMany({
    where: { type: "blog", status: "published" },
    select: { slug: true },
  });
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  const description = blogSeoDescription(post.excerpt, post.body);
  const images = post.coverImage
    ? [{ url: post.coverImage, alt: `${post.title} cover image` }]
    : undefined;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      siteName: SITE_NAME,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: post.author?.name ? [post.author.name] : undefined,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const pageUrl = blogPageUrl(post.slug);
  const webPageId = `${pageUrl}#webpage`;
  const articleId = `${pageUrl}#article`;
  const imageUrl = absoluteSiteUrl(post.coverImage);
  const description = blogSeoDescription(post.excerpt, post.body);
  const readingTime = readingTimeMinutes(post.body);
  // Only the Q&A actually rendered on the page is marked up — Google treats
  // FAQ markup for hidden content as a structured-data violation.
  const faqs = extractFaqEntries(post.body);

  const related = await prisma.contentItem.findMany({
    where: { type: "blog", status: "published", NOT: { id: post.id } },
    orderBy: [{ publishedAt: "desc" }],
    select: { slug: true, title: true, excerpt: true },
    take: 3,
  });

  const graph: Record<string, unknown>[] = [
    { "@type": "Organization", "@id": ORGANIZATION_ID, name: SITE_NAME, url: SITE_URL },
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
      name: post.title,
      description,
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": articleId },
      ...(imageUrl ? { primaryImageOfPage: { "@id": `${pageUrl}#primaryimage` } } : {}),
      dateModified: post.updatedAt.toISOString(),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: BLOG_SECTION_URL },
        { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
      ],
    },
    {
      "@type": "BlogPosting",
      "@id": articleId,
      url: pageUrl,
      mainEntityOfPage: { "@id": webPageId },
      headline: post.title,
      description,
      inLanguage: "en-IN",
      wordCount: post.body.trim().split(/\s+/).length,
      ...(post.publishedAt ? { datePublished: post.publishedAt.toISOString() } : {}),
      dateModified: post.updatedAt.toISOString(),
      author: post.author?.name
        ? { "@type": "Person", name: post.author.name }
        : { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      isPartOf: { "@type": "Blog", "@id": `${BLOG_SECTION_URL}#blog`, name: `${SITE_NAME} blog`, url: BLOG_SECTION_URL },
      ...(imageUrl ? { image: { "@id": `${pageUrl}#primaryimage` } } : {}),
    },
  ];

  if (imageUrl) {
    graph.push({
      "@type": "ImageObject",
      "@id": `${pageUrl}#primaryimage`,
      url: imageUrl,
      contentUrl: imageUrl,
      caption: `${post.title} cover image`,
      ...(post.coverImage?.startsWith("/blog-covers/") ? { width: 1600, height: 900 } : {}),
    });
  }

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      isPartOf: { "@id": webPageId },
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd id="blog-post-json-ld" data={{ "@context": "https://schema.org", "@graph": graph }} />

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
                  <Link href="/blog" className="hover:text-brand-700">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li className="max-w-full truncate font-medium text-slate-700" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>
            <Reveal className="mt-5">
              <p className="section-kicker">Ideas for better growth</p>
              <h1 className="mt-3 text-[clamp(2.35rem,8.5vw,4.4rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-ink">
                {post.title}
              </h1>
              <p className="mt-5 text-sm font-medium text-slate-500">
                {post.author?.name ? `${post.author.name} · ` : ""}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time>
                )}
                {" · "}
                {readingTime} min read
              </p>
            </Reveal>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <Reveal>
            <div className="image-frame relative aspect-[16/9] w-full rounded-[1.35rem] sm:rounded-[1.75rem]">
              <ContentCover
                src={post.coverImage}
                title={post.title}
                fallback="studio"
                preload
                sizes="(max-width: 767px) calc(100vw - 2rem), 736px"
              />
            </div>
          </Reveal>

          {post.excerpt && (
            <Reveal delay={70}>
              <p className="mt-8 text-lg font-medium leading-relaxed text-slate-700">{post.excerpt}</p>
            </Reveal>
          )}

          <Reveal delay={100} className="mt-7">
            <ArticleBody body={post.body} />
          </Reveal>

          {related.length > 0 && (
            <Reveal delay={120}>
              <aside className="mt-14 border-t border-line pt-8">
                <h2 className="text-lg font-bold text-ink">Keep reading</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="premium-card group flex h-full flex-col rounded-xl p-4"
                      >
                        <span className="font-semibold text-ink group-hover:text-brand-700">{item.title}</span>
                        {item.excerpt && (
                          <span className="mt-2 line-clamp-3 text-sm text-slate-500">{item.excerpt}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          )}
        </div>
      </article>

      <DualCta />
    </>
  );
}
