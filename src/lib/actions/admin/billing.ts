"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSetting } from "@/lib/settings";
import { gstBreakdownInclusive, annualPrice } from "@/lib/money";
import { financialYear, addMonths } from "@/lib/time";
import { writeAudit } from "@/lib/audit";
import { fieldErrors } from "@/lib/validation";
import { fail, succeed, type ActionState } from "@/lib/actions/result";
import { requireStaffSection, canManageBilling, staffActor } from "@/lib/actions/admin/_helpers";

const assignSchema = z.object({
  workspaceId: z.string().min(1),
  planId: z.string().min(1, "Choose a plan"),
  manualPaymentRef: z.string().trim().min(1, "Enter a payment reference").max(120),
});

// A2-01 / §3.2 — manual paid plan assignment. Transactional: plan + subscription + GST invoice.
export async function assignPlanAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("workspaces");
  if (!guard.ok) return fail(guard.error);
  if (!canManageBilling(guard.staff.staffRole)) return fail("Only Finance or Owner/Admin can assign plans.");

  const parsed = assignSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return fail("Please fix the errors below.", fieldErrors(parsed.error));
  const { workspaceId, planId, manualPaymentRef } = parsed.data;

  const [ws, plan] = await Promise.all([
    prisma.workspace.findUnique({ where: { id: workspaceId }, include: { plan: true } }),
    prisma.plan.findUnique({ where: { id: planId } }),
  ]);
  if (!ws) return fail("Workspace not found.");
  if (!plan) return fail("Plan not found.");
  if (plan.isFree || plan.priceAmount == null) return fail("Choose a paid plan (use Downgrade for Free).");

  // Currency guard: invoice amounts come from the plan, so its currency governs the invoice.
  if (plan.priceCurrency !== ws.billingCurrency) {
    return fail(`Plan is priced in ${plan.priceCurrency} but this workspace bills in ${ws.billingCurrency}. Align currencies before assigning.`);
  }

  const now = new Date();
  const tz = ws.timezone;
  const fy = financialYear(now, tz);
  const rate = parseFloat(await getSetting("S-GST-RATE")) || 0.18;
  // Respect the plan's billing interval (F-ANNUAL): annual = 12× price − annual_discount, 12-month period.
  const isAnnual = plan.billingInterval === "annual";
  const total = isAnnual ? annualPrice(plan.priceAmount, plan.annualDiscount) : plan.priceAmount;
  const { gstAmount, taxable } = gstBreakdownInclusive(total, rate);
  const periodEnd = addMonths(now, isAnnual ? 12 : 1, tz);
  const periodLabel = isAnnual ? "1 year" : "1 month";

  // Race-safe sequence allocation: retry on a unique-constraint collision (INV-7).
  let invoice: { invoiceNumber: string } | undefined;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      invoice = await prisma.$transaction(async (tx) => {
        await tx.workspace.update({ where: { id: ws.id }, data: { planId: plan.id } });

        const existingSub = await tx.subscription.findFirst({
          where: { workspaceId: ws.id },
          orderBy: { createdAt: "desc" },
        });
        const subData = {
          planId: plan.id,
          state: "paid_active" as const,
          assignedByAdminId: guard.staff.id,
          manualPaymentRef,
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd,
        };
        if (existingSub) {
          await tx.subscription.update({ where: { id: existingSub.id }, data: subData });
        } else {
          await tx.subscription.create({ data: { workspaceId: ws.id, ...subData } });
        }

        const last = await tx.invoice.findFirst({
          where: { financialYear: fy },
          orderBy: { sequence: "desc" },
        });
        const seq = (last?.sequence ?? 0) + 1;
        const invoiceNumber = `JSY/${fy}/${String(seq).padStart(4, "0")}`;

        return tx.invoice.create({
          data: {
            workspaceId: ws.id,
            invoiceNumber,
            financialYear: fy,
            sequence: seq,
            currency: plan.priceCurrency,
            subtotal: taxable,
            gstAmount,
            gstRate: rate as unknown as never,
            total,
            gstin: ws.gstin,
            status: "paid",
            lineItems: [{ description: `${plan.name} plan — ${periodLabel}`, qty: 1, unitAmount: total, amount: total }] as object,
          },
        });
      });
      break;
    } catch (e) {
      if ((e as { code?: string })?.code === "P2002" && attempt < 3) continue; // sequence race → retry
      throw e;
    }
  }
  if (!invoice) return fail("Could not issue an invoice number, please retry.");

  await writeAudit({
    actor: staffActor(guard.staff),
    action: "billing.assign_plan",
    objectType: "Workspace",
    objectId: ws.id,
    summary: `Assigned ${plan.name} to "${ws.name}" (ref ${manualPaymentRef}); issued ${invoice.invoiceNumber}`,
    before: { planId: ws.planId, planName: ws.plan.name },
    after: { planId: plan.id, planName: plan.name, invoiceNumber: invoice.invoiceNumber },
  });

  revalidatePath(`/admin/workspaces/${ws.id}`);
  return succeed(`Assigned ${plan.name}. Invoice ${invoice.invoiceNumber} issued.`);
}

