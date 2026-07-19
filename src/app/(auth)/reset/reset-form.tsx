"use client";

import Link from "next/link";
import { useActionState } from "react";
import { resetPasswordAction } from "@/lib/actions/auth";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export function ResetForm({ token }: { token: string }) {
  const [state, action] = useActionState(resetPasswordAction, initialActionState);
  if (state.ok) {
    return (
      <Alert tone="success" title="Password updated">
        {state.message} <Link href="/login" className="font-medium underline">Log in</Link>
      </Alert>
    );
  }
  return (
    <form action={action} className="space-y-1">
      {state.error && <Alert tone="error" className="mb-4">{state.error}</Alert>}
      <input type="hidden" name="token" value={token} />
      <Field label="New password" htmlFor="password" error={state.fieldErrors?.password} hint="At least 8 characters.">
        <Input id="password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" required />
      </Field>
      <SubmitButton className="w-full" pendingText="Updating…">Set new password</SubmitButton>
    </form>
  );
}
