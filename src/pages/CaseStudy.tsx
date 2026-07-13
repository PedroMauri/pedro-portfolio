import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { CaseFigure } from "@/components/case-study/CaseFigure";
import { CaseSection } from "@/components/case-study/CaseSection";
import { InsightCard } from "@/components/case-study/InsightCard";
import { cases, getCaseBySlug } from "@/content/cases";

function useSectionNumber() {
  let count = 0;
  return () => String(++count).padStart(2, "0");
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const caseStudy = slug ? getCaseBySlug(slug) : undefined;
  const readableCases = cases.filter((item) => !item.comingSoon);
  const currentIndex = caseStudy
    ? readableCases.findIndex((c) => c.slug === caseStudy.slug)
    : -1;
  const nextCase =
    currentIndex >= 0 ? readableCases[(currentIndex + 1) % readableCases.length] : undefined;

  if (!caseStudy || caseStudy.comingSoon) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-3xl font-semibold">
          {caseStudy?.comingSoon ? "Case study coming soon" : "Case study not found"}
        </h1>
        <Link to="/case-studies" className="mt-4 inline-block text-accent">
          Back to case studies
        </Link>
      </section>
    );
  }

  const section = useSectionNumber();

  return (
    <article>
      <header className={`bg-gradient-to-br ${caseStudy.accent} text-white`}>
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to case studies
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-6 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
            {caseStudy.title}
          </h1>

          <p className="mt-4 text-sm text-white/80 md:text-base">
            {caseStudy.company} · {caseStudy.role}
            {caseStudy.duration ? ` · ${caseStudy.duration}` : ""} · {caseStudy.year}
          </p>

          {caseStudy.heroLine ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              {caseStudy.heroLine}
            </p>
          ) : null}

          {caseStudy.liveUrl ? (
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              View live product
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>
      </header>

      {caseStudy.meta ? (
        <div className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Team</p>
              <p className="mt-1 text-sm text-foreground">{caseStudy.meta.team}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Platform</p>
              <p className="mt-1 text-sm text-foreground">{caseStudy.meta.platform}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Methods</p>
              <p className="mt-1 text-sm text-foreground">{caseStudy.meta.methods}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-3xl space-y-16 px-6 py-12 md:space-y-20 md:py-16">
        <CaseSection number={section()} title="Context">
          <p className="leading-relaxed text-muted">{caseStudy.context}</p>
          {caseStudy.statCallout ? (
            <div className="mt-6 rounded-2xl border border-accent/20 bg-accent-soft px-6 py-5">
              <p className="text-lg font-medium text-foreground">{caseStudy.statCallout}</p>
            </div>
          ) : null}
        </CaseSection>

        {caseStudy.problemBefore ? (
          <CaseSection number={section()} title="The problem">
            <p className="leading-relaxed text-muted">{caseStudy.problemBefore.description}</p>
            <ul className="mt-6 space-y-2">
              {caseStudy.problemBefore.pains.map((pain) => (
                <li key={pain} className="flex gap-3 text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {pain}
                </li>
              ))}
            </ul>
          </CaseSection>
        ) : null}

        <CaseSection number={section()} title="My role">
          <p className="leading-relaxed text-muted">{caseStudy.myRole}</p>
        </CaseSection>

        {caseStudy.insights && caseStudy.insights.length > 0 ? (
          <CaseSection number={section()} title="Discovery insights">
            <div className="grid gap-4">
              {caseStudy.insights.map((insight) => (
                <InsightCard key={insight.label} insight={insight} />
              ))}
            </div>
          </CaseSection>
        ) : null}

        {caseStudy.figures?.process ? (
          <CaseSection number={section()} title="Process">
            <CaseFigure figure={caseStudy.figures.process} />
          </CaseSection>
        ) : caseStudy.process.length > 0 ? (
          <CaseSection number={section()} title="Process">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudy.process.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs font-medium text-accent">Step {index + 1}</p>
                  <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </CaseSection>
        ) : null}

        {caseStudy.figures?.roadmap ? (
          <CaseSection number={section()} title="Strategic roadmap">
            <p className="mb-6 leading-relaxed text-muted">
              Research insights shaped product priorities. UX foundations came first — clearer community
              evaluation before growth, monetization, or expansion work.
            </p>
            <CaseFigure figure={caseStudy.figures.roadmap} variant="diagram" />
          </CaseSection>
        ) : null}

        {caseStudy.figures?.sitemap ? (
          <CaseSection number={section()} title="Information architecture">
            <p className="mb-6 leading-relaxed text-muted">
              Platform elements were organized into a clear hierarchy so users could move from discovery
              to community evaluation without hunting across disconnected pages.
            </p>
            <CaseFigure figure={caseStudy.figures.sitemap} variant="diagram" />
          </CaseSection>
        ) : null}

        {caseStudy.figures?.userFlow ? (
          <CaseSection number={section()} title="User journey">
            <CaseFigure figure={caseStudy.figures.userFlow} />
          </CaseSection>
        ) : null}

        {caseStudy.keyDecisions && caseStudy.keyDecisions.length > 0 ? (
          <CaseSection number={section()} title="Key design decisions">
            <div className="grid gap-4 sm:grid-cols-2">
              {caseStudy.keyDecisions.map((decision) => (
                <div key={decision.title} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground">{decision.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{decision.description}</p>
                </div>
              ))}
            </div>
          </CaseSection>
        ) : null}

        {caseStudy.keyDecision ? (
          <CaseSection number={section()} title="Key design decision">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground">{caseStudy.keyDecision.title}</h3>
              <p className="mt-4 text-sm text-muted">Explored</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {caseStudy.keyDecision.explored.map((option) => (
                  <span
                    key={option}
                    className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted"
                  >
                    {option}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted">Chosen</p>
              <p className="mt-1 font-medium text-accent">{caseStudy.keyDecision.chosen}</p>
              <p className="mt-4 leading-relaxed text-muted">{caseStudy.keyDecision.rationale}</p>
            </div>
          </CaseSection>
        ) : null}

        {caseStudy.figures?.wireframe ? (
          <CaseSection number={section()} title="Early exploration">
            <CaseFigure figure={caseStudy.figures.wireframe} variant="wireframe" />
          </CaseSection>
        ) : null}

        <CaseSection number={section()} title="Solution">
          <p className="leading-relaxed text-muted">{caseStudy.solution}</p>
          {caseStudy.solutionDetails && caseStudy.solutionDetails.length > 0 ? (
            <ul className="mt-6 space-y-2">
              {caseStudy.solutionDetails.map((detail) => (
                <li key={detail} className="flex gap-3 text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {detail}
                </li>
              ))}
            </ul>
          ) : null}
          {caseStudy.figures?.solution ? (
            <div className="mt-8">
              <CaseFigure figure={caseStudy.figures.solution} />
            </div>
          ) : null}
          {caseStudy.liveUrl ? (
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-dark"
            >
              View live product
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </CaseSection>

        <CaseSection number={section()} title="Impact">
          {caseStudy.impactMetrics ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {caseStudy.impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-border bg-card p-6 text-center"
                >
                  <p className="text-3xl font-semibold tracking-tight text-accent">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted">{metric.label}</p>
                </div>
              ))}
            </div>
          ) : null}
          <ul className="mt-6 space-y-2">
            {caseStudy.impact.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          {caseStudy.impactCaveat ? (
            <p className="mt-4 text-sm italic text-muted">{caseStudy.impactCaveat}</p>
          ) : null}
        </CaseSection>

        <section className="rounded-2xl bg-accent-soft p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {section()} — Reflection
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground">{caseStudy.reflection}</p>
        </section>

        {nextCase && nextCase.slug !== caseStudy.slug ? (
          <div className="border-t border-border pt-12">
            <p className="text-sm font-medium text-muted">Next case study</p>
            <Link
              to={`/case-studies/${nextCase.slug}`}
              className="group mt-3 flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-foreground group-hover:text-accent">{nextCase.title}</p>
                <p className="mt-1 text-sm text-muted">{nextCase.company}</p>
              </div>
              <ArrowRight className="size-5 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ) : null}
      </div>
    </article>
  );
}
