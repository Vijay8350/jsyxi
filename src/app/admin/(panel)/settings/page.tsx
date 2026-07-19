import type { Metadata } from "next";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { getSetting } from "@/lib/settings";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader, AccessDenied } from "@/components/admin/ui";
import { SETTING_FIELDS } from "@/components/admin/settings-meta";
import { SettingRow } from "@/components/admin/settings-form";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "settings")) return <AccessDenied section="settings" />;

  const values = await Promise.all(SETTING_FIELDS.map((f) => getSetting(f.key)));

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Platform-wide S-* register. Changes are audited." />

      <Card>
        <CardHeader><CardTitle>Settings register</CardTitle></CardHeader>
        <CardBody className="px-0 py-0">
          {SETTING_FIELDS.map((f, i) => (
            <SettingRow
              key={f.key}
              settingKey={f.key}
              label={f.label}
              value={values[i]}
              hint={f.hint}
              later={f.later}
            />
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
