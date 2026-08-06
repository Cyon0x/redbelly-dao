import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, FileCheck2, Landmark, LineChart, Lock, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Institutional",
  description:
    "Enterprise due diligence for Redbelly Network: security, compliance, Project Acacia, and network metrics.",
};

const pillars = [
  {
    id: "security",
    icon: ShieldCheck,
    title: "Security",
    body: "Redbelly's consensus is built for safety in open networks, with independent governors and an ongoing bug bounty program managed by Hashlock.",
    link: { label: "Bug bounty program", href: "https://hashlock.com/bug-bounty/redbelly-network" },
  },
  {
    id: "compliance",
    icon: FileCheck2,
    title: "Compliance",
    body: "Accredited-issuer governance opens the network to additional issuers under a compliant framework — the only Layer 1 offering asset managers a fully compliant tokenisation network.",
    link: { label: "Read the whitepaper", href: "https://www.redbelly.network/redbelly-network-whitepaper" },
  },
  {
    id: "acacia",
    icon: Landmark,
    title: "Project Acacia",
    body: "A wholesale settlement pilot exploring tokenised real-world assets and digital money settlement, with public reporting ratified by the DAO.",
    link: { label: "Institutional overview", href: "https://redbelly.network/" },
  },
];

const metrics = [
  { label: "Chain ID", value: "151" },
  { label: "Native token", value: "RBNT" },
  { label: "Finality", value: "Deterministic" },
  { label: "EVM compatible", value: "Yes" },
];

export default function InstitutionalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Institutional"
        title="Due diligence, made straightforward"
        description="Everything an enterprise, issuer, or partner needs to evaluate Redbelly as compliant infrastructure for real-world assets."
        crumbs={[{ label: "Home", href: "/" }, { label: "Institutional", href: "/institutional" }]}
      />

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <div id={p.id} className="flex h-full flex-col rounded-4xl border border-border bg-surface p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-inst/10 text-inst">
                  <p.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold tracking-tight">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted">{p.body}</p>
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-inst hover:underline"
                >
                  {p.link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section id="metrics" className="mx-auto max-w-6xl px-5 pb-12 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-4xl border border-border bg-surface">
            <div className="flex items-center gap-3 border-b border-border p-6">
              <LineChart className="h-5 w-5 text-inst" />
              <h2 className="font-display text-xl font-semibold tracking-tight">Network metrics</h2>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
              {metrics.map((m) => (
                <div key={m.label} className="p-6">
                  <p className="font-display text-2xl font-semibold tracking-tight">{m.value}</p>
                  <p className="mt-1 text-sm text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Cases + contact */}
      <section id="cases" className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        <Reveal>
          <div className="grid items-center gap-8 rounded-5xl border border-border bg-mesh-radial p-8 lg:grid-cols-[1.3fr_1fr] lg:p-12">
            <div>
              <Badge tone="ember">
                <Lock className="h-3 w-3" /> Enterprise-ready
              </Badge>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Tokenise real-world assets on compliant rails
              </h2>
              <p className="mt-4 max-w-xl text-muted">
                RWA issuers can build private balances and transactions, connect smart contracts via
                simple APIs, and settle with native BTC bridging for collateral and liquidity.
              </p>
              <div id="contact" className="mt-6 flex flex-wrap gap-3">
                <a href="https://redbelly.network/" target="_blank" rel="noreferrer">
                  <span className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-5 text-sm font-medium text-white transition-all hover:brightness-105">
                    <Building2 className="h-4 w-4" /> Contact the team
                  </span>
                </a>
                <Link href="/developers">
                  <span className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-ember hover:text-ember">
                    Technical docs
                  </span>
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                "Open participation & decision-making power",
                "Full on-chain transparency",
                "Accredited-issuer governance",
                "Native BTC bridging",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-3xl border border-border bg-surface px-5 py-4 text-sm">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-inst" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
