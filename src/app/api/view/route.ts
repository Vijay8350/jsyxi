import { resolveEmbed } from "@/lib/embed";
import { recordView, originAllowed, isBot } from "@/lib/metering";
import { sha256hex } from "@/lib/crypto";
import { CORS_HEADERS, requestOrigin, readBody } from "@/lib/http";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// F-VIEW beacon: one counted render, after publish/origin/bot/dedup gates (INV-2/13).
export async function POST(req: Request) {
  const body = await readBody(req);
  const key = String(body.key ?? "");
  if (!key) return new Response(null, { status: 204, headers: CORS_HEADERS });

  const resolved = await resolveEmbed(key);
  if (!resolved) return new Response(null, { status: 204, headers: CORS_HEADERS });

  // INV-13: trust only the browser-set Origin/Referer header, never a client-supplied body field
  // (page JS cannot forge the Origin header; body.o could be spoofed to inflate metering).
  const origin = requestOrigin(req);
  if (!originAllowed(resolved.widget.allowedDomains, origin)) {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (isBot(req.headers.get("user-agent"))) {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const visitorHash = sha256hex(String(body.v ?? "anon") + "|" + resolved.widget.id);
  const pageHash = sha256hex(String(body.p ?? "/"));

  await recordView({
    widgetId: resolved.widget.id,
    workspaceId: resolved.widget.workspaceId,
    toolId: resolved.widget.toolId,
    tz: resolved.workspace.timezone,
    visitorHash,
    pageHash,
  });

  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
