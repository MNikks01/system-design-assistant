# System Design Assistant — web app

The browser UI for [`../engine`](../engine): a tabbed design tool — **Diagram** (Mermaid), **ADR** drafter, **Tradeoffs** matrix, and **Interview** practice with grading. Next.js 16 + Tailwind. No keys needed.

## Status: built + API-verified (2026-06-21)
- ✅ `next build` compiles + typechecks (engine synced into `lib/engine/`).
- ✅ `POST /api/diagram`, `POST /api/adr`, `POST /api/tradeoffs`, `GET/POST /api/interview`.
- ✅ End-to-end via `scripts/smoke-api.mjs`: diagram (mermaid + db cylinder), ADR-0001 markdown, tradeoffs winner, interview grading (covered/missing + score), 404 on unknown question.
- 🔲 Visual UI renders + wired — **verify locally** (`npm run dev`); not click-tested headlessly.

## Run it
```bash
npm install
npm run dev          # http://localhost:3000 — Diagram / ADR / Tradeoffs / Interview tabs
# headless API proof:
npm run build
PORT=3995 npx next start &
BASE=http://localhost:3995 node scripts/smoke-api.mjs
```

## Structure
```
app/
  page.tsx              # tabbed tool: Diagram · ADR · Tradeoffs · Interview
  api/diagram           # spec/pattern -> Mermaid
  api/adr               # fields -> MADR markdown
  api/tradeoffs         # criteria + options -> matrix + winner
  api/interview         # GET questions · POST grade an answer
lib/engine/             # GENERATED from ../engine/src (sync-to-web.mjs)
scripts/smoke-api.mjs   # end-to-end API proof
```

## Notes
- Mermaid is shown as source (renders in any Mermaid viewer / GitHub ```mermaid block).
- V1: ground designs in a real codebase via the Codebase Intelligence engine (#2); LLM-assisted reasoning (gated on a key); persistent team design memory.
- `lib/engine/` is generated — edit `../engine/src` and run `node ../engine/scripts/sync-to-web.mjs`.
