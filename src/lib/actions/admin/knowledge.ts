"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/audit";
import { fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, staffActor } from "@/lib/actions/admin/_helpers";

const kbSchema = z.object({
  articleId: z.string().optional(),
  title: z.string().trim().min(1, "Enter a title").max(200),
  content: z.string().trim().min(1, "Enter the article content").max(8000),
  category: z.string().trim().max(80).optional().or(z.literal("")),
  keywords: z.string().trim().max(300).optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

export async function saveKnowledgeAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("knowledge");
  if (!guard.ok) return fail(guard.error);

  const parsed = kbSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const d = parsed.data;
  const data = {
    title: d.title,
    content: d.content,
    category: d.category || null,
    keywords: d.keywords || null,
    sortOrder: d.sortOrder,
  };

  if (d.articleId) {
    const before = await prisma.knowledgeArticle.findUnique({ where: { id: d.articleId } });
    if (!before) return fail("Article not found.");
    await prisma.knowledgeArticle.update({ where: { id: d.articleId }, data });
    await writeAudit({ actor: staffActor(guard.staff), action: "knowledge.update", objectType: "KnowledgeArticle", objectId: d.articleId, summary: `Updated KB article "${d.title}"` });
    revalidatePath("/admin/knowledge");
    return succeed("Article saved.");
  }

  const created = await prisma.knowledgeArticle.create({ data });
  await writeAudit({ actor: staffActor(guard.staff), action: "knowledge.create", objectType: "KnowledgeArticle", objectId: created.id, summary: `Created KB article "${d.title}"` });
  revalidatePath("/admin/knowledge");
  return succeed("Article created.");
}

export async function toggleKnowledgeAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("knowledge");
  if (!guard.ok) return fail(guard.error);
  const id = String(formData.get("articleId") ?? "");
  const a = await prisma.knowledgeArticle.findUnique({ where: { id } });
  if (!a) return fail("Article not found.");
  await prisma.knowledgeArticle.update({ where: { id }, data: { enabled: !a.enabled } });
  await writeAudit({ actor: staffActor(guard.staff), action: "knowledge.toggle", objectType: "KnowledgeArticle", objectId: id, summary: `${a.enabled ? "Disabled" : "Enabled"} KB article "${a.title}"` });
  revalidatePath("/admin/knowledge");
  return succeed(a.enabled ? "Article disabled." : "Article enabled.");
}

export async function deleteKnowledgeAction(id: string): Promise<void> {
  const guard = await requireStaffSection("knowledge");
  if (!guard.ok) return;
  const a = await prisma.knowledgeArticle.findUnique({ where: { id } });
  if (!a) return;
  await prisma.knowledgeArticle.delete({ where: { id } });
  await writeAudit({ actor: staffActor(guard.staff), action: "knowledge.delete", objectType: "KnowledgeArticle", objectId: id, summary: `Deleted KB article "${a.title}"` });
  revalidatePath("/admin/knowledge");
}
