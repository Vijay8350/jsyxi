"use client";

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { FieldDef } from "@/lib/tools/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Val = unknown;

export function FieldControl({ field, value, onChange }: { field: FieldDef; value: Val; onChange: (v: Val) => void }) {
  switch (field.type) {
    case "textarea":
      return <Textarea value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
    case "number":
      return (
        <Input
          type="number" value={value === "" || value == null ? "" : Number(value)} min={field.min} max={field.max}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        />
      );
    case "color":
      return (
        <div className="flex items-center gap-2">
          <input type="color" value={String(value ?? "#000000")} onChange={(e) => onChange(e.target.value)} className="h-9 w-12 cursor-pointer rounded border border-line bg-white" />
          <Input value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className="w-32 font-mono text-xs" />
        </div>
      );
    case "select":
      return (
        <Select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </Select>
      );
    case "toggle":
      return <Toggle checked={Boolean(value)} onChange={onChange} />;
    case "datetime": {
      const local = toLocalInput(String(value ?? ""));
      return <Input type="datetime-local" value={local} onChange={(e) => onChange(fromLocalInput(e.target.value))} />;
    }
    case "image":
      return <Input value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder="https://…/image.jpg" />;
    case "url":
    case "tel":
    case "email":
    case "text":
    default:
      return <Input type={field.type === "email" ? "email" : field.type === "tel" ? "tel" : "text"} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
  }
}

export function ListEditor({ field, value, onChange }: { field: FieldDef; value: Val; onChange: (v: Val) => void }) {
  const items: Record<string, unknown>[] = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
  const itemFields = field.itemFields ?? [];

  const update = (idx: number, key: string, v: Val) => {
    const next = items.map((it, i) => (i === idx ? { ...it, [key]: v } : it));
    onChange(next);
  };
  const add = () => {
    const blank: Record<string, unknown> = {};
    for (const f of itemFields) blank[f.key] = f.default;
    onChange([...items, blank]);
  };
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-lg border border-line bg-slate-50/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Item {idx + 1}</span>
            <div className="flex items-center gap-1">
              <IconBtn onClick={() => move(idx, -1)} disabled={idx === 0}><ChevronUp className="h-4 w-4" /></IconBtn>
              <IconBtn onClick={() => move(idx, 1)} disabled={idx === items.length - 1}><ChevronDown className="h-4 w-4" /></IconBtn>
              <IconBtn onClick={() => remove(idx)} danger><Trash2 className="h-4 w-4" /></IconBtn>
            </div>
          </div>
          <div className="space-y-2.5">
            {itemFields.map((f) => (
              <div key={f.key}>
                <Label className="mb-1 text-xs">{f.label}</Label>
                <FieldControl field={f} value={item[f.key]} onChange={(v) => update(idx, f.key, v)} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-500 hover:border-brand-300 hover:text-brand-600">
        <Plus className="h-4 w-4" /> {field.addLabel ?? "Add item"}
      </button>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors", checked ? "bg-brand-600" : "bg-slate-300")}
    >
      <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform", checked ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}

function IconBtn({ children, onClick, disabled, danger }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; danger?: boolean }) {
  return (
    <button
      type="button" onClick={onClick} disabled={disabled}
      className={cn("rounded p-1 text-slate-400 hover:bg-white disabled:opacity-30", danger && "hover:text-red-600")}
    >
      {children}
    </button>
  );
}

function toLocalInput(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 16);
}
function fromLocalInput(local: string): string {
  if (!local) return "";
  const d = new Date(local);
  return isNaN(d.getTime()) ? "" : d.toISOString();
}
