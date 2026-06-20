#!/usr/bin/env node
// MCP server for the System Design Assistant. stdout is the MCP channel; status -> stderr.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { toMermaid, pattern, renderAdr, renderTradeoffs, QUESTION_BANK, gradeAnswer } from "../../engine/src/index.ts";

const KIND = z.enum(["client", "service", "db", "cache", "queue", "external"]);
const server = new McpServer({ name: "system-design-assistant", version: "0.1.0" });

server.tool(
  "make_diagram",
  "Generate a Mermaid architecture diagram — from a named pattern (scalable-web | event-driven) or from explicit nodes + edges.",
  {
    pattern: z.enum(["scalable-web", "event-driven"]).optional(),
    direction: z.enum(["LR", "TD"]).optional(),
    nodes: z.array(z.object({ id: z.string(), label: z.string(), kind: KIND.optional() })).optional(),
    edges: z.array(z.object({ from: z.string(), to: z.string(), label: z.string().optional() })).optional(),
  },
  async ({ pattern: p, direction, nodes, edges }) => {
    const spec = p ? pattern(p) : { title: "Architecture", direction: direction ?? "LR", nodes: nodes ?? [], edges: edges ?? [] };
    return { content: [{ type: "text", text: "```mermaid\n" + toMermaid(spec) + "\n```" }] };
  },
);

server.tool(
  "draft_adr",
  "Draft an Architecture Decision Record (MADR-style markdown).",
  {
    id: z.number(),
    title: z.string(),
    status: z.enum(["proposed", "accepted", "superseded"]),
    context: z.string(),
    decision: z.string(),
    alternatives: z.array(z.string()).optional(),
    consequences: z.array(z.string()).optional(),
  },
  async ({ id, title, status, context, decision, alternatives, consequences }) => ({
    content: [{ type: "text", text: renderAdr({ id, title, status, context, decision, alternatives: alternatives ?? [], consequences: consequences ?? [] }) }],
  }),
);

server.tool(
  "analyze_tradeoffs",
  "Run a weighted tradeoff decision matrix and recommend an option. Returns a markdown table.",
  {
    criteria: z.array(z.object({ name: z.string(), weight: z.number() })),
    options: z.array(z.object({ name: z.string(), scores: z.record(z.number()) })),
  },
  async ({ criteria, options }) => ({ content: [{ type: "text", text: renderTradeoffs(criteria, options) }] }),
);

server.tool("list_questions", "List system-design interview practice questions.", {}, async () => ({
  content: [{ type: "text", text: QUESTION_BANK.map((q) => `- ${q.id}: ${q.prompt}`).join("\n") }],
}));

server.tool(
  "grade_answer",
  "Grade a system-design interview answer against the question's rubric (covered vs missing topics + score).",
  { questionId: z.string(), answer: z.string() },
  async ({ questionId, answer }) => {
    try {
      const g = gradeAnswer(questionId, answer);
      return { content: [{ type: "text", text: `Score ${(g.score * 100).toFixed(0)}%\nCovered: ${g.covered.join(", ") || "none"}\nMissing: ${g.missing.join(", ") || "none"}\n${g.feedback}` }] };
    } catch (e) {
      return { content: [{ type: "text", text: (e as Error).message }] };
    }
  },
);

await server.connect(new StdioServerTransport());
console.error("[system-design-assistant-mcp] ready");
