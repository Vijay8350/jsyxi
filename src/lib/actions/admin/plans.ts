"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { writeAudit } from "@/lib/audit";
import { fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, staffActor } from "@/lib/actions/admin/_helpers";

const checkbox = z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean());

const planSchema = z.object({
  planId: z.string().optional(),
  name: z.string().trim().min(1, "Enter a name").max(120),
  slug: z.string().trim().min(1, "Enter a slug").max(60),
  purchaseMode: z.enum(["single_app", "all_access"]),
  billingInterval: z.enum(["monthly", "annual"]),
  priceCurrency: z.string().trim().min(3).max(3).default("INR"),
  status: z.enum(["active", "hidden", "retired"]),
  isFree: checkbox,
  priceAmount: z.coerce.number().int().min(0).optional(),
  annualDiscount: z.coerce.number().int().min(0).default(0),
  maxWidgets: z.coerce.number().int().min(0).default(1),
  maxMonthlyViews: z.coerce.number().int().min(0).default(1000),
  maxProjects: z.coerce.number().int().min(0).default(0),
  maxMembers: z.coerce.number().int().min(0).default(1),
  sortOrder: z.coerce.number().int().min(0).default(0),
  aiAccess: checkbox,
  brandingRemovable: checkbox,
  prioritySupport: checkbox,
  freeInstallation: checkbox,
  hardViewCutoff: checkbox,
});

export async function savePlanAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("plans");
  if (!guard.ok) return fail(guard.error);

  const parsed = planSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const d = parsed.data;
  const slug = slugify(d.slug) || slugify(d.name);
  const priceAmount = d.isFree ? null : d.priceAmount ?? 0;

  const data = {
    name: d.name,
    slug,
    purchaseMode: d.purchaseMode,
    billingInterval: d.billingInterval,
    priceCurrency: d.priceCurrency.toUpperCase(),
    status: d.status,
    isFree: d.isFree,
    priceAmount,
    annualDiscount: d.annualDiscount,
    maxWidgets: d.maxWidgets,
    maxMonthlyViews: d.maxMonthlyViews,
    maxProjects: d.maxProjects,
    maxMembers: d.maxMembers,
    sortOrder: d.sortOrder,
    aiAccess: d.aiAccess,
    brandingRemovable: d.brandingRemovable,
    prioritySupport: d.prioritySupport,
    freeInstallation: d.freeInstallation,
    hardViewCutoff: d.hardViewCutoff,
  };

  // Slug uniqueness guard.
  const slugOwner = await prisma.plan.findUnique({ where: { slug } });
  if (slugOwner && slugOwner.id !== d.planId) return fail("That slug is already in use.", { slug: "Already in use" });

  if (d.planId) {
    const before = await prisma.plan.findUnique({ where: { id: d.planId } });
    if (!before) return fail("Plan not found.");
    await prisma.plan.update({ where: { id: d.planId }, data });
    await writeAudit({
      actor: staffActor(guard.staff),
      action: "plan.update",
      objectType: "Plan",
      objectId: d.planId,
      summary: `Updated plan "${d.name}"`,
      before: { name: before.name, priceAmount: before.priceAmount, maxWidgets: before.maxWidgets, status: before.status },
      after: { name: d.name, priceAmount, maxWidgets: d.maxWidgets, status: d.status },
    });
    revalidatePath("/admin/plans");
    return succeed("Plan saved.");
  }

  const created = await prisma.plan.create({ data });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "plan.create",
    objectType: "Plan",
    objectId: created.id,
    summary: `Created plan "${d.name}"`,
    after: { name: d.name, slug, priceAmount },
  });
  revalidatePath("/admin/plans");
  return succeed("Plan created.");
}
