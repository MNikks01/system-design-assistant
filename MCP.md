# System Design Assistant — MCP

Protocol basics: MCP_GUIDE.md.

## Strategy
Two roles: (1) **consume #2's MCP server** to ground designs in real code; (2) optionally **expose design tools via MCP** so agents/assistants can request designs/ADRs/diagrams.

## Consuming Codebase Intelligence (#2)
Connect to #2's MCP server (`ask_codebase`, `search_code`, `impact_of`, `get_repo_summary`, dependency graph) to pull real architecture into design conversations. This is the grounding mechanism.

## Design-Assistant-as-MCP-server (optional)
Expose at `/mcp`:
- `propose_design(problem, repo_id?)` → design + diagram + tradeoffs
- `draft_adr(decision_context)` → ADR
- `generate_diagram(description, type)` → Mermaid
- `get_design_memory(project)` → prior decisions
So an agent can design within a workflow (e.g., ContextOS).

## Integration with the lab
Reuses #2 (grounding) + #1 (design memory). In ContextOS, designs become team context. See [mcp.json](./mcp.json).

## Governance
API-key scoped, read-only grounding, rate-limited, audited, tenant-isolated.
