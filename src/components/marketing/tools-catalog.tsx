"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
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
  badges: string[];
};
type Category = { slug: string; name: string };

function badgeTone(b: string): "amber" | "green" | "brand" | "slate" {
  if (b === "Popular") return "amber";
  if (b === "New") return "green";
  if (b === "Conversion") return "brand";
  return "slate";
}

export function ToolsCatalog({ tools, categories }: { tools: CatalogTool[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");

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
      <div className="relative mx-auto max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          className="pl-9"
          aria-label="Search tools"
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
            {c.name}
          </Chip>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => {
          const Icon = toolIcon(t.key);
          return (
            <Link
              key={t.id}
              href={`/tools/${t.key}`}
              className="group flex flex-col rounded-xl border border-line bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="flex flex-wrap justify-end gap-1">
                  {t.badges.slice(0, 2).map((b) => (
                    <Badge key={b} tone={badgeTone(b)}>
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
              <h3 className="mt-4 font-semibold text-ink group-hover:text-brand-700">{t.name}</h3>
              <p className="mt-1 flex-1 text-sm text-slate-500 line-clamp-2">{t.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                Try it live <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-slate-400">No tools match your search.</p>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        active ? "bg-brand-600 text-white" : "border border-line bg-white text-slate-600 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}
