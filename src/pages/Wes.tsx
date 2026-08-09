import { type ReactNode } from "react";
import { Navigate, Link } from "react-router-dom";
import { ExternalLink, FileText } from "lucide-react";
import { AdminBackLink } from "@/components/AdminBackLink";
import { RevealPassword } from "@/components/RevealPassword";
import { Seo } from "@/components/Seo";
import { ADMIN_PATH, ADMIN_STORAGE_KEY } from "@/content/admin";
import { EDUCATION_PATH } from "@/content/documentsCatalog";
import { getWesValidity, wesEca, wesPortal } from "@/content/wes";
import { wesSeo } from "@/content/seo";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-border py-3 last:border-b-0 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-4">
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-base text-foreground sm:mt-0">{children}</dd>
    </div>
  );
}

export default function Wes() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";
  const validity = getWesValidity();

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={wesSeo} />
      <AdminBackLink to={EDUCATION_PATH} label="Back to education" />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Education</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">WES</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        World Education Services Educational Credential Assessment (ECA) for IRCC immigration.
      </p>

      <div
        className="mt-8 rounded-2xl border border-border bg-accent-softer px-5 py-4"
        role="status"
      >
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-accent-dark">
          Validity · {validity.statusLabel}
        </p>
        <p className="mt-2 text-base leading-relaxed text-foreground/80">{validity.summary}</p>
        <p className="mt-3 text-sm text-muted">
          Issued: {wesEca.issueDateDisplay} · Expires:{" "}
          <strong className="font-medium text-foreground">{wesEca.expiresDisplay}</strong>
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">WES account</h2>
        <dl className="mt-3 border-t border-border">
          <Field label="Open portal">
            <a
              href={wesPortal.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              applications.wes.org
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </Field>
          <Field label="Username">{wesPortal.username}</Field>
          <Field label="Password">
            <RevealPassword value={wesPortal.password} />
          </Field>
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">ECA report</h2>
        <dl className="mt-3 border-t border-border">
          <Field label="ECA number">{wesEca.referenceNumber}</Field>
          <Field label="Canadian equivalency">{wesEca.canadianEquivalency}</Field>
          <Field label="Credential">{wesEca.credential}</Field>
          <Field label="Institution">{wesEca.institution}</Field>
          <Field label="Credential year">{wesEca.credentialYear}</Field>
          <Field label="Issued">{wesEca.issueDateDisplay}</Field>
          <Field label="Expires">{wesEca.expiresDisplay}</Field>
          <Field label="Document">
            <a
              href={wesEca.pdfPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FileText className="size-4" aria-hidden="true" />
              {wesEca.pdfLabel}
            </a>
          </Field>
        </dl>
      </section>

      <Link
        to={EDUCATION_PATH}
        className="mt-12 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Back to education
      </Link>
    </article>
  );
}
