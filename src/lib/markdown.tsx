import React from "react";

/**
 * Minimal, dependency-free Markdown → React renderer.
 *
 * Everything is emitted as React elements (text is auto-escaped by React), so
 * there is NO HTML-injection surface — we never use dangerouslySetInnerHTML.
 * URLs in links/images are sanitized to http(s) / same-origin / mailto only.
 *
 * Supported: # / ## / ### headings, - / * bullet lists, 1. ordered lists,
 * > blockquotes, **bold**, *italic* / _italic_, `code`, [text](url), ![alt](url).
 */

function safeUrl(raw: string): string | null {
  const url = raw.trim();
  if (!url) return null;
  if (url.startsWith("/") || url.startsWith("#")) return url; // same-origin / anchor
  if (/^https?:\/\//i.test(url)) return url;
  if (/^mailto:/i.test(url)) return url;
  return null; // drop javascript:, data:, and anything else
}

type Node = React.ReactNode;

// Replace each regex match inside the string chunks of `input` with a rendered
// node, leaving already-rendered nodes untouched. Lets us layer inline rules.
function splitByRule(
  input: (string | Node)[],
  re: RegExp,
  make: (m: RegExpExecArray, key: string) => Node,
  key: string,
): (string | Node)[] {
  const out: (string | Node)[] = [];
  input.forEach((chunk, ci) => {
    if (typeof chunk !== "string") { out.push(chunk); return; }
    re.lastIndex = 0;
    let last = 0;
    let i = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(chunk)) !== null) {
      if (m.index > last) out.push(chunk.slice(last, m.index));
      out.push(make(m, `${key}-${ci}-${i++}`));
      last = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++; // guard against zero-length loops
    }
    if (last < chunk.length) out.push(chunk.slice(last));
  });
  return out;
}

// Parse inline formatting within a single line of text into React nodes.
function parseInline(text: string, key: string): Node[] {
  let nodes: (string | Node)[] = [text];

  // ![alt](url) — image
  nodes = splitByRule(nodes, /!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, k) => {
    const url = safeUrl(m[2]);
    return url ? (
      // Markdown may contain admin-managed remote hosts that are not part of
      // the curated Next Image allow-list.
      // eslint-disable-next-line @next/next/no-img-element
      <img key={k} src={url} alt={m[1]} loading="lazy" className="my-4 h-auto max-w-full rounded-xl border border-line" />
    ) : m[0];
  }, `${key}-img`);

  // [text](url) — link
  nodes = splitByRule(nodes, /\[([^\]]*)\]\(([^)\s]+)\)/g, (m, k) => {
    const url = safeUrl(m[2]);
    if (!url) return m[0];
    const external = /^https?:/i.test(url);
    return (
      <a
        key={k}
        href={url}
        className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {parseInline(m[1], k)}
      </a>
    );
  }, `${key}-lnk`);

  // **bold**
  nodes = splitByRule(nodes, /\*\*([^*]+)\*\*/g, (m, k) => (
    <strong key={k} className="font-semibold text-ink">{parseInline(m[1], k)}</strong>
  ), `${key}-b`);

  // *italic* or _italic_
  nodes = splitByRule(nodes, /(?<!\*)\*([^*\n]+)\*(?!\*)|_([^_\n]+)_/g, (m, k) => (
    <em key={k}>{parseInline(m[1] ?? m[2], k)}</em>
  ), `${key}-i`);

  // `inline code`
  nodes = splitByRule(nodes, /`([^`]+)`/g, (m, k) => (
    <code key={k} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-800">{m[1]}</code>
  ), `${key}-c`);

  return nodes as Node[];
}

const BULLET = /^\s*[-*]\s+/;
const TASK = /^\s*[-*]\s+\[([ xX])\]\s+/;
const ORDERED = /^\s*\d+\.\s+/;
const QUOTE = /^\s*>\s?/;

// Render a Markdown string into React nodes. Blocks are separated by blank lines.
export function renderMarkdown(body: string): React.ReactElement {
  const blocks = body.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.replace(/\s+$/g, "")).filter((b) => b.trim().length > 0);

  return (
    <div className="space-y-4 text-[17px] leading-relaxed text-slate-700">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const key = `blk-${i}`;

        // Heading (first line drives the whole block)
        if (block.startsWith("### ")) return <h3 key={key} className="pt-3 text-xl font-bold text-ink">{parseInline(block.slice(4), key)}</h3>;
        if (block.startsWith("## ")) return <h2 key={key} className="pt-4 text-2xl font-bold text-ink">{parseInline(block.slice(3), key)}</h2>;
        if (block.startsWith("# ")) return <h2 key={key} className="pt-4 text-2xl font-bold text-ink">{parseInline(block.slice(2), key)}</h2>;

        // Task list
        if (lines.every((l) => TASK.test(l))) {
          return (
            <ul key={key} className="space-y-2">
              {lines.map((l, j) => {
                const task = TASK.exec(l);
                const checked = task?.[1].toLowerCase() === "x";
                return (
                  <li key={`${key}-${j}`} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs font-bold ${
                        checked
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {checked ? "✓" : ""}
                    </span>
                    <span>
                      {parseInline(
                        l.replace(TASK, ""),
                        `${key}-${j}`,
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Bullet list
        if (lines.every((l) => BULLET.test(l))) {
          return (
            <ul key={key} className="list-disc space-y-1 pl-6">
              {lines.map((l, j) => <li key={`${key}-${j}`}>{parseInline(l.replace(BULLET, ""), `${key}-${j}`)}</li>)}
            </ul>
          );
        }

        // Ordered list
        if (lines.every((l) => ORDERED.test(l))) {
          return (
            <ol key={key} className="list-decimal space-y-1 pl-6">
              {lines.map((l, j) => <li key={`${key}-${j}`}>{parseInline(l.replace(ORDERED, ""), `${key}-${j}`)}</li>)}
            </ol>
          );
        }

        // Blockquote
        if (lines.every((l) => QUOTE.test(l))) {
          return (
            <blockquote key={key} className="border-l-4 border-brand-200 pl-4 italic text-slate-600">
              {parseInline(lines.map((l) => l.replace(QUOTE, "")).join(" "), key)}
            </blockquote>
          );
        }

        // Paragraph — soft line breaks preserved
        return (
          <p key={key}>
            {lines.map((l, j) => (
              <React.Fragment key={`${key}-${j}`}>
                {j > 0 && <br />}
                {parseInline(l, `${key}-${j}`)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
