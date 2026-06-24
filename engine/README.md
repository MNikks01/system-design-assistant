# System Design Assistant — engine (Phase A) ✅

## Install & CLI

diagrams, ADRs, tradeoff tables, and interview prep. Requires Node ≥18.

```bash
npm i -g @mnikks01/sysdesign    # then run `sysdesign …`, or use npx without installing:
npx @mnikks01/sysdesign pattern scalable-web    # built-in reference architecture (Mermaid)
npx @mnikks01/sysdesign diagram arch.json
npx @mnikks01/sysdesign adr adr.json
npx @mnikks01/sysdesign tradeoffs tradeoffs.json
npx @mnikks01/sysdesign questions
```


The core engine for project #6, your **AI co-architect**. Generate architecture diagrams
(**Mermaid**), draft **ADRs**, run **weighted tradeoff analysis**, persist + iterate **design
memory**, and practice with an **interview-prep** grader. Pure TypeScript, **Node 24 native TS,
zero-network**. (Grounding designs in *your* codebase via the Codebase Intelligence engine #2 is the V1 integration.)

## Status: Phase A built + tested (2026-06-21)
- ✅ **Diagrams** — `ArchitectureSpec → Mermaid` (node shapes by kind: client/service/db/cache/queue/external) + starter patterns (`scalable-web`, `event-driven`).
- ✅ **ADRs** — MADR-style markdown (context / decision / alternatives / consequences).
- ✅ **Tradeoffs** — weighted decision matrix → scored ranking + recommendation (+ markdown table).
- ✅ **Design memory** — create / get / list / iterate (version bump); render a full design document.
- ✅ **Interview prep** — question bank + rubric-based answer grading (covered vs missing topics, score).
- ✅ **13/13 tests pass** (`scripts/test.ts`).

## Run it
```bash
node scripts/demo.ts   # build a URL-shortener design (diagram + tradeoffs + ADR) + grade an answer
node scripts/test.ts   # 13 assertions
```

## API
```ts
import { SystemDesignAssistant } from "./src/index.ts";
const sda = new SystemDesignAssistant();
const d = sda.designs.create({ title, problem });
sda.designs.update(d.id, { architecture: sda.pattern("scalable-web"), adrs: [...], tradeoffs: {...} });
sda.doc(sda.designs.get(d.id));      // full markdown design doc (with mermaid)
sda.grade("url-shortener", answer);  // { covered, missing, score, feedback }
```

## Structure
```
src/
  types.ts       # ArchitectureSpec, ADR, Tradeoff*, Design
  diagram.ts     # toMermaid() + named patterns
  adr.ts         # renderAdr() (MADR markdown)
  tradeoffs.ts   # analyze() + renderTradeoffs() (weighted matrix)
  design.ts      # DesignStore + renderDesignDoc()
  interview.ts   # question bank + gradeAnswer()
  index.ts       # SystemDesignAssistant facade
scripts/
  demo.ts / test.ts
```

## Next
- **MCP server** (`make_diagram` / `draft_adr` / `analyze_tradeoffs` / `grade_answer`) and **web** (interactive design canvas, ADR/tradeoff editors, interview mode).
- **V1:** ground designs in a real codebase via #2; design memory across a team; LLM-assisted reasoning (gated on a key).
