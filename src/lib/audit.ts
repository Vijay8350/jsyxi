import { prisma } from "@/lib/db";
import type { AuditActorType } from "@/generated/prisma";

// INV-11 / §12: every transition changing money, plan, or a live embed is logged.
export type AuditActor = {
  type: AuditActorType;
  id?: string | null;
  label: string;
};

export async function writeAudit(input: {
  actor: AuditActor;
  action: string;
  objectType: string;
  objectId?: string | null;
  summary: string;
  before?: unknown;
  after?: unknown;
}): Promise<void> {
  await prisma.auditLogEntry.create({
    data: {
      actorType: input.actor.type,
      actorId: input.actor.id ?? null,
      actorLabel: input.actor.label,
      action: input.action,
      objectType: input.objectType,
      objectId: input.objectId ?? null,
      summary: input.summary,
      before: (input.before ?? undefined) as never,
      after: (input.after ?? undefined) as never,
    },
  });
}

export const systemActor: AuditActor = { type: "system", label: "system" };