// §3.1 — downgrade to Free with newest-first suspension of over-limit live widgets.
export async function downgradeToFreeAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("workspaces");
  if (!guard.ok) return fail(guard.error);
  if (!canManageBilling(guard.staff.staffRole)) return fail("Only Finance or Owner/Admin can change plans.");

  const workspaceId = String(formData.get("workspaceId") ?? "");
  if (!workspaceId) return fail("Missing workspace.");

  const ws = await prisma.workspace.findUnique({ where: { id: workspaceId }, include: { plan: true } });
  if (!ws) return fail("Workspace not found.");
  const freePlan = await prisma.plan.findFirst({ where: { isFree: true }, orderBy: { sortOrder: "asc" } });
  if (!freePlan) return fail("No Free plan is configured.");
  if (ws.planId === freePlan.id) return fail("Workspace is already on the Free plan.");

  const now = new Date();
  const suspendedIds: string[] = [];

  await prisma.$transaction(async (tx) => {
    await tx.workspace.update({ where: { id: ws.id }, data: { planId: freePlan.id } });

    const existingSub = await tx.subscription.findFirst({
      where: { workspaceId: ws.id },
      orderBy: { createdAt: "desc" },
    });
    const subData = { planId: freePlan.id, state: "free" as const, currentPeriodStart: now, currentPeriodEnd: addMonths(now, 1, ws.timezone) };
    if (existingSub) {
      await tx.subscription.update({ where: { id: existingSub.id }, data: subData });
    } else {
      await tx.subscription.create({ data: { workspaceId: ws.id, ...subData } });
    }

    // Newest-first suspension of live widgets over the new plan's cap (§3.1).
    const live = await tx.widget.findMany({
      where: { workspaceId: ws.id, lifecycleState: "published_active" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: { id: true },
    });
    const excess = live.length - freePlan.maxWidgets;
    if (excess > 0) {
      const toSuspend = live.slice(0, excess).map((w) => w.id);
      await tx.widget.updateMany({ where: { id: { in: toSuspend } }, data: { lifecycleState: "published_suspended" } });
      suspendedIds.push(...toSuspend);
    }
  });

  await writeAudit({
    actor: staffActor(guard.staff),
    action: "billing.downgrade_free",
    objectType: "Workspace",
    objectId: ws.id,
    summary: `Downgraded "${ws.name}" to Free${suspendedIds.length ? `; suspended ${suspendedIds.length} widget(s)` : ""}`,
    before: { planId: ws.planId, planName: ws.plan.name },
    after: { planId: freePlan.id, planName: freePlan.name, suspendedWidgetIds: suspendedIds },
  });

  revalidatePath(`/admin/workspaces/${ws.id}`);
  return succeed(`Downgraded to Free.${suspendedIds.length ? ` ${suspendedIds.length} widget(s) suspended.` : ""}`);
}

export async function voidInvoiceAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const guard = await requireStaffSection("invoices");
  if (!guard.ok) return fail(guard.error);
  if (!canManageBilling(guard.staff.staffRole)) return fail("Only Finance or Owner/Admin can void invoices.");

  const invoiceId = String(formData.get("invoiceId") ?? "");
  if (!invoiceId) return fail("Missing invoice.");

  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) return fail("Invoice not found.");
  if (invoice.status === "void") return fail("Invoice is already void.");

  await prisma.invoice.update({ where: { id: invoice.id }, data: { status: "void" } });
  await writeAudit({
    actor: staffActor(guard.staff),
    action: "invoice.void",
    objectType: "Invoice",
    objectId: invoice.id,
    summary: `Voided invoice ${invoice.invoiceNumber}`,
    before: { status: invoice.status },
    after: { status: "void" },
  });

  revalidatePath(`/admin/invoices/${invoice.id}`);
  revalidatePath("/admin/invoices");
  return succeed(`Invoice ${invoice.invoiceNumber} voided.`);
}
