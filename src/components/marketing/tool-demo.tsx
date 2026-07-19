"use client";

import { useEffect, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { ToolConfigSchema, FieldDef } from "@/lib/tools/types";
import { defaultsFromSchema } from "@/lib/tools/types";
import { PreviewPane } from "@/components/builder/preview-pane";
import { FieldControl, ListEditor } from "@/components/builder/fields";
import { Button, ButtonLink } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ToolDemo({ toolKey, schema }: { toolKey: string; schema: ToolConfigSchema }) {
  const storageKey = `jsyxi_demo_${toolKey}`;
  const [config, setConfig] = useState<Record<string, unknown>>(() => defaultsFromSchema(schema));
  const [activeTab, setActiveTab] = useState<string>(schema.tabs[0]?.key ?? "content");

  // Load any previously saved demo config (best-effort, A1-16 handoff).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, unknown>;
        setConfig((c) => ({ ...c, ...saved }));
      }
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const persist = (next: Record<string, unknown>) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const setField = (key: string, value: unknown) => {
    setConfig((c) => {
      const next = { ...c, [key]: value };
      persist(next);
      return next;
    });
  };

  const reset = () => {
    const fresh = defaultsFromSchema(schema);
    setConfig(fresh);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  };

  const tabFields = schema.fields.filter((f) => f.group === activeTab);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Controls */}
      <div className="rounded-2xl border border-line bg-white shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {schema.tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  activeTab === t.key ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={reset} title="Reset demo">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-[460px] space-y-4 overflow-y-auto p-5">
          {tabFields.length === 0 && <p className="text-sm text-slate-400">No options in this tab.</p>}
          {tabFields.map((field: FieldDef) => (
            <div key={field.key}>
              <Label className="mb-1">{field.label}</Label>
              {field.type === "list" ? (
                <ListEditor field={field} value={config[field.key]} onChange={(v) => setField(field.key, v)} />
              ) : (
                <FieldControl field={field} value={config[field.key]} onChange={(v) => setField(field.key, v)} />
              )}
              {field.help && <p className="mt-1 text-xs text-slate-500">{field.help}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Preview + CTA */}
      <div className="space-y-4">
        <PreviewPane toolKey={toolKey} config={config} />
        <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5 text-center">
          <p className="font-semibold text-ink">Like what you see?</p>
          <p className="mt-1 text-sm text-slate-600">
            Sign up free to publish this widget and embed it with one line of code. Your changes here are saved and
            waiting for you.
          </p>
          <ButtonLink href="/signup" className="mt-4">
            Sign up to publish &amp; embed <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
