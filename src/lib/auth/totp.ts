import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import { encryptSecret, decryptSecret } from "@/lib/crypto";

const ISSUER = "jsyxi";

function makeTotp(base32: string, label: string): OTPAuth.TOTP {
  return new OTPAuth.TOTP({
    issuer: ISSUER,
    label,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(base32),
  });
}

/** Create a new TOTP secret; returns the base32 plaintext + encrypted form + provisioning URI. */
export function createTotpSecret(label: string): {
  base32: string;
  encrypted: string;
  uri: string;
} {
  const secret = new OTPAuth.Secret({ size: 20 });
  const base32 = secret.base32;
  const totp = makeTotp(base32, label);
  return { base32, encrypted: encryptSecret(base32), uri: totp.toString() };
}

/** Render an otpauth provisioning URI as a data-URL QR code. */
export async function totpQrDataUrl(uri: string): Promise<string> {
  return QRCode.toDataURL(uri, { margin: 1, width: 220 });
}

/** Verify a 6-digit code against an encrypted secret (±1 window for clock drift). */
export function verifyTotp(encryptedSecret: string, token: string, label = ISSUER): boolean {
  try {
    const base32 = decryptSecret(encryptedSecret);
    const totp = makeTotp(base32, label);
    const delta = totp.validate({ token: token.replace(/\s/g, ""), window: 1 });
    return delta !== null;
  } catch {
    return false;
  }
}
