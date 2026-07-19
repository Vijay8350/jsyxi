import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact & consultations",
  description:
    "Get in touch with jsyxi — send an enquiry or book a free consultation. Reach us by email, phone, or WhatsApp. Made in India.",
};

// Placeholder public contact details (marketing site).
const EMAIL = "hello@jsyxi.com";
const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_TEL = "+919876543210";
const WA_NUMBER = "919876543210";
const WA_MESSAGE = encodeURIComponent("Hi jsyxi! I'd like to know more about your widgets and services.");

export default function ContactPage() {
  const channels = [
    {
      icon: Mail,
      label: "Email us",
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      hint: "Replies within one business day",
    },
    {
      icon: Phone,
      label: "Call us",
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_TEL}`,
      hint: "Mon–Fri, 10am–6pm IST",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`,
      hint: "Fastest way to reach us",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-grid">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 text-center">
          <Badge tone="brand" className="mx-auto">
            We usually reply within a business day
          </Badge>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Let&apos;s talk about your <span className="text-brand-600">growth</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Send us a message or book a free consultation. However you reach out, a real person on our team will
            get back to you.
          </p>
        </div>
      </section>

      {/* Form + channels */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <ContactForm />
          </div>

          <aside className="space-y-4">
            <h2 className="text-lg font-semibold text-ink">Other ways to reach us</h2>
            {channels.map((c) => {
              const Icon = c.icon;
              const external = c.href.startsWith("http");
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 rounded-xl border border-line bg-white p-4 shadow-sm transition hover:border-brand-200 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{c.label}</span>
                    <span className="block text-sm text-brand-600">{c.value}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{c.hint}</span>
                  </span>
                </a>
              );
            })}

            <div className="flex items-start gap-4 rounded-xl border border-line bg-canvas p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-ink">Office</span>
                <span className="mt-0.5 block text-slate-600">
                  jsyxi Technologies
                  <br />
                  Bengaluru, Karnataka, India
                </span>
              </span>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-line bg-canvas p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Clock className="h-5 w-5" />
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-ink">Support hours</span>
                <span className="mt-0.5 block text-slate-600">Monday–Friday · 10:00–18:00 IST</span>
              </span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
