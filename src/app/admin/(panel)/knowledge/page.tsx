import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { StatTile } from "@/components/ui/misc";
import { PageHeader, AccessDenied } from "@/components/admin/ui";
import { KnowledgeRowEditor, KnowledgeCreate, type KnowledgeRow } from "@/components/admin/knowledge-editor";

export const metadata: Metadata = { title: "Knowledge Base" };

export default async function KnowledgePage() {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "knowledge")) return <AccessDenied section="knowledge" />;

  const items = await prisma.knowledgeArticle.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  const active = items.filter((i) => i.enabled).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Base"
        description="Train the site AI assistant. It answers visitors from these articles — add, edit, or disable them any time (no redeploy needed)."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatTile label="Articles" value={items.length} tone="slate" />
        <StatTile label="Active" value={active} tone="green" />
      </div>

      <Card>
        <CardHeader><CardTitle>Add knowledge</CardTitle></CardHeader>
        <CardBody className="px-0 py-0"><KnowledgeCreate /></CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>All articles</CardTitle></CardHeader>
        <CardBody className="px-0 py-0">
          {items.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-slate-400">No knowledge articles yet. Add your first above.</p>
          ) : (
            items.map((a) => <KnowledgeRowEditor key={a.id} a={a as KnowledgeRow} />)
          )}
        </CardBody>
      </Card>
    </div>
  );
}
