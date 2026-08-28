import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="dark-panel relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Image
          src="/tech-growth-visual.png"
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-45"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,17,0.2),rgba(7,19,17,0.78)_72%,#071311)]"
        />
        <div aria-hidden className="tech-scan-line absolute inset-x-0 top-0 h-px bg-emerald-200/70" />

        <div className="relative">
          <Logo light />
        </div>

        <div className="glass-panel relative max-w-xl rounded-[1.75rem] !border-white/10 !bg-black/25 p-7 backdrop-blur-xl">
          <p className="section-kicker !text-emerald-300">Your growth workspace</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.03em]">
            Everything you need to grow your online business.
          </h2>
          <ul className="mt-7 space-y-3 text-white/80">
            {[
              "8 no-code widgets, embed with one line",
              "Leads flow straight into your CRM",
              "Views, limits & forecasts at a glance",
              "GST invoices and manual billing built in",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-300/15 text-emerald-200 ring-1 ring-emerald-200/20">
                  <Check aria-hidden className="h-4 w-4" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/55">© {new Date().getFullYear()} jsyxi</p>
      </div>

      <div className="relative flex flex-col overflow-hidden bg-canvas">
        <div aria-hidden className="bg-hero-grid absolute inset-0 opacity-55" />
        <div aria-hidden className="absolute -right-32 -top-24 h-80 w-80 rounded-full bg-brand-200/35 blur-3xl" />
        <div className="relative flex items-center justify-between p-5 sm:p-6 lg:hidden">
          <Logo />
          <Link href="/" className="inline-flex min-h-11 items-center text-sm font-medium text-slate-600 hover:text-ink">
            ← Back to site
          </Link>
        </div>
        <div className="relative flex flex-1 items-center justify-center p-5 sm:p-8">
          <div className="glass-panel w-full max-w-md rounded-[1.5rem] p-6 sm:rounded-[1.75rem] sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
