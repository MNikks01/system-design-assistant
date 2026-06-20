// Core types for the System Design Assistant engine: architecture diagrams, ADRs,
// tradeoff analysis, and persisted designs.

export type NodeKind = "client" | "service" | "db" | "cache" | "queue" | "external";

export interface ArchNode {
  id: string;
  label: string;
  kind?: NodeKind;
}
export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
}
export interface ArchitectureSpec {
  title: string;
  direction?: "LR" | "TD";
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export interface ADR {
  id: number;
  title: string;
  status: "proposed" | "accepted" | "superseded";
  context: string;
  decision: string;
  alternatives: string[];
  consequences: string[];
}

export interface TradeoffCriterion {
  name: string;
  weight: number; // 1..5
}
export interface TradeoffOption {
  name: string;
  scores: Record<string, number>; // criterion name -> 1..5
}
export interface TradeoffResult {
  ranking: { option: string; total: number }[];
  winner: string;
}

export interface Design {
  id: string;
  title: string;
  problem: string;
  architecture?: ArchitectureSpec;
  adrs: ADR[];
  tradeoffs?: { criteria: TradeoffCriterion[]; options: TradeoffOption[]; result: TradeoffResult };
  version: number;
  createdAt: string;
  updatedAt: string;
}
