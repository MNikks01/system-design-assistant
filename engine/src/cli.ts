#!/usr/bin/env node
// System Design Assistant CLI — turn a JSON spec into architecture diagrams (Mermaid),
// ADRs, and tradeoff tables, and run interview-prep grading. Deterministic, zero-network.
//
//   sysdesign diagram <arch.json>            # ArchitectureSpec -> Mermaid
//   sysdesign pattern <scalable-web|event-driven>   # a built-in reference architecture
//   sysdesign adr <adr.json>                 # ADR (MADR) markdown
//   sysdesign tradeoffs <file.json>          # {criteria, options} -> ranked table + winner
//   sysdesign questions                      # list interview questions
//   sysdesign grade <questionId> "<answer>"  # rubric-grade an interview answer

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  QUESTION_BANK,
  analyze,
  gradeAnswer,
  pattern,
  renderAdr,
  renderTradeoffs,
  toMermaid,
} from "./index.ts";
import type { ADR, ArchitectureSpec, TradeoffCriterion, TradeoffOption } from "./types.ts";

const HELP = `sysdesign — AI co-architect: diagrams, ADRs, tradeoff analysis, interview prep

Usage:
  sysdesign diagram <arch.json>                    ArchitectureSpec -> Mermaid
  sysdesign pattern <scalable-web|event-driven>    a built-in reference architecture (Mermaid)
  sysdesign adr <adr.json>                         ADR -> MADR markdown
  sysdesign tradeoffs <file.json>                  {criteria, options} -> ranked table + winner
  sysdesign questions                              list the interview question bank
  sysdesign grade <questionId> "<answer>"          rubric-grade an interview answer
`;

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(resolve(file), "utf8")) as T;
}

function main(): void {
  const [cmd, arg, ...rest] = process.argv.slice(2);

  switch (cmd) {
    case "diagram":
      if (!arg) return usage("sysdesign diagram <arch.json>");
      process.stdout.write(toMermaid(readJson<ArchitectureSpec>(arg)) + "\n");
      return;
    case "pattern": {
      if (arg !== "scalable-web" && arg !== "event-driven") return usage("sysdesign pattern <scalable-web|event-driven>");
      process.stdout.write(toMermaid(pattern(arg)) + "\n");
      return;
    }
    case "adr":
      if (!arg) return usage("sysdesign adr <adr.json>");
      process.stdout.write(renderAdr(readJson<ADR>(arg)) + "\n");
      return;
    case "tradeoffs": {
      if (!arg) return usage("sysdesign tradeoffs <file.json>");
      const { criteria, options } = readJson<{ criteria: TradeoffCriterion[]; options: TradeoffOption[] }>(arg);
      const winner = analyze(criteria, options).winner;
      process.stdout.write(renderTradeoffs(criteria, options) + `\n\nWinner: ${winner}\n`);
      return;
    }
    case "questions":
      for (const q of QUESTION_BANK) process.stdout.write(`• ${q.id}: ${q.prompt}\n`);
      return;
    case "grade": {
      const answer = rest.join(" ");
      if (!arg || !answer) return usage('sysdesign grade <questionId> "<answer>"');
      process.stdout.write(JSON.stringify(gradeAnswer(arg, answer), null, 2) + "\n");
      return;
    }
    default:
      process.stdout.write(HELP);
      process.exit(cmd ? 1 : 0);
  }
}

function usage(line: string): void {
  process.stderr.write(`✗ usage: ${line}\n`);
  process.exit(1);
}

try {
  main();
} catch (e) {
  process.stderr.write(`✗ ${(e as Error).message}\n`);
  process.exit(1);
}
