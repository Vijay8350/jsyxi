import { prisma } from "@/lib/db";

// Settings register (§7). DB-backed override → env fallback → hard default.
// Simple in-process cache; invalidated on write via clearSettingsCache().

const DEFAULTS: Record<string, string> = {
  "S-VIEW-DEDUP": "30", // minutes
  "S-CACHE": "5", // minutes
  "S-RECOVERY": "30", // days
  "S-RAW-RETENTION": "90", // days
  "S-DUNNING": "7", // days [LATER]
  "S-TICKET-REOPEN": "14", // days [LATER]
  "S-TZ-DEFAULT": process.env.S_TZ_DEFAULT ?? "Asia/Kolkata",
  "S-CURRENCY-DEFAULT": process.env.S_CURRENCY_DEFAULT ?? "INR",
  "S-GST-RATE": process.env.S_GST_RATE ?? "0.1800",
  "S-FILE-IMG-MAX": "5242880", // 5 MB
  "S-FILE-DOC-MAX": "20971520", // 20 MB
  "S-FILE-DOC-COUNT": "20",
  "S-TEXT-NAME-MAX": "120",
  "S-TEXT-LONG-MAX": "5000",
};

let cache: Map<string, string> | null = null;

async function load(): Promise<Map<string, string>> {
  if (cache) return cache;
  const rows = await prisma.setting.findMany();
  const m = new Map<string, string>();
  for (const r of rows) m.set(r.key, r.value);
  cache = m;
  return m;
}

export function clearSettingsCache() {
  cache = null;
}

export async function getSetting(key: string): Promise<string> {
  const m = await load();
  return m.get(key) ?? DEFAULTS[key] ?? "";
}

export async function getSettingInt(key: string): Promise<number> {
  return parseInt(await getSetting(key), 10);
}

export async function getSettingFloat(key: string): Promise<number> {
  return parseFloat(await getSetting(key));
}

export async function setSetting(key: string, value: string): Promise<void> {
  await prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } });
  clearSettingsCache();
}

// Synchronous defaults for code that can't await (bounds/validation constants).
export const LIMITS = {
  NAME_MAX: 120,
  LONG_MAX: 5000,
  IMG_MAX_BYTES: 5 * 1024 * 1024,
  DOC_MAX_BYTES: 20 * 1024 * 1024,
  DOC_MAX_COUNT: 20,
  IMG_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
  VIEW_DEDUP_MIN: 30,
  CACHE_MIN: 5,
  RECOVERY_DAYS: 30,
  RAW_RETENTION_DAYS: 90,
} as const;
