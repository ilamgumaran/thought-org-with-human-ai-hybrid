#!/usr/bin/env node
// Koine CLI — render one FIELD to both projections from a single source.
//
//   node koine.mjs <field.koine.yaml> [--out dir]
//
// Emits, per field:
//   <id>.perceptual.svg / .png   the organic-facing rendering (stance is felt)
//   <id>.structural.txt / .json  the inorganic-facing rendering (stance is stated)
//
// One field, two minds. The whole thesis of Koine, runnable.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { loadField } from "./src/field.mjs";
import { renderPerceptual } from "./src/render-perceptual.mjs";
import { renderStructural } from "./src/render-structural.mjs";

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

const svg = renderPerceptual(field);
writeFileSync(join(outDir, `${id}.perceptual.svg`), svg);
const png = new Resvg(svg, { fitTo: { mode: "zoom", value: 2 }, font: { loadSystemFonts: true, defaultFontFamily: "DejaVu Sans" }, background: "white" }).render().asPng();
writeFileSync(join(outDir, `${id}.perceptual.png`), png);

const { json, text } = renderStructural(field);
writeFileSync(join(outDir, `${id}.structural.txt`), text);
writeFileSync(join(outDir, `${id}.structural.json`), JSON.stringify(json, null, 2) + "\n");

console.log(`field "${id}" → two projections:`);
console.log(`  organic   : ${join(outDir, id)}.perceptual.{svg,png}`);
console.log(`  inorganic : ${join(outDir, id)}.structural.{txt,json}`);
