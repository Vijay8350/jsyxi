/**
 * Generates blog cover images and inline article figures from the `art` spec on
 * each post in `prisma/blog-library.ts`.
 *
 *   npm run content:generate-blog-art
 *
 * Output (checked into the repo, served statically):
 *   public/blog-covers/<slug>.webp    1600x900  — dark, brand-teal cover art
 *   public/blog-figures/<slug>.webp   1200x675  — light diagram used inline
 *
 * SVG is built as plain strings and rasterised with sharp (libvips/librsvg), so
 * there is no design-tool step and the art regenerates deterministically.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { BLOG_LIBRARY, type BlogArt, type BlogArtFigure } from "../prisma/blog-library";

const ROOT = join(__dirname, "..");
const COVER_DIR = join(ROOT, "public", "blog-covers");
const FIGURE_DIR = join(ROOT, "public", "blog-figures");

const COVER_W = 1600;
const COVER_H = 900;
const FIG_W = 1200;
const FIG_H = 675;

const FONT = "Arial, Helvetica, sans-serif";

// Brand tokens mirrored from src/app/globals.css.
const INK = "#0b1716";
const SLATE = "#475569";
const MUTED = "#64748b";
const LINE = "#dbe7e4";
const CANVAS = "#f6faf9";
const BRAND = { 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 900: "#134e4a" };
const ACCENT = "#34d399";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Stable per-slug seed so regenerating produces identical art. */
function seedOf(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function rng(seed: number) {
  let state = seed || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

// Arial advance widths are close enough to a fixed ratio for headline wrapping.
function textWidth(text: string, size: number, bold: boolean): number {
  return text.length * size * (bold ? 0.545 : 0.5);
}

function wrap(text: string, size: number, bold: boolean, maxWidth: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (textWidth(candidate, size, bold) <= maxWidth || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[\s.,;:-]+$/, "")}...`;
  return kept;
}

function tspans(lines: string[], x: number, y: number, lineHeight: number): string {
  return lines
    .map((line, i) => `<tspan x="${x}" y="${y + i * lineHeight}">${esc(line)}</tspan>`)
    .join("");
}

/* ------------------------------------------------------------------ covers */

type MotifCtx = { rand: () => number; accent: string; glow: string };

function glassCard(x: number, y: number, w: number, h: number, opacity = 1, rotate = 0): string {
  const transform = rotate ? ` transform="rotate(${rotate} ${x + w / 2} ${y + h / 2})"` : "";
  return `<g${transform} opacity="${opacity}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="url(#glass)" stroke="url(#edge)" stroke-width="1.5"/></g>`;
}

function bar(x: number, y: number, w: number, h: number, fill: string, opacity = 1): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(h / 2, 6)}" fill="${fill}" opacity="${opacity}"/>`;
}

