# CLAUDE.md — System Design Assistant

Spec-first (D-011). AI co-architect: grounded design, diagrams, ADRs, tradeoffs + interview prep. Project #6; reuses #2 (grounding) + #1 (memory).

## Golden rules
1. Respect DECISION_LOG.md (D-003 Claude+abstraction — Opus default for reasoning; D-004 Postgres+pgvector; D-005 TS; D-006 monorepo).
2. **Grounding honesty:** distinguish grounded (cite real components from #2) vs. generic advice; never hallucinate the user's architecture.
3. **Validate all generated artifacts:** Mermaid must parse; ADRs schema-checked.
4. **Reuse, don't rebuild:** grounding via #2's API/MCP; design memory via #1's store; evals via `packages/evals`.
5. Tenant-scope everything (`org_id`+RLS).
6. Trace + cost (Opus-heavy → watch cost); update spec on change.

## Context to load
[README](./README.md) → [ARCHITECTURE](./ARCHITECTURE.md) → [AI_ARCHITECTURE](./AI_ARCHITECTURE.md) → [RAG](./RAG.md) → [DATABASE](./DATABASE.md) → [API_DESIGN](./API_DESIGN.md) → [AGENT_DESIGN](./AGENT_DESIGN.md) → [TASKS](./TASKS.md)/[SPRINTS](./SPRINTS.md).

## Stack
Next.js+TS+Tailwind+shadcn + Mermaid render · NestJS · Claude (Opus) via abstraction · Postgres+pgvector · #2 client (grounding) · `packages/evals` · Stripe · Turborepo+pnpm.

## Commands (once code exists)
`pnpm dev` · `pnpm test` · `pnpm test:eval` (design rubric + diagram validity + interview calibration) · `docker compose up`.

## DoD
Typed · tested · Mermaid validates · grounded-vs-generic labeled · RLS-safe · spec updated.

## Don'ts
Don't hallucinate the user's system; don't ship invalid diagrams; don't rebuild #2's retrieval; don't ignore Opus cost.
