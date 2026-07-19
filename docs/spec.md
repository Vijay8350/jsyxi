# jsyxi Platform — FINAL SPEC (build-ready)

- **Status:** FINAL — rewrite 4, generated 2026-07-19 from `brief.txt` + `_audits/3/resolutions.md` (20 settled decisions + 12 post-verification ratifications).
- **Supersedes:** rewrite 3. Consumes rewrite 3's verification (`inputs/verification.prev-1.md`, NO-GO): must-fix **R3V1-01** is fixed **at the class level** (the canonical INC-1 entity set now covers *every* INC-1 surface — see **INV-14** + the §9.10 coverage table); minors **R3V1-02/-03/-04** are swept; decided-for-you **R3V1-05/-06/-07/-08** are ratified into the ledger.
- **Source authority:** where this spec and the rough brief disagree, **this spec wins**. Where two parts of this spec appear to disagree, the **appendices (§1–§8) win over the prose behaviour sections (§9+)** — the appendices are canonical.
- **Scope discipline:** the brief describes a full three-pillar vision across three phases. Per **A1-01**, only **Increment 1 (INC-1)** is built now. Every entity/formula/rule is defined for the whole system; each behaviour is tagged **[INC-1]** or **[LATER]**. **Completeness invariant (INV-14):** no [INC-1] surface may depend on a [LATER] entity, and every non-optional reference an INC-1 entity needs is itself INC-1.

## How to read this document
- §1–§8 = **canonical reference**. §9 = **behaviour** referencing the appendices. §10 permissions, §11 reports, §12 audit logging, §13 **Decision Register**.
- Terminology is fixed in §1; **A1-06** governs the Tool-vs-Widget split.

---

## 1. Glossary (canonical terms; author-term → canonical-term mappings)

| Canonical term | Definition | Author's term(s) in brief |
|---|---|---|
| **Tool** | A *type* of embeddable feature in the catalog (Countdown, Reviews, WhatsApp Chat…). Admin-defined. | "widget" (catalog), "app", "tool" |
| **Widget** | A single *configured instance* of a Tool, owned by a Workspace. The thing embedded and metered. | "widget" (created), "my app" |
| **Workspace** | The **top-level tenant**. Owns Widgets, Projects, subscription, usage limits, billing identity, members. (**A1-04**) | "account", "workspace" |
| **User** | A person with login credentials. May belong to **many** Workspaces and switch. | "user", "member" |
| **Membership** | The link (User × Workspace) carrying a Workspace Role + optional Project scope. **Invitation is [LATER]** (**RW-10**). | "collaborator", "member", "team" |
| **Project** | A folder **inside a Workspace** grouping Widgets by client/site. **[LATER]**. | "project" |
| **Plan** | An admin-defined subscription tier (Free or paid) with Limits + Entitlements. | "plan", "tier", "pack" |
| **Purchase mode** | Plan attribute: **Single-App** (Widgets of one Tool type) or **All-Access** (any Tool type). (**A1-06**) | "Single-App", "All Apps Pack" |
| **Entitlement** | A Plan-granted boolean/threshold (branding-removal, priority-support, max widgets/views/projects/members, ai-access). | "gating levers" |
| **View** | One counted render of a **published** Widget on a third-party page load, after bot/self exclusion + de-dup + domain check (**§4 F-VIEW**). | "view", "monthly views" |
| **Embed key** | Random, unguessable, globally-unique public identifier in the embed snippet resolving a Widget's published config. (**A1-11**) | "embed code", "single line of code" |
| **Publish** | Explicit action promoting a Widget's draft config to the **published** config live embeds serve. (**A1-03**) | "Publish" |
| **Lead** | Inbound sales contact (quote, consultation booking, chat/WhatsApp capture, lead-magnet, **request-upgrade**) in the Admin CRM. | "lead", "inquiry" |
| **Service Project** | The delivery side of a won Lead: milestones, deliverables, per-project invoices. **[LATER]**. | "service project", "My Projects" |
| **Template** | An admin-seeded preset config for a Tool, powering "pick a template → customize". Seeded data + entity **[INC-1]**; user-facing *browsing* panel **[LATER]**. | "template" |
| **Increment 1 (INC-1)** | The first shippable release (**A1-01**); ships the **full 8–12 flagship Tools** (**R2V1-05**). | "Phase 1 MVP" |
| **Suspended (Widget)** | A Widget that exists but renders nothing, put out of the active set by Plan limits/lifecycle (**§3.1**). | (implied) |
| **Manual plan assignment** | INC-1 mechanism: Admin sets a paid Plan + records an offline payment; **no self-serve checkout** (**A2-01**). | "billing", "upgrade" |

**Renames applied globally:** "widget (catalog)" → **Tool**; "widget (created)" → **Widget**; "account" → **Workspace**; "Phase 1 MVP" → **Increment 1**.

---

