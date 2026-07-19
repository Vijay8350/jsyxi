"use client";

import { useState, useTransition } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import {
  updateProfileAction,
  changePasswordAction,
  beginEnable2FA,
  confirmEnable2FA,
  disable2FAAction,
  deleteAccountAction,
} from "@/lib/actions/profile";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";
import { Badge } from "@/components/ui/badge";

// ── (a) Profile name ──────────────────────────────────────────────────────────
export function ProfileNameForm({ name, email }: { name: string; email: string }) {
  const [state, action] = useActionState(updateProfileAction, initialActionState);
  return (
    <form action={action} className="space-y-1">
      {state.error && <Alert tone="error" className="mb-4">{state.error}</Alert>}
      {state.ok && state.message && <Alert tone="success" className="mb-4">{state.message}</Alert>}
      <Field label="Full name" htmlFor="name" error={state.fieldErrors?.name}>
        <Input id="name" name="name" defaultValue={name} required />
      </Field>
      <Field label="Email">
        <Input value={email} disabled readOnly />
      </Field>
      <SubmitButton pendingText="Saving…">Save changes</SubmitButton>
    </form>
  );
}

// ── (b) Change password ───────────────────────────────────────────────────────
export function PasswordForm() {
  const [state, action] = useActionState(changePasswordAction, initialActionState);
  return (
    <form action={action} className="space-y-1">
      {state.error && <Alert tone="error" className="mb-4">{state.error}</Alert>}
      {state.ok && state.message && <Alert tone="success" className="mb-4">{state.message}</Alert>}
      <Field label="Current password" htmlFor="currentPassword" error={state.fieldErrors?.currentPassword}>
        <Input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required />
      </Field>
      <Field label="New password" htmlFor="newPassword" error={state.fieldErrors?.newPassword}>
        <Input id="newPassword" name="newPassword" type="password" autoComplete="new-password" required />
      </Field>
      <SubmitButton pendingText="Updating…">Change password</SubmitButton>
    </form>
  );
}

// ── (c) Two-factor ────────────────────────────────────────────────────────────
type Setup = { uri: string; qr: string; encrypted: string };

export function TwoFactorPanel({ enabled: initialEnabled }: { enabled: boolean }) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(initialEnabled);
  const [setup, setSetup] = useState<Setup | null>(null);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  const begin = () => {
    setMsg(null);
    start(async () => {
      const res = await beginEnable2FA();
      if (res.ok) setSetup({ uri: res.uri, qr: res.qr, encrypted: res.encrypted });
      else setMsg({ ok: false, text: res.error });
    });
  };

  const confirm = () => {
    if (!setup) return;
    start(async () => {
      const res = await confirmEnable2FA(setup.encrypted, code);
      if (res.ok) {
        setEnabled(true);
        setSetup(null);
        setCode("");
        setMsg({ ok: true, text: res.message ?? "Two-factor enabled." });
        router.refresh();
      } else {
        setMsg({ ok: false, text: res.error ?? "That code is incorrect." });
      }
    });
  };

  const disable = () => {
    start(async () => {
      const res = await disable2FAAction(code);
      if (res.ok) {
        setEnabled(false);
        setCode("");
        setMsg({ ok: true, text: res.message ?? "Two-factor disabled." });
        router.refresh();
      } else {
        setMsg({ ok: false, text: res.error ?? "That code is incorrect." });
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {enabled ? (
          <Badge tone="green"><ShieldCheck className="h-3.5 w-3.5" /> Enabled</Badge>
        ) : (
          <Badge tone="slate"><ShieldOff className="h-3.5 w-3.5" /> Not enabled</Badge>
        )}
        <p className="text-sm text-slate-500">Protect your account with an authenticator app.</p>
      </div>

      {msg && <Alert tone={msg.ok ? "success" : "error"}>{msg.text}</Alert>}

      {enabled ? (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">Enter a current 6-digit code to turn off two-factor authentication.</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="sm:w-40"
            />
            <Button variant="outlineDanger" onClick={disable} disabled={pending || code.length !== 6}>
              Disable 2FA
            </Button>
          </div>
        </div>
      ) : setup ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Scan this QR code with your authenticator app, then enter the 6-digit code to confirm.</p>
          <div className="inline-block rounded-xl border border-line bg-white p-3">
            {/* data-URL QR from the server */}
            <Image src={setup.qr} alt="Two-factor QR code" width={200} height={200} unoptimized className="h-48 w-48" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="sm:w-40"
            />
            <Button onClick={confirm} disabled={pending || code.length !== 6}>Verify &amp; enable</Button>
            <Button variant="ghost" onClick={() => { setSetup(null); setCode(""); setMsg(null); }} disabled={pending}>Cancel</Button>
          </div>
        </div>
      ) : (
        <Button onClick={begin} disabled={pending}>{pending ? "Preparing…" : "Enable 2FA"}</Button>
      )}
    </div>
  );
}

// ── (d) Delete account ────────────────────────────────────────────────────────
export function DeleteAccountForm() {
  const [state, action] = useActionState(deleteAccountAction, initialActionState);
  return (
    <form action={action} className="space-y-3">
      {state.error && <Alert tone="error">{state.error}</Alert>}
      <p className="text-sm text-slate-600">
        This deactivates your account and soft-deletes the workspaces you own. This can only be undone by contacting support within the recovery window.
      </p>
      <Field label={'Type "DELETE" to confirm'} htmlFor="confirm" error={state.fieldErrors?.confirm}>
        <Input id="confirm" name="confirm" placeholder="DELETE" autoComplete="off" className="sm:w-56" />
      </Field>
      <SubmitButton variant="danger" pendingText="Deleting…"><Trash2 className="h-4 w-4" /> Delete my account</SubmitButton>
    </form>
  );
}
