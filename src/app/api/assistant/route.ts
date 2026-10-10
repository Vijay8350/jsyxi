import { corsJson, requestOrigin, readBody } from "@/lib/http";
import { askAssistant, parseHistory } from "@/lib/assistant";
import { retrieveKnowledge } from "@/lib/knowledge";
import { SITE_ASSISTANT_CONFIG, SITE_ASSISTANT_FALLBACK } from "@/lib/site-assistant";

const APP_URL = process.env.APP_URL ?? "";

// Same-origin only: the site assistant is for jsyxi's own marketing pages, not a
// public embed. Allow requests with no Origin (same-origin navigations) or an
// Origin whose host matches APP_URL.
function sameOrigin(req: Request): boolean {
  const origin = requestOrigin(req);
  if (!origin) return true;
  try {
    const oh = new URL(origin).host;
    const appHost = APP_URL ? new URL(APP_URL).host : "";
    const reqHost = (() => { try { return new URL(req.url).host; } catch { return ""; } })();
    return oh === appHost || oh === reqHost;
  } catch {
    return false;
  }
}

// Site-wide AI assistant (the floating bubble on every marketing page). Answers
// from the jsyxi knowledge base in src/lib/site-assistant.ts via DeepSeek.
export async function POST(req: Request) {
  if (!sameOrigin(req)) return corsJson({ ok: false, reply: SITE_ASSISTANT_FALLBACK, error: "forbidden" }, 403);

  const body = await readBody(req);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 1000) : "";
  if (!message) return corsJson({ ok: false, reply: SITE_ASSISTANT_FALLBACK, error: "empty" }, 400);

  // Pull the most relevant admin-managed knowledge-base articles for this question.
  const knowledgeBase = await retrieveKnowledge(message);

  const result = await askAssistant(
    {
      botName: SITE_ASSISTANT_CONFIG.botName,
      businessInfo: SITE_ASSISTANT_CONFIG.businessInfo,
      knowledge: [...SITE_ASSISTANT_CONFIG.knowledge],
      knowledgeBase,
    },
    message,
    parseHistory(body.history),
    SITE_ASSISTANT_FALLBACK,
  );
  return corsJson(result);
}
