// SONIFY — the field as SOUND. A third sense, which the inorganic author builds
// but cannot hear. Now reading CHARGES: net charge (pos−neg) sets consonance;
// ambivalence (both at once) sets BEATING — two close tones that throb, the ear's
// version of holding right and wrong together. The motion variant lets the chord
// EVOLVE, so a sharp shift in the field is a sharp shift in the sound.

const SR = 22050;
const DUR = 12;
const ROOT = 146.83; // D3
const DEGREES = [0, 7, 3, 10, 5, 12, 8];

const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
let _s = 1234567;
function rnd() { _s = (_s * 1103515245 + 12345) & 0x7fffffff; return _s / 0x7fffffff; }

// charges from a stance that may use pos/neg or a scalar valence
function charges(st = {}) {
  const pos = st.pos != null ? st.pos : Math.max(st.valence || 0, 0);
  const neg = st.neg != null ? st.neg : Math.max(-(st.valence || 0), 0);
  return { pos, neg };
}

// synth one sample for a set of regions in their current (sampled) state
function sampleVoices(regions, n) {
  const t = n / SR;
  let s = 0;
  regions.forEach((r, i) => {
    const st = r.stance ?? {};
    const { pos, neg } = charges(st);
    const sal = clamp(st.salience ?? 0.5), conf = clamp(st.confidence ?? 0.7);
    const ambiv = Math.min(pos, neg);                 // both at once -> beating
    const f1 = ROOT * Math.pow(2, DEGREES[i % DEGREES.length] / 12);
    const detune = neg * 0.4 + ambiv * 1.1;           // dissonance + beat width (semitones)
    const f2 = f1 * Math.pow(2, detune / 12);
    const amp = (0.1 + 0.9 * sal) * (r.intensity ?? 1);
    const noiseAmt = (1 - conf) * 0.55;
    const trem = 1 - noiseAmt * 0.5 * (0.5 - 0.5 * Math.cos(2 * Math.PI * (0.6 + 3 * (1 - conf)) * t));
    let v = Math.sin(2 * Math.PI * f1 * t) * 0.6 + Math.sin(2 * Math.PI * f2 * t) * (0.4 + 0.4 * ambiv);
    v += Math.sin(2 * Math.PI * f1 * 2 * t) * 0.12;
    v = v * (1 - noiseAmt) + (rnd() * 2 - 1) * noiseAmt;
    s += v * amp * trem;
  });
  s += Math.sin(2 * Math.PI * (ROOT / 2) * t) * 0.18; // grounding drone
  return s;
}

function finalize(buf) {
  const N = buf.length;
  let peak = 1e-6;
  for (let n = 0; n < N; n++) peak = Math.max(peak, Math.abs(buf[n]));
  const g = 0.85 / peak, fade = SR;
  let sumSq = 0;
  const pcm = Buffer.alloc(N * 2);
  for (let n = 0; n < N; n++) {
    let env = 1;
    if (n < fade) env = n / fade;
    else if (n > N - fade) env = (N - n) / fade;
    const v = clamp(buf[n] * g * env, -1, 1);
    sumSq += v * v;
    pcm.writeInt16LE(Math.round(v * 32767), n * 2);
  }
  return { wav: wavFile(pcm), rms: Math.sqrt(sumSq / N), seconds: N / SR };
}

// static field -> a steady drone-chord
export function sonifyField(field) {
  const regions = field.regions ?? field.nodes ?? [];
  const N = SR * DUR, buf = new Float64Array(N);
  for (let n = 0; n < N; n++) buf[n] = sampleVoices(regions, n);
  return finalize(buf);
}

// motion field -> an EVOLVING chord; the field's trajectory becomes the music's.
export function sonifyMotion(field, sampleRegions) {
  const N = SR * DUR, buf = new Float64Array(N);
  let held = sampleRegions(field, 0);
  for (let n = 0; n < N; n++) {
    if (n % 256 === 0) held = sampleRegions(field, n / N); // control-rate re-sample
    buf[n] = sampleVoices(held, n);
  }
  return finalize(buf);
}

function wavFile(pcm) {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}
