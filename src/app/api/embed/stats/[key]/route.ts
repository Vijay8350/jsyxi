import { resolveEmbed } from "@/lib/embed";
import { originAllowed } from "@/lib/metering";
import { prisma } from "@/lib/db";
import { corsJson, CORS_HEADERS, requestOrigin } from "@/lib/http";
import { localDateKey, dateKeyToUTCDate } from "@/lib/time";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// Public first-party view stats for a published widget (backs the Visitor Counter).
// Reads the maintained daily aggregates (E11) — never a raw-event scan (INV-8).
export async function GET(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const resolved = await resolveEmbed(key);
  if (!resolved) return corsJson({ ok: false }); // INV-2

  const origin = requestOrigin(req);
  if (!originAllowed(resolved.widget.allowedDomains, origin)) return corsJson({ ok: false }); // INV-13

  const sum = await prisma.viewDailyAggregate.aggregate({
    where: { widgetId: resolved.widget.id },
    _sum: { viewCount: true },
  });
  const tz = resolved.workspace.timezone;
  const todayRow = await prisma.viewDailyAggregate.findFirst({
    where: { widgetId: resolved.widget.id, date: dateKeyToUTCDate(localDateKey(new Date(), tz), tz) },
    select: { viewCount: true },
  });

  return corsJson({ ok: true, total: sum._sum.viewCount ?? 0, today: todayRow?.viewCount ?? 0 });
}
