"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestResetAction } from "@/lib/actions/auth";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export default function ForgotPage() {
  const [state, action] = useActionState(requestResetAction, initialActionState);
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Reset your password</h1>
      <p className="mt-1 text-sm text-slate-500">We&apos;ll email you a link to set a new password.</p>
      <div className="mt-6">
        {state.ok ? (
          <Alert tone="success" title="Check your inbox">{state.message}</Alert>
        ) : (
          <form action={action} className="space-y-1">
            {state.error && <Alert tone="error" className="mb-4">{state.error}</Alert>}
            <Field label="Email" htmlFor="email" error={state.fieldErrors?.email}>
              <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </Field>
            <SubmitButton className="w-full" pendingText="Sending…">Send reset link</SubmitButton>
          </form>
        )}
      </div>
      <p className="mt-6 text-sm text-slate-500">
        <Link href="/login" className="font-medium text-brand-600 hover:text-brand-700">← Back to log in</Link>
      </p>
    </div>
  );
}
