"use client";

import { useState, useEffect } from "react";

const TABS = ["Diagram", "ADR", "Tradeoffs", "Interview"] as const;
type Tab = (typeof TABS)[number];

export default function Home() {
  const [tab, setTab] = useState<Tab>("Diagram");

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">System Design Assistant</h1>
      <p className="mt-2 text-zinc-500">
        Your AI co-architect — generate architecture diagrams, draft ADRs, weigh tradeoffs, and practice system-design
        interviews.
      </p>

      <div className="mt-6 flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {TABS.map((t) => (
          <button type="button"
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 text-sm ${tab === t ? "border-b-2 border-black font-medium dark:border-white" : "text-zinc-500"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Diagram" && <Diagram />}
        {tab === "ADR" && <Adr />}
        {tab === "Tradeoffs" && <Tradeoffs />}
        {tab === "Interview" && <Interview />}
      </div>
    </main>
  );
}

function Out({ text }: { text: string }) {
  return <pre className="mt-3 max-h-96 overflow-auto rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900">{text}</pre>;
}

function Diagram() {
  const [pattern, setPattern] = useState("scalable-web");
  const [out, setOut] = useState("");
  async function run() {
    const r = await fetch("/api/diagram", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pattern }) });
    setOut((await r.json()).mermaid);
  }
  return (
    <div>
      <div className="flex gap-2">
        <select value={pattern} onChange={(e) => setPattern(e.target.value)} aria-label="Diagram pattern" className="rounded-md border border-zinc-300 px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900">
          <option value="scalable-web">scalable-web</option>
          <option value="event-driven">event-driven</option>
        </select>
        <button type="button" onClick={run} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">Generate Mermaid</button>
      </div>
      {out && <Out text={out} />}
      {out && <p className="mt-1 text-xs text-zinc-500">Paste into any Mermaid viewer (or a GitHub markdown ```mermaid block) to render.</p>}
    </div>
  );
}

function Adr() {
  const [f, setF] = useState({ id: "1", title: "Use Postgres for the core data model", status: "accepted", context: "We need ACID guarantees and relational queries.", decision: "Adopt Postgres + Drizzle.", alternatives: "MongoDB\nDynamoDB", consequences: "Strong consistency\nVertical scaling limits" });
  const [out, setOut] = useState("");
  async function run() {
    const r = await fetch("/api/adr", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...f, id: Number(f.id), alternatives: f.alternatives.split("\n").filter(Boolean), consequences: f.consequences.split("\n").filter(Boolean) }) });
    const d = await r.json();
    setOut(d.markdown ?? d.error?.message ?? "");
  }
  const inp = "w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";
  return (
    <div className="space-y-2">
      <input className={inp} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} aria-label="title" placeholder="title" />
      <textarea className={inp} rows={2} value={f.context} onChange={(e) => setF({ ...f, context: e.target.value })} aria-label="context" placeholder="context" />
      <textarea className={inp} rows={2} value={f.decision} onChange={(e) => setF({ ...f, decision: e.target.value })} aria-label="decision" placeholder="decision" />
      <textarea className={inp} rows={2} value={f.alternatives} onChange={(e) => setF({ ...f, alternatives: e.target.value })} aria-label="alternatives (one per line)" placeholder="alternatives (one per line)" />
      <button type="button" onClick={run} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">Draft ADR</button>
      {out && <Out text={out} />}
    </div>
  );
}

function Tradeoffs() {
  const [out, setOut] = useState("");
  async function run() {
    const body = {
      criteria: [{ name: "scalability", weight: 5 }, { name: "consistency", weight: 3 }, { name: "cost", weight: 2 }],
      options: [
        { name: "Postgres", scores: { scalability: 3, consistency: 5, cost: 4 } },
        { name: "DynamoDB", scores: { scalability: 5, consistency: 3, cost: 3 } },
      ],
    };
    const r = await fetch("/api/tradeoffs", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    setOut((await r.json()).markdown);
  }
  return (
    <div>
      <p className="text-sm text-zinc-500">Example: Postgres vs DynamoDB across scalability/consistency/cost.</p>
      <button type="button" onClick={run} className="mt-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">Analyze tradeoffs</button>
      {out && <Out text={out} />}
    </div>
  );
}

function Interview() {
  const [questions, setQuestions] = useState<{ id: string; prompt: string }[]>([]);
  const [qid, setQid] = useState("url-shortener");
  const [answer, setAnswer] = useState("I'd use consistent hashing, a database with a cache, and a load balancer.");
  const [grade, setGrade] = useState<{ score: number; covered: string[]; missing: string[]; feedback: string } | null>(null);

  useEffect(() => {
    fetch("/api/interview").then((r) => r.json()).then((d) => setQuestions(d.questions));
  }, []);

  async function run() {
    const r = await fetch("/api/interview", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ questionId: qid, answer }) });
    setGrade(await r.json());
  }
  return (
    <div className="space-y-2">
      <select value={qid} onChange={(e) => setQid(e.target.value)} aria-label="Interview question" className="w-full rounded-md border border-zinc-300 px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900">
        {questions.map((q) => <option key={q.id} value={q.id}>{q.prompt}</option>)}
      </select>
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900" aria-label="your answer…" placeholder="your answer…" />
      <button type="button" onClick={run} className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">Grade answer</button>
      {grade && (
        <div className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800">
          <div className="font-semibold">Score: {(grade.score * 100).toFixed(0)}%</div>
          <div className="mt-1 text-emerald-600">covered: {grade.covered.join(", ") || "none"}</div>
          <div className="text-amber-600">missing: {grade.missing.join(", ") || "none"}</div>
          <div className="mt-1 text-zinc-500">{grade.feedback}</div>
        </div>
      )}
    </div>
  );
}
