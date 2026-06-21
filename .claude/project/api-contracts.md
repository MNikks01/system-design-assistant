# API contracts — System Design Assistant

_Derived from source. See root `API.md` and each subproject README._

## MCP tools
- `make_diagram`
- `draft_adr`
- `analyze_tradeoffs`
- `list_questions`
- `grade_answer`

## Web HTTP API
- `GET/POST /api/interview`
- `POST /api/adr`
- `POST /api/diagram`
- `POST /api/tradeoffs`

> Inputs are validated; errors return `{ error: { message } }` with an appropriate status.
