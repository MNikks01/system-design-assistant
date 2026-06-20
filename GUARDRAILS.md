# System Design Assistant — GUARDRAILS

Framework: contextos/GUARDRAILS.md.

- **Grounding honesty:** clearly distinguish *grounded* claims (cite real components from #2) vs. *generic* best-practice advice; never present hypotheticals as facts about the user's system.
- **No hallucinated infra facts:** if grounding is unavailable/low-confidence, say so; don't invent the user's architecture.
- **Diagram validation:** generated Mermaid must parse/render (regenerate on failure).
- **ADR validation:** structured output schema-checked.
- **Codebase grounding inherits #2 guardrails:** tenant-scoped, read-only, secret-redacted.
- **Interview-prep:** rubric scoring calibrated; feedback constructive; no fabricated "correct answers."
- **Tenant isolation:** `org_id`+RLS on designs/memory/prep.
- **Rate limits + spend caps** (Opus-heavy → cost guardrails matter).
- Fail safe: invalid diagram → regenerate; no grounding → flag as generic; low confidence → say so.
