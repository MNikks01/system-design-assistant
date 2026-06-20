// Tests for the System Design Assistant engine — diagrams, ADRs, tradeoffs, memory, grading.
import { SystemDesignAssistant, toMermaid, analyze, renderAdr, gradeAnswer } from "../src/index.ts";

let fails = 0;
function ok(cond: boolean, label: string) {
  console.log(`${cond ? "✓" : "✗"} ${label}`);
  if (!cond) fails++;
}

// --- diagrams ---
const mer = toMermaid({ title: "t", direction: "LR", nodes: [{ id: "a", label: "App", kind: "service" }, { id: "d", label: "DB", kind: "db" }], edges: [{ from: "a", to: "d", label: "write" }] });
ok(mer.startsWith("flowchart LR"), "mermaid has flowchart header");
ok(mer.includes('a["App"]') && mer.includes('d[("DB")]'), "mermaid shapes by kind (service rect, db cylinder)");
ok(mer.includes("a -->|write| d"), "mermaid edge with label");

const sda = new SystemDesignAssistant();
ok(sda.pattern("scalable-web").nodes.length === 6, "scalable-web pattern has 6 nodes");
ok(sda.pattern("event-driven").nodes.some((n) => n.kind === "queue"), "event-driven pattern has a queue");

// --- ADR ---
const adrMd = renderAdr({ id: 1, title: "Use Postgres", status: "accepted", context: "ctx", decision: "dec", alternatives: ["Mongo"], consequences: ["ACID"] });
ok(adrMd.includes("# ADR-0001: Use Postgres") && adrMd.includes("**Status:** accepted"), "ADR renders title + status");
ok(adrMd.includes("## Alternatives considered") && adrMd.includes("- Mongo"), "ADR lists alternatives");

// --- tradeoffs ---
const criteria = [{ name: "scalability", weight: 5 }, { name: "cost", weight: 2 }];
const options = [{ name: "A", scores: { scalability: 5, cost: 2 } }, { name: "B", scores: { scalability: 2, cost: 5 } }];
const res = analyze(criteria, options);
// A: 5*5+2*2=29 ; B: 2*5+5*2=20 -> A wins
ok(res.winner === "A" && res.ranking[0].total === 29, "tradeoff matrix scores + picks winner");

// --- design memory ---
const d = sda.designs.create({ title: "X", problem: "p" });
ok(d.version === 1 && sda.designs.list().length === 1, "design created v1");
sda.designs.update(d.id, { architecture: sda.pattern("scalable-web") });
ok(sda.designs.get(d.id).version === 2, "update bumps version");
const doc = sda.doc(sda.designs.get(d.id));
ok(doc.includes("```mermaid") && doc.includes("## Architecture"), "design doc embeds mermaid architecture");

// --- interview grading ---
const g = gradeAnswer("url-shortener", "Use hashing, a database, a cache, a load balancer, and rate limit reads.");
ok(g.covered.includes("hashing") && g.covered.includes("cache") && g.missing.includes("analytics"), "grade detects covered + missing topics");
ok(g.score > 0.5 && g.score < 1, "grade score is a sensible fraction");

console.log(fails === 0 ? "\n✅ System Design Assistant engine: all tests passed" : `\n❌ ${fails} failed`);
process.exit(fails === 0 ? 0 : 1);
