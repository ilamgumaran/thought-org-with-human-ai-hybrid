#!/usr/bin/env node
// Koine CLI — render one FIELD to its projections from a single source.
//
//   node koine.mjs <field.koine.yaml> [--out dir]
//
// Static fields emit perceptual (eye) + structural (inorganic), and — if
// qualitative — sound (ear). Motion fields (meta.motion: true) emit an animated
// GIF, a filmstrip of stills, and an evolving soundtrack.
//
// One field, many minds and senses. The whole thesis of Koine, runnable.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { loadField, sampleRegions, sampleAttention, applyAttention } from "./src/field.mjs";
import { renderPerceptual } from "./src/render-perceptual.mjs";
import { renderQualitative } from "./src/render-qualitative.mjs";
import { renderMotionGif, renderMotionFilmstripSVG } from "./src/render-motion.mjs";
import { renderStructural } from "./src/render-structural.mjs";
import { sonifyField, sonifyMotion } from "./src/sonify.mjs";

const path = process.argv[2];
if (!path || path.startsWith("--")) {
  console.error("Usage: node koine.mjs <field.koine.yaml> [--out dir]");
  process.exit(1);
}
const oi = process.argv.indexOf("--out");
const outDir = oi > -1 ? process.argv[oi + 1] : join(dirname(path), "build");
mkdirSync(outDir, { recursive: true });

const field = loadField(path);
const id = field.meta.id || basename(path).replace(/\.koine\.ya?ml$|\.ya?ml$/, "");
const P = (suffix) => join(outDir, `${id}.${suffix}`);
const toPng = (svg, zoom) => new Resvg(svg, { fitTo: { mode: "zoom", value: zoom }, font: { loadSystemFonts: true, defaultFontFamily: "DejaVu Sans" }, background: "white" }).render().asPng();

// structural (inorganic) — always
const { json, text } = renderStructural(field);
writeFileSync(P("structural.txt"), text);
writeFileSync(P("structural.json"), JSON.stringify(json, null, 2) + "\n");

console.log(`field "${id}" →`);

// regions at time t, attention-gated if the field declares attention
const getRegions = (t) => {
  const rs = sampleRegions(field, t);
  return field.attention ? applyAttention(rs, sampleAttention(field, t)) : rs;
};

if (field.motion) {
  writeFileSync(P("motion.gif"), renderMotionGif(field, getRegions));
  writeFileSync(P("filmstrip.png"), toPng(renderMotionFilmstripSVG(field, getRegions), 1.5));
  const { wav, rms, seconds } = sonifyMotion(field, getRegions);
  writeFileSync(P("motion.wav"), wav);
  console.log(`  organic-eye : ${P("motion.gif")}  +  ${P("filmstrip.png")}`);
  console.log(`  organic-ear : ${P("motion.wav")}   (${seconds}s, rms ${rms.toFixed(3)})`);
} else {
  const svg = field.mode === "qualitative" ? renderQualitative(field) : renderPerceptual(field);
  writeFileSync(P("perceptual.svg"), svg);
  writeFileSync(P("perceptual.png"), toPng(svg, field.mode === "qualitative" ? 1.5 : 2));
  let ear = "";
  if (field.mode === "qualitative") {
    const { wav, rms, seconds } = sonifyField(field);
    writeFileSync(P("perceptual.wav"), wav);
    ear = `\n  organic-ear : ${P("perceptual.wav")}   (${seconds}s, rms ${rms.toFixed(3)})`;
  }
  console.log(`  organic-eye : ${P("perceptual.{svg,png}")}${ear}`);
}
console.log(`  inorganic   : ${P("structural.{txt,json}")}`);
