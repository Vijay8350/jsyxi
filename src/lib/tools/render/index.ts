// Isomorphic tool renderers → scoped HTML + CSS. Used by the builder preview, the /e embed
// page, and the embed API. Interactivity lives in EMBED_RUNTIME_JS (shared by preview + loader).

export type RenderMode = "block" | "overlay";
export type RenderOpts = {
  id: string; // container element id → CSS scope root
  embedKey?: string;
  apiBase?: string;
  preview?: boolean;
  branding?: boolean;
};
export type RenderResult = { mode: RenderMode; html: string; css: string };

type Cfg = Record<string, unknown>;

const esc = (s: unknown): string =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const num = (v: unknown, d = 0): number => {
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : d;
};
const bool = (v: unknown, d = false): boolean => (typeof v === "boolean" ? v : v === "true" ? true : v === "false" ? false : d);
const col = (v: unknown, d: string): string => {
  const s = String(v ?? "").trim();
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s) ? s : d;
};
const safeUrl = (v: unknown): string => {
  const s = String(v ?? "").trim();
  if (!s) return "#";
  if (/^(https?:|mailto:|tel:|\/)/i.test(s)) return esc(s);
  return `https://${esc(s)}`;
};
const arr = (v: unknown): Cfg[] => (Array.isArray(v) ? (v as Cfg[]) : []);

function stars(n: number, color: string): string {
  const full = Math.max(0, Math.min(5, Math.round(n)));
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += `<span class="jw-star" style="color:${i < full ? color : "#e5e7eb"}">★</span>`;
  }
  return out;
}

function brandingHtml(show: boolean, apiBase: string): string {
  if (!show) return "";
  return `<div class="jw-brand"><a href="${apiBase || "https://jsyxi.local"}" target="_blank" rel="noopener">Powered by <b>jsyxi</b></a></div>`;
}

