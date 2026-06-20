# System Design Assistant — AI ARCHITECTURE

Reasoning-heavy. Builds on AI_STACK_GUIDE.md.

## Models
Claude **Opus** default (design reasoning, tradeoffs, interview coaching need strong reasoning); Sonnet for diagram/ADR drafting; via abstraction (D-003). Low temperature for structured outputs (ADR JSON, Mermaid).

## Capabilities
| Capability | How |
|-----------|-----|
| Design reasoning | LLM proposes options, reasons tradeoffs (scale/consistency/cost/latency) |
| **Codebase grounding** | Retrieve real architecture from #2 (RAG) → ground designs in actual code, not generic patterns |
| Diagram generation | LLM → Mermaid; **validate by parsing** (regenerate if invalid) |
| ADR drafting | Structured output (context/decision/consequences), schema-validated |
| Interview coaching | AI interviewer persona + rubric-based scoring (LLM-as-judge) |
| Design memory | Persist + retrieve prior designs/decisions (reuse #1 store; pgvector search) |

## Grounding (RAG via #2)
For "design within our system" questions, retrieve real components/dependencies from Codebase Intelligence (#2) and inject as context → designs reference actual services, not hypotheticals. This is the core differentiator. See [RAG.md](./RAG.md).

## Evals
- Design quality: rubric (covers requirements? tradeoffs sound? diagram valid?) via LLM-as-judge.
- Interview scoring calibration: judge vs. human-rated samples.
- Diagram validity: deterministic Mermaid parse check.
Reuses `packages/evals`; in CI.

## Cost
Opus-heavy → manage with concise context, prompt caching, Sonnet for drafting subtasks. Conversational + low volume → modest COGS. Track per-session cost.

## Guardrails
Grounded designs cite real components; generic designs flagged as generic; ADRs validated; Mermaid validated; no hallucinated infra claims presented as facts. See [GUARDRAILS.md](./GUARDRAILS.md).
