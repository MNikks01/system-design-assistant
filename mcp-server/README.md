# System Design Assistant — MCP server

Exposes [`../engine`](../engine) over **MCP**, so any MCP host/agent can design systems,
draft ADRs, weigh tradeoffs, and run interview practice.

## Status: works end-to-end (verified over MCP, 2026-06-21)
- ✅ Tools: `make_diagram`, `draft_adr`, `analyze_tradeoffs`, `list_questions`, `grade_answer`.
- ✅ Driven over real stdio JSON-RPC (`scripts/smoke.ts`).

## Tools
| Tool | Input | Returns |
|------|-------|---------|
| `make_diagram` | `{ pattern? \| nodes[], edges[], direction? }` | a Mermaid diagram |
| `draft_adr` | `{ id, title, status, context, decision, alternatives?, consequences? }` | MADR markdown |
| `analyze_tradeoffs` | `{ criteria[], options[] }` | weighted matrix + recommendation |
| `list_questions` | — | interview-practice question bank |
| `grade_answer` | `{ questionId, answer }` | covered/missing topics + score |

## Run it
```bash
npm install
node src/server.ts     # speaks MCP over stdio
npm run smoke
```
Add to Claude Desktop via [`mcp.json`](./mcp.json) (absolute path to `src/server.ts`).
