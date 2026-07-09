import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/cases";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  caseStudy: CaseStudy;
  featured?: boolean;
}

export function CaseCard({ caseStudy, featured = false }: CaseCardProps) {
  return (
    <Link
      to={`/work/${caseStudy.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg",
        featured && "md:flex-row"
      )}
    >
      <div className={cn("relative aspect-[16/10] bg-gradient-to-br", caseStudy.accent, featured ? "md:w-1/2" : "w-full")} />
      <div className={cn("flex flex-1 flex-col p-6 md:p-8", featured && "md:w-1/2")}>
        <div className="mb-3 flex flex-wrap gap-2">
          {caseStudy.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-accent md:text-2xl">
          {caseStudy.title}
        </h3>
        <p className="mt-2 text-sm text-muted">
          {caseStudy.company} - {caseStudy.role} - {caseStudy.year}
        </p>
        <p className="mt-4 flex-1 leading-relaxed text-muted">{caseStudy.summary}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
          View case study
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
