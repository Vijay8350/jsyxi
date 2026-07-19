import { requireStaff } from "@/lib/auth/current-user";
import { staffSections, STAFF_ROLE_LABELS } from "@/lib/permissions";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminSidebarNav, StaffMenu } from "@/components/admin/admin-nav";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();
  const sections = staffSections(staff.staffRole);

  return (
    <AdminShell
      sidebar={<AdminSidebarNav sections={sections} />}
      footer={<StaffMenu name={staff.name} email={staff.email} roleLabel={STAFF_ROLE_LABELS[staff.staffRole]} />}
    >
      {children}
    </AdminShell>
  );
}
