"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { writeAudit } from "@/lib/audit";
import { fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, staffActor } from "@/lib/actions/admin/_helpers";

const serviceSchema = z.object({
  serviceId: z.string().optional(),
  title: z.string().trim().min(1, "Enter a title").max(120),
  slug: z.string().trim().max(120).optional().or(z.literal("")),
  icon: z.string().trim().max(40).optional().or(z.literal("")),
  tagline: z.string().trim().max(200).optional().or(z.literal("")),
  summary: z.string().trim().min(1, "Enter a short summary").max(500),
  description: z.string().trim().min(1, "Enter a description").max(20000),
  features: z.string().trim().max(5000).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
  status: z.enum(["draft", "published"]),
});

function parseFeatures(raw: string | undefined): string[] {
  return (raw ?? "")
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean)
    .slice(0, 30);
}

function revalidateServices(paths: string[]) {
  revalidatePath("/services");
  for (const p of new Set(paths)) revalidatePath(p);
}

export async function saveServiceAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("services");
  if (!guard.ok) return fail(guard.error);

  const parsed = serviceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const d = parsed.data;

  let slug = slugify(d.slug || d.title) || "service";
  const slugOwner = await prisma.service.findUnique({ where: { slug } });
  if (slugOwner && slugOwner.id !== d.serviceId) slug = `${slug}-${Date.now().toString(36)}`;

  const base = {
    title: d.title,
    slug,
    icon: d.icon || "sparkles",
    tagline: d.tagline || null,
    summary: d.summary,
    description: d.description,
    features: parseFeatures(d.features),
    sortOrder: d.sortOrder ?? 0,
    status: d.status,
  };

  if (d.serviceId) {
    const before = await prisma.service.findUnique({ where: { id: d.serviceId } });
    if (!before) return fail("Service not found.");
    await prisma.service.update({ where: { id: d.serviceId }, data: base });
    await writeAudit({
      actor: staffActor(guard.staff),
      action: "service.update",
      objectType: "Service",
      objectId: d.serviceId,
      summary: `Updated service "${d.title}" (${d.status})`,
      before: { title: before.title, status: before.status },
      after: { title: d.title, status: d.status },
    });
    revalidateServices([`/services/${before.slug}`, `/services/${slug}`]);
    return succeed(d.status === "published" ? "Saved & live on the site." : "Saved as draft.");
  }

  const created = await prisma.service.create({ data: base });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "service.create",
    objectType: "Service",
    objectId: created.id,
    summary: `Created service "${d.title}" (${d.status})`,
    after: { title: d.title, slug, status: d.status },
  });
  revalidateServices([`/services/${slug}`]);
  return succeed(d.status === "published" ? "Created & live on the site." : "Created as draft.");
}

export async function deleteServiceAction(serviceId: string): Promise<void> {
  const guard = await requireStaffSection("services");
  if (!guard.ok) return;

  const item = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!item) return;

  await prisma.service.delete({ where: { id: serviceId } });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "service.delete",
    objectType: "Service",
    objectId: serviceId,
    summary: `Deleted service "${item.title}"`,
    before: { title: item.title, slug: item.slug, status: item.status },
  });
  revalidateServices([`/services/${item.slug}`]);
}
