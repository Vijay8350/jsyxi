"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireWorkspaceContext } from "@/lib/auth/current-user";
import { ticketSchema, ticketReplySchema, fieldErrors } from "@/lib/validation";
import { fail, type ActionState } from "@/lib/actions/result";

// RW-15: INC-1 ticket stub. Customers create + view; only staff resolve.
export async function createTicketAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ctx = await requireWorkspaceContext();
  const parsed = ticketSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));

  const ticket = await prisma.ticket.create({
    data: {
      workspaceId: ctx.workspace.id,
      subject: parsed.data.subject,
      body: parsed.data.body,
      state: "open",
    },
    select: { id: true },
  });

  revalidatePath("/app/support");
  redirect(`/app/support/${ticket.id}`);
}

export async function addTicketMessageAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const ctx = await requireWorkspaceContext();
  const parsed = ticketReplySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));

  const ticket = await prisma.ticket.findUnique({ where: { id: parsed.data.ticketId } });
  if (!ticket || ticket.workspaceId !== ctx.workspace.id) return fail("Ticket not found.");
  if (ticket.state === "resolved" || ticket.state === "closed") {
    return fail("This ticket is resolved. Open a new ticket if you still need help.");
  }

  await prisma.ticketMessage.create({
    data: { ticketId: ticket.id, body: parsed.data.body, authorUserId: ctx.user.id },
  });

  revalidatePath(`/app/support/${ticket.id}`);
  return { ok: true, message: "Message sent." };
}
