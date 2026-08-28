import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/marketing/contact-form";
import { Reveal } from "@/components/marketing/reveal";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

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
      <section className="relative isolate overflow-hidden border-b border-line/70">
        <div className="bg-hero-grid absolute inset-0 -z-20" aria-hidden="true" />
        <div
          className="absolute -left-32 top-1/3 -z-10 h-80 w-80 rounded-full bg-brand-200/45 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-emerald-200/35 blur-3xl"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-24">
          <Reveal>
            <div className="text-center lg:text-left">
              <Badge tone="brand" className="mx-auto rounded-full bg-white/80 px-3 py-1.5 shadow-sm lg:mx-0">
                We usually reply within a business day
              </Badge>
              <h1 className="mt-5 text-[clamp(2.35rem,10vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-ink">
                Let&apos;s build your next <span className="animate-gradient text-gradient-brand">growth move.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0">
                Send us a message or book a free consultation. However you reach out, a real person on our team
                will get back to you.
              </p>
              <ul className="mx-auto mt-7 grid max-w-lg gap-2.5 text-left sm:grid-cols-2 lg:mx-0">
                {["A clear, practical response", "No-pressure first conversation"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <figure className="group relative min-h-[310px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-slate-900 shadow-2xl shadow-slate-900/15 sm:min-h-[420px] sm:rounded-[2rem]">
              <Image
                src={MARKETING_IMAGES.team.src}
                alt={MARKETING_IMAGES.team.alt}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/5 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-slate-950/75 p-4 text-left text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
                  Your free consultation
                </p>
                <p className="mt-1.5 text-lg font-semibold sm:text-xl">
                  Bring the challenge. Leave with a clearer next step.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Form + channels */}
      <section aria-labelledby="contact-form-heading" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-brand-100/50 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[1.45fr_0.85fr] lg:gap-14">
            <Reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Tell us what you need</p>
                <h2 id="contact-form-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Start the conversation.
                </h2>
                <p className="mb-6 mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Choose a quick enquiry or reserve a consultation time that works for you.
                </p>
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <aside aria-labelledby="contact-channels-heading" className="space-y-4 lg:sticky lg:top-28">
                <h2 id="contact-channels-heading" className="text-lg font-semibold text-ink">
                  Other ways to reach us
                </h2>
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  const external = channel.href.startsWith("http");
                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex min-h-20 items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100 motion-reduce:transition-none">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{channel.label}</span>
                        <span className="block break-all text-sm text-brand-600">{channel.value}</span>
                        <span className="mt-0.5 block text-xs text-slate-500">{channel.hint}</span>
                      </span>
                    </a>
                  );
                })}

                <div className="flex items-start gap-4 rounded-2xl border border-line bg-canvas p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <address className="text-sm not-italic">
                    <span className="block font-semibold text-ink">Office</span>
                    <span className="mt-0.5 block text-slate-600">
                      jsyxi Technologies
                      <br />
                      Bengaluru, Karnataka, India
                    </span>
                  </address>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-line bg-canvas p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm">
                    <span className="block font-semibold text-ink">Support hours</span>
                    <span className="mt-0.5 block text-slate-600">Monday–Friday · 10:00–18:00 IST</span>
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
