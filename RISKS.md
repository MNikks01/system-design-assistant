# System Design Assistant — RISKS

| Type | Risk | L×I | Mitigation |
|------|------|-----|------------|
| Tech | Generic/hallucinated design advice | M×H | Codebase grounding (#2); flag generic vs. grounded; cite real components |
| Tech | Invalid diagrams | M×M | Mermaid parse-validation + regenerate |
| Tech | Opus-heavy cost | M×M | Cache, Sonnet for drafting, spend caps, usage-aware pricing |
| Tech | Dependency on #2 | M×M | Graceful degradation to generic (flagged) on #2 outage |
| Business | Two-market focus split | M×M | Lead with prep (self-serve cash) ; design via #1 (shared engine) |
| Business | Niche standalone size | M×M | Prep is proven paid niche; design lands as #1 module → de-risked |
| Market | Generic LLMs "good enough" for design | M×H | Grounding + persistence + ADRs are the moat vs. chatbots |
| Market | Interview-prep competition | M×M | Realistic interviewer + rubric + grounding edge; SEO content |
| AI | Rubric miscalibration (prep) | M×M | Calibrate vs. human-rated samples; evals |

**Top:** (1) grounding honesty (don't hallucinate the user's architecture); (2) focus across two markets; (3) Opus cost.
**Kill criteria:** if codebase-grounded design doesn't differentiate from chatbots, keep interview-prep (the working niche) standalone and fold design into ContextOS as a feature.