function star(cx: number, cy: number, r: number, fill: string, opacity = 1): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? r : r * 0.45;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`);
  }
  return `<polygon points="${points.join(" ")}" fill="${fill}" opacity="${opacity}"/>`;
}

function motifStars(c: MotifCtx): string {
  let out = glassCard(60, 120, 470, 190, 0.95) + glassCard(120, 350, 470, 190, 0.8) + glassCard(40, 580, 470, 170, 0.6);
  const rows = [
    { x: 96, y: 120 },
    { x: 156, y: 350 },
    { x: 76, y: 580 },
  ];
  rows.forEach((row, idx) => {
    for (let i = 0; i < 5; i += 1) {
      out += star(row.x + i * 46, row.y + 58, 17, i < 4 + (idx % 2) ? c.accent : "#1f3a37", 1);
    }
    out += bar(row.x, row.y + 100, 300, 12, "#ffffff", 0.22);
    out += bar(row.x, row.y + 126, 200, 12, "#ffffff", 0.12);
  });
  return out;
}

function motifChat(c: MotifCtx): string {
  let out = "";
  out += glassCard(70, 140, 430, 130, 0.9);
  out += `<path d="M110 270 L110 300 L150 270 Z" fill="url(#glass)"/>`;
  out += bar(106, 176, 260, 14, "#ffffff", 0.28) + bar(106, 208, 190, 14, "#ffffff", 0.15);
  out += `<rect x="180" y="340" width="420" height="130" rx="18" fill="${c.accent}" opacity="0.9"/>`;
  out += `<path d="M560 470 L560 500 L520 470 Z" fill="${c.accent}" opacity="0.9"/>`;
  out += bar(212, 376, 250, 14, "#04201d", 0.55) + bar(212, 408, 300, 14, "#04201d", 0.35);
  out += glassCard(70, 540, 430, 130, 0.75);
  out += bar(106, 576, 220, 14, "#ffffff", 0.22) + bar(106, 608, 280, 14, "#ffffff", 0.12);
  out += `<circle cx="560" cy="640" r="52" fill="${c.accent}" opacity="0.18"/><circle cx="560" cy="640" r="34" fill="${c.accent}"/>`;
  return out;
}

function motifForm(c: MotifCtx): string {
  let out = glassCard(90, 110, 490, 650, 0.95);
  out += bar(132, 156, 230, 18, "#ffffff", 0.35);
  const fields = [230, 320, 410, 500];
  fields.forEach((y, i) => {
    out += bar(132, y - 26, 120, 12, "#ffffff", 0.2);
    out += `<rect x="132" y="${y}" width="406" height="56" rx="12" fill="#ffffff" opacity="${i === 1 ? 0.14 : 0.07}" stroke="${i === 1 ? c.accent : "#ffffff"}" stroke-opacity="${i === 1 ? 0.9 : 0.16}" stroke-width="1.5"/>`;
    out += bar(154, y + 22, i === 1 ? 190 : 140, 12, "#ffffff", 0.22);
  });
  out += `<rect x="132" y="606" width="406" height="62" rx="14" fill="${c.accent}"/>`;
  out += bar(268, 631, 134, 14, "#04201d", 0.6);
  return out;
}

function motifChart(c: MotifCtx): string {
  let out = glassCard(60, 150, 560, 470, 0.95);
  const heights = [120, 190, 150, 260, 300, 240];
  heights.forEach((h, i) => {
    const x = 110 + i * 82;
    out += bar(x, 560 - h, 46, h, i === 4 ? c.accent : BRAND[600], i === 4 ? 1 : 0.55);
  });
  out += `<polyline points="133,${560 - 150} 215,${560 - 220} 297,${560 - 190} 379,${560 - 290} 461,${560 - 330} 543,${560 - 280}" fill="none" stroke="${BRAND[200]}" stroke-width="4" opacity="0.85" stroke-linecap="round"/>`;
  [150, 220, 190, 290, 330, 280].forEach((h, i) => {
    out += `<circle cx="${133 + i * 82}" cy="${560 - h}" r="7" fill="${BRAND[200]}"/>`;
  });
  out += bar(110, 596, 200, 12, "#ffffff", 0.18);
  out += glassCard(360, 640, 280, 120, 0.7);
  out += bar(392, 676, 150, 16, "#ffffff", 0.3) + bar(392, 706, 100, 12, "#ffffff", 0.15);
  return out;
}

function motifTimer(c: MotifCtx): string {
  let out = "";
  const cx = 330;
  const cy = 400;
  out += `<circle cx="${cx}" cy="${cy}" r="196" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="26"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="196" fill="none" stroke="${c.accent}" stroke-width="26" stroke-linecap="round" stroke-dasharray="880 1232" transform="rotate(-90 ${cx} ${cy})"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="150" fill="url(#glass)" stroke="url(#edge)" stroke-width="1.5"/>`;
  out += `<text x="${cx}" y="${cy + 6}" font-family="${FONT}" font-size="86" font-weight="700" fill="#ffffff" text-anchor="middle">02</text>`;
  out += `<text x="${cx}" y="${cy + 56}" font-family="${FONT}" font-size="24" font-weight="700" fill="${BRAND[300]}" text-anchor="middle" letter-spacing="6">DAYS</text>`;
  [0, 1, 2].forEach((i) => {
    const x = 90 + i * 170;
    out += `<rect x="${x}" y="660" width="140" height="96" rx="18" fill="url(#glass)" stroke="url(#edge)" stroke-width="1.5"/>`;
    out += `<text x="${x + 70}" y="722" font-family="${FONT}" font-size="42" font-weight="700" fill="#ffffff" text-anchor="middle">${["12", "45", "09"][i]}</text>`;
  });
  return out;
}

