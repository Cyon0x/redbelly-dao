import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center rounded-xl bg-[#0d141c] px-2.5 py-1.5", className)}>
      <img src="/redbelly-dao-logo.png" alt="Redbelly DAO" className="h-8 w-auto object-contain sm:h-9" />
    </span>
  );
}
