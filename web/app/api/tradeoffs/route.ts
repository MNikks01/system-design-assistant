import { NextResponse } from "next/server";
import { analyze, renderTradeoffs } from "@/lib/engine/index";
import type { TradeoffCriterion, TradeoffOption } from "@/lib/engine/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { criteria, options } = await req.json().catch(() => ({}) as { criteria?: TradeoffCriterion[]; options?: TradeoffOption[] });
  if (!criteria?.length || !options?.length) {
    return NextResponse.json({ error: { message: "Need criteria[] and options[]." } }, { status: 400 });
  }
  return NextResponse.json({ result: analyze(criteria, options), markdown: renderTradeoffs(criteria, options) });
}
