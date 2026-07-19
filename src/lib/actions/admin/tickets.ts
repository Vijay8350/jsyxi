"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/audit";
import { fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, staffActor } from "@/lib/actions/admin/_helpers";

const replySchema = z.object({
  ticketId: z.string().min(1),
  body: z.string().trim().min(1, "Enter a reply").max(5000),
});

export async function replyTicketAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("tickets");
  if (!guard.ok) return fail(guard.error);

  const parsed = replySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { ticketId, body } = parsed.data;

  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket) return fail("Ticket not found.");

  await prisma.ticketMessage.create({ data: { ticketId, body, authorStaffId: guard.staff.id } });
  revalidatePath(`/admin/tickets/${ticketId}`);
  return succeed("Reply sent.");
}

export async function resolveTicketAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("tickets");
  if (!guard.ok) return fail(guard.error);

  const ticketId = String(formData.get("ticketId") ?? "");
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket) return fail("Ticket not found.");
  // RW-15: open → resolved only.
  if (ticket.state !== "open") return fail("Only open tickets can be resolved.");

  await prisma.ticket.update({ where: { id: ticketId }, data: { state: "resolved", resolvedAt: new Date() } });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "ticket.resolve",
    objectType: "Ticket",
    objectId: ticketId,
    summary: `Resolved ticket "${ticket.subject}"`,
    before: { state: ticket.state },
    after: { state: "resolved" },
  });
  revalidatePath(`/admin/tickets/${ticketId}`);
  revalidatePath("/admin/tickets");
  return succeed("Ticket resolved.");
}
