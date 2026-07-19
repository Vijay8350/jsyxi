import { customAlphabet } from "nanoid";

// Unguessable, globally-unique public identifiers (A1-11 / INV-7).
// Alphabet excludes look-alikes; length 24 → ~142 bits of entropy for embed keys.
const embedAlphabet = "abcdefghijkmnpqrstuvwxyz23456789";
const embedNano = customAlphabet(embedAlphabet, 24);

/** Public embed key placed in the third-party snippet. Never reused (INV-7). */
export function newEmbedKey(): string {
  return `wgt_${embedNano()}`;
}

const refAlphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const refNano = customAlphabet(refAlphabet, 8);

/** Human-shareable referral / coupon-ish code fragment. */
export function newRefCode(prefix = "REF"): string {
  return `${prefix}-${refNano()}`;
}
