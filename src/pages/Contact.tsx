import { ExternalLink, Mail } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/content/profile";

export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Let us talk about your product"
        description="Open to product design roles and select freelance projects in B2B SaaS."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <Mail className="size-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">Email</p>
            <p className="text-sm text-muted">{profile.email}</p>
          </div>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <ExternalLink className="size-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">LinkedIn</p>
            <p className="text-sm text-muted">Connect professionally</p>
          </div>
        </a>
      </div>
    </section>
  );
}
