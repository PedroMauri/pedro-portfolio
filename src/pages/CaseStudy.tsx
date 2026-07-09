import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCaseBySlug } from "@/content/cases";

export default function CaseStudyPage() {
  const { slug } = useParams();
  const caseStudy = slug ? getCaseBySlug(slug) : undefined;

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

  return (
    <article>
      <div className={`bg-gradient-to-br ${caseStudy.accent} h-56 md:h-72`} />
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Link to="/work" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to work
        </Link>

        <div className="mt-8 flex flex-wrap gap-2">
          {caseStudy.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">{caseStudy.title}</h1>
        <p className="mt-4 text-muted">
          {caseStudy.company} - {caseStudy.role} - {caseStudy.year}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted">{caseStudy.summary}</p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">Context</h2>
          <p className="mt-4 leading-relaxed text-muted">{caseStudy.context}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">My role</h2>
          <p className="mt-4 leading-relaxed text-muted">{caseStudy.myRole}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">Process</h2>
          <div className="mt-6 space-y-6">
            {caseStudy.process.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-medium text-accent">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">Solution</h2>
          <p className="mt-4 leading-relaxed text-muted">{caseStudy.solution}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">Impact</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            {caseStudy.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-2xl bg-accent-soft p-6">
          <h2 className="text-xl font-semibold text-foreground">Reflection</h2>
          <p className="mt-3 leading-relaxed text-muted">{caseStudy.reflection}</p>
        </section>
      </div>
    </article>
  );
}
