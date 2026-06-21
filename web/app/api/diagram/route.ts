import { NextResponse } from "next/server";
import { toMermaid, pattern } from "@/lib/engine/index";
import type { ArchEdge, ArchNode, ArchitectureSpec } from "@/lib/engine/types";

export const runtime = "nodejs";

type DiagramBody = { pattern?: string; nodes?: ArchNode[]; edges?: ArchEdge[]; direction?: "LR" | "TD" };

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}) as DiagramBody);
  const spec: ArchitectureSpec =
    body.pattern === "scalable-web" || body.pattern === "event-driven"
      ? pattern(body.pattern)
      : { title: "Architecture", direction: body.direction ?? "LR", nodes: body.nodes ?? [], edges: body.edges ?? [] };
  return NextResponse.json({ mermaid: toMermaid(spec) });
}
