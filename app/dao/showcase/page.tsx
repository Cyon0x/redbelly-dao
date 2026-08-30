import type { Metadata } from "next";
import { Github, MessageCircle, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ShowcaseGrid } from "@/features/dao/showcase-grid";
import { ShowcaseSubmit } from "@/features/dao/showcase-submit";
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
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-1">
          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full border-[24px] border-ember/10" />
          <div className="relative grid gap-6 rounded-[1.75rem] bg-mesh-radial p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">Community signal / open channel</p>
              <p className="mt-3 font-display text-2xl font-semibold tracking-tight">Shipped something on Redbelly?</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Add your project to the community map. Use the submission form below, or go straight to Discord if you would rather talk to the community first.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#submit-project" className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-5 text-sm font-semibold text-white transition-all hover:brightness-105">
                <Plus className="h-4 w-4" /> Submit a project
              </a>
              <a href="https://discord.gg/redbelly" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-ember hover:text-ember">
                <MessageCircle className="h-4 w-4" /> Open Discord
              </a>
            </div>
          </div>
        </div>

        <div id="submit-project">
          <ShowcaseSubmit />
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Community registry</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">What the community is shipping</h2>
          </div>
          <a href="https://github.com/Cyon0x/redbelly-dao" target="_blank" rel="noreferrer" className="hidden shrink-0 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ember sm:inline-flex">
            <Github className="h-4 w-4" /> View repository
          </a>
        </div>

        <div className="mt-6">
          <ShowcaseGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
