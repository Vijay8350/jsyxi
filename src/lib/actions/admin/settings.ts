"use server";

import { revalidatePath } from "next/cache";
import { getSetting, setSetting } from "@/lib/settings";
import { writeAudit } from "@/lib/audit";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, staffActor } from "@/lib/actions/admin/_helpers";
import { SETTING_KEYS } from "@/components/admin/settings-meta";

export async function updateSettingAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("settings");
  if (!guard.ok) return fail(guard.error);

  const key = String(formData.get("key") ?? "");
  const value = String(formData.get("value") ?? "").trim();
  if (!SETTING_KEYS.includes(key)) return fail("Unknown setting key.");
  if (value.length === 0) return fail("Value cannot be empty.");
  if (value.length > 200) return fail("Value is too long.");

  const before = await getSetting(key);
  if (before === value) return succeed("No change.");

  await setSetting(key, value);
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "settings.update",
    objectType: "Setting",
    objectId: key,
    summary: `Updated setting ${key}`,
    before: { value: before },
    after: { value },
  });
  revalidatePath("/admin/settings");
  return succeed(`${key} updated.`);
}
