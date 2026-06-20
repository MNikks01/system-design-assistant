// Demo: build a design (architecture + tradeoffs + ADR), render the doc, grade an interview answer.
import { SystemDesignAssistant } from "../src/index.ts";

const sda = new SystemDesignAssistant();

const d = sda.designs.create({ title: "URL Shortener", problem: "Shorten 100M URLs; 10k reads/sec; low-latency redirects." });

sda.designs.update(d.id, {
  architecture: sda.pattern("scalable-web"),
  tradeoffs: {
    criteria: [
      { name: "scalability", weight: 5 },
      { name: "consistency", weight: 3 },
      { name: "cost", weight: 2 },
    ],
    options: [
      { name: "Postgres", scores: { scalability: 3, consistency: 5, cost: 4 } },
      { name: "DynamoDB", scores: { scalability: 5, consistency: 3, cost: 3 } },
    ],
    result: sda.tradeoffs(
      [{ name: "scalability", weight: 5 }, { name: "consistency", weight: 3 }, { name: "cost", weight: 2 }],
      [{ name: "Postgres", scores: { scalability: 3, consistency: 5, cost: 4 } }, { name: "DynamoDB", scores: { scalability: 5, consistency: 3, cost: 3 } }],
    ),
  },
  adrs: [
    { id: 1, title: "Use base62 hashing for short codes", status: "accepted", context: "Need compact, collision-resistant codes.", decision: "Generate codes via base62 of an auto-increment id.", alternatives: ["Random + dedupe", "UUID"], consequences: ["Predictable length", "Sequential ids may leak volume"] },
  ],
});

console.log(sda.doc(sda.designs.get(d.id)));

console.log("\n--- interview prep ---");
const g = sda.grade("url-shortener", "I'd use consistent hashing, a database with a cache layer, and a load balancer for redirects.");
console.log(`Score ${(g.score * 100).toFixed(0)}% · covered: ${g.covered.join(", ")} · ${g.feedback}`);

console.log("\n✅ Demo complete.\n");
