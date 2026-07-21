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

    default:
      return { mode: "block", html: `<div class="jw">Unknown tool.</div>`, css: "" };
  }
}
