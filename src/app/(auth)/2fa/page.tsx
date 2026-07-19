"use client";

import { useActionState } from "react";
import { verifyTwoFactorLoginAction } from "@/lib/actions/auth";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export default function TwoFactorPage() {
  const [state, action] = useActionState(verifyTwoFactorLoginAction, initialActionState);
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Two-factor verification</h1>
      <p className="mt-1 text-sm text-slate-500">Enter the 6-digit code from your authenticator app.</p>
      <div className="mt-6">
        <form action={action} className="space-y-1">
          {state.error && <Alert tone="error" className="mb-4">{state.error}</Alert>}
          <Field label="Authentication code" htmlFor="code" error={state.fieldErrors?.code}>
            <Input
              id="code" name="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6}
              placeholder="123456" className="text-center text-lg tracking-[0.4em]" required
            />
          </Field>
          <SubmitButton className="w-full" pendingText="Verifying…">Verify &amp; continue</SubmitButton>
        </form>
      </div>
    </div>
  );
}
