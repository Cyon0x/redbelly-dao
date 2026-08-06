import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Coins, Gavel, ListChecks, ScrollText, Users, Vote } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { daoService } from "@/features/dao/service";
import { formatCompact } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Governance",
  description: "Vote on proposals, steward the treasury, and organise in working groups on Redbelly DAO.",
};

const modules = [
  { title: "Proposals", desc: "Read, filter, and track every governance proposal.", href: "/dao/proposals", icon: ScrollText },
  { title: "Voting & Delegation", desc: "Cast votes or delegate your RBNT voting power.", href: "/dao/proposals?filter=active", icon: Vote },
  { title: "Treasury", desc: "A live view of on-chain assets, runway, and outflows.", href: "/dao/treasury", icon: Coins },
  { title: "Task Board", desc: "Claim contributor bounties and earn RBNT rewards.", href: "/dao/tasks", icon: ListChecks },
];

export default async function DaoPage() {
  const [metrics, groups] = await Promise.all([
    daoService.metrics(),
    daoService.listWorkingGroups(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="DAO Members"
        title="Participate in Redbelly governance"
        description="Redbelly is moving to phased, community-led decision-making. Here is everything you need to have a voice."
        crumbs={[{ label: "Home", href: "/" }, { label: "DAO", href: "/dao" }]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Treasury", value: `$${formatCompact(metrics.treasuryUsd)}` },
            { label: "Active proposals", value: metrics.activeProposals },
            { label: "Open tasks", value: metrics.openTasks },
            { label: "Contributors", value: metrics.contributors },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="rounded-3xl border border-border bg-surface p-5">
                <p className="font-display text-3xl font-semibold tracking-tight text-ember">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06}>
              <Link
                href={m.href}
                className="group flex items-start gap-4 rounded-4xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-ember hover:shadow-lift"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gov/10 text-gov">
                  <m.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted">{m.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="working-groups" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-ember" />
            <h2 className="font-display text-2xl font-semibold tracking-tight">Working groups</h2>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.05}>
              <div className="rounded-4xl border border-border bg-surface p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{g.name}</h3>
                  <Badge tone="ember">{g.openTasks} open</Badge>
                </div>
                <p className="mt-2 text-sm text-muted">{g.mandate}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
                  <span className="font-mono">{g.lead}</span>
                  <span>{g.contributors} contributors</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-6 flex items-center gap-2 text-sm">
            <Gavel className="h-4 w-4 text-ember" />
            <span className="text-muted">Ready to contribute?</span>
            <Link href="/dao/tasks" className="font-medium text-ember hover:underline">
              Browse the task board →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
