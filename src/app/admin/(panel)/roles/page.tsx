import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { STAFF_ROLE_LABELS } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, TableCard, AccessDenied } from "@/components/admin/ui";
import { CreateStaffForm, StaffStatusToggle } from "@/components/admin/role-actions";

export const metadata: Metadata = { title: "Staff & Roles" };

export default async function RolesPage() {
  const staff = await requireStaff();
  // owner_admin only.
  if (staff.staffRole !== "owner_admin") return <AccessDenied section="staff & roles" />;

  const members = await prisma.staffUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="space-y-6">
      <PageHeader title="Staff & Roles" description="Manage internal staff accounts and their roles." />

      <Card>
        <CardHeader><CardTitle>Add staff member</CardTitle></CardHeader>
        <CardBody className="pt-0"><CreateStaffForm /></CardBody>
      </Card>

      <TableCard>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-ink">{m.name}{m.id === staff.id && <span className="ml-2 text-xs text-slate-400">(you)</span>}</td>
                <td className="px-4 py-3 text-slate-600">{m.email}</td>
                <td className="px-4 py-3"><Badge tone="blue">{STAFF_ROLE_LABELS[m.staffRole]}</Badge></td>
                <td className="px-4 py-3"><Badge tone={m.status === "active" ? "green" : "red"}>{m.status}</Badge></td>
                <td className="px-4 py-3 text-slate-500">{formatInTz(m.createdAt, undefined, "dd LLL yyyy")}</td>
                <td className="px-4 py-3 text-right">
                  <StaffStatusToggle staffId={m.id} active={m.status === "active"} disabled={m.id === staff.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </div>
  );
}
