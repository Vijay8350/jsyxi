import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Check, CheckCheck } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import { markAllReadAction, markReadAction } from "@/lib/actions/notifications";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const ctx = await requireWorkspaceContext();

  const notifications = await prisma.notification.findMany({
    where: { recipientUserId: ctx.user.id },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  const unreadCount = notifications.filter((n) => n.readAt === null).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">
            {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up."}
          </p>
        </div>
        {unreadCount > 0 && (
          <form action={markAllReadAction}>
            <Button type="submit" variant="secondary" size="sm">
              <CheckCheck className="h-4 w-4" /> Mark all read
            </Button>
          </form>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={<Bell className="h-6 w-6" />} title="No notifications" description="Updates about your account and widgets will show up here." />
      ) : (
        <Card>
          <CardBody className="p-0">
            <ul className="divide-y divide-line">
              {notifications.map((n) => {
                const unread = n.readAt === null;
                return (
                  <li key={n.id} className={cn("flex gap-3 px-5 py-4", unread && "bg-brand-50/40")}>
                    <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", unread ? "bg-brand-600" : "bg-transparent")} aria-hidden />
                    <div className="min-w-0 flex-1">
                      {n.subject && <p className={cn("text-sm", unread ? "font-semibold text-ink" : "font-medium text-slate-700")}>{n.subject}</p>}
                      <p className={cn("text-sm", n.subject ? "mt-0.5 text-slate-500" : unread ? "font-medium text-ink" : "text-slate-600")}>{n.body}</p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <span className="text-xs text-slate-400">{formatInTz(n.createdAt, ctx.workspace.timezone, "dd LLL yyyy, HH:mm")}</span>
                        {n.linkHref && (
                          <Link href={n.linkHref} className="text-xs font-medium text-brand-600 hover:text-brand-700">View</Link>
                        )}
                      </div>
                    </div>
                    {unread && (
                      <form action={markReadAction.bind(null, n.id)} className="shrink-0">
                        <button type="submit" className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600" aria-label="Mark as read" title="Mark as read">
                          <Check className="h-4 w-4" />
                        </button>
                      </form>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
