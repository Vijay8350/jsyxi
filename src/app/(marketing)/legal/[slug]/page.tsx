import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ArticleBody, TechBackdrop } from "@/components/marketing/sections";
import { Reveal } from "@/components/marketing/reveal";

type Params = { params: Promise<{ slug: string }> };

type LegalDoc = { title: string; description: string; updated: string; body: string };

const UPDATED = "19 July 2026";

const DOCS: Record<string, LegalDoc> = {
  terms: {
    title: "Terms of Service",
    description: "The terms that govern your use of the jsyxi platform and agency services.",
    updated: UPDATED,
    body: `These Terms of Service ("Terms") govern your access to and use of the jsyxi platform, widgets, and agency services (together, the "Services") operated from India. By creating an account or using the Services, you agree to these Terms.

## 1. Who we are
jsyxi provides a no-code widget platform and related growth-agency services. All pricing is quoted in Indian Rupees (INR) and, where applicable, is inclusive of Goods and Services Tax (GST) as required under Indian law.

## 2. Accounts and workspaces
You are responsible for the activity that happens under your account and workspace, and for keeping your login credentials secure. You must provide accurate information and are responsible for maintaining it. One person or business is the owner of each workspace.

## 3. Acceptable use
You agree not to misuse the Services: no unlawful content, no infringement of others' rights, no attempts to disrupt, reverse-engineer, or overload the platform, and no using widgets to collect data deceptively or in violation of applicable privacy law.

## 4. Plans, billing and GST
Free plans are provided at no cost. Paid plans are billed in INR and activated for your workspace by our team; a gap-free, GST-compliant tax invoice is issued for each payment. Prices shown are inclusive of applicable GST. Limits (such as widgets and monthly views) apply per your plan and may be enforced as described in-product.

## 5. Agency services
Where you engage our agency, the specific scope, deliverables, timeline, and fees are set out in a separate written quote or statement of work. Those service-specific terms supplement, and in case of conflict prevail over, these Terms for that engagement.

## 6. Your content
You retain ownership of the content and data you add to your widgets. You grant us the limited rights necessary to host, process, and display that content in order to provide the Services. You are responsible for having the rights to any content you upload.

## 7. Availability and changes
We work to keep the Services reliable and fast, but they are provided on an "as is" and "as available" basis. We may update, add, or remove features, and we may update these Terms; material changes will be communicated through the Services or by email.

## 8. Limitation of liability
To the maximum extent permitted by law, jsyxi is not liable for indirect, incidental, or consequential damages, and our total liability for any claim is limited to the amounts you paid us for the Services in the three months preceding the claim.

## 9. Termination
You may stop using the Services at any time. We may suspend or terminate access if these Terms are breached. On termination, your right to use the Services ends; certain provisions (such as ownership, disclaimers, and limitation of liability) survive.

## 10. Governing law
These Terms are governed by the laws of India, and the courts at our registered place of business have exclusive jurisdiction, subject to any mandatory consumer-protection rights you have.

## 11. Contact
Questions about these Terms? Reach us via the contact page and we'll be glad to help.

This document is a general template provided for transparency and does not constitute legal advice.`,
  },
  privacy: {
    title: "Privacy Policy",
    description: "How jsyxi collects, uses, and protects your personal data.",
    updated: UPDATED,
    body: `This Privacy Policy explains how jsyxi ("we", "us") collects, uses, and safeguards personal data when you use our platform, widgets, and agency services. We operate from India and handle data in line with applicable Indian data-protection law.

## 1. Data we collect
We collect: (a) account data you provide, such as your name, email, and workspace details; (b) lead and enquiry data submitted through our contact, consultation, and widget forms; (c) usage and analytics data such as widget views, which are aggregated and de-duplicated; and (d) technical data such as IP address and device/browser information used for security and abuse prevention.

## 2. How we use data
We use personal data to provide and improve the Services, authenticate you, process and route leads to the correct team, issue GST-compliant invoices, provide support, and communicate important updates. We rely on your consent, our contract with you, and our legitimate business interests as appropriate.

## 3. Widget-collected data
When you deploy a jsyxi widget (for example a lead form), submissions are stored in your workspace and routed to your CRM. You are the controller of that data and are responsible for informing your own visitors and obtaining any required consent.

## 4. Cookies and similar technologies
We use strictly necessary cookies to keep you signed in and secure the platform, and privacy-friendly, aggregated measurement to understand widget performance. We do not sell your personal data.

## 5. Sharing
We share data only with service providers who help us run the platform (such as hosting and email delivery), when required by law, or to protect the rights and safety of our users and the public. These providers are bound to protect your data.

## 6. Retention
We keep personal data for as long as your account is active or as needed to provide the Services, and thereafter as required for legal, tax (including GST), and accounting purposes. Raw view events are retained for a limited window and then aggregated.

## 7. Security
We use technical and organizational safeguards — including encryption in transit, hashed credentials, and access controls — to protect personal data. No system is perfectly secure, but we work hard to keep yours safe.

## 8. Your rights
Subject to applicable law, you may request access to, correction of, or deletion of your personal data, and you may object to or restrict certain processing. Contact us to exercise these rights and we'll respond within a reasonable time.

## 9. International users
We are based in India and store data accordingly. If you access the Services from elsewhere, you understand your data may be processed in India.

## 10. Changes and contact
We may update this Policy from time to time; material changes will be notified through the Services or by email. For any privacy question or request, reach us via the contact page.

This document is a general template provided for transparency and does not constitute legal advice.`,
  },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) return { title: "Legal" };
  return { title: doc.title, description: doc.description };
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) notFound();

  const other = slug === "terms" ? "privacy" : "terms";
  const otherLabel = other === "terms" ? "Terms of Service" : "Privacy Policy";

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line/70 bg-hero-grid">
        <TechBackdrop className="-z-10" />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:py-20">
          <Reveal>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <p className="section-kicker mt-6">Legal &amp; trust</p>
            <h1 className="mt-3 text-[clamp(2.45rem,9vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink">
              {doc.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{doc.description}</p>
            <p className="mt-4 text-sm font-medium text-slate-500">Last updated: {doc.updated}</p>
          </Reveal>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:py-16">
        <Reveal>
          <ArticleBody body={doc.body} />
        </Reveal>

        <Reveal delay={100}>
          <Link
            href={`/legal/${other}`}
            className="premium-card group mt-12 flex min-h-20 items-center justify-between gap-4 rounded-2xl p-5 text-sm text-slate-600"
          >
            <span>
              Looking for our <strong className="font-semibold text-ink">{otherLabel}</strong>?
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-brand-700 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </article>
    </>
  );
}
