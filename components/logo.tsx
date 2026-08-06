import { cn } from "@/lib/utils";

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 34" className="h-7 w-7" aria-hidden="true">
        <defs>
          <linearGradient id="rb-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(var(--ember-soft))" />
            <stop offset="1" stopColor="hsl(var(--ember-deep))" />
          </linearGradient>
        </defs>
        <path d="M16 1 30 9v16L16 33 2 25V9z" fill="none" stroke="url(#rb-mark)" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M16 1v32M2 9l14 8 14-8M2 25l14-8 14 8" fill="none" stroke="url(#rb-mark)" strokeWidth="1.1" opacity="0.65" strokeLinejoin="round" />
        <circle cx="16" cy="17" r="2.4" fill="hsl(var(--ember))" />
      </svg>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight">
          <span className="text-ink">Red</span>
          <span className="text-ember">belly</span>
          <span className="ml-1 align-super text-[10px] font-medium uppercase tracking-widest text-muted">DAO</span>
        </span>
      )}
    </span>
  );
}
