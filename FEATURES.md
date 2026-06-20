# System Design Assistant — FEATURES

## MVP
| # | Feature |
|---|---------|
| M1 | Auth + billing (Free/Pro) |
| M2 | Conversational design assistant (problem → options) |
| M3 | **Mermaid diagram generation** (architecture/sequence/ER) from the conversation |
| M4 | **ADR drafting** (context/decision/consequences) |
| M5 | **Tradeoff analysis** (scale/consistency/cost/latency options) |
| M6 | Save + iterate on designs |
| M7 | Export (Markdown) |

## V1
| # | Feature |
|---|---------|
| V1-1 | **Codebase grounding** (design informed by real code via #2) |
| V1-2 | Design memory (persistent, versioned designs + decisions) |
| V1-3 | **Interview-prep mode** (AI interviewer + rubric feedback) |
| V1-4 | Teams + shared designs |
| V1-5 | Export to Confluence/Notion; diagram-as-code files |
| V1-6 | Templates (common system-design patterns) |

## V2
| # | Feature |
|---|---------|
| V2-1 | Multi-agent design review (architect + critic + cost estimator) |
| V2-2 | Cost/scaling estimators (back-of-envelope sizing) |
| V2-3 | ContextOS integration (designs as team context) |
| V2-4 | ADR linking to code/decisions in #1 |

## V3
Enterprise architecture governance, standards/compliance, on-prem, design approval workflows.

## Future
Live diagram editing; design diff over time; "does our code still match the design?" drift detection (via #2); whiteboard/voice input.

## Reuse note
Codebase grounding reuses Codebase Intelligence (#2); design memory + ADRs reuse ContextOS (#1) context store; quality via `packages/evals`. Interview-prep is a self-contained module on the same engine.
