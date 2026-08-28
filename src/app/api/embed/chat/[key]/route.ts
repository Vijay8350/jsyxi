import { resolveEmbed } from "@/lib/embed";
import { originAllowed } from "@/lib/metering";
import { CORS_HEADERS, corsJson, requestOrigin, readBody } from "@/lib/http";
import { askAssistant, parseHistory } from "@/lib/assistant";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// AI chat for the embeddable Chatbot widget. Answers from the widget's own
// published knowledge base (business info + Q&A — the owner's training data) via
// DeepSeek. Origin-gated (INV-13); degrades to a fallback (client falls back to
// its built-in FAQ matching) when no API key is configured.
export async function POST(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const resolved = await resolveEmbed(key);
  if (!resolved || resolved.tool.key !== "chatbot") return corsJson({ ok: false }, 404);

  const origin = requestOrigin(req);
  if (!originAllowed(resolved.widget.allowedDomains, origin)) return corsJson({ ok: false }, 403);

  const cfg = resolved.config as Record<string, unknown>;
  const fallback =
    (typeof cfg.fallbackMessage === "string" && cfg.fallbackMessage) ||
    "I'm not sure about that — please reach out to our team and we'll help.";

  if (cfg.aiEnabled === false) return corsJson({ ok: false, reply: fallback, error: "ai_disabled" });

  const body = await readBody(req);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
  if (!message) return corsJson({ ok: false, reply: fallback, error: "empty" }, 400);

  const knowledge = Array.isArray(cfg.knowledge)
    ? (cfg.knowledge as Record<string, unknown>[]).map((k) => ({ question: String(k.question ?? ""), answer: String(k.answer ?? "") }))
    : [];

  const result = await askAssistant(
    { botName: typeof cfg.botName === "string" ? cfg.botName : undefined, businessInfo: typeof cfg.businessInfo === "string" ? cfg.businessInfo : "", knowledge },
    message,
    parseHistory(body.history),
    fallback,
  );
  return corsJson(result);
}
