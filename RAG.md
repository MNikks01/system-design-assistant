# System Design Assistant — RAG

RAG appears via **codebase grounding** (reusing #2) and **design-memory retrieval**. General method: RAG_GUIDE.md; RAG-over-code engine: codebase-intelligence/RAG.md.

## Two retrieval sources
1. **Codebase grounding (via #2):** call Codebase Intelligence to retrieve real architecture — components, dependencies, patterns — so designs reference the *actual* system. We don't rebuild RAG-over-code; we consume #2's API/MCP (`ask_codebase`, `get_repo_summary`, dependency graph).
2. **Design memory:** embed prior designs/ADRs (pgvector) → retrieve relevant past decisions when designing ("we already decided X for Y").

## Optional
- Pattern/reference retrieval (embed a library of system-design patterns → ground suggestions).
- Docs assistant (RAG over our docs).

## Implementation
Grounding = client to #2 (no new retrieval infra). Design memory = pgvector on design/ADR embeddings (modest scale), provider-abstracted embeddings (`packages/llm`).

## Why this matters
Grounding in real code is THE differentiator vs. generic LLM design advice — and it's free leverage from owning #2.
