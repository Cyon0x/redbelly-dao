"use client";

import { useEffect, useRef, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useSwitchChain,
  useBalance,
} from "wagmi";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Copy,
  LogOut,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, shortenAddress, formatNumber } from "@/lib/utils";
import {
  isRedbellyChain,
  redbellyMainnet,
  redbellyTestnet,
  explorerAddressUrl,
} from "@/lib/chains";

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connectors, connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();
  const { data: balance } = useBalance({ address });

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const copy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const wrongNetwork = isConnected && !isRedbellyChain(chainId);

  if (!isConnected) {
    return (
      <div className="relative" ref={ref}>
        <Button size="sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute right-0 z-50 mt-2 w-64 rounded-3xl border border-border bg-surface p-2 shadow-lift"
            >
              <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted">
                Choose a wallet
              </p>
              {connectors.map((c) => (
                <button
                  key={c.uid}
                  onClick={() => {
                    connect({ connector: c });
                    setOpen(false);
                  }}
                  disabled={isPending}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-surface-2"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-ember/12 text-ember">
                    <Wallet className="h-4 w-4" />
                  </span>
                  {c.name}
                </button>
              ))}
              {error && (
                <p className="px-3 py-2 text-xs text-ember">{error.message.split("\n")[0]}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-9 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors",
          wrongNetwork
            ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
            : "border-border bg-surface hover:border-ember",
        )}
      >
        {wrongNetwork ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        )}
        {shortenAddress(address)}
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 z-50 mt-2 w-72 rounded-3xl border border-border bg-surface p-2 shadow-lift"
          >
            <div className="rounded-2xl bg-surface-2 p-3">
              <p className="text-xs text-muted">Connected account</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-sm">{shortenAddress(address, 6)}</span>
                <button
                  onClick={copy}
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ember"
                  aria-label="Copy address"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              {balance && (
                <p className="mt-1 font-mono text-xs text-muted">
                  {formatNumber(Number(balance.formatted), { maximumFractionDigits: 4 })} {balance.symbol}
                </p>
              )}
            </div>

            {wrongNetwork && (
              <div className="mt-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3">
                <p className="flex items-center gap-1.5 text-xs font-medium text-amber-500">
                  <AlertTriangle className="h-3.5 w-3.5" /> Wrong network
                </p>
                <p className="mt-0.5 text-xs text-muted">Switch to a Redbelly network to continue.</p>
              </div>
            )}

            <div className="mt-2 space-y-1">
              <p className="px-2 pt-1 text-xs font-medium uppercase tracking-wider text-muted">Network</p>
              {[redbellyMainnet, redbellyTestnet].map((chain) => {
                const active = chainId === chain.id;
                return (
                  <button
                    key={chain.id}
                    onClick={() => switchChain({ chainId: chain.id })}
                    disabled={active || switching}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition-colors",
                      active ? "bg-ember/12 text-ember" : "text-ink hover:bg-surface-2",
                    )}
                  >
                    {chain.name.replace("Redbelly Network ", "")}
                    {active && <Check className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 border-t border-border pt-2">
              <a
                href={address ? explorerAddressUrl(isRedbellyChain(chainId) ? chainId : 151, address) : "#"}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-2"
              >
                View on Routescan
              </a>
              <button
                onClick={() => {
                  disconnect();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm text-ember transition-colors hover:bg-ember/10"
              >
                <LogOut className="h-4 w-4" /> Disconnect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
