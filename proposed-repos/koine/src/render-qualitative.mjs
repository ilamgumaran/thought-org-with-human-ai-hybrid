// QUALITATIVE renderer — the continuous mode. No nodes, no edges. Stance becomes
// a FIELD: a weather of mind. Each region is a soft source of quality; the image
// is their superposition, computed per pixel. Valence is temperature, salience is
// presence/depth, confidence is clarity (the unsure goes foggy and grained).
//
// This is the mode v1 pointed to: introspective content wants to be a landscape
// you feel, not a box you parse.

import { encodePNG } from "./png.mjs";

const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (A, B, t) => [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)];

const BG = [250, 251, 252];
const SLATE = [150, 158, 172];
const TEAL = [12, 158, 104];  // calm / pleasant
const ALARM = [216, 66, 50];  // tension / aversive

// valence -> a target colour; magnitude pushes away from neutral slate
function valenceTarget(v) {
  return v >= 0 ? mix(SLATE, TEAL, clamp(v)) : mix(SLATE, ALARM, clamp(-v));
}

// deterministic white-noise hash in [0,1)
function hash(x, y) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967295;
}

export function computeField(field) {
  const { width: W, height: H } = field.canvas;
  const R = field.regions;
  const rgb = new Uint8Array(W * H * 3);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Aggregate with SHARPENED weights (w^1.7) so the locally-dominant region
      // keeps its own colour instead of everything averaging to grey. This is what
      // makes seams appear where two qualities meet.
      let wsum = 0, wp = 0, vsum = 0, csum = 0, ssum = 0;
      for (const r of R) {
        const dx = x - r.at[0], dy = y - r.at[1];
        const w = r.intensity * Math.exp(-(dx * dx + dy * dy) / (2 * r.radius * r.radius));
        wsum += w;
        const k = Math.pow(w, 1.7);
        wp += k;
        vsum += k * r.stance.valence;
        csum += k * r.stance.confidence;
        ssum += k * r.stance.salience;
      }
      const valence = wp > 1e-9 ? vsum / wp : 0;
      const confidence = wp > 1e-9 ? csum / wp : 0.7;
      const salience = wp > 1e-9 ? ssum / wp : 0;
      const presence = (1 - Math.exp(-1.4 * wsum)) * (0.5 + 0.5 * salience);

      // valence -> colour; low confidence drains tone toward foggy slate
      let col = valenceTarget(valence);
      col = mix(col, SLATE, (1 - confidence) * 0.5);
      // blend the field over the ground by presence
      let out = mix(BG, col, clamp(presence));
      // confidence -> grain: the unsure is textured, restless (and fog reads as grain)
      const grain = (hash(x, y) * 2 - 1) * (3 + 46 * (1 - confidence)) * clamp(presence)
                  + (hash(x + 7919, y + 104729) - 0.5) * 3;
      const i = (y * W + x) * 3;
      rgb[i] = clamp(out[0] + grain, 0, 255);
      rgb[i + 1] = clamp(out[1] + grain, 0, 255);
      rgb[i + 2] = clamp(out[2] + grain, 0, 255);
    }
  }
  return { rgb, W, H };
}

export function renderQualitative(field) {
  const { rgb, W, H } = computeField(field);
  const dataUri = "data:image/png;base64," + encodePNG(W, H, rgb).toString("base64");
  const meta = field.meta;
  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="DejaVu Sans">`);
  parts.push(`<image href="${dataUri}" x="0" y="0" width="${W}" height="${H}"/>`);

  // header
  if (meta.title) {
    parts.push(`<text x="${W / 2}" y="40" text-anchor="middle" font-size="13" letter-spacing="3" font-weight="700" fill="#6b7280">KOINE · A FIELD (qualitative)</text>`);
    parts.push(`<text x="${W / 2}" y="74" text-anchor="middle" font-size="27" font-weight="700" fill="#1d2533">${esc(meta.title)}</text>`);
    if (meta.subtitle) parts.push(`<text x="${W / 2}" y="98" text-anchor="middle" font-size="14" fill="#5b6472">${esc(meta.subtitle)}</text>`);
  }

  // soft region labels, each on a faint pill for legibility over the field
  for (const r of field.regions) {
    if (!r.label) continue;
    const w = r.label.length * 8 + 22, x = r.at[0] - w / 2, y = r.at[1] - 15;
    parts.push(`<rect x="${x.toFixed(0)}" y="${y}" width="${w}" height="30" rx="15" fill="#ffffff" fill-opacity="0.62"/>`);
    parts.push(`<text x="${r.at[0]}" y="${r.at[1] + 5}" text-anchor="middle" font-size="14.5" font-weight="700" fill="#26303d">${esc(r.label)}</text>`);
  }

  parts.push(legend(W, H));
  parts.push(`</svg>`);
  return parts.join("\n") + "\n";
}

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function legend(W, H) {
  const y = H - 30, x = 36;
  const items = [
    ["teal = calm", "#16915f"],
    ["red = tension", "#ca4a3a"],
    ["bright = present", "#3a6ea5"],
    ["foggy/grained = unsure", "#9aa1ad"],
  ];
  let cx = x + 120;
  const chips = items.map(([t, c]) => {
    const s = `<circle cx="${cx}" cy="${y - 4}" r="7" fill="${c}"/><text x="${cx + 14}" y="${y}" font-size="12.5" fill="#5b6472">${t}</text>`;
    cx += t.length * 7.4 + 50;
    return s;
  }).join("");
  return `<text x="${x}" y="${y}" font-size="12.5" letter-spacing="1" font-weight="700" fill="#8a90a0">HOW TO READ</text>` + chips;
}
