// Load a Koine FIELD (a .koine.yaml) and resolve it into a renderer-agnostic
// model: every node carries its stance AND the resolved sensation (from the
// grammar) AND its geometry; every edge carries its relation + routing.
//
// A field is content + stance. It never names colours or coordinates — those
// come from the grammar (sensation) and the layout (geometry). One source; the
// structural renderer reads the stance, the perceptual renderer reads the
// sensation, and they are guaranteed to be about the same field.

import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { valenceColor, solidity, presence, PROVENANCE, RELATIONS } from "./grammar.mjs";

function layout(spec, nodes) {
  const width = spec.canvas?.width ?? 920;
  const padding = spec.canvas?.padding ?? 40;
  const rowGap = spec.layout?.rowGap ?? 40;
  const colGap = spec.layout?.colGap ?? 40;
  let y = padding + (spec.meta?.title ? 86 : 0);
  for (const row of spec.layout?.rows ?? []) {
    const ids = Array.isArray(row) ? row : [row];
    const items = ids.map((id) => nodes[id]).filter(Boolean);
    const rowH = Math.max(...items.map((n) => n.h));
    const totalW = items.reduce((s, n) => s + n.w, 0) + colGap * (items.length - 1);
    let x = (width - totalW) / 2;
    for (const n of items) { n.x = x; n.y = y + (rowH - n.h) / 2; x += n.w + colGap; }
    y += rowH + rowGap;
  }
  for (const n of Object.values(nodes)) {
    if (n.at) { n.x = n.at.x; n.y = n.at.y; }
    n.cx = n.x + n.w / 2; n.cy = n.y + n.h / 2;
  }
  const bottom = Math.max(...Object.values(nodes).map((n) => n.y + n.h));
  return { width, height: Math.round(bottom + padding + 96), padding }; // room for legend
}

export function loadField(path) {
  const spec = parse(readFileSync(path, "utf8"));
  if (spec.meta?.mode === "qualitative") return loadQualitative(spec);
  return loadRelational(spec);
}

// QUALITATIVE: a continuous field of soft quality-regions (no nodes/edges).
function loadQualitative(spec) {
  const width = spec.canvas?.width ?? 1000;
  const height = spec.canvas?.height ?? 680;
  const regions = (spec.regions ?? []).map((r) => ({
    id: r.id,
    label: r.label,
    at: r.at ?? [width / 2, height / 2],
    radius: r.radius ?? 200,
    intensity: r.intensity ?? 1,
    stance: { confidence: 0.7, salience: 0.6, valence: 0, ...(r.stance ?? {}) },
  }));
  return { mode: "qualitative", meta: spec.meta ?? {}, canvas: { width, height }, regions };
}

function loadRelational(spec) {
  const nodes = {};
  for (const [id, raw] of Object.entries(spec.nodes ?? {})) {
    const st = { confidence: 0.8, salience: 0.5, valence: 0, by: "inorganic", ...(raw.stance ?? {}) };
    nodes[id] = {
      id,
      label: raw.label ?? id,
      stance: st,
      w: raw.w ?? 240,
      h: raw.h ?? 78,
      at: raw.at,
      // resolved sensation (the grammar applied):
      color: valenceColor(st.valence),
      solid: solidity(st.confidence),
      pres: presence(st.salience),
      mark: PROVENANCE[st.by] ?? PROVENANCE.inorganic,
    };
  }
  const canvas = layout(spec, nodes);
  const edges = (spec.edges ?? []).map((e) => {
    const rel = RELATIONS[e.relation] ?? RELATIONS["leads-to"];
    const a = nodes[e.from], b = nodes[e.to];
    return { ...e, rel, a, b, confidence: e.confidence ?? 0.8 };
  });
  return { mode: "relational", meta: spec.meta ?? {}, canvas, nodes: Object.values(nodes), edges };
}
