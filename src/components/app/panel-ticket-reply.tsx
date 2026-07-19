"use client";

import { useActionState, useEffect, useRef } from "react";
import { addTicketMessageAction } from "@/lib/actions/support";
import { initialActionState } from "@/lib/actions/result";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export function TicketReplyForm({ ticketId }: { ticketId: string }) {
  const [state, action] = useActionState(addTicketMessageAction, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the box after a successful send.
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-1">
      <input type="hidden" name="ticketId" value={ticketId} />
      {state.error && <Alert tone="error" className="mb-3">{state.error}</Alert>}
      {state.ok && state.message && <Alert tone="success" className="mb-3">{state.message}</Alert>}
      <Field label="Add a reply" htmlFor="body" error={state.fieldErrors?.body}>
        <Textarea id="body" name="body" rows={4} placeholder="Type your message…" required />
      </Field>
      <SubmitButton pendingText="Sending…">Send reply</SubmitButton>
    </form>
  );
}
