# Redbelly DAO

A next-generation governance, developer, and institutional hub for **Redbelly Network** — the compliant Layer 1 for real-world asset tokenisation. Built with Next.js (App Router), TypeScript, Tailwind, Framer Motion, and wagmi/viem.

> This is a working web application, not a mockup. It builds clean, ships to Vercel, and connects real wallets to the **verified** Redbelly network configuration.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: add a WalletConnect project id
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Both `npm run build` and `npm run typecheck` pass with zero errors, and `npm run lint` is clean.

---

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | No | Enables the WalletConnect option. Get one free at [cloud.reown.com](https://cloud.reown.com). Without it, MetaMask / injected wallets still work and the WC option is simply hidden. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for SEO metadata and the sitemap. Set to your Vercel domain in production. |

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel — it auto-detects Next.js, no config needed.
3. Add the two env vars above in **Project → Settings → Environment Variables**.
4. Deploy. The `sitemap.xml` and `robots.txt` are generated automatically.

---

## Verified network configuration

Chain parameters are confirmed against the Redbelly developer portal, `ethereum-lists/chains`, and Routescan — not guessed. Defined once in [`lib/chains.ts`](lib/chains.ts) and reused everywhere.

| | Mainnet | Testnet |
| --- | --- | --- |
| Chain ID | `151` | `153` |
| RPC | `https://governors.mainnet.redbelly.network` | `https://governors.testnet.redbelly.network` |
| Currency | RBNT (18) | RBNT (18) |
| Explorer | `https://redbelly.routescan.io` | `https://redbelly.testnet.routescan.io` |

---

## Architecture

```
app/                  App Router routes (home, developers, dao/*, institutional)
  layout.tsx          Root layout: SEO metadata, JSON-LD, providers, nav, footer, ⌘K
  providers.tsx       wagmi + react-query + next-themes
  sitemap.ts robots.ts
components/            Navbar (mega menu + mobile), footer, wallet button, command menu,
                      theme toggle, network mesh (signature motif), UI primitives
features/dao/          DAO domain: types, service layer, proposal list, task board, vote panel
lib/                  chains.ts (verified), wagmi.ts, utils.ts
```

### The service layer pattern
Every DAO screen reads from [`features/dao/service.ts`](features/dao/service.ts), which exposes an **async API** (`listProposals`, `getTreasury`, `listTasks`, …) backed by typed fixtures today. To go live, replace each function body with a `fetch()` to the governance API / subgraph — **the UI never changes.**

---

## What works right now

- **Wallet**: connect / disconnect / copy address / balance, one-click network switch, wrong-network detection, and `wallet_addEthereumChain` to add Redbelly. Session persists via cookie storage.
- **Navigation**: animated desktop mega menu, dedicated mobile sheet, everything ≤ 2 clicks from home.
- **Global search**: ⌘K / Ctrl-K, indexes nav, pages, proposals, treasury, and tasks.
- **DAO**: governance hub, filter/sort/search proposal list, proposal detail with live tallies + quorum, wallet-gated voting, treasury dashboard, task board.
- **Developers**: verified network table, add-to-wallet buttons, viem snippet, ecosystem links.
- **Institutional**: security, compliance, Project Acacia, metrics, contact.
- **Foundations**: dark/light with system detection + persistence, SEO metadata + OG/Twitter + JSON-LD + sitemap/robots, reduced-motion support, keyboard focus, skip link, responsive to mobile.

## Roadmap (same patterns, drop-in)

These extend the established components/service layer without new architecture:
- Governance calendar + delegation management screen
- Real governance contract writes (replace the demo submit in `vote-panel.tsx`)
- Live data adapters in `service.ts` (subgraph / REST)
- Per-working-group detail routes
- MDX-powered documentation section
- Playwright a11y + e2e tests, and self-hosted fonts via `next/font/local`

---

## Notes

Community project — not affiliated with or endorsed by Redbelly Network Pty Ltd, and nothing here is financial advice. Fonts load at runtime from Google Fonts to keep offline builds working; swap to `next/font/local` to self-host.
