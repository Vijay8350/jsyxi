import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { sha256hex } from "@/lib/crypto";
import { Alert } from "@/components/ui/misc";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Verify email" };

async function consume(token: string): Promise<"ok" | "invalid"> {
  const rec = await prisma.verificationToken.findUnique({ where: { hashed: sha256hex(token) } });
  if (!rec || rec.purpose !== "email_verify" || rec.consumedAt || rec.expiresAt < new Date()) return "invalid";
  await prisma.$transaction([
    prisma.user.update({ where: { id: rec.userId }, data: { emailVerifiedAt: new Date(), status: "active" } }),
    prisma.verificationToken.update({ where: { id: rec.id }, data: { consumedAt: new Date() } }),
  ]);
  return "ok";
}

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const result = token ? await consume(token) : "invalid";
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Email verification</h1>
      <div className="mt-6">
        {result === "ok" ? (
          <Alert tone="success" title="You're verified!">Your email address has been confirmed.</Alert>
        ) : (
          <Alert tone="error" title="Link invalid or expired">
            This verification link is no longer valid. You can request a new one from your profile.
          </Alert>
        )}
      </div>
      <div className="mt-6 flex gap-2">
        <ButtonLink href="/app">Go to dashboard</ButtonLink>
        <Link href="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-ink px-3">Log in</Link>
      </div>
    </div>
  );
}
