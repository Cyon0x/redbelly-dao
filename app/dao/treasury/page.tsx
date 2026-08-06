import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { daoService } from "@/features/dao/service";
import { formatCompact, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Treasury",
  description: "A live view of Redbelly DAO's on-chain treasury: assets, runway, and outflows.",
};

export default async function TreasuryPage() {
  const t = await daoService.getTreasury();

  return (
    <>
      <PageHeader
        eyebrow="Transparency"
        title="Treasury"
        description="Every asset the DAO holds, updated from on-chain balances. Fixture data today; swap the service for a live balances feed."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "DAO", href: "/dao" },
          { label: "Treasury", href: "/dao/treasury" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Reveal>
            <div className="rounded-4xl border border-border bg-surface p-6 sm:col-span-1">
              <p className="text-sm text-muted">Total value</p>
              <p className="mt-2 font-display text-4xl font-semibold tracking-tight">
                ${formatCompact(t.totalUsd)}
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-emerald-500">
                <TrendingUp className="h-4 w-4" /> +{t.change30d}% · 30d
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-4xl border border-border bg-surface p-6">
              <p className="text-sm text-muted">Monthly outflow</p>
              <p className="mt-2 font-display text-4xl font-semibold tracking-tight">
                ${formatCompact(t.monthlyOutflowUsd)}
              </p>
              <p className="mt-2 text-sm text-muted">Grants, bounties, ops</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-4xl border border-border bg-surface p-6">
              <p className="text-sm text-muted">Runway</p>
              <p className="mt-2 font-display text-4xl font-semibold tracking-tight">{t.runwayMonths} mo</p>
              <p className="mt-2 text-sm text-muted">At current outflow</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 overflow-hidden rounded-4xl border border-border bg-surface">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr] gap-4 border-b border-border px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted">
              <span>Asset</span>
              <span className="text-right">Balance</span>
              <span className="text-right">Value</span>
              <span className="text-right">24h</span>
            </div>
            {t.assets.map((a) => (
              <div
                key={a.symbol}
                className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr] items-center gap-4 border-b border-border px-6 py-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ember/10 font-mono text-xs font-semibold text-ember">
                    {a.symbol.slice(0, 3)}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{a.symbol}</p>
                    <p className="text-xs text-muted">{a.name}</p>
                  </div>
                </div>
                <span className="text-right font-mono text-sm">{formatNumber(a.balance)}</span>
                <span className="text-right font-mono text-sm">${formatCompact(a.usdValue)}</span>
                <span
                  className={`flex items-center justify-end gap-0.5 text-right font-mono text-sm ${
                    a.change24h > 0 ? "text-emerald-500" : a.change24h < 0 ? "text-ember" : "text-muted"
                  }`}
                >
                  {a.change24h > 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : a.change24h < 0 ? <ArrowDownRight className="h-3.5 w-3.5" /> : null}
                  {Math.abs(a.change24h)}%
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
