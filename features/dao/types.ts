export type ProposalStatus = "active" | "passed" | "rejected" | "pending" | "executed";

export interface Proposal {
  id: string;
  title: string;
  summary: string;
  category: "Treasury" | "Protocol" | "Grants" | "Governance" | "Ecosystem";
  status: ProposalStatus;
  author: string;
  createdAt: string;
  endsAt: string;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  quorum: number;
  discussionUrl: string;
}

export interface TreasuryAsset {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
}

export interface TreasurySnapshot {
  totalUsd: number;
  change30d: number;
  assets: TreasuryAsset[];
  monthlyOutflowUsd: number;
  runwayMonths: number;
}

export type TaskDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type TaskStatus = "open" | "claimed" | "review" | "done";

export interface Task {
  id: string;
  title: string;
  workingGroup: string;
  difficulty: TaskDifficulty;
  status: TaskStatus;
  rewardRbnt: number;
  tags: string[];
  claimedBy?: string;
}

export interface WorkingGroup {
  slug: string;
  name: string;
  mandate: string;
  lead: string;
  contributors: number;
  openTasks: number;
}
