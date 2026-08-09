import { type ReactNode } from "react";
import { Navigate, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Seo } from "@/components/Seo";
import { aaipPortal, aaipProfile } from "@/content/aaip";
import { ADMIN_PATH, ADMIN_STORAGE_KEY, IMMIGRATION_PATH } from "@/content/admin";
import { aaipSeo } from "@/content/seo";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border py-3 last:border-b-0 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-4">
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-base text-foreground sm:mt-0">{value}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-medium text-foreground">{title}</h2>
      <dl className="mt-3 border-t border-border">{children}</dl>
    </section>
  );
}

export default function Aaip() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={aaipSeo} />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Immigration</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">AAIP</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Alberta Advantage Immigration Program — profile reference for the next Worker EOI.
      </p>

      <div
        className="mt-8 rounded-2xl border border-border bg-accent-softer px-5 py-4"
        role="status"
      >
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-accent-dark">
          Status · {aaipProfile.statusLabel}
        </p>
        <p className="mt-2 text-base leading-relaxed text-foreground/80">{aaipProfile.statusSummary}</p>
      </div>

      <Section title="Portal">
        <Field
          label="Login"
          value={aaipPortal.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        />
        <div className="border-b border-border py-3 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-4">
          <dt className="text-sm font-medium text-muted">Open portal</dt>
          <dd className="mt-1 sm:mt-0">
            <a
              href={aaipPortal.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              aaip.labour.alberta.ca
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </dd>
        </div>
        <Field label="Username" value={aaipPortal.username} />
        <Field label="Password" value={aaipPortal.passwordNote} />
      </Section>

      <Section title="Pathway">
        <Field label="Interested pathway" value={aaipProfile.pathway} />
      </Section>

      <Section title="Occupation">
        <Field label="NOC" value={`${aaipProfile.noc.code} — ${aaipProfile.noc.title}`} />
      </Section>

      <Section title="Work authorization">
        <Field label="Work permit type" value={aaipProfile.workPermit.type} />
        <Field label="Work permit expiry" value={aaipProfile.workPermit.expiryDisplay} />
      </Section>

      <Section title="Express Entry (linked)">
        <Field label="EE profile number" value={aaipProfile.expressEntry.profileNumber} />
        <Field label="CRS score" value={String(aaipProfile.expressEntry.crsScore)} />
      </Section>

      <Section title="Education and language">
        <Field label="Highest education" value={aaipProfile.education.highestLevel} />
        <Field
          label="ECA completed"
          value={aaipProfile.education.ecaCompleted ? "Yes" : "No"}
        />
        <Field label="English proficiency" value={aaipProfile.englishProficiency} />
      </Section>

      <Section title="Experience and job offer">
        <Field label="Total work experience" value={aaipProfile.totalWorkExperience} />
        <Field label="Job offer" value={aaipProfile.jobOffer} />
      </Section>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">Next Worker EOI</h2>
        <ol className="mt-4 list-decimal space-y-2 border-t border-border pt-4 pl-5 text-base leading-relaxed text-foreground/80">
          {aaipProfile.notesForNextWorkerEoi.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ol>
      </section>

      <Link
        to={IMMIGRATION_PATH}
        className="mt-12 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Back to immigration
      </Link>
    </article>
  );
}
