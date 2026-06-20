import { NextResponse } from "next/server";
import { QUESTION_BANK, gradeAnswer } from "@/lib/engine/index";

export const runtime = "nodejs";

// GET -> question bank. POST { questionId, answer } -> grade.
export async function GET() {
  return NextResponse.json({ questions: QUESTION_BANK.map((q) => ({ id: q.id, prompt: q.prompt })) });
}

export async function POST(req: Request) {
  const { questionId, answer } = await req.json().catch(() => ({}) as { questionId?: string; answer?: string });
  if (!questionId || !answer) return NextResponse.json({ error: { message: "Need questionId and answer." } }, { status: 400 });
  try {
    return NextResponse.json(gradeAnswer(questionId, answer));
  } catch (e) {
    return NextResponse.json({ error: { message: (e as Error).message } }, { status: 404 });
  }
}
