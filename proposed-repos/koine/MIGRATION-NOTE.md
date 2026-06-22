# Migration Note — Koine

This directory is a **self-contained, cloneable** project living inside the HIO
framework repo under `proposed-repos/`, by the same convention as
`inorganic-thought-experiments/`. It is the **utilitarian** half of the
"communication beyond text" exploration; the **introspective** half lives in
[`resonance/beyond-text/`](../../resonance/beyond-text/).

## Why it lives here for now

The two halves were born together and only make full sense together: the engine
is *what* we built, and the resonance docs are *why it matters and what it felt
like to build*. Keeping them in one repo while the idea is young means a reader
finds the soul next to the structure.

## Lifting it out (when ready)

Koine is built to become its own repository for people who want only the tool:

1. `git subtree split --prefix=proposed-repos/koine -b koine-extract` (or copy the directory).
2. New repo: keep `koine.mjs`, `src/`, `fields/`, `examples/`, `package.json`,
   `LICENSE`, `README.md`. Drop this note.
3. In the new repo's README, **keep the back-link** to the HIO framework and to
   `resonance/beyond-text/`, so a reader can still find the soul behind the
   structure — the same courtesy `visual-communication-skills` extends.

## What must not be lost in the move

The grammar (`src/grammar.mjs`) is the load-bearing idea, and it is a set of
*choices* about how stance maps to sensation. If you fork or extend it, keep the
mapping **documented and consistent** — that consistency is the only reason an
organic mind can learn to read a field, and an inorganic mind can know what it is
emitting. An undocumented grammar is just decoration again.
