"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toolIcon } from "@/lib/tools/icons";
import { cn } from "@/lib/utils";

export type CatalogTool = {
  id: string;
  key: string;
  name: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  badges: string[];
};
type Category = { slug: string; name: string };

export function CatalogBrowser({ tools, categories, hrefBase = "/app/catalog" }: {
  tools: CatalogTool[];
  categories: Category[];
  hrefBase?: string;
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => {
      const matchesCat = cat === "all" || t.categorySlug === cat;
      const matchesQ = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [tools, query, cat]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tools…" className="pl-9" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <CatChip active={cat === "all"} onClick={() => setCat("all")}>All</CatChip>
        {categories.map((c) => (
          <CatChip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</CatChip>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => {
          const Icon = toolIcon(t.key);
          return (
            <Link
              key={t.id}
              href={`${hrefBase}/${t.key}`}
              className="group rounded-xl border border-line bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="flex flex-wrap justify-end gap-1">
                  {t.badges.slice(0, 2).map((b) => (
                    <Badge key={b} tone={b === "Popular" ? "amber" : b === "New" ? "green" : "slate"}>{b}</Badge>
                  ))}
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-ink group-hover:text-brand-700">{t.name}</h3>
              <p className="mt-1 text-sm text-slate-500 line-clamp-2">{t.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand-600">Create widget →</span>
            </Link>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="mt-10 text-center text-sm text-slate-400">No tools match your search.</p>}
    </div>
  );
}

function CatChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        active ? "bg-brand-600 text-white" : "bg-white border border-line text-slate-600 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}
