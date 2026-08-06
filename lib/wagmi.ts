import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { redbellyMainnet, redbellyTestnet } from "@/lib/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

/**
 * wagmi config for Redbelly Network.
 * WalletConnect is only wired up when a project id is present, so the app
 * still builds and runs (MetaMask / injected) without one.
 */
export const wagmiConfig = createConfig({
  chains: [redbellyMainnet, redbellyTestnet],
  connectors: [
    injected({ shimDisconnect: true }),
    metaMask(),
    ...(projectId
      ? [
          walletConnect({
            projectId,
            showQrModal: true,
            metadata: {
              name: "Redbelly DAO",
              description: "Governance, developer, and institutional hub for Redbelly Network.",
              url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
              icons: ["/icon.svg"],
            },
          }),
        ]
      : []),
  ],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: {
    [redbellyMainnet.id]: http(),
    [redbellyTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
