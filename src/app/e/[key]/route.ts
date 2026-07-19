import { resolveEmbed } from "@/lib/embed";
import { buildWidgetDocument } from "@/lib/tools/render/document";

// Standalone render of a published widget (testing / iframe target). No metering here —
// views are counted via the loader beacon on real third-party pages (F-VIEW).
const EMPTY = `<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>`;

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const resolved = await resolveEmbed(key);
  const body = resolved
    ? buildWidgetDocument(resolved.tool.key, resolved.config, {
        embedKey: resolved.widget.embedKey,
        apiBase: process.env.APP_URL ?? "",
        branding: resolved.brandingShown,
      })
    : EMPTY; // INV-2: silent empty when not live

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Frame-Options": "ALLOWALL" },
  });
}
