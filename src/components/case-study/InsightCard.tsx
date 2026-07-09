import type { Insight } from "@/content/cases";
import { cn } from "@/lib/utils";

const typeStyles: Record<Insight["type"], string> = {
  quote: "border-l-4 border-l-indigo-500",
  data: "border-l-4 border-l-amber-500",
  opportunity: "border-l-4 border-l-emerald-500",
};

interface InsightCardProps {
  insight: Insight;
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6", typeStyles[insight.type])}>
      <p className="text-xs font-medium uppercase tracking-wider text-muted">{insight.label}</p>
      <p className="mt-3 text-base leading-relaxed text-foreground md:text-lg">
        {insight.type === "quote" ? `"${insight.body}"` : insight.body}
      </p>
      {insight.attribution ? (
        <p className="mt-3 text-sm text-muted">— {insight.attribution}</p>
      ) : null}
    </div>
  );
}
