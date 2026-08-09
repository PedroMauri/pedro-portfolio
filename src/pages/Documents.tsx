import { useId, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { ArrowRight, FileText, Lock, Search } from "lucide-react";
import { AdminBackLink } from "@/components/AdminBackLink";
import { Seo } from "@/components/Seo";
import {
  ADMIN_PATH,
  ADMIN_STORAGE_KEY,
  IMMIGRATION_PATH,
} from "@/content/admin";
import {
  DOCUMENTS_REGISTRY,
  DOC_KIND_LABELS,
  countDocsForPerson,
  isDocExpired,
  searchDocuments,
} from "@/content/documentsRegistry";
import { FAMILY_PEOPLE, personDocumentsPath, type PersonId, getPerson } from "@/content/people";
import { documentsSeo } from "@/content/seo";
import { cn } from "@/lib/utils";

function personLabel(id: PersonId): string {
  return getPerson(id)?.displayName ?? id;
}

export default function Documents() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";
  const [query, setQuery] = useState("");
  const searchId = useId();

  const results = useMemo(
    () => searchDocuments(DOCUMENTS_REGISTRY, query),
    [query]
  );
  const searching = query.trim().length > 0;

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={documentsSeo} />
      <AdminBackLink to={IMMIGRATION_PATH} label="Back to immigration" />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Immigration</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Documents
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Family document vault — search by person or document name. Expired permits show in red;
        current status docs stay on top.
      </p>

      <div className="relative mt-8">
        <label htmlFor={searchId} className="sr-only">
          Search documents
        </label>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by person or document name…"
          className="w-full rounded-2xl border border-border bg-card py-3.5 pl-11 pr-4 text-base text-foreground outline-none placeholder:text-muted-soft focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      {searching ? (
        <section className="mt-8" aria-live="polite">
          <h2 className="text-sm font-medium uppercase tracking-[0.08em] text-muted">
            {results.length} result{results.length === 1 ? "" : "s"}
          </h2>
          {results.length === 0 ? (
            <p className="mt-4 text-muted">No documents match “{query.trim()}”.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {results.map((doc) => {
                const expired = isDocExpired(doc);
                return (
                  <li key={doc.id}>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "group flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                        expired && "border-red-200/80 dark:border-red-900/50"
                      )}
                    >
                      <FileText
                        className={cn(
                          "mt-0.5 size-5 shrink-0",
                          expired ? "text-red-600 dark:text-red-400" : "text-accent-dark"
                        )}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block text-base font-medium",
                            expired
                              ? "text-red-700 dark:text-red-400"
                              : "text-foreground group-hover:text-accent-dark"
                          )}
                        >
                          {doc.label.replace(/\s*—\s*(current|expired)\s*$/i, "").trim()}
                          {expired ? (
                            <span className="font-normal text-red-600/90 dark:text-red-400/90">
                              {" · Expired"}
                            </span>
                          ) : doc.expiresOn ? (
                            <span className="font-normal text-muted">
                              {` · Valid to ${doc.expiresOn}`}
                            </span>
                          ) : null}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-sm",
                            expired ? "text-red-600/90 dark:text-red-400/90" : "text-muted"
                          )}
                        >
                          {personLabel(doc.person)} · {DOC_KIND_LABELS[doc.kind]}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ) : (
        <section className="mt-10">
          <h2 className="text-lg font-medium text-foreground">People</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {FAMILY_PEOPLE.map((person) => {
              const count = countDocsForPerson(person.id);
              return (
                <li key={person.id}>
                  <Link
                    to={personDocumentsPath(person.id)}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4 transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {person.photoHref ? (
                      <img
                        src={person.photoHref}
                        alt=""
                        className="size-14 shrink-0 rounded-full object-cover ring-1 ring-border"
                      />
                    ) : (
                      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent-soft text-lg font-medium text-accent-dark">
                        {person.displayName.slice(0, 1)}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-medium text-foreground group-hover:text-accent-dark">
                        {person.displayName}
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">
                        {count} document{count === 1 ? "" : "s"}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-dark"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <Link
          to={IMMIGRATION_PATH}
          className="inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Back to immigration
        </Link>
        <p className="flex items-center gap-2 text-sm text-muted-soft">
          <Lock className="size-3.5" aria-hidden="true" />
          Not listed in site navigation
        </p>
      </div>
    </section>
  );
}
