import { renderWidget, type RenderOpts } from "./index";
import { EMBED_RUNTIME_JS } from "./runtime";

const ROOT_ID = "jw-root";

/** A full standalone HTML document for the widget (iframe srcdoc / /e page / preview). */
export function buildWidgetDocument(toolKey: string, config: Record<string, unknown>, opts: Partial<RenderOpts> = {}): string {
  const o: RenderOpts = { id: ROOT_ID, preview: false, branding: false, ...opts };
  const { html, css, mode } = renderWidget(toolKey, config, o);
  const bodyPad = mode === "overlay" ? "0" : "16px";
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
  *,*::before,*::after{box-sizing:border-box}
  html,body{margin:0}
  body{font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;padding:${bodyPad};background:transparent;color:#0f172a}
  ${css}
</style>
</head><body>
<div id="${ROOT_ID}" class="jsyxi-scope">${html}</div>
<script>${EMBED_RUNTIME_JS}
window.__jsyxiInit(document.getElementById('${ROOT_ID}'), ${JSON.stringify(toolKey)}, ${JSON.stringify({ preview: !!o.preview })});
</script>
</body></html>`;
}

export { ROOT_ID };
