import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toolIcon } from "@/lib/tools/icons";
import { CreateWidgetForm } from "./create-form";

export default async function CreateToolPage({ params }: { params: Promise<{ key: string }> }) {
  await requireWorkspaceContext();
  const { key } = await params;
  const tool = await prisma.tool.findUnique({
    where: { key },
    include: { templates: { where: { status: "published" }, orderBy: { sortOrder: "asc" } }, category: true },
  });
  if (!tool || tool.status !== "published") notFound();
  const Icon = toolIcon(tool.key);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/app/catalog" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Icon className="h-7 w-7" />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-ink">{tool.name}</h1>
            {tool.badges.map((b) => <Badge key={b} tone="slate">{b}</Badge>)}
          </div>
          <p className="mt-1 text-slate-500">{tool.description}</p>
        </div>
      </div>

      <Card>
        <CardBody>
          <CreateWidgetForm
            toolKey={tool.key}
            toolName={tool.name}
            templates={tool.templates.map((t) => ({ id: t.id, name: t.name, useCase: t.useCase, industry: t.industry }))}
          />
        </CardBody>
      </Card>
    </div>
  );
}