## 2. Canonical entities & primary keys

| # | Entity | PK | Key fields / relationships |
|---|---|---|---|
| E1 | **User** | `user_id` | email (unique, case-folded), password hash, 2FA secret, name, default_workspace_id, created_at, status(active/deactivated/pending-verification) |
| E2 | **Workspace** | `workspace_id` | name, slug (unique global, ci, trimmed), owner_user_id, plan_id, purchase_mode, single_app_tool_id (nullable), billing_currency (set at signup, immutable), timezone (default Asia/Kolkata), gstin (nullable), created_at, status(active/soft-deleted/purged), deleted_at |
| E3 | **Membership** | `membership_id` | user_id, workspace_id, workspace_role, project_scope, invited_by, status(invited/active/removed). *INC-1: one Owner per Workspace; invites [LATER] (RW-10).* |
| E4 | **Project** | `project_id` | workspace_id, name, created_at, status. *[LATER].* |
| E5 | **Tool** | `tool_id` | key(slug), name, category_id, badges(set), description, config_schema, is_ai(bool), status(draft/published/retired), created_by_admin |
| E6 | **ToolCategory** | `category_id` | name, sort_order, status — admin-managed reference data |
| E7 | **Widget** | `widget_id` | workspace_id, project_id (nullable), tool_id, name, embed_key (unique global, unguessable, never reused), draft_config, published_config (nullable until first publish), **allowed_domains** (list; empty = any — RW-09), lifecycle_state (§3.1), created_at, updated_at, published_at, deleted_at, config_version(int) |
| E8 | **Template** | `template_id` | tool_id, name, use_case, industry, preset_config, status — admin-managed. **INC-1** (seeded day-one — §5). |
| E9 | **Plan** | `plan_id` | name, purchase_mode, price_amount(minor units, nullable Free), price_currency, billing_interval, limits{max_widgets,max_monthly_views,max_projects,max_members,ai_access}, entitlements{branding_removable,priority_support,free_installation,hard_view_cutoff(default false)}, status — admin-managed |
| E10 | **Subscription** | `subscription_id` | workspace_id, plan_id, state(§3.2), current_period_start, current_period_end, cancel_scheduled(bool), assigned_by_admin_id (INC-1), manual_payment_ref (nullable), created_at |
| E11 | **ViewDailyAggregate** | `(widget_id, date)` | workspace_id, tool_id, view_count, updated_at — one row per widget per **local** day |
| E12 | **WorkspaceUsageRolling** | `workspace_id` | current_period_view_total, period_start, period_end, last_recomputed_at — maintained counter (INV-8) |
| E13 | **ViewEventRaw** | `event_id` | widget_id, occurred_at, visitor_hash, page_hash — **90-day** retention then purge |
| E14 | **Lead** | `lead_id` | source(quote/consultation/chat/whatsapp/lead-magnet/**request-upgrade**), service_topic (nullable), contact{name,email,phone}, message, **scheduled_slot (nullable — consultation bookings, RW-11)**, assigned_queue_id, assigned_user_id (nullable), pipeline_stage(§3.3), created_at, workspace_id (nullable) |
| E15 | **LeadQueue** | `queue_id` | name, service_topic_map, default(bool), assignment_mode(round-robin/manual) — admin-managed |
| E16 | **ServiceProject** | `service_project_id` | lead_id, workspace_id, title, milestones[], deliverables[], state, created_at. *[LATER] — INC-1 "Service Requests" reads Leads (E14) instead (§9.10).* |
| E17 | **Invoice** | `invoice_id` | workspace_id, invoice_number (gap-free sequential per financial year), issue_date, currency, line_items[], subtotal, gst_amount, total, gstin, status(issued/paid/void) |
| E18 | **Coupon** | `coupon_id` | code (unique global, ci, trimmed), type(refer-a-friend/promo), value, **program_id (nullable in INC-1 — RW-14)**, expiry, status. *No-stacking: F-COUPON.* |
| E19 | **IncentiveProgram** | `program_id` | kind(referral/affiliate/reseller — A1-19), rules(json), tracking_enabled(bool), status. **INC-1: the `referral` kind only** (backs the Deals/Refer-a-Friend surface, admin-applied); `affiliate`/`reseller` kinds **[LATER]** (**RW-14**). |
| E20 | **Notification** | `notification_id` | recipient_user_id, kind, channel_set(in-app,email), body, blocking(default false), read_at, created_at |
| E21 | **Ticket** | `ticket_id` | workspace_id, subject, body, state(open/pending/resolved/closed), assigned_staff_id, sla_due_at, created_at. **INC-1: stub scope** (create + view + admin resolve, states `open`/`resolved`); pending/closed/SLA/reopen **[LATER]** (**RW-15**). |
| E22 | **StaffUser** | `staff_id` | name, email, staff_role(§10), status — internal, **separate identity from E1** (RW-07) |
| E23 | **ContentItem** | `content_id` | type(blog/tutorial/case-study/portfolio/help-article/landing), title, slug, body, status(draft/published), author_staff_id. *INC-1: marketing-site subset.* |
| E24 | **AuditLogEntry** | `audit_id` | actor, action, object_type, object_id, before/after summary, occurred_at (§12) |
| E25 | **ShopifyAppListing** | `listing_id` | title, value_prop, screenshots[], features[], integrations[], pricing_display, app_store_url, preview_status — **marketing surface only** (A1-05); admin previewable. *[LATER].* |

**Increment-1 entity set (canonical):** E1, E2, E3 (single-owner), E5, E6, E7, E8, E9, E10 (manual), E11, E12, E13, E14, E15, E17 (admin-issued), E18 (admin-applied; program_id nullable), **E19 (kind=referral only)**, E20, **E21 (stub scope)**, E22, E23 (marketing subset), E24. **[LATER]:** E4 (Projects), E16 (ServiceProject delivery-tracking), E19 (affiliate/reseller kinds), E21 (full ticketing), E23 (beyond marketing), E25, plus member invitation on E3. Every INC-1 surface in §9–§11 maps to an entity in this set (coverage table §9.10; **INV-14**).

---

## 3. Status enums & transition tables

### 3.1 Widget lifecycle (**A1-03**, **A1-08**, **A1-12**)
States: `draft` · `published_active` · `published_suspended` · `unpublished` · `soft_deleted` · `purged` (terminal).

| From | To | Actor | Guard |
|---|---|---|---|
| draft | published_active | member (editor+) | within `max_widgets` active count; Tool allowed by purchase_mode |
| published_active | published_active | member | re-Publish updates published_config; propagates ≤ **S-CACHE** (5 min) |
| published_active | unpublished | member | explicit Unpublish; embed renders nothing |
| unpublished | published_active | member | within active limit |
| published_active | published_suspended | system | exceeds `max_widgets` after downgrade/cancel → suspend **newest-first**; or plan lapse |
| published_suspended | published_active | member/system | active slot frees AND member selects it |
| any (except purged) | soft_deleted | member (owner/editor) | live embed immediately renders nothing |
| soft_deleted | draft/published_active | member | within 30-day recovery → restores prior state |
| soft_deleted | purged | system | 30 days elapsed |

Reverse paths: unpublish↔publish, soft-delete→restore, suspend→active. **Purge is one-way.**

### 3.2 Subscription lifecycle (**A2-01**, **A1-08**, **A1-09**)
States: `free` (base) · `paid_active` · `cancelled` · `paid_grace` [LATER]. Every non-base state has an exit. *INC-1 reaches only `free`/`paid_active`.*

| From | To | Actor | Guard |
|---|---|---|---|
| free | paid_active | **Admin (manual)** [INC-1] / checkout [LATER] | Admin assigns Plan + `manual_payment_ref` (A2-01) |
| paid_active | free | Admin (manual, immediate) | apply §3.1 newest-first suspension; branding returns |
| paid_active | cancelled | member/Admin | sets `cancel_scheduled`; active until `current_period_end` |
| cancelled | free | system | at `current_period_end` → revert; §3.1 suspension applies |
| cancelled | paid_active | member/Admin | reactivate before `current_period_end` |
| paid_active | paid_grace | system [LATER] | payment failure; S-DUNNING window — inert in INC-1 |
| paid_grace | paid_active | system [LATER] | payment recovered |
| paid_grace | free | system [LATER] | grace expired |

**[INC-1] rule:** all reachable paid transitions are Admin-driven; "Upgrade" CTAs create a Request-Upgrade Lead (RW-03).

### 3.3 Lead pipeline (**A1-17**, **RW-03**)
States: `new` → `contacted` → `proposal` → `won` | `lost`.

| From | To | Actor | Guard |
|---|---|---|---|
| (create) | new | system | routed by `service_topic`; **`request-upgrade` → "Upgrades" queue**, else default "New leads" |
| new | contacted | assigned staff | — |
| contacted | proposal | staff | — |
| proposal | won | staff | may spawn a ServiceProject (E16, [LATER]) |
| new/contacted/proposal | lost | staff | reason captured |

### 3.4 Ticket lifecycle (**INC-1 stub — RW-15**)
INC-1 stub: `open → resolved` (customer creates; Support staff resolves). Full lifecycle `open → pending → resolved → closed` + reopen-within-**S-TICKET-REOPEN** is **[LATER]**.

---

## 4. Computed fields & numeric policy

**Money (A1-09):** integer **minor units** (paise); display 2 decimals. **Rates/percentages** (GST, discount %, commission %) to **4 dp**. Negative amounts only for credit-notes/refunds [LATER]; views/limits non-negative integers. No float money (INV-9).

**Text & files (A1-13):** names/titles ≤ **120** chars; long text ≤ **5,000**; **names/addresses accept full Unicode**. Uploads: images/assets **≤ 5 MB**, **types jpg/png/webp/gif/svg (sanitized)** only; docs (chatbot/lead-magnet) **≤ 20 MB, ≤ 20 per widget**. Every optional field has an explicit default.

**F-VIEW (A1-02):** one increment per **render of a `published_active` Widget on a third-party page load** whose origin is permitted by `allowed_domains` (empty = any — INV-13). Exclude bots + owner self-traffic. De-dup: same `visitor_hash`+`page_hash` within **S-VIEW-DEDUP (30 min)** counts once. **Atomic server-side** increment on E11 + E12 (A1-14); never a per-request scan. *Worked example:* one visitor loads a Countdown page 3× in 10 min → **1 View**; another visitor → **+1**; Googlebot → **0**; render on a non-allowed domain → **0** (renders nothing).

**F-USAGE (A1-02, A1-10):** metering "month" = `[current_period_start, current_period_end)` (half-open), in Workspace timezone. `current_period_view_total` = Σ E11 over the period, maintained incrementally; resets to 0 at anniversary roll-over.

**F-LIMIT (A1-02, soft):** when `current_period_view_total > plan.max_monthly_views` and `plan.hard_view_cutoff=false` (default): Widgets keep rendering; branding **force-shown** regardless of `branding_removable`; owner gets in-app + email nudges. `hard_view_cutoff` (default off) reserves a future hard-stop tier.

**F-FORECAST (ratified; zero-guard):** display-only linear run-rate. `days_elapsed` = whole local days since `current_period_start`. **If `days_elapsed < 1`, forecast omitted** ("—"). Else `projected = floor(current_period_view_total × (period_length_days / days_elapsed))`. Smoothing = build detail.

**F-PRORATE [LATER, A1-09]:** mid-period upgrade charge `(new_price − old_price) × (days_remaining / period_days)`, rounded half-up at **document level**, odd-paise remainder absorbed by the final line. Downgrades at `current_period_end`. *Inert in INC-1.*

**F-ANNUAL (A1-09):** `annual_price = (monthly_price × 12) − annual_discount`, computed once at purchase.

**F-GST (A1-07):** GST-inclusive; `gst_amount = round(total × gst_rate / (1 + gst_rate), 0 paise)`, rate 4 dp. *Worked example:* ₹118.00 incl @18% → ₹18.00 GST, ₹100.00 taxable. Invoice numbers gap-free sequential per financial year.

**F-COUPON (A1-09):** at most **one coupon per checkout — no stacking**. INC-1 coupons (incl. refer-a-friend) are **admin-applied** (no checkout — RW-06); self-serve redemption switches on with the gateway.

**F-COMMISSION [LATER, A1-19]:** `commission = paid_amount × commission_rate` (4 dp), accrued per qualifying transaction, paid once ≥ payout threshold.

---

## 5. Scale, temporal & data-lifecycle assumptions

**Scale (S1):** launch 100s–1,000s Workspaces; year-1 low tens of thousands of Widgets. **Fastest-growing data = Views** (every render across all customers' third-party traffic), potentially millions/day. Hence per-widget-per-day aggregates (E11) + maintained rolling counter (E12); raw events (E13) only 90 days — **INV-8**.

**Temporal (A1-10):** store all timestamps **UTC**; display in **Workspace timezone** (default **Asia/Kolkata / IST**). Daily boundary for E11 + daily jobs = Workspace-tz day. Billing periods key to Subscription anniversary. Windows **half-open `[start, end)`**. Metering/audit = datetime(UTC); user campaign dates = datetime in Workspace tz. **Future-dating allowed; past-dating disallowed where it would alter a closed billing/usage period.**

**Data lifecycle (A1-12):** **soft-delete + 30-day recovery, then purge** for Widgets/Workspaces. **Hard-block** deletion of any entity referenced by a live/paid dependency. **Retention:** raw ViewEvents 90 days; ViewDailyAggregate **indefinite**; Invoices per statutory minimum. **Account deletion:** request → grace → purge.

**Day-one seed state (A1-12, R2V1-05):** before first login: the **Tool catalog** (E5) seeded with the **full 8–12 INC-1 flagship Tools** (§9.2) + **ToolCategories** (E6) + **badges**; **starter Templates** (E8) for **each** flagship Tool; **Plan definitions** (E9: Free + placeholder paid tiers); **StaffUsers + staff roles** (E22, §10); **LeadQueues** incl. default "New leads" + "Upgrades" (E15); the **referral IncentiveProgram** record (E19, kind=referral); no customer-data import (greenfield).

---

## 6. Global invariants

- **INV-1** A Widget belongs to exactly one Workspace; Views/Invoices/Subscription/usage are workspace-scoped. Metering/limits/billing attach to the **Workspace**, never the User (A1-04).
- **INV-2** A Widget renders on a third-party page **only when `published_active`**; every other state renders **nothing** (silent empty, never an error box) (A1-03).
- **INV-3** Published config is fetched by `embed_key`, **effectively public-readable**; **no secret/credential/PII in published_config** (A1-03).
- **INV-4** `published_active` count never exceeds `plan.max_widgets`; enforcement is **suspend newest-first**, never delete (A1-08).
- **INV-5** Under Single-App mode all Widgets share `single_app_tool_id`; All-Access permits any Tool (A1-06).
- **INV-6** Over-limit is **soft** by default: forces branding + nudges but never stops rendering (A1-02).
- **INV-7** `invoice_number` gap-free sequential per financial year, never reused; `embed_key`/`slug`/`coupon.code` globally unique, never recycled (A1-11).
- **INV-8** Usage/limit checks read the **maintained counter (E12) + daily aggregates (E11)**, never a raw-event scan (S1).
- **INV-9** All money integer minor units; rates 4-dp; no float money.
- **INV-10** [INC-1] No self-serve payment; every paid-Plan assignment carries `assigned_by_admin_id` + `manual_payment_ref` (A2-01).
- **INV-11** Every transition changing money, plan, or a live embed writes an AuditLogEntry (§12).
- **INV-12** Concurrent Widget edits use optimistic `config_version`; view increments atomic; billing/form submits idempotent by request key (A1-14).
- **INV-13** A View is counted, and a Widget renders, only when the render's origin is permitted by `allowed_domains` (empty = any); non-permitted origins render nothing and count nothing (RW-09).
- **INV-14 (completeness)** **No [INC-1] surface (behaviour, panel, report) may read or write a [LATER] entity, and every non-optional reference an INC-1 entity requires is itself in the INC-1 entity set.** Verified by the §9.10 coverage table (R2V1-01, R3V1-01).

---

## 7. Settings register

| Key | Meaning | Default | Owner |
|---|---|---|---|
| S-VIEW-DEDUP | de-dup window (identical visitor+page) | 30 min | Admin |
| S-CACHE | max propagation delay for re-published config | 5 min | Admin |
| S-RECOVERY | soft-delete recovery window | 30 days | Admin |
| S-RAW-RETENTION | ViewEventRaw retention | 90 days | Admin |
| S-DUNNING | payment-failure grace [LATER] | 7 days | Admin |
| S-TICKET-REOPEN | resolved→open reopen window [LATER] | 14 days | Admin |
| S-TZ-DEFAULT | default Workspace timezone | Asia/Kolkata | Admin |
| S-CURRENCY-DEFAULT | default billing currency | INR | Admin |
| S-GST-RATE | GST rate (4 dp) | jurisdiction-set at launch | Finance |
| S-FILE-IMG-MAX / TYPES | image max / allowed types | 5 MB / jpg,png,webp,gif,svg(sanitized) | Admin |
| S-FILE-DOC-MAX / COUNT | doc file max / count per widget | 20 MB / 20 | Admin |
| S-TEXT-NAME-MAX / LONG-MAX | title / long-text length | 120 / 5,000 chars | Admin |
| Plan limits/prices | per-Plan thresholds & prices | admin-configurable (A1-07) | Admin |

---

## 8. External / interface contracts

**[INC-1]:**
- **Embed loader (outbound, public):** page includes one snippet referencing `embed_key`. Loader fetches published_config (read-only, cacheable ≤ S-CACHE), renders, fires a metered view beacon. Request: `embed_key`, `visitor_hash`, `page_hash`, `page_origin`. Response: published_config JSON, or **empty render** if not `published_active` (INV-2) or origin not permitted (INV-13). Beacon fire-and-forget; increments idempotent within S-VIEW-DEDUP.
- **Transactional email (outbound):** notifications + lead/upgrade/booking/ticket confirmations. Per-message: recipient, template key, payload; retry w/ backoff; non-blocking (A1-15).
- **Lead capture forms + consultation scheduler (inbound, RW-11):** name/email/phone/message/service_topic, and for consultations an available-slot picker writing `scheduled_slot`; server-side validation; **double-submit protected by request key** (INV-12); on success emit Lead (E14) + confirmation email. Request-Upgrade CTA posts a Lead `source=request-upgrade`.

**[LATER]:** Razorpay (billing webhooks, idempotency, drives §3.2 paid transitions); Shopify Billing + OAuth (native apps; hub marketing-only per A1-05); data integrations (Google Sheets/Mailchimp/Zapier/WhatsApp/Slack — each a per-field contract w/ retry/idempotency); LLM provider wrap (AI gated to paid/metered — A1-18).

---

## 9. Behaviour sections

### 9.1 Accounts, workspaces & membership [INC-1] (A1-04, RW-10)
Sign-up creates a User (E1) + a personal Workspace (E2), `plan=Free`. A User may create/join multiple Workspaces and switch. Auth: email verification, login, forgot/reset, 2FA. **INC-1 Workspaces are single-owner:** Membership (E3) + roles defined, but **member invitation + Project-scoping are [LATER]** (RW-10). Account deletion per §5.

### 9.2 Tools catalog, Templates & the Widget builder [INC-1] (A1-06, A1-03, A1-16, R2V1-05)
- **INC-1 flagship Tool set (full 8–12 — R2V1-05),** all end-to-end (create → pick template → customize → publish → embed → meter → analytics):
  1. **All-in-One Reviews** · 2. **WhatsApp Chat (non-AI)** · 3. **Form Builder / Lead-gen Forms** · 4. **Popup / Announcement Bar** · 5. **Countdown Timer** · 6. **Instagram Feed** · 7. **FAQ / Accordion** · 8. **Google Maps / Store Locator**.
  **AI-dependent Tools are excluded from INC-1 per A1-18:** the brief's "WhatsApp/AI chat" ships as the **non-AI WhatsApp Chat** above; the **AI Chatbot** Tool is **[LATER]** (**RW-12**, ratified).
- **Catalog** lists Tools (E5) with search, category tabs (E6), badges. Tools/categories/badges/**Templates** are **admin-managed** (A1-06, A1-15). The **"request a tool"** wishlist + voting is **[LATER]** (**RW-13**).
- **Templates [INC-1 data]:** admin-seeded starter Templates (E8) exist day-one for every flagship Tool and power **"pick a template → customize"** (§5). The user-facing Templates *browsing panel* is **[LATER]** (§9.10).
- **Builder/editor:** settings + live preview; tabs per Tool `config_schema` (content → layout → style → behaviour/display-rules → integrations [LATER]). **Autosave writes draft_config only; Publish promotes to published_config** (A1-03). Optimistic concurrency via `config_version` (INV-12). Each Widget carries an **`allowed_domains`** allow-list (empty = any) enforced at render (INV-13); **duplicate** + per-Widget **share-link** are [LATER] (RW-09).
- **Anonymous demo (A1-16):** logged-out visitors fully configure a Widget client-side; **Publish / copy-embed requires sign-up**; on sign-up the config becomes the new Workspace's first Widget.
- **Embed & install:** copy a one-line snippet (embed_key) + platform tutorials + optional "request installation" Lead. Live update ≤ S-CACHE (INV-2).

### 9.3 Metering & limits [INC-1] (A1-02)
Views counted per F-VIEW into E11/E12 (respecting INV-13); limits enforced per F-LIMIT (soft) + INV-4/6; analytics panel shows per-Widget views, usage chart, Forecast (F-FORECAST).

### 9.4 Plans, gating & manual billing [INC-1] (A1-07, A2-01, A1-08)
Plans (E9) define limits/entitlements; Free + admin-configurable paid tiers enforce (INV-4/5/6). **Paid assignment is Admin-manual (A2-01, §3.2):** Admin sets Plan + `manual_payment_ref`, issues a GST invoice (E17, F-GST). Downgrade/cancel/lapse per §3.1/§3.2. "Upgrade" CTAs create a Request-Upgrade Lead (RW-03) → "Upgrades" queue. Self-serve checkout, proration, dunning, checkout coupons, self-serve refunds are **[LATER]**.

### 9.5 Agency lead engine & CRM [INC-1] (A1-17, RW-11)
Public site captures Leads (E14) via quote/consultation/lead-magnet forms, **a consultation calendar/slot booking surface (RW-11, E14.scheduled_slot)**, WhatsApp/click-to-call, chat. Leads route by `service_topic` to LeadQueues (E15); `request-upgrade` → Upgrades; unmapped → default. Admin CRM runs the pipeline (§3.3), assigns reps, on `won` may spawn a ServiceProject (E16, [LATER]). Core INC-1 revenue path.

### 9.6 Marketing site [INC-1]
Pages per brief §2 INC-1 needs: Home (dual-CTA), Services + key sub-pages, Pricing (tool tiers + agency packages, monthly/yearly toggle), Case Studies, About, Contact (multi-channel incl. calendar booking — §9.5), Blog, Help-Center basics, Auth pages, Legal. **Non-functional baselines (brief §11):** mobile-first, accessibility baseline, **sub-3-second mobile load target**, dual-CTA on every page. Testimonials use jsyxi's own Reviews Widget once seeded (**RW-05**; moderated per §9.10 admin). Per-Tool/service SEO landing pages [LATER]-expandable.

### 9.7 Shopify hub [LATER] (A1-05)
Marketing/education pages + install-help Lead capture only; no native app in early increments. Admin can create/preview/manage ShopifyAppListings (E25). First native app = repackaging one proven embed Widget, its own increment.

### 9.8 AI layer [LATER] (A1-18)
Wrap a third-party LLM; AI Tools (incl. AI Chatbot — RW-12) gated to paid or metered credit; entirely out of INC-1.

### 9.9 Incentives [partly LATER] (A1-19)
Three distinct programs, one shared tracker (E19): (1) **refer-a-friend** two-sided coupon — **INC-1**, backed by the `referral` IncentiveProgram + admin-applied Coupons (F-COUPON, RW-06); (2) **affiliate** recurring-% — [LATER, Phase 3+]; (3) **reseller/white-label** — [LATER]. Rates admin-set at launch.

### 9.10 User & Admin Panels; coverage table
**User Panel [INC-1]** (adapts by role — A1-04). Every surface is backed by an INC-1 entity (INV-14):

| Surface | INC-1 backing entity | Notes |
|---|---|---|
| Dashboard | aggregate of E7/E10/E14/E20 | snapshot |
| **My Widgets** | E7 | **List / Grid / Table views; sort by created/modified/name; search** (R3V1-03) |
| Tools Catalog | E5/E6/E8 | search + categories; "request a tool" [LATER] |
| Analytics | E11/E12 | per-Widget views, chart, Forecast |
| Subscription | E10/E17 | plan status; **invoice view + download** (E17) |
| Service Requests | **E14** | read-only view of own Leads (quote/consultation/lead-magnet); delivery-tracking (E16) [LATER] |
| Notifications | E20 | in-app + email |
| Deals / Refer-a-Friend | **E18 + E19(referral)** | referral link + admin-applied coupons |
| Support | **E21 (stub)** | open a ticket; view status; staff resolves |
| Profile / Security | E1 | profile, email prefs, password, 2FA, workspace switch, delete |

**[LATER] panels:** Projects, Members, Shopify, Integrations, Templates-browsing, Downloads/Assets beyond invoices (deliverables/brand-assets depend on E16).

**Admin Panel [INC-1]:** User/Workspace management (manual plan assignment, impersonate/assist), Tools + Templates catalog management, Leads/CRM, Plans & Pricing, Invoices, Content/Blog, **Reviews/Testimonials moderation** (approve/curate the reviews shown on the marketing site — R3V1-04, backed by the Reviews Widget data + E23), Roles, Settings. Affiliate/Shopify-listing management/advanced analytics/full ticketing are [LATER].

**Global search (brief §3):** across catalog/templates/help — **[LATER]** (R1V1-08).

---

## 10. Permissions matrix + seeded roles

**Workspace Roles (customer).** *INC-1 ships **Owner** only; Editor/Viewer + invitation [LATER] (RW-10).*

| Role | Widgets | Members | Billing/Plan | Projects |
|---|---|---|---|---|
| **Owner** [INC-1] | full CRUD + publish | (invite [LATER]) | view (assignment Admin-only in INC-1) | full [LATER] |
| **Editor** [LATER] | create/edit/publish own+shared | — | view | assigned |
| **Viewer** [LATER] | read + analytics | — | — | assigned |

**Staff Roles (admin, seeded — brief §7):**

| Staff role | Key objects |
|---|---|
| Owner/Admin | all |
| Marketing | Content, catalog badges, campaigns, **reviews/testimonials moderation** |
| Sales | Leads, ServiceProjects |
| Support | Tickets (stub), impersonate/assist, install requests |
| Content | ContentItems/CMS |
| Finance | Invoices, Plans/pricing, manual plan assignment, refunds [LATER] |

**Editability-by-stage:** Widget config editable in draft/published; **published_config frozen except via Publish** (INV-2). Invoices immutable once `issued` (void-only). Leads editable through the pipeline; `won/lost` read-only except notes.

---

## 11. Reports / analytics [INC-1 minimum]
- **User:** per-Widget views, usage chart, View-Limit Forecast (F-FORECAST), plan-vs-usage.
- **Admin KPIs (brief §7):** signups; active/free/paid Workspaces; widget usage & top Tools; open Leads; free→paid conversion; open Tickets (stub). **Freshness (A1-15):** counts near-real-time; **revenue/MRR/churn end-of-day**. **Period attribution:** revenue by **invoice/payment date**; later refunds **restate the period they occur in**, not the original.

## 12. Audit logging (INV-11)
Log actor/action/object/before-after/timestamp for: plan assignments, manual payments, invoice issue/void, Widget publish/suspend/delete/purge, lead stage changes, ticket resolve, impersonation, role changes. Retention ≥ statutory; never auto-purged within horizon.

---

## 13. Decision Register

### 13.1 Settled decisions (do-not-reopen — from the ledger)
A1-01 scope=INC-1 · A1-02 View defn/reset/soft-over-limit/aggregated storage · A1-03 publish/live-update/public-config/silent-fail · A1-04 Workspace=tenant · A1-05 Shopify hub marketing-only + admin preview · A1-06 Tool vs Widget, admin-managed catalog · A1-07 INR/GST/admin-tiers, Razorpay+Shopify Billing (deferred) · A1-08 newest-first suspension · A1-09 minor-units/4-dp/proration/no-stack/annual · A1-10 UTC store, IST display, half-open, no harmful backdating · A1-11 identifier/numbering · A1-12 soft-delete 30d, 90d raw/indefinite aggregates, seed data · A1-13 size/length/file-type/Unicode · A1-14 optimistic+atomic+idempotent · A1-15 admin-managed ref data, notify matrix, report freshness/attribution · A1-16 anonymous demo → sign-up-to-publish · A1-17 lead routing + default queue · A1-18 wrap-LLM, AI out of INC-1 · A1-19 three incentive programs, one tracker · **A2-01 manual admin-assigned plans, no gateway in INC-1.**
**Ratifications (ledger):** starter Templates day-one INC-1 · F-FORECAST linear run-rate + zero-guard · refer-a-friend admin-applied until gateway · staff identities separate (E22) · INC-1 "Service Requests" reads own Leads · INC-1 ships full 8–12 flagship Tools · allow-list domain control · **completeness rule: every INC-1 surface backed by INC-1 data incl. Support-ticket stub + referral record (INV-14)** · **non-AI WhatsApp, AI Chatbot deferred (RW-12)** · **single-owner INC-1 (RW-10)** · **calendar/slot booking in INC-1 (RW-11)** · **duplicate/share-link + global search deferred**.

### 13.2 DECIDED-BY-REWRITE (rewrite-originated; owner may veto)
- **RW-01** Three-tier metering store (E11/E12/E13) — consequence of A1-02 + INV-8.
- **RW-02** Explicit Widget lifecycle enum + transition table (§3.1).
- **RW-03** "Upgrade" CTAs → Request-Upgrade Lead (E14 `source=request-upgrade` + "Upgrades" queue).
- **RW-04** F-FORECAST linear run-rate + zero-guard — ledger-ratified.
- **RW-05** Marketing testimonials depend on the Reviews Tool shipping (dog-food sequencing); moderated per §9.10.
- **RW-06** Refer-a-friend coupon redemption admin-applied in INC-1 — ledger-ratified.
- **RW-07** StaffUser (E22) separate identity from User (E1) — ledger-ratified.
- **RW-08** §12 audit-logging scope, required by INV-11.
- **RW-09** `allowed_domains` allow-list on E7 (enforced by INV-13; replaces "block domains", closes a view-inflation path) — ledger-ratified; duplicate + share-link deferred.
- **RW-10** INC-1 single-owner; Membership/Editor/Viewer/invitation/Project-scoping [LATER] — ledger-ratified.
- **RW-11** Consultation capture includes calendar/slot booking in INC-1 (E14.scheduled_slot) — ledger-ratified.
- **RW-12** AI Chatbot excluded from INC-1 flagship set; WhatsApp Chat non-AI — ledger-ratified.
- **RW-13** [from R3V1-02] "Request a tool" wishlist + voting deferred to [LATER]. *Default; veto → add a simple capture in INC-1.*
- **RW-14** [from R3V1-01] E19 IncentiveProgram: `referral` kind is INC-1 (backs Deals/Refer-a-Friend); `affiliate`/`reseller` kinds [LATER]; `Coupon.program_id` nullable in INC-1. Closes INV-14 for the referral surface.
- **RW-15** [from R3V1-01] E21 Ticket ships **stub scope** in INC-1 (`open→resolved`, create/view/resolve); full ticketing (pending/closed/SLA/reopen) [LATER]. Closes INV-14 for the Support surface.

### 13.3 Deferred-to-build (category (c) — not decisions to make now)
Per-Tool editor tab layouts; exact iconography; blog/CMS field lists; admin Shopify-listing preview field set; upgrade-request routing UI copy; F-FORECAST smoothing; view-forecast formatting; global-search implementation; My-Widgets view/sort presentation detail. Brief-cited reference numbers (Elfsight prices/counts, Shopify Partner terms) are **illustrative** — verify at build; none hard-coded.

---

## Closing notes — assumptions to sanity-check
1. **Full 8–12 flagship Tools in INC-1 (R2V1-05)** is a large first release — confirm team capacity or consider a phased sub-order within INC-1.
2. **Metering store shape (RW-01)** is an architectural commitment (aggregates, not raw scans).
3. **INC-1 has no self-serve payment (A2-01/INV-10)** — all paid upgrades admin-manual/offline.
4. **INC-1 is single-owner (RW-10)** and ships **stub ticketing + admin-applied referral only (RW-14/15)** — confirm these thin-slices fit the first-release audience.
5. **Permissions grid (§10)** — ratify both tables with a human owner.
6. **Currency INR-only (A1-07); GST rate (S-GST-RATE)** set by Finance at launch.
