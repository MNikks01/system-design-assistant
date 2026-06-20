# System Design Assistant — API reference

_Generated from the source; see each subproject's README for usage._

## MCP server tools

Served over stdio JSON-RPC (`mcp-server/src/server.ts`).

| Tool | Description |
|------|-------------|
| `make_diagram` | Generate a Mermaid architecture diagram — from a named pattern (scalable-web | event-driven) or from explicit nodes + edges.… |
| `draft_adr` | Draft an Architecture Decision Record (MADR-style markdown).… |
| `analyze_tradeoffs` | Run a weighted tradeoff decision matrix and recommend an option. Returns a markdown table.… |
| `list_questions` | List system-design interview practice questions.… |
| `grade_answer` | Grade a system-design interview answer against the question's rubric (covered vs missing topics + score).… |

## Web HTTP API

Next.js route handlers under `web/app/api`.

| Endpoint | Methods |
|----------|---------|
| `/api/adr` | POST |
| `/api/diagram` | POST |
| `/api/interview` | GET, POST |
| `/api/tradeoffs` | POST |

> All inputs are validated; errors return a JSON `{ error: { message } }` with an appropriate status. No secrets are logged. See `.github/SECURITY.md`.