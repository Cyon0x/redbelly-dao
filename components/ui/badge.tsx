import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "neutral",
  children,
}: {
  className?: string;
  tone?: "neutral" | "ember" | "green" | "amber" | "violet" | "blue";
  children: React.ReactNode;
}) {
  const tones = {
    neutral: "bg-surface-2 text-muted",
    ember: "bg-ember/12 text-ember",
    green: "bg-emerald-500/12 text-emerald-500",
    amber: "bg-amber-500/14 text-amber-500",
    violet: "bg-violet-500/14 text-violet-400",
    blue: "bg-sky-500/14 text-sky-500",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
