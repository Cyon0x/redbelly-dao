"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { redbellyMainnet, redbellyTestnet } from "@/lib/chains";
import { cn } from "@/lib/utils";

const chains = { mainnet: redbellyMainnet, testnet: redbellyTestnet };

export function AddNetworkButton({ which = "mainnet" }: { which?: "mainnet" | "testnet" }) {
  const chain = chains[which];
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  const add = async () => {
    const eth = (typeof window !== "undefined" ? (window as unknown as { ethereum?: { request: (a: unknown) => Promise<unknown> } }).ethereum : undefined);
    if (!eth) {
      setState("error");
      return;
    }
    try {
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${chain.id.toString(16)}`,
            chainName: chain.name,
            nativeCurrency: chain.nativeCurrency,
            rpcUrls: chain.rpcUrls.default.http,
            blockExplorerUrls: [chain.blockExplorers.default.url],
          },
        ],
      });
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <button
      onClick={add}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        state === "done"
          ? "border-emerald-500 text-emerald-500"
          : "border-border hover:border-ember hover:text-ember",
      )}
    >
      {state === "done" ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {state === "done" ? "Added" : state === "error" ? "Install MetaMask" : `Add ${which}`}
    </button>
  );
}
