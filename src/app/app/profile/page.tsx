import type { Metadata } from "next";
import { User as UserIcon, Lock, ShieldCheck, AlertTriangle } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ProfileNameForm,
  PasswordForm,
  TwoFactorPanel,
  DeleteAccountForm,
} from "@/components/app/panel-profile";

export const metadata: Metadata = { title: "Profile & Security" };

export default async function ProfilePage() {
  const ctx = await requireWorkspaceContext();
  const twoFactorEnabled = ctx.user.twoFactorEnabledAt !== null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Profile &amp; security</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your personal details and account security.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserIcon className="h-4 w-4 text-brand-600" /> Profile</CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <ProfileNameForm name={ctx.user.name} email={ctx.user.email} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock className="h-4 w-4 text-brand-600" /> Password</CardTitle>
          <CardDescription>Use at least 8 characters.</CardDescription>
        </CardHeader>
        <CardBody className="pt-0">
          <PasswordForm />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-600" /> Two-factor authentication</CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <TwoFactorPanel enabled={twoFactorEnabled} />
        </CardBody>
      </Card>

      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700"><AlertTriangle className="h-4 w-4" /> Delete account</CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <DeleteAccountForm />
        </CardBody>
      </Card>
    </div>
  );
}
