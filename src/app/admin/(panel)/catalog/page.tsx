import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, AccessDenied } from "@/components/admin/ui";
import { ToolEditor, CategoryEditor, CategoryCreate } from "@/components/admin/catalog-editor";

export const metadata: Metadata = { title: "Catalog" };

const TPL_TONE = { draft: "amber", published: "green", retired: "slate" } as const;

export default async function CatalogPage() {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "catalog")) return <AccessDenied section="catalog" />;

  const [tools, categories, templates] = await Promise.all([
    prisma.tool.findMany({ include: { category: true, _count: { select: { templates: true } } }, orderBy: { sortOrder: "asc" } }),
    prisma.toolCategory.findMany({ include: { _count: { select: { tools: true } } }, orderBy: { sortOrder: "asc" } }),
    prisma.template.findMany({ include: { tool: true }, orderBy: [{ toolId: "asc" }, { sortOrder: "asc" }] }),
  ]);
  const templateCount = templates.length;

  return (
    <div className="space-y-6">
      <PageHeader title="Catalog" description={`${tools.length} tools · ${templateCount} templates · ${categories.length} categories.`} />

      <Card>
        <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
        <CardBody className="px-0 pb-0 pt-0">
          <div className="divide-y divide-line">
            {categories.map((c) => (
              <CategoryEditor
                key={c.id}
                category={{ id: c.id, name: c.name, status: c.status, toolCount: c._count.tools }}
              />
            ))}
          </div>
          <div className="border-t border-line bg-slate-50/60">
            <CategoryCreate />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Tools</CardTitle></CardHeader>
        <CardBody className="px-0 py-0">
          {tools.map((t) => (
            <ToolEditor
              key={t.id}
              tool={{
                id: t.id,
                name: t.name,
                key: t.key,
                categoryName: t.category.name,
                description: t.description,
                badges: t.badges,
                sortOrder: t.sortOrder,
                status: t.status,
              }}
            />
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Templates</CardTitle></CardHeader>
        <CardBody className="px-0 py-0">
          {templates.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-slate-400">No templates seeded.</p>
          ) : (
            <ul className="divide-y divide-line">
              {templates.map((tpl) => (
                <li key={tpl.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">{tpl.name}</span>
                    <span className="block truncate text-xs text-slate-500">{tpl.tool.name}{tpl.useCase ? ` · ${tpl.useCase}` : ""}</span>
                  </span>
                  <Badge tone={TPL_TONE[tpl.status]}>{tpl.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