function motifMap(c: MotifCtx): string {
  let out = glassCard(50, 130, 590, 610, 0.95);
  out += `<g opacity="0.16" stroke="#ffffff" stroke-width="2">`;
  for (let i = 1; i < 5; i += 1) out += `<line x1="50" y1="${130 + i * 122}" x2="640" y2="${130 + i * 122}"/>`;
  for (let i = 1; i < 5; i += 1) out += `<line x1="${50 + i * 118}" y1="130" x2="${50 + i * 118}" y2="740"/>`;
  out += `</g>`;
  out += `<path d="M110 690 L250 520 L400 560 L560 320" fill="none" stroke="${BRAND[300]}" stroke-width="6" stroke-linecap="round" stroke-dasharray="18 14" opacity="0.9"/>`;
  const pin = (x: number, y: number, r: number, fill: string, o = 1) =>
    `<g opacity="${o}"><path d="M${x} ${y} C${x - r * 1.15} ${y - r * 1.5} ${x - r} ${y - r * 3.1} ${x} ${y - r * 3.1} C${x + r} ${y - r * 3.1} ${x + r * 1.15} ${y - r * 1.5} ${x} ${y} Z" fill="${fill}"/><circle cx="${x}" cy="${y - r * 2}" r="${r * 0.42}" fill="#04201d"/></g>`;
  out += `<circle cx="560" cy="320" r="70" fill="${c.accent}" opacity="0.16"/>`;
  out += pin(560, 330, 30, c.accent);
  out += pin(250, 528, 21, BRAND[300], 0.75);
  out += pin(112, 696, 21, BRAND[300], 0.55);
  return out;
}

function motifMedia(c: MotifCtx): string {
  let out = "";
  const tiles = [
    { x: 60, y: 130, w: 260, h: 200, o: 0.9 },
    { x: 340, y: 130, w: 300, h: 200, o: 0.7 },
    { x: 60, y: 350, w: 300, h: 240, o: 0.75 },
    { x: 380, y: 350, w: 260, h: 240, o: 0.95 },
    { x: 60, y: 610, w: 580, h: 150, o: 0.55 },
  ];
  tiles.forEach((t, i) => {
    out += `<rect x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="18" fill="url(#glass)" stroke="url(#edge)" stroke-width="1.5" opacity="${t.o}"/>`;
    out += `<circle cx="${t.x + t.w - 42}" cy="${t.y + 40}" r="14" fill="${i % 2 ? BRAND[300] : c.accent}" opacity="0.8"/>`;
    out += `<path d="M${t.x + 24} ${t.y + t.h - 30} L${t.x + t.w * 0.35} ${t.y + t.h * 0.45} L${t.x + t.w * 0.6} ${t.y + t.h - 30} Z" fill="#ffffff" opacity="0.18"/>`;
    out += `<path d="M${t.x + t.w * 0.5} ${t.y + t.h - 30} L${t.x + t.w * 0.72} ${t.y + t.h * 0.6} L${t.x + t.w - 24} ${t.y + t.h - 30} Z" fill="#ffffff" opacity="0.12"/>`;
  });
  out += `<circle cx="350" cy="470" r="56" fill="${c.accent}" opacity="0.22"/><path d="M334 444 L382 470 L334 496 Z" fill="${c.accent}"/>`;
  return out;
}

function motifCart(c: MotifCtx): string {
  let out = glassCard(70, 120, 520, 400, 0.95);
  out += `<rect x="106" y="156" width="180" height="180" rx="16" fill="#ffffff" opacity="0.12"/>`;
  out += `<circle cx="196" cy="230" r="42" fill="${c.accent}" opacity="0.35"/>`;
  out += bar(320, 168, 220, 18, "#ffffff", 0.32) + bar(320, 204, 160, 14, "#ffffff", 0.16);
  out += `<text x="320" y="268" font-family="${FONT}" font-size="42" font-weight="700" fill="#ffffff">Rs 1,299</text>`;
  out += bar(320, 296, 120, 12, "#ffffff", 0.14);
  out += `<rect x="106" y="380" width="434" height="62" rx="14" fill="${c.accent}"/>`;
  out += bar(252, 405, 142, 14, "#04201d", 0.6);
  out += bar(106, 470, 300, 12, "#ffffff", 0.14);
  out += glassCard(70, 560, 520, 200, 0.7);
  [0, 1, 2].forEach((i) => {
    out += `<circle cx="118" cy="${606 + i * 52}" r="13" fill="${i === 0 ? c.accent : "#ffffff"}" opacity="${i === 0 ? 1 : 0.2}"/>`;
    out += bar(146, 600 + i * 52, 300 - i * 60, 12, "#ffffff", 0.18);
  });
  return out;
}

