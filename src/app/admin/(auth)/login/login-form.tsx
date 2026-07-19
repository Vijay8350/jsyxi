"use client";

import { useActionState } from "react";
import { staffLoginAction } from "@/lib/actions/staff-auth";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export function StaffLoginForm() {
  const [state, action] = useActionState(staffLoginAction, initialActionState);
  return (
    <form action={action} className="space-y-1">
      {state.error && <Alert tone="error" className="mb-4">{state.error}</Alert>}
      <Field label="Work email" htmlFor="email" error={state.fieldErrors?.email}>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@jsyxi.local" required />
      </Field>
      <Field label="Password" htmlFor="password" error={state.fieldErrors?.password}>
        <Input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required />
      </Field>
      <SubmitButton className="mt-2 w-full" pendingText="Signing in…">Sign in</SubmitButton>
    </form>
  );
}
