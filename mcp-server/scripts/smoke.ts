// Drives the System Design Assistant MCP server over stdio JSON-RPC.
import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const child = spawn("node", [resolve(here, "../src/server.ts")], { stdio: ["pipe", "pipe", "inherit"] });

let buf = "";
const pending = new Map<number, (m: any) => void>();
child.stdout.on("data", (chunk) => {
  buf += chunk.toString();
  let nl: number;
  while ((nl = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, nl).trim();
    buf = buf.slice(nl + 1);
    if (!line) continue;
    let msg: any;
    try { msg = JSON.parse(line); } catch { continue; }
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)!(msg); pending.delete(msg.id); }
  }
});
const send = (o: any) => child.stdin.write(JSON.stringify(o) + "\n");
const request = (id: number, method: string, params?: any) =>
  new Promise<any>((res) => { pending.set(id, res); send({ jsonrpc: "2.0", id, method, params }); });
function assert(c: boolean, l: string) { if (!c) { console.error(`✗ ${l}`); child.kill(); process.exit(1); } console.log(`✓ ${l}`); }
const txt = (m: any) => m.result?.content?.[0]?.text ?? "";

const init = await request(1, "initialize", { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "smoke", version: "1.0.0" } });
assert(init.result?.serverInfo?.name === "system-design-assistant", `initialize -> ${init.result?.serverInfo?.name}`);
send({ jsonrpc: "2.0", method: "notifications/initialized" });

const names = ((await request(2, "tools/list", {})).result?.tools ?? []).map((t: any) => t.name);
assert(["make_diagram", "draft_adr", "analyze_tradeoffs", "list_questions", "grade_answer"].every((n) => names.includes(n)), `tools/list -> ${names.join(", ")}`);

assert(/flowchart LR/.test(txt(await request(3, "tools/call", { name: "make_diagram", arguments: { pattern: "scalable-web" } }))), "make_diagram(scalable-web) -> mermaid");

assert(/ADR-0001/.test(txt(await request(4, "tools/call", { name: "draft_adr", arguments: { id: 1, title: "Use Postgres", status: "accepted", context: "c", decision: "d" } }))), "draft_adr -> ADR-0001");

const to = txt(await request(5, "tools/call", { name: "analyze_tradeoffs", arguments: { criteria: [{ name: "scalability", weight: 5 }], options: [{ name: "A", scores: { scalability: 5 } }, { name: "B", scores: { scalability: 2 } }] } }));
assert(/Recommendation:\*\* A/.test(to), "analyze_tradeoffs -> recommends A");

assert(/url-shortener/.test(txt(await request(6, "tools/call", { name: "list_questions", arguments: {} }))), "list_questions includes url-shortener");

assert(/Score \d+%/.test(txt(await request(7, "tools/call", { name: "grade_answer", arguments: { questionId: "url-shortener", answer: "hashing database cache load balancer" } }))), "grade_answer -> score");

child.kill();
console.log("\n✅ System Design Assistant MCP server works end-to-end over MCP.");
