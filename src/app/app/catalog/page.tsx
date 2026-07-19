import type { Metadata } from "next";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { CatalogBrowser, type CatalogTool } from "@/components/app/catalog-browser";

export const metadata: Metadata = { title: "Tools Catalog" };

export default async function CatalogPage() {
  await requireWorkspaceContext();
  const [tools, categories] = await Promise.all([
    prisma.tool.findMany({ where: { status: "published" }, include: { category: true }, orderBy: { sortOrder: "asc" } }),
    prisma.toolCategory.findMany({ where: { status: "active" }, orderBy: { sortOrder: "asc" } }),
  ]);

  const data: CatalogTool[] = tools.map((t) => ({
    id: t.id, key: t.key, name: t.name, description: t.description,
    categorySlug: t.category.slug, categoryName: t.category.name, badges: t.badges,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Tools Catalog</h1>
        <p className="mt-1 text-sm text-slate-500">Pick a tool, start from a template, and publish in minutes.</p>
      </div>
      <CatalogBrowser tools={data} categories={categories.map((c) => ({ slug: c.slug, name: c.name }))} />
    </div>
  );
}
