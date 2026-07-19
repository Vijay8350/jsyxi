import "server-only";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { randomToken, sha256hex } from "@/lib/crypto";

const USER_COOKIE = "jsyxi_session";
const STAFF_COOKIE = "jsyxi_staff";
const SESSION_TTL_DAYS = 30;

function ttlDate(): Date {
  return new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
}

const baseCookie = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

// ── Customer (User) sessions ────────────────────────────────────────────────
export async function createUserSession(userId: string, meta?: { userAgent?: string; ip?: string }) {
  const token = randomToken();
  const expiresAt = ttlDate();
  await prisma.session.create({
    data: { userId, hashedId: sha256hex(token), expiresAt, userAgent: meta?.userAgent, ip: meta?.ip },
  });
  const jar = await cookies();
  jar.set(USER_COOKIE, token, { ...baseCookie, expires: expiresAt });
}

export async function getUserSession() {
  const jar = await cookies();
  const token = jar.get(USER_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { hashedId: sha256hex(token) },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  return session;
}

export async function destroyUserSession() {
  const jar = await cookies();
  const token = jar.get(USER_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { hashedId: sha256hex(token) } });
  }
  jar.delete(USER_COOKIE);
}

// ── Staff (StaffUser) sessions ──────────────────────────────────────────────
export async function createStaffSession(staffId: string) {
  const token = randomToken();
  const expiresAt = ttlDate();
  await prisma.staffSession.create({ data: { staffId, hashedId: sha256hex(token), expiresAt } });
  const jar = await cookies();
  jar.set(STAFF_COOKIE, token, { ...baseCookie, expires: expiresAt });
}

export async function getStaffSession() {
  const jar = await cookies();
  const token = jar.get(STAFF_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.staffSession.findUnique({
    where: { hashedId: sha256hex(token) },
    include: { staff: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  if (session.staff.status !== "active") return null;
  return session;
}

export async function destroyStaffSession() {
  const jar = await cookies();
  const token = jar.get(STAFF_COOKIE)?.value;
  if (token) {
    await prisma.staffSession.deleteMany({ where: { hashedId: sha256hex(token) } });
  }
  jar.delete(STAFF_COOKIE);
}
