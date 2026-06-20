# System Design Assistant — TECH STACK

Portfolio stack (D-003–D-009); emphases:

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Next.js + TS + Tailwind + shadcn + **Mermaid render** | Chat + interactive diagram canvas + ADR editor |
| Backend | NestJS (TS) | Orchestration + ADR + memory services |
| AI | Claude default (reasoning-heavy: tradeoffs, design) + abstraction (D-003) | Opus for design reasoning + interview coaching |
| Diagrams | Mermaid (gen + parse-validate) | Diagram-as-code, GitHub-native, diffable |
| Grounding | Codebase Intelligence (#2) via MCP/API | Real-code-grounded design (the differentiator) |
| DB | PostgreSQL (+ pgvector for design memory search) | Designs/ADRs/sessions (D-004) |
| Memory | Reuse ContextOS (#1) context store patterns | Persistent design memory |
| Evals | `packages/evals` | Interview rubric scoring + design-quality evals |
| Payments | Stripe (Pro for designers + preppers; Team) | D-008 |
| Cloud/CI | Managed PaaS; Docker; GitHub Actions | D-009 |
| Monorepo | Turborepo + pnpm; reuse `packages/{llm,rag,evals}` | D-006 |

## Notable
- **Mermaid generation + validation** (output must parse/render).
- **Reuses #2** for codebase grounding and **#1** for design memory — minimal new infra.
- Reasoning-heavy → Opus is the default model here.

## Why
It's an LLM-reasoning + diagram + persistence product on the shared stack; the hard parts (retrieval, memory) are reused from #2/#1. Fast to build.
