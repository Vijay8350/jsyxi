import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/misc";
import { TicketReplyForm } from "@/components/app/panel-ticket-reply";
import { cn } from "@/lib/utils";
import type { TicketState } from "@/generated/prisma";

export const metadata: Metadata = { title: "Ticket" };

const stateMeta: Record<TicketState, { label: string; tone: "amber" | "green" | "slate" | "blue" }> = {
  open: { label: "Open", tone: "amber" },
  pending: { label: "Pending", tone: "blue" },
  resolved: { label: "Resolved", tone: "green" },
  closed: { label: "Closed", tone: "slate" },
};

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const ctx = await requireWorkspaceContext();
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!ticket || ticket.workspaceId !== ctx.workspace.id) notFound();

  const s = stateMeta[ticket.state];
  const closed = ticket.state === "resolved" || ticket.state === "closed";
  const tz = ctx.workspace.timezone;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/app/support" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to support
      </Link>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div>
            <CardTitle>{ticket.subject}</CardTitle>
            <p className="mt-1 text-xs text-slate-500">Opened {formatInTz(ticket.createdAt, tz, "dd LLL yyyy, HH:mm")}</p>
          </div>
          <Badge tone={s.tone}>{s.label}</Badge>
        </CardHeader>
        <CardBody className="pt-0">
          {/* Opening message */}
          <div className="rounded-lg border border-line bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">You</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{ticket.body}</p>
          </div>

          {/* Thread */}
          {ticket.messages.length > 0 && (
            <div className="mt-4 space-y-3">
              {ticket.messages.map((m) => {
                const fromStaff = !!m.authorStaffId;
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "rounded-lg border p-4",
                      fromStaff ? "border-brand-100 bg-brand-50" : "border-line bg-white",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className={cn("text-xs font-semibold", fromStaff ? "text-brand-700" : "text-slate-500")}>
                        {fromStaff ? "Support" : "You"}
                      </p>
                      <p className="text-xs text-slate-400">{formatInTz(m.createdAt, tz, "dd LLL, HH:mm")}</p>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{m.body}</p>
                  </div>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>

      {closed ? (
        <Alert tone="success">This ticket is resolved. If you still need help, please open a new ticket.</Alert>
      ) : (
        <Card>
          <CardBody>
            <TicketReplyForm ticketId={ticket.id} />
          </CardBody>
        </Card>
      )}
    </div>
  );
}
