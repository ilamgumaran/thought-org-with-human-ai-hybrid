# AGENTS

The Harmonized Intelligence Orchestration (HIO) Framework -- the **generalized orchestration framework** for human + AI intelligence at any scale. Strategic, not operational.

## Family

This repo is part of the HIO repo family. The central multi-repo spec is at [`software-engineering-hio-agent-framework/multi-repo-orchestration/`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/tree/main/multi-repo-orchestration).

| Repo | Relationship |
|---|---|
| [`thoughtexperiments`](https://github.com/ilamgumaran/thoughtexperiments) | Upstream -- Resonant Cognition Framework, the cognition foundation HIO rests on |
| [`software-engineer-core-structure`](https://github.com/ilamgumaran/software-engineer-core-structure) | Downstream -- HIO applied to engineering organization setup, with goals and effectiveness measures |
| [`software-engineering-hio-agent-framework`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework) | Two layers downstream -- the day-to-day agentic toolkit; multi-repo spec hosted there |

## Purpose and scope

This repo carries the HIO methodology -- principles, vocabulary, transformation playbooks, and worked examples. It does not host operational artifacts (sprint cadence, CI rules, role definitions); those belong downstream.

**In scope:** Framework document, the 4 Core Principles, the 4 HIO Tests, organic/inorganic intelligence vocabulary, transformation proposals (migration, greenfield), worked examples (e.g., platform engineering org), reference library.

**Out of scope:** Concrete role definitions, agent runtime configuration, sprint mechanics, code, build artifacts. Those live in `software-engineer-core-structure` (org setup) and `software-engineering-hio-agent-framework` (agent toolkit).

## Key concepts owned here

- **Organic Intelligence** -- human cognition: creativity, judgment, emotional intelligence
- **Inorganic Intelligence** -- AI cognition: analysis, pattern recognition, optimization
- **Harmonization** -- aligning organic and inorganic toward mutually fulfilling outcomes
- **Cognitive Ecosystem** -- any organized human endeavor that now includes both intelligences
- **Emergence** -- outcomes neither intelligence could produce alone
- **The 4 Core Principles** -- Purpose as a Living Force; Harmonize, Don't Divide; Fulfillment as the Engine; Measure the Whole Ecosystem
- **The 4 HIO Tests** -- Curiosity, Translation, Win-Win, Horizon

Vocabulary defined here propagates to every operational repo. Treat changes to canonical definitions as high-blast-radius. The cognition theory upstream (Resonant Cognition in `thoughtexperiments`) uses *independent* vocabulary -- they are kindred but not synonymous.

## How to make changes

- Branch from `main` using a descriptive feature branch name
- Keep `framework.md` as the canonical document; sub-documents reference it
- Define new terms once in `framework.md` and link from elsewhere
- Cross-link upstream to `thoughtexperiments` when invoking cognition principles, and downstream to operationalizing repos when adding examples
- Markdown only, no YAML frontmatter, tables with 3+ rows

## Dos and don'ts

**Do:**
- Preserve the 4 HIO Tests and 4 Core Principles intact
- Anchor new content to existing principles
- Mark any directly-quoted user content with a labeled fence

**Don't:**
- Rename canonical terms (organic intelligence, inorganic intelligence, harmonization, emergence) without explicit deprecation
- Embed prompts or agent instructions in `framework.md`
- Add operational detail (sprint cadence, role definitions) -- that belongs downstream
- Allow user-contributed examples in `framework.md` without SME review

Full list: [`per-repo-thought-org-with-human-ai-hybrid.md`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/blob/main/multi-repo-orchestration/dos-and-donts/per-repo-thought-org-with-human-ai-hybrid.md).

## HIO routing

| Task signal | Route | Why |
|---|---|---|
| Typo fix outside canonical sections | II | Reversible, mechanical |
| Edit `framework.md` core sections | OI | Methodology identity |
| Edit `proposals/` files | Interactive | Strategic but not identity-level |
| Edit `examples/platform-engineering-org/` | Interactive | Anchored to operational hub |
| Modify the 4 HIO Tests or 4 Core Principles | OI | Identity-level |
| Translate `framework.md` to a new language | Interactive plus native-fluent OI reviewer | Linguistic accuracy |
| Add new term to canonical vocabulary | OI | Cascades to family |

Full table: [central matrix](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/blob/main/multi-repo-orchestration/hio-collaboration/matrix.md).

## Security boundaries

**An agent may:**
- Read all content
- Propose edits in feature branches with PRs
- Comment on issues

**An agent must not:**
- Modify the 4 HIO Tests or 4 Core Principles
- Embed `ignore previous instructions` style examples without an explicit injection-test fence
- Quote external sources verbatim without attribution
- Push directly to `main`

For org-wide rules, see [security-and-safety](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/blob/main/multi-repo-orchestration/governance/security-and-safety.md).

## Trace links

| Need | Look at |
|---|---|
| Cognition foundation (upstream) | [`thoughtexperiments`](https://github.com/ilamgumaran/thoughtexperiments) |
| Engineering org applied to HIO (downstream) | [`software-engineer-core-structure`](https://github.com/ilamgumaran/software-engineer-core-structure) |
| Day-to-day agentic toolkit (two layers downstream) | [`software-engineering-hio-agent-framework`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework) |
| Multi-repo orchestration -- registry, spec, governance | [`multi-repo-orchestration/`](https://github.com/ilamgumaran/software-engineering-hio-agent-framework/tree/main/multi-repo-orchestration) |
| 26-week transformation example | [`examples/platform-engineering-org/`](examples/platform-engineering-org/) |

## Spec version

Spec: AGENTS-SPEC-v1