function motifSpeed(c: MotifCtx): string {
  const cx = 340;
  const cy = 430;
  let out = `<path d="M${cx - 220} ${cy} A220 220 0 0 1 ${cx + 220} ${cy}" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="34" stroke-linecap="round"/>`;
  out += `<path d="M${cx - 220} ${cy} A220 220 0 0 1 ${cx + 90} ${cy - 200}" fill="none" stroke="${c.accent}" stroke-width="34" stroke-linecap="round"/>`;
  out += `<line x1="${cx}" y1="${cy}" x2="${cx + 118}" y2="${cy - 148}" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="24" fill="#ffffff"/>`;
  out += `<text x="${cx}" y="${cy + 96}" font-family="${FONT}" font-size="46" font-weight="700" fill="#ffffff" text-anchor="middle">1.2s</text>`;
  out += `<text x="${cx}" y="${cy + 134}" font-family="${FONT}" font-size="22" font-weight="700" fill="${BRAND[300]}" text-anchor="middle" letter-spacing="5">LCP</text>`;
  [0, 1, 2].forEach((i) => {
    out += `<rect x="${90 + i * 176}" y="640" width="152" height="110" rx="18" fill="url(#glass)" stroke="url(#edge)" stroke-width="1.5"/>`;
    out += bar(114 + i * 176, 676, 104 - i * 22, 14, i === 0 ? c.accent : "#ffffff", i === 0 ? 1 : 0.24);
    out += bar(114 + i * 176, 706, 70, 10, "#ffffff", 0.14);
  });
  return out;
}

function motifShield(c: MotifCtx): string {
  const cx = 340;
  let out = `<path d="M${cx} 130 L${cx + 200} 210 L${cx + 200} 430 C${cx + 200} 570 ${cx + 110} 660 ${cx} 700 C${cx - 110} 660 ${cx - 200} 570 ${cx - 200} 430 L${cx - 200} 210 Z" fill="url(#glass)" stroke="url(#edge)" stroke-width="2"/>`;
  out += `<path d="M${cx} 170 L${cx + 160} 234 L${cx + 160} 428 C${cx + 160} 542 ${cx + 88} 618 ${cx} 652 C${cx - 88} 618 ${cx - 160} 542 ${cx - 160} 428 L${cx - 160} 234 Z" fill="${c.accent}" opacity="0.14"/>`;
  out += `<path d="M${cx - 66} 410 L${cx - 18} 460 L${cx + 74} 356" fill="none" stroke="${c.accent}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`;
  return out;
}

function motifFunnel(c: MotifCtx): string {
  let out = "";
  const widths = [560, 440, 320, 200];
  widths.forEach((w, i) => {
    const x = 340 - w / 2;
    const y = 170 + i * 140;
    out += `<path d="M${x} ${y} L${x + w} ${y} L${x + w - 60} ${y + 110} L${x + 60} ${y + 110} Z" fill="${i === widths.length - 1 ? c.accent : BRAND[600]}" opacity="${i === widths.length - 1 ? 1 : 0.28 + i * 0.16}"/>`;
    out += bar(x + 88, y + 46, w - 176, 16, "#ffffff", i === widths.length - 1 ? 0.55 : 0.3);
  });
  out += `<circle cx="340" cy="756" r="34" fill="${c.accent}" opacity="0.2"/>`;
  return out;
}

function motifCode(c: MotifCtx): string {
  let out = glassCard(60, 130, 580, 610, 0.95);
  out += `<circle cx="104" cy="176" r="9" fill="#ffffff" opacity="0.25"/><circle cx="132" cy="176" r="9" fill="#ffffff" opacity="0.18"/><circle cx="160" cy="176" r="9" fill="#ffffff" opacity="0.12"/>`;
  const rows = [
    [0, 200], [24, 300], [24, 180], [48, 240], [48, 160], [24, 260], [0, 210], [24, 300], [48, 190],
  ];
  rows.forEach((row, i) => {
    const y = 240 + i * 52;
    out += bar(104 + row[0], y, row[1], 14, i % 3 === 0 ? c.accent : "#ffffff", i % 3 === 0 ? 0.9 : 0.2);
    out += bar(104 + row[0] + row[1] + 18, y, 90, 14, "#ffffff", 0.1);
  });
  out += `<text x="560" y="712" font-family="${FONT}" font-size="60" font-weight="700" fill="${BRAND[300]}" text-anchor="end" opacity="0.7">&lt;/&gt;</text>`;
  return out;
}

