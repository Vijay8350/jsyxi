import { prisma } from "@/lib/db";
import type { LeadSource } from "@/generated/prisma";

/** Route a lead to a queue by service_topic (§3.3): matching map → default → null. */
export async function routeQueueId(serviceTopic?: string | null): Promise<string | null> {
  const queues = await prisma.leadQueue.findMany();
  if (serviceTopic) {
    const match = queues.find((q) => q.serviceTopicMap.includes(serviceTopic));
    if (match) return match.id;
  }
  return queues.find((q) => q.isDefault)?.id ?? null;
}

export type CreateLeadInput = {
  source: LeadSource;
  serviceTopic?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  scheduledSlot?: Date | null;
  workspaceId?: string | null;
  requestKey?: string | null;
};

/** Create a Lead, idempotent on requestKey (INV-12), routed to a queue. */
export async function createLead(input: CreateLeadInput) {
  if (input.requestKey) {
    const existing = await prisma.lead.findUnique({ where: { requestKey: input.requestKey } });
    if (existing) return existing;
  }
  const assignedQueueId = await routeQueueId(input.serviceTopic);
  return prisma.lead.create({
    data: {
      source: input.source,
      serviceTopic: input.serviceTopic ?? null,
      contactName: input.name,
      contactEmail: input.email,
      contactPhone: input.phone ?? null,
      message: input.message ?? null,
      scheduledSlot: input.scheduledSlot ?? null,
      workspaceId: input.workspaceId ?? null,
      requestKey: input.requestKey ?? null,
      assignedQueueId,
      pipelineStage: "new",
    },
  });
}
