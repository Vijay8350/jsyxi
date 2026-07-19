import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { ArticleBody, DualCta } from "@/components/marketing/sections";

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
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-sm text-slate-500">
          {post.author?.name ? `${post.author.name} · ` : ""}
          {post.publishedAt &&
            new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        {post.coverImage && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-brand-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}

        {post.excerpt && <p className="mt-8 text-lg font-medium text-slate-700">{post.excerpt}</p>}

        <div className="mt-6">
          <ArticleBody body={post.body} />
        </div>
      </article>

      <DualCta />
    </>
  );
}
