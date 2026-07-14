import { ArrowRight, FileText } from "lucide-react";
import { profile } from "@/content/profile";

export default function Resume() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Resume</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Download my resume
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Grab a PDF copy of my experience, selected work, and contact details.
      </p>

      <div className="mx-auto mt-10 max-w-md rounded-[1.75rem] border border-border bg-accent-softer p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-accent-dark shadow-sm">
          <FileText className="size-6" />
        </div>
        <h2 className="mt-6 text-2xl font-medium tracking-tight text-foreground">
          {profile.name} — Resume
        </h2>
        <p className="mt-2 text-muted">{profile.title}</p>

        <a
          href={profile.resumeUrl}
          download="Pedro-Mauri-Resume.pdf"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          Download PDF
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
