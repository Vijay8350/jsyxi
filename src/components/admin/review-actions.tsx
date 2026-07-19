"use client";

import { useActionState } from "react";
import { Star, Plus } from "lucide-react";
import { saveTestimonialAction, toggleTestimonialFlagAction } from "@/lib/actions/admin/reviews";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";
import { Badge } from "@/components/ui/badge";

export type TestimonialRow = {
  id: string;
  authorName: string;
  authorRole: string | null;
  rating: number;
  body: string;
  approved: boolean;
  featured: boolean;
  sortOrder: number;
};

function FlagButton({ id, flag, active, label }: { id: string; flag: "approved" | "featured"; active: boolean; label: string }) {
  const [, action] = useActionState(toggleTestimonialFlagAction, initialActionState);
  return (
    <form action={action}>
      <input type="hidden" name="testimonialId" value={id} />
      <input type="hidden" name="flag" value={flag} />
      <SubmitButton size="sm" variant={active ? "primary" : "secondary"} pendingText="…">
        {active ? label : `Not ${label.toLowerCase()}`}
      </SubmitButton>
    </form>
  );
}

export function TestimonialRowEditor({ t }: { t: TestimonialRow }) {
  const [state, action] = useActionState(saveTestimonialAction, initialActionState);
  return (
    <div className="border-b border-line px-4 py-4 last:border-0">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
        </span>
        {t.approved && <Badge tone="green">Approved</Badge>}
        {t.featured && <Badge tone="brand">Featured</Badge>}
        <div className="ml-auto flex gap-2">
          <FlagButton id={t.id} flag="approved" active={t.approved} label="Approved" />
          <FlagButton id={t.id} flag="featured" active={t.featured} label="Featured" />
        </div>
      </div>
      <form action={action} className="space-y-3">
        <input type="hidden" name="testimonialId" value={t.id} />
        {state.error && <Alert tone="error">{state.error}</Alert>}
        {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Author" htmlFor={`t-name-${t.id}`}><Input id={`t-name-${t.id}`} name="authorName" defaultValue={t.authorName} required /></Field>
          <Field label="Role" htmlFor={`t-role-${t.id}`}><Input id={`t-role-${t.id}`} name="authorRole" defaultValue={t.authorRole ?? ""} /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Rating" htmlFor={`t-rate-${t.id}`}>
              <Select id={`t-rate-${t.id}`} name="rating" defaultValue={String(t.rating)}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r}</option>)}
              </Select>
            </Field>
            <Field label="Sort" htmlFor={`t-sort-${t.id}`}><Input id={`t-sort-${t.id}`} name="sortOrder" type="number" min={0} defaultValue={t.sortOrder} /></Field>
          </div>
        </div>
        <Field label="Body" htmlFor={`t-body-${t.id}`}><Textarea id={`t-body-${t.id}`} name="body" defaultValue={t.body} required /></Field>
        <SubmitButton size="sm" variant="secondary" pendingText="Saving…">Save</SubmitButton>
      </form>
    </div>
  );
}

export function TestimonialCreate() {
  const [state, action] = useActionState(saveTestimonialAction, initialActionState);
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium text-brand-600 hover:bg-slate-50">
        <Plus className="h-4 w-4" /> New testimonial
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-3">
          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Author" htmlFor="t-name-new"><Input id="t-name-new" name="authorName" required /></Field>
            <Field label="Role" htmlFor="t-role-new"><Input id="t-role-new" name="authorRole" /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Rating" htmlFor="t-rate-new">
                <Select id="t-rate-new" name="rating" defaultValue="5">
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r}</option>)}
                </Select>
              </Field>
              <Field label="Sort" htmlFor="t-sort-new"><Input id="t-sort-new" name="sortOrder" type="number" min={0} defaultValue={0} /></Field>
            </div>
          </div>
          <Field label="Body" htmlFor="t-body-new"><Textarea id="t-body-new" name="body" required /></Field>
          <SubmitButton size="sm" pendingText="Creating…">Create testimonial</SubmitButton>
        </form>
      </div>
    </details>
  );
}
