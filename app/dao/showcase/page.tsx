import type { Metadata } from "next";
import { Github, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ShowcaseGrid } from "@/features/dao/showcase-grid";
import { daoService } from "@/features/dao/service";

export const metadata: Metadata = {
  title: "Community Showcase",
  description: "Every dApp, tool, wallet, bot, and resource the Redbelly community has built — all in one place.",
};

export default async function ShowcasePage() {
  const projects = await daoService.listShowcaseProjects();

  return (
    <>
      <PageHeader
        eyebrow="Built by the Community"
        title="Community Showcase"
        description="dApps, tools, wallets, bots, and educational content built on Redbelly by the community, for the community."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "DAO", href: "/dao" },
          { label: "Community Showcase", href: "/dao/showcase" },
        ]}
      />
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-4xl border border-border bg-mesh-radial p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">Shipped something on Redbelly?</p>
            <p className="mt-1 text-sm text-muted">
              Open a PR against the showcase list, or drop a link in Discord and a working group will add it.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            
              href="https://github.com/Cyon0x/redbelly-dao"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-ink transition-colors hover:border-ember hover:text-ember"
            >
              <Github className="h-4 w-4" /> Submit via PR
            </a>
            
              href="https://discord.gg/redbelly"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-5 text-sm font-medium text-white transition-all hover:brightness-105"
            >
              <Plus className="h-4 w-4" /> Submit on Discord
            </a>
          </div>
        </div>

        <div className="mt-10">
          <ShowcaseGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
