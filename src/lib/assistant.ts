// Shared AI assistant backend. Answers a visitor message using ONLY the provided
// knowledge base (business info + Q&A) via the DeepSeek API. The API key is read
// from process.env server-side and never reaches the browser. Used by both the
// embeddable Chatbot widget (/api/embed/chat/[key]) and the site-wide assistant
// (/api/assistant).

export type AssistantMsg = { role: "user" | "assistant"; content: string };

export type AssistantKnowledge = {
  botName?: string;
  businessInfo?: string;
  knowledge?: { question: string; answer: string }[];
  /** Pre-retrieved reference material (e.g. from the admin knowledge base). */
  knowledgeBase?: string;
};

export type AssistantResult = { ok: boolean; reply: string; error?: string };

/** Normalize an untrusted history array from a request body. */
export function parseHistory(raw: unknown): AssistantMsg[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((m): m is AssistantMsg => !!m && typeof m === "object" && "content" in m && typeof (m as AssistantMsg).content === "string")
    .slice(-6)
    .map((m) => ({ role: (m as AssistantMsg).role === "assistant" ? "assistant" : "user", content: String((m as AssistantMsg).content).slice(0, 1000) }));
}

export async function askAssistant(
  cfg: AssistantKnowledge,
  message: string,
  history: AssistantMsg[],
  fallback: string,
): Promise<AssistantResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return { ok: false, reply: fallback, error: "ai_unconfigured" };

  const botName = cfg.botName || "Assistant";
  const businessInfo = cfg.businessInfo || "";
  const knowledge = (cfg.knowledge || [])
    .map((k) => `Q: ${String(k.question ?? "")}\nA: ${String(k.answer ?? "")}`)
    .filter((s) => s.length > 6)
    .join("\n\n");

  const system = [
    `You are ${botName}, a friendly, knowledgeable assistant embedded on a business website. You help visitors by answering their questions clearly and genuinely helpfully.`,
    "Base every answer on the knowledge provided below (business information, Q&A, and reference articles). You may synthesize across multiple entries and explain in your own words, but never invent facts, prices, policies, or features that the knowledge does not support. If something isn't covered, say you're not certain and suggest contacting the team.",
    "Keep replies concise and conversational — usually 1–4 sentences, warm and natural. When it's genuinely helpful, point the visitor to a relevant next step (such as starting free, the pricing page, or booking a consultation).",
    businessInfo ? `Business information:\n${businessInfo}` : "",
    knowledge ? `Common Q&A:\n${knowledge}` : "",
    cfg.knowledgeBase ? `Reference articles (most relevant to this question):\n${cfg.knowledgeBase}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const messages = [{ role: "system", content: system }, ...history, { role: "user", content: message }];

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 22000);
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "deepseek-chat", messages, temperature: 0.35, max_tokens: 500, stream: false }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return { ok: false, reply: fallback, error: `upstream_${res.status}` };
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content?.trim();
    return { ok: true, reply: reply || fallback };
  } catch {
    return { ok: false, reply: fallback, error: "upstream_error" };
  }
}
