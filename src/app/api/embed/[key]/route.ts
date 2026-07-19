import { resolveEmbed } from "@/lib/embed";
import { originAllowed } from "@/lib/metering";
import { renderWidget } from "@/lib/tools/render";
import { corsJson, CORS_HEADERS, requestOrigin } from "@/lib/http";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const resolved = await resolveEmbed(key);
  if (!resolved) return corsJson({ ok: false }); // INV-2: not live → empty render

  // INV-13: origin allow-list check (empty = any).
  const origin = requestOrigin(req);
  if (!originAllowed(resolved.widget.allowedDomains, origin)) {
    return corsJson({ ok: false });
  }

  const { html, css, mode } = renderWidget(resolved.tool.key, resolved.config, {
    id: "jw-root",
    embedKey: resolved.widget.embedKey,
    apiBase: APP_URL,
    branding: resolved.brandingShown,
  });

  return corsJson({ ok: true, toolKey: resolved.tool.key, mode, html, css });
}
