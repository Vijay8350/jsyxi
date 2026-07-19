import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import { cn } from "@/lib/utils";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, AccessDenied } from "@/components/admin/ui";
import { TicketReplyForm, TicketResolveButton } from "@/components/admin/ticket-actions";

export const metadata: Metadata = { title: "Ticket" };

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "tickets")) return <AccessDenied section="tickets" />;

  const { id } = await params;
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      workspace: { include: { owner: true } },
      messages: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!ticket) notFound();

  const staffIds = ticket.messages.map((m) => m.authorStaffId).filter((x): x is string => !!x);
  const authors = staffIds.length ? await prisma.staffUser.findMany({ where: { id: { in: staffIds } } }) : [];
  const authorName = new Map(authors.map((a) => [a.id, a.name]));
  const isResolved = ticket.state === "resolved";

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/tickets" className="mb-3 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Tickets
        </Link>
        <PageHeader
          title={ticket.subject}
          description={`${ticket.workspace.name} · ${ticket.workspace.owner.email}`}
          actions={<Badge tone={isResolved ? "green" : "amber"}>{ticket.state}</Badge>}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Conversation</CardTitle></CardHeader>
            <CardBody className="space-y-4 pt-0">
              <div className="rounded-lg border border-line bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">
                  {ticket.workspace.owner.name} (customer) · {formatInTz(ticket.createdAt, ticket.workspace.timezone)}
                </p>
                <p className="mt-1 text-sm text-slate-700">{ticket.body}</p>
              </div>
              {ticket.messages.map((m) => {
                const fromStaff = !!m.authorStaffId;
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "rounded-lg border p-3",
                      fromStaff ? "border-brand-100 bg-brand-50" : "border-line bg-slate-50",
                    )}
                  >
                    <p className="text-xs font-medium text-slate-500">
                      {fromStaff ? `${authorName.get(m.authorStaffId!) ?? "Staff"} (staff)` : `${ticket.workspace.owner.name} (customer)`}
                      {" · "}{formatInTz(m.createdAt, ticket.workspace.timezone)}
                    </p>
                    <p className="mt-1 text-sm text-slate-700">{m.body}</p>
                  </div>
                );
              })}
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>Reply</CardTitle></CardHeader>
            <CardBody className="pt-0">
              <TicketReplyForm ticketId={ticket.id} disabled={isResolved} />
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardBody className="pt-0">
              {isResolved ? (
                <p className="text-sm text-slate-500">
                  Resolved {ticket.resolvedAt ? formatInTz(ticket.resolvedAt, ticket.workspace.timezone) : ""}.
                </p>
              ) : (
                <TicketResolveButton ticketId={ticket.id} />
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
