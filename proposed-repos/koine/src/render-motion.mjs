// MOTION — a field that EVOLVES. The next sense after sound: organic perception is
// built for change. A trajectory of stance over time (with keyframes) becomes an
// animated GIF, and a filmstrip of stills for inspection. A sharp shift in the
// keyframes becomes a sharp shift on screen — the test of whether the field stays
// coherent (resonant) when it breaks.

import pkg from "gifenc";
const { GIFEncoder, quantize, applyPalette } = pkg;
import { encodePNG } from "./png.mjs";
import { computeRGB } from "./render-qualitative.mjs";
import { sampleAttention } from "./field.mjs";

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function renderMotionGif(field, getRegions, { frames = 44, mw = 660, mh = 432, delay = 85 } = {}) {
  const W = field.canvas.width, H = field.canvas.height;
  const enc = GIFEncoder();
  for (let f = 0; f < frames; f++) {
    const t = f / (frames - 1);
    const regions = getRegions(t);
    const rgb = computeRGB(regions, W, H, mw, mh, t * Math.PI * 2); // shimmer phase loops
    const rgba = new Uint8Array(mw * mh * 4);
    for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
      rgba[j] = rgb[i]; rgba[j + 1] = rgb[i + 1]; rgba[j + 2] = rgb[i + 2]; rgba[j + 3] = 255;
    }
    const pal = quantize(rgba, 256);
    const idx = applyPalette(rgba, pal, "rgba4444");
    // hold at the start, at the sharp moment (~0.5), and at the end before looping
    let d = delay;
    if (f === 0) d = 900;
    else if (f === frames - 1) d = 1400;
    else if (Math.abs(t - 0.5) < 0.03) d = 260;
    enc.writeFrame(idx, mw, mh, { palette: pal, delay: d });
  }
  enc.finish();
  return Buffer.from(enc.bytes());
}

// A filmstrip of labelled stills — viewable anywhere, and how the inorganic author
// inspects the motion (you cannot watch a GIF frame by frame; you can read stills).
export function renderMotionFilmstripSVG(field, getRegions, stops = (field.meta?.stops) || [
  [0.0, "t = 0"], [0.4, "t = 0.4"], [0.5, "t = 0.5"], [0.62, "t = 0.62"], [1.0, "t = 1"],
]) {
  const W = field.canvas.width, H = field.canvas.height;
  const fw = 300, fh = Math.round(fw * H / W), gap = 16, padX = 40, top = 96, labelH = 28;
  const svgW = padX * 2 + stops.length * fw + (stops.length - 1) * gap;
  const svgH = top + fh + labelH + 30;
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" font-family="DejaVu Sans">`];
  parts.push(`<rect width="${svgW}" height="${svgH}" fill="#ffffff"/>`);
  parts.push(`<text x="${svgW / 2}" y="42" text-anchor="middle" font-size="13" letter-spacing="3" font-weight="700" fill="#6b7280">KOINE · A FIELD IN MOTION (filmstrip)</text>`);
  if (field.meta.title) parts.push(`<text x="${svgW / 2}" y="74" text-anchor="middle" font-size="24" font-weight="700" fill="#1d2533">${esc(field.meta.title)}</text>`);
  const sc = fw / W;
  stops.forEach(([t, label], i) => {
    const x = padX + i * (fw + gap);
    const rgb = computeRGB(getRegions(t), W, H, fw, fh, t * Math.PI * 2);
    const uri = "data:image/png;base64," + encodePNG(fw, fh, rgb).toString("base64");
    parts.push(`<image href="${uri}" x="${x}" y="${top}" width="${fw}" height="${fh}"/>`);
    parts.push(`<rect x="${x}" y="${top}" width="${fw}" height="${fh}" fill="none" stroke="#e4e8ee"/>`);
    // show where attention is, if any (the focus of selection)
    const focus = sampleAttention(field, t);
    if (focus) parts.push(`<circle cx="${(x + focus.at[0] * sc).toFixed(1)}" cy="${(top + focus.at[1] * sc).toFixed(1)}" r="${(focus.radius * sc).toFixed(1)}" fill="none" stroke="#1d2533" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="4 4"/>`);
    // region labels (helps when attention is what moves and regions stay put)
    for (const r of field.regions) {
      if (!r.label) continue;
      const lx = x + r.at[0] * sc, ly = top + r.at[1] * sc;
      parts.push(`<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="10" font-weight="700" fill="#26303d" stroke="#ffffff" stroke-width="2.4" paint-order="stroke">${esc(r.label)}</text>`);
    }
    parts.push(`<text x="${x + fw / 2}" y="${top + fh + 20}" text-anchor="middle" font-size="13.5" font-weight="700" fill="#46506a">${esc(label)}</text>`);
  });
  parts.push(`</svg>`);
  return parts.join("\n") + "\n";
}
