"use client";

import { useActionState, useTransition } from "react";
import { Plus, Trash2, BookOpen } from "lucide-react";
import { saveKnowledgeAction, toggleKnowledgeAction, deleteKnowledgeAction } from "@/lib/actions/admin/knowledge";
import { initialActionState } from "@/lib/actions/result";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";
import { Badge } from "@/components/ui/badge";

export type KnowledgeRow = {
  id: string;
  title: string;
  content: string;
  category: string | null;
  keywords: string | null;
  enabled: boolean;
  sortOrder: number;
};

function Fields({ a }: { a?: KnowledgeRow }) {
  const uid = a?.id ?? "new";
  return (
    <>
      {a && <input type="hidden" name="articleId" value={a.id} />}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <Field label="Title" htmlFor={`k-title-${uid}`}><Input id={`k-title-${uid}`} name="title" defaultValue={a?.title} required placeholder="e.g. Pricing & plans" /></Field>
        </div>
        <Field label="Sort" htmlFor={`k-sort-${uid}`}><Input id={`k-sort-${uid}`} name="sortOrder" type="number" min={0} defaultValue={a?.sortOrder ?? 0} /></Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Category" htmlFor={`k-cat-${uid}`} hint="Optional grouping"><Input id={`k-cat-${uid}`} name="category" defaultValue={a?.category ?? ""} placeholder="Pricing, Widgets, Getting started…" /></Field>
        <Field label="Keywords" htmlFor={`k-kw-${uid}`} hint="Extra terms to help the assistant find this"><Input id={`k-kw-${uid}`} name="keywords" defaultValue={a?.keywords ?? ""} placeholder="refund, cancel, money back" /></Field>
      </div>
      <Field label="Content" htmlFor={`k-content-${uid}`} hint="What the assistant should know. Write it plainly — the assistant answers from this.">
        <Textarea id={`k-content-${uid}`} name="content" defaultValue={a?.content} className="min-h-32" required />
      </Field>
    </>
  );
}

export function KnowledgeRowEditor({ a }: { a: KnowledgeRow }) {
  const [state, action] = useActionState(saveKnowledgeAction, initialActionState);
  const [, toggle] = useActionState(toggleKnowledgeAction, initialActionState);
  const [deleting, startDelete] = useTransition();
  return (
    <details className="group border-b border-line last:border-0">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 hover:bg-slate-50">
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-ink">{a.title}</span>
          <span className="block truncate text-xs text-slate-500">{a.category || "Uncategorized"} · {a.content.length} chars</span>
        </span>
        {a.enabled ? <Badge tone="green">Active</Badge> : <Badge tone="amber">Off</Badge>}
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-3">
          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
          <Fields a={a} />
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <SubmitButton size="sm" pendingText="Saving…">Save</SubmitButton>
            <form action={toggle} className="contents">
              <input type="hidden" name="articleId" value={a.id} />
              <SubmitButton size="sm" variant="secondary" pendingText="…">{a.enabled ? "Disable" : "Enable"}</SubmitButton>
            </form>
            <Button
              type="button"
              variant="outlineDanger"
              size="sm"
              disabled={deleting}
              className="ml-auto"
              onClick={() => { if (confirm(`Delete "${a.title}"? The assistant will no longer use it.`)) startDelete(() => { void deleteKnowledgeAction(a.id); }); }}
            >
              <Trash2 className="h-4 w-4" /> {deleting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </form>
      </div>
    </details>
  );
}

export function KnowledgeCreate() {
  const [state, action] = useActionState(saveKnowledgeAction, initialActionState);
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium text-brand-600 hover:bg-slate-50">
        <Plus className="h-4 w-4" /> New article
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-3">
          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
          <Fields />
          <SubmitButton size="sm" pendingText="Creating…"><BookOpen className="h-4 w-4" /> Create article</SubmitButton>
        </form>
      </div>
    </details>
  );
}
