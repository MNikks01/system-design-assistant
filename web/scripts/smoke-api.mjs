// End-to-end web API proof for the System Design Assistant. No browser, no keys.
const BASE = process.env.BASE || "http://localhost:3995";
const __h = await fetch(BASE + "/api/health").then((r) => r.json()).catch(() => ({}));
if (__h.status !== "ok") throw new Error("health check failed");
console.log("\u2713 /api/health -> ok");
const post = (p, b) => fetch(BASE + p, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(b) });

// 1) diagram
let d = await (await post("/api/diagram", { pattern: "scalable-web" })).json();
if (!/flowchart LR/.test(d.mermaid) || !d.mermaid.includes('db[("Primary DB")]')) throw new Error("diagram failed");
console.log("✓ /api/diagram (scalable-web) -> mermaid with db cylinder");

// 2) ADR
d = await (await post("/api/adr", { id: 1, title: "Use Postgres", status: "accepted", context: "ACID", decision: "Postgres + Drizzle", alternatives: ["Mongo"] })).json();
if (!d.markdown?.includes("# ADR-0001: Use Postgres")) throw new Error("adr failed: " + JSON.stringify(d));
console.log("✓ /api/adr -> ADR-0001 markdown");

// 3) tradeoffs
d = await (await post("/api/tradeoffs", { criteria: [{ name: "scalability", weight: 5 }], options: [{ name: "A", scores: { scalability: 5 } }, { name: "B", scores: { scalability: 2 } }] })).json();
if (d.result.winner !== "A") throw new Error("tradeoffs winner should be A");
console.log(`✓ /api/tradeoffs -> winner ${d.result.winner}`);

// 4) interview list + grade
d = await (await fetch(BASE + "/api/interview")).json();
if (!d.questions.some((q) => q.id === "url-shortener")) throw new Error("question bank missing url-shortener");
console.log(`✓ GET /api/interview -> ${d.questions.length} questions`);
d = await (await post("/api/interview", { questionId: "url-shortener", answer: "hashing, database, cache, load balancer, rate limit" })).json();
if (!(d.score > 0) || !d.covered.includes("hashing")) throw new Error("grade failed: " + JSON.stringify(d));
console.log(`✓ POST /api/interview -> score ${(d.score * 100).toFixed(0)}%, covered ${d.covered.length}`);

// 5) bad question -> 404
const r = await post("/api/interview", { questionId: "nope", answer: "x" });
if (r.status !== 404) throw new Error("expected 404 for unknown question, got " + r.status);
console.log("✓ unknown question -> 404");

console.log("\n✅ System Design Assistant web API end-to-end PASSED");
