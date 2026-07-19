"use client";

import { useActionState } from "react";
import { updateSettingAction } from "@/lib/actions/admin/settings";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Badge } from "@/components/ui/badge";

export function SettingRow({
  settingKey,
  label,
  value,
  hint,
  later,
}: {
  settingKey: string;
  label: string;
  value: string;
  hint?: string;
  later?: boolean;
}) {
  const [state, action] = useActionState(updateSettingAction, initialActionState);
  return (
    <form action={action} className="flex flex-wrap items-end gap-3 border-b border-line px-4 py-3 last:border-0">
      <input type="hidden" name="key" value={settingKey} />
      <div className="min-w-48 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink">{label}</span>
          {later && <Badge tone="slate">[LATER]</Badge>}
        </div>
        <span className="font-mono text-xs text-slate-400">{settingKey}</span>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
      <Input name="value" defaultValue={value} className="w-48" aria-label={label} />
      <SubmitButton size="sm" variant="secondary" pendingText="Saving…">Save</SubmitButton>
      {state.error && <span className="w-full text-xs text-red-600">{state.error}</span>}
      {state.ok && state.message && <span className="w-full text-xs text-emerald-600">{state.message}</span>}
    </form>
  );
}
