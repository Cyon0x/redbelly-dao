import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/logo";

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/developers" },
      { label: "Vine Portal", href: "https://vine.redbelly.network/", external: true },
      { label: "Explorer", href: "https://redbelly.routescan.io/", external: true },
      { label: "Grants", href: "https://redbelly.network/grant", external: true },
      { label: "Bug Bounty", href: "https://hashlock.com/bug-bounty/redbelly-network", external: true },
    ],
  },
  {
    title: "DAO",
    links: [
      { label: "Governance", href: "/dao" },
      { label: "Proposals", href: "/dao/proposals" },
      { label: "Treasury", href: "/dao/treasury" },
      { label: "Task Board", href: "/dao/tasks" },
      { label: "Community Showcase", href: "/dao/showcase" },
    ],
  },
  {
    title: "Institutional",
    links: [
      { label: "Security", href: "/institutional#security" },
      { label: "Compliance", href: "/institutional#compliance" },
      { label: "Project Acacia", href: "/institutional#acacia" },
      { label: "Metrics", href: "/institutional#metrics" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/redbelly", external: true },
      { label: "X · DAO", href: "https://x.com/RedbellyDAO", external: true },
      { label: "X · Network", href: "https://x.com/RedbellyNetwork", external: true },
      { label: "Whitepaper", href: "https://www.redbelly.network/redbelly-network-whitepaper", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Community-led governance for Redbelly Network — the compliant Layer 1 for real-world
              asset tokenisation.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noreferrer" className="text-sm text-ink transition-colors hover:text-ember">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-ink transition-colors hover:text-ember">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Redbelly DAO · Community project. Not affiliated financial advice.
          </p>
          <a href="#top" className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-ember">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
