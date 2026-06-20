# AGENTS.md — System Design Assistant

Standard agent-instructions file. Claude-specific: [CLAUDE.md](./CLAUDE.md). Architecture: [AGENT_DESIGN.md](./AGENT_DESIGN.md).

## Project
AI co-architect (grounded design + diagrams + ADRs + tradeoffs) + interview-prep. Spec-first (D-011). Reuses #2/#1.

## Setup
```bash
pnpm install
docker compose up -d   # Postgres+pgvector, otel
pnpm db:migrate
pnpm dev
```

## Conventions
- TS everywhere; Turborepo+pnpm. Reuse `packages/{llm,rag,evals}`; #2 client for grounding; #1 store for design memory.
- Claude Opus default (reasoning) via `packages/llm` (D-003). Mermaid generated + parse-validated. ADRs structured (Zod).
- `org_id`+RLS; problem+json errors.

## Build & test
`pnpm test` · `pnpm test:eval` (design rubric + diagram validity + interview calibration) · `pnpm lint && pnpm typecheck`.

## Rules of engagement
1. Ground in real code (#2) where possible; label grounded vs. generic; never hallucinate architecture.
2. Validate Mermaid + ADRs.
3. Reuse #2/#1/evals — don't rebuild.
4. Tenant isolation; trace + cost (watch Opus cost).
5. Update specs on change.

## Where things live
Arch: [ARCHITECTURE.md](./ARCHITECTURE.md) · AI/RAG: [AI_ARCHITECTURE.md](./AI_ARCHITECTURE.md), [RAG.md](./RAG.md) · Data: [DATABASE.md](./DATABASE.md) · API: [API_DESIGN.md](./API_DESIGN.md) · Work: [TASKS.md](./TASKS.md)/[SPRINTS.md](./SPRINTS.md) · Safety: [SECURITY.md](./SECURITY.md)/[GUARDRAILS.md](./GUARDRAILS.md).

## MCP
Consumes #2's MCP for grounding; optionally exposes `propose_design`/`draft_adr`/`generate_diagram` via MCP. See [mcp.json](./mcp.json), [MCP.md](./MCP.md).
