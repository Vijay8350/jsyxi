"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { writeAudit } from "@/lib/audit";
import { fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, staffActor } from "@/lib/actions/admin/_helpers";

const contentSchema = z.object({
  contentId: z.string().optional(),
  type: z.enum(["blog", "tutorial", "case_study", "portfolio", "help_article", "landing"]),
  title: z.string().trim().min(1, "Enter a title").max(200),
  slug: z.string().trim().max(120).optional().or(z.literal("")),
  excerpt: z.string().trim().max(500).optional().or(z.literal("")),
  body: z.string().trim().min(1, "Enter the body").max(50000),
  coverImage: z.string().trim().max(500).optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
});

export async function saveContentAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("content");
  if (!guard.ok) return fail(guard.error);

  const parsed = contentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const d = parsed.data;

  let slug = slugify(d.slug || d.title) || "post";
  const slugOwner = await prisma.contentItem.findUnique({ where: { slug } });
  if (slugOwner && slugOwner.id !== d.contentId) slug = `${slug}-${Date.now().toString(36)}`;

  const base = {
    type: d.type,
    title: d.title,
    slug,
    excerpt: d.excerpt || null,
    body: d.body,
    coverImage: d.coverImage || null,
    status: d.status,
  };

  if (d.contentId) {
    const before = await prisma.contentItem.findUnique({ where: { id: d.contentId } });
    if (!before) return fail("Content not found.");
    const publishedAt = d.status === "published" ? (before.publishedAt ?? new Date()) : null;
    await prisma.contentItem.update({ where: { id: d.contentId }, data: { ...base, publishedAt } });
    await writeAudit({
      actor: staffActor(guard.staff),
      action: "content.update",
      objectType: "ContentItem",
      objectId: d.contentId,
      summary: `Updated ${d.type} "${d.title}" (${d.status})`,
      before: { title: before.title, status: before.status },
      after: { title: d.title, status: d.status },
    });
    revalidatePath("/admin/content");
    return succeed("Content saved.");
  }

  const created = await prisma.contentItem.create({
    data: {
      ...base,
      authorStaffId: guard.staff.id,
      publishedAt: d.status === "published" ? new Date() : null,
    },
  });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "content.create",
    objectType: "ContentItem",
    objectId: created.id,
    summary: `Created ${d.type} "${d.title}" (${d.status})`,
    after: { title: d.title, slug, status: d.status },
  });
  revalidatePath("/admin/content");
  return succeed("Content created.");
}
