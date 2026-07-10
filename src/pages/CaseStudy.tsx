import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseFigure } from "@/components/case-study/CaseFigure";
import { CaseSection } from "@/components/case-study/CaseSection";
import { InsightCard } from "@/components/case-study/InsightCard";
import { MockUIPreview } from "@/components/case-study/MockUIPreview";
import { cases, getCaseBySlug } from "@/content/cases";

function useSectionNumber() {
  let count = 0;
  return () => String(++count).padStart(2, "0");
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const caseStudy = slug ? getCaseBySlug(slug) : undefined;
  const currentIndex = caseStudy ? cases.findIndex((c) => c.slug === caseStudy.slug) : -1;
  const nextCase = currentIndex >= 0 ? cases[(currentIndex + 1) % cases.length] : undefined;

  if (!caseStudy) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-3xl font-semibold">Case study not found</h1>
        <Link to="/work" className="mt-4 inline-block text-accent">
          Back to work
        </Link>
      </section>
    );
  }

  const section = useSectionNumber();
  const legacySteps = caseStudy.problemBefore?.legacySteps ?? [
    "Modal",
    "Tab",
    "Email",
    "Tab",
    "Modal",
    "Export",
  ];

  return (
    <article>
      <header className={`bg-gradient-to-br ${caseStudy.accent} text-white`}>
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to work
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
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <div className="border-b border-border bg-slate-100 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted">
                Legacy experience (simplified)
              </div>
              <div className="aspect-[16/9] bg-slate-50 p-4">
                <div className="flex h-full flex-wrap items-center justify-center gap-2">
                  {legacySteps.map((step, i) => (
                    <div key={`${step}-${i}`} className="flex items-center gap-2">
                      <div className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-xs text-slate-500">
                        {step}
                      </div>
                      {i < legacySteps.length - 1 ? (
                        <span className="text-slate-300">→</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

        <CaseSection number={section()} title="Process">
          {caseStudy.figures?.process ? (
            <CaseFigure figure={caseStudy.figures.process} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudy.process.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs font-medium text-accent">Step {index + 1}</p>
                  <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          )}
        </CaseSection>

        {caseStudy.figures?.sitemap ? (
          <CaseSection number={section()} title="Information architecture">
            <CaseFigure figure={caseStudy.figures.sitemap} aspectRatio="aspect-[4/3]" />
          </CaseSection>
        ) : null}

        {caseStudy.figures?.userFlow ? (
          <CaseSection number={section()} title="User journey">
            <CaseFigure figure={caseStudy.figures.userFlow} aspectRatio="aspect-[16/11]" />
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
            <p className="mb-6 leading-relaxed text-muted">
              Multiple wireframes were explored before defining the final information hierarchy,
              balancing community identity with the engagement signals users needed to make confident
              decisions.
            </p>
            <CaseFigure figure={caseStudy.figures.wireframe} />
          </CaseSection>
        ) : null}

        <CaseSection number={section()} title="Solution">
          <p className="leading-relaxed text-muted">{caseStudy.solution}</p>
          {caseStudy.figures?.solution ? (
            <div className="mt-8">
              <CaseFigure figure={caseStudy.figures.solution} />
            </div>
          ) : (
            <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-sm">
              <div className="border-b border-border bg-slate-100 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted">
                Final UI — main flow
              </div>
              <div className="aspect-[16/10]">
                <MockUIPreview variant={caseStudy.previewVariant ?? "workflow"} className="h-full" />
              </div>
            </div>
          )}
          {caseStudy.solutionDetails ? (
            <ul className="mt-6 space-y-2">
              {caseStudy.solutionDetails.map((detail) => (
                <li key={detail} className="flex gap-3 text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {detail}
                </li>
              ))}
            </ul>
          ) : null}
          {caseStudy.solutionStates ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {caseStudy.solutionStates.map((state) => (
                <div
                  key={state}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground"
                >
                  {state}
                </div>
              ))}
            </div>
          ) : null}
        </CaseSection>

        {caseStudy.beforeAfter ? (
          <CaseSection number={section()} title="Before and after">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  {caseStudy.beforeAfter.beforeLabel}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {caseStudy.beforeAfter.beforeDescription}
                </p>
                <div className="mt-4 aspect-video rounded-lg bg-slate-100 p-2">
                  <div className="flex h-full flex-wrap gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 flex-1 rounded border border-dashed border-slate-300 bg-white"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-accent/30 bg-accent-soft/30 p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-accent">
                  {caseStudy.beforeAfter.afterLabel}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {caseStudy.beforeAfter.afterDescription}
                </p>
                <div className="mt-4 aspect-video overflow-hidden rounded-lg border border-border">
                  {caseStudy.figures?.solution ? (
                    <img
                      src={caseStudy.figures.solution.src}
                      alt=""
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <MockUIPreview
                      variant={caseStudy.previewVariant ?? "workflow"}
                      className="h-full"
                      compact
                    />
                  )}
                </div>
              </div>
            </div>
          </CaseSection>
        ) : null}

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
              to={`/work/${nextCase.slug}`}
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
