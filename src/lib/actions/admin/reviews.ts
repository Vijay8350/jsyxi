"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/audit";
import { fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, staffActor } from "@/lib/actions/admin/_helpers";

const testimonialSchema = z.object({
  testimonialId: z.string().optional(),
  authorName: z.string().trim().min(1, "Enter an author name").max(120),
  authorRole: z.string().trim().max(160).optional().or(z.literal("")),
  rating: z.coerce.number().int().min(1).max(5),
  body: z.string().trim().min(1, "Enter the review body").max(2000),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

export async function saveTestimonialAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("reviews");
  if (!guard.ok) return fail(guard.error);

  const parsed = testimonialSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const d = parsed.data;
  const data = {
    authorName: d.authorName,
    authorRole: d.authorRole || null,
    rating: d.rating,
    body: d.body,
    sortOrder: d.sortOrder,
  };

  if (d.testimonialId) {
    const before = await prisma.siteTestimonial.findUnique({ where: { id: d.testimonialId } });
    if (!before) return fail("Testimonial not found.");
    await prisma.siteTestimonial.update({ where: { id: d.testimonialId }, data });
    await writeAudit({
      actor: staffActor(guard.staff),
      action: "review.update",
      objectType: "SiteTestimonial",
      objectId: d.testimonialId,
      summary: `Updated testimonial by ${d.authorName}`,
    });
    revalidatePath("/admin/reviews");
    return succeed("Testimonial saved.");
  }

  const created = await prisma.siteTestimonial.create({ data });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "review.create",
    objectType: "SiteTestimonial",
    objectId: created.id,
    summary: `Created testimonial by ${d.authorName}`,
  });
  revalidatePath("/admin/reviews");
  return succeed("Testimonial created.");
}

export async function toggleTestimonialFlagAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("reviews");
  if (!guard.ok) return fail(guard.error);

  const id = String(formData.get("testimonialId") ?? "");
  const flag = String(formData.get("flag") ?? "");
  if (flag !== "approved" && flag !== "featured") return fail("Invalid flag.");

  const t = await prisma.siteTestimonial.findUnique({ where: { id } });
  if (!t) return fail("Testimonial not found.");
  const current = flag === "approved" ? t.approved : t.featured;
  const next = !current;

  await prisma.siteTestimonial.update({
    where: { id },
    data: flag === "approved" ? { approved: next } : { featured: next },
  });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: `review.${flag}`,
    objectType: "SiteTestimonial",
    objectId: id,
    summary: `${next ? "Set" : "Cleared"} ${flag} on testimonial by ${t.authorName}`,
    before: { [flag]: current },
    after: { [flag]: next },
  });
  revalidatePath("/admin/reviews");
  return succeed(`${flag === "approved" ? "Approval" : "Feature"} ${next ? "set" : "cleared"}.`);
}
