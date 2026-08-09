import { Navigate, Link, useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { AdminBackLink } from "@/components/AdminBackLink";
import { Seo } from "@/components/Seo";
import { ADMIN_PATH, ADMIN_STORAGE_KEY, DOCUMENTS_PATH } from "@/content/admin";
import {
  docsForPerson,
  groupDocsByKind,
  isDocExpired,
  type RegistryDoc,
} from "@/content/documentsRegistry";
import { getPerson, type PersonId } from "@/content/people";
import { DEFAULT_OG_IMAGE, type SeoPage } from "@/content/seo";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const PERSON_IDS: PersonId[] = ["pedro", "caroline", "davi", "henry"];

function personSeo(displayName: string, path: string): SeoPage {
  return {
    path,
    title: `${displayName} | Documents | ${profile.name}`,
    description: `Private immigration documents for ${displayName}.`,
    image: DEFAULT_OG_IMAGE,
    type: "website",
    noindex: true,
  };
}

/** Strip status suffix from labels — status is shown once in the meta line. */
function displayLabel(label: string): string {
  return label.replace(/\s*—\s*(current|expired)\s*$/i, "").trim();
}

/** Single status line: date if current, or Expired. */
function statusMeta(doc: RegistryDoc): string | null {
  if (isDocExpired(doc)) return "Expired";
  if (doc.expiresOn) return `Valid to ${doc.expiresOn}`;
  return null;
}

export default function DocumentPerson() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";
  const { personId = "" } = useParams();

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  if (!PERSON_IDS.includes(personId as PersonId)) {
    return <Navigate to={DOCUMENTS_PATH} replace />;
  }

  const person = getPerson(personId)!;
  const docs = docsForPerson(person.id);
  const groups = groupDocsByKind(docs);
  const path = `${DOCUMENTS_PATH}/person/${person.id}`;

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={personSeo(person.displayName, path)} />
      <AdminBackLink to={DOCUMENTS_PATH} label="Back to documents" />

      <div className="mt-2 flex items-center gap-5">
        {person.photoHref ? (
          <img
            src={person.photoHref}
            alt=""
            className="size-20 shrink-0 rounded-full object-cover ring-1 ring-border sm:size-24"
          />
        ) : null}
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Documents</p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            {person.displayName}
          </h1>
          <p className="mt-2 text-muted">
            {docs.length} document{docs.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.kind}>
            <h2 className="text-lg font-medium text-foreground">{group.label}</h2>
            <ul className="mt-4 space-y-3">
              {group.docs.map((doc) => {
                const expired = isDocExpired(doc);
                const meta = statusMeta(doc);
                return (
                  <li key={doc.id}>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "group flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-4 transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
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
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block text-base font-medium",
                            expired
                              ? "text-red-700 dark:text-red-400"
                              : "text-foreground group-hover:text-accent-dark"
                          )}
                        >
                          {displayLabel(doc.label)}
                          {meta ? (
                            <span
                              className={cn(
                                "font-normal",
                                expired ? "text-red-600/90 dark:text-red-400/90" : "text-muted"
                              )}
                            >
                              {" · "}
                              {meta}
                            </span>
                          ) : null}
                        </span>
                        {doc.note ? (
                          <span
                            className={cn(
                              "mt-1 block text-sm",
                              expired ? "text-red-600/80 dark:text-red-400/80" : "text-muted"
                            )}
                          >
                            {doc.note}
                          </span>
                        ) : null}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <Link
        to={DOCUMENTS_PATH}
        className="mt-12 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Back to documents
      </Link>
    </section>
  );
}
