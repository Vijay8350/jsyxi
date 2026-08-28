"use client";

import { useEffect } from "react";
import { renderWidget } from "@/lib/tools/render";
import { EMBED_RUNTIME_JS } from "@/lib/tools/render/runtime";
import { SITE_ASSISTANT_CONFIG } from "@/lib/site-assistant";

const ROOT_ID = "jw-site-assistant";

// Renders the AI Assistant chatbot as a floating bubble on every marketing page.
// It mounts directly onto <body> (not inside the layout tree) so its fixed
// positioning can never be trapped by a transformed ancestor, and points its chat
// at the same-origin /api/assistant route.
export function SiteAssistant() {
  useEffect(() => {
    if (document.getElementById(ROOT_ID)) return; // already mounted

    const { html, css } = renderWidget("chatbot", SITE_ASSISTANT_CONFIG as unknown as Record<string, unknown>, {
      id: ROOT_ID,
      apiBase: "",
      branding: false,
    });

    const style = document.createElement("style");
    style.setAttribute("data-jw-site-assistant", "1");
    style.textContent = css;
    document.head.appendChild(style);

    const root = document.createElement("div");
    root.id = ROOT_ID;
    root.innerHTML = html.replace('data-endpoint=""', 'data-endpoint="/api/assistant"');
    document.body.appendChild(root);

    const w = window as unknown as { __jsyxiInit?: (el: HTMLElement, tool: string, opts: unknown) => void };
    if (!w.__jsyxiInit) {
      const s = document.createElement("script");
      s.textContent = EMBED_RUNTIME_JS;
      document.body.appendChild(s);
    }
    if (w.__jsyxiInit) w.__jsyxiInit(root, "chatbot", {});
  }, []);

  return null;
}
