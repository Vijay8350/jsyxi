"use client";

import { useActionState } from "react";
import { signupAction } from "@/lib/actions/auth";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export function SignupForm({ defaultWorkspace }: { defaultWorkspace?: string }) {
  const [state, action] = useActionState(signupAction, initialActionState);
  return (
    <form action={action} className="space-y-1">
      {state.error && <Alert tone="error" className="mb-4">{state.error}</Alert>}
      <Field label="Your name" htmlFor="name" error={state.fieldErrors?.name}>
        <Input id="name" name="name" autoComplete="name" placeholder="Asha Rao" required />
      </Field>
      <Field label="Work email" htmlFor="email" error={state.fieldErrors?.email}>
        <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </Field>
      <Field label="Password" htmlFor="password" error={state.fieldErrors?.password} hint="At least 8 characters.">
        <Input id="password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" required />
      </Field>
      <Field label="Workspace name" htmlFor="workspaceName" error={state.fieldErrors?.workspaceName} hint="You can change this later.">
        <Input id="workspaceName" name="workspaceName" placeholder="My Store" defaultValue={defaultWorkspace} />
      </Field>
      <SubmitButton className="w-full" pendingText="Creating account…">Create free account</SubmitButton>
      <p className="mt-3 text-center text-xs text-slate-400">
        By signing up you agree to our Terms and Privacy Policy.
      </p>
    </form>
  );
}
