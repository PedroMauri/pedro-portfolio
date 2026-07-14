import { Link, useParams } from "react-router-dom";
import { ArrowRight, Briefcase, ExternalLink, Lightbulb, Search } from "lucide-react";
import { CaseFigure } from "@/components/case-study/CaseFigure";
import {
  CaseBody,
  CaseChapter,
  CaseH3,
  MetaLabel,
} from "@/components/case-study/CaseChapter";
import { getCaseBySlug, getListedCases } from "@/content/cases";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const caseStudy = slug ? getCaseBySlug(slug) : undefined;
  const readableCases = getListedCases().filter((item) => !item.comingSoon);
  const currentIndex = caseStudy
    ? readableCases.findIndex((c) => c.slug === caseStudy.slug)
    : -1;
  const nextCase =
    currentIndex >= 0 ? readableCases[(currentIndex + 1) % readableCases.length] : undefined;

  if (!caseStudy || caseStudy.comingSoon) {
    return (
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <h1 className="text-3xl font-medium">
          {caseStudy?.comingSoon ? "Case study coming soon" : "Case study not found"}
        </h1>
        <Link to="/case-studies" className="mt-4 inline-block text-accent-dark">
          Back to case studies
        </Link>
      </section>
    );
  }

  return (
    <article className="bg-white">
      {/* Title block — matches Nicole: light, company eyebrow, large title */}
      <header className="border-b border-border bg-accent-softer">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-accent-dark">
            <Briefcase className="size-4" />
            <span>{caseStudy.company} Case Study</span>
          </div>
          <h1 className="mt-5 text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]">
            {caseStudy.title}
          </h1>
          {caseStudy.liveUrl ? (
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-dark transition-colors hover:text-accent"
            >
              View live
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>
      </header>

      {/* Overview */}
      <section className="scroll-mt-24 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <CaseH3>Overview</CaseH3>
          <div className="mt-6 space-y-5">
            {caseStudy.overview.map((paragraph) => (
              <CaseBody key={paragraph}>{paragraph}</CaseBody>
            ))}
          </div>

          <p className="mt-10 text-base font-medium text-foreground">Goals:</p>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-lg leading-relaxed text-muted">
            {caseStudy.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ol>

          <div className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-2">
            <div>
              <MetaLabel>Role</MetaLabel>
              <p className="mt-2 text-lg font-medium text-foreground">{caseStudy.role}</p>
            </div>
            <div>
              <MetaLabel>Collaborators</MetaLabel>
              <p className="mt-2 text-lg leading-relaxed text-muted">{caseStudy.collaborators}</p>
            </div>
            <div className="sm:col-span-2">
              <MetaLabel>Responsibilities</MetaLabel>
              <ul className="mt-2 space-y-1.5 text-lg text-muted">
                {caseStudy.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The challenge */}
      <section className="scroll-mt-24 border-y border-border bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <CaseH3>The challenge</CaseH3>
          {caseStudy.problemBefore ? (
            <>
              <CaseBody className="mt-6">{caseStudy.problemBefore.description}</CaseBody>
              <ul className="mt-6 space-y-3">
                {caseStudy.problemBefore.pains.map((pain) => (
                  <li key={pain} className="flex gap-3 text-lg text-muted">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {pain}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <CaseBody className="mt-6">{caseStudy.context}</CaseBody>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-border bg-white p-6">
              <MetaLabel>Business Need</MetaLabel>
              <p className="mt-3 text-lg leading-relaxed text-foreground">{caseStudy.businessNeed}</p>
            </div>
            <div className="rounded-[1.25rem] border border-border bg-white p-6">
              <MetaLabel>User Need</MetaLabel>
              <p className="mt-3 text-lg leading-relaxed text-foreground">{caseStudy.userNeed}</p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.5rem] bg-foreground px-6 py-8 text-white sm:px-8">
            <MetaLabel>
              <span className="text-white/60">Problem to solve</span>
            </MetaLabel>
            <p className="mt-4 text-xl font-medium leading-snug sm:text-2xl">
              {caseStudy.problemStatement}
            </p>
          </div>
        </div>
      </section>

      {/* Research */}
      {caseStudy.insights && caseStudy.insights.length > 0 ? (
        <CaseChapter iconLabel="Research" title="Gathering insights" tone="white">
          <div className="mb-2 flex items-center gap-2 text-accent-dark">
            <Search className="size-5" />
            <span className="text-sm font-medium">Insights from discovery</span>
          </div>
          <CaseBody>
            Research and discovery shaped early priorities — clarifying what users needed to see,
            trust, and act on before committing.
          </CaseBody>

          <CaseH3>
            <span className="mt-12 block">Key insights and themes</span>
          </CaseH3>
          <p className="mt-4 text-lg text-muted">
            These insights drove prioritization and kept the solution aligned with user and business
            goals.
          </p>
          <div className="mt-8 space-y-4">
            {caseStudy.insights.map((insight, index) => (
              <div
                key={insight.label}
                className="grid gap-4 rounded-[1.25rem] border border-border bg-accent-softer p-6 sm:grid-cols-[auto_1fr]"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-white text-sm font-medium text-accent-dark shadow-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-accent-dark">
                    {insight.label}
                  </p>
                  <p className="mt-2 text-lg leading-relaxed text-foreground">{insight.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[1.5rem] border border-accent/30 bg-accent-soft px-6 py-8 sm:px-8">
            <MetaLabel>How might we</MetaLabel>
            <p className="mt-4 text-xl font-medium leading-snug text-foreground sm:text-2xl">
              {caseStudy.howMightWe}
            </p>
          </div>
        </CaseChapter>
      ) : null}

      {/* Ideation / Process */}
      <CaseChapter
        iconLabel="Ideation"
        title={caseStudy.ideationTitle ?? "Exploring the solution"}
        tone="soft"
      >
        <div className="mb-2 flex items-center gap-2 text-accent-dark">
          <Lightbulb className="size-5" />
          <span className="text-sm font-medium">From problem to structure</span>
        </div>
        <CaseBody>
          Work moved from framing the problem into architecture, flows, and decisions that could
          ship under real constraints.
        </CaseBody>

        {caseStudy.figures?.process ? (
          <div className="mt-10">
            <CaseFigure figure={caseStudy.figures.process} variant="diagram" />
          </div>
        ) : null}

        {caseStudy.figures?.roadmap ? (
          <div className="mt-10">
            <CaseH3>Strategic roadmap</CaseH3>
            <CaseBody className="mt-4">
              Research insights shaped product priorities before detailed flows and UI.
            </CaseBody>
            <div className="mt-6">
              <CaseFigure figure={caseStudy.figures.roadmap} variant="diagram" />
            </div>
          </div>
        ) : null}

        {caseStudy.figures?.sitemap ? (
          <div className="mt-10">
            <CaseH3>Information architecture</CaseH3>
            <CaseBody className="mt-4">
              Platform elements were organized into a clear hierarchy from discovery to evaluation.
            </CaseBody>
            <div className="mt-6">
              <CaseFigure figure={caseStudy.figures.sitemap} variant="diagram" />
            </div>
          </div>
        ) : null}

        {caseStudy.figures?.userFlow ? (
          <div className="mt-10">
            <CaseH3>User journey</CaseH3>
            <div className="mt-6">
              <CaseFigure figure={caseStudy.figures.userFlow} variant="diagram" />
            </div>
          </div>
        ) : null}

        {caseStudy.process.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {caseStudy.process.map((step, index) => (
              <div key={step.title} className="rounded-[1.25rem] border border-border bg-white p-6">
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-accent-dark">
                  Step {index + 1}
                </p>
                <h4 className="mt-2 text-xl font-medium text-foreground">{step.title}</h4>
                <p className="mt-3 text-base leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        ) : null}

        {caseStudy.keyDecision ? (
          <div className="mt-10 rounded-[1.5rem] border border-border bg-white p-6 sm:p-8">
            <MetaLabel>Key design decision</MetaLabel>
            <h4 className="mt-3 text-xl font-medium text-foreground">{caseStudy.keyDecision.title}</h4>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.08em] text-muted-soft">
              Explored
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {caseStudy.keyDecision.explored.map((option) => (
                <span
                  key={option}
                  className="rounded-full border border-border bg-accent-softer px-3 py-1 text-sm text-muted"
                >
                  {option}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.08em] text-muted-soft">
              Chosen
            </p>
            <p className="mt-2 text-lg font-medium text-accent-dark">{caseStudy.keyDecision.chosen}</p>
            <CaseBody className="mt-4">{caseStudy.keyDecision.rationale}</CaseBody>
          </div>
        ) : null}

        {caseStudy.keyDecisions && caseStudy.keyDecisions.length > 0 ? (
          <div className="mt-10">
            <CaseH3>Key design decisions</CaseH3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {caseStudy.keyDecisions.map((decision) => (
                <div key={decision.title} className="rounded-[1.25rem] border border-border bg-white p-6">
                  <h4 className="text-lg font-medium text-foreground">{decision.title}</h4>
                  <p className="mt-3 text-base leading-relaxed text-muted">{decision.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {caseStudy.figures?.wireframe ? (
          <div className="mt-10">
            <CaseH3>Early exploration</CaseH3>
            <div className="mt-6">
              <CaseFigure figure={caseStudy.figures.wireframe} variant="wireframe" />
            </div>
          </div>
        ) : null}
      </CaseChapter>

      {/* Final design */}
      <CaseChapter
        iconLabel="Final Design"
        title={caseStudy.finalDesignTitle ?? "Final design"}
        tone="white"
      >
        <CaseBody>{caseStudy.solution}</CaseBody>
        {caseStudy.solutionDetails && caseStudy.solutionDetails.length > 0 ? (
          <ul className="mt-6 space-y-3">
            {caseStudy.solutionDetails.map((detail) => (
              <li key={detail} className="flex gap-3 text-lg text-muted">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {detail}
              </li>
            ))}
          </ul>
        ) : null}
        {(() => {
          const solutionFigures =
            caseStudy.figures?.solutions ??
            (caseStudy.figures?.solution ? [caseStudy.figures.solution] : []);
          if (solutionFigures.length === 0) return null;
          return (
            <div className="mt-10 space-y-8">
              {solutionFigures.map((figure) => (
                <CaseFigure key={figure.src} figure={figure} />
              ))}
            </div>
          );
        })()}
        {caseStudy.liveUrl ? (
          <a
            href={caseStudy.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent-dark transition-colors hover:text-accent"
          >
            View live
            <ArrowRight className="size-4" />
          </a>
        ) : null}
      </CaseChapter>

      {/* Impact */}
      <CaseChapter iconLabel="Impact" title="The results" tone="cream">
        {caseStudy.impactMetrics && caseStudy.impactMetrics.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {caseStudy.impactMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.25rem] border border-border bg-white px-5 py-6 text-center"
              >
                <p className="text-4xl font-medium tracking-tight text-foreground">{metric.value}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}
        <ul className="mt-8 space-y-3">
          {caseStudy.impact.map((item) => (
            <li key={item} className="flex gap-3 text-lg text-muted">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
        {caseStudy.impactCaveat ? (
          <p className="mt-6 text-sm italic text-muted-soft">{caseStudy.impactCaveat}</p>
        ) : null}
      </CaseChapter>

      {/* Learnings */}
      <section className="scroll-mt-24 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <CaseH3>What I learned from this project</CaseH3>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {caseStudy.learnings.map((learning) => (
              <div
                key={learning.title}
                className="rounded-[1.25rem] border border-border bg-accent-softer p-6"
              >
                <h4 className="text-lg font-medium text-foreground">{learning.title}</h4>
                <p className="mt-3 text-base leading-relaxed text-muted">{learning.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next case */}
      {nextCase && nextCase.slug !== caseStudy.slug ? (
        <section className="border-t border-border bg-accent-softer py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-accent-dark">
              <Briefcase className="size-4" />
              Next Case Study
            </div>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.08em] text-muted">
              {nextCase.company}
            </p>
            <h3 className="mt-2 text-3xl font-medium tracking-tight text-foreground">
              {nextCase.title}
            </h3>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{nextCase.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {nextCase.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-3 py-1 text-sm font-medium text-accent-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
            {nextCase.impactMetrics && nextCase.impactMetrics.length > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {nextCase.impactMetrics.slice(0, 2).map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-white px-4 py-4">
                    <p className="text-3xl font-medium text-foreground">{metric.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.06em] text-muted">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={`/case-studies/${nextCase.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                View case study
                <ArrowRight className="size-4" />
              </Link>
              {nextCase.liveUrl ? (
                <a
                  href={nextCase.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-dark"
                >
                  View live
                  <ArrowRight className="size-4" />
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
