import type {
  Proposal,
  TreasurySnapshot,
  Task,
  WorkingGroup,
} from "@/features/dao/types";

/**
 * DAO data service.
 *
 * Every function returns a Promise so the call sites are already async-ready.
 * Today they resolve from typed fixtures; to go live, replace the bodies with
 * `fetch()` calls to the governance API / subgraph — the UI never changes.
 */

const proposals: Proposal[] = [
  {
    id: "RBN-042",
    title: "Allocate 750,000 RBNT to the Q3 ecosystem grants pool",
    summary:
      "Fund the next cohort of RWA tooling, indexers, and developer education initiatives building on Redbelly, with milestone-based disbursement.",
    category: "Grants",
    status: "active",
    author: "grants.rbn.eth",
    createdAt: "2026-07-28T09:00:00Z",
    endsAt: "2026-08-11T09:00:00Z",
    votesFor: 4_182_500,
    votesAgainst: 612_000,
    votesAbstain: 190_000,
    quorum: 4_000_000,
    discussionUrl: "https://discord.gg/redbelly",
  },
  {
    id: "RBN-041",
    title: "Adopt phased governor rotation schedule (RIP-9)",
    summary:
      "Introduce a deterministic 2-week governor rotation window and publish the reconfiguration calendar on-chain for full transparency.",
    category: "Protocol",
    status: "active",
    author: "core.rbn.eth",
    createdAt: "2026-07-30T12:00:00Z",
    endsAt: "2026-08-09T12:00:00Z",
    votesFor: 2_940_000,
    votesAgainst: 2_105_000,
    votesAbstain: 88_000,
    quorum: 4_000_000,
    discussionUrl: "https://discord.gg/redbelly",
  },
  {
    id: "RBN-040",
    title: "Ratify Project Acacia settlement pilot reporting cadence",
    summary:
      "Commit the DAO to a quarterly public report on the Project Acacia wholesale settlement pilot, covering volumes, participants, and compliance posture.",
    category: "Governance",
    status: "passed",
    author: "council.rbn.eth",
    createdAt: "2026-07-05T09:00:00Z",
    endsAt: "2026-07-19T09:00:00Z",
    votesFor: 5_610_000,
    votesAgainst: 240_000,
    votesAbstain: 410_000,
    quorum: 4_000_000,
    discussionUrl: "https://discord.gg/redbelly",
  },
  {
    id: "RBN-039",
    title: "Increase bug bounty top reward to $150,000",
    summary:
      "Raise the maximum critical-severity payout in the Hashlock-managed bug bounty program to strengthen security incentives.",
    category: "Treasury",
    status: "executed",
    author: "security.rbn.eth",
    createdAt: "2026-06-18T09:00:00Z",
    endsAt: "2026-07-02T09:00:00Z",
    votesFor: 6_020_000,
    votesAgainst: 120_000,
    votesAbstain: 60_000,
    quorum: 4_000_000,
    discussionUrl: "https://hashlock.com/bug-bounty/redbelly-network",
  },
  {
    id: "RBN-038",
    title: "Sunset legacy testnet faucet contract",
    summary:
      "Deprecate the v1 faucet in favour of the rate-limited v2 faucet and reclaim residual RBNT to the ecosystem pool.",
    category: "Protocol",
    status: "rejected",
    author: "devrel.rbn.eth",
    createdAt: "2026-06-02T09:00:00Z",
    endsAt: "2026-06-16T09:00:00Z",
    votesFor: 1_120_000,
    votesAgainst: 3_980_000,
    votesAbstain: 300_000,
    quorum: 4_000_000,
    discussionUrl: "https://discord.gg/redbelly",
  },
];

const treasury: TreasurySnapshot = {
  totalUsd: 48_920_000,
  change30d: 3.8,
  monthlyOutflowUsd: 1_240_000,
  runwayMonths: 39,
  assets: [
    { symbol: "RBNT", name: "Redbelly Native Token", balance: 21_500_000, usdValue: 27_950_000, change24h: 2.1 },
    { symbol: "USDC", name: "USD Coin", balance: 14_300_000, usdValue: 14_300_000, change24h: 0 },
    { symbol: "AUDD", name: "AUD Digital", balance: 6_200_000, usdValue: 4_060_000, change24h: -0.3 },
    { symbol: "wBTC", name: "Wrapped Bitcoin", balance: 9.4, usdValue: 2_610_000, change24h: 1.4 },
  ],
};

const tasks: Task[] = [
  { id: "T-118", title: "Write a viem quickstart for Redbelly Testnet", workingGroup: "DevRel", difficulty: "Beginner", status: "open", rewardRbnt: 1_200, tags: ["docs", "viem", "testnet"] },
  { id: "T-117", title: "Build an open-source proposal notifier bot", workingGroup: "Tooling", difficulty: "Intermediate", status: "open", rewardRbnt: 4_500, tags: ["bot", "governance", "discord"] },
  { id: "T-116", title: "Audit the delegation contract for edge cases", workingGroup: "Security", difficulty: "Advanced", status: "claimed", rewardRbnt: 12_000, tags: ["security", "solidity"], claimedBy: "0xAudit…9f2" },
  { id: "T-115", title: "Design the working-group dashboard wireframes", workingGroup: "Design", difficulty: "Intermediate", status: "review", rewardRbnt: 3_800, tags: ["design", "figma"], claimedBy: "0xPixel…4a1" },
  { id: "T-114", title: "Translate governance docs to Spanish", workingGroup: "Community", difficulty: "Beginner", status: "open", rewardRbnt: 900, tags: ["i18n", "docs"] },
  { id: "T-113", title: "Add RWA issuance example to the SDK cookbook", workingGroup: "DevRel", difficulty: "Advanced", status: "done", rewardRbnt: 6_000, tags: ["sdk", "rwa"], claimedBy: "0xBuild…7c8" },
];

const workingGroups: WorkingGroup[] = [
  { slug: "devrel", name: "Developer Relations", mandate: "Docs, SDKs, examples, and onboarding for builders.", lead: "devrel.rbn.eth", contributors: 24, openTasks: 6 },
  { slug: "security", name: "Security", mandate: "Audits, bug bounty triage, and incident response.", lead: "security.rbn.eth", contributors: 11, openTasks: 3 },
  { slug: "treasury", name: "Treasury", mandate: "Runway management, asset strategy, and reporting.", lead: "treasury.rbn.eth", contributors: 8, openTasks: 2 },
  { slug: "community", name: "Community", mandate: "Events, translations, ambassadors, and moderation.", lead: "community.rbn.eth", contributors: 41, openTasks: 9 },
];

function delay<T>(value: T, ms = 120): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const daoService = {
  listProposals: () => delay(proposals),
  getProposal: (id: string) => delay(proposals.find((p) => p.id === id) ?? null),
  getTreasury: () => delay(treasury),
  listTasks: () => delay(tasks),
  listWorkingGroups: () => delay(workingGroups),
  metrics: () =>
    delay({
      treasuryUsd: treasury.totalUsd,
      activeProposals: proposals.filter((p) => p.status === "active").length,
      openTasks: tasks.filter((t) => t.status === "open").length,
      contributors: workingGroups.reduce((sum, g) => sum + g.contributors, 0),
    }),
};

// Synchronous fixtures for static generation / search indexing.
export const daoFixtures = { proposals, treasury, tasks, workingGroups };
