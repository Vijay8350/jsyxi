"use client";

import { useActionState } from "react";
import { Pencil, Plus } from "lucide-react";
import { savePlanAction } from "@/lib/actions/admin/plans";
import { initialActionState } from "@/lib/actions/result";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field, Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button";
import { Alert } from "@/components/ui/misc";

export type PlanValues = {
  id: string;
  name: string;
  slug: string;
  purchaseMode: "single_app" | "all_access";
  billingInterval: "monthly" | "annual";
  priceCurrency: string;
  status: "active" | "hidden" | "retired";
  isFree: boolean;
  priceAmount: number | null;
  annualDiscount: number;
  maxWidgets: number;
  maxMonthlyViews: number;
  maxProjects: number;
  maxMembers: number;
  sortOrder: number;
  aiAccess: boolean;
  brandingRemovable: boolean;
  prioritySupport: boolean;
  freeInstallation: boolean;
  hardViewCutoff: boolean;
};

function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 py-1.5 text-sm text-slate-700">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 rounded border-line text-brand-600 focus:ring-brand-500" />
      {label}
    </label>
  );
}

function Fields({ p }: { p?: PlanValues }) {
  return (
    <>
      {p && <input type="hidden" name="planId" value={p.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" htmlFor={`pl-name-${p?.id ?? "new"}`}>
          <Input id={`pl-name-${p?.id ?? "new"}`} name="name" defaultValue={p?.name} required />
        </Field>
        <Field label="Slug" htmlFor={`pl-slug-${p?.id ?? "new"}`}>
          <Input id={`pl-slug-${p?.id ?? "new"}`} name="slug" defaultValue={p?.slug} placeholder="starter" required />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Price (paise)" htmlFor={`pl-price-${p?.id ?? "new"}`} hint="Minor units; blank/0 for Free">
          <Input id={`pl-price-${p?.id ?? "new"}`} name="priceAmount" type="number" min={0} defaultValue={p?.priceAmount ?? ""} />
        </Field>
        <Field label="Annual discount (paise)" htmlFor={`pl-ad-${p?.id ?? "new"}`}>
          <Input id={`pl-ad-${p?.id ?? "new"}`} name="annualDiscount" type="number" min={0} defaultValue={p?.annualDiscount ?? 0} />
        </Field>
        <Field label="Currency" htmlFor={`pl-cur-${p?.id ?? "new"}`}>
          <Input id={`pl-cur-${p?.id ?? "new"}`} name="priceCurrency" defaultValue={p?.priceCurrency ?? "INR"} maxLength={3} />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Purchase mode" htmlFor={`pl-pm-${p?.id ?? "new"}`}>
          <Select id={`pl-pm-${p?.id ?? "new"}`} name="purchaseMode" defaultValue={p?.purchaseMode ?? "all_access"}>
            <option value="all_access">All access</option>
            <option value="single_app">Single app</option>
          </Select>
        </Field>
        <Field label="Billing interval" htmlFor={`pl-bi-${p?.id ?? "new"}`}>
          <Select id={`pl-bi-${p?.id ?? "new"}`} name="billingInterval" defaultValue={p?.billingInterval ?? "monthly"}>
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </Select>
        </Field>
        <Field label="Status" htmlFor={`pl-st-${p?.id ?? "new"}`}>
          <Select id={`pl-st-${p?.id ?? "new"}`} name="status" defaultValue={p?.status ?? "active"}>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
            <option value="retired">Retired</option>
          </Select>
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        <Field label="Max widgets" htmlFor={`pl-mw-${p?.id ?? "new"}`}>
          <Input id={`pl-mw-${p?.id ?? "new"}`} name="maxWidgets" type="number" min={0} defaultValue={p?.maxWidgets ?? 1} />
        </Field>
        <Field label="Max views / mo" htmlFor={`pl-mv-${p?.id ?? "new"}`}>
          <Input id={`pl-mv-${p?.id ?? "new"}`} name="maxMonthlyViews" type="number" min={0} defaultValue={p?.maxMonthlyViews ?? 1000} />
        </Field>
        <Field label="Max projects" htmlFor={`pl-mp-${p?.id ?? "new"}`}>
          <Input id={`pl-mp-${p?.id ?? "new"}`} name="maxProjects" type="number" min={0} defaultValue={p?.maxProjects ?? 0} />
        </Field>
        <Field label="Max members" htmlFor={`pl-mm-${p?.id ?? "new"}`}>
          <Input id={`pl-mm-${p?.id ?? "new"}`} name="maxMembers" type="number" min={0} defaultValue={p?.maxMembers ?? 1} />
        </Field>
      </div>
      <div>
        <Label>Flags &amp; entitlements</Label>
        <div className="grid gap-x-6 sm:grid-cols-2">
          <Check name="isFree" label="Free plan (price ignored)" defaultChecked={p?.isFree} />
          <Check name="aiAccess" label="AI access" defaultChecked={p?.aiAccess} />
          <Check name="brandingRemovable" label="Branding removable" defaultChecked={p?.brandingRemovable} />
          <Check name="prioritySupport" label="Priority support" defaultChecked={p?.prioritySupport} />
          <Check name="freeInstallation" label="Free installation" defaultChecked={p?.freeInstallation} />
          <Check name="hardViewCutoff" label="Hard view cutoff" defaultChecked={p?.hardViewCutoff} />
        </div>
      </div>
      <Field label="Sort order" htmlFor={`pl-so-${p?.id ?? "new"}`}>
        <Input id={`pl-so-${p?.id ?? "new"}`} name="sortOrder" type="number" min={0} defaultValue={p?.sortOrder ?? 0} className="w-32" />
      </Field>
    </>
  );
}

export function PlanEditor({ plan }: { plan: PlanValues }) {
  const [state, action] = useActionState(savePlanAction, initialActionState);
  return (
    <details className="group border-b border-line last:border-0">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 hover:bg-slate-50">
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium text-ink">{plan.name}</span>
          <span className="block truncate text-xs text-slate-500">/{plan.slug} · {plan.status}</span>
        </span>
        <Pencil className="h-4 w-4 text-slate-300 group-open:text-brand-500" />
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-3">
          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
          <Fields p={plan} />
          <SubmitButton size="sm" pendingText="Saving…">Save plan</SubmitButton>
        </form>
      </div>
    </details>
  );
}

export function PlanCreate() {
  const [state, action] = useActionState(savePlanAction, initialActionState);
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium text-brand-600 hover:bg-slate-50">
        <Plus className="h-4 w-4" /> New plan
      </summary>
      <div className="bg-slate-50/60 px-4 py-4">
        <form action={action} className="space-y-3">
          {state.error && <Alert tone="error">{state.error}</Alert>}
          {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
          <Fields />
          <SubmitButton size="sm" pendingText="Creating…">Create plan</SubmitButton>
        </form>
      </div>
    </details>
  );
}
