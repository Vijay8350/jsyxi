import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/app");
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-500">Log in to your jsyxi account.</p>
      <div className="mt-6">
        <LoginForm />
      </div>
      <p className="mt-6 text-sm text-slate-500">
        New to jsyxi?{" "}
        <Link href="/signup" className="font-medium text-brand-600 hover:text-brand-700">Create an account</Link>
      </p>
      <div className="mt-6 rounded-lg border border-dashed border-line bg-slate-50 p-3 text-xs text-slate-500">
        <span className="font-medium text-slate-600">Demo login:</span> demo@jsyxi.local · jsyxi-demo
      </div>
    </div>
  );
}
