import { prisma } from "@/lib/db";

// Lightweight keyword retrieval over the admin-managed KnowledgeArticle table.
// No embeddings/external service: scores each enabled article by how well the
// question's terms hit its title/keywords/content, then returns the top few as a
// single context block (char-budgeted) for the DeepSeek prompt. This lets the KB
// grow large while only the relevant slice is sent per question.

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
 * Return a context string of the most relevant knowledge articles for `question`,
 * capped to ~`charBudget` characters. Empty string when the KB has no entries.
 */
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
  if (!articles.length) return "";

  const terms = tokenize(question);
  const scored = articles
    .map((a) => {
      const title = a.title.toLowerCase();
      const body = `${a.title} ${a.keywords ?? ""} ${a.content}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 4;
        if ((a.keywords ?? "").toLowerCase().includes(t)) score += 3;
        score += countOccurrences(body, t, 4);
      }
      return { a, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score);

  // Nothing matched → include the first few articles so the assistant still has
  // general context (these are typically the most important overview entries).
  const chosen = (scored.length ? scored.map((x) => x.a) : articles.slice(0, Math.min(limit, 4))).slice(0, limit);

  const blocks: string[] = [];
  let budget = charBudget;
  for (const a of chosen) {
    const block = `### ${a.title}\n${a.content}`.slice(0, budget);
    if (!block.trim()) break;
    blocks.push(block);
    budget -= block.length;
    if (budget <= 200) break;
  }
  return blocks.join("\n\n");
}
