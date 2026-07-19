import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const COLS = [
  {
    title: "Product",
    links: [
      { href: "/tools", label: "Tools catalog" },
      { href: "/pricing", label: "Pricing" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/shopify", label: "Shopify" },
    ],
  },
  {
    title: "Agency",
    links: [
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Book a consultation" },
      { href: "/about", label: "About us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/help", label: "Help center" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-slate-500 max-w-xs">
              No-code widgets and a full-service growth engine for modern online businesses.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-ink transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line pt-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} jsyxi. All rights reserved.</p>
          <p>Made in India · Prices in INR (incl. GST)</p>
        </div>
      </div>
    </footer>
  );
}
