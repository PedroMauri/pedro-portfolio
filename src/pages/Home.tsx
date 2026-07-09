import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { CaseCard } from "@/components/CaseCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getFeaturedCases } from "@/content/cases";
import { profile } from "@/content/profile";

export default function Home() {
  const featuredCases = getFeaturedCases();

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">Portfolio</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted md:text-2xl">{profile.title}</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{profile.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              View selected work
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft"
            >
              Get in touch
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Featured work"
          title="Case studies in B2B SaaS"
          description="A selection of projects focused on complex workflows, onboarding, and product clarity."
        />
        <div className="mt-12 space-y-8">
          {featuredCases.map((caseStudy, index) => (
            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-accent-soft/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-lg text-foreground">{profile.availability}</p>
          <Link to="/about" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
            More about me
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
