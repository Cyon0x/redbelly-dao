import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: { label: string; href: string }[];
}) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-muted">
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-1.5">
                <Link href={c.href} className="transition-colors hover:text-ember">
                  {c.label}
                </Link>
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          {eyebrow && <Badge tone="ember">{eyebrow}</Badge>}
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>}
        </Reveal>
      </div>
    </div>
  );
}
