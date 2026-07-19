"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { writeAudit } from "@/lib/audit";
import { fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, staffActor } from "@/lib/actions/admin/_helpers";

function parseBadges(raw: string): string[] {
  return Array.from(new Set(raw.split(",").map((b) => b.trim()).filter(Boolean))).slice(0, 8);
}

const toolSchema = z.object({
  toolId: z.string().min(1),
  name: z.string().trim().min(1, "Enter a name").max(120),
  description: z.string().trim().max(500),
  badges: z.string().trim().max(200).optional().default(""),
  sortOrder: z.coerce.number().int().min(0).max(9999),
  status: z.enum(["draft", "published", "retired"]),
});

export async function updateToolAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("catalog");
  if (!guard.ok) return fail(guard.error);

  const parsed = toolSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { toolId, name, description, badges, sortOrder, status } = parsed.data;

  const tool = await prisma.tool.findUnique({ where: { id: toolId } });
  if (!tool) return fail("Tool not found.");

  await prisma.tool.update({
    where: { id: toolId },
    data: { name, description, badges: parseBadges(badges), sortOrder, status },
  });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "catalog.tool_update",
    objectType: "Tool",
    objectId: toolId,
    summary: `Updated tool "${name}" (${status})`,
    before: { name: tool.name, status: tool.status, sortOrder: tool.sortOrder },
    after: { name, status, sortOrder },
  });
  revalidatePath("/admin/catalog");
  return succeed("Tool saved.");
}

export async function toggleToolStatusAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("catalog");
  if (!guard.ok) return fail(guard.error);

  const toolId = String(formData.get("toolId") ?? "");
  const tool = await prisma.tool.findUnique({ where: { id: toolId } });
  if (!tool) return fail("Tool not found.");

  const next = tool.status === "published" ? "retired" : "published";
  await prisma.tool.update({ where: { id: toolId }, data: { status: next } });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "catalog.tool_status",
    objectType: "Tool",
    objectId: toolId,
    summary: `${next === "published" ? "Published" : "Retired"} tool "${tool.name}"`,
    before: { status: tool.status },
    after: { status: next },
  });
  revalidatePath("/admin/catalog");
  return succeed(`Tool ${next}.`);
}

const categorySchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().trim().min(1, "Enter a name").max(120),
  status: z.enum(["active", "hidden"]),
});

export async function saveCategoryAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("catalog");
  if (!guard.ok) return fail(guard.error);

  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { categoryId, name, status } = parsed.data;

  if (categoryId) {
    const cat = await prisma.toolCategory.findUnique({ where: { id: categoryId } });
    if (!cat) return fail("Category not found.");
    await prisma.toolCategory.update({ where: { id: categoryId }, data: { name, status } });
    await writeAudit({
      actor: staffActor(guard.staff),
      action: "catalog.category_update",
      objectType: "ToolCategory",
      objectId: categoryId,
      summary: `Updated category "${name}" (${status})`,
      before: { name: cat.name, status: cat.status },
      after: { name, status },
    });
    revalidatePath("/admin/catalog");
    return succeed("Category saved.");
  }

  // Create — derive a unique-ish slug.
  let slug = slugify(name) || "category";
  if (await prisma.toolCategory.findUnique({ where: { slug } })) slug = `${slug}-${Date.now().toString(36)}`;
  const created = await prisma.toolCategory.create({ data: { name, slug, status } });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "catalog.category_create",
    objectType: "ToolCategory",
    objectId: created.id,
    summary: `Created category "${name}"`,
    after: { name, slug, status },
  });
  revalidatePath("/admin/catalog");
  return succeed("Category created.");
}
