import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { requireWorkspaceContext, listUserWorkspaces } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { getWorkspaceUsage } from "@/lib/metering";
import { AppShell } from "@/components/app/app-shell";
import { SidebarNav, WorkspaceSwitcher, UserMenu } from "@/components/app/app-nav";
import { ButtonLink } from "@/components/ui/button";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const ctx = await requireWorkspaceContext();
  const [wsList, unread, usage] = await Promise.all([
    listUserWorkspaces(ctx.user.id),
    prisma.notification.count({ where: { recipientUserId: ctx.user.id, readAt: null } }),
    getWorkspaceUsage(ctx.workspace.id),
  ]);

  const workspaces = wsList.map((w) => ({ id: w.workspace.id, name: w.workspace.name, planName: w.workspace.plan.name }));
  const current = { id: ctx.workspace.id, name: ctx.workspace.name, planName: ctx.plan.name };

  const sidebar = (
    <div className="flex h-full flex-col">
      <WorkspaceSwitcher workspaces={workspaces} current={current} />
      <div className="mt-4 flex-1">
        <SidebarNav unread={unread} />
      </div>
      {ctx.plan.isFree && (
        <div className="m-3 rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-sm font-semibold text-brand-800">On the Free plan</p>
          <p className="mt-1 text-xs text-brand-700">Remove branding and unlock more widgets &amp; views.</p>
          <ButtonLink href="/app/subscription" size="sm" className="mt-3 w-full">Upgrade</ButtonLink>
        </div>
      )}
    </div>
  );

  return (
    <AppShell sidebar={sidebar} headerRight={<UserMenu name={ctx.user.name} email={ctx.user.email} />}>
      {usage.overLimit && (
        <div className="mb-6 flex flex-col gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 sm:flex-row sm:items-center">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span className="flex-1">
            You&apos;ve used <strong>{usage.used.toLocaleString("en-IN")}</strong> of your{" "}
            <strong>{usage.limit.toLocaleString("en-IN")}</strong> monthly views. Your widgets keep running, but
            branding is now shown. Upgrade for more headroom.
          </span>
          <Link href="/app/subscription" className="font-semibold underline">View plans</Link>
        </div>
      )}
      {children}
    </AppShell>
  );
}
