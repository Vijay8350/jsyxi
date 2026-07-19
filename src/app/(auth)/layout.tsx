import Link from "next/link";
import { Check } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-brand-600 p-12 text-white">
        <Logo light />
        <div>
          <h2 className="text-3xl font-bold leading-tight">Everything you need to grow your online business.</h2>
          <ul className="mt-8 space-y-3 text-brand-50">
            {[
              "8 no-code widgets, embed with one line",
              "Leads flow straight into your CRM",
              "Views, limits & forecasts at a glance",
              "GST invoices and manual billing built in",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500">
                  <Check className="h-4 w-4" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-brand-200">© {new Date().getFullYear()} jsyxi</p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-6 lg:hidden">
          <Logo />
          <Link href="/" className="text-sm text-slate-500 hover:text-ink">← Back to site</Link>
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
