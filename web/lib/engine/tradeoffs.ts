// GENERATED from engine/src/tradeoffs.ts — DO NOT EDIT.
// Source of truth: engine/src. Regenerate: node engine/scripts/sync-to-web.mjs

// Tradeoff analysis — a weighted decision matrix over options × criteria.

import type { TradeoffCriterion, TradeoffOption, TradeoffResult } from "./types";

export function analyze(criteria: TradeoffCriterion[], options: TradeoffOption[]): TradeoffResult {
  const ranking = options
    .map((o) => ({
      option: o.name,
      total: criteria.reduce((sum, c) => sum + (o.scores[c.name] ?? 0) * c.weight, 0),
    }))
    .sort((a, b) => b.total - a.total);
  return { ranking, winner: ranking[0]?.option ?? "" };
}

export function renderTradeoffs(criteria: TradeoffCriterion[], options: TradeoffOption[]): string {
  const result = analyze(criteria, options);
  const header = `| Option | ${criteria.map((c) => `${c.name} (×${c.weight})`).join(" | ")} | **Total** |`;
  const sep = `|${"---|".repeat(criteria.length + 2)}`;
  const rows = options.map(
    (o) =>
      `| ${o.name} | ${criteria.map((c) => o.scores[c.name] ?? 0).join(" | ")} | **${criteria.reduce((s, c) => s + (o.scores[c.name] ?? 0) * c.weight, 0)}** |`,
  );
  return [header, sep, ...rows, "", `**Recommendation:** ${result.winner}`].join("\n");
}
