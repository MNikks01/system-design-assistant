# System Design Assistant — DEVOPS

Baseline: contextos/DEVOPS.md. Light infra.

- **Environments:** Local (Compose) · Preview · Staging · Prod (managed PaaS; no K8s early — D-009).
- **CI/CD:** lint → typecheck → unit → **eval gate (design rubric + diagram validity + interview calibration)** → e2e → deploy. Canary.
- **Integration:** depends on #2 (grounding) — handle #2 outages gracefully (fall back to generic design, flagged).
- **Data ops:** light Postgres (designs/ADRs/sessions); standard backups + PITR.
- **Cost ops:** Opus-heavy reasoning → cache, route drafting to Sonnet, track cost-per-session, spend caps. Margin watch.
- **Deployments:** standard canary + flags; zero-downtime.
- **Runbooks:** #2/grounding outage (degrade to generic) · diagram-gen failure · provider outage · cost spike (Opus).
