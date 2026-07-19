import { createHash, randomBytes, createCipheriv, createDecipheriv } from "node:crypto";
import { hash as argonHash, verify as argonVerify } from "@node-rs/argon2";

/** SHA-256 hex digest — used to store session/verification tokens (never store raw). */
export function sha256hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** URL-safe random token (default 32 bytes → 43 chars base64url). */
export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export async function hashPassword(password: string): Promise<string> {
  return argonHash(password);
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await argonVerify(hash, password);
  } catch {
    return false;
  }
}

// AES-256-GCM for symmetric secrets (TOTP secret at rest).
function encKey(): Buffer {
  const raw = process.env.TOTP_ENC_KEY ?? "dev-totp-encryption-key-change-me-32b!";
  return createHash("sha256").update(raw).digest(); // 32 bytes
}

export function encryptSecret(plaintext: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encKey(), iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64url")}.${tag.toString("base64url")}.${enc.toString("base64url")}`;
}

export function decryptSecret(payload: string): string {
  const [ivb, tagb, encb] = payload.split(".");
  const decipher = createDecipheriv("aes-256-gcm", encKey(), Buffer.from(ivb, "base64url"));
  decipher.setAuthTag(Buffer.from(tagb, "base64url"));
  const dec = Buffer.concat([decipher.update(Buffer.from(encb, "base64url")), decipher.final()]);
  return dec.toString("utf8");
}
