import { defineChain } from "viem";

/**
 * Redbelly Network chain definitions.
 * Parameters verified against the official Redbelly developer portal (vine.redbelly.network),
 * ethereum-lists/chains, and Routescan. Native gas token: RBNT (18 decimals), SLIP-44 824.
 */

export const redbellyMainnet = defineChain({
  id: 151,
  name: "Redbelly Network Mainnet",
  nativeCurrency: { name: "Redbelly Native Token", symbol: "RBNT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://governors.mainnet.redbelly.network"] },
    public: { http: ["https://governors.mainnet.redbelly.network"] },
  },
  blockExplorers: {
    default: { name: "Routescan", url: "https://redbelly.routescan.io" },
  },
  testnet: false,
});

export const redbellyTestnet = defineChain({
  id: 153,
  name: "Redbelly Network Testnet",
  nativeCurrency: { name: "Redbelly Native Token", symbol: "RBNT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://governors.testnet.redbelly.network"] },
    public: { http: ["https://governors.testnet.redbelly.network"] },
  },
  blockExplorers: {
    default: { name: "Routescan", url: "https://redbelly.testnet.routescan.io" },
  },
  testnet: true,
});

export const REDBELLY_CHAINS = [redbellyMainnet, redbellyTestnet] as const;
export const REDBELLY_CHAIN_IDS = REDBELLY_CHAINS.map((c) => c.id);

export function isRedbellyChain(chainId?: number): boolean {
  return chainId !== undefined && REDBELLY_CHAIN_IDS.includes(chainId as 151 | 153);
}

export function explorerAddressUrl(chainId: number, address: string): string {
  const chain = REDBELLY_CHAINS.find((c) => c.id === chainId) ?? redbellyMainnet;
  return `${chain.blockExplorers.default.url}/address/${address}`;
}
