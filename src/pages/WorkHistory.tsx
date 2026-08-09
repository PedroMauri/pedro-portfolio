import { Navigate, Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { AdminBackLink } from "@/components/AdminBackLink";
import { Seo } from "@/components/Seo";
import { ADMIN_PATH, ADMIN_STORAGE_KEY, DOCUMENTS_PATH } from "@/content/admin";
import {
  workHistoryEntries,
  workHistoryLetters,
  workHistorySource,
} from "@/content/workHistory";
import { workHistorySeo } from "@/content/seo";

export default function WorkHistory() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <article className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={workHistorySeo} />
      <AdminBackLink to={DOCUMENTS_PATH} label="Back to documents" />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Documents</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Work history
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Schedule A (IMM 5708) work history for Express Entry, with reference letters linked below.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-accent-softer px-5 py-4">
        <p className="text-sm font-medium text-foreground">{workHistorySource.form}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{workHistorySource.note}</p>
        <a
          href={workHistorySource.href}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-dark underline-offset-2 hover:underline"
        >
          <FileText className="size-4" aria-hidden="true" />
          Download Schedule A source
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground">Schedule A table</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-card text-xs uppercase tracking-[0.06em] text-muted">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 font-medium">From</th>
                <th className="whitespace-nowrap px-4 py-3 font-medium">To</th>
                <th className="px-4 py-3 font-medium">Activity</th>
                <th className="px-4 py-3 font-medium">City or town and country</th>
                <th className="px-4 py-3 font-medium">Company / employer</th>
              </tr>
            </thead>
            <tbody>
              {workHistoryEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-border last:border-b-0 align-top">
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-foreground">
                    {entry.from}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-foreground">
                    {entry.toLabel}
                  </td>
                  <td className="px-4 py-3 text-foreground">{entry.activity}</td>
                  <td className="px-4 py-3 text-muted">{entry.location}</td>
                  <td className="px-4 py-3 text-foreground">{entry.employer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-medium text-foreground">Reference letters</h2>
        <p className="mt-2 text-sm text-muted">
          Letters on file. Open each PDF to confirm exact wording and dates before EE submission.
        </p>
        <ul className="mt-6 space-y-3">
          {workHistoryLetters.map((letter) => (
            <li key={letter.href}>
              <a
                href={letter.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-4 transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FileText className="mt-0.5 size-5 shrink-0 text-accent-dark" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-base font-medium text-foreground group-hover:text-accent-dark">
                    {letter.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{letter.covers}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
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
