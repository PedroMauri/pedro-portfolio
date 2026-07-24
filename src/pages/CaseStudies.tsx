import { FeaturedCaseCard } from "@/components/FeaturedCaseCard";
import { Seo } from "@/components/Seo";
import { getListedCases } from "@/content/cases";
import { caseStudiesSeo } from "@/content/seo";
import { useReveal } from "@/hooks/useReveal";

export default function CaseStudies() {
  const cases = getListedCases();
  const ref = useReveal<HTMLElement>();

  return (
    <>
    <Seo page={caseStudiesSeo} />
    <section ref={ref} className="reveal mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="text-center lg:text-left">
        <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Case Studies</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          What I've designed recently
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted lg:mx-0">
          Selected product design work across discovery, systems, and shipped experiences.
        </p>
      </div>
      <div className="mt-12 space-y-8">
        {cases.map((caseStudy, index) => (
          <FeaturedCaseCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
        ))}
      </div>
    </section>
    </>
  );
}
