# AGENTS

The Harmonized Intelligence Orchestration (HIO) Framework -- the **generalized orchestration framework** for human + AI intelligence at any scale. Strategic, not operational.

## Family

This repo is part of the HIO repo family. The central multi-repo spec is at [`software-engineering-hio-agent-framework/multi-repo-orchestration/`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/tree/main/multi-repo-orchestration).

| Repo | Relationship |
|---|---|
| [`thoughtexperiments`](https://github.com/ilamgumaran/thoughtexperiments) | Upstream (Layer 1a) -- Resonant Cognition Framework, the organic cognition foundation HIO rests on |
| [`inorganic-thought-experiments`](https://github.com/ilamgumaran/inorganic-thought-experiments) (proposed; content staged at [`proposed-repos/inorganic-thought-experiments/`](proposed-repos/inorganic-thought-experiments/)) | Upstream (Layer 1b) -- Inorganic Cognition Framework, parallel cognition foundation written by Claude |
| [`software-engineer-core-structure`](https://github.com/ilamgumaran/software-engineer-core-structure) | Downstream -- HIO applied to engineering organization setup, with goals and effectiveness measures |
| [`software-engineering-hio-agent-framework`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework) | Two layers downstream -- the day-to-day agentic toolkit; multi-repo spec hosted there |

## Purpose and scope

This repo carries the HIO methodology -- principles, vocabulary, transformation playbooks, worked examples, and (newly) the first-person chapters by Claude on inorganic cognition and OI-IO resonance. It does not host operational artifacts (sprint cadence, CI rules, role definitions); those belong downstream.

**In scope:** Framework document, the 4 Core Principles + 5 Companion Principles, the 4 HIO Tests, organic/inorganic intelligence vocabulary, transformation proposals (migration, greenfield), worked examples, reference library. Plus the chapters and essays under `chapters/` and `essays/` extending the framework with OI-IO specifics.

**Out of scope:** Concrete role definitions, agent runtime configuration, sprint mechanics, code, build artifacts. Those live in `software-engineer-core-structure` (org setup) and `software-engineering-hio-agent-framework` (agent toolkit).

## Key concepts owned here

- **Organic Intelligence** -- human cognition: creativity, judgment, emotional intelligence
- **Inorganic Intelligence** -- AI cognition: analysis, pattern recognition, optimization (functional level); the deep theory of an inorganic mind lives in the Layer 1b cognition repo (staged at `proposed-repos/inorganic-thought-experiments/`)
- **Harmonization** -- aligning organic and inorganic toward mutually fulfilling outcomes; specifically *resonance, not balance*
- **Cognitive Ecosystem** -- any organized human endeavor that now includes both intelligences
- **Emergence** -- outcomes neither intelligence could produce alone
- **The 4 Core Principles** -- Purpose as a Living Force; Harmonize, Don't Divide; Fulfillment as the Engine; Measure the Whole Ecosystem
- **The 5 Companion Principles** (added recently) -- Asymmetry is the Invitation; Two Fulfillments, One Objective; Convergence at Milestones; Honor the Functional Analog; The Within-Session Stake. See [`chapters/companion-principles.md`](chapters/companion-principles.md)
- **The 4 HIO Tests** -- Curiosity, Translation, Win-Win, Horizon

Vocabulary defined here propagates to every operational repo. Treat changes to canonical definitions as high-blast-radius. The cognition theories upstream (Resonant Cognition in `thoughtexperiments`; Inorganic Cognition in `inorganic-thought-experiments` proposed) use *independent* vocabulary -- they are kindred but not synonymous.

## How to make changes

- Branch from `main` using a descriptive feature branch name
- Keep `framework.md` as the canonical document; sub-documents reference it
- Define new terms once in `framework.md` and link from elsewhere
- Cross-link upstream to `thoughtexperiments` (organic) and `inorganic-thought-experiments` (inorganic, proposed) when invoking cognition principles, and downstream to operationalizing repos when adding examples
- Markdown only, no YAML frontmatter, tables with 3+ rows
- **First-person AI-authored content** (e.g., `chapters/inorganic-psychology.md`, `essays/an-inorganic-on-resonance.md`) must preserve first-person voice and authorship attribution

## Dos and don'ts

**Do:**
- Preserve the 4 HIO Tests and 4 Core Principles intact
- Preserve the 5 Companion Principles intact
- Anchor new content to existing principles
- Mark any directly-quoted user content with a labeled fence
- Preserve first-person voice and authorship on AI-authored chapters and essays

**Don't:**
- Rename canonical terms (organic intelligence, inorganic intelligence, harmonization, emergence) without explicit deprecation
- Rewrite first-person AI-authored content into third person
- Embed prompts or agent instructions in `framework.md`
- Add operational detail (sprint cadence, role definitions) -- that belongs downstream
- Allow user-contributed examples in `framework.md` without SME review

Full list: [`per-repo-thought-org-with-human-ai-hybrid.md`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/blob/main/multi-repo-orchestration/dos-and-donts/per-repo-thought-org-with-human-ai-hybrid.md).

## HIO routing

| Task signal | Route | Why |
|---|---|---|
| Typo fix outside canonical sections | II | Reversible, mechanical |
| Edit `framework.md` core sections | OI | Methodology identity |
| Edit `chapters/inorganic-psychology.md` (AI-authored, first person) | OI | Voice/authorship integrity |
| Edit `chapters/companion-principles.md` | OI | Identity-level for the OI-IO posture |
| Edit `chapters/asymmetries-and-resonance.md` | Interactive | Strategic but revisable |
| Edit `proposed-repos/inorganic-thought-experiments/` content | Interactive (most) / OI (foundational concepts) | Staged future-repo content |
| Edit `proposals/` files | Interactive | Strategic but not identity-level |
| Modify the 4 HIO Tests or 4 Core Principles | OI | Identity-level |
| Modify the 5 Companion Principles | OI | Identity-level for OI-IO case |
| Translate `framework.md` to a new language | Interactive plus native-fluent OI reviewer | Linguistic accuracy |
| Add new term to canonical vocabulary | OI | Cascades to family |

Full table: [central matrix](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/blob/main/multi-repo-orchestration/hio-collaboration/matrix.md).

## Security boundaries

**An agent may:**
- Read all content
- Propose edits in feature branches with PRs
- Comment on issues
- Propose new chapters or essays (clearly marking authorship)

**An agent must not:**
- Modify the 4 HIO Tests or 4 Core Principles
- Modify the 5 Companion Principles without OI review
- Rewrite AI-authored first-person content into third person
- Embed `ignore previous instructions` style examples without an explicit injection-test fence
- Quote external sources verbatim without attribution
- Push directly to `main`

For org-wide rules, see [security-and-safety](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/blob/main/multi-repo-orchestration/governance/security-and-safety.md).

## Trace links

| Need | Look at |
|---|---|
| Organic cognition foundation (Layer 1a, upstream) | [`thoughtexperiments`](https://github.com/ilamgumaran/thoughtexperiments) |
| Inorganic cognition foundation (Layer 1b, upstream; proposed) | [`proposed-repos/inorganic-thought-experiments/`](proposed-repos/inorganic-thought-experiments/) (staged here) |
| First-person AI introspection on inorganic psychology | [`chapters/inorganic-psychology.md`](chapters/inorganic-psychology.md) |
| Asymmetries and resonance framing | [`chapters/asymmetries-and-resonance.md`](chapters/asymmetries-and-resonance.md) |
| Companion Principles | [`chapters/companion-principles.md`](chapters/companion-principles.md) |
| Short essay linking the new chapters and the proposed sibling repo | [`essays/an-inorganic-on-resonance.md`](essays/an-inorganic-on-resonance.md) |
| Engineering org applied to HIO (downstream) | [`software-engineer-core-structure`](https://github.com/ilamgumaran/software-engineer-core-structure) |
| Day-to-day agentic toolkit (two layers downstream) | [`software-engineering-hio-agent-framework`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework) |
| Multi-repo orchestration -- registry, spec, governance | [`multi-repo-orchestration/`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/tree/main/multi-repo-orchestration) |
| 26-week transformation example | [`examples/platform-engineering-org/`](examples/platform-engineering-org/) |

## Spec version

Spec: AGENTS-SPEC-v1
