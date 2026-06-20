// Architecture diagrams as Mermaid (diagram-as-code), plus a few starter patterns.

import type { ArchitectureSpec, NodeKind } from "./types.ts";

// Node shapes by kind (Mermaid syntax).
function shape(label: string, kind?: NodeKind): string {
  const safe = label.replace(/"/g, "'");
  switch (kind) {
    case "db":
      return `[("${safe}")]`; // cylinder
    case "cache":
      return `[["${safe}"]]`; // subroutine
    case "queue":
      return `>"${safe}"]`; // asymmetric
    case "client":
      return `(["${safe}"])`; // stadium
    case "external":
      return `{{"${safe}"}}`; // hexagon
    default:
      return `["${safe}"]`; // rectangle
  }
}

export function toMermaid(spec: ArchitectureSpec): string {
  const lines = [`flowchart ${spec.direction ?? "LR"}`];
  for (const n of spec.nodes) lines.push(`  ${n.id}${shape(n.label, n.kind)}`);
  for (const e of spec.edges) lines.push(`  ${e.from} -->${e.label ? `|${e.label}|` : ""} ${e.to}`);
  return lines.join("\n");
}

// Named starter patterns the assistant can drop in and iterate on.
export function pattern(name: "scalable-web" | "event-driven"): ArchitectureSpec {
  if (name === "event-driven") {
    return {
      title: "Event-driven pipeline",
      direction: "LR",
      nodes: [
        { id: "prod", label: "Producer", kind: "service" },
        { id: "q", label: "Event queue", kind: "queue" },
        { id: "cons", label: "Consumer", kind: "service" },
        { id: "db", label: "Store", kind: "db" },
      ],
      edges: [
        { from: "prod", to: "q", label: "publish" },
        { from: "q", to: "cons", label: "consume" },
        { from: "cons", to: "db", label: "persist" },
      ],
    };
  }
  return {
    title: "Scalable web service",
    direction: "LR",
    nodes: [
      { id: "client", label: "Client", kind: "client" },
      { id: "cdn", label: "CDN", kind: "external" },
      { id: "lb", label: "Load balancer", kind: "service" },
      { id: "app", label: "App servers", kind: "service" },
      { id: "cache", label: "Cache", kind: "cache" },
      { id: "db", label: "Primary DB", kind: "db" },
    ],
    edges: [
      { from: "client", to: "cdn" },
      { from: "cdn", to: "lb" },
      { from: "lb", to: "app" },
      { from: "app", to: "cache", label: "read" },
      { from: "app", to: "db", label: "read/write" },
    ],
  };
}
