import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Code2,
  Coins,
  Gavel,
  LayoutGrid,
  ListChecks,
  ScrollText,
  Users,
} from "lucide-react";
import { NetworkMesh } from "@/components/network-mesh";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { daoService } from "@/features/dao/service";
import { formatCompact } from "@/lib/utils";

const pathways = [
  {
    key: "developers",
    label: "Developers",
    accentText: "text-dev",
    accentBg: "bg-dev/10",
    ring: "hover:border-dev/50",
    icon: Code2,
    blurb: "Docs, SDKs, testnet, grants, and the tools to ship on Redbelly.",
    href: "/developers",
    links: ["Documentation", "SDKs & API", "Testnet + Faucet", "Grants & Bug Bounty"],
  },
  {
    key: "dao",
    label: "DAO Members",
    accentText: "text-gov",
    accentBg: "bg-gov/10",
    ring: "hover:border-gov/50",
    icon: Gavel,
    blurb: "Vote on proposals, steward the treasury, and claim contributor rewards.",
    href: "/dao",
    links: ["Proposals & Voting", "Treasury", "Task Board", "Working Groups"],
  },
  {
    key: "institutional",
    label: "Institutional",
    accentText: "text-inst",
    accentBg: "bg-inst/10",
    ring: "hover:border-inst/50",
    icon: Building2,
    blurb: "Security, compliance, and case studies for enterprise due diligence.",
    href: "/institutional",
    links: ["Security & Audits", "Compliance", "Project Acacia", "Network Metrics"],
  },
];

export default async function HomePage() {
  const metrics = await daoService.metrics();

  const stats = [
    { label: "Treasury", value: `$${formatCompact(metrics.treasuryUsd)}`, icon: Coins, href: "/dao/treasury" },
    { label: "Active proposals", value: String(metrics.activeProposals), icon: ScrollText, href: "/dao/proposals?filter=active" },
    { label: "Open tasks", value: String(metrics.openTasks), icon: ListChecks, href: "/dao/tasks" },
    { label: "Contributors", value: formatCompact(metrics.contributors), icon: Users, href: "/dao#working-groups" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <div className="absolute right-[-10%] top-[-15%] h-[70vh] w-[70vh] max-w-[820px]">
            <NetworkMesh />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div className="max-w-2xl">
            <Reveal>
              <Badge tone="ember">
                <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                RBN Governance DAO · Live
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Govern the network
                <br />
                that tokenises
                <br />
                <span className="text-ember">the real world.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-muted">
                Redbelly is a compliant Layer 1 built for real-world assets. This is where its
                community builds, decides, and stewards it — three doors, no dead ends.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/dao/proposals">
                  <Button size="lg">
                    Explore governance <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/developers">
                  <Button size="lg" variant="outline">
                    Start building
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Live metrics panel */}
          <Reveal delay={0.2} className="lg:pt-6">
            <div className="rounded-4xl border border-border bg-surface/70 p-2 shadow-lift backdrop-blur-xl">
              <div className="rounded-[1.6rem] bg-mesh-radial p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  Network pulse
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="group rounded-3xl border border-border bg-surface p-4 transition-colors hover:border-ember"
                    >
                      <s.icon className="h-5 w-5 text-ember" />
                      <p className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.value}</p>
                      <p className="flex items-center gap-1 text-xs text-muted">
                        {s.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </p>
                    </Link>
                  ))}
                </div>
                <p className="mt-4 font-mono text-[11px] text-muted">
                  chain 151 · mainnet · RBNT
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Three pathways */}
      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Choose your path
            </h2>
            <p className="hidden text-sm text-muted sm:block">Everything is two clicks away.</p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pathways.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08}>
              <Link
                href={p.href}
                className={`group flex h-full flex-col rounded-4xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${p.ring}`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${p.accentBg} ${p.accentText}`}>
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{p.label}</h3>
                <p className="mt-2 text-sm text-muted">{p.blurb}</p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {p.links.map((l) => (
                    <li key={l} className="flex items-center gap-2 text-sm text-ink">
                      <span className={`h-1.5 w-1.5 rounded-full ${p.accentBg}`} />
                      {l}
                    </li>
                  ))}
                </ul>
                <span className={`mt-6 inline-flex items-center gap-1 text-sm font-medium ${p.accentText}`}>
                  Enter
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DAO + Community Showcase orbit */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <Reveal>
          <div className="relative min-h-[430px] overflow-hidden rounded-[2.75rem] border border-border bg-black px-6 py-10 text-white sm:px-10 lg:px-14">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ember/25" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_70px_22px_rgba(255,31,43,0.35)]" />

            <div className="relative z-10 max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">DAO command layer</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                Two places to build, decide and be seen.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/60 sm:text-base">
                Governance is where the community decides. The Showcase is where the community ships. Both are now first-class destinations from the homepage.
              </p>
            </div>

            <Link
              href="/dao"
              className="group absolute bottom-9 left-6 z-10 w-[calc(100%-3rem)] max-w-sm -rotate-2 rounded-[2rem] border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:border-ember/70 sm:left-10 sm:w-72 lg:bottom-10 lg:left-auto lg:right-16"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ember/15 text-ember"><Gavel className="h-5 w-5" /></span>
                <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-ember" />
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">01 / GOVERN</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">Enter the DAO</h3>
              <p className="mt-2 text-sm text-white/55">Proposals, voting, treasury, tasks and working groups.</p>
            </Link>

            <Link
              href="/dao/showcase"
              className="group absolute bottom-9 right-6 z-10 w-[calc(100%-3rem)] max-w-sm rotate-2 rounded-[2rem] border border-ember/35 bg-ember/[0.08] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:border-ember sm:right-10 sm:w-72 lg:bottom-28 lg:right-64"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ember text-white"><LayoutGrid className="h-5 w-5" /></span>
                <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ember">02 / SHIP</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">Community Showcase</h3>
              <p className="mt-2 text-sm text-white/55">Discover the dApps, tools and products built by Redbelly contributors.</p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Cross-link band */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-5xl border border-border bg-surface">
            <div className="grid items-center gap-8 p-8 lg:grid-cols-[1.4fr_1fr] lg:p-12">
              <div>
                <Badge tone="ember">One connected ecosystem</Badge>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Docs lead to SDKs. SDKs lead to grants.
                  <br className="hidden sm:block" /> Grants lead to governance.
                </h2>
                <p className="mt-4 max-w-xl text-muted">
                  Every page links to the next logical step, so a first-time reader can go from a
                  tutorial to a funded proposal without hunting through menus.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Documentation", "SDK", "Grant", "Proposal", "Community"].map((chip, i, arr) => (
                    <span key={chip} className="flex items-center gap-2">
                      <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium">
                        {chip}
                      </span>
                      {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted" />}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {[
                  { label: "Read the docs", href: "/developers", icon: Code2 },
                  { label: "Browse proposals", href: "/dao/proposals", icon: ScrollText },
                  { label: "Institutional brief", href: "/institutional", icon: Building2 },
                ].map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="group flex items-center justify-between rounded-3xl border border-border bg-surface-2 px-5 py-4 transition-colors hover:border-ember"
                  >
                    <span className="flex items-center gap-3 text-sm font-medium">
                      <c.icon className="h-4 w-4 text-ember" />
                      {c.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
