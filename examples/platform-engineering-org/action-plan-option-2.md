# HIO Transformation Action Plan — Option 2
## 30-Person Platform Engineering Organization — 6-Month Accelerated Transition

**Context**: A platform engineering org of ~30 people within a large enterprise. The team builds a modern, highly scalable platform that enables other teams to experiment with new user experiences and get to market fast. Today they operate as traditional scrum/agile teams — human-first, AI-assisted. This plan transitions them to a Harmonized Intelligence Orchestration model over 6 months, starting with a pioneer group.

**How this differs from Option 1**: Option 1 is a 52-week gradual transformation. This plan compresses to 26 weeks with more aggressive phase overlaps, earlier measurement infrastructure, and a richer outcome metrics model informed by practices at Google, Meta, Netflix, Spotify, Stripe, Amazon, Shopify, and Microsoft.

**Prepared using**: The [HIO Framework](../../framework.md)

---

## Table of Contents

1. [Current State Assessment](#1-current-state-assessment)
2. [The Transformation Purpose](#2-the-transformation-purpose)
3. [Baseline Metrics — Current + Outcome + HIO](#3-baseline-metrics--current--outcome--hio)
4. [Phase 0: Seed (Weeks 1–3)](#4-phase-0-seed-weeks-1-3)
5. [Phase 1: First Cognitive Unit (Weeks 4–10)](#5-phase-1-first-cognitive-unit-weeks-4-10)
6. [Phase 2: Prove & Expand (Weeks 11–18)](#6-phase-2-prove--expand-weeks-11-18)
7. [Phase 3: Full Orchestration (Weeks 19–26)](#7-phase-3-full-orchestration-weeks-19-26)
8. [Continuous Evaluation Framework](#8-continuous-evaluation-framework)
9. [Risk Management](#9-risk-management)
10. [Appendix: Templates & Tools](#10-appendix-templates--tools)

---

## 1. Current State Assessment

### How the team works today

| Dimension | Current State |
|---|---|
| **Structure** | Traditional scrum teams with defined roles (engineers, QA, PMs, scrum masters) |
| **Planning** | Sprint planning → sprint execution → review → retro. Quarterly OKRs |
| **Work intake** | Backlog grooming, priority-ranked epics and stories, teams pick from prioritized queue |
| **AI usage** | GitHub Copilot for code suggestions, some vibe coding, exploring spec-driven development |
| **Collaboration model** | Human-first, AI-assisted — humans do the thinking, AI accelerates specific tasks |
| **Identity** | People identify as their role: "I'm a backend engineer," "I'm a QA lead" |
| **Success metrics** | Story completion, velocity, backlog readiness, priority alignment, merge/release rate |
| **Culture** | Execution-oriented, sprint-cadence driven, individual contribution valued |

### What's working (preserve these)

- Cadence and discipline of sprint-based delivery
- Team accountability through sprint commitments
- Alignment to company priorities
- Willingness to experiment (spec-driven dev exploration shows openness)
- GitHub Copilot adoption indicates comfort with AI-assisted work

### What's limiting the team

- **Metrics measure output, not outcomes** — stories completed says nothing about customer impact or innovation quality
- **AI is a productivity booster, not a thinking partner** — Copilot autocompletes; it doesn't co-architect
- **Role identity creates silos** — "that's a frontend problem" fragments ownership
- **Velocity as a target creates perverse incentives** — smaller stories inflate velocity without increasing value
- **Sprint boundaries constrain flow** — some problems need 3 hours, others need 3 weeks; forcing everything into 2-week boxes distorts both
- **No measurement of fulfillment** — the team could be burning out and metrics would look green until people leave
- **No emergence zone** — no structured space where human creativity and AI capability combine to produce something neither could alone
- **No DORA metrics** — deployment health, change failure rate, and recovery time are not systematically tracked
- **No developer experience measurement** — focus time, friction events, and tool satisfaction are invisible
- **No platform-specific outcome tracking** — self-service rate, time-to-first-deploy, and developer adoption are unmeasured

---

## 2. The Transformation Purpose

> **"Build the platform that makes impossible customer experiences possible — reinventing how humans and AI build software together along the way."**

| Test | Pass? | Why |
|---|---|---|
| **Curiosity** | Yes | "Impossible experiences" and "reinventing how we build" both invite exploration |
| **Translation** | Yes | AI optimizes: scalability, deployment speed, experiment success rate. Humans hold: what "impossible" means, what's worth building |
| **Win-Win** | Yes | Customers get faster experimentation. Team gets growth. Company gets speed-to-market. AI gets worthy problems |
| **Horizon** | Yes | "Impossible experiences" recedes — each breakthrough reveals the next. "Reinventing how we build" never finishes |

*This purpose should be workshopped with the team, not handed down.*

---

## 3. Baseline Metrics — Current + Outcome + HIO

### Measurement Philosophy

The baseline must capture THREE layers simultaneously:

1. **Current metrics** — what the team already tracks (preserve for continuity and trust)
2. **Outcome metrics** — what actually matters for customers, platform health, and engineering excellence (informed by DORA, SPACE, and practices at top tech companies)
3. **HIO metrics** — fulfillment, AI utilization, harmonization (the new dimensions)

All three layers are tracked FROM DAY ONE. The baseline report includes all of them so that every future comparison shows the full picture.

---

### 3A. Current Metrics — Preserve and Continue Tracking

These are the team's existing measures. Continue tracking them through the transformation to maintain leadership trust and demonstrate that HIO doesn't sacrifice delivery.

| Current Metric | What It Measures | Baseline Action |
|---|---|---|
| **Stories completed per sprint** | Output volume | Record last 6 sprints average per team |
| **Sprint velocity** | Capacity utilization | Record trend (6 sprints), direction |
| **Backlog readiness** | Planning discipline — ready epics/stories for team to pick up | Count at sprint start, last 6 sprints |
| **Priority alignment** | Strategic coherence — work aligns to company priorities | % of sprint work tied to top-3 priorities |
| **Merge/release rate** | Productivity throughput — changes released | PRs merged/week, releases/sprint, lead time commit→prod |
| **Positive trend** | All above trending positively | Capture 6-sprint trend lines |

---

### 3B. Outcome Metrics — The Missing Layer (Capture at Baseline)

These are outcome metrics that top engineering organizations track. They answer: **"Are we actually producing results that matter, or just staying busy?"**

#### DORA Metrics (Software Delivery Performance)

*Used by: Google, Microsoft, Amazon, Netflix, Spotify — the industry standard for engineering team health.*

| Metric | What It Measures | How to Capture Baseline | Target Direction | Why It Matters |
|---|---|---|---|---|
| **Deployment Frequency** | How often code reaches production | Count deployments over last 30 days (per team and aggregate) | ↑ (daily or more = elite) | High frequency = small batches = lower risk. Elite teams deploy multiple times per day |
| **Lead Time for Changes** | Time from code commit to production | Sample 20-30 recent changes, measure commit→deploy time | ↓ (< 1 day = elite) | Speed of the feedback loop. Long lead times mean slow learning |
| **Change Failure Rate** | % of deployments causing incidents, rollbacks, or hotfixes | Count failed deploys / total deploys, last 90 days | ↓ (< 5% = elite) | Quality of the delivery pipeline. High CFR = releasing too fast or too carelessly |
| **Mean Time to Recovery (MTTR)** | Time from incident detection to full recovery | Average recovery time for last 10 production incidents | ↓ (< 1 hour = elite) | Resilience. Fast recovery > preventing all failures |

#### Developer Experience Metrics (SPACE Framework)

*Developed by Microsoft Research (Nicole Forsgren). Used across Microsoft, adapted at Stripe, Shopify, Google.*

| Metric | What It Measures | How to Capture Baseline | Target Direction |
|---|---|---|---|
| **Days with Sufficient Focus Time** | Days/week with 2+ hours uninterrupted deep work | Developer survey + calendar analysis | ↑ (target: 3+ days/week) |
| **Context Switching Frequency** | How often engineers switch between unrelated tasks per day | Developer survey (self-report) | ↓ |
| **Friction Events** | Blockers, tool failures, process impediments per week | Track for 2 weeks: count times someone is blocked by tooling, process, or waiting | ↓ |
| **Developer Satisfaction (DX Score)** | Overall satisfaction with tools, processes, and work environment | Survey: "How satisfied are you with your development experience?" (1-10) | ↑ |
| **Code Review Turnaround** | Time from PR opened to first meaningful review | Sample last 50 PRs across teams | ↓ (target: < 4 hours for 80%+) |

#### Platform-Specific Outcome Metrics

*Informed by practices at Spotify (internal platform), Stripe (developer tools), Netflix (platform reliability), Amazon (self-service infrastructure).*

| Metric | What It Measures | How to Capture Baseline | Target Direction | Why It Matters |
|---|---|---|---|---|
| **Time from Ask to Experiment** | End-to-end: downstream team requests capability → they can run an experiment | Map 5-10 recent requests end-to-end | ↓ | The real speed-to-market measure. This is what the platform exists for |
| **Platform Self-Service Rate** | % of infrastructure/capability requests fulfilled without platform team intervention | Count self-service vs. ticket-based requests, last 30 days | ↑ (target: > 80%) | A platform that requires tickets for everything is a bottleneck, not an accelerator |
| **Time to First Deploy** | Hours/days from a new team getting access → their first production deploy on the platform | Track last 5 team onboardings | ↓ (target: < 1 day) | Platform usability signal. If onboarding takes weeks, the platform isn't serving its purpose |
| **Platform Adoption Rate** | % of eligible teams actively building on the platform vs. building their own | Survey/audit: who uses it, who doesn't, why not | ↑ | An unused platform isn't scalable — it's irrelevant |
| **Customer Experiment Success Rate** | % of platform-enabled experiments that ship to real users | Track last quarter's experiments: initiated → completed → shipped | ↑ | Connects platform work to actual customer value |
| **Downstream Team Satisfaction (NPS)** | How downstream teams rate working with the platform | Survey downstream teams: "How likely to recommend this platform?" (0-10) | ↑ (target: > 30 NPS) | The platform's real customers are other engineering teams |

#### Code Health & Quality Metrics

*Informed by Google (code health), Meta (diff authoring time), Amazon (cost to serve).*

| Metric | What It Measures | How to Capture Baseline | Target Direction |
|---|---|---|---|
| **Rework Rate** | % of stories returning as bugs, follow-ups, or rethinks within 30 days | Track last 3 sprints: count rework items / total items | ↓ |
| **Defect Escape Rate** | Bugs reaching production vs. caught in review/test | Count production bugs / total defects found, last 90 days | ↓ |
| **Technical Debt Ratio** | Cost to fix known debt / total development cost | Estimate: what % of sprint capacity goes to known tech debt? | ↓ (target: < 10%) |
| **Test Coverage Trend** | Direction of automated test coverage | Current coverage % and 6-month trend | ↑ |
| **Build/Pipeline Duration** | Time for CI/CD pipeline to run (build + test + deploy) | Measure last 30 pipeline runs | ↓ |
| **Dependency Health** | Age and security status of key dependencies | Audit: critical dependencies with known vulnerabilities or >2 major versions behind | ↓ stale deps |

#### Innovation Metrics

*Informed by Google (20% time), Spotify (hack weeks), Shopify (shipped demos), Amazon (working backwards).*

| Metric | What It Measures | How to Capture Baseline | Target Direction |
|---|---|---|---|
| **Innovation Rate** | Genuinely new capabilities (not incremental) shipped in last 6 months | Count: features that didn't exist before vs. improvements to existing | ↑ |
| **New vs. Maintenance Ratio** | % of engineering effort on new capabilities vs. keeping lights on | Estimate from sprint data: new feature work / total work | ↑ new (target: 70%+ new) |
| **Exploration-to-Production Rate** | % of experimental/hackathon work that reaches production | Track if the team has any — may be 0 at baseline | ↑ |
| **Ideas Generated** | Number of new technical or product ideas proposed per quarter (by anyone) | Count from brainstorms, retros, Slack, proposals | ↑ |

---

### 3C. HIO Metrics — Fulfillment, AI Utilization, Harmonization

#### Human Fulfillment

| Metric | Question | Scale |
|---|---|---|
| **Intellectual Challenge** | "My work challenges me in ways I find meaningful" | 1-10 |
| **Purpose Alignment** | "I see how my work connects to what we're trying to achieve" | 1-10 |
| **Growth Trajectory** | "I'm learning and growing in ways that excite me" | 1-10 |
| **Anticipation Index** | "I'm genuinely excited about what we might build" | 1-10 |
| **Autonomy Score** | "I have meaningful control over how I approach my work" | 1-10 |
| **AI Collaboration Readiness** | "I'm excited (not anxious) about working closely with AI" | 1-10 |
| **Identity Flexibility** | "I define myself by capabilities and curiosity, not job title" | 1-10 |
| **Psychological Safety** | "I feel safe saying 'I don't know' or being outperformed by AI" | 1-10 |
| **eNPS** | "How likely are you to recommend this team as a place to work?" (0-10) | NPS score |
| **Burnout Risk** | Composite: overtime, weekend work, PTO usage, self-reported energy | R/Y/G |

#### AI Utilization

| Metric | How to Capture Baseline |
|---|---|
| **AI Usage Depth** | Survey: what do people use AI for? (autocomplete? architecture? problem framing?) |
| **AI Task Sophistication** | Rate: Level 1 (autocomplete) → Level 5 (co-architecture). Average? |
| **AI Time Savings** | Estimated hours/week saved per person |
| **AI Suggestion Acceptance Rate** | Copilot metrics: accept vs. reject rate |
| **AI Novel Applications** | Count of use cases beyond code generation |

#### Harmonization (will be near zero at baseline)

| Metric | Baseline Value |
|---|---|
| **Emergence Rate** | 0 (outcomes exceeding what either human or AI alone could produce) |
| **Cross-Role Contribution** | How often do people work outside their titled role? |
| **Workflow Experimentation** | Teams that tried a genuinely different way of working last quarter |
| **Bandwidth Expansion** | Number of people engaging with new cognitive frequencies |

---

### 3D. How to Capture the Complete Baseline (Week 1-2)

**Automated Pulls (Day 1-3):**
1. Sprint metrics from Jira/Linear — last 6 sprints, all teams
2. DORA metrics from CI/CD pipeline — deployment frequency, lead time, CFR, MTTR over 90 days
3. Code health from GitHub/tooling — PR turnaround, test coverage, build times, dependency audit
4. Platform metrics — self-service vs. ticket requests, adoption count, onboarding times

**Surveys (Day 3-7):**
5. HIO Baseline Survey — anonymous, 20 minutes — covers fulfillment, AI readiness, identity, developer experience, friction
6. Downstream Team Survey — 5 minutes — platform satisfaction, NPS, pain points

**Qualitative (Day 5-10):**
7. Interview 5-8 team members — 30 min each — fulfillment, frustrations, AI comfort, growth desires
8. Map 5 recent platform requests end-to-end (ask → capability → experiment → result)
9. Innovation audit — count genuinely new capabilities shipped in last 6 months

**Output (Day 10-14):**
10. **Unified Baseline Report** — single document with all three layers, published to the team

---

## 4. Phase 0: Seed (Weeks 1-3)

### Goal
Capture the full baseline, align leadership, introduce HIO thinking, select pioneers. Compressed: 3 weeks instead of 4.

### Week 1: Baseline + Leadership Alignment

#### Baseline Capture (parallel with everything else)
- Execute all actions from Section 3D
- Assign one person to own the baseline report — this is their sprint deliverable

#### Leadership Alignment Session (Day 2-3)
- **Who**: Engineering leads, PMs, skip-level manager
- **Duration**: 2 hours
- **Content**:
  - HIO framework as an experiment — not a mandate
  - Show the three-layer measurement model: "We're adding outcomes and fulfillment, not replacing what we track"
  - Why DORA metrics and developer experience matter (cite Google, Microsoft, Spotify research)
  - The 6-month timeline and phase gates
  - What "success" and "stop" look like at each phase
- **Output**: Leadership alignment with defined guardrails and permission to proceed

### Week 2: All-Hands + Pioneer Selection

#### All-Hands (Day 8-9)
- **Who**: Entire 30-person org
- **Duration**: 1 hour
- Share the purpose. Be transparent about the experiment. Show the baseline data (it belongs to everyone).
- Frame: "We're adding outcome metrics and developer experience measurement for the whole org — and running a small-group experiment with a different way of working."
- Key: even teams NOT in the pioneer group benefit from better metrics

#### Pioneer Selection (Day 9-14)
Select 6-8 people for the first cognitive unit:

| Criterion | Why |
|---|---|
| Curious about AI collaboration (7+ on readiness) | Lean in, not just comply |
| Low identity grip | Already work beyond their title |
| Mix of experience and roles | Senior + mid + junior, engineering + product + quality |
| Volunteer basis | Forced participation poisons the experiment |
| One constructive skeptic | Stress-tests the approach |

### Week 3: Pioneer Kickoff + Measurement Infrastructure

#### Pioneer Purpose Workshop (Half-day)
- Refine org purpose into team mission
- Each person maps their fulfillment: what excites them, what drains them
- Define bandwidth expansion goals

#### Begin Measurement Infrastructure (parallel)
- Set up automated DORA metrics dashboards (deploy frequency, lead time, CFR, MTTR)
- Set up platform metrics tracking (self-service rate, adoption, time-to-first-deploy)
- Configure fulfillment pulse survey (bi-weekly, automated)
- Build the Comparison Board template (baseline → current, across all three layers)

*Note: In the 6-month plan, measurement infrastructure starts Week 3, not Week 21. You can't prove anything you can't measure.*

### Phase 0 Exit Criteria

- [ ] Complete baseline report with all three metric layers (current + outcome + HIO)
- [ ] DORA dashboard operational
- [ ] Leadership aligned with experiment scope and phase gates
- [ ] All-hands completed
- [ ] 6-8 volunteers selected
- [ ] Specific platform challenge identified for the pioneer group
- [ ] Measurement infrastructure started (complete by Week 6)
- [ ] Pioneer kickoff completed

---

## 5. Phase 1: First Cognitive Unit (Weeks 4-10)

### Goal
Stand up the first cognitive unit. Run it on a real platform challenge for 3 harmonized sprints. Prove the model produces better outcomes.

### Weeks 4-5: Formation

#### Role Redefinition: From Titles to Cognitive Functions

| Old Role | New Cognitive Functions |
|---|---|
| Senior Backend Engineer | Solution Architect + Builder + Pattern Integrator |
| Frontend Engineer | Builder + Resonance Sensor (UX intuition) |
| QA Engineer | Quality Guardian + Problem Framer (systemic insights) |
| Product Manager | Problem Framer + Growth Catalyst + Stakeholder Harmonizer |
| Junior Engineer | Builder + Learner + Fresh-Eyes Observer |

Each person has:
- 2-3 cognitive functions (not one title)
- Permission to contribute beyond primary frequency
- A **bandwidth expansion goal** for this phase
- A **fulfillment target**: work that feeds their appetite, not just fills their time

#### AI Agent Setup

Move from Copilot-in-the-editor to full cognitive partnership:

| AI Agent Role | What It Does | Priority |
|---|---|---|
| **Analysis Partner** | Pre-analyzes problems: data, patterns, prior art, risk | Week 4 |
| **Code Co-Creator** | Full implementations from specs, comprehensive tests, refactoring at scale | Week 4 |
| **Architecture Explorer** | Generates and evaluates multiple options with tradeoffs | Week 5 |
| **Quality Analyst** | Continuous monitoring: quality, coverage, performance, security — proactive | Week 5 |
| **Metrics Monitor** | Tracks all metrics, surfaces trends, flags anomalies | Week 6 |
| **Documentation & Knowledge** | Living docs, decision capture, searchable institutional knowledge | Week 6 |

*Roll in 2 agents per week. Don't overwhelm with all 6 on day one.*

#### Working Agreements

1. **No fixed roles for tasks** — for each piece of work, decide who (human or AI) takes which function
2. **Daily harmony check** (15 min) — where is energy flowing? stuck? what should shift?
3. **Deep work is sacred** — 4 hours/day protected from meetings and Slack
4. **Measure outcomes, not hours or stories** — accountable for results, not activity
5. **AI outputs are starting points** — human role is judgment, context, ethics, creativity
6. **Weekly retro focused on harmonization and metrics**

### Weeks 5-10: Harmonized Sprints (3 sprints)

#### Sprint Model

**Sprint Kickoff (replaces Sprint Planning)**

| Step | Who | Duration |
|---|---|---|
| AI Pre-Analysis | AI agents (async, before meeting) | — |
| Problem Framing | Full unit | 1 hour |
| Outcome Definition | Full unit | 30 min |
| Workflow Design | Full unit | 30 min |
| Fulfillment Check | Each person | 10 min |

**During Sprint**

| Practice | Cadence |
|---|---|
| Daily Harmony Check | Daily, 15 min |
| AI Continuous Work | Continuous (async) |
| Deep Work Blocks | 4 hrs/day protected |
| Collaboration Windows | 2 hrs/day |
| Exploration Time | 3-4 hrs/week |

**Sprint Outcome Review**
- Outcome Demo (not story points)
- Emergence Showcase
- Downstream team/customer feedback
- Full metrics review (all three layers)

**Harmonization Retrospective**
- Emergence events? Old-pattern defaults? Identity grip? Growth? Fulfillment? AI utilization?
- One experiment for next sprint

### Phase 1 Metrics: What to Track

**All three layers, every sprint:**

| Layer | Metrics | What You're Looking For |
|---|---|---|
| **Current** | Stories completed, velocity, merge rate | Should not collapse. Temporary dip (≤15%) acceptable |
| **DORA** | Deploy frequency, lead time, CFR, MTTR | Should improve or hold — these are about engineering practice quality |
| **Platform Outcomes** | Time ask→experiment, self-service rate, downstream NPS | Should improve — this is why the platform exists |
| **Code Health** | Rework rate, defect escape rate, test coverage, build time | Should improve (AI quality + better framing) |
| **Developer Experience** | Focus time, friction events, DX score, code review turnaround | Should improve — HIO removes friction |
| **Fulfillment** | Challenge, growth, purpose, anticipation, eNPS | Should improve from baseline |
| **AI** | Task sophistication, time savings, novel applications | Should climb |
| **Harmonization** | Emergence count, collaboration score, bandwidth expansion | Should appear and grow |
| **Innovation** | Ideas generated, new capabilities, exploration-to-production | Track from sprint 1 |

### Phase 1 Exit Criteria

- [ ] 3 full harmonized sprints completed
- [ ] At least 3 documented emergence events
- [ ] Current delivery metrics not degraded by more than 15%
- [ ] DORA metrics stable or improved (especially lead time and deploy frequency)
- [ ] At least 2 platform outcome metrics measurably improved
- [ ] Developer experience (focus time, friction) improved
- [ ] Fulfillment average 7+
- [ ] AI task sophistication up at least one level
- [ ] Each member engaged with at least one new cognitive frequency
- [ ] Pioneer group wants to continue
- [ ] Measurement infrastructure fully operational

---

## 6. Phase 2: Prove & Expand (Weeks 11-18)

### Goal
Prove the model with data. Form 2 more cognitive units. Train coaches. In the 6-month plan, proving and expanding happen simultaneously.

### Week 11: Phase 1 Deep Retrospective

Full-day session:
- Review ALL metrics across all three layers
- Identify what worked → codify in Playbook v1
- Identify what didn't → redesign
- Capture personal growth stories
- Create the Comparison Board for leadership

### Weeks 11-14: Refine + 2 New Cognitive Units

#### Playbook v1
Document specific practices that work. Not theory — what to do Monday morning.

#### Unit 2: Volunteers + 2 embedded pioneer coaches
- Pioneer members rotate in for 3 weeks, then back
- Prevents secret sauce locked in one team

#### Unit 3: Include constructive skeptics
- Tests robustness of the model
- If it only works with enthusiasts, it's not ready for the org

#### Remaining Teams (~14-16 people)
Gradient adoption (NOT full HIO yet, but immediate benefit):
- Daily harmony check replaces standup
- AI pre-analysis added to sprint planning
- Bi-weekly fulfillment pulse survey
- DORA and platform metrics now tracked for all teams (this is just good engineering practice)

### Weeks 11-14: Coach Development (parallel)

Select 3-4 pioneer members:
- Facilitate purpose workshops
- Recognize and surface identity grip
- Design human-AI workflows
- Run harmonization retrospectives
- Read fulfillment signals early

### Weeks 14-18: Prove It

#### The Comparison Board (visible to entire org)

| Metric | Baseline (Pre-HIO) | Traditional Teams (Current) | Cognitive Units (Current) | Δ from Baseline |
|---|---|---|---|---|
| **Current Layer** | | | | |
| Stories/sprint | | | | |
| Velocity trend | | | | |
| Merge/release rate | | | | |
| **DORA Layer** | | | | |
| Deployment frequency | | | | |
| Lead time for changes | | | | |
| Change failure rate | | | | |
| MTTR | | | | |
| **Platform Outcomes** | | | | |
| Time: ask → experiment | | | | |
| Self-service rate | | | | |
| Downstream NPS | | | | |
| Platform adoption | | | | |
| **Code Health** | | | | |
| Rework rate | | | | |
| Defect escape rate | | | | |
| Test coverage trend | | | | |
| Build/pipeline time | | | | |
| **Developer Experience** | | | | |
| Focus time (days/week) | | | | |
| Code review turnaround | | | | |
| DX satisfaction score | | | | |
| Friction events/week | | | | |
| **Fulfillment** | | | | |
| Intellectual challenge | | | | |
| Purpose alignment | | | | |
| Growth trajectory | | | | |
| eNPS | | | | |
| **Innovation** | | | | |
| New capabilities shipped | | | | |
| New vs. maintenance ratio | | | | |
| Ideas generated | | | | |
| **Harmonization** | | | | |
| Emergence events | | | | |
| AI task sophistication | | | | |
| Bandwidth expansion | | | | |

**Show everything. Don't cherry-pick. Credibility comes from honesty.**

#### Share Learnings (Weeks 16-18)
- Brown bag session for full org — struggles included
- Written playbook available
- Open observation: anyone can sit with a cognitive unit for a sprint
- Leadership briefing: full comparison board + narrative + Phase 3 recommendation

### Phase 2 Exit Criteria

- [ ] 3 cognitive units operating
- [ ] Comparison board shows improvement in 5+ outcome metrics without current metric degradation
- [ ] DORA metrics improved across the board (especially lead time and deploy frequency)
- [ ] At least 3 downstream teams report better experience
- [ ] Fulfillment sustained at 7+ across all units
- [ ] 3-4 trained HIO coaches
- [ ] Playbook v1 documented and shared
- [ ] Traditional teams voluntarily adopting 2+ gradient practices
- [ ] Leadership approves full org transformation

---

## 7. Phase 3: Full Orchestration (Weeks 19-26)

### Goal
Transform the entire 30-person org. Full ecosystem measurement. Begin enterprise influence.

### Weeks 19-22: Full Restructure

#### Dissolve remaining scrum teams → 4-5 cognitive units

| Unit | Outcome Focus | Why |
|---|---|---|
| **Experiment Velocity** | Making experiments faster to launch | The platform's core value prop |
| **Scale & Reliability** | Platform handles anything thrown at it | Non-negotiable for enterprise |
| **Developer Experience** | Making the platform a joy to build on | Adoption driver |
| **Intelligence Layer** | AI-native platform capabilities | Future differentiation |
| **Frontier** | Exploration of next-generation possibilities | The horizon |

- People choose units based on interest and growth goals
- Quarterly rotation opt-in encouraged
- Each unit has 6-8 people including AI agents

### Weeks 19-22: Full Ecosystem Measurement

#### The HIO Dashboard — Three Views

**View 1: Harmony Overview (Weekly)**

Single screen showing:
- Stakeholder Health Radar (customers, team, leadership, AI utilization — all expanding together?)
- Top Harmonization Score (composite)
- Alert Panel (zero-sum alerts, burnout signals, AI underutilization)
- DORA traffic light (are we elite/high/medium/low?)

**View 2: Deep Dive (Monthly)**

Full breakdown by cognitive unit across all metric categories:

| Category | Key Metrics |
|---|---|
| **Business Performance** | Revenue impact of platform experiments, time-to-market, operational efficiency |
| **DORA** | Deploy frequency, lead time, CFR, MTTR — with elite/high/medium/low classification |
| **Platform Outcomes** | Self-service rate, time-to-first-deploy, downstream NPS, experiment success rate |
| **Code Health** | Rework rate, defect escape rate, tech debt ratio, test coverage, build time, dependency health |
| **Developer Experience** | Focus time, friction events, DX score, code review turnaround, context switch frequency |
| **Customer Harmony** | Platform adoption, downstream satisfaction, experiment success rate |
| **Human Fulfillment** | Full dashboard: challenge, growth, purpose, anticipation, autonomy, eNPS, burnout |
| **AI Potential** | Utilization depth, task sophistication, novel applications, feedback loop health |
| **Harmonization** | Emergence rate, collaboration effectiveness, task-fulfillment alignment, zero-sum alerts |
| **Innovation** | New vs. maintenance ratio, ideas generated, exploration-to-production rate, cross-pollination |
| **Behavioral Evolution** | Mindset shift index, risk-taking frequency, learning velocity, bandwidth expansion |

**View 3: Evolution (Quarterly)**
- Trajectory over the full 6 months
- How mindsets shifted
- How human-AI collaboration matured
- Where to invest next
- Comparison to original baseline

### Weeks 22-26: Mature & Influence

- Monthly Harmony Reviews (all unit leads + leadership)
- Quarterly Evolution Session (full org)
- Package learnings for other orgs in the company
- Present at company-wide forums
- Offer to mentor other teams through Phase 0

### Phase 3 Exit Criteria (End of Month 6)

- [ ] All 30 people operating in cognitive units
- [ ] Full HIO dashboard operational with all metric layers
- [ ] Fulfillment scores at 7+ average, no unit below 6
- [ ] DORA metrics at "High" or "Elite" tier (from wherever baseline was)
- [ ] Time from ask to experiment reduced 40%+ from baseline
- [ ] Self-service rate > 70% (from baseline)
- [ ] Downstream team NPS improved 15+ points from baseline
- [ ] Rework rate reduced 25%+ from baseline
- [ ] Defect escape rate reduced 20%+ from baseline
- [ ] Developer focus time at 3+ days/week
- [ ] AI task sophistication at Level 3+ average (from Level 1-2 baseline)
- [ ] At least 8 documented emergence events per quarter
- [ ] Current delivery metrics stable or improved
- [ ] Innovation: new vs. maintenance ratio improved toward 70/30+
- [ ] At least one other org in the company exploring HIO
- [ ] Team members report meaningful identity expansion

---

## 8. Continuous Evaluation Framework

### Weekly: The Harmony Pulse

| Question | Action if Red |
|---|---|
| Delivering outcomes (not just output)? | Reframe work around outcomes |
| Human-AI collaboration flowing? | Identify friction, redesign workflow |
| Anyone's fulfillment below 6/10? | Immediate 1:1, task rebalancing |
| AI agents underutilized? | Identify higher-value tasks |
| DORA metrics holding? | Investigate what's slowing down delivery |
| Emergence this week? | If 3+ weeks without: work may be too routine |

### Monthly: The Deep Dive

- Full metric review across ALL layers
- Trend analysis: improving, plateauing, regressing?
- Comparison to baseline: how far have we come?
- Playbook update: what to adopt, what to stop
- Cross-unit learning exchange
- DORA classification check: are we moving toward Elite?

### Quarterly: The Evolution Review (Week 13 and Week 26)

- Is the purpose still passing the four tests?
- Are cognitive units the right size/composition/focus?
- Who's growing? Plateauing? Needs new challenge?
- What new AI capabilities should shift the balance?
- Full comparison board review
- **Revise the action plan itself** based on everything learned

### The Learning Loop

```
Observe → What's actually happening? (all three metric layers + felt experience)
    ↓
Orient → What does it mean? (pattern recognition + judgment)
    ↓
Decide → What should change? (small bet, not big reorg)
    ↓
Act → Try it for one sprint
    ↓
Observe → Did it work? (back to top)
```

---

## 9. Risk Management

### Leadership Loses Patience

| Trigger | Mitigation |
|---|---|
| Metrics dip in early sprints | Set expectations: 15% temporary dip acceptable. Show alongside improving outcome metrics and DORA improvements |
| "When will this show ROI?" | Monthly briefings with full comparison board. DORA improvements often show within 4-6 weeks. Lead with those |
| Priority shifts | HIO is a way of working, not a project. It survives priority changes |

### Pioneer Group Burns Out

| Trigger | Mitigation |
|---|---|
| Too much change at once | Phase in AI agents 2/week, not all 6 on day one. Introduce practices incrementally |
| Pressure to prove | Frame as learning, not performing. Experimental freedom |
| Double burden | Reduce sprint scope in first 2 sprints while building new muscles |

### AI Tools Aren't Ready

| Trigger | Mitigation |
|---|---|
| AI agents can't do what's needed | Start with what's available (Claude, Copilot). Build up. Don't wait for perfect tooling |
| Enterprise security blocks AI | Engage IT/security in Week 1. Propose sandboxed environment |
| Low-quality AI outputs for your domain | Budget time for AI onboarding: codebase context, domain knowledge, patterns |

### Identity Grip Stronger Than Expected

| Trigger | Mitigation |
|---|---|
| Role resistance | Don't force. Start with small expansions. Make it invitational |
| AI threat perception | Have the identity conversation using HIO Part II. Let people process |
| Senior expertise devalued | "Your depth is MORE valuable now — you judge whether AI's suggestion is good" |

### 6-Month Timeline Too Aggressive

| Trigger | Mitigation |
|---|---|
| Phase 1 needs more time | Each phase has exit criteria, not just dates. If criteria aren't met, extend that phase. Better to delay Phase 2 by 2 weeks than to force it |
| Too many units ramping at once in Phase 2 | Start Unit 2 in Week 11, Unit 3 in Week 13 (stagger by 2 weeks instead of simultaneous) |
| Full restructure in Phase 3 feels rushed | Phase 3 can extend beyond Week 26 — the 6-month target is aspirational, exit criteria are mandatory |

### Rest of Org Becomes Resentful

| Trigger | Mitigation |
|---|---|
| "Pioneer gets all the fun" | Share everything openly. Gradient adoption means ALL teams get better metrics and some HIO practices |
| Unfavorable comparison | Never team-vs-team. Always baseline-to-current. DORA and platform metrics apply to everyone |

---

## 10. Appendix: Templates & Tools

### Template A: HIO Baseline Survey (Enhanced)

```
PLATFORM ENGINEERING ORG — HIO BASELINE SURVEY
(Anonymous, ~20 minutes)

SECTION 1: CURRENT WORK EXPERIENCE
1. My work challenges me in ways I find meaningful (1-10): ___
2. I see how my daily work connects to our team's larger purpose (1-10): ___
3. I'm learning and growing in ways that excite me (1-10): ___
4. I'm genuinely excited about what we might build or discover (1-10): ___
5. I have meaningful control over how I approach my work (1-10): ___
6. How often do you feel a sense of accomplishment?
   [ ] Daily  [ ] Weekly  [ ] Monthly  [ ] Rarely  [ ] Never
7. How likely are you to recommend this team as a place to work? (0-10): ___
   (eNPS)

SECTION 2: DEVELOPER EXPERIENCE
8. How many days/week do you get 2+ hours of uninterrupted deep work?
   [ ] 0  [ ] 1  [ ] 2  [ ] 3  [ ] 4  [ ] 5
9. How often are you blocked by tooling, process, or waiting? (per week)
   [ ] Rarely  [ ] 1-2 times  [ ] 3-5 times  [ ] Daily  [ ] Multiple times/day
10. How satisfied are you with your development tools & processes? (1-10): ___
11. How long does a typical code review take from PR opened to first review?
    [ ] < 1 hour  [ ] 1-4 hours  [ ] 4-24 hours  [ ] 1-2 days  [ ] 2+ days
12. How often do you context-switch between unrelated tasks per day?
    [ ] Rarely  [ ] 2-3 times  [ ] 4-6 times  [ ] 7-10 times  [ ] Constantly

SECTION 3: AI COLLABORATION
13. I'm excited (not anxious) about working more closely with AI (1-10): ___
14. How do you currently use AI in your work? (check all that apply)
    [ ] Code autocomplete (Copilot)
    [ ] Generating code from descriptions
    [ ] Debugging assistance
    [ ] Architecture/design discussions
    [ ] Documentation
    [ ] Problem analysis / research
    [ ] Testing
    [ ] I don't regularly use AI
15. AI usage sophistication:
    [ ] Level 1: Basic autocomplete
    [ ] Level 2: Generate code snippets from prompts
    [ ] Level 3: Use AI for design decisions and problem-solving
    [ ] Level 4: AI is a thinking partner for complex work
    [ ] Level 5: AI co-architects solutions; I focus on judgment and creativity
16. Estimated hours per week saved through AI assistance: ___

SECTION 4: IDENTITY & GROWTH
17. I define myself by my capabilities and curiosity, not just my job title (1-10): ___
18. How would you describe your role in one sentence? ___________________
19. In the last 6 months, have you worked on something significantly
    outside your job description? [ ] Yes  [ ] No
    If yes, what? ___________________
20. What would you most want to learn or try if your role were more flexible?
    ___________________

SECTION 5: TEAM & COLLABORATION
21. I feel safe saying "I don't know" or "I was wrong" on this team (1-10): ___
22. I feel comfortable when AI does something faster or better than I can (1-10): ___
23. Our team regularly tries new ways of working (1-10): ___
24. How effectively does our team share knowledge? (1-10): ___

SECTION 6: ENERGY & SUSTAINABILITY
25. My current energy level at work:
    [ ] High — engaged and energized
    [ ] Medium — fine but not excited
    [ ] Low — going through the motions
    [ ] Depleted — burning out
26. Average overtime hours per week in the last month: ___
27. PTO days taken in last quarter: ___

SECTION 7: PLATFORM EFFECTIVENESS (all roles)
28. How well does our platform enable other teams to move fast? (1-10): ___
29. What's the biggest bottleneck in how we serve downstream teams?
    ___________________
30. If you could change one thing about how this team works, what would it be?
    ___________________
```

### Template B: DORA Metrics Tracking

```
DORA METRICS — [Team/Unit] — [Period]

DEPLOYMENT FREQUENCY
  Total deploys this period: ___
  Deploys per day (avg): ___
  Classification: [ ] Elite (multiple/day) [ ] High (daily-weekly) 
                  [ ] Medium (weekly-monthly) [ ] Low (monthly+)

LEAD TIME FOR CHANGES
  Median commit-to-deploy time: ___
  P90 commit-to-deploy time: ___
  Classification: [ ] Elite (<1 day) [ ] High (1 day-1 week) 
                  [ ] Medium (1 week-1 month) [ ] Low (1-6 months)

CHANGE FAILURE RATE
  Failed deploys / Total deploys: ____%
  Classification: [ ] Elite (<5%) [ ] High (5-10%) 
                  [ ] Medium (10-15%) [ ] Low (>15%)

MEAN TIME TO RECOVERY
  Average recovery time: ___
  Classification: [ ] Elite (<1 hr) [ ] High (1-24 hrs) 
                  [ ] Medium (1 day-1 week) [ ] Low (1 week+)

OVERALL DORA CLASSIFICATION: ___
TREND FROM LAST PERIOD: [ ] Improving  [ ] Stable  [ ] Declining

ACTIONS:
What should we change to improve DORA metrics?
________________________________________
```

### Template C: Full Comparison Board

```
COMPARISON BOARD — [Month] — [Period: Week X to Week Y]

                          | Baseline | Trad Teams | Cog Units | Δ Baseline
                          | (Pre-HIO)| (Current)  | (Current) |
CURRENT LAYER             |          |            |           |
  Stories/sprint          |          |            |           |
  Velocity trend          |          |            |           |
  Merge/release rate      |          |            |           |
                          |          |            |           |
DORA LAYER                |          |            |           |
  Deploy frequency        |          |            |           |
  Lead time              |          |            |           |
  Change failure rate    |          |            |           |
  MTTR                    |          |            |           |
  DORA classification    |          |            |           |
                          |          |            |           |
PLATFORM OUTCOMES         |          |            |           |
  Time: ask→experiment   |          |            |           |
  Self-service rate      |          |            |           |
  Downstream NPS          |          |            |           |
  Platform adoption      |          |            |           |
  Experiment success rate |          |            |           |
                          |          |            |           |
CODE HEALTH               |          |            |           |
  Rework rate            |          |            |           |
  Defect escape rate     |          |            |           |
  Test coverage trend    |          |            |           |
  Build/pipeline time    |          |            |           |
  Tech debt ratio        |          |            |           |
                          |          |            |           |
DEVELOPER EXPERIENCE      |          |            |           |
  Focus time (days/week) |          |            |           |
  Friction events/week   |          |            |           |
  DX satisfaction score  |          |            |           |
  Code review turnaround |          |            |           |
                          |          |            |           |
FULFILLMENT               |          |            |           |
  Intellectual challenge  |          |            |           |
  Purpose alignment      |          |            |           |
  Growth trajectory      |          |            |           |
  Anticipation index     |          |            |           |
  eNPS                    |          |            |           |
  Burnout risk            |          |            |           |
                          |          |            |           |
INNOVATION                |          |            |           |
  New capabilities       |          |            |           |
  New vs maintenance %   |          |            |           |
  Ideas generated        |          |            |           |
                          |          |            |           |
HARMONIZATION             |          |            |           |
  Emergence events       |          |            |           |
  AI sophistication level |          |            |           |
  Bandwidth expansion    |          |            |           |
  Collaboration score    |          |            |           |

NARRATIVE: What story do these numbers tell? ___
REINFORCING LOOPS: Which improvements are feeding each other? ___
WARNINGS: Any metric rising while another falls? ___
ACTIONS: What should we change? ___
```

### Template D: Sprint Kickoff — Outcome Definition

```
HARMONIZED SPRINT KICKOFF — OUTCOME DEFINITION

Sprint dates: _____ to _____

PURPOSE CONNECTION
How does this sprint advance our purpose? ___

OUTCOMES (not outputs)
What will be true at the end that isn't true now?
1. ___
2. ___
3. ___

AI PRE-ANALYSIS SUMMARY
Key findings: ___

DORA IMPACT
How will this work affect our deployment frequency, lead time, CFR, MTTR? ___

WORKFLOW DESIGN (per outcome)
  Human leads: ___
  AI leads: ___
  Hybrid: ___

FULFILLMENT CHECK
Each member: "What excites me? What stretches me?"

RISKS & UNKNOWNS: ___
```

### Template E: Weekly Harmony Pulse

```
WEEKLY HARMONY PULSE — [Unit Name] — Week of ____

DELIVERY (1-5)
  Outcome progress: ___
  DORA metrics holding: ___
  Current metrics healthy: ___

HARMONIZATION (1-5)
  Human-AI flowing: ___
  Emergence this week: ___  Describe: ___

FULFILLMENT (1-5)
  Average energy: ___
  Anyone below 3: ___

AI HEALTH (1-5)
  Full potential: ___
  New use cases: ___

DEVELOPER EXPERIENCE
  Focus time this week: ___
  Major friction events: ___

ONE CHANGE NEXT WEEK: ___
```

### Template F: Harmonization Retrospective

```
HARMONIZATION RETROSPECTIVE — [Unit] — Sprint ____

EMERGENCE
What exceeded what either alone could produce? ___

OLD PATTERNS
Where did we default to old ways? ___

IDENTITY CHECK
Did identity grip show up? How handled? ___

METRICS REVIEW
  DORA: deploy freq ___ lead time ___ CFR ___ MTTR ___
  Platform: ask→experiment ___ self-service ___ downstream NPS ___
  Fulfillment avg: ___ Anyone below 7: ___
  AI sophistication level: ___
  Emergence count this sprint: ___

GROWTH (per person)
New frequency engaged: ___

EXPERIMENT FOR NEXT SPRINT: ___
```

---

## Summary: The 6-Month Journey

```
WEEK  1 ── 3 ── 5 ── 7 ── 10 ── 13 ── 15 ── 18 ── 22 ── 26
      │       │              │         │              │      │
      ▼       ▼              ▼         ▼              ▼      ▼
   PHASE 0  PHASE 1       Sprints    PHASE 2       PHASE 3  FULL
   Baseline Formation     Running    Prove+Expand  Full Org ORCH
   Mindset  + AI Agents   3 sprints  3 units       Transform
   Pioneer  + Roles                  Coaches       Ecosystem
   Metrics                Playbook   Comparison    Metrics
   Infra                  v1         Board         Enterprise
   Started                                         Influence

   6-8 people ─────────────► ~20 people ──────────► 30 people

   Metrics: All 3 layers from Day 1 ──────────► Full HIO Dashboard
   DORA:    Baseline captured ──► Tracked ──────► Elite target
   AI:      Copilot ──► Agent Stack ──► Full Partnership
   Culture: Sprint-driven ──► Outcome-driven ──► Purpose-driven
```

---

## How Option 2 Differs from Option 1

| Dimension | Option 1 (52 weeks) | Option 2 (26 weeks) |
|---|---|---|
| **Timeline** | 4 phases over 12 months | 4 phases over 6 months |
| **Baseline** | Current + some outcomes | Current + DORA + Platform + Code Health + DX + Innovation + Fulfillment + AI + Harmonization |
| **Measurement infra** | Starts Week 21 | Starts Week 3 |
| **DORA metrics** | Not explicitly tracked | Tracked from Day 1 with elite/high/medium/low classification |
| **Platform-specific outcomes** | 5 metrics | 6 metrics including self-service rate, time-to-first-deploy |
| **Developer experience** | Not explicitly tracked | SPACE framework: focus time, friction, DX score, code review turnaround, context switching |
| **Code health** | Rework rate only | Rework + defect escape + tech debt ratio + test coverage + build time + dependency health |
| **Innovation** | Innovation rate only | 4 metrics: new capabilities, new/maintenance ratio, exploration-to-production, ideas generated |
| **Phase overlap** | Sequential | Prove + expand happen simultaneously |
| **Risk: timeline** | Low (generous) | Managed via exit criteria > dates |
| **Evidence quality** | Strong (more data over time) | Strong (richer metrics from start, faster feedback loops) |

---

*This action plan is a living document. Phase gates are defined by exit criteria, not calendar dates. If a phase needs more time, take it. The 6-month target is aspirational — the exit criteria are mandatory.*

*Prepared using the [Harmonized Intelligence Orchestration Framework](../../framework.md)*
