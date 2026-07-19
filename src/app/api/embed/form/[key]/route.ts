import { resolveEmbed } from "@/lib/embed";
import { originAllowed } from "@/lib/metering";
import { createLead } from "@/lib/leads";
import { sha256hex } from "@/lib/crypto";
import { CORS_HEADERS, corsJson, requestOrigin, readBody } from "@/lib/http";
import type { LeadSource } from "@/generated/prisma";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// Embedded Form widget submission → customer's own Lead (shown in Service Requests, §9.10).
export async function POST(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const resolved = await resolveEmbed(key);
  if (!resolved || resolved.tool.key !== "form") return corsJson({ ok: false }, 404);

  const origin = requestOrigin(req);
  if (!originAllowed(resolved.widget.allowedDomains, origin)) return corsJson({ ok: false }, 403);

  const cfg = resolved.config;
  if (cfg.captureAsLead === false) return corsJson({ ok: true }); // rendering-only form

  const body = await readBody(req);
  const val = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const name = val("name") || val("fullname") || "Website visitor";
  const email = val("email");
  if (!email) return corsJson({ ok: false, error: "email required" }, 400);
  const phone = val("phone") || val("tel") || null;

  // Fold any extra fields into the message.
  const known = new Set(["name", "fullname", "email", "phone", "tel", "message"]);
  const extras = Object.entries(body)
    .filter(([k]) => !known.has(k))
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join("\n");
  const message = [val("message"), extras].filter(Boolean).join("\n") || null;

  const topic = typeof cfg.serviceTopic === "string" && cfg.serviceTopic ? cfg.serviceTopic : null;
  const source: LeadSource = topic === "quote" ? "quote" : topic === "consultation" ? "consultation" : "lead_magnet";
  const requestKey = sha256hex(`${resolved.widget.id}|${email}|${message ?? ""}`).slice(0, 40);

  await createLead({
    source,
    serviceTopic: topic,
    name,
    email,
    phone,
    message,
    workspaceId: resolved.widget.workspaceId,
    requestKey,
  });

  return corsJson({ ok: true });
}
