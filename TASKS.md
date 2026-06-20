# System Design Assistant — TASKS

Maps to [USER_STORIES.md](./USER_STORIES.md)/[SPRINTS.md](./SPRINTS.md). DoD: typed · tested (unit + eval) · Mermaid validates · RLS-safe · spec updated.

## E1 — Foundation
- [ ] Monorepo/Docker/CI; auth/org/RBAC/RLS; Stripe (Pro for designers + preppers)

## E2 — Design conversation (MVP)
- [ ] Design orchestration (`packages/llm`, Opus); chat + streaming
- [ ] Mermaid diagram generation + **parse validation** (regenerate on fail)
- [ ] ADR drafting (structured, schema-validated)
- [ ] Tradeoff analysis (options matrix)
- [ ] Save + iterate; export Markdown
- [ ] Diagram canvas UI (Mermaid render)

## E3 — Grounding + memory (V1)
- [ ] Codebase grounding via #2 (MCP/API client); cite real components
- [ ] Design memory (reuse #1 store; pgvector search)
- [ ] Versioned designs + diffs
- [ ] Export Confluence/Notion; pattern templates

## E4 — Interview prep (V1)
- [ ] AI interviewer persona + scenarios (URL shortener, feed, chat, etc.)
- [ ] Rubric scoring (LLM-as-judge, `packages/evals`)
- [ ] Progress tracking; self-serve Pro

## E5 — Teams & review (V1/V2)
- [ ] Teams + shared designs + RBAC
- [ ] Multi-agent design review (architect/critic/cost) (V2)
- [ ] Cost/scaling estimators (V2)
- [ ] ContextOS integration (designs as team context) (V2)

## E6 — Enterprise (V3)
- [ ] Architecture governance/standards; SSO/on-prem; approval workflows

## E7 — Evals & launch
- [ ] Design rubric + diagram-validity + interview-calibration evals (CI gate)
- [ ] Landing/pricing; interview-prep content (SEO); PH/HN/build-in-public
