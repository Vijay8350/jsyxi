import type { Metadata } from "next";
import Link from "next/link";
import { LifeBuoy, ArrowRight, MessageSquare } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { NewTicketForm } from "@/components/app/panel-new-ticket";
import type { TicketState } from "@/generated/prisma";

export const metadata: Metadata = { title: "Support" };

const stateMeta: Record<TicketState, { label: string; tone: "amber" | "green" | "slate" | "blue" }> = {
  open: { label: "Open", tone: "amber" },
  pending: { label: "Pending", tone: "blue" },
  resolved: { label: "Resolved", tone: "green" },
  closed: { label: "Closed", tone: "slate" },
};

export default async function SupportPage() {
  const ctx = await requireWorkspaceContext();

  const tickets = await prisma.ticket.findMany({
    where: { workspaceId: ctx.workspace.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { messages: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Support</h1>
        <p className="mt-1 text-sm text-slate-500">Open a ticket and our team will get back to you.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your tickets</CardTitle>
              <CardDescription>{tickets.length} ticket{tickets.length === 1 ? "" : "s"}</CardDescription>
            </CardHeader>
            <CardBody className="pt-0">
              {tickets.length === 0 ? (
                <EmptyState icon={<LifeBuoy className="h-6 w-6" />} title="No tickets yet" description="Have a question or issue? Create your first ticket." />
              ) : (
                <ul className="divide-y divide-line">
                  {tickets.map((t) => {
                    const s = stateMeta[t.state];
                    return (
                      <li key={t.id}>
                        <Link href={`/app/support/${t.id}`} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-slate-50">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <MessageSquare className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-ink">{t.subject}</span>
                            <span className="block text-xs text-slate-500">
                              {formatInTz(t.createdAt, ctx.workspace.timezone, "dd LLL yyyy")} · {t._count.messages} repl{t._count.messages === 1 ? "y" : "ies"}
                            </span>
                          </span>
                          <Badge tone={s.tone}>{s.label}</Badge>
                          <ArrowRight className="h-4 w-4 text-slate-300" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>New ticket</CardTitle>
              <CardDescription>We typically reply within one business day.</CardDescription>
            </CardHeader>
            <CardBody className="pt-0">
              <NewTicketForm />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
