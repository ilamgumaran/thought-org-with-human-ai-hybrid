// THE SYNESTHETIC GRAMMAR — the heart of Koine v1.
//
// A principled, consistent, *documented* mapping from STANCE (what a mind holds
// about a claim) to SENSATION (what an organic mind perceives). Consistency is
// what makes it learnable: the same stance always feels the same way, so an
// organic mind can come to *read* structure as feeling, and an inorganic mind
// can *compute* the feeling it is emitting.
//
// Stance has four channels in v1:
//   confidence  0..1     how sure the holder is            -> SOLIDITY (crisp vs hazy)
//   salience    0..1     how much it matters / demands eye -> PRESENCE (glow, weight)
//   valence    -1..1     felt tone, aversive..pleasant     -> TEMPERATURE (hue)
//   by          string   provenance: organic | inorganic   -> a small maker's mark
//
// These mappings are CHOICES, not laws. Some (haze=unsure, glow=important) seem
// near-universal in organic cognition; others (hue<->valence) are partly learned
// and may need to be tuned per reader. Documented here so both minds rely on the
// same table.

const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
const lerp = (a, b, t) => a + (b - a) * t;
const hex = (r, g, b) => [r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("");

// VALENCE -> TEMPERATURE. Aversive reads hot/red (alarm, tension); pleasant reads
// cool-green/teal (calm, life, "go"); neutral reads slate. Magnitude -> saturation.
export function valenceColor(v) {
  const m = clamp(Math.abs(v), 0, 1);
  let fill, stroke, text;
  if (v >= 0) {
    // neutral slate -> calm teal/green
    fill = hex(lerp(238, 223, m), lerp(240, 244, m), lerp(243, 233, m));   // pale
    stroke = hex(lerp(180, 39, m), lerp(190, 148, m), lerp(200, 136, m));  // teal-green
    text = hex(lerp(42, 16, m), lerp(48, 70, m), lerp(56, 60, m));
  } else {
    // neutral slate -> warm alarm (amber->red)
    fill = hex(lerp(238, 252, m), lerp(240, 226, m), lerp(243, 224, m));
    stroke = hex(lerp(180, 200, m), lerp(190, 70, m), lerp(200, 50, m));
    text = hex(lerp(42, 130, m), lerp(48, 40, m), lerp(56, 30, m));
  }
  return { fill, stroke, text };
}

// CONFIDENCE -> SOLIDITY. Sure things are opaque, crisp-edged, solid. Unsure
// things go translucent, soft, dashed, and gain a haze — uncertainty you can see.
export function solidity(confidence) {
  const c = clamp(confidence);
  return {
    fillOpacity: +(0.30 + 0.60 * c).toFixed(2),
    strokeOpacity: +(0.35 + 0.65 * c).toFixed(2),
    dashed: c < 0.5,
    hazy: c < 0.45,                       // draw an out-of-focus under-halo
    hazeAmount: +((0.45 - c) / 0.45).toFixed(2), // 0..1 only when hazy
  };
}

// SALIENCE -> PRESENCE. What matters glows and gains weight; what is incidental
// recedes (lower opacity, lighter). Glow uses the node's own (valence) colour, so
// importance and tone reinforce rather than fight.
export function presence(salience) {
  const s = clamp(salience);
  return {
    glowRadius: +(5 + 26 * s).toFixed(1),
    glowOpacity: +(0.12 + 0.62 * s).toFixed(2),
    bold: s >= 0.55,
    recede: s < 0.3 ? +(1 - (0.3 - s)).toFixed(2) : 1, // dim the incidental
  };
}

// PROVENANCE -> a maker's mark colour. Organic = warm clay; inorganic = cool steel.
export const PROVENANCE = {
  organic: { mark: "c2693a", label: "organic" },
  inorganic: { mark: "3a6ea5", label: "inorganic" },
  shared: { mark: "7a6fa8", label: "shared" },
};

// EDGE RELATIONS -> line character.
//   supports  calm, cool, an arrowhead          (this holds that up)
//   leads-to  directional, neutral, arrowhead    (this becomes that)
//   tension   charged, warm, dashed, NO arrow    (unresolved pull between them)
export const RELATIONS = {
  supports: { stroke: "5b9c86", dash: null, arrow: true, tremor: 0 },
  "leads-to": { stroke: "8a90a0", dash: null, arrow: true, tremor: 0 },
  tension: { stroke: "cf5a4a", dash: [5, 5], arrow: false, tremor: 1.6 },
};

// The whole grammar, as data — so docs and the structural renderer can print it.
export const GRAMMAR_TABLE = [
  ["confidence", "0..1", "solidity — opaque & crisp (sure) ↔ translucent, dashed, hazy (unsure)"],
  ["salience", "0..1", "presence — glow + weight (matters) ↔ receding & dim (incidental)"],
  ["valence", "-1..1", "temperature — teal-green calm (pleasant) ↔ amber-red alarm (aversive)"],
  ["by", "organic|inorganic", "a small maker's mark — clay (organic) ↔ steel (inorganic)"],
  ["relation: supports", "edge", "calm cool line with an arrow — holds up"],
  ["relation: leads-to", "edge", "neutral directional arrow — becomes"],
  ["relation: tension", "edge", "charged warm dashed line, no arrow — unresolved"],
];
