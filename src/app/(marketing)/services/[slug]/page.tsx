import type { Metadata } from "next";
import { createElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { prisma } from "@/lib/db";
import { serviceIcon } from "@/lib/services/icons";
import { ButtonLink } from "@/components/ui/button";
import { ArticleBody, DualCta, TechBackdrop } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";

export const revalidate = 300;

type Params = { params: Promise<{ slug: string }> };

function getService(slug: string) {
  return prisma.service.findFirst({ where: { slug, status: "published" } });
}

export async function generateStaticParams() {
  const rows = await prisma.service.findMany({ where: { status: "published" }, select: { slug: true } });
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) return { title: "Service not found" };
  return { title: s.title, description: s.summary };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const others = await prisma.service.findMany({
    where: { status: "published", NOT: { id: service.id } },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line bg-hero-grid">
        <TechBackdrop className="-z-10" />
        <div aria-hidden className="animate-float absolute -left-20 top-6 -z-10 h-72 w-72 rounded-full bg-brand-300/25 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <Reveal className="mt-5 max-w-3xl">
            <span className="animate-float flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
              {createElement(serviceIcon(service.icon), { className: "h-7 w-7" })}
            </span>
            <div className="mt-5">
              <p className="section-kicker">Growth service</p>
              <h1 className="mt-3 text-[clamp(2.4rem,9vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink">
                {service.title}
              </h1>
              {service.tagline && <p className="mt-4 text-lg font-semibold text-brand-700">{service.tagline}</p>}
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{service.summary}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/contact?service=${service.slug}`} size="lg" className="w-full rounded-full sm:w-auto">
                  Request a quote <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/case-studies" variant="secondary" size="lg" className="w-full rounded-full sm:w-auto">
                  See our work
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <ArticleBody body={service.description} />
          </Reveal>

          <Reveal delay={120} className="md:col-span-1">
            <div className="premium-card rounded-2xl p-6 md:sticky md:top-24">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">What&apos;s included</h2>
              <ul className="mt-4 space-y-2.5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <ButtonLink href={`/contact?service=${service.slug}`} className="mt-6 w-full">
                Request a quote <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      {others.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-xl font-bold text-ink">Explore more services</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {others.map((o, i) => {
                return (
                  <Reveal key={o.id} delay={i * 80}>
                    <Link
                      href={`/services/${o.slug}`}
                      className="premium-card group flex h-full flex-col rounded-2xl p-5"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                        {createElement(serviceIcon(o.icon), { className: "h-5 w-5" })}
                      </span>
                      <h3 className="mt-4 font-semibold text-ink">{o.title}</h3>
                      <p className="mt-1 flex-1 text-sm text-slate-500">{o.summary}</p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <DualCta
        title={`Ready to move ${service.title.toLowerCase()} forward?`}
        description="Tell us where growth is getting stuck. We’ll turn it into a focused plan and polished execution."
        primary={{ href: `/contact?service=${service.slug}`, label: "Request a quote" }}
      />
    </>
  );
}
