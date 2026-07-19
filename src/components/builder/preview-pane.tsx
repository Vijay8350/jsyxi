"use client";

import { useMemo, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { buildWidgetDocument } from "@/lib/tools/render/document";
import { cn } from "@/lib/utils";

export function PreviewPane({ toolKey, config }: { toolKey: string; config: Record<string, unknown> }) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const srcDoc = useMemo(
    () => buildWidgetDocument(toolKey, config, { preview: true, branding: false }),
    [toolKey, config],
  );

  return (
    <div className="rounded-xl border border-line bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-sm font-medium text-slate-600">Live preview</span>
        <div className="flex rounded-lg border border-line p-0.5">
          <button onClick={() => setDevice("desktop")} className={cn("flex h-7 w-8 items-center justify-center rounded-md", device === "desktop" ? "bg-brand-600 text-white" : "text-slate-500")}>
            <Monitor className="h-4 w-4" />
          </button>
          <button onClick={() => setDevice("mobile")} className={cn("flex h-7 w-8 items-center justify-center rounded-md", device === "mobile" ? "bg-brand-600 text-white" : "text-slate-500")}>
            <Smartphone className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex justify-center bg-[repeating-conic-gradient(#f1f5f9_0%_25%,#fff_0%_50%)] bg-[length:20px_20px] p-4">
        <iframe
          key={device}
          title="Widget preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-popups allow-same-origin"
          className={cn("h-[460px] w-full rounded-lg border border-line bg-white transition-all", device === "mobile" && "max-w-[390px]")}
        />
      </div>
    </div>
  );
}
