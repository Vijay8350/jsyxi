import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { PageHero, DualCta } from "@/components/marketing/sections";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides on no-code growth: reviews, lead-gen, popups, countdowns, and conversion tips for online businesses.",
};

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

  return (
    <>
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
                className="group grid overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:border-brand-200 hover:shadow-md md:grid-cols-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-50 md:aspect-auto">
                  {featured.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featured.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full min-h-56 w-full items-center justify-center text-brand-300">
                      <Newspaper className="h-12 w-12" />
                    </span>
                  )}
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
                {rest.map((p) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:border-brand-200 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-50">
                      {p.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-brand-300">
                          <Newspaper className="h-9 w-9" />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-semibold text-ink group-hover:text-brand-700">{p.title}</h2>
                      {p.excerpt && <p className="mt-2 flex-1 text-sm text-slate-500 line-clamp-3">{p.excerpt}</p>}
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                        Read more <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
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
