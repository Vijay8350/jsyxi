"use client";

import { useState, useTransition } from "react";
import { Copy, Check, ExternalLink, Trash2, Globe } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/misc";
import { updateAllowedDomainsAction, softDeleteWidgetAction } from "@/lib/actions/widget";

export function EmbedPanel({
  widgetId, embedKey, appUrl, allowedDomains, published,
}: {
  widgetId: string; embedKey: string; appUrl: string; allowedDomains: string[]; published: boolean;
}) {
  const snippet = `<script async src="${appUrl}/embed/v1.js" data-jsyxi="${embedKey}"></script>`;
  const [copied, setCopied] = useState(false);
  const [domains, setDomains] = useState(allowedDomains.join("\n"));
  const [domainMsg, setDomainMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Embed on your site</CardTitle></CardHeader>
        <CardBody className="pt-0">
          {!published && <Alert tone="warning" className="mb-3">Publish your widget to make this snippet go live.</Alert>}
          <p className="mb-2 text-sm text-slate-500">Paste this one line where you want the widget to appear.</p>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 pr-12 text-xs text-slate-100">{snippet}</pre>
            <button onClick={copy} className="absolute right-2 top-2 rounded-md bg-white/10 p-1.5 text-white hover:bg-white/20" aria-label="Copy">
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          {published && (
            <a href={`${appUrl}/e/${embedKey}`} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
              <ExternalLink className="h-4 w-4" /> Open live preview
            </a>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Globe className="h-4 w-4 text-slate-400" /> Allowed domains</CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <p className="mb-2 text-sm text-slate-500">One domain per line. Leave empty to allow any site. Views on other domains aren&apos;t counted.</p>
          <Textarea value={domains} onChange={(e) => setDomains(e.target.value)} placeholder="example.com&#10;shop.example.com" className="font-mono text-xs" />
          {domainMsg && <p className="mt-2 text-xs text-emerald-600">{domainMsg}</p>}
          <Button
            variant="secondary" size="sm" className="mt-3" disabled={pending}
            onClick={() => start(async () => { const r = await updateAllowedDomainsAction(widgetId, domains); setDomainMsg(r.message ?? null); })}
          >
            Save domains
          </Button>
        </CardBody>
      </Card>

      <Card className="border-red-100">
        <CardBody>
          <p className="text-sm font-semibold text-ink">Delete widget</p>
          <p className="mt-1 text-sm text-slate-500">Moves the widget to trash (recoverable for 30 days). Live embeds stop rendering immediately.</p>
          <Button
            variant="outlineDanger" size="sm" className="mt-3" disabled={pending}
            onClick={() => {
              if (confirm("Move this widget to trash? Live embeds will stop rendering immediately.")) {
                start(() => { void softDeleteWidgetAction(widgetId); });
              }
            }}
          >
            <Trash2 className="h-4 w-4" /> Move to trash
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
