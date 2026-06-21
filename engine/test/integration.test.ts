import { test } from "node:test";
import assert from "node:assert/strict";
import { SystemDesignAssistant } from "../src/index.ts";

test("design memory: create -> iterate (version bump) -> render full doc", () => {
  const sda = new SystemDesignAssistant();
  const d = sda.designs.create({ title: "URL Shortener", problem: "shorten 100M urls" });
  assert.equal(d.version, 1);
  sda.designs.update(d.id, {
    architecture: sda.pattern("scalable-web"),
    adrs: [{ id: 1, title: "base62 codes", status: "accepted", context: "compact", decision: "base62 of id", alternatives: [], consequences: [] }],
    tradeoffs: {
      criteria: [{ name: "scalability", weight: 5 }],
      options: [{ name: "PG", scores: { scalability: 3 } }, { name: "Dynamo", scores: { scalability: 5 } }],
      result: sda.tradeoffs([{ name: "scalability", weight: 5 }], [{ name: "PG", scores: { scalability: 3 } }, { name: "Dynamo", scores: { scalability: 5 } }]),
    },
  });
  assert.equal(sda.designs.get(d.id)?.version, 2);

  const doc = sda.doc(sda.designs.get(d.id)!);
  assert.match(doc, /## Architecture/);
  assert.match(doc, /```mermaid/);
  assert.match(doc, /## Decisions/);
  assert.match(doc, /ADR-0001/);
  assert.match(doc, /Recommendation:\*\* Dynamo/);
});
