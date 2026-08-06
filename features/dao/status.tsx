import { Badge } from "@/components/ui/badge";
import type { ProposalStatus } from "@/features/dao/types";

const map: Record<ProposalStatus, { tone: "ember" | "green" | "amber" | "violet" | "neutral"; label: string }> = {
  active: { tone: "ember", label: "Active" },
  passed: { tone: "green", label: "Passed" },
  executed: { tone: "green", label: "Executed" },
  rejected: { tone: "neutral", label: "Rejected" },
  pending: { tone: "amber", label: "Pending" },
};

export function StatusBadge({ status }: { status: ProposalStatus }) {
  const s = map[status];
  return (
    <Badge tone={s.tone}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </Badge>
  );
}
