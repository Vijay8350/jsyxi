"use client";

import { useActionState, useState } from "react";
import { Check } from "lucide-react";
import { createWidgetAction } from "@/lib/actions/widget";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

type Template = { id: string; name: string; useCase?: string | null; industry?: string | null };

export function CreateWidgetForm({ toolKey, toolName, templates }: { toolKey: string; toolName: string; templates: Template[] }) {
  const [state, action] = useActionState(createWidgetAction, initialActionState);
  const [templateId, setTemplateId] = useState<string>("");

  return (
    <form action={action} className="space-y-6">
      {state.error && <Alert tone="error">{state.error}</Alert>}
      <input type="hidden" name="toolKey" value={toolKey} />
      <input type="hidden" name="templateId" value={templateId} />

      <Field label="Widget name" htmlFor="name" error={state.fieldErrors?.name} hint="Only you see this — name it for yourself.">
        <Input id="name" name="name" placeholder={`My ${toolName}`} defaultValue={`My ${toolName}`} required />
      </Field>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Start from a template</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <TemplateCard label="Blank" description="Start from the default configuration." selected={templateId === ""} onClick={() => setTemplateId("")} />
          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              label={t.name}
              description={[t.useCase, t.industry].filter(Boolean).join(" · ") || "Preset configuration"}
              selected={templateId === t.id}
              onClick={() => setTemplateId(t.id)}
            />
          ))}
        </div>
      </div>

      <SubmitButton pendingText="Creating…">Create &amp; open builder</SubmitButton>
    </form>
  );
}

function TemplateCard({ label, description, selected, onClick }: { label: string; description: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative rounded-xl border p-4 text-left transition",
        selected ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500" : "border-line bg-white hover:border-brand-200",
      )}
    >
      {selected && <Check className="absolute right-3 top-3 h-4 w-4 text-brand-600" />}
      <p className="font-medium text-ink">{label}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </button>
  );
}
