import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarClock, MessagesSquare, User } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/features/dao/status";
import { VotePanel } from "@/features/dao/vote-panel";
import { daoService, daoFixtures } from "@/features/dao/service";
import { formatCompact, formatNumber } from "@/lib/utils";

export function generateStaticParams() {
  return daoFixtures.proposals.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const proposal = await daoService.getProposal(id);
  if (!proposal) return { title: "Proposal not found" };
  return { title: `${proposal.id} · ${proposal.title}`, description: proposal.summary };
}

export default async function ProposalDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = await daoService.getProposal(id);
  if (!p) notFound();

  const total = p.votesFor + p.votesAgainst + p.votesAbstain;
  const rows = [
    { label: "For", value: p.votesFor, color: "bg-emerald-500", text: "text-emerald-500" },
    { label: "Against", value: p.votesAgainst, color: "bg-ember", text: "text-ember" },
    { label: "Abstain", value: p.votesAbstain, color: "bg-muted", text: "text-muted" },
  ];

  return (
    <>
      <PageHeader
        eyebrow={p.category}
        title={p.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "DAO", href: "/dao" },
          { label: "Proposals", href: "/dao/proposals" },
          { label: p.id, href: `/dao/proposals/${p.id}` },
        ]}
      />
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={p.status} />
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <User className="h-3.5 w-3.5" /> {p.author}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <CalendarClock className="h-3.5 w-3.5" /> ends {new Date(p.endsAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-ink">{p.summary}</p>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              This proposal follows Redbelly&apos;s phased decentralisation roadmap, introducing
              independent governors and broader ecosystem representation. It was drafted in the
              working group, reviewed on the community forum, and moved on-chain once it met the
              signalling threshold.
            </p>
            <p>
              If it passes and reaches quorum, execution is handled by the governance module and
              recorded on-chain. Every parameter below is illustrative fixture data wired through a
              typed service layer — swap the service for the live governance API and this page renders
              real results unchanged.
            </p>
          </div>
          <a
            href={p.discussionUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-ember hover:text-ember"
          >
            <MessagesSquare className="h-4 w-4" /> Join the discussion
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <aside className="space-y-4">
          <div className="rounded-4xl border border-border bg-surface p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">Results</p>
            <div className="mt-4 space-y-3">
              {rows.map((r) => {
                const pct = total ? (r.value / total) * 100 : 0;
                return (
                  <div key={r.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className={r.text}>{r.label}</span>
                      <span className="font-mono text-xs text-muted">
                        {formatCompact(r.value)} · {pct.toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
                      <span className={`block h-full ${r.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 border-t border-border pt-4 text-xs text-muted">
              <div className="flex justify-between">
                <span>Quorum</span>
                <span className="font-mono">
                  {formatNumber(total)} / {formatNumber(p.quorum)}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <span
                  className="block h-full bg-ember"
                  style={{ width: `${Math.min((total / p.quorum) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <VotePanel proposalId={p.id} active={p.status === "active"} />

          <Link
            href="/dao/proposals"
            className="block rounded-4xl border border-border bg-surface px-5 py-3 text-center text-sm text-muted transition-colors hover:text-ember"
          >
            ← Back to all proposals
          </Link>
        </aside>
      </section>
    </>
  );
}
