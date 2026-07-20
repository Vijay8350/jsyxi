"use client";

import { useActionState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2, ExternalLink } from "lucide-react";
import { saveServiceAction, deleteServiceAction } from "@/lib/actions/admin/services";
import { initialActionState } from "@/lib/actions/result";
import { SERVICE_ICON_KEYS } from "@/lib/services/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/misc";

export type ServiceValues = {
  id: string;
  title: string;
  slug: string;
  icon: string;
  tagline: string | null;
  summary: string;
  description: string;
  features: string[];
  sortOrder: number;
  status: "draft" | "published";
};

function ServiceFields({ s }: { s?: ServiceValues }) {
  const uid = s?.id ?? "new";
  return (
    <>
      {s && <input type="hidden" name="serviceId" value={s.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" htmlFor={`s-title-${uid}`}>
          <Input id={`s-title-${uid}`} name="title" defaultValue={s?.title} required />
        </Field>
        <Field label="Slug" htmlFor={`s-slug-${uid}`} hint="Leave blank to derive from title">
          <Input id={`s-slug-${uid}`} name="slug" defaultValue={s?.slug} />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Icon" htmlFor={`s-icon-${uid}`}>
          <Select id={`s-icon-${uid}`} name="icon" defaultValue={s?.icon ?? "sparkles"}>
            {SERVICE_ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
          </Select>
        </Field>
        <Field label="Order" htmlFor={`s-order-${uid}`} hint="Lower shows first">
          <Input id={`s-order-${uid}`} name="sortOrder" type="number" min={0} defaultValue={s?.sortOrder ?? 0} />
        </Field>
        <Field label="Status" htmlFor={`s-status-${uid}`}>
          <Select id={`s-status-${uid}`} name="status" defaultValue={s?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Field>
      </div>
      <Field label="Tagline" htmlFor={`s-tag-${uid}`} hint="Short one-liner shown under the title">
        <Input id={`s-tag-${uid}`} name="tagline" defaultValue={s?.tagline ?? ""} />
      </Field>
      <Field label="Summary" htmlFor={`s-sum-${uid}`} hint="One or two sentences for the card">
        <Textarea id={`s-sum-${uid}`} name="summary" defaultValue={s?.summary} className="min-h-16" required />
      </Field>
      <Field label="Description" htmlFor={`s-desc-${uid}`} hint="Full text for the detail page (blank line = new paragraph)">
        <Textarea id={`s-desc-${uid}`} name="description" defaultValue={s?.description} className="min-h-32" required />
      </Field>
      <Field label="Features" htmlFor={`s-feat-${uid}`} hint="One per line">
        <Textarea id={`s-feat-${uid}`} name="features" defaultValue={s?.features.join("\n")} className="min-h-28" />
      </Field>
    </>
  );
}

export function ServiceEditor({ item }: { item: ServiceValues }) {
  const [state, action] = useActionState(saveServiceAction, initialActionState);
  const [deleting, startDelete] = useTransition();
  const live = item.status === "published" ? `/services/${item.slug}` : null;

  return (
    <details className="group border-b border-line last:border-0">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 hover:bg-slate-50">
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-ink">{item.title}</span>
          <span className="block truncate text-xs text-slate-500">/services/{item.slug} · order {item.sortOrder}</span>
        </span>
        <Pencil className="h-4 w-4 text-slate-300 group-open:text-brand-500" />
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-3">
          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
          <ServiceFields s={item} />
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <SubmitButton size="sm" pendingText="Saving…">Save</SubmitButton>
            {live && (
              <Link href={live} target="_blank" className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                <ExternalLink className="h-4 w-4" /> View live
              </Link>
            )}
            <Button
              type="button" variant="outlineDanger" size="sm" disabled={deleting} className="ml-auto"
              onClick={() => {
                if (confirm(`Delete "${item.title}"? This removes it from the site and cannot be undone.`)) {
                  startDelete(() => { void deleteServiceAction(item.id); });
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

export function ServiceCreate() {
  const [state, action] = useActionState(saveServiceAction, initialActionState);
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium text-brand-600 hover:bg-slate-50">
        <Plus className="h-4 w-4" /> New service
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-3">
          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
          <ServiceFields />
          <SubmitButton size="sm" pendingText="Creating…">Create</SubmitButton>
        </form>
      </div>
    </details>
  );
}
