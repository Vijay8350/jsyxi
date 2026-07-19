"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/audit";
import { fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, staffActor } from "@/lib/actions/admin/_helpers";
import { LEAD_NEXT_STAGES, LEAD_STAGE_LABEL } from "@/components/admin/lead-meta";

const stageSchema = z.object({
  leadId: z.string().min(1),
  stage: z.enum(["new", "contacted", "proposal", "won", "lost"]),
  lostReason: z.string().trim().max(500).optional().or(z.literal("")),
});

export async function updateLeadStageAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("leads");
  if (!guard.ok) return fail(guard.error);

  const parsed = stageSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { leadId, stage, lostReason } = parsed.data;

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return fail("Lead not found.");
  if (!LEAD_NEXT_STAGES[lead.pipelineStage].includes(stage)) {
    return fail(`Can't move from ${LEAD_STAGE_LABEL[lead.pipelineStage]} to ${LEAD_STAGE_LABEL[stage]}.`);
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { pipelineStage: stage, lostReason: stage === "lost" ? (lostReason || "No reason given") : null },
  });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "lead.stage",
    objectType: "Lead",
    objectId: leadId,
    summary: `Lead "${lead.contactName}" → ${LEAD_STAGE_LABEL[stage]}${stage === "won" ? " (ServiceProject [LATER])" : ""}`,
    before: { stage: lead.pipelineStage },
    after: { stage, lostReason: stage === "lost" ? (lostReason || "No reason given") : null },
  });
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
  return succeed(`Moved to ${LEAD_STAGE_LABEL[stage]}.`);
}

export async function assignLeadAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("leads");
  if (!guard.ok) return fail(guard.error);

  const leadId = String(formData.get("leadId") ?? "");
  const assignedUserId = String(formData.get("assignedUserId") ?? "") || null;

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return fail("Lead not found.");
  if (assignedUserId) {
    const staffUser = await prisma.staffUser.findUnique({ where: { id: assignedUserId } });
    if (!staffUser) return fail("Selected staff not found.");
  }

  await prisma.lead.update({ where: { id: leadId }, data: { assignedUserId } });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "lead.assign",
    objectType: "Lead",
    objectId: leadId,
    summary: `Assigned lead "${lead.contactName}"${assignedUserId ? "" : " (unassigned)"}`,
    before: { assignedUserId: lead.assignedUserId },
    after: { assignedUserId },
  });
  revalidatePath(`/admin/leads/${leadId}`);
  return succeed(assignedUserId ? "Lead assigned." : "Lead unassigned.");
}

const noteSchema = z.object({
  leadId: z.string().min(1),
  body: z.string().trim().min(1, "Enter a note").max(2000),
});

export async function addLeadNoteAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("leads");
  if (!guard.ok) return fail(guard.error);

  const parsed = noteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { leadId, body } = parsed.data;

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return fail("Lead not found.");

  await prisma.leadNote.create({ data: { leadId, body, authorStaffId: guard.staff.id } });
  revalidatePath(`/admin/leads/${leadId}`);
  return succeed("Note added.");
}
