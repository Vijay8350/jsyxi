"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitLeadAction } from "@/lib/actions/lead";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

type LeadSourceValue = "quote" | "consultation" | "chat" | "whatsapp" | "lead_magnet";

/** Compact, reusable public lead form (source/topic fixed by the caller). */
export function LeadForm({
  source = "quote",
  serviceTopic,
  submitLabel = "Submit",
  pendingText = "Sending…",
  showPhone = true,
  showMessage = true,
  messageLabel = "Message",
  messagePlaceholder = "How can we help?",
  successTitle = "Thank you!",
}: {
  source?: LeadSourceValue;
  serviceTopic?: string;
  submitLabel?: string;
  pendingText?: string;
  showPhone?: boolean;
  showMessage?: boolean;
  messageLabel?: string;
  messagePlaceholder?: string;
  successTitle?: string;
}) {
  const [state, action] = useActionState(submitLeadAction, initialActionState);
  const [requestKey, setRequestKey] = useState("");

  useEffect(() => {
    setRequestKey(crypto.randomUUID());
  }, []);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="mt-3 text-lg font-bold text-ink">{successTitle}</h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-600">
          {state.message ?? "We've received your details and will be in touch soon."}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-1">
      <input type="hidden" name="requestKey" value={requestKey} />
      <input type="hidden" name="source" value={source} />
      {serviceTopic && <input type="hidden" name="serviceTopic" value={serviceTopic} />}
      <input type="hidden" name="scheduledSlot" value="" />

      {state.error && (
        <Alert tone="error" className="mb-4">
          {state.error}
        </Alert>
      )}

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor="lf-name" error={state.fieldErrors?.name}>
          <Input id="lf-name" name="name" autoComplete="name" placeholder="Asha Rao" required />
        </Field>
        <Field label="Email" htmlFor="lf-email" error={state.fieldErrors?.email}>
          <Input id="lf-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </Field>
      </div>

      {showPhone && (
        <Field label="Phone (optional)" htmlFor="lf-phone" error={state.fieldErrors?.phone}>
          <Input id="lf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
        </Field>
      )}

      {showMessage && (
        <Field label={messageLabel} htmlFor="lf-message" error={state.fieldErrors?.message}>
          <Textarea id="lf-message" name="message" placeholder={messagePlaceholder} />
        </Field>
      )}

      <SubmitButton className="mt-2 w-full" pendingText={pendingText}>
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
