"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, FileText, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export type HelpArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
};

export function HelpSearch({ articles }: { articles: HelpArticle[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) => a.title.toLowerCase().includes(q) || (a.excerpt ?? "").toLowerCase().includes(q),
    );
  }, [articles, query]);

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search help articles…"
          className="pl-9"
          aria-label="Search help articles"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {filtered.map((a) => (
          <Link
            key={a.id}
            href={`/help/${a.slug}`}
            className="group flex items-start gap-4 rounded-xl border border-line bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <FileText className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-ink group-hover:text-brand-700">{a.title}</span>
              {a.excerpt && <span className="mt-1 block text-sm text-slate-500 line-clamp-2">{a.excerpt}</span>}
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                Read <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-slate-400">
          No articles match &ldquo;{query}&rdquo;. Try a different search, or{" "}
          <Link href="/contact" className="text-brand-600 hover:text-brand-700">
            contact support
          </Link>
          .
        </p>
      )}
    </div>
  );
}
