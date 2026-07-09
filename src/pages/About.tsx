import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";

export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-5xl font-semibold text-white lg:h-80">
          PM
        </div>
        <div>
          <SectionHeading eyebrow="About" title={profile.name} description={profile.title} />
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-medium uppercase tracking-wider text-accent">Tools and methods</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-8 text-sm text-muted">Based in {profile.location}</p>
        </div>
      </div>
    </section>
  );
}
