"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ShowcaseCategory, ShowcaseProject } from "@/features/dao/types";
import { cn } from "@/lib/utils";

const categoryTone: Record<ShowcaseCategory, "green" | "amber" | "ember" | "violet" | "blue" | "neutral"> = {
  dApp: "ember",
  "Tool / SDK": "blue",
  Wallet: "violet",
  Explorer: "green",
  "Bot / Integration": "amber",
  "Content / Education": "blue",
  Infrastructure: "neutral",
};

export function ShowcaseGrid({ projects }: { projects: ShowcaseProject[] }) {
  const [category, setCategory] = useState<string>("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );
  const shown = category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              category === c ? "bg-ember text-white" : "border border-border text-ink hover:border-ember",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <motion.a
            key={p.slug}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
            className="group flex flex-col rounded-4xl border border-border bg-surface p-6 transition-colors hover:border-ember"
          >
            <div className="flex items-start justify-between gap-2">
              <Badge tone={categoryTone[p.category]}>{p.category}</Badge>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-ember" />
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight">{p.name}</h3>
            <p className="mt-2 text-sm text-muted">{p.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="font-mono text-xs text-muted">{p.builder}</span>
              {p.repoUrl && (
                <span className="inline-flex items-center gap-1 text-xs text-muted">
                  <Github className="h-3.5 w-3.5" /> Source
                </span>
              )}
            </div>
          </motion.a>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted">No projects in this category yet.</p>
      )}
    </div>
  );
}
