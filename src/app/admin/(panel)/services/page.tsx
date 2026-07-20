import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, AccessDenied } from "@/components/admin/ui";
import { ServiceEditor, ServiceCreate, type ServiceValues } from "@/components/admin/service-editor";

export const metadata: Metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "services")) return <AccessDenied section="services" />;

  const items = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-6">
      <PageHeader title="Services" description="Agency service offerings shown on the marketing site (/services)." />

      <Card>
        <CardHeader><CardTitle>Create</CardTitle></CardHeader>
        <CardBody className="px-0 py-0"><ServiceCreate /></CardBody>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All services</CardTitle>
          <span className="text-sm text-slate-400">{items.length} services</span>
        </CardHeader>
        <CardBody className="px-0 py-0">
          {items.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-slate-400">No services yet.</p>
          ) : (
            items.map((s) => (
              <div key={s.id}>
                <div className="flex items-center justify-between px-4 pt-3 text-xs text-slate-400">
                  <span>{s.icon}</span>
                  <Badge tone={s.status === "published" ? "green" : "amber"}>{s.status}</Badge>
                </div>
                <ServiceEditor item={s as unknown as ServiceValues} />
              </div>
            ))
          )}
        </CardBody>
      </Card>
    </div>
  );
}
