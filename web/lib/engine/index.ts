// GENERATED from engine/src/index.ts — DO NOT EDIT.
// Source of truth: engine/src. Regenerate: node engine/scripts/sync-to-web.mjs

// System Design Assistant engine — diagrams (Mermaid), ADRs, tradeoff analysis, design
// memory, and interview-prep. Deterministic + zero-network. (Codebase grounding via the
// Codebase Intelligence engine #2 is the V1 integration.)

import { DesignStore, renderDesignDoc } from "./design";
import { toMermaid, pattern } from "./diagram";
import { renderAdr } from "./adr";
import { analyze, renderTradeoffs } from "./tradeoffs";
import { QUESTION_BANK, getQuestion, gradeAnswer } from "./interview";

export class SystemDesignAssistant {
  readonly designs = new DesignStore();

  diagram = toMermaid;
  pattern = pattern;
  adr = renderAdr;
  tradeoffs = analyze;
  renderTradeoffs = renderTradeoffs;
  doc = renderDesignDoc;

  // interview prep
  questions = QUESTION_BANK;
  question = getQuestion;
  grade = gradeAnswer;
}

export { DesignStore, renderDesignDoc } from "./design";
export { toMermaid, pattern } from "./diagram";
export { renderAdr } from "./adr";
export { analyze, renderTradeoffs } from "./tradeoffs";
export { QUESTION_BANK, getQuestion, gradeAnswer } from "./interview";
export type * from "./types";
