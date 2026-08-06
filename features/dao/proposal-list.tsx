"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { StatusBadge } from "@/features/dao/status";
import type { Proposal, ProposalStatus } from "@/features/dao/types";
import { formatCompact, timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";

const filters: { key: ProposalStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "passed", label: "Passed" },
  { key: "executed", label: "Executed" },
  { key: "rejected", label: "Rejected" },
];

type Sort = "newest" | "closing" | "support";

export function ProposalList({
  proposals,
  initialFilter = "all",
}: {
  proposals: Proposal[];
  initialFilter?: ProposalStatus | "all";
}) {
  const [filter, setFilter] = useState<ProposalStatus | "all">(initialFilter);
  const [sort, setSort] = useState<Sort>("newest");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    let list = proposals.filter((p) => (filter === "all" ? true : p.status === filter));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }
    return [...list].sort((a, b) => {
      if (sort === "newest") return +new Date(b.createdAt) - +new Date(a.createdAt);
      if (sort === "closing") return +new Date(a.endsAt) - +new Date(b.endsAt);
      const supportA = a.votesFor / (a.votesFor + a.votesAgainst || 1);
      const supportB = b.votesFor / (b.votesFor + b.votesAgainst || 1);
      return supportB - supportA;
    });
  }, [proposals, filter, sort, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === f.key ? "bg-ember text-white" : "border border-border text-ink hover:border-ember",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 items-center gap-2 rounded-full border border-border px-3">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter proposals…"
              className="w-40 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 rounded-full border border-border bg-surface px-3 text-sm text-ink outline-none"
            aria-label="Sort proposals"
          >
            <option value="newest">Newest</option>
            <option value="closing">Closing soon</option>
            <option value="support">Most support</option>
          </select>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {shown.map((p, i) => {
          const total = p.votesFor + p.votesAgainst + p.votesAbstain;
          const forPct = total ? (p.votesFor / total) * 100 : 0;
          const againstPct = total ? (p.votesAgainst / total) * 100 : 0;
          const quorumPct = Math.min((total / p.quorum) * 100, 100);
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
            >
              <Link
                href={`/dao/proposals/${p.id}`}
                className="group block rounded-4xl border border-border bg-surface p-6 transition-all hover:border-ember hover:shadow-lift"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-muted">{p.id}</span>
                  <StatusBadge status={p.status} />
                  <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">{p.category}</span>
                  <span className="ml-auto text-xs text-muted">
                    {p.status === "active" ? `ends ${timeAgo(p.endsAt).replace("ago", "")}from now` : timeAgo(p.endsAt)}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight group-hover:text-ember">
                  {p.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted">{p.summary}</p>

                <div className="mt-4">
                  <div className="flex h-2 overflow-hidden rounded-full bg-surface-2">
                    <span className="bg-emerald-500" style={{ width: `${forPct}%` }} />
                    <span className="bg-ember" style={{ width: `${againstPct}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted">
                    <span>
                      <span className="text-emerald-500">{formatCompact(p.votesFor)} for</span> ·{" "}
                      <span className="text-ember">{formatCompact(p.votesAgainst)} against</span>
                    </span>
                    <span>{quorumPct.toFixed(0)}% of quorum</span>
                  </div>
                </div>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ember">
                  View proposal
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          );
        })}
        {shown.length === 0 && (
          <p className="rounded-4xl border border-dashed border-border py-16 text-center text-sm text-muted">
            No proposals match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
