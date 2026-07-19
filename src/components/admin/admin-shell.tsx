"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck } from "lucide-react";

function AdminLogo() {
  return (
    <Link href="/admin" className="inline-flex items-center gap-2 font-bold tracking-tight text-white">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
        <ShieldCheck className="h-5 w-5" />
      </span>
      <span className="text-lg leading-none">
        jsyxi <span className="text-xs font-medium text-slate-400">admin</span>
      </span>
    </Link>
  );
}

export function AdminShell({
  sidebar,
  footer,
  children,
}: {
  sidebar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  const panel = (
    <>
      <div className="flex h-16 items-center px-5">
        <AdminLogo />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin py-2">{sidebar}</div>
      <div className="border-t border-slate-800 py-3">{footer}</div>
    </>
  );

  return (
    <div className="min-h-screen bg-canvas">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-slate-800 bg-slate-900 lg:flex">
        {panel}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-slate-800 bg-slate-900">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-5 rounded-lg p-1.5 text-slate-300 hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {panel}
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
          <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="font-bold text-ink">jsyxi admin</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/app" className="text-sm font-medium text-slate-500 hover:text-ink">
              Customer app →
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
