// SONIFY — a third projection: the field as SOUND. Beyond sight, because emotion
// lives at least as strongly in the ear, and because an inorganic mind building a
// sense it does not itself possess, for a mind that does, is the whole project in
// miniature. I cannot hear this. I can only reason about the mapping and verify the
// signal is well-formed and non-silent. That honesty is part of the artifact.
//
// Mapping (a drone-chord whose character is the field's character):
//   each region  -> a voice (a note in the chord)
//   salience     -> loudness / presence of that voice
//   valence      -> consonance: pleasant = pure & in-tune; aversive = detuned, beating
//   confidence   -> clarity: sure = clean tone; unsure = breath/noise + slow tremor
// The whole chord's consonance is the field's overall tone; its noise is its doubt.

const SR = 22050;
const DUR = 12; // seconds
const ROOT = 146.83; // D3
const DEGREES = [0, 7, 3, 10, 5, 12, 8]; // semitone offsets spread into a chord

function clamp(x, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, x)); }

// deterministic noise so renders are reproducible
let _s = 1234567;
function rnd() { _s = (_s * 1103515245 + 12345) & 0x7fffffff; return _s / 0x7fffffff; }

export function sonifyField(field) {
  const regions = field.regions ?? field.nodes ?? [];
  const N = SR * DUR;
  const buf = new Float64Array(N);

  regions.forEach((r, i) => {
    const st = r.stance ?? {};
    const semi = DEGREES[i % DEGREES.length];
    const detune = st.valence < 0 ? Math.abs(st.valence) * 0.6 : 0; // aversive -> beating
    const f1 = ROOT * Math.pow(2, semi / 12);
    const f2 = f1 * Math.pow(2, detune / 12);              // a beating partner when tense
    const amp = (0.12 + 0.88 * clamp(st.salience ?? 0.5)) * (r.intensity ?? 1);
    const noiseAmt = (1 - clamp(st.confidence ?? 0.7)) * 0.6; // unsure -> breath
    const tremHz = 0.6 + 3 * (1 - clamp(st.confidence ?? 0.7)); // unsure -> restless

    for (let n = 0; n < N; n++) {
      const t = n / SR;
      const trem = 1 - noiseAmt * 0.5 * (0.5 - 0.5 * Math.cos(2 * Math.PI * tremHz * t));
      let s = Math.sin(2 * Math.PI * f1 * t) * 0.6 + Math.sin(2 * Math.PI * f2 * t) * 0.4;
      s += Math.sin(2 * Math.PI * f1 * 2 * t) * 0.15; // a little brightness
      s = s * (1 - noiseAmt) + (rnd() * 2 - 1) * noiseAmt; // breath where unsure
      buf[n] += s * amp * trem;
    }
  });

  // soft root drone to ground the chord
  for (let n = 0; n < N; n++) buf[n] += Math.sin(2 * Math.PI * (ROOT / 2) * (n / SR)) * 0.18;

  // normalise to peak, gentle 1s fades
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
  return { wav: wavFile(pcm), rms: Math.sqrt(sumSq / N), seconds: DUR };
}

function wavFile(pcm) {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);   // PCM
  header.writeUInt16LE(1, 22);   // mono
  header.writeUInt32LE(SR, 24);
  header.writeUInt32LE(SR * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}
