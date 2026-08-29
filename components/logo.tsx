import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/redbelly-dao-light-exact.png"
        alt="Redbelly DAO"
        className="block h-10 w-auto object-contain dark:hidden sm:h-11"
      />
      <img
        src="/redbelly-dao-dark-exact.png"
        alt="Redbelly DAO"
        className="hidden h-10 w-auto object-contain dark:block sm:h-11"
      />
    </span>
  );
}
