"use client";

import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { Check, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/wallet-button";
import { isRedbellyChain } from "@/lib/chains";
import { cn } from "@/lib/utils";

type Choice = "for" | "against" | "abstain";

export function VotePanel({ proposalId, active }: { proposalId: string; active: boolean }) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [cast, setCast] = useState(false);

  const options: { key: Choice; label: string; className: string }[] = [
    { key: "for", label: "For", className: "hover:border-emerald-500 data-[on=true]:bg-emerald-500/15 data-[on=true]:border-emerald-500" },
    { key: "against", label: "Against", className: "hover:border-ember data-[on=true]:bg-ember/15 data-[on=true]:border-ember" },
    { key: "abstain", label: "Abstain", className: "hover:border-muted data-[on=true]:bg-surface-2 data-[on=true]:border-muted" },
  ];

  return (
    <div className="rounded-4xl border border-border bg-surface p-6">
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
        <Vote className="h-4 w-4" /> Cast your vote
      </p>

      {!active ? (
        <p className="mt-4 text-sm text-muted">Voting has closed for {proposalId}.</p>
      ) : !isConnected ? (
        <div className="mt-4">
          <p className="mb-3 text-sm text-muted">Connect your wallet to vote with your RBNT power.</p>
          <WalletButton />
        </div>
      ) : !isRedbellyChain(chainId) ? (
        <p className="mt-4 text-sm text-amber-500">Switch to a Redbelly network to vote.</p>
      ) : cast ? (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-500">
          <Check className="h-4 w-4" /> Vote recorded ({choice}). This is a demo — wire to the governance contract to submit.
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {options.map((o) => (
            <button
              key={o.key}
              data-on={choice === o.key}
              onClick={() => setChoice(o.key)}
              className={cn(
                "w-full rounded-2xl border border-border px-4 py-2.5 text-left text-sm font-medium transition-colors",
                o.className,
              )}
            >
              {o.label}
            </button>
          ))}
          <Button className="mt-1 w-full" disabled={!choice} onClick={() => setCast(true)}>
            Submit vote
          </Button>
        </div>
      )}
    </div>
  );
}
