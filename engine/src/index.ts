// System Design Assistant engine — diagrams (Mermaid), ADRs, tradeoff analysis, design
// memory, and interview-prep. Deterministic + zero-network. (Codebase grounding via the
// Codebase Intelligence engine #2 is the V1 integration.)

import { DesignStore, renderDesignDoc } from "./design.ts";
import { toMermaid, pattern } from "./diagram.ts";
import { renderAdr } from "./adr.ts";
import { analyze, renderTradeoffs } from "./tradeoffs.ts";
import { QUESTION_BANK, getQuestion, gradeAnswer } from "./interview.ts";

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

export { DesignStore, renderDesignDoc } from "./design.ts";
export { toMermaid, pattern } from "./diagram.ts";
export { renderAdr } from "./adr.ts";
export { analyze, renderTradeoffs } from "./tradeoffs.ts";
export { QUESTION_BANK, getQuestion, gradeAnswer } from "./interview.ts";
export type * from "./types.ts";
