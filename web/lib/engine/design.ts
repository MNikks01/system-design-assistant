// GENERATED from engine/src/design.ts — DO NOT EDIT.
// Source of truth: engine/src. Regenerate: node engine/scripts/sync-to-web.mjs

// Design memory — persist + iterate designs, and render a full design document.

import { randomUUID } from "node:crypto";
import { toMermaid } from "./diagram";
import { renderAdr } from "./adr";
import { renderTradeoffs } from "./tradeoffs";
import type { Design } from "./types";

export class DesignStore {
  private designs = new Map<string, Design>();

  create(input: { title: string; problem: string }): Design {
    const now = new Date().toISOString();
    const design: Design = {
      id: randomUUID(),
      title: input.title,
      problem: input.problem,
      adrs: [],
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.designs.set(design.id, design);
    return design;
  }

  get(id: string): Design | undefined {
    return this.designs.get(id);
  }
  list(): Design[] {
    return [...this.designs.values()];
  }

  // Iterate a design (bumps version). Returns the updated design.
  update(id: string, patch: Partial<Omit<Design, "id" | "version" | "createdAt">>): Design {
    const d = this.designs.get(id);
    if (!d) throw new Error(`design not found: ${id}`);
    Object.assign(d, patch);
    d.version += 1;
    d.updatedAt = new Date().toISOString();
    return d;
  }
}

export function renderDesignDoc(d: Design): string {
  const lines = [`# ${d.title}`, "", `_Design v${d.version}_`, "", "## Problem", d.problem];

  if (d.architecture) {
    lines.push("", "## Architecture", "```mermaid", toMermaid(d.architecture), "```");
  }
  if (d.tradeoffs) {
    lines.push("", "## Tradeoffs", renderTradeoffs(d.tradeoffs.criteria, d.tradeoffs.options));
  }
  if (d.adrs.length) {
    lines.push("", "## Decisions");
    for (const adr of d.adrs) lines.push("", renderAdr(adr));
  }
  return lines.join("\n");
}
