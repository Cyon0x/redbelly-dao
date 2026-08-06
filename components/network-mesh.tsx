"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * The governance mesh: independent "governor" nodes connected by flowing links.
 * Deterministic layout (seeded) so SSR and client render identically.
 */

type Node = { id: number; x: number; y: number; r: number; d: number };
type Edge = { a: number; b: number };

function build(seed: number): { nodes: Node[]; edges: Edge[] } {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const nodes: Node[] = Array.from({ length: 22 }, (_, id) => ({
    id,
    x: 6 + rand() * 88,
    y: 8 + rand() * 84,
    r: 1.6 + rand() * 2.6,
    d: rand() * 3,
  }));
  const edges: Edge[] = [];
  nodes.forEach((n, i) => {
    const partners = nodes
      .map((m, j) => ({ j, dist: Math.hypot(n.x - m.x, n.y - m.y) }))
      .filter((p) => p.j !== i)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 2);
    partners.forEach((p) => {
      if (!edges.some((e) => (e.a === p.j && e.b === i) || (e.a === i && e.b === p.j))) {
        edges.push({ a: i, b: p.j });
      }
    });
  });
  return { nodes, edges };
}

export function NetworkMesh({ className }: { className?: string }) {
  const { nodes, edges } = useMemo(() => build(7), []);
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <g stroke="hsl(var(--ember))" strokeWidth="0.18" opacity="0.5">
        {edges.map((e, i) => {
          const a = nodes[e.a];
          const b = nodes[e.b];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              strokeDasharray="1.4 2.4"
              className="animate-dash"
              style={{ animationDelay: `${(i % 6) * 0.2}s` }}
            />
          );
        })}
      </g>
      <g>
        {nodes.map((n) => (
          <circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="hsl(var(--ember))"
            className="animate-pulse-node"
            style={{ animationDelay: `${n.d}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
