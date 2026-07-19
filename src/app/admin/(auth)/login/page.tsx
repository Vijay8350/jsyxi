import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { getCurrentStaff } from "@/lib/auth/current-user";
import { StaffLoginForm } from "./login-form";

export const metadata: Metadata = { title: "Staff sign in" };

export default async function StaffLoginPage() {
  if (await getCurrentStaff()) redirect("/admin");
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h1 className="text-xl font-bold text-white">jsyxi staff panel</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in with your staff credentials.</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-white p-6 shadow-xl">
          <StaffLoginForm />
        </div>
        <div className="mt-4 rounded-lg border border-dashed border-slate-700 bg-slate-800/50 p-3 text-center text-xs text-slate-400">
          <span className="font-medium text-slate-300">Dev credentials:</span> admin@jsyxi.local · jsyxi-admin
        </div>
      </div>
    </div>
  );
}
