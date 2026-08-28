# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> ⚠️ Per `AGENTS.md`: this is Next.js **16**, not stock Next — App Router APIs and conventions differ from training data (e.g. route-handler `params` are a `Promise`). Read the relevant guide in `node_modules/next/dist/docs/` before writing framework code.

## What this is

**jsyxi** — a multi-tenant SaaS platform for no-code embeddable website widgets (Elfsight-style: create → customize → publish → embed) plus an agency lead engine + CRM. Live at https://jsyxi.com. Implements "Increment 1" (INC-1) of the spec in `docs/spec.md`.

Stack: Next.js 16 (App Router, `output: "standalone"`) · React 19 · TypeScript · Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`) · Prisma 6 · PostgreSQL. **Money is integer paise, never floats (INV-9); timestamps are stored UTC and displayed in each workspace's timezone (default IST).**

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run typecheck` — `tsc --noEmit`. **There is no test runner** — `typecheck` + `npm run lint` + `npm run build` are the verification gates.
- `npm run build` / `npm start` — production build / serve
- `npm run db:migrate` (create+apply a dev migration) · `db:seed` (catalog/plans/staff/demo) · `db:reset` (drop+migrate+seed) · `db:studio`
- Postgres must be running; DB `jsyxi`, `DATABASE_URL` in `.env`.
- Seeded logins: customer `demo@jsyxi.local` / `jsyxi-demo` → `/app`; staff `admin@jsyxi.local` / `jsyxi-admin` → `/admin` (other staff `marketing@`/`sales@`/`support@`/`content@`/`finance@` share `jsyxi-admin`, each scoped to their role's sections).
- **Seed BEFORE build** when the tool catalog/categories change: `/tools`, the home grid, and `/tools/[key]` are statically prerendered from the DB at build time.

## Architecture

### The widget loop (the product spine)
Catalog → **Create** a Widget (Tool + optional Template) → **Build** in the editor with live preview (autosave writes `draftConfig` only, optimistic `configVersion`, INV-12) → **Publish** promotes `draftConfig`→`publishedConfig`, enforcing `maxWidgets` (INV-4) → **Embed** one line: `<script async src=".../embed/v1.js" data-jsyxi="EMBED_KEY">` → the loader fetches config, renders, and fires a **view beacon** → **metering** (`/api/view`) dedups by visitor+page and atomically increments the per-widget daily aggregate + workspace rolling counter (never a raw-event scan, INV-8). Over-limit is **soft** (F-LIMIT): widgets keep rendering, branding is forced (INV-6).

### The render engine (`src/lib/tools/`) — isomorphic, runs server AND client
- `registry.ts` — the Tool catalog: each tool's config **schema** (field defs) + preset **templates** (~28 tools).
- `render/index.ts` — `renderWidget(toolKey, config, opts)` → scoped `{ html, css, mode }`. Pure string building with escaping helpers (`esc`, `safeUrl`, `col`, …). Runs **both** server-side (embed API, `/e/[key]`) and client-side (builder preview).
- `render/runtime.ts` — `EMBED_RUNTIME_JS`: vanilla-JS injected into the preview iframe and the embed loader; exposes `window.__jsyxiInit(root, tool, opts)`. All interactivity (countdowns, sliders, modals…) lives here.
- `render/document.ts` — assembles html+css+runtime into a full iframe document. `icons.tsx` — tool key → lucide icon. `types.ts` — field-def types + `defaultsFromSchema`.

**Adding a widget** = edit those 4 files (registry schema+template · a renderer branch in `render/index.ts` · an init fn + dispatch branch in `render/runtime.ts` if interactive · an icon in `icons.tsx`) **then re-seed** so the Tool row exists.

**`runtime.ts` constraints (non-obvious):** `EMBED_RUNTIME_JS` is one big template literal — it must contain **no `${...}`** (would be read as JS interpolation) and cannot rely on backslash escapes inside it; use plain string ops instead of regex. An overlay/modal element with a `hidden` attribute also needs `.jw-x[hidden]{display:none}` in its scoped CSS, or the author's `display:flex` overrides the UA `[hidden]` rule and it shows on load.

### Server Actions (all mutations)
`"use server"` files under `src/lib/actions/` (customer) and `src/lib/actions/admin/` (staff). Forms use `useActionState` with the shared `ActionState` contract in `src/lib/actions/result.ts` (`fail()`, `succeed()`, `initialActionState`, `fieldErrors`). Zod schemas live in `src/lib/validation.ts`. Guards: `requireWorkspaceContext()` / `requireStaff()` (redirect) or `requireStaffSection(section)` (returns a guard object) — see `src/lib/auth/` + `src/lib/permissions.ts`.

> **Gotcha (caused a production outage):** never `export type { X }` — a *type re-export* — from a `"use server"` file. The Next 16 turbopack build compiles it into a runtime `ReferenceError: X is not defined` that only throws when an action in that module is invoked (`tsc` and `next build` both pass). Inline `export type X = {…}` aliases are fine.

### Auth & tenancy
Two independent session systems (`src/lib/auth/session.ts`): user (`jsyxi_session` cookie) and staff (`jsyxi_staff`). The cookie holds a random token; the DB stores `sha256hex(token)` as `hashedId`. 2FA via TOTP. `current-user.ts` resolves the active `WorkspaceContext` (workspace + membership role). Workspaces are single-owner in INC-1. The permission matrix (workspace role + staff role → section) is in `permissions.ts`.

### Content / CMS
`/admin/content` edits `ContentItem`s (blog/help/case-study/…). Body is **Markdown** rendered to **safe React elements** by `src/lib/markdown.tsx` (`renderMarkdown` — no `dangerouslySetInnerHTML`, URLs sanitized), shared by the editor preview (`src/components/admin/rich-body.tsx`) and the public `ArticleBody` (`src/components/marketing/sections.tsx`). Images upload to the DB-backed `MediaAsset` (`POST /api/admin/media`, staff-only) and serve from `/api/media/[id]`.

### Routes (`src/app/`)
`(marketing)` public site · `(auth)` login/signup/2fa · `app/` customer panel (workspace-scoped) · `admin/` staff panel · `e/[key]` standalone widget render · `embed/v1.js` loader · `api/embed/[key]` published config (origin+publish gated) · `api/view` metering beacon.

### Data model
Canonical entities in `prisma/schema.prisma`. The Prisma client is generated to `src/generated/prisma` and imported as `@/generated/prisma`. `[LATER]`-tagged entities are modeled but must not be read/written by INC-1 surfaces (INV-14). Prod applies migration files with `prisma migrate deploy` — when the schema changes without a local dev DB, hand-author the `prisma/migrations/<ts>_<name>/migration.sql` to match.

### UI conventions
Reuse primitives in `src/components/ui/` (`Button` variants, `Input`, `Textarea`, `Field`, `Select`, `cn` from `src/lib/utils`). **`Input`/`Textarea` do not forward refs** — look elements up by `id` if you need the DOM node. `next.config` sets `images.unoptimized` (cover images come from arbitrary hosts; use plain `<img>`).

## INC-1 scope (see `docs/spec.md`)
No self-serve checkout (paid plans are admin-assigned with a `manual_payment_ref`; "Upgrade" CTAs create a Request-Upgrade Lead) · single-owner workspaces · stub ticketing (`open → resolved`) · marketing testimonials dog-food the Reviews tool and are moderated in admin.
