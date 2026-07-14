import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "@/content/profile";
import { useReveal } from "@/hooks/useReveal";

export default function About() {
  const introRef = useReveal<HTMLElement>();

  return (
    <section ref={introRef} className="reveal border-b border-border bg-gradient-to-b from-accent-softer to-white">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <img
          src={profile.photo}
          alt={profile.name}
          className="mx-auto mb-8 size-36 rounded-[1.75rem] object-cover shadow-[0_16px_50px_rgba(11,11,11,0.12)] lg:mx-0 lg:size-44"
        />
        <p className="text-center text-lg font-medium text-accent-dark lg:text-left">
          {profile.aboutGreeting}
        </p>
        <h1 className="mt-4 text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          {profile.aboutHeadline}
        </h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            View LinkedIn
            <ArrowRight className="size-4" />
          </a>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
          >
            View resume
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
