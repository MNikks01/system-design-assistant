# System Design Assistant — PROBLEM

## Core problem
**System design is high-stakes but under-tooled and ungrounded.** Engineers design on whiteboards, document inconsistently (if at all), and AI help is generic — disconnected from their actual system.

## Pains
| Pain | Mechanism | Cost |
|------|-----------|------|
| Generic AI advice | ChatGPT/Claude give textbook patterns, not *your* system | Wrong/irrelevant designs |
| No persistence | Design chats vanish; decisions unrecorded | Re-litigated decisions, lost rationale |
| Stale diagrams | Hand-drawn diagrams rot immediately | Misleading docs |
| Missing ADRs | Decisions + tradeoffs undocumented | Lost institutional memory |
| Hard interview prep | System-design interviews need practice + feedback | Career cost |

## Why existing tools fall short
- Generic LLMs: flexible but unstructured, no persistence, not codebase-aware.
- Diagram tools (Mermaid/Excalidraw + AI): draw, don't reason about tradeoffs.
- Interview-prep platforms: static content, not interactive AI coaching.
The gap: an **interactive AI co-architect** that reasons about tradeoffs, outputs diagrams + ADRs, persists design memory, and grounds in *your codebase*. (See COMPETITOR_ANALYSIS.md.)

## Root cause
Design reasoning + diagramming + documentation + code-grounding have never been combined in one tool; code-grounding specifically is newly possible (via #2's codebase understanding).

## Validation
Engineers constantly ask LLMs for design help; ADRs are a known best practice widely skipped; interview-prep is a proven paid market; "diagram-as-code" adoption is rising.

## Success
An engineer designs with an AI that knows their system, gets diagrams + ADRs + tradeoff analysis, and keeps a durable, versioned design record — and interview-preppers practice with realistic AI feedback.
