import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/content/cases";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface FeaturedCaseCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export function FeaturedCaseCard({ caseStudy, index = 0 }: FeaturedCaseCardProps) {
  const ref = useReveal<HTMLElement>();
  const metrics = caseStudy.impactMetrics?.slice(0, 2) ?? [];

  return (
    <article
      ref={ref}
      className="reveal group overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_10px_40px_rgba(11,11,11,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_50px_rgba(11,11,11,0.08)]"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-accent-dark">
            {caseStudy.company}
          </p>
          <h3 className="mt-3 text-balance text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
            {caseStudy.title}
          </h3>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            {caseStudy.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-dark"
              >
                {tag}
              </span>
            ))}
          </div>

          {metrics.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div
                  key={`${metric.value}-${metric.label}`}
                  className="rounded-2xl bg-cream px-4 py-4"
                >
                  <p className="text-3xl font-medium tracking-tight text-foreground">{metric.value}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.06em] text-muted">{metric.label}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {caseStudy.comingSoon ? (
              <span className="inline-flex items-center rounded-full bg-surface px-4 py-2 text-sm font-medium text-muted">
                Case study coming soon
              </span>
            ) : (
              <Link
                to={`/case-studies/${caseStudy.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                View case study
                <ArrowRight className="size-4" />
              </Link>
            )}
            {caseStudy.liveUrl ? (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-dark transition-colors hover:text-accent"
              >
                View live
                <ArrowRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div
          className={cn(
            "relative min-h-[240px] overflow-hidden bg-gradient-to-br p-6 lg:min-h-full",
            caseStudy.accent
          )}
        >
          {caseStudy.thumbnail ? (
            <div className="h-full w-full overflow-hidden rounded-2xl shadow-lg">
              <img
                src={caseStudy.thumbnail}
                alt=""
                className={cn(
                  "h-full w-full origin-center object-cover object-center transition-transform duration-500",
                  caseStudy.thumbnailZoom
                    ? "scale-[1.12] group-hover:scale-[1.15]"
                    : "group-hover:scale-[1.03]"
                )}
              />
            </div>
          ) : (
            <div className="flex h-full min-h-[240px] items-end rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.08em] text-white/70">
                  {caseStudy.company}
                </p>
                <p className="mt-2 text-2xl font-medium text-white">{caseStudy.company}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
