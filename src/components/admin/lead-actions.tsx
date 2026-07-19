"use client";

import { useActionState } from "react";
import { updateLeadStageAction, assignLeadAction, addLeadNoteAction } from "@/lib/actions/admin/leads";
import { initialActionState } from "@/lib/actions/result";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";
import type { LeadStage } from "@/generated/prisma";
import { LEAD_STAGE_LABEL } from "@/components/admin/lead-meta";

export function LeadStageActions({ leadId, nextStages }: { leadId: string; nextStages: LeadStage[] }) {
  const [state, action] = useActionState(updateLeadStageAction, initialActionState);
  if (nextStages.length === 0) {
    return <p className="text-sm text-slate-400">This lead is closed — no further stage changes.</p>;
  }
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="leadId" value={leadId} />
      {state.error && <Alert tone="error">{state.error}</Alert>}
      {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
      {nextStages.includes("lost") && (
        <Field label="Reason (required to mark Lost)" htmlFor={`reason-${leadId}`}>
          <Textarea id={`reason-${leadId}`} name="lostReason" placeholder="Why was this lead lost?" className="min-h-16" />
        </Field>
      )}
      <div className="flex flex-wrap gap-2">
        {nextStages.map((s) => (
          <SubmitButton
            key={s}
            name="stage"
            value={s}
            size="sm"
            variant={s === "lost" ? "outlineDanger" : s === "won" ? "accent" : "primary"}
            pendingText="Saving…"
          >
            Mark {LEAD_STAGE_LABEL[s]}
          </SubmitButton>
        ))}
      </div>
    </form>
  );
}

export function LeadAssignForm({
  leadId,
  currentAssigneeId,
  staffOptions,
}: {
  leadId: string;
  currentAssigneeId: string | null;
  staffOptions: { id: string; name: string; roleLabel: string }[];
}) {
  const [state, action] = useActionState(assignLeadAction, initialActionState);
  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="leadId" value={leadId} />
      {state.error && <Alert tone="error">{state.error}</Alert>}
      {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
      <div className="flex gap-2">
        <Select name="assignedUserId" defaultValue={currentAssigneeId ?? ""}>
          <option value="">Unassigned</option>
          {staffOptions.map((s) => (
            <option key={s.id} value={s.id}>{s.name} ({s.roleLabel})</option>
          ))}
        </Select>
        <SubmitButton variant="secondary" pendingText="Saving…">Assign</SubmitButton>
      </div>
    </form>
  );
}

export function LeadNoteForm({ leadId }: { leadId: string }) {
  const [state, action] = useActionState(addLeadNoteAction, initialActionState);
  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="leadId" value={leadId} />
      {state.error && <Alert tone="error">{state.error}</Alert>}
      <Textarea name="body" placeholder="Add an internal note…" required />
      {state.fieldErrors?.body && <p className="text-xs text-red-600">{state.fieldErrors.body}</p>}
      <SubmitButton size="sm" pendingText="Adding…">Add note</SubmitButton>
    </form>
  );
}
