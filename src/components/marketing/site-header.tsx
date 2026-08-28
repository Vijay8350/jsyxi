"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/tools", label: "Tools" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 shadow-[0_1px_0_rgba(15,118,110,0.05)] backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-9">
          <Logo />
          <nav className="hidden items-center gap-1 text-sm font-medium text-slate-600 lg:flex" aria-label="Primary navigation">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname === n.href || pathname.startsWith(`${n.href}/`) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 transition-colors",
                  pathname === n.href || pathname.startsWith(`${n.href}/`)
                    ? "bg-brand-50 text-brand-800"
                    : "hover:bg-white hover:text-brand-700",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">Log in</ButtonLink>
          <ButtonLink href="/signup" size="sm" className="rounded-full px-4">
            Start free <ArrowUpRight className="h-3.5 w-3.5" />
          </ButtonLink>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 top-[4.5rem] bg-slate-950/20 backdrop-blur-[2px] lg:hidden"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-navigation"
            className="animate-scale-in absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white/96 px-4 py-4 shadow-2xl shadow-slate-950/12 backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-medium" aria-label="Mobile navigation">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={pathname === n.href || pathname.startsWith(`${n.href}/`) ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-xl px-3 py-2.5 transition-colors",
                    pathname === n.href || pathname.startsWith(`${n.href}/`)
                      ? "bg-brand-50 text-brand-800"
                      : "hover:bg-slate-50",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <ButtonLink href="/login" variant="secondary" className="h-11">
                  Log in
                </ButtonLink>
                <ButtonLink href="/signup" className="h-11">
                  Start free
                </ButtonLink>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
