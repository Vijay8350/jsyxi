"use client";

import { useActionState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2, ExternalLink } from "lucide-react";
import { saveContentAction, deleteContentAction } from "@/lib/actions/admin/content";
import { initialActionState } from "@/lib/actions/result";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export type ContentValues = {
  id: string;
  type: "blog" | "tutorial" | "case_study" | "portfolio" | "help_article" | "landing";
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  coverImage: string | null;
  status: "draft" | "published";
};

const TYPES: ContentValues["type"][] = ["blog", "tutorial", "case_study", "portfolio", "help_article", "landing"];

// The public URL a published item is visible at (null if the type has no public listing).
function livePath(type: ContentValues["type"], slug: string): string | null {
  if (type === "blog") return `/blog/${slug}`;
  if (type === "case_study") return `/case-studies/${slug}`;
  if (type === "help_article") return `/help/${slug}`;
  return null;
}

function ContentFields({ c }: { c?: ContentValues }) {
  const uid = c?.id ?? "new";
  return (
    <>
      {c && <input type="hidden" name="contentId" value={c.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" htmlFor={`c-title-${uid}`}>
          <Input id={`c-title-${uid}`} name="title" defaultValue={c?.title} required />
        </Field>
        <Field label="Slug" htmlFor={`c-slug-${uid}`} hint="Leave blank to derive from title">
          <Input id={`c-slug-${uid}`} name="slug" defaultValue={c?.slug} />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Type" htmlFor={`c-type-${uid}`}>
          <Select id={`c-type-${uid}`} name="type" defaultValue={c?.type ?? "blog"}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="Status" htmlFor={`c-status-${uid}`}>
          <Select id={`c-status-${uid}`} name="status" defaultValue={c?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Field>
      </div>
      <Field label="Excerpt" htmlFor={`c-ex-${uid}`}>
        <Input id={`c-ex-${uid}`} name="excerpt" defaultValue={c?.excerpt ?? ""} />
      </Field>
      <Field label="Cover image URL" htmlFor={`c-cover-${uid}`}>
        <Input id={`c-cover-${uid}`} name="coverImage" defaultValue={c?.coverImage ?? ""} placeholder="https://…" />
      </Field>
      <Field label="Body" htmlFor={`c-body-${uid}`}>
        <Textarea id={`c-body-${uid}`} name="body" defaultValue={c?.body} className="min-h-40" required />
      </Field>
    </>
  );
}

export function ContentEditor({ item }: { item: ContentValues }) {
  const [state, action] = useActionState(saveContentAction, initialActionState);
  const [deleting, startDelete] = useTransition();
  const live = item.status === "published" ? livePath(item.type, item.slug) : null;

  return (
    <details className="group border-b border-line last:border-0">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 hover:bg-slate-50">
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-ink">{item.title}</span>
          <span className="block truncate text-xs text-slate-500">{item.type} · /{item.slug}</span>
        </span>
        <Pencil className="h-4 w-4 text-slate-300 group-open:text-brand-500" />
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-3">
          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
          <ContentFields c={item} />
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <SubmitButton size="sm" pendingText="Saving…">Save</SubmitButton>
            {live && (
              <Link
                href={live}
                target="_blank"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                <ExternalLink className="h-4 w-4" /> View live
              </Link>
            )}
            <Button
              type="button"
              variant="outlineDanger"
              size="sm"
              disabled={deleting}
              className="ml-auto"
              onClick={() => {
                if (confirm(`Delete "${item.title}"? This removes it from the site and cannot be undone.`)) {
                  startDelete(() => { void deleteContentAction(item.id); });
                }
              }}
            >
              <Trash2 className="h-4 w-4" /> {deleting ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </form>
      </div>
    </details>
  );
}

export function ContentCreate() {
  const [state, action] = useActionState(saveContentAction, initialActionState);
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium text-brand-600 hover:bg-slate-50">
        <Plus className="h-4 w-4" /> New content
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-3">
          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
          <ContentFields />
          <SubmitButton size="sm" pendingText="Creating…">Create</SubmitButton>
        </form>
      </div>
    </details>
  );
}
