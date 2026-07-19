import type { Metadata } from "next";
import { Gift, Users, Ticket as TicketIcon, Tag } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, EmptyState } from "@/components/ui/misc";
import { ReferralLink } from "@/components/app/panel-referral";

export const metadata: Metadata = { title: "Deals & Referrals" };

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

function rewardText(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "string" || typeof v === "number") return String(v);
  return JSON.stringify(v);
}

export default async function DealsPage() {
  const ctx = await requireWorkspaceContext();

  const [program, coupons] = await Promise.all([
    prisma.incentiveProgram.findFirst({ where: { kind: "referral" } }),
    prisma.coupon.findMany({ where: { status: "active" }, orderBy: { createdAt: "desc" } }),
  ]);

  const referralLink = `${APP_URL}/signup?ref=${ctx.workspace.slug}`;
  const rules = (program?.rules ?? {}) as Record<string, unknown>;
  const referrerReward = rewardText(rules.referrerReward);
  const friendReward = rewardText(rules.friendReward);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">Deals &amp; Referrals</h1>
        <p className="mt-1 text-sm text-slate-500">Share jsyxi and unlock rewards for you and your friends.</p>
      </div>

      {/* Refer a friend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4 text-brand-600" /> Refer a friend</CardTitle>
          <CardDescription>{program ? program.name : "Share your link — both of you get rewarded when they join."}</CardDescription>
        </CardHeader>
        <CardBody className="space-y-4 pt-0">
          <ReferralLink link={referralLink} />

          {(referrerReward || friendReward) && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-brand-100 bg-brand-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">You get</p>
                <p className="mt-1 text-sm text-brand-900">{referrerReward ?? "A reward when your friend signs up."}</p>
              </div>
              <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Your friend gets</p>
                <p className="mt-1 text-sm text-emerald-900">{friendReward ?? "A welcome reward on their first plan."}</p>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-400">Rewards are reviewed and applied by our team after a successful referral.</p>
        </CardBody>
      </Card>

      {/* Coupons */}
      <div>
        <div className="flex items-center gap-2">
          <TicketIcon className="h-5 w-5 text-brand-600" />
          <h2 className="text-lg font-semibold text-ink">Available coupons</h2>
        </div>
        <p className="mt-1 text-sm text-slate-500">Active offers on your account.</p>

        <div className="mt-4">
          {coupons.length === 0 ? (
            <Card>
              <CardBody>
                <EmptyState icon={<Gift className="h-6 w-6" />} title="No coupons right now" description="Active promotions and referral coupons will show up here." />
              </CardBody>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {coupons.map((c) => {
                const value = c.valueKind === "amount" ? formatMoney(c.value) : `${c.value / 100}% off`;
                return (
                  <div key={c.id} className="rounded-xl border border-dashed border-brand-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold tracking-wider text-brand-700">
                        <Tag className="h-4 w-4" /> {c.code}
                      </span>
                      <Badge tone={c.type === "refer_a_friend" ? "green" : "amber"}>
                        {c.type === "refer_a_friend" ? "Referral" : "Promo"}
                      </Badge>
                    </div>
                    <p className="mt-3 text-lg font-semibold text-ink">{value}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Alert tone="info">Coupons and referral rewards are applied to your account by our team (no self-serve redemption yet).</Alert>
    </div>
  );
}
