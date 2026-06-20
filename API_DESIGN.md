# System Design Assistant — API DESIGN

REST. Conventions per contextos/API_DESIGN.md.

## REST
```
POST   /v1/designs                         (start a design: problem)
GET    /v1/designs/:id                      (current state + versions)
POST   /v1/designs/:id/chat                 (iterate; streams) -> {reply, diagrams?, adr?, tradeoffs?}
POST   /v1/designs/:id/diagram              ({type}) -> {mermaid}  (validated)
POST   /v1/designs/:id/adr                  (draft/save ADR)
POST   /v1/designs/:id/tradeoffs            (analyze options)
POST   /v1/designs/:id/ground               ({repo_id})  -> ground in real code via #2
GET    /v1/designs/:id/export?format=md|confluence
GET    /v1/designs/:id/versions
# Interview prep
POST   /v1/prep/sessions                    ({scenario}) -> AI interviewer session
POST   /v1/prep/sessions/:id/turn           (candidate answer) -> {follow_up, hints}
GET    /v1/prep/sessions/:id/feedback       (rubric score + notes)
# Governance/billing
GET    /v1/billing/subscription   POST /v1/webhooks/stripe
```

## Integration
`/ground` calls Codebase Intelligence (#2) MCP/API (`ask_codebase`, `get_repo_summary`, `graph`). Design memory persists to the #1-style context store.

## Errors
problem+json: `diagram-invalid` (422, regenerate), `repo-not-indexed` (409), `quota-exceeded` (402).
