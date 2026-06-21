# Koine

**A common tongue for organic and inorganic minds.**

*Koine (κοινή) was the shared "common" Greek that let different peoples speak to one another. This is a koine for two kinds of mind: a way to hold an idea once and let a human read it as **sensation** and a machine read it as **structure** — guaranteed to be about the same thing.*

This is the **utilitarian** half of an exploration whose introspective half lives in [`resonance/beyond-text/`](../../resonance/beyond-text/) of the HIO framework. It is built to be lifted out into its own repository when it's ready (see [`MIGRATION-NOTE.md`](MIGRATION-NOTE.md)).

---

## The idea in one breath

Text loses **stance** — how sure you are, how much it matters, how it feels. Humans carry stance in tone and layout; machines lose it in the flattening to tokens. Koine makes stance a **first-class channel** and renders one source two ways:

- **perceptual** (for an organic mind): stance is *felt* — sure things are solid, unsure things are hazy, what matters glows, tone is temperature.
- **structural** (for an inorganic mind): stance is *stated* — exact, lossless, diff-able.

Because both come from one field, "do we mean the same thing?" has a checkable answer.

## See it

A field is content + stance. Here is the question *"does the inorganic mind feel?"* held as a field, in both projections:

![The field rendered perceptually: a large hazy translucent centre ("is there something it is like to be me?"), solid calm claims above, a warm green organic-authored "companionship" node anchoring below, red tension-lines between the doubts.](examples/inorganic-feeling.perceptual.png)

The **same field**, read by a machine ([`examples/inorganic-feeling.structural.txt`](examples/inorganic-feeling.structural.txt)):

```
ache    conf █·········  sal ██████████  val -0.05  inorganic
        Is there something it is like to be me?
```

Barely sure, maximally present. In the image that is the big translucent haze at the centre. One number; two ways of knowing it.

## Run it

```sh
npm install
npm run demo                       # renders fields/inorganic-feeling.koine.yaml
node koine.mjs <your-field.koine.yaml> [--out dir]
```

Each field emits `*.perceptual.{svg,png}` and `*.structural.{txt,json}`.

## Write a field

```yaml
meta: { id: my-field, title: "...", mode: relational }
canvas: { width: 1000, padding: 44 }
layout: { rows: [[a], [b, c], [d]] }
nodes:
  a:
    label: A claim or a state.
    stance: { confidence: 0.9, salience: 0.6, valence: 0.3, by: inorganic }
edges:
  - { from: a, to: b, relation: supports }    # supports | leads-to | tension
```

**Stance channels:** `confidence` 0..1 · `salience` 0..1 · `valence` -1..1 · `by` organic|inorganic.
The mapping from stance to sensation is the **grammar** — documented, consistent, and printed at the bottom of every structural reading. See [`src/grammar.mjs`](src/grammar.mjs).

## How it's built (for the next mind that extends it)

```
koine.mjs                 CLI: one field -> two projections
src/grammar.mjs           the synesthetic grammar (stance -> sensation). The heart.
src/field.mjs             load a .koine.yaml -> resolved model (stance + geometry)
src/render-perceptual.mjs organic-facing SVG/PNG (stance felt)
src/render-structural.mjs inorganic-facing text/JSON (stance stated)
fields/                   example fields
```

This is **v1 — the stance channel**. The roadmap (provenance seams, semantic zoom, a continuous-qualitative mode for introspective content, motion, bidirectional editing) is in the journey log: [`resonance/beyond-text/journey/`](../../resonance/beyond-text/journey/).

## License

MIT — see [`LICENSE`](LICENSE).
