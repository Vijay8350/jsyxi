import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { StatTile } from "@/components/ui/misc";
import { PageHeader, AccessDenied } from "@/components/admin/ui";
import { TestimonialRowEditor, TestimonialCreate, type TestimonialRow } from "@/components/admin/review-actions";

export const metadata: Metadata = { title: "Reviews" };

export default async function ReviewsPage() {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "reviews")) return <AccessDenied section="reviews" />;

  const [items, approved, featured, tools] = await Promise.all([
    prisma.siteTestimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    prisma.siteTestimonial.count({ where: { approved: true } }),
    prisma.siteTestimonial.count({ where: { featured: true } }),
    prisma.tool.findMany({ where: { status: "published" }, orderBy: { sortOrder: "asc" }, select: { key: true, name: true } }),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader title="Reviews" description="Moderate testimonials shown on the marketing site." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Total" value={items.length} tone="slate" />
        <StatTile label="Approved" value={approved} tone="green" />
        <StatTile label="Featured" value={featured} tone="brand" />
      </div>

      <Card>
        <CardHeader><CardTitle>Add testimonial</CardTitle></CardHeader>
        <CardBody className="px-0 py-0"><TestimonialCreate tools={tools} /></CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>All testimonials</CardTitle></CardHeader>
        <CardBody className="px-0 py-0">
          {items.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-slate-400">No testimonials yet.</p>
          ) : (
            items.map((t) => <TestimonialRowEditor key={t.id} t={t as TestimonialRow} tools={tools} />)
          )}
        </CardBody>
      </Card>
    </div>
  );
}
