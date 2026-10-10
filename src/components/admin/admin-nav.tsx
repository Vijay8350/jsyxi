"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, Building2, Blocks, CreditCard, Users, FileText, Newspaper, Star,
  LifeBuoy, ShieldCheck, Settings, ScrollText, LogOut, ChevronUp, Briefcase, BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminSection } from "@/lib/permissions";
import { staffLogoutAction } from "@/lib/actions/staff-auth";

const SECTION_META: Record<AdminSection, { href: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = {
  dashboard: { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  workspaces: { href: "/admin/workspaces", label: "Workspaces", icon: Building2 },
  catalog: { href: "/admin/catalog", label: "Catalog", icon: Blocks },
  plans: { href: "/admin/plans", label: "Plans & Pricing", icon: CreditCard },
  leads: { href: "/admin/leads", label: "Leads / CRM", icon: Users },
  invoices: { href: "/admin/invoices", label: "Invoices", icon: FileText },
  content: { href: "/admin/content", label: "Content", icon: Newspaper },
  knowledge: { href: "/admin/knowledge", label: "Knowledge Base", icon: BookOpen },
  services: { href: "/admin/services", label: "Services", icon: Briefcase },
  reviews: { href: "/admin/reviews", label: "Reviews", icon: Star },
  tickets: { href: "/admin/tickets", label: "Tickets", icon: LifeBuoy },
  roles: { href: "/admin/roles", label: "Staff & Roles", icon: ShieldCheck },
  settings: { href: "/admin/settings", label: "Settings", icon: Settings },
  audit: { href: "/admin/audit", label: "Audit Log", icon: ScrollText },
};

export function AdminSidebarNav({ sections }: { sections: AdminSection[] }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {sections.map((s) => {
        const meta = SECTION_META[s];
        const active = isActive(meta.href, meta.exact);
        return (
          <Link
            key={s}
            href={meta.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-white",
            )}
          >
            <meta.icon className="shrink-0" style={{ width: 18, height: 18 }} />
            {meta.label}
          </Link>
        );
      })}
    </nav>
  );
}

function useClickAway(onAway: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onAway();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onAway]);
  return ref;
}

export function StaffMenu({ name, email, roleLabel }: { name: string; email: string; roleLabel: string }) {
  const [open, setOpen] = useState(false);
  const ref = useClickAway(() => setOpen(false));
  return (
    <div className="relative px-3" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-left hover:bg-slate-800"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
          {name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-white">{name}</span>
          <span className="block truncate text-xs text-slate-400">{roleLabel}</span>
        </span>
        <ChevronUp className={cn("h-4 w-4 text-slate-400 transition-transform", open ? "" : "rotate-180")} />
      </button>
      {open && (
        <div className="absolute bottom-full left-3 right-3 z-30 mb-1 rounded-lg border border-slate-700 bg-slate-800 p-1 shadow-lg">
          <div className="px-3 py-2">
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="truncate text-xs text-slate-400">{email}</p>
          </div>
          <div className="my-1 h-px bg-slate-700" />
          <form action={staffLogoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