export function renderWidget(toolKey: string, config: Cfg, opts: RenderOpts): RenderResult {
  const r = `#${opts.id}`;
  const apiBase = opts.apiBase ?? "";
  const brand = brandingHtml(!!opts.branding, apiBase);

  switch (toolKey) {
    // ── Reviews ──────────────────────────────────────────────────────────────
    case "reviews": {
      const items = arr(config.reviews);
      const cols = Math.max(1, Math.min(4, num(config.columns, 3)));
      const layout = String(config.layout ?? "grid");
      const accent = col(config.accentColor, "#f59e0b");
      const cardBg = col(config.cardBackground, "#ffffff");
      const rounded = bool(config.rounded, true);
      const cards = items
        .map(
          (rev) => `
        <figure class="jw-card">
          <div class="jw-rating">${bool(config.showRating, true) ? stars(num(rev.rating, 5), accent) : ""}</div>
          <blockquote>${esc(rev.text)}</blockquote>
          <figcaption>
            ${rev.avatar ? `<img src="${safeUrl(rev.avatar)}" alt="" class="jw-avatar"/>` : `<span class="jw-avatar jw-avatar-ph">${esc(String(rev.author ?? "?").charAt(0))}</span>`}
            <span><b>${esc(rev.author)}</b>${rev.date ? `<em>${esc(rev.date)}</em>` : ""}</span>
          </figcaption>
        </figure>`,
        )
        .join("");
      const html = `<div class="jw jw-reviews jw-${layout}">
        ${bool(config.showHeading, true) ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-grid">${cards}</div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-reviews{font-family:inherit}
        ${r} .jw-heading{font-size:22px;font-weight:700;margin:0 0 16px;text-align:center;color:#0f172a}
        ${r} .jw-grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:16px}
        ${r} .jw-carousel .jw-grid,${r} .jw-list .jw-grid{grid-template-columns:1fr}
        ${r} .jw-carousel .jw-grid{grid-auto-flow:column;grid-auto-columns:minmax(280px,1fr);overflow-x:auto;scroll-snap-type:x mandatory}
        ${r} .jw-card{background:${cardBg};border:1px solid #e5e7eb;border-radius:${rounded ? "14px" : "4px"};padding:18px;scroll-snap-align:start}
        ${r} .jw-rating{font-size:16px;letter-spacing:2px;margin-bottom:8px}
        ${r} .jw-card blockquote{margin:0 0 14px;color:#334155;font-size:15px;line-height:1.55}
        ${r} .jw-card figcaption{display:flex;align-items:center;gap:10px;font-size:14px}
        ${r} .jw-card figcaption em{display:block;color:#94a3b8;font-style:normal;font-size:12px}
        ${r} .jw-avatar{width:36px;height:36px;border-radius:50%;object-fit:cover}
        ${r} .jw-avatar-ph{display:flex;align-items:center;justify-content:center;background:#cffafe;color:#0d9488;font-weight:700}
        ${r} .jw-brand{text-align:center;margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Countdown ──────────────────────────────────────────────────────────────
    case "countdown": {
      const accent = col(config.accentColor, "#dc2626");
      const textColor = col(config.textColor, "#111827");
      const bg = col(config.backgroundColor, "#f3f4f6");
      const layout = String(config.layout ?? "boxes");
      const showLabels = bool(config.showLabels, true);
      const endAt = esc(config.endAt);
      const html = `<div class="jw jw-countdown" data-endat="${endAt}" data-hide="${bool(config.hideOnExpire, false)}" data-expired="${esc(config.expiredMessage)}">
        <h3 class="jw-heading">${esc(config.heading)}</h3>
        <div class="jw-clock jw-${layout}">
          ${["days", "hours", "minutes", "seconds"].map((u) => `<div class="jw-unit"><span class="jw-num" data-u="${u}">00</span>${showLabels ? `<span class="jw-lbl">${u}</span>` : ""}</div>`).join("")}
        </div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-countdown{text-align:center;font-family:inherit}
        ${r} .jw-heading{font-size:20px;font-weight:700;margin:0 0 14px;color:${textColor}}
        ${r} .jw-clock{display:inline-flex;gap:10px}
        ${r} .jw-unit{display:flex;flex-direction:column;align-items:center;min-width:64px}
        ${r} .jw-boxes .jw-unit{background:${bg};border-radius:12px;padding:12px 8px}
        ${r} .jw-num{font-size:32px;font-weight:800;color:${accent};font-variant-numeric:tabular-nums;line-height:1}
        ${r} .jw-lbl{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#64748b;margin-top:6px}
        ${r} .jw-inline .jw-unit{min-width:auto}
        ${r} .jw-inline .jw-num{font-size:24px}
        ${r} .jw-expired{font-size:16px;font-weight:600;color:${textColor}}
        ${r} .jw-brand{margin-top:14px;font-size:12px}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── FAQ ────────────────────────────────────────────────────────────────────
    case "faq": {
      const items = arr(config.items);
      const accent = col(config.accentColor, "#0ea5e9");
      const border = col(config.borderColor, "#e5e7eb");
      const openFirst = bool(config.openFirst, true);
      const html = `<div class="jw jw-faq" data-multiple="${bool(config.allowMultiple, false)}">
        <h3 class="jw-heading">${esc(config.heading)}</h3>
        <div class="jw-items">
          ${items
            .map(
              (it, i) => `<div class="jw-item${openFirst && i === 0 ? " jw-open" : ""}">
              <button class="jw-q" type="button"><span>${esc(it.question)}</span><span class="jw-chev">⌄</span></button>
              <div class="jw-a"><p>${esc(it.answer)}</p></div>
            </div>`,
            )
            .join("")}
        </div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-faq{font-family:inherit}
        ${r} .jw-heading{font-size:22px;font-weight:700;margin:0 0 16px;color:#0f172a}
        ${r} .jw-item{border-bottom:1px solid ${border}}
        ${r} .jw-q{width:100%;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:0;padding:16px 4px;font-size:16px;font-weight:600;color:#0f172a;cursor:pointer;text-align:left}
        ${r} .jw-chev{transition:transform .2s;color:${accent};font-size:20px}
        ${r} .jw-item.jw-open .jw-chev{transform:rotate(180deg)}
        ${r} .jw-a{max-height:0;overflow:hidden;transition:max-height .25s ease}
        ${r} .jw-item.jw-open .jw-a{max-height:400px}
        ${r} .jw-a p{margin:0;padding:0 4px 16px;color:#475569;line-height:1.6}
        ${r} .jw-brand{margin-top:14px;font-size:12px}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Instagram feed ─────────────────────────────────────────────────────────
    case "instagram": {
      const posts = arr(config.posts);
      const cols = Math.max(2, Math.min(6, num(config.columns, 4)));
      const rounded = bool(config.rounded, true);
      const showCaptions = bool(config.showCaptions, false);
      const html = `<div class="jw jw-ig">
        <div class="jw-ighead"><b>${esc(config.username)}</b></div>
        <div class="jw-iggrid">
          ${posts
            .map(
              (p) => `<a class="jw-igcell" href="${safeUrl(p.link)}" target="_blank" rel="noopener">
              ${p.image ? `<img src="${safeUrl(p.image)}" alt="${esc(p.caption)}"/>` : `<span class="jw-igph">◎</span>`}
              ${showCaptions && p.caption ? `<span class="jw-igcap">${esc(p.caption)}</span>` : ""}
            </a>`,
            )
            .join("")}
        </div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-ig{font-family:inherit}
        ${r} .jw-ighead{margin-bottom:12px;font-size:16px;color:#0f172a}
        ${r} .jw-iggrid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:8px}
        ${r} .jw-igcell{position:relative;aspect-ratio:1;overflow:hidden;border-radius:${rounded ? "12px" : "2px"};background:#f1f5f9;display:block}
        ${r} .jw-igcell img{width:100%;height:100%;object-fit:cover}
        ${r} .jw-igph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#cbd5e1;font-size:28px}
        ${r} .jw-igcap{position:absolute;inset:auto 0 0 0;background:linear-gradient(transparent,rgba(0,0,0,.6));color:#fff;font-size:11px;padding:14px 8px 6px}
        ${r} .jw-brand{margin-top:14px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Maps ───────────────────────────────────────────────────────────────────
    case "maps": {
      const q = encodeURIComponent(String(config.query ?? "India Gate, New Delhi"));
      const height = Math.max(160, Math.min(800, num(config.height, 360)));
      const zoom = Math.max(1, Math.min(20, num(config.zoom, 14)));
      const accent = col(config.accentColor, "#16a34a");
      const src = `https://maps.google.com/maps?q=${q}&z=${zoom}&output=embed`;
      const html = `<div class="jw jw-maps">
        <h3 class="jw-heading">${esc(config.heading)}</h3>
        <div class="jw-mapwrap"><iframe title="map" src="${src}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
        ${bool(config.showDirectionsLink, true) ? `<a class="jw-dir" href="https://maps.google.com/maps?q=${q}" target="_blank" rel="noopener">Get directions →</a>` : ""}
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-maps{font-family:inherit}
        ${r} .jw-heading{font-size:20px;font-weight:700;margin:0 0 12px;color:#0f172a}
        ${r} .jw-mapwrap{border-radius:12px;overflow:hidden;border:1px solid #e5e7eb}
        ${r} .jw-mapwrap iframe{width:100%;height:${height}px;border:0;display:block}
        ${r} .jw-dir{display:inline-block;margin-top:10px;color:${accent};font-weight:600;text-decoration:none}
        ${r} .jw-brand{margin-top:12px;font-size:12px}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Form ───────────────────────────────────────────────────────────────────
    case "form": {
      const fields = arr(config.fields);
      const accent = col(config.accentColor, "#0d9488");
      const layout = String(config.layout ?? "stacked");
      const action = opts.embedKey ? `${apiBase}/api/embed/form/${opts.embedKey}` : "";
      const inputs = fields
        .map((f) => {
          const name = esc(f.name || "field");
          const label = esc(f.label || name);
          const req = bool(f.required) ? "required" : "";
          const ph = esc(f.placeholder ?? "");
          const type = String(f.type ?? "text");
          const control =
            type === "textarea"
              ? `<textarea name="${name}" placeholder="${ph}" ${req}></textarea>`
              : `<input type="${type === "tel" ? "tel" : type === "email" ? "email" : "text"}" name="${name}" placeholder="${ph}" ${req}/>`;
          return `<label class="jw-f"><span>${label}${req ? ' <i style="color:#ef4444">*</i>' : ""}</span>${control}</label>`;
        })
        .join("");
      const html = `<form class="jw jw-form jw-${layout}" data-preview="${opts.preview ? 1 : 0}" ${action ? `action="${action}" method="post"` : ""}>
        <h3 class="jw-heading">${esc(config.heading)}</h3>
        ${config.description ? `<p class="jw-desc">${esc(config.description)}</p>` : ""}
        <div class="jw-fields">${inputs}</div>
        <button type="submit" class="jw-submit">${esc(config.submitLabel || "Submit")}</button>
        <div class="jw-success" hidden>${esc(config.successMessage || "Thanks!")}</div>
      </form>`;
      const css = `
        ${r} .jw-form{font-family:inherit;max-width:520px}
        ${r} .jw-heading{font-size:22px;font-weight:700;margin:0 0 6px;color:#0f172a}
        ${r} .jw-desc{color:#64748b;margin:0 0 16px}
        ${r} .jw-fields{display:grid;gap:12px}
        ${r} .jw-inline .jw-fields{grid-template-columns:1fr 1fr}
        ${r} .jw-f{display:flex;flex-direction:column;gap:4px;font-size:14px;font-weight:500;color:#334155}
        ${r} .jw-f input,${r} .jw-f textarea{border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;font-size:14px;font-family:inherit;width:100%}
        ${r} .jw-f textarea{min-height:96px}
        ${r} .jw-f input:focus,${r} .jw-f textarea:focus{outline:2px solid ${accent}55;border-color:${accent}}
        ${r} .jw-submit{margin-top:16px;background:${accent};color:#fff;border:0;border-radius:8px;padding:11px 18px;font-size:15px;font-weight:600;cursor:pointer}
        ${r} .jw-success{margin-top:14px;background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;border-radius:8px;padding:12px}`;
      return { mode: "block", html, css };
    }

    // ── WhatsApp (overlay) ─────────────────────────────────────────────────────
    case "whatsapp": {
      const phone = String(config.phone ?? "").replace(/[^0-9]/g, "");
      const btnColor = col(config.buttonColor, "#25D366");
      const pos = String(config.position ?? "bottom-right");
      const msg = encodeURIComponent(String(config.prefilledMessage ?? ""));
      const link = phone ? `https://wa.me/${phone}?text=${msg}` : "#";
      const html = `<div class="jw jw-wa jw-${pos}" data-delay="${num(config.delaySeconds, 0)}">
        <div class="jw-wapanel" hidden>
          <div class="jw-wahead">
            ${config.avatar ? `<img src="${safeUrl(config.avatar)}" alt=""/>` : `<span class="jw-waav">${esc(String(config.agentName ?? "S").charAt(0))}</span>`}
            <div><b>${esc(config.agentName)}</b><em>${esc(config.agentTitle)}</em></div>
            <button class="jw-waclose" type="button" aria-label="Close">×</button>
          </div>
          <div class="jw-wabody"><p class="jw-wabubble">${esc(config.greeting)}</p></div>
          <a class="jw-wago" href="${link}" target="_blank" rel="noopener">Start chat</a>
        </div>
        <button class="jw-wabtn" type="button">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.2-.9-2.7-1.2-4.4-4-4.5-4.2-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2 1.2 2.3 1.1.2-.1.4-.4.6-.7.2-.3.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.3.1.7-.1 1.3Z"/></svg>
          <span class="jw-walabel">${esc(config.buttonLabel)}</span>
        </button>
      </div>`;
      const side = pos === "bottom-left" ? "left:20px" : "right:20px";
      const css = `
        ${r} .jw-wa{position:fixed;bottom:20px;${side};z-index:2147483000;font-family:inherit}
        ${r} .jw-wabtn{display:flex;align-items:center;gap:8px;background:${btnColor};color:#fff;border:0;border-radius:999px;padding:12px 18px;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.2)}
        ${r} .jw-wapanel{position:absolute;bottom:70px;${side.split(":")[0]}:0;width:300px;background:#fff;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.25);overflow:hidden}
        ${r} .jw-wahead{display:flex;align-items:center;gap:10px;background:#075E54;color:#fff;padding:12px 14px}
        ${r} .jw-wahead img,${r} .jw-waav{width:40px;height:40px;border-radius:50%;object-fit:cover;background:#128C7E;display:flex;align-items:center;justify-content:center;font-weight:700}
        ${r} .jw-wahead b{display:block;font-size:14px}${r} .jw-wahead em{font-style:normal;font-size:12px;opacity:.85}
        ${r} .jw-waclose{margin-left:auto;background:none;border:0;color:#fff;font-size:22px;cursor:pointer;line-height:1}
        ${r} .jw-wabody{padding:16px;background:#ECE5DD;min-height:70px}
        ${r} .jw-wabubble{background:#fff;border-radius:10px;padding:10px 12px;margin:0;font-size:14px;color:#111;box-shadow:0 1px 1px rgba(0,0,0,.1)}
        ${r} .jw-wago{display:block;text-align:center;background:${btnColor};color:#fff;padding:12px;font-weight:600;text-decoration:none}`;
      return { mode: "overlay", html, css };
    }

    // ── Popup / Announcement bar (overlay) ─────────────────────────────────────
    case "popup": {
      const mode = String(config.mode ?? "bar");
      const bg = col(config.backgroundColor, "#111827");
      const fg = col(config.textColor, "#ffffff");
      const ctaColor = col(config.ctaColor, "#f59e0b");
      const pos = String(config.position ?? "top");
      const cta = config.ctaLabel
        ? `<a class="jw-cta" href="${safeUrl(config.ctaUrl)}" target="_blank" rel="noopener">${esc(config.ctaLabel)}</a>`
        : "";
      const dismiss = bool(config.dismissible, true) ? `<button class="jw-close" type="button" aria-label="Dismiss">×</button>` : "";
      const html = `<div class="jw jw-popup jw-${mode} jw-${pos}" data-once="${bool(config.showOnce, true)}" data-delay="${num(config.delaySeconds, 2)}" data-key="${esc(opts.embedKey ?? opts.id)}" hidden>
        ${mode === "modal" ? `<div class="jw-backdrop"></div>` : ""}
        <div class="jw-panel">
          <div class="jw-copy"><b>${esc(config.heading)}</b>${config.message ? `<span>${esc(config.message)}</span>` : ""}</div>
          ${cta}${dismiss}
        </div>
      </div>`;
      const css = `
        ${r} .jw-popup{font-family:inherit;z-index:2147482000}
        ${r} .jw-bar{position:fixed;left:0;right:0;${pos === "bottom" ? "bottom:0" : "top:0"};background:${bg};color:${fg}}
        ${r} .jw-bar .jw-panel{display:flex;align-items:center;gap:14px;justify-content:center;padding:12px 16px;max-width:1100px;margin:0 auto;flex-wrap:wrap}
        ${r} .jw-copy b{font-weight:700}${r} .jw-copy span{margin-left:8px;opacity:.9}
        ${r} .jw-cta{background:${ctaColor};color:#111;padding:7px 14px;border-radius:8px;font-weight:600;text-decoration:none}
        ${r} .jw-close{background:none;border:0;color:inherit;font-size:22px;cursor:pointer;line-height:1;opacity:.8}
        ${r} .jw-modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}
        ${r} .jw-modal .jw-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5)}
        ${r} .jw-modal .jw-panel{position:relative;background:${bg};color:${fg};border-radius:16px;padding:28px;max-width:400px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.35)}
        ${r} .jw-modal .jw-copy b{font-size:20px;display:block;margin-bottom:8px}
        ${r} .jw-modal .jw-copy span{margin:0;display:block}
        ${r} .jw-modal .jw-cta{display:inline-block;margin-top:16px}
        ${r} .jw-modal .jw-close{position:absolute;top:10px;right:14px}`;
      return { mode: "overlay", html, css };
    }

    // ── Business Hours ─────────────────────────────────────────────────────────
    case "hours": {
      const days = arr(config.days);
      const accent = col(config.accentColor, "#0d9488");
      const layout = String(config.layout ?? "table");
      const showStatus = bool(config.showStatus, true);
      const schedule = JSON.stringify(days.map((d) => ({ closed: bool(d.closed, false), from: String(d.from ?? ""), to: String(d.to ?? "") })));
      const rows = days
        .map((d, i) => `<div class="jw-hrow" data-i="${i}"><span class="jw-hday">${esc(d.label)}</span><span class="jw-htime">${bool(d.closed, false) ? "Closed" : `${esc(d.from)} – ${esc(d.to)}`}</span></div>`)
        .join("");
      const html = `<div class="jw jw-hours jw-${layout}" data-offset="${num(config.utcOffset, 5.5)}" data-schedule="${esc(schedule)}">
        <div class="jw-hhead"><h3 class="jw-heading">${esc(config.heading)}</h3>${showStatus ? `<span class="jw-status jw-status-loading">…</span>` : ""}</div>
        <div class="jw-hlist">${rows}</div>${brand}
      </div>`;
      const css = `
        ${r} .jw-hours{font-family:inherit;max-width:420px}
        ${r} .jw-hhead{display:flex;align-items:center;gap:10px;margin-bottom:12px}
        ${r} .jw-heading{font-size:20px;font-weight:700;margin:0;color:#0f172a}
        ${r} .jw-status{font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px;white-space:nowrap}
        ${r} .jw-status-open{background:#dcfce7;color:#15803d}
        ${r} .jw-status-closed{background:#fee2e2;color:#b91c1c}
        ${r} .jw-status-loading{background:#f1f5f9;color:#94a3b8}
        ${r} .jw-hlist{border:1px solid #e5e7eb;border-radius:12px;overflow:hidden}
        ${r} .jw-hrow{display:flex;justify-content:space-between;gap:12px;padding:11px 14px;font-size:14px;border-top:1px solid #f1f5f9}
        ${r} .jw-hrow:first-child{border-top:0}
        ${r} .jw-compact .jw-hrow{padding:7px 12px;font-size:13px}
        ${r} .jw-hrow.jw-today{background:${accent}14;font-weight:600}
        ${r} .jw-hrow.jw-today .jw-hday{color:${accent}}
        ${r} .jw-hday{color:#334155}${r} .jw-htime{color:#64748b}
        ${r} .jw-brand{margin-top:12px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Animated Counter ───────────────────────────────────────────────────────
    case "counter": {
      const items = arr(config.items);
      const cols = Math.max(1, Math.min(4, num(config.columns, 4)));
      const accent = col(config.accentColor, "#0d9488");
      const align = String(config.align ?? "center");
      const cells = items
        .map((it) => {
          const val = num(it.value, 0);
          const dec = Number.isInteger(val) ? 0 : 1;
          return `<div class="jw-cstat">
            ${it.icon ? `<div class="jw-cicon">${esc(it.icon)}</div>` : ""}
            <div class="jw-cnum" data-target="${val}" data-dec="${dec}"><span>${esc(it.prefix)}</span><span class="jw-cval">0</span><span>${esc(it.suffix)}</span></div>
            <div class="jw-clabel">${esc(it.label)}</div>
          </div>`;
        })
        .join("");
      const html = `<div class="jw jw-counter jw-al-${align}" data-duration="${num(config.duration, 1600)}" data-sep="${bool(config.separator, true)}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-cgrid">${cells}</div>${brand}
      </div>`;
      const css = `
        ${r} .jw-counter{font-family:inherit}
        ${r} .jw-heading{font-size:22px;font-weight:700;margin:0 0 20px;text-align:center;color:#0f172a}
        ${r} .jw-cgrid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:20px}
        ${r} .jw-cstat{text-align:center}
        ${r} .jw-al-left .jw-cstat{text-align:left}${r} .jw-al-left .jw-heading{text-align:left}
        ${r} .jw-cicon{font-size:26px;margin-bottom:6px}
        ${r} .jw-cnum{font-size:38px;font-weight:800;color:${accent};font-variant-numeric:tabular-nums;line-height:1.1}
        ${r} .jw-clabel{margin-top:6px;font-size:14px;color:#64748b}
        ${r} .jw-brand{margin-top:16px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}
        @media(max-width:640px){${r} .jw-cgrid{grid-template-columns:repeat(2,1fr)}}`;
      return { mode: "block", html, css };
    }

    // ── Logo Showcase ──────────────────────────────────────────────────────────
    case "logos": {
      const logos = arr(config.logos);
      const cols = Math.max(2, Math.min(6, num(config.columns, 5)));
      const gray = bool(config.grayscale, true);
      const ticker = String(config.layout ?? "grid") === "ticker";
      const speed = Math.max(5, Math.min(120, num(config.speed, 30)));
      const cell = (l: Cfg) => `<a class="jw-logo" href="${safeUrl(l.link)}" target="_blank" rel="noopener" title="${esc(l.alt)}">${l.image ? `<img src="${safeUrl(l.image)}" alt="${esc(l.alt)}"/>` : `<span class="jw-logoph">${esc(l.alt || "Logo")}</span>`}</a>`;
      const cells = logos.map(cell).join("");
      const head = config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : "";
      const html = ticker
        ? `<div class="jw jw-logos jw-tickerw${gray ? " jw-gray" : ""}">${head}<div class="jw-tickview"><div class="jw-track">${cells}${cells}</div></div>${brand}</div>`
        : `<div class="jw jw-logos${gray ? " jw-gray" : ""}">${head}<div class="jw-loggrid">${cells}</div>${brand}</div>`;
      const css = `
        ${r} .jw-logos{font-family:inherit}
        ${r} .jw-heading{font-size:16px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;text-align:center;margin:0 0 20px}
        ${r} .jw-loggrid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:24px;align-items:center}
        ${r} .jw-logo{display:flex;align-items:center;justify-content:center;height:56px}
        ${r} .jw-logo img{max-height:44px;max-width:100%;object-fit:contain}
        ${r} .jw-logoph{font-weight:800;font-size:18px;color:#94a3b8;letter-spacing:.02em}
        ${r} .jw-gray .jw-logo img,${r} .jw-gray .jw-logoph{filter:grayscale(1);opacity:.6;transition:.3s}
        ${r} .jw-gray .jw-logo:hover img,${r} .jw-gray .jw-logo:hover .jw-logoph{filter:none;opacity:1}
        ${r} .jw-tickview{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
        ${r} .jw-track{display:flex;gap:56px;width:max-content;animation:jwlogos ${speed}s linear infinite}
        ${r} .jw-tickerw:hover .jw-track{animation-play-state:paused}
        @keyframes jwlogos{to{transform:translateX(-50%)}}
        ${r} .jw-brand{margin-top:18px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Team Showcase ──────────────────────────────────────────────────────────
    case "team": {
      const members = arr(config.members);
      const cols = Math.max(2, Math.min(4, num(config.columns, 3)));
      const accent = col(config.accentColor, "#0d9488");
      const round = bool(config.round, true);
      const list = String(config.layout ?? "grid") === "list";
      const showBio = bool(config.showBio, true);
      const showSocial = bool(config.showSocial, true);
      const soc = (m: Cfg) => showSocial
        ? `<div class="jw-tsoc">${m.email ? `<a href="mailto:${esc(m.email)}" aria-label="Email">✉</a>` : ""}${m.linkedin ? `<a href="${safeUrl(m.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>` : ""}${m.twitter ? `<a href="${safeUrl(m.twitter)}" target="_blank" rel="noopener" aria-label="X">𝕏</a>` : ""}</div>`
        : "";
      const cards = members
        .map((m) => `<div class="jw-tcard">
          ${m.photo ? `<img class="jw-tphoto" src="${safeUrl(m.photo)}" alt="${esc(m.name)}"/>` : `<span class="jw-tphoto jw-tph">${esc(String(m.name ?? "?").charAt(0))}</span>`}
          <div class="jw-tbody"><b class="jw-tname">${esc(m.name)}</b><span class="jw-trole">${esc(m.role)}</span>${showBio && m.bio ? `<p class="jw-tbio">${esc(m.bio)}</p>` : ""}${soc(m)}</div>
        </div>`)
        .join("");
      const html = `<div class="jw jw-team ${list ? "jw-tlist" : "jw-tgrid"}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-troster">${cards}</div>${brand}
      </div>`;
      const css = `
        ${r} .jw-team{font-family:inherit}
        ${r} .jw-heading{font-size:24px;font-weight:800;text-align:center;margin:0 0 24px;color:#0f172a}
        ${r} .jw-tgrid .jw-troster{display:grid;grid-template-columns:repeat(${cols},1fr);gap:20px}
        ${r} .jw-tgrid .jw-tcard{text-align:center;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:22px}
        ${r} .jw-tlist .jw-troster{display:grid;gap:14px}
        ${r} .jw-tlist .jw-tcard{display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:14px}
        ${r} .jw-tphoto{width:88px;height:88px;object-fit:cover;border-radius:${round ? "50%" : "14px"};display:inline-flex;align-items:center;justify-content:center;background:${accent}1a;color:${accent};font-size:30px;font-weight:800}
        ${r} .jw-tgrid .jw-tphoto{margin:0 auto}
        ${r} .jw-tlist .jw-tphoto{width:64px;height:64px;font-size:22px;flex-shrink:0}
        ${r} .jw-tbody{margin-top:14px}${r} .jw-tlist .jw-tbody{margin-top:0;text-align:left}
        ${r} .jw-tname{font-size:16px;color:#0f172a}
        ${r} .jw-trole{display:block;font-size:13px;font-weight:600;color:${accent};margin-top:2px}
        ${r} .jw-tbio{font-size:13px;color:#64748b;margin:10px 0 0;line-height:1.5}
        ${r} .jw-tsoc{display:flex;gap:8px;margin-top:12px;justify-content:center}
        ${r} .jw-tlist .jw-tsoc{justify-content:flex-start}
        ${r} .jw-tsoc a{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:#f1f5f9;color:#475569;font-size:13px;font-weight:700;text-decoration:none;transition:.2s}
        ${r} .jw-tsoc a:hover{background:${accent};color:#fff}
        ${r} .jw-brand{margin-top:18px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}
        @media(max-width:640px){${r} .jw-tgrid .jw-troster{grid-template-columns:1fr 1fr}}`;
      return { mode: "block", html, css };
    }

    // ── Timeline ───────────────────────────────────────────────────────────────
    case "timeline": {
      const items = arr(config.items);
      const accent = col(config.accentColor, "#0d9488");
      const line = col(config.lineColor, "#e2e8f0");
      const alt = String(config.layout ?? "vertical") === "alternating";
      const nodes = items
        .map((it, i) => `<div class="jw-tlnode" style="animation-delay:${i * 90}ms">
          <span class="jw-tldot">${it.icon ? esc(it.icon) : ""}</span>
          <div class="jw-tlcard">
            <span class="jw-tldate">${esc(it.date)}</span>
            <b class="jw-tltitle">${esc(it.title)}</b>
            ${it.text ? `<p class="jw-tltext">${esc(it.text)}</p>` : ""}
          </div>
        </div>`)
        .join("");
      const html = `<div class="jw jw-timeline ${alt ? "jw-alt" : ""}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-tlline">${nodes}</div>${brand}
      </div>`;
      const css = `
        ${r} .jw-timeline{font-family:inherit}
        ${r} .jw-heading{font-size:24px;font-weight:800;text-align:center;margin:0 0 28px;color:#0f172a}
        ${r} .jw-tlline{position:relative;padding-left:34px}
        ${r} .jw-tlline:before{content:"";position:absolute;left:11px;top:6px;bottom:6px;width:2px;background:${line}}
        ${r} .jw-tlnode{position:relative;padding-bottom:26px;animation:jwtl .6s ease both}
        ${r} .jw-tlnode:last-child{padding-bottom:0}
        ${r} .jw-tldot{position:absolute;left:-34px;top:0;width:24px;height:24px;border-radius:50%;background:#fff;border:2px solid ${accent};color:${accent};display:flex;align-items:center;justify-content:center;font-size:12px;box-shadow:0 0 0 4px #fff}
        ${r} .jw-tlcard{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px 16px}
        ${r} .jw-tldate{font-size:12px;font-weight:700;color:${accent};text-transform:uppercase;letter-spacing:.04em}
        ${r} .jw-tltitle{display:block;font-size:16px;color:#0f172a;margin-top:2px}
        ${r} .jw-tltext{margin:6px 0 0;font-size:14px;color:#64748b;line-height:1.55}
        @keyframes jwtl{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        @media(min-width:720px){
          ${r} .jw-alt .jw-tlline{padding-left:0}
          ${r} .jw-alt .jw-tlline:before{left:50%;transform:translateX(-1px)}
          ${r} .jw-alt .jw-tlnode{width:50%;padding-left:0}
          ${r} .jw-alt .jw-tlnode:nth-child(odd){margin-left:auto;padding-left:34px}
          ${r} .jw-alt .jw-tlnode:nth-child(even){padding-right:34px;text-align:right}
          ${r} .jw-alt .jw-tlnode:nth-child(odd) .jw-tldot{left:-34px}
          ${r} .jw-alt .jw-tlnode:nth-child(even) .jw-tldot{left:auto;right:-34px}
        }
        ${r} .jw-brand{margin-top:18px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}
        @media(prefers-reduced-motion:reduce){${r} .jw-tlnode{animation:none}}`;
      return { mode: "block", html, css };
    }

    // ── Photo Gallery ──────────────────────────────────────────────────────────
    case "gallery": {
      const images = arr(config.images);
      const cols = Math.max(2, Math.min(5, num(config.columns, 3)));
      const masonry = String(config.layout ?? "grid") === "masonry";
      const rounded = bool(config.rounded, true);
      const lb = bool(config.lightbox, true);
      const caps = bool(config.showCaptions, false);
      const data = JSON.stringify(images.map((g) => ({ src: safeUrl(g.src), cap: String(g.caption ?? "") })));
      const cells = images
        .map((g, i) => `<button class="jw-gcell" type="button" data-i="${i}"${lb ? "" : " disabled"}>
          ${g.src ? `<img src="${safeUrl(g.src)}" alt="${esc(g.alt || g.caption)}" loading="lazy"/>` : `<span class="jw-gph">◎</span>`}
          ${caps && g.caption ? `<span class="jw-gcap">${esc(g.caption)}</span>` : ""}
        </button>`)
        .join("");
      const html = `<div class="jw jw-gallery ${masonry ? "jw-masonry" : "jw-grid"}" data-lb="${lb}" data-images="${esc(data)}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-ggrid">${cells}</div>${brand}
        ${lb ? `<div class="jw-lb" hidden><div class="jw-lbbd"></div><button class="jw-lbx" type="button" aria-label="Close">×</button><button class="jw-lbp" type="button" aria-label="Previous">‹</button><figure class="jw-lbfig"><img alt=""/><figcaption></figcaption></figure><button class="jw-lbn" type="button" aria-label="Next">›</button></div>` : ""}
      </div>`;
      const gap = 10;
      const css = `
        ${r} .jw-gallery{font-family:inherit}
        ${r} .jw-heading{font-size:22px;font-weight:700;margin:0 0 16px;color:#0f172a}
        ${r} .jw-grid .jw-ggrid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:${gap}px}
        ${r} .jw-masonry .jw-ggrid{columns:${cols};column-gap:${gap}px}
        ${r} .jw-masonry .jw-gcell{break-inside:avoid;margin-bottom:${gap}px;width:100%}
        ${r} .jw-gcell{position:relative;padding:0;border:0;background:#f1f5f9;cursor:pointer;overflow:hidden;border-radius:${rounded ? "12px" : "2px"};display:block}
        ${r} .jw-grid .jw-gcell{aspect-ratio:1}
        ${r} .jw-gcell img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease}
        ${r} .jw-gcell:hover img{transform:scale(1.06)}
        ${r} .jw-gcell:disabled{cursor:default}
        ${r} .jw-gph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#cbd5e1;font-size:30px}
        ${r} .jw-gcap{position:absolute;inset:auto 0 0 0;background:linear-gradient(transparent,rgba(0,0,0,.65));color:#fff;font-size:12px;padding:16px 10px 8px;text-align:left}
        ${r} .jw-lb{position:fixed;inset:0;z-index:2147483200;display:flex;align-items:center;justify-content:center}
        ${r} .jw-lb[hidden]{display:none}
        ${r} .jw-lbbd{position:absolute;inset:0;background:rgba(9,12,20,.92)}
        ${r} .jw-lbfig{position:relative;margin:0;max-width:92vw;max-height:86vh;text-align:center}
        ${r} .jw-lbfig img{max-width:92vw;max-height:80vh;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
        ${r} .jw-lbfig figcaption{color:#e2e8f0;margin-top:10px;font-size:14px}
        ${r} .jw-lbx,${r} .jw-lbp,${r} .jw-lbn{position:absolute;z-index:1;background:rgba(255,255,255,.12);color:#fff;border:0;cursor:pointer;border-radius:50%;width:44px;height:44px;font-size:26px;line-height:1;display:flex;align-items:center;justify-content:center}
        ${r} .jw-lbx:hover,${r} .jw-lbp:hover,${r} .jw-lbn:hover{background:rgba(255,255,255,.24)}
        ${r} .jw-lbx{top:18px;right:18px}${r} .jw-lbp{left:18px}${r} .jw-lbn{right:18px}
        ${r} .jw-brand{margin-top:16px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Custom Button ──────────────────────────────────────────────────────────
    case "button": {
      const action = String(config.action ?? "url");
      const target = String(config.target ?? "");
      const bg = col(config.bgColor, "#0d9488");
      const tc = col(config.textColor, "#ffffff");
      const size = String(config.size ?? "md");
      const radius = Math.max(0, Math.min(40, num(config.radius, 10)));
      const outline = String(config.variant ?? "solid") === "outline";
      const full = bool(config.fullWidth, false);
      const align = String(config.align ?? "left");
      const newTab = bool(config.newTab, true);
      let tag = "button";
      let attrs = "";
      if (action === "url") { tag = "a"; attrs = `href="${safeUrl(target)}" ${newTab ? 'target="_blank" rel="noopener"' : ""}`; }
      else if (action === "tel") { tag = "a"; attrs = `href="tel:${esc(target.replace(/[^0-9+]/g, ""))}"`; }
      else if (action === "email") { tag = "a"; attrs = `href="mailto:${esc(target)}"`; }
      else { tag = "button"; attrs = `type="button" data-action="${esc(action)}" data-target="${esc(target)}"`; }
      const inner = `${config.icon ? `<span class="jw-bicon">${esc(config.icon)}</span>` : ""}<span>${esc(config.label)}</span>`;
      const html = `<div class="jw jw-btnw jw-al-${align}">
        <${tag} class="jw-cbtn jw-s-${size}${outline ? " jw-outline" : ""}${full ? " jw-full" : ""}" ${attrs}>${inner}</${tag}>
        ${action === "copy" ? `<span class="jw-copied" hidden>Copied!</span>` : ""}
      </div>`;
      const css = `
        ${r} .jw-btnw{font-family:inherit;display:flex;align-items:center;gap:10px}
        ${r} .jw-al-center{justify-content:center}${r} .jw-al-right{justify-content:flex-end}
        ${r} .jw-cbtn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:2px solid ${bg};background:${bg};color:${tc};border-radius:${radius}px;font-weight:600;font-family:inherit;cursor:pointer;text-decoration:none;transition:transform .15s ease,box-shadow .2s ease,opacity .2s;line-height:1.2}
        ${r} .jw-cbtn:hover{transform:translateY(-1px);box-shadow:0 10px 24px -10px ${bg}}
        ${r} .jw-cbtn:active{transform:translateY(0) scale(.98)}
        ${r} .jw-outline{background:transparent;color:${bg}}
        ${r} .jw-outline:hover{background:${bg}0f}
        ${r} .jw-full{width:100%}
        ${r} .jw-s-sm{padding:8px 14px;font-size:14px}
        ${r} .jw-s-md{padding:11px 20px;font-size:15px}
        ${r} .jw-s-lg{padding:14px 28px;font-size:17px}
        ${r} .jw-bicon{font-size:1.1em}
        ${r} .jw-copied{font-size:13px;font-weight:600;color:${bg}}`;
      return { mode: "block", html, css };
    }

    // ── Back to Top (overlay) ──────────────────────────────────────────────────
    case "backtotop": {
      const size = Math.max(36, Math.min(72, num(config.size, 48)));
      const bg = col(config.bgColor, "#0d9488");
      const ic = col(config.iconColor, "#ffffff");
      const pos = String(config.position ?? "bottom-right");
      const rounded = String(config.shape ?? "circle") === "rounded";
      const progress = bool(config.showProgress, true);
      const rad = size / 2 - 3;
      const circ = 2 * Math.PI * rad;
      const ring = progress
        ? `<svg class="jw-bttring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${rad}" fill="none" stroke="${ic}33" stroke-width="3"/><circle class="jw-bttfg" cx="${size / 2}" cy="${size / 2}" r="${rad}" fill="none" stroke="${ic}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${circ.toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>`
        : "";
      const html = `<div class="jw jw-btt jw-${pos}" data-threshold="${num(config.threshold, 300)}" data-progress="${progress}" data-circ="${circ.toFixed(1)}" hidden>
        <button class="jw-bttbtn" type="button" aria-label="Back to top">
          ${ring}<span class="jw-btticon">↑</span>${config.label ? `<span class="jw-bttlabel">${esc(config.label)}</span>` : ""}
        </button>
      </div>`;
      const side = pos === "bottom-left" ? "left:20px" : "right:20px";
      const css = `
        ${r} .jw-btt{position:fixed;bottom:20px;${side};z-index:2147482500;font-family:inherit}
        ${r} .jw-bttbtn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:${size}px;height:${size}px;padding:0 ${config.label ? "16px" : "0"};background:${bg};color:${ic};border:0;border-radius:${rounded ? "14px" : "50%"};cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.22);transition:transform .2s ease,box-shadow .2s ease}
        ${r} .jw-bttbtn:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,.28)}
        ${r} .jw-btticon{font-size:${Math.round(size * 0.42)}px;font-weight:700;line-height:1}
        ${r} .jw-bttlabel{font-size:13px;font-weight:600}
        ${r} .jw-bttring{position:absolute;inset:0;pointer-events:none}
        ${r} .jw-bttfg{transition:stroke-dashoffset .1s linear}`;
      return { mode: "overlay", html, css };
    }

    // ── Before / After ─────────────────────────────────────────────────────────
    case "beforeafter": {
      const vert = String(config.orientation ?? "horizontal") === "vertical";
      const aspect = String(config.aspect ?? "16/9");
      const start = Math.max(0, Math.min(100, num(config.startPos, 50)));
      const handle = col(config.handleColor, "#0d9488");
      const imgOrPh = (src: unknown, label: string) => src ? `<img src="${safeUrl(src)}" alt=""/>` : `<span class="jw-baph">${label}</span>`;
      const html = `<div class="jw jw-ba ${vert ? "jw-bavert" : ""}" data-start="${start}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-bawrap" style="aspect-ratio:${aspect.replace("/", " / ")};--p:${start}%">
          <div class="jw-baimg jw-baafter">${imgOrPh(config.afterImage, "After")}<span class="jw-balabel jw-labafter">${esc(config.afterLabel)}</span></div>
          <div class="jw-baimg jw-babefore">${imgOrPh(config.beforeImage, "Before")}<span class="jw-balabel jw-labbefore">${esc(config.beforeLabel)}</span></div>
          <div class="jw-bahandle"><span class="jw-baknob">⟷</span></div>
        </div>${brand}
      </div>`;
      const css = `
        ${r} .jw-ba{font-family:inherit}
        ${r} .jw-heading{font-size:20px;font-weight:700;margin:0 0 12px;color:#0f172a}
        ${r} .jw-bawrap{position:relative;width:100%;overflow:hidden;border-radius:12px;user-select:none;touch-action:none;background:#e2e8f0;cursor:ew-resize}
        ${r} .jw-bavert .jw-bawrap{cursor:ns-resize}
        ${r} .jw-baimg{position:absolute;inset:0}
        ${r} .jw-baimg img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}
        ${r} .jw-baph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-weight:700;font-size:18px;background:#f1f5f9}
        ${r} .jw-babefore{clip-path:inset(0 calc(100% - var(--p)) 0 0)}
        ${r} .jw-bavert .jw-babefore{clip-path:inset(0 0 calc(100% - var(--p)) 0)}
        ${r} .jw-balabel{position:absolute;bottom:12px;background:rgba(9,12,20,.7);color:#fff;font-size:12px;padding:4px 10px;border-radius:999px}
        ${r} .jw-labafter{right:12px}${r} .jw-labbefore{left:12px}
        ${r} .jw-bahandle{position:absolute;top:0;bottom:0;left:var(--p);width:3px;background:${handle};transform:translateX(-50%);pointer-events:none}
        ${r} .jw-bavert .jw-bahandle{top:var(--p);left:0;right:0;bottom:auto;width:auto;height:3px;transform:translateY(-50%)}
        ${r} .jw-baknob{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:36px;height:36px;border-radius:50%;background:${handle};color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.3);font-size:16px}
        ${r} .jw-bavert .jw-baknob{transform:translate(-50%,-50%) rotate(90deg)}
        ${r} .jw-brand{margin-top:12px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Image Slider ───────────────────────────────────────────────────────────
    case "slider": {
      const slides = arr(config.slides);
      const h = Math.max(160, Math.min(720, num(config.height, 360)));
      const overlay = bool(config.overlay, true);
      const rounded = bool(config.rounded, true);
      const arrows = bool(config.showArrows, true);
      const dots = bool(config.showDots, true);
      const sl = slides.map((s) => `<div class="jw-slide">
        ${s.image ? `<img src="${safeUrl(s.image)}" alt="${esc(s.title)}"/>` : `<span class="jw-slph"></span>`}
        ${overlay ? `<span class="jw-slov"></span>` : ""}
        ${(s.title || s.text || s.ctaLabel) ? `<div class="jw-slcap"><b>${esc(s.title)}</b>${s.text ? `<span>${esc(s.text)}</span>` : ""}${s.ctaLabel ? `<a class="jw-slcta" href="${safeUrl(s.ctaUrl)}" target="_blank" rel="noopener">${esc(s.ctaLabel)}</a>` : ""}</div>` : ""}
      </div>`).join("");
      const dotsHtml = dots ? `<div class="jw-sldots">${slides.map((_, i) => `<button class="jw-sldot${i === 0 ? " jw-active" : ""}" data-i="${i}" type="button" aria-label="Slide ${i + 1}"></button>`).join("")}</div>` : "";
      const html = `<div class="jw jw-slider" data-autoplay="${bool(config.autoplay, true)}" data-interval="${num(config.interval, 5)}">
        <div class="jw-slview"${rounded ? ' style="border-radius:16px"' : ""}><div class="jw-sltrack">${sl}</div>
        ${arrows ? `<button class="jw-slprev" type="button" aria-label="Previous">‹</button><button class="jw-slnext" type="button" aria-label="Next">›</button>` : ""}</div>
        ${dotsHtml}
      </div>`;
      const css = `
        ${r} .jw-slider{font-family:inherit}
        ${r} .jw-slview{position:relative;overflow:hidden;height:${h}px}
        ${r} .jw-sltrack{display:flex;height:100%;transition:transform .5s cubic-bezier(.4,0,.2,1)}
        ${r} .jw-slide{position:relative;flex:0 0 100%;height:100%}
        ${r} .jw-slide img{width:100%;height:100%;object-fit:cover;display:block}
        ${r} .jw-slph{display:block;width:100%;height:100%;background:linear-gradient(120deg,#99f6e4,#5eead4)}
        ${r} .jw-slov{position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,12,20,.55),rgba(9,12,20,.05))}
        ${r} .jw-slcap{position:absolute;left:0;bottom:0;padding:26px;color:#fff;max-width:70%}
        ${r} .jw-slcap b{display:block;font-size:26px;font-weight:800;line-height:1.15}
        ${r} .jw-slcap span{display:block;margin-top:8px;font-size:15px;opacity:.92}
        ${r} .jw-slcta{display:inline-block;margin-top:14px;background:#fff;color:#0f172a;padding:9px 18px;border-radius:8px;font-weight:600;text-decoration:none}
        ${r} .jw-slprev,${r} .jw-slnext{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.85);color:#0f172a;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center}
        ${r} .jw-slprev{left:14px}${r} .jw-slnext{right:14px}
        ${r} .jw-sldots{display:flex;gap:7px;justify-content:center;margin-top:12px}
        ${r} .jw-sldot{width:8px;height:8px;border-radius:50%;border:0;background:#cbd5e1;cursor:pointer;padding:0}
        ${r} .jw-sldot.jw-active{background:#0d9488;width:22px;border-radius:6px}
        @media(max-width:640px){${r} .jw-slcap{max-width:90%;padding:18px}${r} .jw-slcap b{font-size:20px}}`;
      return { mode: "block", html, css };
    }

    // ── Portfolio ──────────────────────────────────────────────────────────────
    case "portfolio": {
      const projects = arr(config.projects);
      const cols = Math.max(2, Math.min(4, num(config.columns, 3)));
      const accent = col(config.accentColor, "#0d9488");
      const rounded = bool(config.rounded, true);
      const filters = bool(config.showFilters, true);
      const cats: string[] = [];
      projects.forEach((p) => { const c = String(p.category ?? "").trim(); if (c && cats.indexOf(c) < 0) cats.push(c); });
      const filterHtml = filters && cats.length
        ? `<div class="jw-pfilters"><button class="jw-pfilter jw-active" data-cat="*" type="button">All</button>${cats.map((c) => `<button class="jw-pfilter" data-cat="${esc(c)}" type="button">${esc(c)}</button>`).join("")}</div>`
        : "";
      const data = JSON.stringify(projects.map((p) => ({ image: safeUrl(p.image), title: String(p.title ?? ""), category: String(p.category ?? ""), description: String(p.description ?? ""), link: p.link ? safeUrl(p.link) : "" })));
      const cells = projects.map((p, i) => `<button class="jw-pcell" type="button" data-i="${i}" data-cat="${esc(p.category)}">
        ${p.image ? `<img src="${safeUrl(p.image)}" alt="${esc(p.title)}" loading="lazy"/>` : `<span class="jw-pph">◧</span>`}
        <span class="jw-pover"><b>${esc(p.title)}</b>${p.category ? `<em>${esc(p.category)}</em>` : ""}</span>
      </button>`).join("");
      const html = `<div class="jw jw-portfolio" data-projects="${esc(data)}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        ${filterHtml}
        <div class="jw-pgrid">${cells}</div>
        <div class="jw-pmodal" hidden><div class="jw-pmbd"></div><div class="jw-pmcard"><button class="jw-pmx" type="button" aria-label="Close">×</button><img class="jw-pmimg" alt=""/><div class="jw-pmbody"><span class="jw-pmcat"></span><b class="jw-pmtitle"></b><p class="jw-pmdesc"></p><a class="jw-pmlink" target="_blank" rel="noopener" hidden>View project →</a></div></div></div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-portfolio{font-family:inherit}
        ${r} .jw-heading{font-size:24px;font-weight:800;text-align:center;margin:0 0 18px;color:#0f172a}
        ${r} .jw-pfilters{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:20px}
        ${r} .jw-pfilter{border:1px solid #e2e8f0;background:#fff;color:#475569;padding:6px 14px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer;transition:.2s}
        ${r} .jw-pfilter.jw-active{background:${accent};border-color:${accent};color:#fff}
        ${r} .jw-pgrid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:14px}
        ${r} .jw-pcell{position:relative;padding:0;border:0;cursor:pointer;overflow:hidden;border-radius:${rounded ? "14px" : "2px"};aspect-ratio:4/3;background:#f1f5f9;display:block}
        ${r} .jw-pcell img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
        ${r} .jw-pcell:hover img{transform:scale(1.06)}
        ${r} .jw-pph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#cbd5e1;font-size:34px}
        ${r} .jw-pover{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:16px;text-align:left;background:linear-gradient(transparent 40%,rgba(9,12,20,.75));color:#fff;opacity:0;transition:opacity .25s}
        ${r} .jw-pcell:hover .jw-pover{opacity:1}
        ${r} .jw-pover b{font-size:16px}${r} .jw-pover em{font-style:normal;font-size:12px;color:#a7f3d0}
        ${r} .jw-pmodal{position:fixed;inset:0;z-index:2147483200;display:flex;align-items:center;justify-content:center;padding:20px}
        ${r} .jw-pmodal[hidden]{display:none}
        ${r} .jw-pmbd{position:absolute;inset:0;background:rgba(9,12,20,.8)}
        ${r} .jw-pmcard{position:relative;background:#fff;border-radius:16px;overflow:hidden;max-width:560px;width:100%;max-height:90vh;overflow-y:auto}
        ${r} .jw-pmimg{width:100%;max-height:340px;object-fit:cover;display:block;background:#f1f5f9}
        ${r} .jw-pmbody{padding:20px}
        ${r} .jw-pmcat{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${accent}}
        ${r} .jw-pmtitle{display:block;font-size:22px;color:#0f172a;margin:4px 0 8px}
        ${r} .jw-pmdesc{margin:0;color:#475569;line-height:1.6}
        ${r} .jw-pmlink{display:inline-block;margin-top:14px;color:${accent};font-weight:600;text-decoration:none}
        ${r} .jw-pmx{position:absolute;top:12px;right:12px;z-index:1;width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.9);cursor:pointer;font-size:22px}
        ${r} .jw-brand{margin-top:16px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}
        @media(max-width:640px){${r} .jw-pgrid{grid-template-columns:1fr 1fr}}`;
      return { mode: "block", html, css };
    }

    // ── Restaurant Menu ────────────────────────────────────────────────────────
    case "menu": {
      const items = arr(config.items);
      const cur = String(config.currency ?? "₹");
      const accent = col(config.accentColor, "#0d9488");
      const cols = Math.max(1, Math.min(2, num(config.columns, 1)));
      const order: string[] = [];
      const map: Record<string, Cfg[]> = {};
      items.forEach((it) => { const s = String(it.section ?? "Menu"); if (!map[s]) { map[s] = []; order.push(s); } map[s].push(it); });
      const secs = order.map((s) => `<div class="jw-msec"><h4 class="jw-mstitle">${esc(s)}</h4><div class="jw-mitems">${map[s]
        .map((it) => `<div class="jw-mitem"><div class="jw-minfo"><b>${esc(it.name)}${it.tag ? `<span class="jw-mtag">${esc(it.tag)}</span>` : ""}</b>${it.description ? `<span class="jw-mdesc">${esc(it.description)}</span>` : ""}</div><span class="jw-mprice">${esc(cur)}${esc(it.price)}</span></div>`)
        .join("")}</div></div>`).join("");
      const html = `<div class="jw jw-menu">${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}<div class="jw-mgrid">${secs}</div>${brand}</div>`;
      const css = `
        ${r} .jw-menu{font-family:inherit}
        ${r} .jw-heading{font-size:26px;font-weight:800;text-align:center;margin:0 0 24px;color:#0f172a}
        ${r} .jw-mgrid{columns:${cols};column-gap:40px}
        ${r} .jw-msec{break-inside:avoid;margin-bottom:26px}
        ${r} .jw-mstitle{font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:${accent};margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid ${accent}33}
        ${r} .jw-mitem{display:flex;justify-content:space-between;gap:16px;align-items:baseline;padding:9px 0}
        ${r} .jw-minfo b{font-size:16px;color:#0f172a;font-weight:600}
        ${r} .jw-mtag{margin-left:8px;font-size:11px;font-weight:700;color:${accent};border:1px solid ${accent}44;border-radius:999px;padding:1px 7px;vertical-align:middle}
        ${r} .jw-mdesc{display:block;font-size:13px;color:#64748b;margin-top:2px}
        ${r} .jw-mprice{font-weight:700;color:#0f172a;white-space:nowrap}
        ${r} .jw-brand{margin-top:12px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Age Verification (overlay) ─────────────────────────────────────────────
    case "agegate": {
      const mode = String(config.mode ?? "yesno");
      const bg = col(config.bgColor, "#0b1220");
      const accent = col(config.accentColor, "#0d9488");
      const html = `<div class="jw jw-agegate" data-mode="${mode}" data-min="${num(config.minAge, 18)}" data-remember="${num(config.rememberDays, 30)}" data-reject="${config.rejectUrl ? safeUrl(config.rejectUrl) : ""}" data-rejectmsg="${esc(config.rejectMessage)}" data-key="${esc(opts.embedKey ?? opts.id)}" hidden>
        <div class="jw-agbd"></div>
        <div class="jw-agcard">
          <h3 class="jw-agtitle">${esc(config.heading)}</h3>
          <p class="jw-agmsg">${esc(config.message)}</p>
          ${mode === "birthyear" ? `<input class="jw-agyear" type="number" inputmode="numeric" placeholder="Enter birth year (YYYY)"/>` : ""}
          <div class="jw-agbtns"><button class="jw-agok" type="button">${esc(config.confirmLabel)}</button><button class="jw-agno" type="button">${esc(config.rejectLabel)}</button></div>
          <div class="jw-agerr" hidden></div>
        </div>
      </div>`;
      const css = `
        ${r} .jw-agegate{position:fixed;inset:0;z-index:2147483600;display:flex;align-items:center;justify-content:center;padding:20px;font-family:inherit}
        ${r} .jw-agegate[hidden]{display:none}
        ${r} .jw-agbd{position:absolute;inset:0;background:rgba(3,7,18,.9);backdrop-filter:blur(4px)}
        ${r} .jw-agcard{position:relative;background:${bg};color:#fff;border-radius:18px;padding:34px;max-width:420px;width:100%;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.5)}
        ${r} .jw-agtitle{font-size:24px;font-weight:800;margin:0 0 10px}
        ${r} .jw-agmsg{margin:0 0 20px;color:#cbd5e1;line-height:1.5}
        ${r} .jw-agyear{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#fff;font-size:16px;margin-bottom:16px;text-align:center}
        ${r} .jw-agbtns{display:flex;gap:10px}
        ${r} .jw-agok,${r} .jw-agno{flex:1;padding:12px;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;border:0}
        ${r} .jw-agok{background:${accent};color:#fff}
        ${r} .jw-agno{background:rgba(255,255,255,.1);color:#e2e8f0}
        ${r} .jw-agerr{margin-top:14px;color:#fca5a5;font-size:14px}`;
      return { mode: "overlay", html, css };
    }

    // ── Cookie Consent (overlay) ───────────────────────────────────────────────
    case "cookie": {
      const style = String(config.style ?? "banner");
      const bg = col(config.bgColor, "#0b1220");
      const tc = col(config.textColor, "#e2e8f0");
      const accent = col(config.accentColor, "#0d9488");
      const policy = config.policyUrl ? `<a class="jw-cklink" href="${safeUrl(config.policyUrl)}" target="_blank" rel="noopener">${esc(config.policyLabel || "Cookie policy")}</a>` : "";
      const html = `<div class="jw jw-cookie jw-${style}" data-remember="${num(config.rememberDays, 180)}" data-key="${esc(opts.embedKey ?? opts.id)}" hidden>
        <div class="jw-ckcard">
          <p class="jw-ckmsg">${esc(config.message)} ${policy}</p>
          <div class="jw-ckbtns"><button class="jw-ckno" type="button">${esc(config.rejectLabel)}</button><button class="jw-ckok" type="button">${esc(config.acceptLabel)}</button></div>
        </div>
      </div>`;
      const css = `
        ${r} .jw-cookie{position:fixed;z-index:2147483400;font-family:inherit}
        ${r} .jw-banner{left:0;right:0;bottom:0}
        ${r} .jw-banner .jw-ckcard{display:flex;align-items:center;gap:18px;flex-wrap:wrap;justify-content:center;background:${bg};color:${tc};padding:16px 20px;box-shadow:0 -6px 24px rgba(0,0,0,.18)}
        ${r} .jw-floating{left:20px;bottom:20px;max-width:360px}
        ${r} .jw-floating .jw-ckcard{background:${bg};color:${tc};padding:20px;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.35)}
        ${r} .jw-ckmsg{margin:0;font-size:14px;line-height:1.5}
        ${r} .jw-floating .jw-ckmsg{margin-bottom:16px}
        ${r} .jw-cklink{color:${accent};text-decoration:underline;font-weight:600}
        ${r} .jw-ckbtns{display:flex;gap:10px;flex-shrink:0}
        ${r} .jw-floating .jw-ckbtns{justify-content:flex-end}
        ${r} .jw-ckok,${r} .jw-ckno{padding:9px 18px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:0}
        ${r} .jw-ckok{background:${accent};color:#fff}
        ${r} .jw-ckno{background:rgba(255,255,255,.12);color:${tc}}`;
      return { mode: "overlay", html, css };
    }

    // ── Price Calculator ───────────────────────────────────────────────────────
    case "calculator": {
      const fields = arr(config.fields);
      const accent = col(config.accentColor, "#0d9488");
      const cur = String(config.currency ?? "₹");
      const base = num(config.baseAmount, 0);
      const tax = num(config.taxPercent, 0);
      const disc = num(config.discountPercent, 0);
      const showBd = bool(config.showBreakdown, true);
      const inputs = fields.map((f, i) => {
        const type = String(f.type ?? "number");
        const dv = num(f.default, 0), mn = num(f.min, 0), mx = num(f.max, 100), st = num(f.step, 1) || 1, coef = num(f.coefficient, 1);
        const control = type === "slider"
          ? `<div class="jw-calcslide"><input class="jw-calcin" type="range" data-coef="${coef}" min="${mn}" max="${mx}" step="${st}" value="${dv}"/><output class="jw-calcout">${dv}</output></div>`
          : `<input class="jw-calcin" type="number" data-coef="${coef}" min="${mn}" max="${mx}" step="${st}" value="${dv}"/>`;
        return `<label class="jw-calcf"><span class="jw-calclabel">${esc(f.label)}</span>${control}</label>`;
      }).join("");
      const html = `<div class="jw jw-calc" data-base="${base}" data-tax="${tax}" data-disc="${disc}" data-cur="${esc(cur)}" data-bd="${showBd}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-calcfields">${inputs}</div>
        <div class="jw-calcbd" ${showBd ? "" : "hidden"}></div>
        <div class="jw-calcresult"><span>${esc(config.resultLabel || "Estimated total")}</span><b class="jw-calctotal">${esc(cur)}0</b></div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-calc{font-family:inherit;max-width:460px;border:1px solid #e5e7eb;border-radius:16px;padding:22px;background:#fff}
        ${r} .jw-heading{font-size:20px;font-weight:700;margin:0 0 16px;color:#0f172a}
        ${r} .jw-calcfields{display:grid;gap:14px}
        ${r} .jw-calcf{display:flex;flex-direction:column;gap:6px}
        ${r} .jw-calclabel{font-size:14px;font-weight:600;color:#334155}
        ${r} .jw-calcin[type=number]{border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;font-size:15px;font-family:inherit;width:100%;box-sizing:border-box}
        ${r} .jw-calcin[type=number]:focus{outline:2px solid ${accent}55;border-color:${accent}}
        ${r} .jw-calcslide{display:flex;align-items:center;gap:12px}
        ${r} .jw-calcin[type=range]{flex:1;accent-color:${accent}}
        ${r} .jw-calcout{min-width:36px;text-align:center;font-weight:700;color:${accent};background:${accent}14;border-radius:8px;padding:4px 8px}
        ${r} .jw-calcbd{margin-top:16px;font-size:13px;color:#64748b;display:grid;gap:5px}
        ${r} .jw-calcbd .jw-bdrow{display:flex;justify-content:space-between}
        ${r} .jw-calcresult{margin-top:16px;padding-top:16px;border-top:2px solid #f1f5f9;display:flex;justify-content:space-between;align-items:baseline}
        ${r} .jw-calcresult span{font-size:15px;color:#334155;font-weight:600}
        ${r} .jw-calctotal{font-size:28px;font-weight:800;color:${accent}}
        ${r} .jw-brand{margin-top:14px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Event Calendar ─────────────────────────────────────────────────────────
    case "calendar": {
      const events = arr(config.events);
      const accent = col(config.accentColor, "#0d9488");
      const cards = String(config.layout ?? "list") === "cards";
      const addcal = bool(config.showAddToCalendar, true);
      const hidePast = bool(config.hidePast, true);
      const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const sorted = events.slice().sort((a, b) => String(a.date ?? "").localeCompare(String(b.date ?? "")));
      const gcal = (ev: Cfg) => {
        const d = String(ev.date ?? "").replace(/-/g, "");
        if (!d) return "";
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(String(ev.title ?? ""))}&dates=${d}/${d}&location=${encodeURIComponent(String(ev.location ?? ""))}`;
      };
      const rows = sorted.map((ev) => {
        const parts = String(ev.date ?? "").split("-");
        const day = parts[2] || "—", mon = MONTHS[(parseInt(parts[1], 10) || 1) - 1] || "";
        const g = addcal ? gcal(ev) : "";
        return `<div class="jw-cev" data-date="${esc(ev.date)}">
          <div class="jw-cdate"><b>${esc(day)}</b><span>${mon}</span></div>
          <div class="jw-cbody">
            <div class="jw-cmeta">${ev.category ? `<span class="jw-ctag">${esc(ev.category)}</span>` : ""}${ev.time ? `<span class="jw-ctime">${esc(ev.time)}</span>` : ""}</div>
            <b class="jw-ctitle">${esc(ev.title)}</b>
            ${ev.location ? `<span class="jw-cloc">${esc(ev.location)}</span>` : ""}
            <div class="jw-cactions">${ev.link ? `<a href="${safeUrl(ev.link)}" target="_blank" rel="noopener">Details →</a>` : ""}${g ? `<a href="${g}" target="_blank" rel="noopener">Add to calendar</a>` : ""}</div>
          </div>
        </div>`;
      }).join("");
      const html = `<div class="jw jw-calendar ${cards ? "jw-ccards" : "jw-clist"}" data-hidepast="${hidePast}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-cevents">${rows}</div>
        <div class="jw-cempty" hidden>No upcoming events.</div>${brand}
      </div>`;
      const css = `
        ${r} .jw-calendar{font-family:inherit}
        ${r} .jw-heading{font-size:22px;font-weight:800;margin:0 0 18px;color:#0f172a}
        ${r} .jw-cevents{display:grid;gap:12px}
        ${r} .jw-ccards .jw-cevents{grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}
        ${r} .jw-cev{display:flex;gap:16px;background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:16px}
        ${r} .jw-ccards .jw-cev{flex-direction:column;gap:12px}
        ${r} .jw-cdate{flex-shrink:0;width:60px;text-align:center;background:${accent}12;border-radius:10px;padding:8px 0}
        ${r} .jw-cdate b{display:block;font-size:24px;font-weight:800;color:${accent};line-height:1}
        ${r} .jw-cdate span{font-size:12px;text-transform:uppercase;color:#64748b;font-weight:600}
        ${r} .jw-cmeta{display:flex;gap:8px;align-items:center;margin-bottom:4px}
        ${r} .jw-ctag{font-size:11px;font-weight:700;color:${accent};background:${accent}14;border-radius:999px;padding:2px 8px}
        ${r} .jw-ctime{font-size:12px;color:#64748b}
        ${r} .jw-ctitle{font-size:16px;color:#0f172a}
        ${r} .jw-cloc{display:block;font-size:13px;color:#64748b;margin-top:2px}
        ${r} .jw-cactions{display:flex;gap:14px;margin-top:8px}
        ${r} .jw-cactions a{font-size:13px;font-weight:600;color:${accent};text-decoration:none}
        ${r} .jw-cempty{text-align:center;color:#94a3b8;padding:30px}
        ${r} .jw-brand{margin-top:16px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Job Board ──────────────────────────────────────────────────────────────
    case "jobs": {
      const jobs = arr(config.jobs);
      const accent = col(config.accentColor, "#0d9488");
      const filters = bool(config.showFilters, true);
      const depts: string[] = [];
      jobs.forEach((j) => { const d = String(j.department ?? "").trim(); if (d && depts.indexOf(d) < 0) depts.push(d); });
      const filterHtml = filters && depts.length
        ? `<div class="jw-jfilters"><button class="jw-jfilter jw-active" data-d="*" type="button">All</button>${depts.map((d) => `<button class="jw-jfilter" data-d="${esc(d)}" type="button">${esc(d)}</button>`).join("")}</div>`
        : "";
      const data = JSON.stringify(jobs.map((j) => ({ title: String(j.title ?? ""), department: String(j.department ?? ""), location: String(j.location ?? ""), type: String(j.type ?? ""), salary: String(j.salary ?? ""), description: String(j.description ?? ""), applyUrl: j.applyUrl ? safeUrl(j.applyUrl) : "" })));
      const cards = jobs.map((j, i) => `<div class="jw-jcard" data-d="${esc(j.department)}">
        <div class="jw-jinfo"><b class="jw-jtitle">${esc(j.title)}</b><div class="jw-jmeta">${j.department ? `<span>${esc(j.department)}</span>` : ""}${j.location ? `<span>${esc(j.location)}</span>` : ""}${j.type ? `<span class="jw-jtype">${esc(j.type)}</span>` : ""}${j.salary ? `<span class="jw-jsal">${esc(j.salary)}</span>` : ""}</div></div>
        <button class="jw-jview" type="button" data-i="${i}">View &amp; apply →</button>
      </div>`).join("");
      const html = `<div class="jw jw-jobs" data-jobs="${esc(data)}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        ${filterHtml}
        <div class="jw-jlist">${cards}</div>
        <div class="jw-jmodal" hidden><div class="jw-jmbd"></div><div class="jw-jmcard"><button class="jw-jmx" type="button" aria-label="Close">×</button><b class="jw-jmtitle"></b><div class="jw-jmmeta"></div><p class="jw-jmdesc"></p><a class="jw-jmapply" target="_blank" rel="noopener">Apply now →</a></div></div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-jobs{font-family:inherit}
        ${r} .jw-heading{font-size:24px;font-weight:800;margin:0 0 18px;color:#0f172a}
        ${r} .jw-jfilters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
        ${r} .jw-jfilter{border:1px solid #e2e8f0;background:#fff;color:#475569;padding:6px 14px;border-radius:999px;font-size:13px;font-weight:600;cursor:pointer}
        ${r} .jw-jfilter.jw-active{background:${accent};border-color:${accent};color:#fff}
        ${r} .jw-jlist{display:grid;gap:12px}
        ${r} .jw-jcard{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:18px;transition:border-color .2s}
        ${r} .jw-jcard:hover{border-color:${accent}66}
        ${r} .jw-jtitle{font-size:17px;color:#0f172a}
        ${r} .jw-jmeta{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px;font-size:13px;color:#64748b;align-items:center}
        ${r} .jw-jtype{background:${accent}14;color:${accent};font-weight:700;border-radius:999px;padding:2px 10px;font-size:12px}
        ${r} .jw-jsal{font-weight:600;color:#334155}
        ${r} .jw-jview{background:none;border:0;color:${accent};font-weight:700;font-size:14px;cursor:pointer;white-space:nowrap}
        ${r} .jw-jmodal{position:fixed;inset:0;z-index:2147483200;display:flex;align-items:center;justify-content:center;padding:20px}
        ${r} .jw-jmodal[hidden]{display:none}
        ${r} .jw-jmbd{position:absolute;inset:0;background:rgba(9,12,20,.8)}
        ${r} .jw-jmcard{position:relative;background:#fff;border-radius:16px;padding:28px;max-width:520px;width:100%;max-height:88vh;overflow-y:auto}
        ${r} .jw-jmx{position:absolute;top:14px;right:16px;border:0;background:none;font-size:24px;cursor:pointer;color:#64748b}
        ${r} .jw-jmtitle{font-size:22px;color:#0f172a;display:block;padding-right:24px}
        ${r} .jw-jmmeta{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0 16px;font-size:13px;color:#64748b}
        ${r} .jw-jmdesc{margin:0;color:#475569;line-height:1.65;white-space:pre-line}
        ${r} .jw-jmapply{display:inline-block;margin-top:20px;background:${accent};color:#fff;padding:11px 22px;border-radius:10px;font-weight:600;text-decoration:none}
        ${r} .jw-brand{margin-top:16px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Accessibility Toolbar (overlay) ────────────────────────────────────────
    case "accessibility": {
      const accent = col(config.accentColor, "#0d9488");
      const pos = String(config.position ?? "bottom-right");
      const opt = (key: string, on: unknown, label: string, icon: string) =>
        bool(on, false) ? `<button class="jw-a11yopt" data-feat="${key}" type="button"><span class="jw-a11yic">${icon}</span>${label}</button>` : "";
      const opts = [
        opt("bigtext", config.featBiggerText, "Bigger text", "A+"),
        opt("contrast", config.featContrast, "High contrast", "◐"),
        opt("readable", config.featReadable, "Readable font", "Aa"),
        opt("links", config.featLinks, "Highlight links", "🔗"),
        opt("grayscale", config.featGrayscale, "Greyscale", "▦"),
        opt("spacing", config.featSpacing, "Letter spacing", "↔"),
      ].join("");
      const html = `<div class="jw jw-a11y jw-${pos}" data-title="${esc(config.title || "Accessibility")}">
        <button class="jw-a11ybtn" type="button" aria-label="${esc(config.title || "Accessibility")}">♿</button>
        <div class="jw-a11ypanel" hidden>
          <div class="jw-a11yhead"><b>${esc(config.title || "Accessibility")}</b><button class="jw-a11yclose" type="button" aria-label="Close">×</button></div>
          <div class="jw-a11yopts">${opts}</div>
          <button class="jw-a11yreset" type="button">Reset all</button>
        </div>
      </div>`;
      const side = pos === "bottom-left" ? "left:20px" : "right:20px";
      const css = `
        ${r} .jw-a11y{position:fixed;bottom:20px;${side};z-index:2147482800;font-family:inherit}
        ${r} .jw-a11ybtn{width:52px;height:52px;border-radius:50%;background:${accent};color:#fff;border:0;font-size:26px;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center}
        ${r} .jw-a11ypanel{position:absolute;bottom:62px;${side.split(":")[0]}:0;width:250px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 16px 44px rgba(0,0,0,.2);overflow:hidden}
        ${r} .jw-a11yhead{display:flex;align-items:center;justify-content:space-between;background:${accent};color:#fff;padding:12px 16px}
        ${r} .jw-a11yhead b{font-size:15px}
        ${r} .jw-a11yclose{background:none;border:0;color:#fff;font-size:20px;cursor:pointer;line-height:1}
        ${r} .jw-a11yopts{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:14px}
        ${r} .jw-a11yopt{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 6px;border:1px solid #e2e8f0;border-radius:10px;background:#fff;color:#334155;font-size:12px;font-weight:600;cursor:pointer;text-align:center}
        ${r} .jw-a11yopt:hover{border-color:${accent}}
        ${r} .jw-a11yopt.jw-on{background:${accent}14;border-color:${accent};color:${accent}}
        ${r} .jw-a11yic{font-size:18px;font-weight:800}
        ${r} .jw-a11yreset{width:calc(100% - 28px);margin:0 14px 14px;padding:9px;border:0;border-radius:8px;background:#f1f5f9;color:#475569;font-weight:600;cursor:pointer}`;
      return { mode: "overlay", html, css };
    }

    // ── Store Locator ──────────────────────────────────────────────────────────
    case "storelocator": {
      const stores = arr(config.stores);
      const accent = col(config.accentColor, "#0d9488");
      const mh = Math.max(240, Math.min(720, num(config.mapHeight, 420)));
      const side = String(config.mapSide ?? "right");
      const dir = bool(config.showDirections, true);
      const q0 = encodeURIComponent(String((stores[0] && stores[0].address) || "India Gate, New Delhi"));
      const items = stores.map((s, i) => {
        const q = encodeURIComponent(String(s.address ?? ""));
        return `<div class="jw-slitem${i === 0 ? " jw-active" : ""}">
          <button class="jw-slbtn" type="button" data-q="${q}"><b>${esc(s.name)}</b>${s.address ? `<span class="jw-sladdr">${esc(s.address)}</span>` : ""}<span class="jw-slmeta">${s.phone ? `<span>${esc(s.phone)}</span>` : ""}${s.hours ? `<span>${esc(s.hours)}</span>` : ""}</span></button>
          ${dir ? `<a class="jw-sldir" href="https://maps.google.com/maps?q=${q}" target="_blank" rel="noopener">Directions →</a>` : ""}
        </div>`;
      }).join("");
      const html = `<div class="jw jw-sl jw-side-${side}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-slwrap">
          <div class="jw-sllist">${items}</div>
          <div class="jw-slmap"><iframe class="jw-slframe" title="map" src="https://maps.google.com/maps?q=${q0}&z=14&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
        </div>${brand}
      </div>`;
      const css = `
        ${r} .jw-sl{font-family:inherit}
        ${r} .jw-heading{font-size:22px;font-weight:800;margin:0 0 16px;color:#0f172a}
        ${r} .jw-slwrap{display:flex;gap:16px;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;background:#fff}
        ${r} .jw-side-left .jw-slwrap{flex-direction:row-reverse}
        ${r} .jw-sllist{flex:0 0 40%;max-width:40%;max-height:${mh}px;overflow-y:auto;padding:8px}
        ${r} .jw-slitem{border-radius:12px;padding:2px}
        ${r} .jw-slitem.jw-active{background:${accent}12}
        ${r} .jw-slbtn{width:100%;text-align:left;background:none;border:0;cursor:pointer;padding:12px;display:block;border-radius:10px}
        ${r} .jw-slitem.jw-active .jw-slbtn b{color:${accent}}
        ${r} .jw-slbtn b{font-size:15px;color:#0f172a}
        ${r} .jw-sladdr{display:block;font-size:13px;color:#64748b;margin-top:3px}
        ${r} .jw-slmeta{display:flex;flex-wrap:wrap;gap:12px;margin-top:6px;font-size:12px;color:#94a3b8}
        ${r} .jw-sldir{display:inline-block;margin:0 12px 10px;font-size:13px;font-weight:600;color:${accent};text-decoration:none}
        ${r} .jw-slmap{flex:1}
        ${r} .jw-slframe{width:100%;height:${mh}px;border:0;display:block}
        ${r} .jw-brand{margin-top:14px;font-size:12px;text-align:center}${r} .jw-brand a{color:#94a3b8;text-decoration:none}
        @media(max-width:640px){${r} .jw-slwrap,${r} .jw-side-left .jw-slwrap{flex-direction:column}${r} .jw-sllist{flex:none;max-width:100%;max-height:220px}}`;
      return { mode: "block", html, css };
    }

    // ── Visitor Counter ────────────────────────────────────────────────────────
    case "visitors": {
      const accent = col(config.accentColor, "#0d9488");
      const layout = String(config.layout ?? "card");
      const offset = num(config.startOffset, 0);
      const metric = String(config.metric ?? "total");
      const html = `<div class="jw jw-visitors jw-vl-${layout}" data-key="${esc(opts.embedKey ?? "")}" data-api="${esc(apiBase)}" data-metric="${esc(metric)}" data-offset="${offset}" data-sep="${bool(config.separator, true)}" data-preview="${opts.preview ? 1 : 0}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-vbox">
          ${config.icon ? `<span class="jw-vicon">${esc(config.icon)}</span>` : ""}
          <div class="jw-vtext"><span class="jw-vnum">0</span><span class="jw-vlabel">${esc(config.label || "Total visitors")}</span></div>
        </div>${brand}
      </div>`;
      const css = `
        ${r} .jw-visitors{font-family:inherit}
        ${r} .jw-heading{font-size:18px;font-weight:700;margin:0 0 12px;color:#0f172a;text-align:center}
        ${r} .jw-vbox{display:inline-flex;align-items:center;gap:14px}
        ${r} .jw-vl-card .jw-vbox{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:20px 26px;box-shadow:0 6px 20px -12px rgba(13,148,136,.4)}
        ${r} .jw-vl-badge .jw-vbox{background:${accent}12;border-radius:999px;padding:8px 18px;gap:10px}
        ${r} .jw-visitors{text-align:center}
        ${r} .jw-vicon{font-size:30px}
        ${r} .jw-vl-badge .jw-vicon{font-size:18px}
        ${r} .jw-vtext{display:flex;flex-direction:column;line-height:1.1;text-align:left}
        ${r} .jw-vl-badge .jw-vtext{flex-direction:row;align-items:baseline;gap:6px}
        ${r} .jw-vnum{font-size:32px;font-weight:800;color:${accent};font-variant-numeric:tabular-nums}
        ${r} .jw-vl-badge .jw-vnum{font-size:18px}
        ${r} .jw-vlabel{font-size:13px;color:#64748b;font-weight:600}
        ${r} .jw-brand{margin-top:12px;font-size:12px}${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Pricing Table ──────────────────────────────────────────────────────────
    case "pricing": {
      const plans = arr(config.plans);
      const accent = col(config.accentColor, "#0d9488");
      const rounded = bool(config.rounded, true);
      const cards = plans
        .map((p) => {
          const feats = String(p.features ?? "")
            .split("\n").map((f) => f.trim()).filter(Boolean)
            .map((f) => `<li>${esc(f)}</li>`).join("");
          const featured = bool(p.featured, false);
          return `<div class="jw-plan${featured ? " jw-featured" : ""}">
            ${featured ? `<span class="jw-badge">Popular</span>` : ""}
            <h4 class="jw-plan-name">${esc(p.name)}</h4>
            <div class="jw-price"><span class="jw-amt">${esc(p.price)}</span><span class="jw-per">${esc(p.period)}</span></div>
            <ul class="jw-feats">${feats}</ul>
            <a class="jw-cta" href="${safeUrl(p.url)}" target="_blank" rel="noopener">${esc(p.cta)}</a>
          </div>`;
        })
        .join("");
      const html = `<div class="jw jw-pricing">
        ${bool(config.showHeading, true) ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-plans">${cards}</div>
        ${brand}
      </div>`;
      const cnt = Math.min(Math.max(1, plans.length), 3);
      const css = `
        ${r} .jw-pricing{font-family:inherit}
        ${r} .jw-heading{font-size:24px;font-weight:700;text-align:center;margin:0 0 22px;color:#0f172a}
        ${r} .jw-plans{display:grid;grid-template-columns:repeat(${cnt},1fr);gap:16px}
        @media(max-width:640px){${r} .jw-plans{grid-template-columns:1fr}}
        ${r} .jw-plan{position:relative;background:#fff;border:1px solid #e5e7eb;border-radius:${rounded ? "16px" : "4px"};padding:24px;display:flex;flex-direction:column}
        ${r} .jw-featured{border-color:${accent};box-shadow:0 12px 30px -12px ${accent}77}
        ${r} .jw-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:${accent};color:#fff;font-size:11px;font-weight:700;padding:3px 12px;border-radius:999px;text-transform:uppercase;letter-spacing:.04em}
        ${r} .jw-plan-name{font-size:16px;font-weight:600;color:#334155;margin:0 0 8px}
        ${r} .jw-price{display:flex;align-items:baseline;gap:3px;margin-bottom:16px}
        ${r} .jw-amt{font-size:34px;font-weight:800;color:#0f172a}
        ${r} .jw-per{color:#94a3b8;font-size:14px}
        ${r} .jw-feats{list-style:none;padding:0;margin:0 0 20px;flex:1}
        ${r} .jw-feats li{padding:7px 0 7px 26px;position:relative;color:#475569;font-size:14px;border-bottom:1px solid #f1f5f9}
        ${r} .jw-feats li:before{content:"✓";position:absolute;left:0;color:${accent};font-weight:700}
        ${r} .jw-cta{display:block;text-align:center;background:${accent};color:#fff;text-decoration:none;padding:11px;border-radius:${rounded ? "10px" : "4px"};font-weight:600;transition:opacity .2s}
        ${r} .jw-cta:hover{opacity:.9}
        ${r} .jw-brand{text-align:center;margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Announcement Bar ───────────────────────────────────────────────────────
    case "announcement": {
      const bg = col(config.bgColor, "#0d9488");
      const fg = col(config.textColor, "#ffffff");
      const pos = String(config.position ?? "top") === "bottom" ? "bottom" : "top";
      const dismissible = bool(config.dismissible, true);
      const link =
        config.linkUrl && config.linkLabel
          ? `<a class="jw-abar-link" href="${safeUrl(config.linkUrl)}" target="_blank" rel="noopener">${esc(config.linkLabel)}</a>`
          : "";
      const html = `<div class="jw jw-abar" data-pos="${pos}" style="background:${bg};color:${fg}">
        <div class="jw-abar-in">
          <span class="jw-abar-text">${esc(config.text)}</span>
          ${link}
        </div>
        ${dismissible ? `<button class="jw-abar-x" aria-label="Dismiss">&times;</button>` : ""}
      </div>`;
      const css = `
        ${r} .jw-abar{font-family:inherit;position:fixed;left:0;right:0;${pos}:0;z-index:2147482000;display:flex;align-items:center;justify-content:center;gap:14px;padding:11px 44px;font-size:14px;box-shadow:0 2px 10px rgba(0,0,0,.08)}
        ${r} .jw-abar-in{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center}
        ${r} .jw-abar-link{color:inherit;font-weight:700;text-decoration:underline;white-space:nowrap}
        ${r} .jw-abar-x{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:transparent;border:0;color:inherit;font-size:24px;line-height:1;cursor:pointer;opacity:.85}
        ${r} .jw-abar-x:hover{opacity:1}`;
      return { mode: "overlay", html, css };
    }

    // ── Social Media Icons ─────────────────────────────────────────────────────
    case "socialicons": {
      const links = arr(config.links);
      const shape = String(config.shape ?? "circle");
      const size = Math.max(28, Math.min(72, num(config.size, 44)));
      const align = String(config.align ?? "center");
      const mono = String(config.colorStyle ?? "brand") === "mono";
      const monoColor = col(config.monoColor, "#0f172a");
      const NET: Record<string, { c: string; p: string }> = {
        facebook: { c: "#1877f2", p: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" },
        instagram: { c: "#e4405f", p: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 12 18.6 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 12 7.7a4.3 4.3 0 0 1 0 8.6zm6.8-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z" },
        twitter: { c: "#000000", p: "M18.9 2H22l-7.3 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2.2l7.8-8.9L1.5 2h6.8l4.7 6.2zm-1.2 18h1.8L7.1 3.8H5.2z" },
        linkedin: { c: "#0a66c2", p: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.3 18.3H5.7V10h2.6zM7 8.8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.3 9.5h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3h-2.6V10h2.5v1.1h.1a2.8 2.8 0 0 1 2.5-1.4c2.7 0 3.2 1.8 3.2 4z" },
        youtube: { c: "#ff0000", p: "M23 7.5a3 3 0 0 0-2.1-2.1C19 4.8 12 4.8 12 4.8s-7 0-8.9.6A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.6 8.9.6 8.9.6s7 0 8.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.5zM9.8 15.3V8.7l5.7 3.3z" },
        whatsapp: { c: "#25d366", p: "M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3A2.8 2.8 0 0 0 6.4 10a4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2 .8 2 .5 2.4.5a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" },
        telegram: { c: "#26a5e4", p: "M22 4.5 2.5 12c-.9.4-.9 1.6 0 1.9l4.9 1.5 1.9 5.7c.3.8 1.2 1 1.8.4l2.7-2.5 4.8 3.5c.7.5 1.7.1 1.9-.7L23 5.7c.2-.9-.6-1.6-1-1.2zM9.5 14.3l8-5-6.5 6-.3 3.6z" },
        tiktok: { c: "#000000", p: "M16.5 2h-3v13.3a2.7 2.7 0 1 1-2.2-2.7v-3a5.7 5.7 0 1 0 5.2 5.7V9.2a7 7 0 0 0 4 1.3v-3a4 4 0 0 1-4-4z" },
        pinterest: { c: "#e60023", p: "M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2.9.5 1.7 1.4 1.7 1.7 0 2.9-2.2 2.9-4.8 0-2-1.3-3.4-3.8-3.4a4.3 4.3 0 0 0-4.5 4.3c0 .8.3 1.4.6 1.8.1.2.2.3.1.5l-.2.9c-.1.3-.3.4-.6.2-1.1-.5-1.7-1.9-1.7-3.5C5.5 8.3 7.6 6 11.6 6c3.3 0 5.6 2.4 5.6 5.2 0 3.3-1.9 5.8-4.6 5.8-.9 0-1.8-.5-2.1-1l-.6 2.2c-.2.8-.7 1.7-1 2.3A10 10 0 1 0 12 2z" },
        email: { c: "#0d9488", p: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z" },
      };
      const icons = links
        .map((l) => {
          const net = String(l.network ?? "").toLowerCase();
          const def = NET[net] || NET.email;
          const color = mono ? monoColor : def.c;
          return `<a class="jw-si" href="${safeUrl(l.url)}" target="_blank" rel="noopener" aria-label="${esc(net)}" style="background:${color}"><svg viewBox="0 0 24 24" fill="#fff" width="55%" height="55%"><path d="${def.p}"/></svg></a>`;
        })
        .join("");
      const html = `<div class="jw jw-socialicons" style="text-align:${align}">
        ${bool(config.showHeading, true) && config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-si-row">${icons}</div>
        ${brand}
      </div>`;
      const radius = shape === "square" ? "12px" : "50%";
      const css = `
        ${r} .jw-socialicons{font-family:inherit}
        ${r} .jw-heading{font-size:18px;font-weight:600;margin:0 0 12px;color:#0f172a}
        ${r} .jw-si-row{display:inline-flex;flex-wrap:wrap;gap:10px}
        ${r} .jw-si{width:${size}px;height:${size}px;border-radius:${radius};display:inline-flex;align-items:center;justify-content:center;transition:transform .15s,filter .15s}
        ${r} .jw-si:hover{transform:translateY(-3px);filter:brightness(1.08)}
        ${r} .jw-brand{margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Feature Grid ───────────────────────────────────────────────────────────
    case "features": {
      const items = arr(config.items);
      const cols = Math.max(1, Math.min(4, num(config.columns, 3)));
      const align = String(config.align ?? "center");
      const accent = col(config.accentColor, "#ccfbf1");
      const cards = items
        .map(
          (it) => `<div class="jw-feat">
          <span class="jw-feat-ic" style="background:${accent}">${esc(it.icon)}</span>
          <h4>${esc(it.title)}</h4>
          <p>${esc(it.text)}</p>
        </div>`,
        )
        .join("");
      const html = `<div class="jw jw-features" style="text-align:${align}">
        ${bool(config.showHeading, true) ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-feat-grid">${cards}</div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-features{font-family:inherit}
        ${r} .jw-heading{font-size:24px;font-weight:700;text-align:center;margin:0 0 24px;color:#0f172a}
        ${r} .jw-feat-grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:18px}
        @media(max-width:640px){${r} .jw-feat-grid{grid-template-columns:1fr}}
        ${r} .jw-feat{padding:20px}
        ${r} .jw-feat-ic{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:14px;font-size:26px;margin-bottom:12px}
        ${r} .jw-feat h4{margin:0 0 6px;font-size:17px;font-weight:600;color:#0f172a}
        ${r} .jw-feat p{margin:0;color:#64748b;font-size:14px;line-height:1.55}
        ${r} .jw-brand{text-align:center;margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Tabs ───────────────────────────────────────────────────────────────────
    case "tabs": {
      const items = arr(config.items);
      const align = String(config.align ?? "left");
      const accent = col(config.accentColor, "#0d9488");
      const rounded = bool(config.rounded, true);
      const btns = items.map((it, i) => `<button class="jw-tab${i === 0 ? " jw-on" : ""}" data-i="${i}">${esc(it.title)}</button>`).join("");
      const panes = items.map((it, i) => `<div class="jw-pane${i === 0 ? " jw-on" : ""}" data-i="${i}">${esc(it.body)}</div>`).join("");
      const html = `<div class="jw jw-tabs">
        <div class="jw-tabbar" style="justify-content:${align === "center" ? "center" : "flex-start"}">${btns}</div>
        <div class="jw-panes">${panes}</div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-tabs{font-family:inherit}
        ${r} .jw-tabbar{display:flex;flex-wrap:wrap;gap:4px;border-bottom:2px solid #e5e7eb;margin-bottom:16px}
        ${r} .jw-tab{background:transparent;border:0;border-bottom:2px solid transparent;margin-bottom:-2px;padding:10px 16px;font-size:15px;font-weight:600;color:#64748b;cursor:pointer;border-radius:${rounded ? "8px 8px 0 0" : "0"}}
        ${r} .jw-tab:hover{color:#0f172a}
        ${r} .jw-tab.jw-on{color:${accent};border-bottom-color:${accent}}
        ${r} .jw-pane{display:none;color:#475569;font-size:15px;line-height:1.6;white-space:pre-line}
        ${r} .jw-pane.jw-on{display:block}
        ${r} .jw-brand{text-align:center;margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Video Popup ────────────────────────────────────────────────────────────
    case "video": {
      const url = String(config.videoUrl ?? "");
      const ytm = url.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
      const vim = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      let embed = "";
      let thumb = String(config.thumbnail ?? "");
      if (ytm) { embed = `https://www.youtube.com/embed/${ytm[1]}`; if (!thumb) thumb = `https://img.youtube.com/vi/${ytm[1]}/hqdefault.jpg`; }
      else if (vim) { embed = `https://player.vimeo.com/video/${vim[1]}`; }
      const mode = String(config.mode ?? "popup");
      const ratio = String(config.ratio ?? "16:9");
      const pad = ratio === "1:1" ? "100%" : ratio === "4:3" ? "75%" : "56.25%";
      const accent = col(config.accentColor, "#0d9488");
      const rad = bool(config.rounded, true) ? "16px" : "4px";
      const title = bool(config.showTitle, true) && config.title ? `<h3 class="jw-heading">${esc(config.title)}</h3>` : "";
      let html: string;
      if (mode === "inline") {
        html = `<div class="jw jw-video">
          ${title}
          <div class="jw-vframe">${embed ? `<iframe src="${esc(embed)}" title="${esc(config.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>` : `<div class="jw-vempty">Add a YouTube or Vimeo URL</div>`}</div>
          ${brand}
        </div>`;
      } else {
        html = `<div class="jw jw-video">
          ${title}
          <button class="jw-vthumb" data-embed="${esc(embed)}"${thumb ? ` style="background-image:url('${safeUrl(thumb)}')"` : ""}><span class="jw-vplay" aria-label="Play video"></span></button>
          <div class="jw-vmodal" hidden><div class="jw-vmodal-bd"><button class="jw-vclose" aria-label="Close">&times;</button><div class="jw-vframe"><iframe title="${esc(config.title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div></div></div>
          ${brand}
        </div>`;
      }
      const css = `
        ${r} .jw-video{font-family:inherit}
        ${r} .jw-heading{font-size:22px;font-weight:700;margin:0 0 14px;text-align:center;color:#0f172a}
        ${r} .jw-vframe{position:relative;width:100%;padding-top:${pad};border-radius:${rad};overflow:hidden;background:#000}
        ${r} .jw-vframe iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
        ${r} .jw-vempty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#94a3b8;background:#f1f5f9;font-size:14px}
        ${r} .jw-vthumb{position:relative;display:block;width:100%;padding-top:${pad};border:0;border-radius:${rad};overflow:hidden;cursor:pointer;background:#0f172a center/cover no-repeat}
        ${r} .jw-vplay{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:66px;height:66px;border-radius:50%;background:${accent};box-shadow:0 8px 30px rgba(0,0,0,.35);transition:transform .15s}
        ${r} .jw-vplay:before{content:"";position:absolute;top:50%;left:54%;transform:translate(-50%,-50%);border-style:solid;border-width:12px 0 12px 20px;border-color:transparent transparent transparent #fff}
        ${r} .jw-vthumb:hover .jw-vplay{transform:translate(-50%,-50%) scale(1.08)}
        ${r} .jw-vmodal{position:fixed;inset:0;z-index:2147482000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.8);padding:20px}
        ${r} .jw-vmodal[hidden]{display:none}
        ${r} .jw-vmodal-bd{position:relative;width:100%;max-width:900px}
        ${r} .jw-vclose{position:absolute;top:-40px;right:0;background:transparent;border:0;color:#fff;font-size:34px;line-height:1;cursor:pointer}
        ${r} .jw-brand{text-align:center;margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Coupon Code ────────────────────────────────────────────────────────────
    case "coupon": {
      const accent = col(config.accentColor, "#0d9488");
      const bg = col(config.bgColor, "#f0fdfa");
      const rad = bool(config.rounded, true) ? "16px" : "4px";
      const html = `<div class="jw jw-coupon" style="background:${bg};border-color:${accent}33">
        <h3 class="jw-cp-h">${esc(config.heading)}</h3>
        ${config.description ? `<p class="jw-cp-d">${esc(config.description)}</p>` : ""}
        <div class="jw-cp-box">
          <span class="jw-cp-code">${esc(config.code)}</span>
          <button class="jw-cp-btn" data-code="${esc(config.code)}" data-done="${esc(config.successLabel)}">${esc(config.copyLabel)}</button>
        </div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-coupon{font-family:inherit;text-align:center;padding:28px;border-radius:${rad};border:1px solid}
        ${r} .jw-cp-h{font-size:22px;font-weight:700;margin:0 0 6px;color:#0f172a}
        ${r} .jw-cp-d{margin:0 0 18px;color:#475569;font-size:14px}
        ${r} .jw-cp-box{display:inline-flex;align-items:stretch;border:2px dashed ${accent};border-radius:12px;overflow:hidden;background:#fff}
        ${r} .jw-cp-code{display:flex;align-items:center;padding:12px 20px;font-size:20px;font-weight:800;letter-spacing:2px;color:#0f172a}
        ${r} .jw-cp-btn{border:0;background:${accent};color:#fff;padding:0 22px;font-weight:700;cursor:pointer;font-size:14px;transition:opacity .2s}
        ${r} .jw-cp-btn:hover{opacity:.9}
        ${r} .jw-brand{margin-top:16px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Stats Counter ──────────────────────────────────────────────────────────
    case "stats": {
      const items = arr(config.items);
      const cols = Math.max(1, Math.min(4, num(config.columns, 4)));
      const accent = col(config.accentColor, "#0d9488");
      const animate = bool(config.animate, true);
      const tiles = items
        .map((it) => {
          const v = num(it.value, 0);
          return `<div class="jw-stat">
            <div class="jw-stat-n" data-target="${v}" data-animate="${animate ? "1" : "0"}" style="color:${accent}"><span>${esc(it.prefix)}</span><span class="jw-stat-v">${animate ? "0" : esc(String(v))}</span><span>${esc(it.suffix)}</span></div>
            <div class="jw-stat-l">${esc(it.label)}</div>
          </div>`;
        })
        .join("");
      const html = `<div class="jw jw-stats">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-stat-grid">${tiles}</div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-stats{font-family:inherit}
        ${r} .jw-heading{font-size:24px;font-weight:700;text-align:center;margin:0 0 22px;color:#0f172a}
        ${r} .jw-stat-grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:18px;text-align:center}
        @media(max-width:640px){${r} .jw-stat-grid{grid-template-columns:repeat(2,1fr)}}
        ${r} .jw-stat-n{font-size:40px;font-weight:800;line-height:1;display:flex;align-items:baseline;justify-content:center;gap:1px}
        ${r} .jw-stat-l{margin-top:8px;color:#64748b;font-size:14px;font-weight:500}
        ${r} .jw-brand{text-align:center;margin-top:16px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Reading Progress Bar ─────────────────────────────────────────────────────
    case "progressbar": {
      const pos = String(config.position ?? "top") === "bottom" ? "bottom" : "top";
      const barColor = col(config.color, "#0d9488");
      const track = bool(config.showTrack, false) ? col(config.trackColor, "#e5e7eb") : "transparent";
      const h = Math.max(2, Math.min(16, num(config.height, 5)));
      const html = `<div class="jw jw-progress" style="background:${track};height:${h}px;${pos}:0">
        <div class="jw-progress-fill" style="background:${barColor}"></div>
      </div>`;
      const css = `
        ${r} .jw-progress{position:fixed;left:0;right:0;z-index:2147482000}
        ${r} .jw-progress-fill{height:100%;width:0;transition:width .1s linear}`;
      return { mode: "overlay", html, css };
    }

    // ── Marquee Ticker ───────────────────────────────────────────────────────────
    case "marquee": {
      const items = arr(config.items);
      const speed = Math.max(5, Math.min(120, num(config.speed, 20)));
      const dir = String(config.direction ?? "left") === "right" ? "reverse" : "normal";
      const bg = col(config.bgColor, "#0f172a");
      const fg = col(config.textColor, "#ffffff");
      const fs = Math.max(11, Math.min(28, num(config.fontSize, 15)));
      const pause = bool(config.pauseOnHover, true);
      const one = items.map((it) => `<span class="jw-mq-item">${esc(it.text)}</span>`).join("");
      const html = `<div class="jw jw-marquee" style="background:${bg};color:${fg};font-size:${fs}px"><div class="jw-mq-track">${one}${one}</div></div>`;
      const css = `
        ${r} .jw-marquee{font-family:inherit;overflow:hidden;white-space:nowrap;padding:11px 0}
        ${r} .jw-mq-track{display:inline-flex;align-items:center;animation:jw-mq ${speed}s linear infinite;animation-direction:${dir}}
        ${r} .jw-marquee:hover .jw-mq-track{animation-play-state:${pause ? "paused" : "running"}}
        ${r} .jw-mq-item{padding:0 14px;font-weight:600}
        ${r} .jw-mq-item:after{content:"•";padding-left:28px;opacity:.45}
        @keyframes jw-mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}`;
      return { mode: "block", html, css };
    }

    // ── Testimonial Slider ─────────────────────────────────────────────────────
    case "testimonialslider": {
      const items = arr(config.items);
      const accent = col(config.accentColor, "#0d9488");
      const cardBg = col(config.cardBackground, "#ffffff");
      const autoplay = bool(config.autoplay, true);
      const interval = Math.max(2, Math.min(30, num(config.interval, 5)));
      const slides = items
        .map(
          (it, i) => `<figure class="jw-ts-slide${i === 0 ? " jw-on" : ""}" data-i="${i}" style="background:${cardBg}">
          <div class="jw-ts-stars">${stars(num(it.rating, 5), accent)}</div>
          <blockquote>${esc(it.quote)}</blockquote>
          <figcaption>
            ${it.avatar ? `<img src="${safeUrl(it.avatar)}" alt="" class="jw-ts-av"/>` : `<span class="jw-ts-av jw-ts-ph">${esc(String(it.author ?? "?").charAt(0))}</span>`}
            <span><b>${esc(it.author)}</b>${it.role ? `<em>${esc(it.role)}</em>` : ""}</span>
          </figcaption>
        </figure>`,
        )
        .join("");
      const dots = items.map((_, i) => `<button class="jw-ts-dot${i === 0 ? " jw-on" : ""}" data-i="${i}" aria-label="Go to slide ${i + 1}"></button>`).join("");
      const html = `<div class="jw jw-tslider" data-autoplay="${autoplay ? "1" : "0"}" data-interval="${interval * 1000}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-ts-stage">
          <button class="jw-ts-nav jw-ts-prev" aria-label="Previous">&#8249;</button>
          <div class="jw-ts-slides">${slides}</div>
          <button class="jw-ts-nav jw-ts-next" aria-label="Next">&#8250;</button>
        </div>
        <div class="jw-ts-dots">${dots}</div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-tslider{font-family:inherit;max-width:640px;margin:0 auto}
        ${r} .jw-heading{font-size:24px;font-weight:700;text-align:center;margin:0 0 20px;color:#0f172a}
        ${r} .jw-ts-stage{position:relative;display:flex;align-items:center;gap:8px}
        ${r} .jw-ts-slides{position:relative;flex:1;min-height:210px}
        ${r} .jw-ts-slide{display:none;margin:0;border:1px solid #e5e7eb;border-radius:16px;padding:28px;text-align:center}
        ${r} .jw-ts-slide.jw-on{display:block;animation:jw-ts-fade .5s ease}
        @keyframes jw-ts-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        ${r} .jw-ts-stars{font-size:18px;letter-spacing:2px;margin-bottom:12px}
        ${r} .jw-ts-slide blockquote{margin:0 0 18px;font-size:17px;line-height:1.6;color:#334155}
        ${r} .jw-ts-slide figcaption{display:flex;align-items:center;justify-content:center;gap:10px;font-size:14px}
        ${r} .jw-ts-slide figcaption em{display:block;color:#94a3b8;font-style:normal;font-size:12px;text-align:left}
        ${r} .jw-ts-av{width:42px;height:42px;border-radius:50%;object-fit:cover}
        ${r} .jw-ts-ph{display:flex;align-items:center;justify-content:center;background:${accent}22;color:${accent};font-weight:700}
        ${r} .jw-ts-nav{flex:none;width:36px;height:36px;border-radius:50%;border:1px solid #e5e7eb;background:#fff;color:#334155;font-size:20px;cursor:pointer;line-height:1}
        ${r} .jw-ts-nav:hover{border-color:${accent};color:${accent}}
        ${r} .jw-ts-dots{display:flex;justify-content:center;gap:8px;margin-top:16px}
        ${r} .jw-ts-dot{width:9px;height:9px;border-radius:50%;border:0;background:#cbd5e1;cursor:pointer;padding:0;transition:width .2s}
        ${r} .jw-ts-dot.jw-on{background:${accent};width:22px;border-radius:5px}
        ${r} .jw-brand{text-align:center;margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Typing Effect ──────────────────────────────────────────────────────────
    case "typewriter": {
      const prefix = esc(config.prefix);
      const phrases = arr(config.phrases).map((p) => String(p.text ?? "")).filter(Boolean);
      const align = String(config.align ?? "center");
      const fs = Math.max(16, Math.min(72, num(config.fontSize, 34)));
      const textColor = col(config.textColor, "#0f172a");
      const accent = col(config.accentColor, "#0d9488");
      const data = phrases.map((p) => esc(p)).join("|");
      const html = `<div class="jw jw-tw" style="text-align:${align}">
        <h2 class="jw-tw-h" style="font-size:${fs}px;color:${textColor}">${prefix}<span class="jw-tw-dyn" data-words="${data}" style="color:${accent}">${esc(phrases[0] ?? "")}</span><span class="jw-tw-cursor" style="background:${accent}"></span></h2>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-tw{font-family:inherit}
        ${r} .jw-tw-h{font-weight:800;line-height:1.2;margin:0}
        ${r} .jw-tw-dyn{font-weight:800}
        ${r} .jw-tw-cursor{display:inline-block;width:3px;height:1em;margin-left:2px;vertical-align:-2px;animation:jw-tw-blink 1s step-end infinite}
        @keyframes jw-tw-blink{50%{opacity:0}}
        ${r} .jw-brand{margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Flip Cards ─────────────────────────────────────────────────────────────
    case "flipcard": {
      const items = arr(config.items);
      const cols = Math.max(1, Math.min(4, num(config.columns, 3)));
      const trigger = String(config.trigger ?? "hover");
      const frontBg = col(config.frontColor, "#0d9488");
      const backBg = col(config.backColor, "#0f172a");
      const cards = items
        .map(
          (it) => `<div class="jw-fc" tabindex="0">
          <div class="jw-fc-inner">
            <div class="jw-fc-face jw-fc-front" style="background:${frontBg}"><span class="jw-fc-ic">${esc(it.icon)}</span><h4>${esc(it.front)}</h4></div>
            <div class="jw-fc-face jw-fc-back" style="background:${backBg}"><p>${esc(it.back)}</p></div>
          </div>
        </div>`,
        )
        .join("");
      const html = `<div class="jw jw-flipcard" data-trigger="${trigger}"><div class="jw-fc-grid">${cards}</div>${brand}</div>`;
      const flipRule =
        trigger === "hover"
          ? `${r} .jw-fc:hover .jw-fc-inner,${r} .jw-fc:focus .jw-fc-inner{transform:rotateY(180deg)}`
          : `${r} .jw-fc.jw-flipped .jw-fc-inner{transform:rotateY(180deg)}`;
      const css = `
        ${r} .jw-flipcard{font-family:inherit}
        ${r} .jw-fc-grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:16px}
        @media(max-width:640px){${r} .jw-fc-grid{grid-template-columns:1fr}}
        ${r} .jw-fc{perspective:1000px;min-height:200px;cursor:pointer;outline:none}
        ${r} .jw-fc-inner{position:relative;width:100%;height:100%;min-height:200px;transition:transform .6s;transform-style:preserve-3d}
        ${flipRule}
        ${r} .jw-fc-face{position:absolute;inset:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;border-radius:16px;padding:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff}
        ${r} .jw-fc-front .jw-fc-ic{font-size:36px;margin-bottom:10px}
        ${r} .jw-fc-front h4{margin:0;font-size:19px;font-weight:700}
        ${r} .jw-fc-back{transform:rotateY(180deg)}
        ${r} .jw-fc-back p{margin:0;font-size:15px;line-height:1.55;opacity:.95}
        ${r} .jw-brand{text-align:center;margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Promo Banner ───────────────────────────────────────────────────────────
    case "banner": {
      const bg = col(config.bgColor, "#0d9488");
      const fg = col(config.textColor, "#ffffff");
      const btnC = col(config.buttonColor, "#ffffff");
      const align = String(config.align ?? "center");
      const rounded = bool(config.rounded, true);
      const bgImg = String(config.bgImage ?? "");
      const style = bgImg ? `background:linear-gradient(${bg}cc,${bg}cc),url('${safeUrl(bgImg)}') center/cover` : `background:${bg}`;
      const html = `<div class="jw jw-banner" style="${style};color:${fg};text-align:${align};border-radius:${rounded ? "20px" : "0"}">
        <div class="jw-banner-in">
          <h2 class="jw-banner-h">${esc(config.heading)}</h2>
          ${config.subtext ? `<p class="jw-banner-s">${esc(config.subtext)}</p>` : ""}
          ${config.ctaLabel ? `<a class="jw-banner-cta" href="${safeUrl(config.ctaUrl)}" target="_blank" rel="noopener" style="background:${btnC};color:${bg}">${esc(config.ctaLabel)}</a>` : ""}
        </div>
      </div>`;
      const css = `
        ${r} .jw-banner{font-family:inherit;padding:48px 32px;overflow:hidden}
        ${r} .jw-banner-in{max-width:640px;margin:${align === "center" ? "0 auto" : "0"}}
        ${r} .jw-banner-h{font-size:30px;font-weight:800;margin:0 0 10px;line-height:1.2}
        ${r} .jw-banner-s{font-size:16px;margin:0 0 22px;opacity:.92;line-height:1.55}
        ${r} .jw-banner-cta{display:inline-block;padding:13px 28px;border-radius:999px;font-weight:700;text-decoration:none;transition:transform .15s,box-shadow .15s}
        ${r} .jw-banner-cta:hover{transform:translateY(-2px);box-shadow:0 12px 26px -8px rgba(0,0,0,.4)}`;
      return { mode: "block", html, css };
    }

    // ── Comparison Table ───────────────────────────────────────────────────────
    case "comparison": {
      const accent = col(config.accentColor, "#0d9488");
      const heads = [String(config.col1 ?? ""), String(config.col2 ?? ""), String(config.col3 ?? "")];
      const hi = Math.max(0, Math.min(3, num(config.highlight, 2)));
      const rows = arr(config.rows);
      const cell = (v: unknown) => {
        const s = String(v ?? "").trim().toLowerCase();
        if (s === "yes" || s === "true" || s === "✓" || s === "y") return `<span class="jw-cmp-yes" style="color:${accent}">✓</span>`;
        if (s === "no" || s === "false" || s === "✗" || s === "x" || s === "-") return `<span class="jw-cmp-no">✗</span>`;
        return esc(v);
      };
      const headCells = heads.map((h, i) => `<th class="${hi === i + 1 ? "jw-cmp-hi" : ""}">${esc(h)}</th>`).join("");
      const bodyRows = rows
        .map(
          (row) => `<tr>
          <td class="jw-cmp-feat">${esc(row.feature)}</td>
          <td class="${hi === 1 ? "jw-cmp-hi" : ""}">${cell(row.v1)}</td>
          <td class="${hi === 2 ? "jw-cmp-hi" : ""}">${cell(row.v2)}</td>
          <td class="${hi === 3 ? "jw-cmp-hi" : ""}">${cell(row.v3)}</td>
        </tr>`,
        )
        .join("");
      const html = `<div class="jw jw-cmp">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-cmp-wrap"><table>
          <thead><tr><th></th>${headCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table></div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-cmp{font-family:inherit}
        ${r} .jw-heading{font-size:24px;font-weight:700;text-align:center;margin:0 0 20px;color:#0f172a}
        ${r} .jw-cmp-wrap{overflow-x:auto}
        ${r} .jw-cmp table{width:100%;border-collapse:collapse;min-width:480px}
        ${r} .jw-cmp th,${r} .jw-cmp td{padding:13px 16px;text-align:center;border-bottom:1px solid #eef2f6;font-size:14px}
        ${r} .jw-cmp thead th{font-weight:700;color:#0f172a;font-size:15px}
        ${r} .jw-cmp .jw-cmp-feat{text-align:left;color:#334155;font-weight:500}
        ${r} .jw-cmp .jw-cmp-hi{background:${accent}0d}
        ${r} .jw-cmp thead .jw-cmp-hi{border-top:3px solid ${accent}}
        ${r} .jw-cmp-yes{font-weight:800;font-size:17px}
        ${r} .jw-cmp-no{color:#cbd5e1;font-weight:700;font-size:15px}
        ${r} .jw-brand{text-align:center;margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Share Buttons ──────────────────────────────────────────────────────────
    case "socialshare": {
      const nets = arr(config.networks);
      const shape = String(config.shape ?? "circle");
      const size = Math.max(28, Math.min(64, num(config.size, 44)));
      const align = String(config.align ?? "left");
      const mono = String(config.colorStyle ?? "brand") === "mono";
      const monoColor = col(config.monoColor, "#0f172a");
      const shareUrl = String(config.shareUrl ?? "");
      const shareText = String(config.shareText ?? "");
      const NET: Record<string, { c: string; p: string }> = {
        facebook: { c: "#1877f2", p: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" },
        twitter: { c: "#000000", p: "M18.9 2H22l-7.3 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2.2l7.8-8.9L1.5 2h6.8l4.7 6.2zm-1.2 18h1.8L7.1 3.8H5.2z" },
        linkedin: { c: "#0a66c2", p: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.3 18.3H5.7V10h2.6zM7 8.8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.3 9.5h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3h-2.6V10h2.5v1.1h.1a2.8 2.8 0 0 1 2.5-1.4c2.7 0 3.2 1.8 3.2 4z" },
        whatsapp: { c: "#25d366", p: "M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3A2.8 2.8 0 0 0 6.4 10a4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2 .8 2 .5 2.4.5a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" },
        telegram: { c: "#26a5e4", p: "M22 4.5 2.5 12c-.9.4-.9 1.6 0 1.9l4.9 1.5 1.9 5.7c.3.8 1.2 1 1.8.4l2.7-2.5 4.8 3.5c.7.5 1.7.1 1.9-.7L23 5.7c.2-.9-.6-1.6-1-1.2zM9.5 14.3l8-5-6.5 6-.3 3.6z" },
        email: { c: "#0d9488", p: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z" },
        pinterest: { c: "#e60023", p: "M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2.9.5 1.7 1.4 1.7 1.7 0 2.9-2.2 2.9-4.8 0-2-1.3-3.4-3.8-3.4a4.3 4.3 0 0 0-4.5 4.3c0 .8.3 1.4.6 1.8.1.2.2.3.1.5l-.2.9c-.1.3-.3.4-.6.2-1.1-.5-1.7-1.9-1.7-3.5C5.5 8.3 7.6 6 11.6 6c3.3 0 5.6 2.4 5.6 5.2 0 3.3-1.9 5.8-4.6 5.8-.9 0-1.8-.5-2.1-1l-.6 2.2c-.2.8-.7 1.7-1 2.3A10 10 0 1 0 12 2z" },
        reddit: { c: "#ff4500", p: "M22 12a2.1 2.1 0 0 0-3.6-1.5 10.3 10.3 0 0 0-5.3-1.7l.9-4.2 3 .7a1.5 1.5 0 1 0 .2-1l-3.4-.7a.5.5 0 0 0-.6.4l-1 4.8a10.4 10.4 0 0 0-5.4 1.7A2.1 2.1 0 1 0 4.5 14a4 4 0 0 0 0 .6c0 2.9 3.4 5.3 7.6 5.3s7.6-2.4 7.6-5.3a4 4 0 0 0 0-.6A2.1 2.1 0 0 0 22 12zm-13 1.5a1.3 1.3 0 1 1 1.3 1.3A1.3 1.3 0 0 1 9 13.5zm7.6 3.4a4.7 4.7 0 0 1-3.3 1 4.7 4.7 0 0 1-3.3-1 .4.4 0 0 1 .6-.6 4 4 0 0 0 2.7.8 4 4 0 0 0 2.7-.8.4.4 0 1 1 .6.6zm-.4-2.1a1.3 1.3 0 1 1 1.3-1.3 1.3 1.3 0 0 1-1.3 1.3z" },
        copy: { c: "#64748b", p: "M9 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1v-2h1V5h-6v1H9zm-4 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zm2 0v8h6V9z" },
      };
      const btns = nets
        .map((n) => {
          const net = String(n.network ?? "").toLowerCase();
          const def = NET[net] || NET.copy;
          const color = mono ? monoColor : def.c;
          return `<button class="jw-sh" data-net="${esc(net)}" aria-label="${esc(net)}" style="background:${color}"><svg viewBox="0 0 24 24" fill="#fff" width="52%" height="52%"><path d="${def.p}"/></svg></button>`;
        })
        .join("");
      const html = `<div class="jw jw-socialshare" data-url="${esc(shareUrl)}" data-text="${esc(shareText)}" style="text-align:${align}">
        ${config.heading ? `<h3 class="jw-heading">${esc(config.heading)}</h3>` : ""}
        <div class="jw-sh-row">${btns}</div>
        <span class="jw-sh-toast" hidden>Link copied!</span>
        ${brand}
      </div>`;
      const radius = shape === "square" ? "12px" : "50%";
      const css = `
        ${r} .jw-socialshare{font-family:inherit}
        ${r} .jw-heading{font-size:18px;font-weight:600;margin:0 0 12px;color:#0f172a}
        ${r} .jw-sh-row{display:inline-flex;flex-wrap:wrap;gap:10px}
        ${r} .jw-sh{width:${size}px;height:${size}px;border:0;border-radius:${radius};cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:transform .15s,filter .15s}
        ${r} .jw-sh:hover{transform:translateY(-3px);filter:brightness(1.08)}
        ${r} .jw-sh-toast{display:block;margin-top:10px;font-size:13px;color:#0d9488;font-weight:600}
        ${r} .jw-sh-toast[hidden]{display:none}
        ${r} .jw-brand{margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Audio Player ───────────────────────────────────────────────────────────
    case "audio": {
      const accent = col(config.accentColor, "#0d9488");
      const bg = col(config.bgColor, "#0f172a");
      const art = String(config.artwork ?? "");
      const src = safeUrl(config.audioUrl);
      const html = `<div class="jw jw-audiow">
        <div class="jw-audio" style="background:${bg}">
          ${art ? `<img class="jw-au-art" src="${safeUrl(art)}" alt=""/>` : `<div class="jw-au-art jw-au-ph" style="background:${accent}33;color:${accent}">♪</div>`}
          <div class="jw-au-body">
            <div class="jw-au-title">${esc(config.title)}</div>
            <div class="jw-au-artist">${esc(config.artist)}</div>
            <audio class="jw-au-el" controls preload="metadata"${bool(config.loop, false) ? " loop" : ""}${src !== "#" ? ` src="${src}"` : ""}></audio>
          </div>
        </div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-audiow{font-family:inherit}
        ${r} .jw-audio{display:flex;align-items:center;gap:16px;padding:16px;border-radius:16px;color:#fff}
        ${r} .jw-au-art{width:76px;height:76px;border-radius:12px;object-fit:cover;flex:none}
        ${r} .jw-au-ph{display:flex;align-items:center;justify-content:center;font-size:34px}
        ${r} .jw-au-body{flex:1;min-width:0}
        ${r} .jw-au-title{font-weight:700;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        ${r} .jw-au-artist{font-size:13px;opacity:.7;margin-bottom:8px}
        ${r} .jw-au-el{width:100%;height:36px}
        ${r} .jw-brand{margin-top:10px;font-size:12px;text-align:center}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Image Hotspots ─────────────────────────────────────────────────────────
    case "imagehotspots": {
      const img = safeUrl(config.image);
      const pins = arr(config.points);
      const pinColor = col(config.pinColor, "#0d9488");
      const rad = bool(config.rounded, true) ? "16px" : "0";
      const dots = pins
        .map((p, i) => {
          const x = Math.max(0, Math.min(100, num(p.x, 50)));
          const y = Math.max(0, Math.min(100, num(p.y, 50)));
          return `<button class="jw-hs-pin" data-i="${i}" style="left:${x}%;top:${y}%" aria-label="${esc(p.title)}"><span class="jw-hs-dot" style="background:${pinColor}"></span><span class="jw-hs-tip"><b>${esc(p.title)}</b>${p.text ? `<span>${esc(p.text)}</span>` : ""}</span></button>`;
        })
        .join("");
      const html = `<div class="jw jw-hotspots">
        <div class="jw-hs-stage" style="border-radius:${rad}">
          ${img !== "#" ? `<img src="${img}" alt="" class="jw-hs-img"/>` : `<div class="jw-hs-empty">Add an image</div>`}
          ${dots}
        </div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-hotspots{font-family:inherit}
        ${r} .jw-hs-stage{position:relative;overflow:hidden;line-height:0}
        ${r} .jw-hs-img{width:100%;display:block}
        ${r} .jw-hs-empty{padding:60px;text-align:center;color:#94a3b8;background:#f1f5f9;line-height:normal}
        ${r} .jw-hs-pin{position:absolute;transform:translate(-50%,-50%);border:0;background:transparent;cursor:pointer;padding:0}
        ${r} .jw-hs-dot{display:block;width:20px;height:20px;border-radius:50%;box-shadow:0 0 0 4px rgba(255,255,255,.55),0 2px 6px rgba(0,0,0,.3)}
        ${r} .jw-hs-tip{position:absolute;bottom:150%;left:50%;transform:translateX(-50%);background:#0f172a;color:#fff;padding:10px 12px;border-radius:10px;width:180px;font-size:13px;line-height:1.4;opacity:0;visibility:hidden;transition:opacity .2s;text-align:left;z-index:5}
        ${r} .jw-hs-tip b{display:block;margin-bottom:3px}
        ${r} .jw-hs-pin:hover .jw-hs-tip,${r} .jw-hs-pin.jw-open .jw-hs-tip{opacity:1;visibility:visible}
        ${r} .jw-brand{text-align:center;margin-top:14px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Rating Badge ───────────────────────────────────────────────────────────
    case "rating": {
      const rating = Math.max(0, Math.min(5, num(config.rating, 4.8)));
      const count = num(config.count, 0);
      const starColor = col(config.starColor, "#f59e0b");
      const layout = String(config.layout ?? "card");
      const pct = (rating / 5) * 100;
      const showCount = bool(config.showCount, true);
      const starEls = `<span class="jw-rt-stars"><span class="jw-rt-bg">★★★★★</span><span class="jw-rt-fg" style="width:${pct}%;color:${starColor}">★★★★★</span></span>`;
      const countTxt = showCount && count ? `<span class="jw-rt-count">(${count.toLocaleString("en-IN")} reviews)</span>` : "";
      const html = `<div class="jw jw-rating jw-rt-${layout}">
        <div class="jw-rt-main"><span class="jw-rt-num">${rating.toFixed(1)}</span>${starEls}</div>
        ${config.label || countTxt ? `<div class="jw-rt-sub">${config.label ? `<span>${esc(config.label)}</span> ` : ""}${countTxt}</div>` : ""}
        ${config.source ? `<div class="jw-rt-src">via ${esc(config.source)}</div>` : ""}
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-rating{font-family:inherit}
        ${r} .jw-rt-card{text-align:center;border:1px solid #e5e7eb;border-radius:16px;padding:22px;display:inline-block;background:#fff}
        ${r} .jw-rt-inline{display:inline-flex;align-items:center;gap:10px;flex-wrap:wrap}
        ${r} .jw-rt-main{display:flex;align-items:center;justify-content:center;gap:10px}
        ${r} .jw-rt-num{font-size:34px;font-weight:800;color:#0f172a;line-height:1}
        ${r} .jw-rt-inline .jw-rt-num{font-size:22px}
        ${r} .jw-rt-stars{position:relative;display:inline-block;font-size:22px;letter-spacing:2px;line-height:1}
        ${r} .jw-rt-bg{color:#e5e7eb}
        ${r} .jw-rt-fg{position:absolute;left:0;top:0;overflow:hidden;white-space:nowrap}
        ${r} .jw-rt-sub{margin-top:8px;color:#64748b;font-size:14px}
        ${r} .jw-rt-inline .jw-rt-sub{margin-top:0}
        ${r} .jw-rt-src{margin-top:2px;color:#94a3b8;font-size:12px}
        ${r} .jw-brand{margin-top:12px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── Contact Card ───────────────────────────────────────────────────────────
    case "contactcard": {
      const accent = col(config.accentColor, "#0d9488");
      const rad = bool(config.rounded, true) ? "18px" : "4px";
      const av = String(config.avatar ?? "");
      const phone = String(config.phone ?? "").trim();
      const email = String(config.email ?? "").trim();
      const address = String(config.address ?? "").trim();
      const website = String(config.website ?? "").trim();
      const initials = String(config.name ?? "?").split(" ").map((w) => w.charAt(0)).join("").slice(0, 2);
      const btn = (href: string, label: string, svg: string) =>
        `<a class="jw-cc-btn" href="${href}"${href.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : ""}><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>${label}</a>`;
      const actions = [
        phone ? btn(`tel:${esc(phone)}`, "Call", `<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/>`) : "",
        email ? btn(`mailto:${esc(email)}`, "Email", `<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>`) : "",
        address ? btn(`https://maps.google.com/?q=${encodeURIComponent(address)}`, "Directions", `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`) : "",
        website ? btn(safeUrl(website), "Website", `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>`) : "",
      ].filter(Boolean).join("");
      const html = `<div class="jw jw-contactcard" style="border-radius:${rad}">
        <div class="jw-cc-top" style="background:${accent}">
          ${av ? `<img class="jw-cc-av" src="${safeUrl(av)}" alt=""/>` : `<span class="jw-cc-av jw-cc-ph">${esc(initials)}</span>`}
        </div>
        <div class="jw-cc-body">
          <h3 class="jw-cc-name">${esc(config.name)}</h3>
          <p class="jw-cc-role">${esc(config.role)}${config.role && config.company ? " · " : ""}${esc(config.company)}</p>
          <div class="jw-cc-actions">${actions}</div>
        </div>
        ${brand}
      </div>`;
      const css = `
        ${r} .jw-contactcard{font-family:inherit;max-width:360px;margin:0 auto;border:1px solid #e5e7eb;overflow:hidden;background:#fff}
        ${r} .jw-cc-top{height:74px;position:relative}
        ${r} .jw-cc-av,${r} .jw-cc-ph{position:absolute;left:50%;bottom:-34px;transform:translateX(-50%);width:78px;height:78px;border-radius:50%;object-fit:cover;border:4px solid #fff}
        ${r} .jw-cc-ph{background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700}
        ${r} .jw-cc-body{padding:46px 20px 22px;text-align:center}
        ${r} .jw-cc-name{margin:0;font-size:20px;font-weight:700;color:#0f172a}
        ${r} .jw-cc-role{margin:4px 0 16px;color:#64748b;font-size:14px}
        ${r} .jw-cc-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
        ${r} .jw-cc-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border-radius:10px;background:#f1f5f9;color:#334155;text-decoration:none;font-size:13px;font-weight:600;transition:background .15s,color .15s}
        ${r} .jw-cc-btn:hover{background:${accent};color:#fff}
        ${r} .jw-brand{text-align:center;padding-bottom:12px;font-size:12px}
        ${r} .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "block", html, css };
    }

    // ── AI Assistant (Chatbot) ───────────────────────────────────────────────────
    case "chatbot": {
      const primary = col(config.primaryColor, "#0d9488");
      const pos = String(config.position ?? "bottom-right") === "bottom-left" ? "left" : "right";
      const ai = bool(config.aiEnabled, true);
      const endpoint = opts.embedKey ? `${apiBase}/api/embed/chat/${opts.embedKey}` : "";
      const avatar = String(config.avatar ?? "");
      const icon = String(config.launcherIcon ?? "💬");
      const name = esc(config.botName || "Assistant");
      const faqArr = arr(config.knowledge)
        .map((k) => ({ q: String(k.question ?? ""), a: String(k.answer ?? "") }))
        .filter((k) => k.q && k.a);
      const faqJson = esc(JSON.stringify(faqArr));
      const sugs = arr(config.suggestions).map((s) => `<button type="button" class="jw-cbot-sug">${esc(s.text)}</button>`).join("");
      const av = avatar
        ? `<img class="jw-cbot-av" src="${safeUrl(avatar)}" alt=""/>`
        : `<span class="jw-cbot-av jw-cbot-av-ic">${esc(icon)}</span>`;
      const html = `<div class="jw jw-cbot" data-pos="${pos}" data-ai="${ai ? "1" : "0"}" data-preview="${opts.preview ? 1 : 0}" data-open="${bool(config.openByDefault, false) ? 1 : 0}" data-endpoint="${esc(endpoint)}" data-fallback="${esc(config.fallbackMessage)}" data-faq="${faqJson}">
        <button class="jw-cbot-launch" aria-label="Open chat" style="background:${primary}">
          <span class="jw-cbot-launch-ic">${esc(icon)}</span>
          ${config.launcherLabel ? `<span class="jw-cbot-launch-lbl">${esc(config.launcherLabel)}</span>` : ""}
        </button>
        <div class="jw-cbot-panel" hidden>
          <div class="jw-cbot-head" style="background:${primary}">
            ${av}
            <div class="jw-cbot-hid"><b>${name}</b><em>${ai ? "AI Assistant" : "We're here to help"}</em></div>
            <button class="jw-cbot-close" aria-label="Close chat">&times;</button>
          </div>
          <div class="jw-cbot-msgs"><div class="jw-cbot-msg jw-cbot-bot">${esc(config.welcomeMessage)}</div></div>
          ${sugs ? `<div class="jw-cbot-sugs">${sugs}</div>` : ""}
          <form class="jw-cbot-input">
            <input type="text" placeholder="${esc(config.inputPlaceholder || "Type your message…")}" autocomplete="off"/>
            <button type="submit" aria-label="Send" style="color:${primary}"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3 20.5v-6l8-2.5-8-2.5v-6l19 8.5z"/></svg></button>
          </form>
          ${brand}
        </div>
      </div>`;
      const side = pos === "left" ? "left:20px" : "right:20px";
      const css = `
        ${r} .jw-cbot{font-family:inherit}
        ${r} .jw-cbot-launch{position:fixed;bottom:20px;${side};z-index:2147482000;display:inline-flex;align-items:center;gap:6px;border:0;border-radius:999px;color:#fff;padding:0 20px 0 0;height:58px;cursor:pointer;box-shadow:0 12px 30px -6px rgba(0,0,0,.4);transition:transform .15s}
        ${r} .jw-cbot-launch:hover{transform:translateY(-2px)}
        ${r} .jw-cbot-launch-ic{display:inline-flex;align-items:center;justify-content:center;width:58px;height:58px;font-size:26px}
        ${r} .jw-cbot-launch-lbl{font-weight:600;font-size:15px;white-space:nowrap}
        ${r} .jw-cbot.jw-cbot-open .jw-cbot-launch{display:none}
        ${r} .jw-cbot-panel{position:fixed;bottom:20px;${side};z-index:2147482001;width:370px;max-width:calc(100vw - 40px);height:540px;max-height:calc(100vh - 40px);background:#fff;border-radius:18px;box-shadow:0 24px 60px -12px rgba(0,0,0,.45);display:flex;flex-direction:column;overflow:hidden}
        ${r} .jw-cbot-panel[hidden]{display:none}
        ${r} .jw-cbot-head{display:flex;align-items:center;gap:10px;padding:14px 16px;color:#fff}
        ${r} .jw-cbot-av{width:38px;height:38px;border-radius:50%;object-fit:cover;flex:none}
        ${r} .jw-cbot-av-ic{display:flex;align-items:center;justify-content:center;font-size:20px;background:rgba(255,255,255,.22)}
        ${r} .jw-cbot-hid{flex:1;min-width:0;line-height:1.25}
        ${r} .jw-cbot-hid b{display:block;font-size:15px}
        ${r} .jw-cbot-hid em{font-style:normal;font-size:12px;opacity:.85}
        ${r} .jw-cbot-close{background:transparent;border:0;color:#fff;font-size:26px;line-height:1;cursor:pointer;opacity:.9}
        ${r} .jw-cbot-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f8fafc}
        ${r} .jw-cbot-msg{max-width:82%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
        ${r} .jw-cbot-bot{align-self:flex-start;background:#fff;border:1px solid #e5e7eb;color:#334155;border-bottom-left-radius:4px}
        ${r} .jw-cbot-user{align-self:flex-end;background:${primary};color:#fff;border-bottom-right-radius:4px}
        ${r} .jw-cbot-typing{display:flex;gap:4px;align-items:center;min-width:44px}
        ${r} .jw-cbot-typing span{width:7px;height:7px;border-radius:50%;background:#cbd5e1;display:inline-block;animation:jw-cbot-bounce 1.2s infinite}
        ${r} .jw-cbot-typing span:nth-child(2){animation-delay:.2s}
        ${r} .jw-cbot-typing span:nth-child(3){animation-delay:.4s}
        @keyframes jw-cbot-bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}
        ${r} .jw-cbot-sugs{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 10px;background:#f8fafc}
        ${r} .jw-cbot-sug{border:1px solid ${primary}55;background:#fff;color:${primary};border-radius:999px;padding:6px 12px;font-size:13px;cursor:pointer;transition:background .15s}
        ${r} .jw-cbot-sug:hover{background:${primary}14}
        ${r} .jw-cbot-input{display:flex;align-items:center;gap:6px;padding:8px 12px;border-top:1px solid #e5e7eb;background:#fff}
        ${r} .jw-cbot-input input{flex:1;border:0;outline:none;font-size:14px;padding:8px;background:transparent;color:#0f172a}
        ${r} .jw-cbot-input button{background:transparent;border:0;cursor:pointer;display:inline-flex;padding:4px}
        ${r} .jw-cbot-panel .jw-brand{text-align:center;font-size:11px;padding:6px 0;background:#fff}
        ${r} .jw-cbot-panel .jw-brand a{color:#94a3b8;text-decoration:none}`;
      return { mode: "overlay", html, css };
    }

    default:
      return { mode: "block", html: `<div class="jw">Unknown tool.</div>`, css: "" };
  }
}
