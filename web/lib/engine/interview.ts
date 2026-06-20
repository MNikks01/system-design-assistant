// GENERATED from engine/src/interview.ts — DO NOT EDIT.
// Source of truth: engine/src. Regenerate: node engine/scripts/sync-to-web.mjs

// Interview-prep mode — a small system-design question bank + rubric-based self-grading.

export interface InterviewQuestion {
  id: string;
  prompt: string;
  rubric: string[]; // key topics a strong answer covers
}

export const QUESTION_BANK: InterviewQuestion[] = [
  {
    id: "url-shortener",
    prompt: "Design a URL shortener (like bit.ly) for 100M links and 10k reads/sec.",
    rubric: ["hashing", "database", "cache", "load balancer", "redirect", "rate limit", "analytics"],
  },
  {
    id: "news-feed",
    prompt: "Design a social media news feed.",
    rubric: ["fanout", "cache", "ranking", "pagination", "database", "queue", "cdn"],
  },
  {
    id: "chat",
    prompt: "Design a real-time chat system.",
    rubric: ["websocket", "presence", "message queue", "database", "delivery", "scaling", "notification"],
  },
];

export function getQuestion(id: string): InterviewQuestion | undefined {
  return QUESTION_BANK.find((q) => q.id === id);
}

export interface Grade {
  covered: string[];
  missing: string[];
  score: number; // 0..1 fraction of rubric covered
  feedback: string;
}

export function gradeAnswer(questionId: string, answer: string): Grade {
  const q = getQuestion(questionId);
  if (!q) throw new Error(`unknown question: ${questionId}`);
  const text = answer.toLowerCase();
  const covered = q.rubric.filter((topic) => text.includes(topic.toLowerCase()));
  const missing = q.rubric.filter((topic) => !covered.includes(topic));
  const score = q.rubric.length ? covered.length / q.rubric.length : 0;
  const feedback =
    missing.length === 0
      ? "Excellent — covered all key topics."
      : `Solid start. Consider addressing: ${missing.join(", ")}.`;
  return { covered, missing, score, feedback };
}
