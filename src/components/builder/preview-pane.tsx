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
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-shadow duration-300 hover:shadow-md motion-reduce:transition-none">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-sm font-medium text-slate-600">Live preview</span>
        <div className="flex rounded-lg border border-line bg-slate-50/70 p-0.5" role="group" aria-label="Preview device">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            aria-label="Desktop preview"
            aria-pressed={device === "desktop"}
            className={cn(
              "flex h-7 w-8 items-center justify-center rounded-md transition-[color,background-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 motion-reduce:transition-none",
              device === "desktop"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-white hover:text-brand-700",
            )}
          >
            <Monitor className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            aria-label="Mobile preview"
            aria-pressed={device === "mobile"}
            className={cn(
              "flex h-7 w-8 items-center justify-center rounded-md transition-[color,background-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 motion-reduce:transition-none",
              device === "mobile"
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-white hover:text-brand-700",
            )}
          >
            <Smartphone className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex justify-center bg-[repeating-conic-gradient(#f1f5f9_0%_25%,#fff_0%_50%)] bg-[length:20px_20px] p-4">
        <iframe
          title="Widget preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-popups allow-same-origin"
          className={cn(
            "h-[460px] w-full rounded-lg border border-line bg-white transition-[max-width,box-shadow] duration-300 ease-out motion-reduce:transition-none",
            device === "mobile" ? "max-w-[390px] shadow-xl shadow-slate-900/10" : "max-w-full shadow-sm",
          )}
        />
      </div>
    </div>
  );
}
