"use client";

import { useRef, useState } from "react";
import { Bold, Italic, Heading, List, ListOrdered, Link2, ImagePlus, Quote, Eye, Pencil, Loader2, Upload, ImageOff } from "lucide-react";
import { renderMarkdown } from "@/lib/markdown";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// POST a file to the staff media endpoint; returns the public URL to reference it.
async function uploadImage(file: File): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const fd = new FormData();
  fd.append("file", file);
  try {
    const res = await fetch("/api/admin/media", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok) return { ok: false, error: data?.error || `Upload failed (${res.status}).` };
    return { ok: true, url: data.url as string };
  } catch {
    return { ok: false, error: "Upload failed — check your connection." };
  }
}

function ToolButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"
    >
      {children}
    </button>
  );
}

// Markdown body editor: a toolbar (bold, italic, heading, lists, quote, link,
// image upload) over a textarea, plus a Preview tab that renders the same safe
// Markdown the public site uses. The textarea carries `name` so the surrounding
// server-action form submits it unchanged.
export function RichBodyField({
  id,
  name = "body",
  defaultValue = "",
  required,
}: {
  id: string;
  name?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Look the textarea up by id rather than a ref — the shared <Textarea> wrapper
  // does not reliably forward refs, and each field's id is unique on the page.
  const getEl = () => document.getElementById(id) as HTMLTextAreaElement | null;

  function restoreSelection(from: number, to: number) {
    requestAnimationFrame(() => {
      const ta = getEl();
      if (!ta) return;
      ta.focus();
      ta.setSelectionRange(from, to);
    });
  }

  // Wrap the current selection (or a placeholder) with markers, e.g. **…**.
  function wrap(before: string, after: string, placeholder: string) {
    const ta = getEl();
    const start = ta ? ta.selectionStart : value.length;
    const end = ta ? ta.selectionEnd : value.length;
    const sel = value.slice(start, end) || placeholder;
    setValue(value.slice(0, start) + before + sel + after + value.slice(end));
    restoreSelection(start + before.length, start + before.length + sel.length);
  }

  // Add a prefix (e.g. "## ", "- ") to every line the selection touches.
  function linePrefix(prefix: string) {
    const ta = getEl();
    const start = ta ? ta.selectionStart : value.length;
    const end = ta ? ta.selectionEnd : value.length;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const nl = value.indexOf("\n", end);
    const lineEnd = nl === -1 ? value.length : nl;
    const seg = value.slice(lineStart, lineEnd);
    const out = seg.split("\n").map((l) => prefix + l).join("\n");
    setValue(value.slice(0, lineStart) + out + value.slice(lineEnd));
    restoreSelection(lineStart, lineStart + out.length);
  }

  function insertAtCursor(text: string) {
    const ta = getEl();
    const start = ta ? ta.selectionStart : value.length;
    const end = ta ? ta.selectionEnd : value.length;
    setValue(value.slice(0, start) + text + value.slice(end));
    restoreSelection(start + text.length, start + text.length);
  }

  function addLink() {
    const url = window.prompt("Link URL (https://…)");
    if (url) wrap("[", `](${url.trim()})`, "link text");
  }

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    setErr(null);
    const r = await uploadImage(file);
    setBusy(false);
    if (!r.ok) { setErr(r.error); return; }
    const alt = file.name.replace(/\.[^.]+$/, "");
    insertAtCursor(`\n\n![${alt}](${r.url})\n\n`);
  }

  return (
    <div className="rounded-xl border border-line bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-line px-2 py-1.5">
        <ToolButton label="Bold" onClick={() => wrap("**", "**", "bold text")}><Bold className="h-4 w-4" /></ToolButton>
        <ToolButton label="Italic" onClick={() => wrap("*", "*", "italic text")}><Italic className="h-4 w-4" /></ToolButton>
        <ToolButton label="Heading" onClick={() => linePrefix("## ")}><Heading className="h-4 w-4" /></ToolButton>
        <span className="mx-1 h-5 w-px bg-line" />
        <ToolButton label="Bulleted list" onClick={() => linePrefix("- ")}><List className="h-4 w-4" /></ToolButton>
        <ToolButton label="Numbered list" onClick={() => linePrefix("1. ")}><ListOrdered className="h-4 w-4" /></ToolButton>
        <ToolButton label="Quote" onClick={() => linePrefix("> ")}><Quote className="h-4 w-4" /></ToolButton>
        <span className="mx-1 h-5 w-px bg-line" />
        <ToolButton label="Insert link" onClick={addLink}><Link2 className="h-4 w-4" /></ToolButton>
        <button
          type="button"
          title="Upload image"
          aria-label="Upload image"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          Image
        </button>

        <div className="ml-auto inline-flex rounded-md border border-line p-0.5">
          <button
            type="button"
            onClick={() => setTab("write")}
            className={cn("inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium", tab === "write" ? "bg-brand-600 text-white" : "text-slate-500 hover:text-brand-700")}
          >
            <Pencil className="h-3.5 w-3.5" /> Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={cn("inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium", tab === "preview" ? "bg-brand-600 text-white" : "text-slate-500 hover:text-brand-700")}
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={(e) => { void handleFiles(e.target.files); e.target.value = ""; }}
      />

      {err && (
        <p className="flex items-center gap-1.5 border-b border-line bg-red-50 px-3 py-2 text-xs text-red-600">
          <ImageOff className="h-3.5 w-3.5" /> {err}
        </p>
      )}

      {tab === "write" ? (
        <Textarea
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPaste={(e) => {
            const img = Array.from(e.clipboardData.files).find((f) => f.type.startsWith("image/"));
            if (img) { e.preventDefault(); void handleFiles(e.clipboardData.files); }
          }}
          placeholder="Write your article… Use the toolbar for headings, bold, lists, links and images. Markdown supported."
          className="min-h-64 rounded-none border-0 font-mono text-sm focus:ring-0 focus:border-0"
        />
      ) : (
        <div className="min-h-64 px-4 py-4">
          {value.trim() ? renderMarkdown(value) : <p className="text-sm text-slate-400">Nothing to preview yet.</p>}
        </div>
      )}
    </div>
  );
}

// Cover-image field: a URL input (name="coverImage") with an Upload button that
// stores the file and fills in the served URL, plus a thumbnail preview.
export function CoverImageField({ id, name = "coverImage", defaultValue = "" }: { id: string; name?: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    setErr(null);
    const r = await uploadImage(file);
    setBusy(false);
    if (!r.ok) { setErr(r.error); return; }
    setUrl(r.url);
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input id={id} name={name} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… or upload an image" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-sm font-medium text-ink shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50/60 hover:text-brand-700 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => { void handleFiles(e.target.files); e.target.value = ""; }}
        />
      </div>
      {err && <p className="text-xs text-red-600">{err}</p>}
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="Cover preview" className="h-28 w-auto rounded-lg border border-line object-cover" />
      )}
    </div>
  );
}
