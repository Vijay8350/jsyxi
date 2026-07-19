import type { Metadata } from "next";
import { Heart, Rocket, ShieldCheck, Users } from "lucide-react";
import { StatTile } from "@/components/ui/misc";
import { PageHero, DualCta, SectionHeading } from "@/components/marketing/sections";

export const metadata: Metadata = {
  title: "About us",
  description:
    "jsyxi combines a no-code widget platform with a full-service growth agency, built in India to help online businesses convert more of their traffic.",
};

const VALUES = [
  {
    icon: Rocket,
    title: "Ship fast, stay light",
    body: "Every widget loads in under three seconds. Speed is a feature, not an afterthought.",
  },
  {
    icon: Heart,
    title: "No-code, no gatekeeping",
    body: "Growth tools shouldn't require a developer. If you can fill a form, you can launch.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by default",
    body: "Bot and duplicate protection, GST-compliant invoices, and clear pricing — no dark patterns.",
  },
  {
    icon: Users,
    title: "Partners, not vendors",
    body: "Whether you self-serve or hire our agency, we win only when you grow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Our story"
        title="Growth tools for"
        highlight="every online business"
        description="We started jsyxi because great conversion tools were locked behind expensive agencies and developer time. So we built both: an easy no-code platform, and an agency for when you want it done for you."
      />

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <SectionHeading title="Our mission" />
        <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-slate-700">
          <p>
            Indian brands are building world-class online businesses — but too many lose customers at the
            last mile: a slow page, a missing review, a lead form that goes nowhere. We think fixing that
            shouldn&apos;t need a big budget or a technical team.
          </p>
          <p>
            jsyxi puts a full toolkit — reviews, forms, popups, countdowns, WhatsApp chat and more — in your
            hands, with a live preview and a one-line embed. And when you&apos;d rather focus on the business,
            our agency designs, installs, and optimizes everything for you.
          </p>
          <p>
            Our goal is simple: help you turn more of the traffic you already have into customers, and give
            you the reporting to prove it.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-5 sm:grid-cols-3">
            <StatTile label="Flagship widgets" value="8" hint="From reviews to countdowns" />
            <StatTile label="Page-load budget" value="< 3s" hint="Speed is a feature" tone="green" />
            <StatTile label="Built in" value="India" hint="INR pricing · GST invoices" tone="amber" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading title="What we value" description="The principles behind every product and project decision." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="bg-white border-y border-line">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <SectionHeading
            title="A small team with a big obsession"
            description="Designers, engineers, and growth specialists who care about your conversion rate as much as you do."
          />
          <p className="mx-auto mt-6 max-w-2xl text-slate-600">
            We keep the team lean and the feedback loop tight. When you talk to jsyxi — in the product or on a
            consultation — you&apos;re talking to the people who build and run it.
          </p>
        </div>
      </section>

      <DualCta
        title="Come build with us"
        description="Try the platform free, or book a call to see what our agency can do for your growth."
      />
    </>
  );
}
