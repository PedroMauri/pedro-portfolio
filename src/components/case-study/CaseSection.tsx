import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CaseSectionProps {
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function CaseSection({ number, title, children, className }: CaseSectionProps) {
  return (
    <section className={cn("scroll-mt-24", className)}>
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-medium tabular-nums text-accent">{number}</span>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
