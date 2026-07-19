import type { Metadata } from "next";
import { LifeBuoy, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { HelpSearch, type HelpArticle } from "@/components/marketing/help-search";
import { DualCta } from "@/components/marketing/sections";

export const metadata: Metadata = {
  title: "Help center",
  description:
    "Guides and answers for setting up, publishing, and embedding your jsyxi widgets, plus billing and account help.",
};

export default async function HelpPage() {
  const rows = await prisma.contentItem.findMany({
    where: { type: "help_article", status: "published" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: { id: true, slug: true, title: true, excerpt: true },
  });
  const articles: HelpArticle[] = rows;

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-grid">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <LifeBuoy className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">How can we help?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Search our guides, or reach out to the team — we&apos;re here to get you unblocked fast.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white">
            <EmptyState
              icon={<LifeBuoy className="h-6 w-6" />}
              title="Help articles coming soon"
              description="We're writing up guides. In the meantime, our team is one message away."
              action={
                <ButtonLink href="/contact">
                  <MessageCircle className="h-4 w-4" /> Contact support
                </ButtonLink>
              }
            />
          </div>
        ) : (
          <HelpSearch articles={articles} />
        )}
      </section>

      {/* Contact strip */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-lg font-semibold text-ink">Can&apos;t find an answer?</h2>
            <p className="mt-1 text-sm text-slate-600">Our support team typically replies within one business day.</p>
          </div>
          <ButtonLink href="/contact" size="lg">
            <MessageCircle className="h-4 w-4" /> Contact us
          </ButtonLink>
        </div>
      </section>

      <DualCta />
    </>
  );
}
