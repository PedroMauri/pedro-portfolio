import { CaseCard } from "@/components/CaseCard";
import { SectionHeading } from "@/components/SectionHeading";
import { cases } from "@/content/cases";

export default function Work() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <SectionHeading
        eyebrow="Work"
        title="Product design case studies"
        description="End-to-end work across research, prototyping, and shipped product experiences."
      />
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {cases.map((caseStudy) => (
          <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </div>
    </section>
  );
}
