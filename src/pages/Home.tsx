import { IdCard, MapPin } from "lucide-react";
import { FeaturedCaseCard } from "@/components/FeaturedCaseCard";
import { HeroRotator } from "@/components/HeroRotator";
import { Seo } from "@/components/Seo";
import { StrengthCard } from "@/components/StrengthCard";
import { getFeaturedCases } from "@/content/cases";
import { profile } from "@/content/profile";
import { homeSeo } from "@/content/seo";
import { useReveal } from "@/hooks/useReveal";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Home() {
  const featuredCases = getFeaturedCases();
  const contactRef = useReveal<HTMLElement>();
  const casesRef = useReveal<HTMLElement>();
  const strengthsRef = useReveal<HTMLElement>();

  return (
    <>
      <Seo page={homeSeo} />
      <section className="relative flex min-h-[calc(100svh-4.25rem)] items-center justify-center overflow-hidden bg-accent-softer">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,149,159,0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-soft/40 via-transparent to-accent-softer" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-16 text-center sm:px-8">
          <img
            src={profile.photo}
            alt={profile.name}
            width={128}
            height={128}
            decoding="async"
            className="mb-8 size-28 rounded-full object-cover shadow-[0_12px_40px_rgba(11,11,11,0.12)] ring-4 ring-white sm:size-32"
          />
          <p className="shrink-0 text-lg font-medium text-accent-dark sm:text-xl">
            {profile.welcome}
          </p>
          <div className="mt-6 w-full shrink-0">
            <HeroRotator className="mx-auto text-center" />
          </div>
        </div>
      </section>

      <section
        id="get-in-touch"
        ref={contactRef}
        className="reveal border-y border-border bg-cream"
      >
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:gap-5 sm:px-8 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="group flex flex-col items-center gap-2 rounded-2xl bg-white/70 p-5 text-center transition-transform hover:-translate-y-0.5"
          >
            <IdCard className="size-5 shrink-0 text-accent-dark" />
            <p className="break-all font-medium text-foreground group-hover:text-accent-dark">
              {profile.email}
            </p>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="group flex flex-col items-center gap-2 rounded-2xl bg-white/70 p-5 text-center transition-transform hover:-translate-y-0.5"
          >
            <LinkedInIcon className="size-5 shrink-0 text-accent-dark" />
            <p className="font-medium text-foreground group-hover:text-accent-dark">
              Connect on LinkedIn
            </p>
          </a>
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/70 p-5 text-center sm:col-span-2 lg:col-span-1">
            <MapPin className="size-5 shrink-0 text-accent-dark" aria-hidden="true" />
            <p className="font-medium text-foreground">{profile.location}</p>
          </div>
        </div>
      </section>

      <section ref={casesRef} className="reveal mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="text-center lg:text-left">
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Case Studies</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            What I've designed recently
          </h2>
        </div>
        <div className="mt-10 space-y-8">
          {featuredCases.map((caseStudy, index) => (
            <FeaturedCaseCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
          ))}
        </div>
      </section>

      <section ref={strengthsRef} className="reveal bg-accent-softer">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Why Me?</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              My key strengths
            </h2>
          </div>
          <div className="mt-10 grid justify-items-center gap-5 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3">
            {profile.strengths.map((strength, index) => (
              <StrengthCard key={strength.title} strength={strength} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
