import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Boxes, Compass, FileCode2, Shield, Sprout, Terminal } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { AddNetworkButton } from "@/components/add-network-button";
import { redbellyMainnet, redbellyTestnet } from "@/lib/chains";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Build on Redbelly Network: documentation, SDKs, API reference, testnet, faucet, grants, and bug bounty.",
};

const sdkSnippet = `import { createPublicClient, http } from "viem";
import { redbellyMainnet } from "@/lib/chains";

const client = createPublicClient({
  chain: redbellyMainnet,
  transport: http(), // https://governors.mainnet.redbelly.network
});

const block = await client.getBlockNumber();`;

const resources = [
  { label: "Vine Developer Portal", href: "https://vine.redbelly.network/", desc: "Node operations, network status, technical specs.", icon: Terminal },
  { label: "Explorer (Routescan)", href: "https://redbelly.routescan.io/", desc: "Inspect blocks, transactions, and contracts.", icon: Compass },
  { label: "Grants Program", href: "https://redbelly.network/grant", desc: "Funding for teams building on Redbelly.", icon: Sprout },
  { label: "Bug Bounty", href: "https://hashlock.com/bug-bounty/redbelly-network", desc: "Report vulnerabilities via Hashlock.", icon: Shield },
];

export default function DevelopersPage() {
  const rows = [
    { k: "Network name", m: redbellyMainnet.name, t: redbellyTestnet.name },
    { k: "Chain ID", m: String(redbellyMainnet.id), t: String(redbellyTestnet.id) },
    { k: "RPC URL", m: redbellyMainnet.rpcUrls.default.http[0], t: redbellyTestnet.rpcUrls.default.http[0] },
    { k: "Currency", m: "RBNT (18)", t: "RBNT (18)" },
    { k: "Explorer", m: redbellyMainnet.blockExplorers.default.url, t: redbellyTestnet.blockExplorers.default.url },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Developers"
        title="Build on Redbelly"
        description="A compliant Layer 1 for real-world assets, with EVM tooling you already know. Here is everything you need to ship."
        crumbs={[{ label: "Home", href: "/" }, { label: "Developers", href: "/developers" }]}
      />

      {/* Network config */}
      <section id="testnet" className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-4xl border border-border bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-6">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Network configuration</h2>
                <p className="mt-1 text-sm text-muted">Verified parameters. Add either network to your wallet in one click.</p>
              </div>
              <div className="flex gap-2">
                <AddNetworkButton which="mainnet" />
                <AddNetworkButton which="testnet" />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_1.4fr_1.4fr] gap-4 px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted">
              <span />
              <span>Mainnet</span>
              <span>Testnet</span>
            </div>
            {rows.map((r) => (
              <div key={r.k} className="grid grid-cols-[1fr_1.4fr_1.4fr] gap-4 border-t border-border px-6 py-3">
                <span className="text-sm text-muted">{r.k}</span>
                <span className="break-all font-mono text-sm">{r.m}</span>
                <span className="break-all font-mono text-sm">{r.t}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SDK + API */}
      <section id="sdks" className="mx-auto max-w-6xl px-5 pb-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-4xl border border-border bg-surface p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-dev/10 text-dev">
                <FileCode2 className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">SDKs & viem</h3>
              <p className="mt-1 text-sm text-muted">
                Redbelly is EVM-compatible — use viem, wagmi, ethers, or thirdweb. The chain object ships in this repo.
              </p>
              <pre className="scroll-thin mt-4 overflow-x-auto rounded-2xl bg-surface-2 p-4 font-mono text-xs leading-relaxed text-ink">
{sdkSnippet}
              </pre>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div id="api" className="flex h-full flex-col rounded-4xl border border-border bg-surface p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-dev/10 text-dev">
                <Boxes className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">Testnet & faucet</h3>
              <p className="mt-1 text-sm text-muted">
                Chain 153 mirrors mainnet. Grab RBNT from the faucet, deploy, and iterate before going live.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Standard JSON-RPC over HTTPS", "eth_* + net_* method support", "Same contracts as mainnet", "Governor-rotated RPC endpoints"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-dev" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://vine.redbelly.network/"
                target="_blank"
                rel="noreferrer"
                className="mt-auto pt-4 text-sm font-medium text-dev hover:underline"
              >
                Open the Vine portal →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Resources */}
      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Ecosystem resources</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {resources.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-4xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-ember hover:shadow-lift"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface-2 text-ink group-hover:bg-ember/10 group-hover:text-ember">
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="flex items-center gap-1 font-display font-semibold tracking-tight">
                    {r.label} <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
                  </p>
                  <p className="mt-1 text-sm text-muted">{r.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 rounded-4xl border border-border bg-mesh-radial p-6 text-sm">
            <span className="text-muted">Built something? </span>
            <Link href="https://redbelly.network/grant" className="font-medium text-ember hover:underline">
              Apply for a grant
            </Link>
            <span className="text-muted"> — then bring it to </span>
            <Link href="/dao/proposals" className="font-medium text-ember hover:underline">
              governance
            </Link>
            <span className="text-muted">.</span>
          </div>
        </Reveal>
      </section>
    </>
  );
}
