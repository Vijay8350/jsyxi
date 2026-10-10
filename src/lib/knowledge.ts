import { prisma } from "@/lib/db";

// Lightweight keyword retrieval shared by the site assistant (DB knowledge base)
// and the embeddable Chatbot widget (its own Q&A + knowledge-base config). No
// embeddings/external service: each chunk is scored by how well the question's
// terms hit its title/keywords/text, then the top few are returned as one
// char-budgeted context block. Lets a knowledge base grow large while only the
// relevant slice is sent to DeepSeek per question.

export type KnowledgeChunk = { title?: string; text: string; keywords?: string };

const STOP = new Set([
  "the", "and", "for", "are", "you", "how", "can", "does", "did", "what", "why", "who", "when", "where",
  "with", "your", "from", "this", "that", "have", "has", "had", "will", "would", "should", "could",
  "is", "it", "to", "of", "do", "in", "on", "at", "or", "an", "a", "my", "me", "we", "us", "our", "i",
  "about", "any", "there", "here", "get", "use", "need", "want", "please", "tell", "give",
]);

function tokenize(q: string): string[] {
  return Array.from(
    new Set(
      q.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)),
    ),
  );
}

function countOccurrences(hay: string, term: string, cap: number): number {
  let idx = hay.indexOf(term);
  let n = 0;
  while (idx > -1 && n < cap) {
    n++;
    idx = hay.indexOf(term, idx + term.length);
  }
  return n;
}

/**
 * Rank in-memory knowledge chunks against a question and return the most relevant
 * ones as one context string (capped to ~`charBudget` chars). Pure — no I/O.
 */
export function rankKnowledge(question: string, chunks: KnowledgeChunk[], limit = 6, charBudget = 6500): string {
  if (!chunks.length) return "";
  const terms = tokenize(question);
  const scored = chunks
    .map((c) => {
      const title = (c.title ?? "").toLowerCase();
      const kw = (c.keywords ?? "").toLowerCase();
      const body = `${c.title ?? ""} ${c.keywords ?? ""} ${c.text}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 4;
        if (kw.includes(t)) score += 3;
        score += countOccurrences(body, t, 4);
      }
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score);

  // No matches → fall back to the first few chunks for general context.
  const chosen = (scored.length ? scored.map((x) => x.c) : chunks.slice(0, Math.min(limit, 4))).slice(0, limit);

  const blocks: string[] = [];
  let budget = charBudget;
  for (const c of chosen) {
    const block = (c.title ? `### ${c.title}\n${c.text}` : c.text).slice(0, budget);
    if (!block.trim()) break;
    blocks.push(block);
    budget -= block.length;
    if (budget <= 200) break;
  }
  return blocks.join("\n\n");
}

/** Site assistant: rank the admin-managed KnowledgeArticle table for a question. */
export async function retrieveKnowledge(question: string, limit = 6, charBudget = 6500): Promise<string> {
  let articles: { title: string; content: string; keywords: string | null }[];
  try {
    articles = await prisma.knowledgeArticle.findMany({
      where: { enabled: true },
      orderBy: { sortOrder: "asc" },
      select: { title: true, content: true, keywords: true },
    });
  } catch {
    return ""; // table missing / DB hiccup → assistant falls back to its base config
  }
  const chunks: KnowledgeChunk[] = articles.map((a) => ({ title: a.title, text: a.content, keywords: a.keywords ?? undefined }));
  return rankKnowledge(question, chunks, limit, charBudget);
}

/**
 * Embeddable Chatbot widget: build chunks from the widget's own Q&A list plus a
 * free-text knowledge base (split into paragraphs) and return the most relevant.
 */
export function retrieveWidgetKnowledge(
  question: string,
  qa: { question: string; answer: string }[],
  knowledgeBase: string,
  limit = 6,
  charBudget = 5000,
): string {
  const chunks: KnowledgeChunk[] = [];
  for (const q of qa) {
    const qq = String(q.question ?? "").trim();
    const aa = String(q.answer ?? "").trim();
    if (qq || aa) chunks.push({ title: qq || undefined, text: `Q: ${qq}\nA: ${aa}`, keywords: qq });
  }
  for (const para of String(knowledgeBase ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)) {
    chunks.push({ text: para });
  }
  return rankKnowledge(question, chunks, limit, charBudget);
}
