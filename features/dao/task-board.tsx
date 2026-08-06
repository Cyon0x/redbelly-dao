"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Task, TaskDifficulty } from "@/features/dao/types";
import { cn, formatNumber } from "@/lib/utils";

const diffTone: Record<TaskDifficulty, "green" | "amber" | "ember"> = {
  Beginner: "green",
  Intermediate: "amber",
  Advanced: "ember",
};

const statusLabel: Record<Task["status"], string> = {
  open: "Open",
  claimed: "Claimed",
  review: "In review",
  done: "Done",
};

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  const [group, setGroup] = useState<string>("All");
  const groups = useMemo(() => ["All", ...Array.from(new Set(tasks.map((t) => t.workingGroup)))], [tasks]);
  const shown = group === "All" ? tasks : tasks.filter((t) => t.workingGroup === group);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              group === g ? "bg-ember text-white" : "border border-border text-ink hover:border-ember",
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {shown.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
            className="flex flex-col rounded-4xl border border-border bg-surface p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted">{t.id}</span>
              <Badge tone={t.status === "open" ? "green" : t.status === "done" ? "neutral" : "amber"}>
                {statusLabel[t.status]}
              </Badge>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight">{t.title}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge tone={diffTone[t.difficulty]}>{t.difficulty}</Badge>
              <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">{t.workingGroup}</span>
              {t.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-ember">
                <Coins className="h-4 w-4" /> {formatNumber(t.rewardRbnt)} RBNT
              </span>
              {t.claimedBy ? (
                <span className="font-mono text-xs text-muted">{t.claimedBy}</span>
              ) : (
                <button className="rounded-full bg-ember px-4 py-1.5 text-sm font-medium text-white transition-all hover:brightness-105">
                  Claim
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
