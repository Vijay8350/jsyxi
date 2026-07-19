"use client";

import { useActionState } from "react";
import { Pencil, Plus } from "lucide-react";
import { updateToolAction, saveCategoryAction } from "@/lib/actions/admin/catalog";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";
import { Badge } from "@/components/ui/badge";

export type ToolRow = {
  id: string;
  name: string;
  key: string;
  categoryName: string;
  description: string;
  badges: string[];
  sortOrder: number;
  status: "draft" | "published" | "retired";
};

const STATUS_TONE = { draft: "amber", published: "green", retired: "slate" } as const;

export function ToolEditor({ tool }: { tool: ToolRow }) {
  const [state, action] = useActionState(updateToolAction, initialActionState);
  return (
    <details className="group border-b border-line last:border-0">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 hover:bg-slate-50">
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-ink">{tool.name}</span>
          <span className="block truncate text-xs text-slate-500">{tool.categoryName} · /{tool.key}</span>
        </span>
        {tool.badges.map((b) => <Badge key={b} tone="blue">{b}</Badge>)}
        <Badge tone={STATUS_TONE[tool.status]}>{tool.status}</Badge>
        <Pencil className="h-4 w-4 text-slate-300 group-open:text-brand-500" />
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-1">
          <input type="hidden" name="toolId" value={tool.id} />
          {state.error && <Alert tone="error" className="mb-3">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success" className="mb-3">{state.message}</Alert>}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name" htmlFor={`name-${tool.id}`} error={state.fieldErrors?.name}>
              <Input id={`name-${tool.id}`} name="name" defaultValue={tool.name} required />
            </Field>
            <Field label="Sort order" htmlFor={`sort-${tool.id}`} error={state.fieldErrors?.sortOrder}>
              <Input id={`sort-${tool.id}`} name="sortOrder" type="number" min={0} defaultValue={tool.sortOrder} />
            </Field>
          </div>
          <Field label="Description" htmlFor={`desc-${tool.id}`} error={state.fieldErrors?.description}>
            <Textarea id={`desc-${tool.id}`} name="description" defaultValue={tool.description} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Badges (comma-separated)" htmlFor={`badges-${tool.id}`}>
              <Input id={`badges-${tool.id}`} name="badges" defaultValue={tool.badges.join(", ")} placeholder="New, Popular" />
            </Field>
            <Field label="Status" htmlFor={`status-${tool.id}`}>
              <Select id={`status-${tool.id}`} name="status" defaultValue={tool.status}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="retired">Retired</option>
              </Select>
            </Field>
          </div>
          <SubmitButton size="sm" pendingText="Saving…">Save tool</SubmitButton>
        </form>
      </div>
    </details>
  );
}

export type CategoryRow = { id: string; name: string; status: "active" | "hidden"; toolCount: number };

export function CategoryEditor({ category }: { category: CategoryRow }) {
  const [state, action] = useActionState(saveCategoryAction, initialActionState);
  return (
    <form action={action} className="flex flex-wrap items-end gap-2 border-b border-line px-4 py-3 last:border-0">
      <input type="hidden" name="categoryId" value={category.id} />
      <div className="min-w-40 flex-1">
        <Input name="name" defaultValue={category.name} aria-label="Category name" />
      </div>
      <Select name="status" defaultValue={category.status} className="w-32">
        <option value="active">Active</option>
        <option value="hidden">Hidden</option>
      </Select>
      <span className="text-xs text-slate-400">{category.toolCount} tool(s)</span>
      <SubmitButton size="sm" variant="secondary" pendingText="Saving…">Save</SubmitButton>
      {state.error && <span className="w-full text-xs text-red-600">{state.error}</span>}
      {state.ok && state.message && <span className="w-full text-xs text-emerald-600">{state.message}</span>}
    </form>
  );
}

export function CategoryCreate() {
  const [state, action] = useActionState(saveCategoryAction, initialActionState);
  return (
    <form action={action} className="flex flex-wrap items-end gap-2 px-4 py-3">
      <div className="min-w-40 flex-1">
        <Input name="name" placeholder="New category name" aria-label="New category name" required />
      </div>
      <Select name="status" defaultValue="active" className="w-32">
        <option value="active">Active</option>
        <option value="hidden">Hidden</option>
      </Select>
      <SubmitButton size="sm" pendingText="Creating…"><Plus className="h-4 w-4" /> Add</SubmitButton>
      {state.error && <span className="w-full text-xs text-red-600">{state.error}</span>}
      {state.ok && state.message && <span className="w-full text-xs text-emerald-600">{state.message}</span>}
    </form>
  );
}
