## Building with the jsyxi design system

These are the real, compiled **jsyxi** UI primitives. Render them from `window.Jsyxi.*` (bundle: `_ds_bundle.js`). The brand theme loads from `styles.css`.

### Setup — no provider needed
The components are presentational and self-styled. There is **no ThemeProvider or context to wrap**: render a component directly and it is on-brand, because the brand tokens (colors, radii) live in `styles.css` (already loaded) and the component styles ship in `_ds_bundle.css` (imported by `styles.css`). Fonts are the **system UI stack by design** — nothing to load.

```jsx
const { Card, CardHeader, CardTitle, CardBody, CardFooter, Button, Badge } = window.Jsyxi;

<Card>
  <CardHeader><CardTitle>Pro plan</CardTitle></CardHeader>
  <CardBody>
    <p className="text-sm text-slate-600">10 widgets · 100k monthly views</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary" size="sm">Upgrade</Button>
  </CardFooter>
</Card>
```

### Styling idiom — variant/tone props + Tailwind utilities
Two layers, in this order of preference:

1. **Variant/tone props carry the design language** — reach for these before any custom styling:
   - `Button` / `ButtonLink` / `SubmitButton`: `variant` = `primary | accent | secondary | ghost | danger | outlineDanger | link`; `size` = `sm | md | lg | icon`.
   - `Badge`: `tone` = `brand | green | amber | red | slate | blue`.
   - `Alert`: `tone` = `info | success | warning | error`.
   - `StatTile`: `tone` = `brand | green | amber | slate`.

2. **Layout glue via Tailwind utility classes** — every component accepts `className`. Use the brand-token utilities (never raw hex):
   - Brand indigo: `bg-brand-600` · `text-brand-600` · `border-brand-200`. Emerald accent: `bg-accent-600`.
   - Text: `text-ink` (headings/near-black) · `text-slate-600` / `text-slate-500` (body / muted).
   - Surfaces: `bg-white` / `bg-canvas`; borders `border-line`; radius `rounded-xl`; spacing with `gap-*` / `p-*`.

Build your own layout with plain `<div className="…">` using those utilities; use the library components for the actual controls.

### Compounds
- `Card` composes `CardHeader`, `CardTitle`, `CardDescription`, `CardBody`, `CardFooter` (all on `window.Jsyxi`).
- `Field` wraps a label + control + hint/error: pass `label`, and either `hint` or `error`, with the control (e.g. `Input`, `Select`) as children.

### Where the truth lives
Read these before styling anything:
- Brand tokens + utilities: `styles.css` (which imports `_ds_bundle.css`).
- Per-component API and examples: each component's `.d.ts` (props) and `.prompt.md`.
