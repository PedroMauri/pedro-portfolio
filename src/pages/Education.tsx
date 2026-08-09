import { Navigate, Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { AdminBackLink } from "@/components/AdminBackLink";
import { Seo } from "@/components/Seo";
import { ADMIN_PATH, ADMIN_STORAGE_KEY, DOCUMENTS_PATH } from "@/content/admin";
import { EDUCATION_PATH, WES_PATH } from "@/content/documentsCatalog";
import { educationSeo } from "@/content/seo";

const HIGH_SCHOOL = {
  label: "High school diploma",
  href: "/documents/education/high-school.pdf",
} as const;

export default function Education() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={educationSeo} />
      <AdminBackLink to={DOCUMENTS_PATH} label="Back to documents" />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Documents</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Education
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        School credentials and Canadian equivalency (WES ECA) for immigration.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">School documents</h2>
        <ul className="mt-4 space-y-3">
          <li>
            <a
              href={HIGH_SCHOOL.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-4 transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FileText className="mt-0.5 size-5 shrink-0 text-accent-dark" aria-hidden="true" />
              <span className="text-base font-medium text-foreground group-hover:text-accent-dark">
                {HIGH_SCHOOL.label}
              </span>
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">Credential assessment</h2>
        <Link
          to={WES_PATH}
          className="mt-4 group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className="min-w-0">
            <p className="text-base font-medium text-foreground">WES</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              ECA report, portal login, and 5-year IRCC validity
            </p>
          </div>
          <ArrowRight
            className="mt-1 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-dark"
            aria-hidden="true"
          />
        </Link>
      </section>

      <Link
        to={DOCUMENTS_PATH}
        className="mt-12 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Back to documents
      </Link>
    </section>
  );
}
