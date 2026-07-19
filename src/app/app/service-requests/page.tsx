import type { Metadata } from "next";
import { Inbox, Calendar, Mail, Phone } from "lucide-react";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, EmptyState } from "@/components/ui/misc";
import type { LeadSource, LeadStage } from "@/generated/prisma";

export const metadata: Metadata = { title: "Service Requests" };

const sourceMeta: Record<Exclude<LeadSource, "request_upgrade">, { label: string; tone: "brand" | "blue" | "amber" | "green" | "slate" }> = {
  quote: { label: "Quote request", tone: "brand" },
  consultation: { label: "Consultation", tone: "blue" },
  lead_magnet: { label: "Lead magnet", tone: "amber" },
  chat: { label: "Chat", tone: "green" },
  whatsapp: { label: "WhatsApp", tone: "green" },
};

const stageMeta: Record<LeadStage, { label: string; tone: "slate" | "blue" | "amber" | "green" | "red" }> = {
  new: { label: "New", tone: "slate" },
  contacted: { label: "Contacted", tone: "blue" },
  proposal: { label: "Proposal", tone: "amber" },
  won: { label: "Won", tone: "green" },
  lost: { label: "Lost", tone: "red" },
};

export default async function ServiceRequestsPage() {
  const ctx = await requireWorkspaceContext();

  const leads = await prisma.lead.findMany({
    where: {
      workspaceId: ctx.workspace.id,
      source: { in: ["quote", "consultation", "lead_magnet", "chat", "whatsapp"] },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Service Requests</h1>
        <p className="mt-1 text-sm text-slate-500">Enquiries and bookings captured for {ctx.workspace.name}.</p>
      </div>

      <Alert tone="info">Delivery tracking for booked services is coming soon.</Alert>

      {leads.length === 0 ? (
        <EmptyState
          icon={<Inbox className="h-6 w-6" />}
          title="No service requests yet"
          description="Quote, consultation and chat enquiries from your widgets will appear here."
        />
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => {
            const src = sourceMeta[lead.source as Exclude<LeadSource, "request_upgrade">] ?? { label: lead.source, tone: "slate" as const };
            const stage = stageMeta[lead.pipelineStage];
            return (
              <Card key={lead.id}>
                <CardBody className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={src.tone}>{src.label}</Badge>
                    <Badge tone={stage.tone}>{stage.label}</Badge>
                    {lead.serviceTopic && <span className="text-xs text-slate-400">· {lead.serviceTopic}</span>}
                    <span className="ml-auto text-xs text-slate-400">{formatInTz(lead.createdAt, ctx.workspace.timezone, "dd LLL yyyy, HH:mm")}</span>
                  </div>

                  <div>
                    <p className="font-semibold text-ink">{lead.contactName}</p>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {lead.contactEmail}</span>
                      {lead.contactPhone && <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {lead.contactPhone}</span>}
                    </div>
                  </div>

                  {lead.message && <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">{lead.message}</p>}

                  {lead.scheduledSlot && (
                    <p className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                      <Calendar className="h-4 w-4" /> Scheduled: {formatInTz(lead.scheduledSlot, ctx.workspace.timezone, "dd LLL yyyy, HH:mm")}
                    </p>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
