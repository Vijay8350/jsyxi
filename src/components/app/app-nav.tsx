"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useTransition } from "react";
import {
  LayoutDashboard, LayoutGrid, Blocks, BarChart3, CreditCard, Inbox, Gift, LifeBuoy, Bell, User,
  ChevronsUpDown, Check, LogOut, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { switchWorkspaceAction } from "@/lib/actions/workspace";
import { logoutAction } from "@/lib/actions/auth";

const NAV = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/app/widgets", label: "My Widgets", icon: LayoutGrid },
  { href: "/app/catalog", label: "Tools Catalog", icon: Blocks },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/app/subscription", label: "Subscription", icon: CreditCard },
  { href: "/app/service-requests", label: "Service Requests", icon: Inbox },
  { href: "/app/deals", label: "Deals & Referrals", icon: Gift },
  { href: "/app/support", label: "Support", icon: LifeBuoy },
];

export function SidebarNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname === href || pathname.startsWith(href + "/"));
  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {NAV.map((n) => {
        const active = isActive(n.href, n.exact);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100 hover:text-ink",
            )}
          >
            <n.icon className="h-4.5 w-4.5 shrink-0" style={{ width: 18, height: 18 }} />
            {n.label}
          </Link>
        );
      })}
      <Link
        href="/app/notifications"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive("/app/notifications") ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100 hover:text-ink",
        )}
      >
        <Bell style={{ width: 18, height: 18 }} className="shrink-0" />
        <span className="flex-1">Notifications</span>
        {unread > 0 && <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">{unread}</span>}
      </Link>
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

type Ws = { id: string; name: string; planName: string };

export function WorkspaceSwitcher({ workspaces, current }: { workspaces: Ws[]; current: Ws }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const ref = useClickAway(() => setOpen(false));
  return (
    <div className="relative px-3" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-left hover:bg-slate-50"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
          {current.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-ink">{current.name}</span>
          <span className="block truncate text-xs text-slate-500">{current.planName} plan</span>
        </span>
        <ChevronsUpDown className="h-4 w-4 text-slate-400" />
      </button>
      {open && (
        <div className="absolute left-3 right-3 z-30 mt-1 rounded-lg border border-line bg-white p-1 shadow-lg">
          <p className="px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">Workspaces</p>
          {workspaces.map((w) => (
            <button
              key={w.id}
              disabled={pending}
              onClick={() => start(() => switchWorkspaceAction(w.id))}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-slate-100 disabled:opacity-50"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-xs font-bold text-slate-600">
                {w.name.charAt(0).toUpperCase()}
              </span>
              <span className="flex-1 truncate">{w.name}</span>
              {w.id === current.id && <Check className="h-4 w-4 text-brand-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function UserMenu({ name, email }: { name: string; email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useClickAway(() => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
          {name.charAt(0).toUpperCase()}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-1 w-56 rounded-lg border border-line bg-white p-1 shadow-lg">
          <div className="px-3 py-2">
            <p className="truncate text-sm font-semibold text-ink">{name}</p>
            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>
          <div className="my-1 h-px bg-line" />
          <Link href="/app/profile" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-slate-100">
            <User className="h-4 w-4" /> Profile &amp; security
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