function motifGrid(c: MotifCtx): string {
  let out = "";
  for (let r = 0; r < 3; r += 1) {
    for (let col = 0; col < 3; col += 1) {
      const x = 60 + col * 200;
      const y = 150 + r * 200;
      const active = r === 1 && col === 1;
      out += `<rect x="${x}" y="${y}" width="170" height="170" rx="22" fill="${active ? c.accent : "url(#glass)"}" stroke="${active ? "none" : "url(#edge)"}" stroke-width="1.5" opacity="${active ? 1 : 0.55 + ((r + col) % 3) * 0.15}"/>`;
      out += `<circle cx="${x + 46}" cy="${y + 48}" r="16" fill="${active ? "#04201d" : "#ffffff"}" opacity="${active ? 0.6 : 0.22}"/>`;
      out += bar(x + 26, y + 96, 118, 12, active ? "#04201d" : "#ffffff", active ? 0.5 : 0.2);
      out += bar(x + 26, y + 120, 80, 12, active ? "#04201d" : "#ffffff", active ? 0.3 : 0.12);
    }
  }
  return out;
}

function motifSearch(c: MotifCtx): string {
  let out = glassCard(60, 150, 580, 96, 0.95);
  out += `<circle cx="118" cy="198" r="20" fill="none" stroke="${c.accent}" stroke-width="6"/><line x1="132" y1="212" x2="148" y2="228" stroke="${c.accent}" stroke-width="6" stroke-linecap="round"/>`;
  out += bar(172, 190, 260, 16, "#ffffff", 0.3);
  [0, 1, 2, 3].forEach((i) => {
    const y = 296 + i * 118;
    out += `<rect x="60" y="${y}" width="580" height="98" rx="18" fill="url(#glass)" stroke="url(#edge)" stroke-width="1.5" opacity="${i === 0 ? 1 : 0.72 - i * 0.14}"/>`;
    out += bar(96, y + 26, i === 0 ? 300 : 240 - i * 20, 16, i === 0 ? c.accent : "#ffffff", i === 0 ? 1 : 0.26);
    out += bar(96, y + 58, 420 - i * 40, 12, "#ffffff", 0.14);
  });
  return out;
}

const MOTIFS: Record<BlogArt["motif"], (c: MotifCtx) => string> = {
  stars: motifStars,
  chat: motifChat,
  form: motifForm,
  chart: motifChart,
  timer: motifTimer,
  map: motifMap,
  media: motifMedia,
  cart: motifCart,
  speed: motifSpeed,
  shield: motifShield,
  funnel: motifFunnel,
  code: motifCode,
  grid: motifGrid,
  search: motifSearch,
};

