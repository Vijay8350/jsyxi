# jsyxi — Platform (Increment 1)

A multi-tenant platform for **no-code embeddable widgets** plus an **agency lead engine + CRM**, built to the FINAL spec in [`docs/spec.md`](docs/spec.md). This repo implements **Increment 1 (INC-1)** — the first shippable release.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Prisma 6 · PostgreSQL 18
- **Money:** integer minor units (paise), 2-dp display, rates 4-dp — no float money (INV-9)
- **Timezone:** stored UTC, displayed in Workspace tz (default Asia/Kolkata / IST)
- **Currency/tax:** INR, GST-inclusive pricing with gap-free per-FY invoice numbering

---

## Quick start

```bash
# 1. Postgres must be running locally. Create the database:
#    (trust auth as the `postgres` user on localhost, or edit DATABASE_URL in .env)
psql -U postgres -h localhost -c "CREATE DATABASE jsyxi;"

# 2. Install deps
npm install

# 3. Apply schema + generate client + seed day-one data
npm run db:migrate      # first run creates & applies the migration
npm run db:seed         # seeds catalog, plans, staff, queues, demo data

# 4. Run
npm run dev             # http://localhost:3000
```

### Seeded logins (dev)

| Who | Email | Password | Where |
|---|---|---|---|
| Demo customer | `demo@jsyxi.local` | `jsyxi-demo` | `/login` → `/app` |
| Platform admin | `admin@jsyxi.local` | `jsyxi-admin` | `/admin/login` → `/admin` |

Other seeded staff (same password `jsyxi-admin`): `marketing@`, `sales@`, `support@`, `content@`, `finance@` — each scoped to their role's admin sections (§10).

The demo customer owns two workspaces: **Demo Store** (Free, with a live Countdown widget + ~520 seeded views) and **Acme Agency** (Pro, paid via manual assignment with a GST invoice).

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:migrate` | Create/apply a migration (dev) |
| `npm run db:seed` | Seed day-one state |
| `npm run db:reset` | Drop, re-migrate, re-seed |
| `npm run db:studio` | Prisma Studio |

---

## Architecture

### Route map

```
/(marketing)         Public site: home, /pricing, /services, /case-studies, /about,
                     /contact (+ consultation scheduler), /blog, /help, /legal, /tools, /shopify
/(auth)              /login /signup /verify /forgot /reset /2fa
/app                 Customer panel (workspace-scoped): dashboard, widgets, catalog,
                     builder, analytics, subscription, service-requests, deals, support,
                     notifications, profile
/admin               Staff panel: dashboard, workspaces (+ manual billing), catalog, plans,
                     leads/CRM, invoices, content, reviews, tickets, roles, settings, audit
/embed/v1.js         Public one-line embed loader
/e/[key]             Standalone published-widget render
/api/embed/[key]     Published config (JSON) — origin + publish gated
/api/embed/form/[k]  Embedded form submission → Lead
/api/view            View beacon (F-VIEW metering)
```

### The widget loop (the product spine)

1. **Create** a Widget from the catalog (pick a Tool + Template).
2. **Build** it in the editor with a live preview. Autosave writes `draft_config` only (optimistic `config_version`, INV-12).
3. **Publish** promotes `draft_config` → `published_config` (INV-2/3), enforcing `max_widgets` (INV-4).
4. **Embed** with one line: `<script async src=".../embed/v1.js" data-jsyxi="EMBED_KEY"></script>`.
5. The loader fetches config, renders (shared isomorphic renderers in `src/lib/tools/render`), and fires a **view beacon**.
6. **Metering** (`/api/view`): bot + self exclusion, 30-min dedup by visitor+page, then an **atomic** increment of the per-widget daily aggregate (E11) and the workspace rolling counter (E12) — never a raw-event scan (INV-8). Over-limit is **soft** (F-LIMIT): widgets keep rendering, branding is forced (INV-6).

### Key libraries (`src/lib`)

| Module | Responsibility |
|---|---|
| `db.ts` | Prisma singleton |
| `auth/` | sessions (user + staff), 2FA TOTP, `current-user` context |
| `metering.ts` | F-VIEW counting, dedup, aggregates, usage/limits, forecast |
| `money.ts` / `time.ts` | minor-units + GST; tz-aware days, billing periods, F-FORECAST |
| `tools/` | Tool registry (8 flagship tools), config schemas, renderers, runtime |
| `embed.ts` | resolve a published widget by embed key + branding decision |
| `permissions.ts` | workspace roles + staff role → section matrix (§10) |
| `audit.ts` | AuditLogEntry writes (INV-11) |
| `leads.ts` | lead creation + queue routing (§3.3) |

### Data model

Full canonical entity set (E1–E24) in [`prisma/schema.prisma`](prisma/schema.prisma). `[LATER]` entities (Projects E4, ServiceProject E16, ShopifyAppListing E25) are modeled but not read/written by any INC-1 surface, per the completeness invariant **INV-14**.

---

## INC-1 scope notes

- **No self-serve checkout** (A2-01/INV-10): paid plans are **admin-assigned** with a `manual_payment_ref`; "Upgrade" CTAs create a Request-Upgrade Lead.
- **Single-owner** workspaces (RW-10): member invitation, Editor/Viewer roles, and Projects are `[LATER]`.
- **Stub ticketing** (`open → resolved`, RW-15) and **admin-applied referral coupons** (RW-06).
- **8 flagship Tools:** Reviews, WhatsApp Chat (non-AI), Form Builder, Popup/Announcement, Countdown, Instagram Feed, FAQ/Accordion, Maps. The **AI Chatbot** is `[LATER]` (RW-12).
- **Marketing testimonials** dog-food the Reviews data and are moderated in the admin panel (RW-05, R3V1-04).
