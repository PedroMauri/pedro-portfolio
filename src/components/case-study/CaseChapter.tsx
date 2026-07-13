import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChapterProps {
  iconLabel: string;
  title: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "soft" | "cream";
}

const tones = {
  white: "bg-white",
  soft: "bg-accent-softer",
  cream: "bg-cream",
};

export function CaseChapter({
  iconLabel,
  title,
  children,
  className,
  tone = "white",
}: ChapterProps) {
  return (
    <section className={cn("scroll-mt-24 py-14 sm:py-20", tones[tone], className)}>
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-accent-dark">
          {iconLabel}
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function CaseH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-2xl font-medium tracking-tight text-foreground sm:text-[1.75rem]">
      {children}
    </h3>
  );
}

export function CaseBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-lg leading-relaxed text-muted", className)}>{children}</p>
  );
}

export function MetaLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted-soft">{children}</p>
  );
}
