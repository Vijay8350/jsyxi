"use client";

import { useActionState } from "react";
import { createTicketAction } from "@/lib/actions/support";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export function NewTicketForm() {
  const [state, action] = useActionState(createTicketAction, initialActionState);
  return (
    <form action={action} className="space-y-1">
      {state.error && <Alert tone="error" className="mb-4">{state.error}</Alert>}
      <Field label="Subject" htmlFor="subject" error={state.fieldErrors?.subject}>
        <Input id="subject" name="subject" placeholder="Briefly, what do you need help with?" required />
      </Field>
      <Field label="Describe your issue" htmlFor="body" error={state.fieldErrors?.body}>
        <Textarea id="body" name="body" rows={5} placeholder="Share the details so we can help faster." required />
      </Field>
      <SubmitButton pendingText="Creating…">Create ticket</SubmitButton>
    </form>
  );
}
