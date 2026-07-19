"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";

const NAV = [
  { href: "/tools", label: "Tools" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-ink transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" size="sm">Log in</ButtonLink>
          <ButtonLink href="/signup" size="sm">Start free</ButtonLink>
        </div>
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-line bg-white px-4 py-3">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 hover:bg-slate-100" onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <ButtonLink href="/login" variant="secondary" size="sm" className="flex-1">Log in</ButtonLink>
              <ButtonLink href="/signup" size="sm" className="flex-1">Start free</ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
