import { NextResponse } from "next/server";
import { renderAdr } from "@/lib/engine/index";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}) as Record<string, unknown>);
  if (!b.title || !b.context || !b.decision) {
    return NextResponse.json({ error: { message: "Need title, context, decision." } }, { status: 400 });
  }
  const md = renderAdr({
    id: Number(b.id) || 1,
    title: String(b.title),
    status: (b.status as "proposed" | "accepted" | "superseded") ?? "proposed",
    context: String(b.context),
    decision: String(b.decision),
    alternatives: (b.alternatives as string[]) ?? [],
    consequences: (b.consequences as string[]) ?? [],
  });
  return NextResponse.json({ markdown: md });
}
