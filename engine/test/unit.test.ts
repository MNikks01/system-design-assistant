import { test } from "node:test";
import assert from "node:assert/strict";
import { toMermaid, pattern, renderAdr, analyze, gradeAnswer } from "../src/index.ts";

test("toMermaid: header + node shapes by kind + labeled edges", () => {
  const m = toMermaid({ title: "t", direction: "LR", nodes: [{ id: "a", label: "App", kind: "service" }, { id: "d", label: "DB", kind: "db" }], edges: [{ from: "a", to: "d", label: "write" }] });
  assert.match(m, /^flowchart LR/);
  assert.ok(m.includes('a["App"]'));
  assert.ok(m.includes('d[("DB")]'));
  assert.ok(m.includes("a -->|write| d"));
});

test("patterns: scalable-web has 6 nodes; event-driven has a queue", () => {
  assert.equal(pattern("scalable-web").nodes.length, 6);
  assert.ok(pattern("event-driven").nodes.some((n) => n.kind === "queue"));
});

test("renderAdr: MADR markdown with title, status, alternatives", () => {
  const md = renderAdr({ id: 1, title: "Use Postgres", status: "accepted", context: "ctx", decision: "dec", alternatives: ["Mongo"], consequences: ["ACID"] });
  assert.match(md, /# ADR-0001: Use Postgres/);
  assert.match(md, /\*\*Status:\*\* accepted/);
  assert.ok(md.includes("- Mongo"));
});

test("analyze: weighted matrix picks the winner", () => {
  const res = analyze([{ name: "scalability", weight: 5 }, { name: "cost", weight: 2 }], [{ name: "A", scores: { scalability: 5, cost: 2 } }, { name: "B", scores: { scalability: 2, cost: 5 } }]);
  assert.equal(res.winner, "A");
  assert.equal(res.ranking[0].total, 29);
});

test("gradeAnswer: detects covered + missing rubric topics", () => {
  const g = gradeAnswer("url-shortener", "Use hashing, a database, a cache, and a load balancer.");
  assert.ok(g.covered.includes("hashing"));
  assert.ok(g.missing.includes("analytics"));
  assert.ok(g.score > 0 && g.score < 1);
});
