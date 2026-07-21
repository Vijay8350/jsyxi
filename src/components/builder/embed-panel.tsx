"use client";

import { useState, useTransition } from "react";
import { Copy, Check, ExternalLink, Trash2, Globe, Rocket, HelpCircle } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/misc";
import { cn } from "@/lib/utils";
import { updateAllowedDomainsAction, softDeleteWidgetAction } from "@/lib/actions/widget";

const PLATFORMS: { key: string; label: string; step: React.ReactNode }[] = [
  { key: "html", label: "Any website", step: <>Paste the snippet just before the closing <code className="rounded bg-slate-100 px-1 text-[11px]">&lt;/body&gt;</code> tag.</> },
  { key: "shopify", label: "Shopify", step: <>Admin → <strong>Online Store → Themes → Edit code</strong>, open <code className="rounded bg-slate-100 px-1 text-[11px]">theme.liquid</code> and paste before <code className="rounded bg-slate-100 px-1 text-[11px]">&lt;/body&gt;</code>.</> },
  { key: "wordpress", label: "WordPress", step: <>Add a <strong>Custom HTML</strong> block where you want it, or drop it into your theme&apos;s footer scripts.</> },
  { key: "react", label: "React / Next", step: <>Render it with a <code className="rounded bg-slate-100 px-1 text-[11px]">&lt;Script&gt;</code> tag (Next.js) or add it to your <code className="rounded bg-slate-100 px-1 text-[11px]">index.html</code>.</> },
];

export function EmbedPanel({
  widgetId, embedKey, appUrl, allowedDomains, published,
}: {
  widgetId: string; embedKey: string; appUrl: string; allowedDomains: string[]; published: boolean;
}) {
  const snippet = `<script async src="${appUrl}/embed/v1.js" data-jsyxi="${embedKey}"></script>`;
  const [platform, setPlatform] = useState("html");
  const [copied, setCopied] = useState(false);
  const [domains, setDomains] = useState(allowedDomains.join("\n"));
  const [domainMsg, setDomainMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const active = PLATFORMS.find((p) => p.key === platform) ?? PLATFORMS[0];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Rocket className="h-4 w-4" />
            </span>
            Install your widget
          </CardTitle>
          <CardDescription>Copy one line of code and paste it into your site — it goes live within minutes.</CardDescription>
        </CardHeader>
        <CardBody className="pt-0">
          {!published && <Alert tone="warning" className="mb-4">Publish your widget first to make this snippet go live.</Alert>}

          {/* Platform tabs */}
          <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
            {PLATFORMS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPlatform(p.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  platform === p.key ? "bg-white text-brand-700 shadow-sm" : "text-slate-500 hover:text-ink",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Step */}
          <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient-deep text-[11px] font-bold text-white">1</span>
            <p>{active.step}</p>
          </div>

          {/* Premium code block */}
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-900/20">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand-400/80" />
                <span className="ml-2 text-[11px] font-medium text-slate-400">embed snippet</span>
              </span>
              <button
                onClick={copy}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200 active:scale-95",
                  copied ? "bg-brand-500/20 text-brand-300" : "bg-white/10 text-slate-200 hover:bg-white/20",
                )}
              >
                {copied ? <><Check className="h-3.5 w-3.5" /> Copied!</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
              <code className="font-mono">
                <span className="text-slate-500">&lt;</span>
                <span className="text-sky-300">script</span>{" "}
                <span className="text-teal-300">async</span>{" "}
                <span className="text-teal-300">src</span>
                <span className="text-slate-500">=</span>
                <span className="text-amber-300">&quot;{appUrl}/embed/v1.js&quot;</span>{" "}
                <span className="text-teal-300">data-jsyxi</span>
                <span className="text-slate-500">=</span>
                <span className="text-amber-300">&quot;{embedKey}&quot;</span>
                <span className="text-slate-500">&gt;&lt;/</span>
                <span className="text-sky-300">script</span>
                <span className="text-slate-500">&gt;</span>
              </code>
            </pre>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={copy} variant={copied ? "accent" : "primary"} className="transition-all">
              {copied ? <><Check className="h-4 w-4" /> Copied to clipboard</> : <><Copy className="h-4 w-4" /> Copy code</>}
            </Button>
            {published && (
              <a href={`${appUrl}/e/${embedKey}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
                <ExternalLink className="h-4 w-4" /> Open live preview
              </a>
            )}
          </div>

          <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-brand-100 bg-brand-50/50 px-3 py-2 text-xs text-slate-600">
            <HelpCircle className="h-4 w-4 shrink-0 text-brand-500" />
            <span>Prefer we install it for you? <a href="/contact?service=widget-setup-installation" className="font-medium text-brand-700 hover:underline">Request free installation →</a></span>
          </div>
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
