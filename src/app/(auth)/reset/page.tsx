import Link from "next/link";
import type { Metadata } from "next";
import { Alert } from "@/components/ui/misc";
import { ResetForm } from "./reset-form";

export const metadata: Metadata = { title: "Set a new password" };

export default async function ResetPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Set a new password</h1>
      <p className="mt-1 text-sm text-slate-500">Choose a strong password for your account.</p>
      <div className="mt-6">
        {token ? (
          <ResetForm token={token} />
        ) : (
          <Alert tone="error" title="Missing token">
            This link is invalid. <Link href="/forgot" className="font-medium underline">Request a new one</Link>.
          </Alert>
        )}
      </div>
    </div>
  );
}
