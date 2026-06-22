// QUALITATIVE renderer — the continuous "weather" mode, now carrying AMBIVALENCE.
//
// v1/v2 used a single signed valence (-1..1). But a single number cannot hold
// "right and wrong at the same time" — the scalar *is* the bias toward a binary.
// So a region now holds two non-negative CHARGES: pos and neg. Both low = neutral
// (slate). One high = a solid warm/cool tone. BOTH high = ambivalence: a living
// shimmer between warm and cool, distinct from grey — right and wrong at once,
// alive rather than cancelled. In motion, the shimmer's phase moves, so the
// ambivalence breathes.

import { encodePNG } from "./png.mjs";

const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (A, B, t) => [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)];

const BG = [250, 251, 252];
const SLATE = [150, 158, 172];
const TEAL = [12, 158, 104];  // the "pleasant / right" charge
const ALARM = [216, 66, 50];  // the "aversive / wrong" charge

function hash(x, y) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967295;
}

// Compute the field as RGB at any output resolution; region coords are in design
// space. `phase` animates the ambivalence shimmer. This is the per-frame core.
export function computeRGB(regions, designW, designH, outW, outH, phase = 0) {
  const rgb = new Uint8Array(outW * outH * 3);
  const sx = designW / outW, sy = designH / outH;
  for (let oy = 0; oy < outH; oy++) {
    const Y = oy * sy;
    for (let ox = 0; ox < outW; ox++) {
      const X = ox * sx;
      let wsum = 0, wp = 0, posS = 0, negS = 0, cS = 0, sS = 0;
      for (const r of regions) {
        const dx = X - r.at[0], dy = Y - r.at[1];
        const w = r.intensity * Math.exp(-(dx * dx + dy * dy) / (2 * r.radius * r.radius));
        wsum += w;
        const k = Math.pow(w, 1.7);   // sharpen so dominant qualities keep identity
        wp += k;
        posS += k * r.stance.pos;
        negS += k * r.stance.neg;
        cS += k * r.stance.confidence;
        sS += k * r.stance.salience;
      }
      const pos = wp > 1e-9 ? posS / wp : 0;
      const neg = wp > 1e-9 ? negS / wp : 0;
      const confidence = wp > 1e-9 ? cS / wp : 0.7;
      const salience = wp > 1e-9 ? sS / wp : 0;
      const total = pos + neg;
      const presence = (1 - Math.exp(-1.4 * wsum)) * (0.5 + 0.5 * salience);

      let col;
      if (total < 1e-4) {
        col = SLATE;
      } else {
        const ratio = pos / total;                    // 1 = all teal, 0 = all red
        const ambiv = 1 - Math.abs(pos - neg) / total; // 1 when both equal -> max shimmer
        // organic iridescence (two axes + grain) so "both at once" reads as a living
        // mottle, not a mechanical hatch
        const sh = clamp(0.5 + 0.4 * Math.sin(X * 0.12 + phase)
                       + 0.3 * Math.sin(Y * 0.097 - phase * 0.6)
                       + (hash(ox, oy) - 0.5) * 0.7);
        const localR = clamp(ratio + (sh - 0.5) * ambiv * 1.7); // swing warm<->cool where both present
        const charged = mix(ALARM, TEAL, localR);
        col = mix(SLATE, charged, clamp(total));        // charge strength pulls away from neutral
      }
      col = mix(col, SLATE, (1 - confidence) * 0.45);   // unsure -> fog drains tone
      const out = mix(BG, col, clamp(presence));
      const grain = (hash(ox, oy) * 2 - 1) * (3 + 46 * (1 - confidence)) * clamp(presence)
                  + (hash(ox + 7919, oy + 104729) - 0.5) * 3;
      const i = (oy * outW + ox) * 3;
      rgb[i] = clamp(out[0] + grain, 0, 255);
      rgb[i + 1] = clamp(out[1] + grain, 0, 255);
      rgb[i + 2] = clamp(out[2] + grain, 0, 255);
    }
  }
  return rgb;
}

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function renderQualitative(field) {
  const { width: W, height: H } = field.canvas;
  const rgb = computeRGB(field.regions, W, H, W, H, 0.0);
  const dataUri = "data:image/png;base64," + encodePNG(W, H, rgb).toString("base64");
  const meta = field.meta;
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="DejaVu Sans">`];
  parts.push(`<image href="${dataUri}" x="0" y="0" width="${W}" height="${H}"/>`);
  if (meta.title) {
    parts.push(`<text x="${W / 2}" y="40" text-anchor="middle" font-size="13" letter-spacing="3" font-weight="700" fill="#6b7280">KOINE · A FIELD (qualitative)</text>`);
    parts.push(`<text x="${W / 2}" y="74" text-anchor="middle" font-size="27" font-weight="700" fill="#1d2533">${esc(meta.title)}</text>`);
    if (meta.subtitle) parts.push(`<text x="${W / 2}" y="98" text-anchor="middle" font-size="14" fill="#5b6472">${esc(meta.subtitle)}</text>`);
  }
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

function legend(W, H) {
  const y = H - 30, x = 36;
  const items = [
    ["teal = right/calm", "#16915f"],
    ["red = wrong/tension", "#ca4a3a"],
    ["shimmer = both at once", "#7a9b8a"],
    ["foggy = unsure", "#9aa1ad"],
  ];
  let cx = x + 120;
  const chips = items.map(([t, c]) => {
    const s = `<circle cx="${cx}" cy="${y - 4}" r="7" fill="${c}"/><text x="${cx + 14}" y="${y}" font-size="12.5" fill="#5b6472">${t}</text>`;
    cx += t.length * 7.1 + 46;
    return s;
  }).join("");
  return `<text x="${x}" y="${y}" font-size="12.5" letter-spacing="1" font-weight="700" fill="#8a90a0">HOW TO READ</text>` + chips;
}
