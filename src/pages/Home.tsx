import { ArrowRight, IdCard, MapPin } from "lucide-react";
import { FeaturedCaseCard } from "@/components/FeaturedCaseCard";
import { HeroRotator } from "@/components/HeroRotator";
import { StrengthCard } from "@/components/StrengthCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { getFeaturedCases } from "@/content/cases";
import { profile } from "@/content/profile";
import { useReveal } from "@/hooks/useReveal";

export default function Home() {
  const featuredCases = getFeaturedCases();
  const contactRef = useReveal<HTMLElement>();
  const casesRef = useReveal<HTMLElement>();
  const strengthsRef = useReveal<HTMLElement>();
  const refsRef = useReveal<HTMLElement>();

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-4.25rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-accent-softer via-white to-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(0,149,159,0.12),transparent_60%)]" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-16 text-center sm:px-8">
          <p className="animate-fade-up text-lg font-medium text-accent-dark sm:text-xl">
            {profile.welcome}
          </p>
          <div className="mt-6 w-full">
            <HeroRotator className="mx-auto text-center" />
          </div>
        </div>
      </section>

      <section
        id="get-in-touch"
        ref={contactRef}
        className="reveal border-y border-border bg-cream"
      >
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:px-8 md:grid-cols-3">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-start gap-3 rounded-2xl bg-white/70 p-5 transition-transform hover:-translate-y-0.5"
          >
            <IdCard className="mt-0.5 size-5 text-accent-dark" />
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.08em] text-muted">Email</p>
              <p className="mt-1 font-medium text-foreground group-hover:text-accent-dark">
                {profile.email}
              </p>
            </div>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3 rounded-2xl bg-white/70 p-5 transition-transform hover:-translate-y-0.5"
          >
            <ArrowRight className="mt-0.5 size-5 text-accent-dark" />
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.08em] text-muted">LinkedIn</p>
              <p className="mt-1 font-medium text-foreground group-hover:text-accent-dark">
                Connect on LinkedIn
              </p>
            </div>
          </a>
          <div className="flex items-start gap-3 rounded-2xl bg-white/70 p-5">
            <MapPin className="mt-0.5 size-5 text-accent-dark" />
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.08em] text-muted">Location</p>
              <p className="mt-1 font-medium text-foreground">{profile.location}</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={casesRef} className="reveal mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Case Studies</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          What I've designed recently
        </h2>
        <div className="mt-10 space-y-8">
          {featuredCases.map((caseStudy, index) => (
            <FeaturedCaseCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
          ))}
        </div>
      </section>

      <section ref={strengthsRef} className="reveal bg-accent-softer">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Why Me?</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            My key strengths
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {profile.strengths.map((strength, index) => (
              <StrengthCard key={strength.title} strength={strength} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section ref={refsRef} className="reveal mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">References</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          Don't take it from me – hear it from my managers & peers
        </h2>
        <div className="mt-10">
          <TestimonialCarousel testimonials={profile.testimonials} />
        </div>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-dark transition-colors hover:text-accent"
        >
          More on LinkedIn
          <ArrowRight className="size-4" />
        </a>
      </section>
    </>
  );
}
