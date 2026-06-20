// GENERATED from engine/src/adr.ts — DO NOT EDIT.
// Source of truth: engine/src. Regenerate: node engine/scripts/sync-to-web.mjs

// Architecture Decision Records (MADR-style) as markdown.

import type { ADR } from "./types";

export function renderAdr(adr: ADR): string {
  const lines = [
    `# ADR-${String(adr.id).padStart(4, "0")}: ${adr.title}`,
    "",
    `**Status:** ${adr.status}`,
    "",
    "## Context",
    adr.context,
    "",
    "## Decision",
    adr.decision,
  ];
  if (adr.alternatives.length) {
    lines.push("", "## Alternatives considered", ...adr.alternatives.map((a) => `- ${a}`));
  }
  if (adr.consequences.length) {
    lines.push("", "## Consequences", ...adr.consequences.map((c) => `- ${c}`));
  }
  return lines.join("\n");
}
