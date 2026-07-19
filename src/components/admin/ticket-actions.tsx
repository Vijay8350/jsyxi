"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { replyTicketAction, resolveTicketAction } from "@/lib/actions/admin/tickets";
import { initialActionState } from "@/lib/actions/result";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export function TicketReplyForm({ ticketId, disabled }: { ticketId: string; disabled?: boolean }) {
  const [state, action] = useActionState(replyTicketAction, initialActionState);
  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="ticketId" value={ticketId} />
      {state.error && <Alert tone="error">{state.error}</Alert>}
      {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
      <Textarea name="body" placeholder="Write a reply to the customer…" required disabled={disabled} />
      {state.fieldErrors?.body && <p className="text-xs text-red-600">{state.fieldErrors.body}</p>}
      <SubmitButton pendingText="Sending…" disabled={disabled}>Send reply</SubmitButton>
      {disabled && <p className="text-xs text-slate-400">This ticket is resolved.</p>}
    </form>
  );
}

export function TicketResolveButton({ ticketId }: { ticketId: string }) {
  const [state, action] = useActionState(resolveTicketAction, initialActionState);
  return (
    <form action={action}>
      <input type="hidden" name="ticketId" value={ticketId} />
      {state.error && <Alert tone="error" className="mb-2">{state.error}</Alert>}
      <SubmitButton variant="accent" pendingText="Resolving…">
        <CheckCircle2 className="h-4 w-4" /> Resolve ticket
      </SubmitButton>
    </form>
  );
}
