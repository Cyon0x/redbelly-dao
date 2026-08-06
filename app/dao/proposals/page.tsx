import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProposalList } from "@/features/dao/proposal-list";
import { daoService } from "@/features/dao/service";
import type { ProposalStatus } from "@/features/dao/types";

export const metadata: Metadata = {
  title: "Proposals",
  description: "Browse, filter, and track every Redbelly DAO governance proposal.",
};

export default async function ProposalsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const proposals = await daoService.listProposals();
  const valid: ProposalStatus[] = ["active", "passed", "executed", "rejected", "pending"];
  const initial = filter && valid.includes(filter as ProposalStatus) ? (filter as ProposalStatus) : "all";

  return (
    <>
      <PageHeader
        eyebrow="Governance"
        title="Proposals"
        description="Every decision the DAO makes, with live vote tallies and quorum tracking."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "DAO", href: "/dao" },
          { label: "Proposals", href: "/dao/proposals" },
        ]}
      />
      <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <ProposalList proposals={proposals} initialFilter={initial} />
      </section>
    </>
  );
}