function coverSvg(art: BlogArt, slug: string): string {
  const rand = rng(seedOf(slug));
  const accents = [BRAND[400], ACCENT, BRAND[300]];
  const accent = accents[Math.floor(rand() * accents.length) % accents.length];
  const glowX = 1080 + Math.floor(rand() * 220);
  const glowY = 260 + Math.floor(rand() * 320);

  const headlineSize = 68;
  const headlineLines = wrap(art.coverHeadline, headlineSize, true, 700, 4);
  const headlineTop = 470 - (headlineLines.length - 1) * 40;

  const motif = MOTIFS[art.motif]({ rand, accent, glow: accent });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${COVER_W}" height="${COVER_H}" viewBox="0 0 ${COVER_W} ${COVER_H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#03100f"/>
      <stop offset="0.55" stop-color="#071b19"/>
      <stop offset="1" stop-color="#0b1716"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.42"/>
      <stop offset="0.55" stop-color="${BRAND[700]}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${BRAND[900]}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.04"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.08"/>
    </linearGradient>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#03100f" stop-opacity="0.88"/>
      <stop offset="0.62" stop-color="#03100f" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#03100f" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${accent}"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${COVER_W}" height="${COVER_H}" fill="url(#bg)"/>
  <ellipse cx="${glowX}" cy="${glowY}" rx="720" ry="620" fill="url(#glow)"/>
  <g opacity="0.055" stroke="#ffffff" stroke-width="1">
    ${Array.from({ length: 17 }, (_, i) => `<line x1="0" y1="${i * 56}" x2="${COVER_W}" y2="${i * 56}"/>`).join("")}
    ${Array.from({ length: 29 }, (_, i) => `<line x1="${i * 56}" y1="0" x2="${i * 56}" y2="${COVER_H}"/>`).join("")}
  </g>

  <g transform="translate(880 0)">${motif}</g>

  <rect x="0" y="0" width="1080" height="${COVER_H}" fill="url(#scrim)"/>

  <g transform="translate(96 0)">
    <rect x="0" y="188" width="86" height="5" rx="2.5" fill="url(#rule)"/>
    <text x="0" y="238" font-family="${FONT}" font-size="24" font-weight="700" fill="${BRAND[300]}" letter-spacing="5.5">${esc(art.eyebrow.toUpperCase())}</text>
    <text font-family="${FONT}" font-size="${headlineSize}" font-weight="700" fill="#ffffff" letter-spacing="-1.6">${tspans(headlineLines, 0, headlineTop, 82)}</text>
    <g transform="translate(0 760)">
      <circle cx="19" cy="-8" r="19" fill="${accent}"/>
      <text x="52" y="2" font-family="${FONT}" font-size="30" font-weight="700" fill="#ffffff" letter-spacing="1">jsyxi</text>
      <text x="140" y="1" font-family="${FONT}" font-size="21" fill="#8fb7b1">jsyxi.com</text>
    </g>
  </g>
</svg>`;
}

/* ----------------------------------------------------------------- figures */

function figHeader(title: string): string {
  const lines = wrap(title, 40, true, FIG_W - 160, 2);
  return `<text font-family="${FONT}" font-size="40" font-weight="700" fill="${INK}" letter-spacing="-0.6">${tspans(lines, 72, 108, 50)}</text>`;
}

function figCaption(caption: string | undefined): string {
  if (!caption) return "";
  const lines = wrap(caption, 22, false, FIG_W - 144, 2);
  return `<text font-family="${FONT}" font-size="22" fill="${MUTED}">${tspans(lines, 72, FIG_H - 66, 30)}</text>`;
}

function checkIcon(x: number, y: number, r: number): string {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${BRAND[500]}"/><path d="M${x - r * 0.42} ${y} L${x - r * 0.08} ${y + r * 0.36} L${x + r * 0.46} ${y - r * 0.34}" fill="none" stroke="#ffffff" stroke-width="${r * 0.28}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function crossIcon(x: number, y: number, r: number): string {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#e2e8f0"/><path d="M${x - r * 0.36} ${y - r * 0.36} L${x + r * 0.36} ${y + r * 0.36} M${x + r * 0.36} ${y - r * 0.36} L${x - r * 0.36} ${y + r * 0.36}" stroke="${SLATE}" stroke-width="${r * 0.26}" stroke-linecap="round"/>`;
}

function figFlow(f: BlogArtFigure): string {
  const items = f.items.slice(0, 4);
  const gap = 26;
  const top = 210;
  const boxW = Math.floor((FIG_W - 144 - gap * (items.length - 1)) / items.length);
  const boxH = 210;
  let out = "";
  items.forEach((item, i) => {
    const x = 72 + i * (boxW + gap);
    out += `<rect x="${x}" y="${top}" width="${boxW}" height="${boxH}" rx="20" fill="#ffffff" stroke="${i === items.length - 1 ? BRAND[400] : LINE}" stroke-width="${i === items.length - 1 ? 2.5 : 1.5}"/>`;
    out += `<circle cx="${x + 34}" cy="${top + 40}" r="19" fill="${i === items.length - 1 ? BRAND[500] : BRAND[200]}"/>`;
    out += `<text x="${x + 34}" y="${top + 48}" font-family="${FONT}" font-size="20" font-weight="700" fill="${i === items.length - 1 ? "#ffffff" : BRAND[700]}" text-anchor="middle">${i + 1}</text>`;
    const lines = wrap(item, 24, true, boxW - 48, 4);
    out += `<text font-family="${FONT}" font-size="24" font-weight="700" fill="${INK}">${tspans(lines, x + 24, top + 108, 32)}</text>`;
    if (i < items.length - 1) {
      const ax = x + boxW + gap / 2;
      out += `<path d="M${ax - 9} ${top + boxH / 2 - 11} L${ax + 8} ${top + boxH / 2} L${ax - 9} ${top + boxH / 2 + 11}" fill="none" stroke="${BRAND[400]}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  });
  return out;
}

function figChecklist(f: BlogArtFigure): string {
  const items = f.items.slice(0, 6);
  const top = 190;
  const rowH = Math.min(66, Math.floor((FIG_H - 300) / items.length));
  let out = `<rect x="72" y="${top - 26}" width="${FIG_W - 144}" height="${items.length * rowH + 44}" rx="22" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/>`;
  items.forEach((item, i) => {
    const y = top + i * rowH + 22;
    out += checkIcon(116, y, 17);
    const lines = wrap(item, 25, false, FIG_W - 260, 1);
    out += `<text x="152" y="${y + 9}" font-family="${FONT}" font-size="25" fill="${INK}">${esc(lines[0])}</text>`;
    if (i < items.length - 1) out += `<line x1="116" y1="${y + rowH / 2}" x2="${FIG_W - 116}" y2="${y + rowH / 2}" stroke="${LINE}" stroke-width="1"/>`;
  });
  return out;
}

function figCompare(f: BlogArtFigure): string {
  const good = f.items.slice(0, 4);
  const bad = (f.items2 ?? []).slice(0, 4);
  const colW = (FIG_W - 144 - 28) / 2;
  const top = 180;
  const height = FIG_H - top - 130;
  let out = "";
  const column = (x: number, rows: string[], positive: boolean) => {
    let col = `<rect x="${x}" y="${top}" width="${colW}" height="${height}" rx="22" fill="${positive ? "#f0fdfa" : "#ffffff"}" stroke="${positive ? BRAND[200] : LINE}" stroke-width="1.5"/>`;
    col += `<text x="${x + 30}" y="${top + 46}" font-family="${FONT}" font-size="21" font-weight="700" fill="${positive ? BRAND[700] : MUTED}" letter-spacing="2.4">${positive ? "DO THIS" : "AVOID"}</text>`;
    rows.forEach((row, i) => {
      const y = top + 96 + i * 64;
      col += positive ? checkIcon(x + 44, y, 15) : crossIcon(x + 44, y, 15);
      const lines = wrap(row, 22, false, colW - 100, 2);
      col += `<text font-family="${FONT}" font-size="22" fill="${positive ? INK : SLATE}">${tspans(lines, x + 74, y + 8, 26)}</text>`;
    });
    return col;
  };
  out += column(72, good, true);
  out += column(72 + colW + 28, bad, false);
  return out;
}

function figFunnel(f: BlogArtFigure): string {
  const items = f.items.slice(0, 5);
  const top = 186;
  const rowH = Math.min(78, Math.floor((FIG_H - top - 120) / items.length));
  const maxW = FIG_W - 260;
  let out = "";
  items.forEach((item, i) => {
    const w = maxW - (i * maxW) / (items.length + 1.6);
    const x = 72 + (maxW - w) / 2;
    const y = top + i * rowH;
    const t = i / Math.max(items.length - 1, 1);
    const fill = i === items.length - 1 ? BRAND[600] : BRAND[400];
    out += `<path d="M${x} ${y} L${x + w} ${y} L${x + w - 26} ${y + rowH - 10} L${x + 26} ${y + rowH - 10} Z" fill="${fill}" opacity="${0.32 + t * 0.62}"/>`;
    const lines = wrap(item, 23, true, w - 90, 1);
    out += `<text x="${x + w / 2}" y="${y + rowH / 2 + 3}" font-family="${FONT}" font-size="23" font-weight="700" fill="${i > items.length - 3 ? "#ffffff" : "#04302c"}" text-anchor="middle">${esc(lines[0])}</text>`;
  });
  return out;
}

function figStack(f: BlogArtFigure): string {
  const items = f.items.slice(0, 5);
  const top = 190;
  const rowH = Math.min(76, Math.floor((FIG_H - top - 120) / items.length));
  let out = "";
  items.forEach((item, i) => {
    const y = top + i * rowH;
    const h = rowH - 12;
    out += `<rect x="72" y="${y}" width="${FIG_W - 144}" height="${h}" rx="14" fill="${i === 0 ? "#f0fdfa" : "#ffffff"}" stroke="${i === 0 ? BRAND[300] : LINE}" stroke-width="1.5"/>`;
    out += `<rect x="72" y="${y}" width="8" height="${h}" rx="4" fill="${BRAND[500]}" opacity="${1 - i * 0.16}"/>`;
    out += `<text x="112" y="${y + h / 2 + 8}" font-family="${FONT}" font-size="23" font-weight="700" fill="${BRAND[700]}">${i + 1}</text>`;
    const lines = wrap(item, 24, false, FIG_W - 320, 1);
    out += `<text x="152" y="${y + h / 2 + 8}" font-family="${FONT}" font-size="24" fill="${INK}">${esc(lines[0])}</text>`;
  });
  return out;
}

function figBars(f: BlogArtFigure): string {
  const items = f.items.slice(0, 5);
  const top = 200;
  const rowH = Math.min(84, Math.floor((FIG_H - top - 120) / items.length));
  const maxW = FIG_W - 200;
  let out = "";
  items.forEach((item, i) => {
    const y = top + i * rowH;
    const w = maxW * (1 - i * 0.16);
    out += `<rect x="72" y="${y}" width="${w}" height="${rowH - 24}" rx="10" fill="${BRAND[500]}" opacity="${0.9 - i * 0.14}"/>`;
    const lines = wrap(item, 23, true, w - 48, 1);
    out += `<text x="96" y="${y + (rowH - 24) / 2 + 8}" font-family="${FONT}" font-size="23" font-weight="700" fill="#ffffff">${esc(lines[0])}</text>`;
  });
  return out;
}

function figureSvg(art: BlogArt): string {
  const f = art.figure;
  const body =
    f.kind === "flow" ? figFlow(f)
      : f.kind === "checklist" ? figChecklist(f)
        : f.kind === "compare" ? figCompare(f)
          : f.kind === "funnel" ? figFunnel(f)
            : f.kind === "stack" ? figStack(f)
              : figBars(f);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${FIG_W}" height="${FIG_H}" viewBox="0 0 ${FIG_W} ${FIG_H}">
  <rect width="${FIG_W}" height="${FIG_H}" fill="${CANVAS}"/>
  <rect x="0.75" y="0.75" width="${FIG_W - 1.5}" height="${FIG_H - 1.5}" rx="0" fill="none" stroke="${LINE}" stroke-width="1.5"/>
  <rect x="0" y="0" width="${FIG_W}" height="6" fill="${BRAND[500]}"/>
  <text x="72" y="66" font-family="${FONT}" font-size="19" font-weight="700" fill="${BRAND[600]}" letter-spacing="3.4">${esc(art.eyebrow.toUpperCase())}</text>
  ${figHeader(f.title)}
  ${body}
  ${figCaption(f.caption)}
  <text x="${FIG_W - 72}" y="${FIG_H - 30}" font-family="${FONT}" font-size="19" font-weight="700" fill="${BRAND[600]}" text-anchor="end">jsyxi.com</text>
</svg>`;
}

/* -------------------------------------------------------------------- main */

async function render(svg: string, file: string, quality: number): Promise<number> {
  const buffer = await sharp(Buffer.from(svg), { density: 96 }).webp({ quality, effort: 6 }).toBuffer();
  writeFileSync(file, buffer);
  return buffer.length;
}

async function main() {
  mkdirSync(COVER_DIR, { recursive: true });
  mkdirSync(FIGURE_DIR, { recursive: true });

  const posts = BLOG_LIBRARY.filter((post) => post.art);
  if (posts.length === 0) {
    console.log("No posts carry an `art` spec — nothing to generate.");
    return;
  }

  let bytes = 0;
  for (const post of posts) {
    const art = post.art as BlogArt;
    bytes += await render(coverSvg(art, post.slug), join(COVER_DIR, `${post.slug}.webp`), 84);
    bytes += await render(figureSvg(art), join(FIGURE_DIR, `${post.slug}.webp`), 88);
    console.log(`  ${post.slug}`);
  }

  console.log(`\nGenerated ${posts.length * 2} images (${(bytes / 1024 / 1024).toFixed(2)} MB total).`);
  console.log(`  covers  -> public/blog-covers/`);
  console.log(`  figures -> public/blog-figures/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
