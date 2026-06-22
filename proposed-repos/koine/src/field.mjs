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
// Stance carries two charges (pos/neg) so it can hold ambivalence. Regions may
// have `keys` (keyframes over t in 0..1) for the motion mode.
const _lerp = (a, b, t) => a + (b - a) * t;
const _clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
const _smooth = (u) => { u = _clamp(u); return u * u * (3 - 2 * u); };

// pos/neg charges from either {charge:{pos,neg}} or a scalar valence
function chargeOf(o = {}) {
  if (o.charge) return { pos: o.charge.pos ?? 0, neg: o.charge.neg ?? 0 };
  if (o.valence != null) return { pos: Math.max(o.valence, 0), neg: Math.max(-o.valence, 0) };
  return { pos: 0, neg: 0 };
}

function loadQualitative(spec) {
  const width = spec.canvas?.width ?? 1000;
  const height = spec.canvas?.height ?? 680;
  const regions = (spec.regions ?? []).map((r) => {
    const st = { confidence: 0.7, salience: 0.6, ...(r.stance ?? {}) };
    const { pos, neg } = chargeOf(r.stance ?? {});
    const region = {
      id: r.id,
      label: r.label,
      at: r.at ?? [width / 2, height / 2],
      radius: r.radius ?? 200,
      intensity: r.intensity ?? 1,
      stance: { confidence: st.confidence, salience: st.salience, pos, neg },
    };
    if (r.keys) {
      region.keys = r.keys.map((k) => {
        const c = chargeOf(k);
        const key = { t: k.t, pos: c.pos, neg: c.neg };
        for (const f of ["confidence", "salience", "intensity", "radius"]) if (k[f] != null) key[f] = k[f];
        if (k.at) key.at = k.at;
        return key;
      });
    }
    return region;
  });
  const attention = spec.attention ? spec.attention.map((k) => ({ t: k.t, at: k.at, radius: k.radius ?? 120 })) : null;
  return { mode: "qualitative", motion: !!spec.meta?.motion, meta: spec.meta ?? {}, canvas: { width, height }, regions, attention };
}

// Where attention is at time t (a moving focus): interpolate its position + radius.
export function sampleAttention(field, t) {
  if (!field.attention) return null;
  const ks = field.attention;
  return { at: interpAt(ks, t, ks[0].at), radius: interpNum(ks, t, "radius", ks[0].radius) };
}

// Gate regions by attention: what is in focus brightens; what is ignored recedes
// (loses presence and tone). This is "what we choose to react to vs what we ignore."
export function applyAttention(regions, focus) {
  if (!focus) return regions;
  return regions.map((r) => {
    const d = Math.hypot(r.at[0] - focus.at[0], r.at[1] - focus.at[1]);
    const f = _smooth(_clamp((focus.radius * 1.35 - d) / (focus.radius * 0.9))); // 1 in focus, 0 far
    const att = 0.25 + 0.9 * f;
    return {
      ...r,
      intensity: r.intensity * att,
      stance: {
        confidence: r.stance.confidence,
        salience: _clamp(r.stance.salience * (0.4 + 0.7 * f)),
        pos: r.stance.pos * (0.35 + 0.65 * f),   // ignored drains toward grey
        neg: r.stance.neg * (0.35 + 0.65 * f),
      },
    };
  });
}

function interpNum(keys, t, name, fallback) {
  const ks = keys.filter((k) => k[name] !== undefined);
  if (ks.length === 0) return fallback;
  if (t <= ks[0].t) return ks[0][name];
  if (t >= ks[ks.length - 1].t) return ks[ks.length - 1][name];
  for (let i = 0; i < ks.length - 1; i++) {
    if (t >= ks[i].t && t <= ks[i + 1].t) {
      const u = _smooth((t - ks[i].t) / ((ks[i + 1].t - ks[i].t) || 1));
      return _lerp(ks[i][name], ks[i + 1][name], u);
    }
  }
  return fallback;
}

function interpAt(keys, t, fallback) {
  const ks = keys.filter((k) => k.at !== undefined);
  if (ks.length === 0) return fallback;
  if (t <= ks[0].t) return ks[0].at;
  if (t >= ks[ks.length - 1].t) return ks[ks.length - 1].at;
  for (let i = 0; i < ks.length - 1; i++) {
    if (t >= ks[i].t && t <= ks[i + 1].t) {
      const u = _smooth((t - ks[i].t) / ((ks[i + 1].t - ks[i].t) || 1));
      return [_lerp(ks[i].at[0], ks[i + 1].at[0], u), _lerp(ks[i].at[1], ks[i + 1].at[1], u)];
    }
  }
  return fallback;
}

// Resolve every region's stance/geometry at time t (0..1). Static regions pass through.
export function sampleRegions(field, t) {
  return field.regions.map((r) => {
    if (!r.keys) return r;
    return {
      id: r.id,
      label: r.label,
      at: interpAt(r.keys, t, r.at),
      radius: interpNum(r.keys, t, "radius", r.radius),
      intensity: interpNum(r.keys, t, "intensity", r.intensity),
      stance: {
        confidence: interpNum(r.keys, t, "confidence", r.stance.confidence),
        salience: interpNum(r.keys, t, "salience", r.stance.salience),
        pos: interpNum(r.keys, t, "pos", r.stance.pos),
        neg: interpNum(r.keys, t, "neg", r.stance.neg),
      },
    };
  });
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
