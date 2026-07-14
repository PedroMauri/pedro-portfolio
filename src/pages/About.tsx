import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "@/content/profile";
import { useReveal } from "@/hooks/useReveal";

export default function About() {
  const introRef = useReveal<HTMLElement>();
  const statsRef = useReveal<HTMLElement>();
  const experienceRef = useReveal<HTMLElement>();

  return (
    <>
      <section ref={introRef} className="reveal border-b border-border bg-gradient-to-b from-accent-softer to-white">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
          <img
            src={profile.photo}
            alt={profile.name}
            className="mb-8 size-36 rounded-[1.75rem] object-cover shadow-[0_16px_50px_rgba(11,11,11,0.12)] sm:size-44"
          />
          <p className="text-lg font-medium text-accent-dark">{profile.aboutGreeting}</p>
          <h1 className="mt-4 text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            {profile.aboutHeadline}
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
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
              Download Resume
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="reveal bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Fun Stats</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            What I've accomplished in my free time
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profile.funStats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] border border-border bg-white p-6">
                <p className="text-4xl font-medium tracking-tight text-foreground">{stat.value}</p>
                <p className="mt-2 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={experienceRef} className="reveal mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Work experience</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          The journey of my career
        </h2>
        <div className="mt-12 space-y-10">
          {profile.experience.map((item) => (
            <div key={item.company} className="border-b border-border pb-10 last:border-b-0">
              <h3 className="text-2xl font-medium tracking-tight text-foreground">{item.company}</h3>
              <div className="mt-5 space-y-5">
                {item.roles.map((role) => (
                  <div key={`${item.company}-${role.title}-${role.period}`}>
                    <p className="text-lg font-medium text-foreground">{role.title}</p>
                    <p className="mt-1 text-muted">{role.period}</p>
                    {role.tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-dark"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/resume"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-dark transition-colors hover:text-accent"
        >
          Download Resume
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </>
  );
}
