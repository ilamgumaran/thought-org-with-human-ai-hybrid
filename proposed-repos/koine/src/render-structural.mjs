// STRUCTURAL renderer — the inorganic-facing projection of the SAME field. No
// sensation; pure stance, stated exactly. This is what the perceptual image is
// *of*: lossless, diff-able, parseable. The two renderings are guaranteed to be
// about one field, so "do we mean the same thing?" has a checkable answer.

import { GRAMMAR_TABLE } from "./grammar.mjs";

const bar = (v, n = 10) => "█".repeat(Math.round(v * n)).padEnd(n, "·");
const sign = (v) => (v >= 0 ? "+" : "") + v.toFixed(2);

export function renderStructural(field) {
  const json = {
    meta: field.meta,
    nodes: field.nodes.map((n) => ({ id: n.id, label: n.label, stance: n.stance })),
    edges: field.edges.map((e) => ({ from: e.from, relation: e.relation, to: e.to, confidence: e.confidence })),
  };

  const lines = [];
  lines.push(`KOINE FIELD — structural reading`);
  lines.push(`field: ${field.meta.id ?? "(unnamed)"}   "${field.meta.title ?? ""}"`);
  lines.push("");
  lines.push(`NODES   (conf = confidence, sal = salience, val = valence, by = provenance)`);
  lines.push(`${"id".padEnd(14)} ${"conf".padEnd(12)} ${"sal".padEnd(12)} ${"val".padEnd(7)} by`);
  for (const n of field.nodes) {
    const s = n.stance;
    lines.push(`${n.id.padEnd(14)} ${bar(s.confidence)} ${bar(s.salience)} ${sign(s.valence).padEnd(7)} ${s.by}`);
    lines.push(`${"".padEnd(14)} ${n.label}`);
  }
  lines.push("");
  lines.push(`EDGES`);
  for (const e of field.edges) {
    lines.push(`  ${e.from}  —[${e.relation}]→  ${e.to}   (conf ${e.confidence.toFixed(2)})`);
  }
  lines.push("");
  lines.push(`GRAMMAR (how the perceptual rendering encodes the above)`);
  for (const [k, range, mapping] of GRAMMAR_TABLE) lines.push(`  ${k} [${range}]  ->  ${mapping}`);

  return { json, text: lines.join("\n") + "\n" };
}
