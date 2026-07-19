"use client";

import { useActionState } from "react";
import { UserPlus } from "lucide-react";
import { createStaffAction, toggleStaffStatusAction } from "@/lib/actions/admin/roles";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

const ROLES: { value: string; label: string }[] = [
  { value: "owner_admin", label: "Owner / Admin" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "content", label: "Content" },
  { value: "finance", label: "Finance" },
];

export function CreateStaffForm() {
  const [state, action] = useActionState(createStaffAction, initialActionState);
  return (
    <form action={action} className="space-y-1">
      {state.error && <Alert tone="error" className="mb-3">{state.error}</Alert>}
      {state.ok && state.message && <Alert tone="success" className="mb-3">{state.message}</Alert>}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" htmlFor="s-name" error={state.fieldErrors?.name}>
          <Input id="s-name" name="name" required />
        </Field>
        <Field label="Email" htmlFor="s-email" error={state.fieldErrors?.email}>
          <Input id="s-email" name="email" type="email" required />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Role" htmlFor="s-role">
          <Select id="s-role" name="staffRole" defaultValue="support">
            {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </Select>
        </Field>
        <Field label="Temporary password" htmlFor="s-pw" error={state.fieldErrors?.password} hint="Min 8 characters">
          <Input id="s-pw" name="password" type="text" required />
        </Field>
      </div>
      <SubmitButton pendingText="Creating…"><UserPlus className="h-4 w-4" /> Create staff</SubmitButton>
    </form>
  );
}

export function StaffStatusToggle({ staffId, active, disabled }: { staffId: string; active: boolean; disabled?: boolean }) {
  const [state, action] = useActionState(toggleStaffStatusAction, initialActionState);
  return (
    <form action={action} className="inline">
      <input type="hidden" name="staffId" value={staffId} />
      <SubmitButton size="sm" variant={active ? "outlineDanger" : "secondary"} pendingText="…" disabled={disabled}>
        {active ? "Disable" : "Enable"}
      </SubmitButton>
      {state.error && <span className="ml-2 text-xs text-red-600">{state.error}</span>}
    </form>
  );
}
