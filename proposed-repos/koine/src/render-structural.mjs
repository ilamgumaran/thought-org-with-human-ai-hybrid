// STRUCTURAL renderer — the inorganic-facing projection of the SAME field. No
// sensation; pure stance, stated exactly. This is what the perceptual image is
// *of*: lossless, diff-able, parseable. The two renderings are guaranteed to be
// about one field, so "do we mean the same thing?" has a checkable answer.

import { GRAMMAR_TABLE } from "./grammar.mjs";

const bar = (v, n = 10) => "█".repeat(Math.round(v * n)).padEnd(n, "·");
const sign = (v) => (v >= 0 ? "+" : "") + v.toFixed(2);

export function renderStructural(field) {
  if (field.mode === "qualitative") return structuralQualitative(field);
  return structuralRelational(field);
}

function structuralQualitative(field) {
  const json = {
    meta: field.meta,
    regions: field.regions.map((r) => ({ id: r.id, label: r.label, at: r.at, radius: r.radius, intensity: r.intensity, stance: r.stance, ...(r.keys ? { keys: r.keys } : {}) })),
  };
  const lines = [];
  lines.push(`KOINE FIELD — structural reading (qualitative / continuous${field.motion ? " · motion" : ""})`);
  lines.push(`field: ${field.meta.id ?? "(unnamed)"}   "${field.meta.title ?? ""}"`);
  lines.push("");
  const ambivTag = (pos, neg) => (pos + neg > 1e-4 && Math.min(pos, neg) / (pos + neg) > 0.33 ? "  ← ambivalent" : "");
  if (field.motion) {
    lines.push(`REGIONS — trajectories over t (0..1).  charge = (pos | neg); BOTH high = ambivalent`);
    for (const r of field.regions) {
      lines.push(`${r.id}${r.label ? "  (" + r.label + ")" : ""}`);
      const keys = r.keys ?? [{ t: 0, ...r.stance }];
      for (const k of keys) {
        const conf = k.confidence != null ? ` conf ${k.confidence.toFixed(2)}` : "";
        const sal = k.salience != null ? ` sal ${k.salience.toFixed(2)}` : "";
        lines.push(`   t=${(+k.t).toFixed(2)}:  pos ${(k.pos ?? 0).toFixed(2)}  neg ${(k.neg ?? 0).toFixed(2)}${conf}${sal}${ambivTag(k.pos ?? 0, k.neg ?? 0)}`);
      }
    }
    lines.push("");
  } else {
    lines.push(`REGIONS   (soft sources of quality; the image is their superposition)`);
    lines.push(`  charge = (pos | neg): both low = neutral, one high = warm/cool, BOTH high = ambivalent`);
    lines.push(`${"id".padEnd(14)} ${"conf".padEnd(12)} ${"sal".padEnd(12)} ${"pos".padEnd(5)} ${"neg".padEnd(5)} at(x,y)`);
    for (const r of field.regions) {
      const s = r.stance;
      lines.push(`${(r.id ?? "").padEnd(14)} ${bar(s.confidence)} ${bar(s.salience)} ${s.pos.toFixed(2)}  ${s.neg.toFixed(2)} (${r.at[0]},${r.at[1]})${ambivTag(s.pos, s.neg)}`);
      if (r.label) lines.push(`${"".padEnd(14)} ${r.label}`);
    }
    lines.push("");
  }
  lines.push(`GRAMMAR (continuous)`);
  lines.push(`  charge pos/neg -> temperature: teal (pos) ↔ red (neg); BOTH high -> a living shimmer`);
  lines.push(`  salience -> presence/depth: bright & saturated ↔ faint`);
  lines.push(`  confidence -> clarity: clear ↔ fogged (desaturated) and grained (restless)`);
  lines.push(`  superposition: regions blend continuously; opposed charges form a visible seam`);
  return { json, text: lines.join("\n") + "\n" };
}

function structuralRelational(field) {
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
