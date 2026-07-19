import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className combiner. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Case-fold an email for storage/lookup (INV: unique ci). */
export function foldEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Normalize a slug candidate: lowercase, trim, spaces/underscores → hyphen. */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Extract a bare hostname from an origin/URL/domain string (lowercased, no port). */
export function normalizeHost(input: string): string {
  let s = input.trim().toLowerCase();
  s = s.replace(/^https?:\/\//, "");
  s = s.replace(/\/.*$/, "");
  s = s.replace(/:\d+$/, "");
  return s;
}
