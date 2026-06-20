import { NextResponse } from "next/server";
import { toMermaid, pattern } from "@/lib/engine/index";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}) as { pattern?: string; nodes?: any[]; edges?: any[]; direction?: "LR" | "TD" });
  const spec =
    body.pattern === "scalable-web" || body.pattern === "event-driven"
      ? pattern(body.pattern)
      : { title: "Architecture", direction: body.direction ?? "LR", nodes: body.nodes ?? [], edges: body.edges ?? [] };
  return NextResponse.json({ mermaid: toMermaid(spec as never) });
}
