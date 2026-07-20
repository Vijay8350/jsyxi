# jsyxi design-sync notes

## Repo shape (important)
- **jsyxi is a Next.js APP, not a published component library** — no `dist/`, no `main`/`exports`, `private: true`.
- Synced via an explicit **barrel entry** `.design-sync/entry.tsx` (re-exports only the `src/components/ui/*` primitives + brand `Logo`). `cfg.entry` points at it; PKG_DIR resolves to the repo root by walking up from the barrel.
- Only the barrel's exports are bundled — the rest of the app (pages, server actions, `next/*`) is never pulled in.

## Build gotchas
- **`next/link` is shimmed** for the standalone bundle via `.design-sync/shims/next-link.tsx`, aliased in `.design-sync/tsconfig.sync.json` (`cfg.tsconfig`). `ButtonLink` and `Logo` render a plain `<a>` (no Next router in Claude Design). If more Next-only imports appear in synced components, add them to that tsconfig's `paths`.
- **Tailwind v4 theme CSS is generated**, not shipped. Recompile before a build if component/preview utility usage changes:
  `npx @tailwindcss/cli@4 -i src/app/globals.css -o .design-sync/assets/theme.css --minify`
  (`cfg.cssEntry` points at the output.) The CLI scans the whole repo incl. `.design-sync/previews/`.
- **Props are hand-written** in `cfg.dtsPropsFor` (no dist `.d.ts` to extract from). If a component's real props change, update its `dtsPropsFor` entry.
- **Render check uses system Chrome** (no chromium download): `DS_CHROMIUM_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe"`; playwright installed in `.ds-sync` with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`.

## Known render warns (triaged — legitimate)
- `[FONT_MISSING] "Cascadia Code", "Roboto Mono", "SF Mono"` — jsyxi uses **system font stacks by design** (no shipped webfonts). These are OS fallbacks in `--font-mono`, not brand fonts. Suppressed via `cfg.runtimeFontPrefixes`; not a defect.

## Re-sync risks
- **theme.css is a generated snapshot** — recompile (command above) whenever component/preview classes change, or new utilities won't ship and previews render unstyled.
- **Barrel + componentSrcMap + dtsPropsFor are hand-maintained** — adding/removing a `src/components/ui` component requires updating `.design-sync/entry.tsx`, `cfg.componentSrcMap`, and `cfg.dtsPropsFor` together.
- Card sub-parts (`CardHeader`/`CardTitle`/`CardDescription`/`CardBody`/`CardFooter`) are exported on `window.Jsyxi` for composition but are intentionally **not** first-class DS components (not in `componentSrcMap`).
