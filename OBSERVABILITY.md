# System Design Assistant — OBSERVABILITY

Baseline: contextos/OBSERVABILITY.md.

- **Metrics:** designs created, messages/design, diagrams generated (+ validity rate), ADRs drafted, grounding calls to #2, prep sessions + completion; cost per design/session; signups, free→paid, MRR (designers + preppers).
- **AI metrics:** design-rubric quality (sampled), diagram parse-success rate, interview-rubric calibration, model mix, cost.
- **Logs:** structured (org/design/session id); LLM call logs (redacted); no secrets.
- **Traces:** OTel across design conversation + grounding + diagram/ADR gen.
- **Dashboards:** usage, AI cost, quality (rubric/diagram validity), prep funnel, business.
- **Alerts:** diagram-invalid spike, cost anomaly, quality regression, grounding/#2 errors.
- **Quality:** design rubric + diagram validity tracked (CI evals + sampling).
- **SLO:** first-token < 2s; Mermaid always parses; cost-per-session tracked; margin healthy (Opus-heavy → watch cost).
