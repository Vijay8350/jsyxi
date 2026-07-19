"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback, useTransition } from "react";
import { ArrowLeft, Check, Cloud, AlertTriangle, Loader2 } from "lucide-react";
import type { ToolConfigSchema, FieldDef } from "@/lib/tools/types";
import { saveDraftAction, publishWidgetAction, unpublishWidgetAction } from "@/lib/actions/widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/misc";
import { FieldControl, ListEditor } from "@/components/builder/fields";
import { PreviewPane } from "@/components/builder/preview-pane";
import { EmbedPanel } from "@/components/builder/embed-panel";
import { cn } from "@/lib/utils";

type SaveState = "idle" | "saving" | "saved" | "conflict" | "error";

export function Builder(props: {
  widgetId: string;
  initialName: string;
  toolKey: string;
  toolName: string;
  schema: ToolConfigSchema;
  initialConfig: Record<string, unknown>;
  initialVersion: number;
  initialStatus: string;
  embedKey: string;
  allowedDomains: string[];
  appUrl: string;
}) {
  const [config, setConfig] = useState(props.initialConfig);
  const [name, setName] = useState(props.initialName);
  const [version, setVersion] = useState(props.initialVersion);
  const [status, setStatus] = useState(props.initialStatus);
  const [tab, setTab] = useState(props.schema.tabs[0]?.key ?? "content");
  const [save, setSave] = useState<SaveState>("idle");
  const [panel, setPanel] = useState<"design" | "embed">("design");
  const [publishMsg, setPublishMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startPublish] = useTransition();

  const dirtyRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const first = useRef(true);

  const doSave = useCallback(async () => {
    setSave("saving");
    const res = await saveDraftAction({ widgetId: props.widgetId, config, name, configVersion: version });
    if (res.ok && res.configVersion != null) {
      setVersion(res.configVersion);
      dirtyRef.current = false;
      setSave("saved");
    } else if (res.conflict) {
      setSave("conflict");
    } else {
      setSave("error");
    }
  }, [config, name, version, props.widgetId]);

  // Debounced autosave on config/name change.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    dirtyRef.current = true;
    setSave("saving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { doSave(); }, 900);
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, name]);

  const setField = (key: string, value: unknown) => setConfig((c) => ({ ...c, [key]: value }));

  const publish = () => {
    startPublish(async () => {
      // Flush any pending edits first so published_config matches the editor.
      if (dirtyRef.current || save === "saving") await doSave();
      const res = await publishWidgetAction(props.widgetId);
      if (res.ok) { setStatus("published_active"); setPublishMsg({ ok: true, text: res.message ?? "Published." }); }
      else setPublishMsg({ ok: false, text: res.error ?? "Could not publish." });
    });
  };
  const unpublish = () => {
    startPublish(async () => {
      const res = await unpublishWidgetAction(props.widgetId);
      if (res.ok) { setStatus("unpublished"); setPublishMsg({ ok: true, text: res.message ?? "Unpublished." }); }
      else setPublishMsg({ ok: false, text: res.error ?? "Error" });
    });
  };

  const isLive = status === "published_active";
  const tabFields = props.schema.fields.filter((f) => f.group === tab);

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/app/widgets" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-ink"><ArrowLeft className="h-5 w-5" /></Link>
          <div>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9 w-56 font-semibold" aria-label="Widget name" />
            <div className="mt-1 flex items-center gap-2 px-1">
              <Badge tone={isLive ? "green" : status === "unpublished" ? "slate" : "slate"}>{isLive ? "Live" : status === "unpublished" ? "Unpublished" : "Draft"}</Badge>
              <SaveIndicator state={save} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isLive && <Button variant="secondary" onClick={unpublish} disabled={pending}>Unpublish</Button>}
          <Button onClick={publish} disabled={pending}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}{isLive ? "Update & republish" : "Publish"}</Button>
        </div>
      </div>

      {publishMsg && <Alert tone={publishMsg.ok ? "success" : "error"}>{publishMsg.text}</Alert>}
      {save === "conflict" && <Alert tone="warning" title="Edited elsewhere">This widget was changed in another tab. Reload to get the latest version before editing.</Alert>}

      {/* Panel switch */}
      <div className="flex gap-1 border-b border-line">
        <PanelTab active={panel === "design"} onClick={() => setPanel("design")}>Design</PanelTab>
        <PanelTab active={panel === "embed"} onClick={() => setPanel("embed")}>Embed &amp; settings</PanelTab>
      </div>

      {panel === "design" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Editor */}
          <div className="rounded-xl border border-line bg-white shadow-sm">
            <div className="flex gap-1 overflow-x-auto border-b border-line px-2">
              {props.schema.tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn("whitespace-nowrap px-3 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                    tab === t.key ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500 hover:text-ink")}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="space-y-4 p-5">
              {tabFields.map((f) => <FieldRow key={f.key} field={f} value={config[f.key]} onChange={(v) => setField(f.key, v)} />)}
              {tabFields.length === 0 && <p className="py-6 text-center text-sm text-slate-400">No settings in this tab.</p>}
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <PreviewPane toolKey={props.toolKey} config={config} />
          </div>
        </div>
      ) : (
        <EmbedPanel widgetId={props.widgetId} embedKey={props.embedKey} appUrl={props.appUrl} allowedDomains={props.allowedDomains} published={isLive} />
      )}
    </div>
  );
}

function FieldRow({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  if (field.type === "list") {
    return (
      <div>
        <Label>{field.label}</Label>
        <ListEditor field={field} value={value} onChange={onChange} />
        {field.help && <p className="mt-1 text-xs text-slate-500">{field.help}</p>}
      </div>
    );
  }
  if (field.type === "toggle") {
    return (
      <div className="flex items-center justify-between gap-4">
        <div>
          <Label className="mb-0">{field.label}</Label>
          {field.help && <p className="text-xs text-slate-500">{field.help}</p>}
        </div>
        <FieldControl field={field} value={value} onChange={onChange} />
      </div>
    );
  }
  return (
    <div>
      <Label>{field.label}</Label>
      <FieldControl field={field} value={value} onChange={onChange} />
      {field.help && <p className="mt-1 text-xs text-slate-500">{field.help}</p>}
    </div>
  );
}

function SaveIndicator({ state }: { state: SaveState }) {
  if (state === "saving") return <span className="flex items-center gap-1 text-xs text-slate-400"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</span>;
  if (state === "saved") return <span className="flex items-center gap-1 text-xs text-emerald-600"><Cloud className="h-3.5 w-3.5" /> Saved</span>;
  if (state === "error") return <span className="flex items-center gap-1 text-xs text-red-500"><AlertTriangle className="h-3.5 w-3.5" /> Save failed</span>;
  return null;
}

function PanelTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn("px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors", active ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500 hover:text-ink")}>
      {children}
    </button>
  );
}
