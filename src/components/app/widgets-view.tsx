"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, LayoutGrid, List, Table as TableIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toolIcon } from "@/lib/tools/icons";
import { cn } from "@/lib/utils";

export type WidgetRow = {
  id: string;
  name: string;
  toolKey: string;
  toolName: string;
  statusLabel: string;
  statusTone: "brand" | "green" | "amber" | "red" | "slate" | "blue";
  createdAt: string;
  updatedAt: string;
  updatedLabel: string;
};

type View = "grid" | "list" | "table";
type Sort = "updated" | "created" | "name";

export function WidgetsView({ widgets }: { widgets: WidgetRow[] }) {
  const [view, setView] = useState<View>("grid");
  const [sort, setSort] = useState<Sort>("updated");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = widgets.filter((w) => !q || w.name.toLowerCase().includes(q) || w.toolName.toLowerCase().includes(q));
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "created") return b.createdAt.localeCompare(a.createdAt);
      return b.updatedAt.localeCompare(a.updatedAt);
    });
    return sorted;
  }, [widgets, query, sort]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search widgets…" className="pl-9" />
        </div>
        <Select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="sm:w-44">
          <option value="updated">Last modified</option>
          <option value="created">Date created</option>
          <option value="name">Name (A–Z)</option>
        </Select>
        <div className="flex rounded-lg border border-line bg-white p-0.5">
          <ViewBtn active={view === "grid"} onClick={() => setView("grid")}><LayoutGrid className="h-4 w-4" /></ViewBtn>
          <ViewBtn active={view === "list"} onClick={() => setView("list")}><List className="h-4 w-4" /></ViewBtn>
          <ViewBtn active={view === "table"} onClick={() => setView("table")}><TableIcon className="h-4 w-4" /></ViewBtn>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="mt-12 text-center text-sm text-slate-400">No widgets match.</p>
      ) : view === "grid" ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((w) => {
            const Icon = toolIcon(w.toolKey);
            return (
              <Link key={w.id} href={`/app/widgets/${w.id}`} className="rounded-xl border border-line bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Icon className="h-5 w-5" /></span>
                  <Badge tone={w.statusTone}>{w.statusLabel}</Badge>
                </div>
                <h3 className="mt-4 truncate font-semibold text-ink">{w.name}</h3>
                <p className="mt-0.5 text-sm text-slate-500">{w.toolName}</p>
                <p className="mt-3 text-xs text-slate-400">Updated {w.updatedLabel}</p>
              </Link>
            );
          })}
        </div>
      ) : view === "list" ? (
        <ul className="mt-6 divide-y divide-line rounded-xl border border-line bg-white">
          {rows.map((w) => {
            const Icon = toolIcon(w.toolKey);
            return (
              <li key={w.id}>
                <Link href={`/app/widgets/${w.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-ink">{w.name}</span>
                    <span className="block text-xs text-slate-500">{w.toolName} · updated {w.updatedLabel}</span>
                  </span>
                  <Badge tone={w.statusTone}>{w.statusLabel}</Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Tool</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3"><Link href={`/app/widgets/${w.id}`} className="font-medium text-brand-600 hover:underline">{w.name}</Link></td>
                  <td className="px-4 py-3 text-slate-600">{w.toolName}</td>
                  <td className="px-4 py-3"><Badge tone={w.statusTone}>{w.statusLabel}</Badge></td>
                  <td className="px-4 py-3 text-slate-500">{w.updatedLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ViewBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn("flex h-8 w-8 items-center justify-center rounded-md", active ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100")}>
      {children}
    </button>
  );
}
