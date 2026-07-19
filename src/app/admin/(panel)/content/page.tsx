import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, AccessDenied } from "@/components/admin/ui";
import { ContentEditor, ContentCreate, type ContentValues } from "@/components/admin/content-editor";

export const metadata: Metadata = { title: "Content" };

export default async function ContentPage() {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "content")) return <AccessDenied section="content" />;

  const items = await prisma.contentItem.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <PageHeader title="Content" description="Marketing site posts, guides and case studies." />

      <Card>
        <CardHeader><CardTitle>Create</CardTitle></CardHeader>
        <CardBody className="px-0 py-0"><ContentCreate /></CardBody>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All content</CardTitle>
          <span className="text-sm text-slate-400">{items.length} items</span>
        </CardHeader>
        <CardBody className="px-0 py-0">
          {items.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-slate-400">No content yet.</p>
          ) : (
            items.map((c) => (
              <div key={c.id}>
                <div className="flex items-center justify-between px-4 pt-3 text-xs text-slate-400">
                  <span>{c.publishedAt ? `Published ${formatInTz(c.publishedAt, undefined, "dd LLL yyyy")}` : "Not published"}</span>
                  <Badge tone={c.status === "published" ? "green" : "amber"}>{c.status}</Badge>
                </div>
                <ContentEditor item={c as unknown as ContentValues} />
              </div>
            ))
          )}
        </CardBody>
      </Card>
    </div>
  );
}
