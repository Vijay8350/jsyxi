import { prisma } from "@/lib/db";
import { LIMITS } from "@/lib/settings";
import { addMonths, dayKeyToColumnDate, localDateKey, forecastViews } from "@/lib/time";
import { normalizeHost } from "@/lib/utils";

// F-VIEW (A1-02) + INV-8/12/13. Views counted into E11 (daily) + E12 (rolling), never a raw scan.

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|vkshare|whatsapp|telegram|slackbot|discord|preview|monitor|lighthouse|headless|python-requests|curl|wget|axios|node-fetch|go-http/i;

export function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true; // no UA → treat as non-human
  return BOT_RE.test(userAgent);
}

/** INV-13: empty allow-list = any origin; otherwise host must match (incl. subdomain). */
export function originAllowed(allowedDomains: string[], origin: string | null | undefined): boolean {
  if (!allowedDomains || allowedDomains.length === 0) return true;
  if (!origin) return false;
  const host = normalizeHost(origin);
  return allowedDomains.some((d) => {
    const allowed = normalizeHost(d);
    return host === allowed || host.endsWith(`.${allowed}`);
  });
}

/** Lazily ensure the rolling usage counter exists and is rolled to the current month. */
export async function ensureUsageRolling(workspaceId: string, tz: string): Promise<{
  currentPeriodViewTotal: number;
  periodStart: Date;
  periodEnd: Date;
}> {
  const now = new Date();
  let row = await prisma.workspaceUsageRolling.findUnique({ where: { workspaceId } });
  if (!row) {
    const periodEnd = addMonths(now, 1, tz);
    row = await prisma.workspaceUsageRolling.create({
      data: { workspaceId, currentPeriodViewTotal: 0, periodStart: now, periodEnd },
    });
  }
  // Roll forward through any elapsed anniversaries (resets to 0 — F-USAGE).
  while (row.periodEnd <= now) {
    const nextEnd = addMonths(row.periodEnd, 1, tz);
    row = await prisma.workspaceUsageRolling.update({
      where: { workspaceId },
      data: { currentPeriodViewTotal: 0, periodStart: row.periodEnd, periodEnd: nextEnd, lastRecomputedAt: now },
    });
  }
  return { currentPeriodViewTotal: row.currentPeriodViewTotal, periodStart: row.periodStart, periodEnd: row.periodEnd };
}

export type RecordViewResult = { counted: boolean; reason?: "dedup" | "not-live" | "origin" | "bot" };

/**
 * Count one View (F-VIEW): dedup within S-VIEW-DEDUP, then atomically write raw event +
 * increment daily aggregate + rolling counter. Assumes lifecycle/origin/bot already checked
 * by the caller, but re-guards dedup here.
 */
export async function recordView(params: {
  widgetId: string;
  workspaceId: string;
  toolId: string;
  tz: string;
  visitorHash: string;
  pageHash: string;
  occurredAt?: Date;
}): Promise<RecordViewResult> {
  const occurredAt = params.occurredAt ?? new Date();
  const windowMs = LIMITS.VIEW_DEDUP_MIN * 60 * 1000;
  const windowStart = new Date(occurredAt.getTime() - windowMs);

  // Dedup (same visitor+page within window counts once).
  const recent = await prisma.viewEventRaw.findFirst({
    where: {
      widgetId: params.widgetId,
      visitorHash: params.visitorHash,
      pageHash: params.pageHash,
      occurredAt: { gte: windowStart },
    },
    select: { id: true },
  });
  if (recent) return { counted: false, reason: "dedup" };

  const dateKey = localDateKey(occurredAt, params.tz);
  const aggDate = dayKeyToColumnDate(dateKey);

  await ensureUsageRolling(params.workspaceId, params.tz);

  await prisma.$transaction([
    prisma.viewEventRaw.create({
      data: {
        widgetId: params.widgetId,
        visitorHash: params.visitorHash,
        pageHash: params.pageHash,
        occurredAt,
      },
    }),
    prisma.viewDailyAggregate.upsert({
      where: { widgetId_date: { widgetId: params.widgetId, date: aggDate } },
      create: {
        widgetId: params.widgetId,
        date: aggDate,
        workspaceId: params.workspaceId,
        toolId: params.toolId,
        viewCount: 1,
      },
      update: { viewCount: { increment: 1 } },
    }),
    prisma.workspaceUsageRolling.update({
      where: { workspaceId: params.workspaceId },
      data: { currentPeriodViewTotal: { increment: 1 } },
    }),
  ]);

  return { counted: true };
}

export type UsageSummary = {
  used: number;
  limit: number;
  periodStart: Date;
  periodEnd: Date;
  overLimit: boolean;
  hardCutoff: boolean;
  forceBranding: boolean;
  forecast: number | null;
  percent: number;
};

/** F-LIMIT (soft by default): over-limit forces branding + nudges but keeps rendering (INV-6). */
export async function getWorkspaceUsage(workspaceId: string): Promise<UsageSummary> {
  const ws = await prisma.workspace.findUniqueOrThrow({
    where: { id: workspaceId },
    include: { plan: true },
  });
  const roll = await ensureUsageRolling(workspaceId, ws.timezone);
  const used = roll.currentPeriodViewTotal;
  const limit = ws.plan.maxMonthlyViews;
  const overLimit = used > limit;
  const hardCutoff = overLimit && ws.plan.hardViewCutoff;
  return {
    used,
    limit,
    periodStart: roll.periodStart,
    periodEnd: roll.periodEnd,
    overLimit,
    hardCutoff,
    forceBranding: overLimit, // branding force-shown regardless of branding_removable
    forecast: forecastViews(used, roll.periodStart, roll.periodEnd, new Date(), ws.timezone),
    percent: limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0,
  };
}

/** Count of currently active (published_active) widgets — for max_widgets enforcement (INV-4). */
export async function activeWidgetCount(workspaceId: string): Promise<number> {
  return prisma.widget.count({
    where: { workspaceId, lifecycleState: "published_active" },
  });
}
