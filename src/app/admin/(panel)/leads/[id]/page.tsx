import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireStaff } from "@/lib/auth/current-user";
import { staffCanAccess, STAFF_ROLE_LABELS } from "@/lib/permissions";
import { prisma } from "@/lib/db";
import { formatInTz } from "@/lib/time";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, KeyValue, AccessDenied } from "@/components/admin/ui";
import { LEAD_STAGE_LABEL, LEAD_STAGE_TONE, LEAD_NEXT_STAGES } from "@/components/admin/lead-meta";
import { LeadStageActions, LeadAssignForm, LeadNoteForm } from "@/components/admin/lead-actions";

export const metadata: Metadata = { title: "Lead detail" };

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const staff = await requireStaff();
  if (!staffCanAccess(staff.staffRole, "leads")) return <AccessDenied section="leads" />;

  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      assignedQueue: true,
      assignedStaff: true,
      workspace: true,
      notes: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!lead) notFound();

  const [staffOptions, noteAuthors] = await Promise.all([
    prisma.staffUser.findMany({ where: { status: "active" }, orderBy: { name: "asc" } }),
    prisma.staffUser.findMany({ where: { id: { in: lead.notes.map((n) => n.authorStaffId).filter((x): x is string => !!x) } } }),
  ]);
  const authorName = new Map(noteAuthors.map((s) => [s.id, s.name]));

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/leads" className="mb-3 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Leads
        </Link>
        <PageHeader
          title={lead.contactName}
          description={`${lead.source} · ${lead.assignedQueue?.name ?? "no queue"}`}
          actions={<Badge tone={LEAD_STAGE_TONE[lead.pipelineStage]}>{LEAD_STAGE_LABEL[lead.pipelineStage]}</Badge>}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
            <CardBody className="pt-0">
              <dl className="divide-y divide-line">
                <KeyValue label="Email">{lead.contactEmail}</KeyValue>
                <KeyValue label="Phone">{lead.contactPhone ?? "—"}</KeyValue>
                <KeyValue label="Service topic">{lead.serviceTopic ?? "—"}</KeyValue>
                <KeyValue label="Scheduled slot">{lead.scheduledSlot ? formatInTz(lead.scheduledSlot) : "—"}</KeyValue>
                <KeyValue label="From workspace">{lead.workspace?.name ?? "—"}</KeyValue>
                <KeyValue label="Created">{formatInTz(lead.createdAt)}</KeyValue>
                {lead.pipelineStage === "lost" && <KeyValue label="Lost reason">{lead.lostReason ?? "—"}</KeyValue>}
              </dl>
              {lead.message && (
                <div className="mt-4 rounded-lg border border-line bg-slate-50 p-3 text-sm text-slate-700">
                  {lead.message}
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <LeadNoteForm leadId={lead.id} />
              {lead.notes.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {lead.notes.map((n) => (
                    <li key={n.id} className="rounded-lg border border-line p-3">
                      <p className="text-sm text-slate-700">{n.body}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {n.authorStaffId ? authorName.get(n.authorStaffId) ?? "Staff" : "System"} · {formatInTz(n.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Advance stage</CardTitle></CardHeader>
            <CardBody className="pt-0">
              <LeadStageActions leadId={lead.id} nextStages={LEAD_NEXT_STAGES[lead.pipelineStage]} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader><CardTitle>Assign</CardTitle></CardHeader>
            <CardBody className="pt-0">
              <LeadAssignForm
                leadId={lead.id}
                currentAssigneeId={lead.assignedUserId}
                staffOptions={staffOptions.map((s) => ({ id: s.id, name: s.name, roleLabel: STAFF_ROLE_LABELS[s.staffRole] }))}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
