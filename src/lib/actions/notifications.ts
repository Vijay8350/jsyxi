"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/current-user";

// E20. Mark in-app notifications read. Scoped to the current user (recipientUserId).
export async function markAllReadAction(): Promise<void> {
  const user = await requireUser();
  await prisma.notification.updateMany({
    where: { recipientUserId: user.id, readAt: null },
    data: { readAt: new Date() },
  });
  revalidatePath("/app/notifications");
}

export async function markReadAction(id: string): Promise<void> {
  const user = await requireUser();
  await prisma.notification.updateMany({
    where: { id, recipientUserId: user.id },
    data: { readAt: new Date() },
  });
  revalidatePath("/app/notifications");
}
