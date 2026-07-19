import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";
import { PageHero, DualCta } from "@/components/marketing/sections";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Real results from brands using jsyxi widgets and our agency services — see how they lifted conversions, leads, and repeat sales.",
};

export default async function CaseStudiesPage() {
  const studies = await prisma.contentItem.findMany({
    where: { type: "case_study", status: "published" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <PageHero
        badge="Proof, not promises"
        title="Results our customers"
        highlight="are proud of"
        description="See how growing brands use jsyxi to turn more of their traffic into leads and sales."
      />

      <section className="mx-auto max-w-6xl px-4 py-20">
        {studies.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white">
            <EmptyState
              icon={<Trophy className="h-6 w-6" />}
              title="Case studies are on the way"
              description="We're writing up the results our customers are seeing. In the meantime, start free or book a consultation."
              action={
                <div className="flex justify-center gap-3">
                  <ButtonLink href="/signup">Start free</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    Book a consultation
                  </ButtonLink>
                </div>
              }
            />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((s) => (
              <Link
                key={s.id}
                href={`/case-studies/${s.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:border-brand-200 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-50">
                  {s.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.coverImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-brand-300">
                      <Trophy className="h-10 w-10" />
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-semibold text-ink group-hover:text-brand-700">{s.title}</h2>
                  {s.excerpt && <p className="mt-2 flex-1 text-sm text-slate-500 line-clamp-3">{s.excerpt}</p>}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                    Read the story <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <DualCta
        title="Want results like these?"
        description="Start building free, or book a consultation and let our agency drive your growth."
      />
    </>
  );
}
