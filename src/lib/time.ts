import { DateTime } from "luxon";

// Store UTC, display in Workspace tz (A1-10). Daily boundary + billing periods are tz-aware.
// Windows are half-open [start, end).

export const DEFAULT_TZ = process.env.S_TZ_DEFAULT ?? "Asia/Kolkata";

/** The local calendar date (yyyy-mm-dd) for an instant in a given tz — E11 day key. */
export function localDateKey(instant: Date, tz: string = DEFAULT_TZ): string {
  return DateTime.fromJSDate(instant, { zone: "utc" }).setZone(tz).toISODate() ?? "";
}

/** UTC instant at the start of the local day containing `instant`. */
export function startOfLocalDayUTC(instant: Date, tz: string = DEFAULT_TZ): Date {
  return DateTime.fromJSDate(instant, { zone: "utc" }).setZone(tz).startOf("day").toUTC().toJSDate();
}

/** A JS Date at midnight (local tz) for a yyyy-mm-dd key. */
export function dateKeyToUTCDate(dateKey: string, tz: string = DEFAULT_TZ): Date {
  return DateTime.fromISO(dateKey, { zone: tz }).startOf("day").toUTC().toJSDate();
}

/**
 * Value for a Postgres `@db.Date` column representing a LOCAL calendar day.
 * Prisma serializes @db.Date from UTC date components, so we must anchor the
 * local date string at UTC midnight to keep the calendar date intact (E11.date).
 */
export function dayKeyToColumnDate(dateKey: string): Date {
  return new Date(`${dateKey}T00:00:00.000Z`);
}

/** Add whole months keeping anniversary semantics (billing period roll-over). */
export function addMonths(instant: Date, months: number, tz: string = DEFAULT_TZ): Date {
  return DateTime.fromJSDate(instant, { zone: "utc" }).setZone(tz).plus({ months }).toUTC().toJSDate();
}

/** Default monthly billing period starting now (tz-aware, half-open). */
export function monthlyPeriodFrom(start: Date, tz: string = DEFAULT_TZ): { start: Date; end: Date } {
  return { start, end: addMonths(start, 1, tz) };
}

/** Whole local days elapsed since `start` (floored), for F-FORECAST. */
export function localDaysElapsed(start: Date, now: Date, tz: string = DEFAULT_TZ): number {
  const s = DateTime.fromJSDate(start, { zone: "utc" }).setZone(tz).startOf("day");
  const n = DateTime.fromJSDate(now, { zone: "utc" }).setZone(tz).startOf("day");
  return Math.max(0, Math.floor(n.diff(s, "days").days));
}

/** Whole local days in the period [start, end). */
export function periodLengthDays(start: Date, end: Date, tz: string = DEFAULT_TZ): number {
  const s = DateTime.fromJSDate(start, { zone: "utc" }).setZone(tz).startOf("day");
  const e = DateTime.fromJSDate(end, { zone: "utc" }).setZone(tz).startOf("day");
  return Math.max(1, Math.round(e.diff(s, "days").days));
}

/**
 * F-FORECAST (zero-guard, display-only linear run-rate).
 * days_elapsed = whole local days since period start. If < 1 → null ("—").
 * else floor(current × (period_length_days / days_elapsed)).
 */
export function forecastViews(
  currentTotal: number,
  periodStart: Date,
  periodEnd: Date,
  now: Date,
  tz: string = DEFAULT_TZ,
): number | null {
  const elapsed = localDaysElapsed(periodStart, now, tz);
  if (elapsed < 1) return null;
  const len = periodLengthDays(periodStart, periodEnd, tz);
  return Math.floor(currentTotal * (len / elapsed));
}

/** Human-friendly datetime in a workspace tz. */
export function formatInTz(instant: Date, tz: string = DEFAULT_TZ, fmt = "dd LLL yyyy, HH:mm"): string {
  return DateTime.fromJSDate(instant, { zone: "utc" }).setZone(tz).toFormat(fmt);
}

/** Indian financial year label (Apr–Mar) for an instant, e.g. "2026-27". */
export function financialYear(instant: Date, tz: string = DEFAULT_TZ): string {
  const d = DateTime.fromJSDate(instant, { zone: "utc" }).setZone(tz);
  const startYear = d.month >= 4 ? d.year : d.year - 1;
  const endYY = String((startYear + 1) % 100).padStart(2, "0");
  return `${startYear}-${endYY}`;
}
