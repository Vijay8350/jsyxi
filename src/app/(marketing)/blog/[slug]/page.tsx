import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { ArticleBody, DualCta, TechBackdrop } from "@/components/marketing/sections";
import { ContentCover } from "@/components/marketing/content-cover";
import { Reveal } from "@/components/marketing/reveal";

// ISR + on-demand revalidation (admin publish purges this path). New slugs not in
// generateStaticParams render on demand (dynamicParams defaults to true).
export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

async function getPost(slug: string) {
  return prisma.contentItem.findFirst({
    where: { slug, type: "blog", status: "published" },
    include: { author: { select: { name: true } } },
  });
}

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
  const description = post.excerpt ?? undefined;
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
      publishedTime: post.publishedAt?.toISOString(),
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

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <section className="relative isolate overflow-hidden border-b border-line/70 bg-hero-grid">
          <TechBackdrop className="-z-10" />
          <div className="relative mx-auto max-w-3xl px-4 py-14 sm:py-20">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <Reveal className="mt-5">
              <p className="section-kicker">Ideas for better growth</p>
              <h1 className="mt-3 text-[clamp(2.35rem,8.5vw,4.4rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-ink">
                {post.title}
              </h1>
              <p className="mt-5 text-sm font-medium text-slate-500">
                {post.author?.name ? `${post.author.name} · ` : ""}
                {post.publishedAt &&
                  new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
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
        </div>
      </article>

      <DualCta />
    </>
  );
}
