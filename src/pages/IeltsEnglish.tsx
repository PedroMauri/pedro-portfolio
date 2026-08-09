import { type ReactNode } from "react";
import { Navigate, Link } from "react-router-dom";
import { ExternalLink, FileText } from "lucide-react";
import { AdminBackLink } from "@/components/AdminBackLink";
import { RevealPassword } from "@/components/RevealPassword";
import { Seo } from "@/components/Seo";
import { ADMIN_PATH, ADMIN_STORAGE_KEY, DOCUMENTS_PATH } from "@/content/admin";
import {
  formatBand,
  getIeltsValidity,
  ieltsEnglishPortal,
  ieltsEnglishScores,
  ieltsEnglishTrf,
} from "@/content/ieltsEnglish";
import { ieltsEnglishSeo } from "@/content/seo";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-border py-3 last:border-b-0 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-4">
      <dt className="text-sm font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-base text-foreground sm:mt-0">{children}</dd>
    </div>
  );
}

function ScoreCell({ label, score, emphasize = false }: { label: string; score: number; emphasize?: boolean }) {
  return (
    <div
      className={
        emphasize
          ? "rounded-2xl border border-accent bg-accent-soft px-4 py-4 text-center"
          : "rounded-2xl border border-border bg-card px-4 py-4 text-center"
      }
    >
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="mt-2 text-3xl font-medium tabular-nums text-foreground">{formatBand(score)}</p>
    </div>
  );
}

export default function IeltsEnglish() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";
  const validity = getIeltsValidity();

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={ieltsEnglishSeo} />
      <AdminBackLink to={DOCUMENTS_PATH} label="Back to documents" />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Documents</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        IELTS (English)
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        IDP account and Electronic Test Report Form used across immigration processes.
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
          Test date: {ieltsEnglishTrf.testDateDisplay} · Expires:{" "}
          <strong className="font-medium text-foreground">{ieltsEnglishTrf.expiresDisplay}</strong>
        </p>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">Scores</h2>
        <p className="mt-2 text-sm text-muted">
          {ieltsEnglishScores.module} · CEFR {ieltsEnglishScores.cefr}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <ScoreCell label="Listening" score={ieltsEnglishScores.listening} />
          <ScoreCell label="Reading" score={ieltsEnglishScores.reading} />
          <ScoreCell label="Writing" score={ieltsEnglishScores.writing} />
          <ScoreCell label="Speaking" score={ieltsEnglishScores.speaking} />
          <ScoreCell label="Overall" score={ieltsEnglishScores.overall} emphasize />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">IDP account</h2>
        <dl className="mt-3 border-t border-border">
          <Field label="Open portal">
            <a
              href={ieltsEnglishPortal.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              account.ielts.idp.com
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </Field>
          <Field label="Username">{ieltsEnglishPortal.username}</Field>
          <Field label="Password">
            <RevealPassword value={ieltsEnglishPortal.password} />
          </Field>
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">Test report</h2>
        <dl className="mt-3 border-t border-border">
          <Field label="Candidate number">{ieltsEnglishTrf.candidateNumber}</Field>
          <Field label="Module">{ieltsEnglishScores.module}</Field>
          <Field label="Test date">{ieltsEnglishTrf.testDateDisplay}</Field>
          <Field label="Expires">{ieltsEnglishTrf.expiresDisplay}</Field>
          <Field label="Document">
            <a
              href={ieltsEnglishTrf.pdfPath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FileText className="size-4" aria-hidden="true" />
              {ieltsEnglishTrf.pdfLabel}
            </a>
          </Field>
        </dl>
      </section>

      <Link
        to={DOCUMENTS_PATH}
        className="mt-12 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Back to documents
      </Link>
    </article>
  );
}
