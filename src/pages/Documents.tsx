import { Navigate, Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { Seo } from "@/components/Seo";
import {
  ADMIN_PATH,
  ADMIN_STORAGE_KEY,
  DOCUMENT_FOLDERS,
  IMMIGRATION_PATH,
} from "@/content/admin";
import { documentsSeo } from "@/content/seo";

export default function Documents() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={documentsSeo} />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Immigration</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Documents
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Shared documents used across immigration processes (AAIP, Express Entry, and others).
      </p>

      <ul className="mt-10 space-y-4">
        {DOCUMENT_FOLDERS.map((folder) => (
          <li key={folder.to}>
            <Link
              to={folder.to}
              className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <div className="min-w-0">
                <p className="text-base font-medium text-foreground">{folder.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{folder.description}</p>
              </div>
              <ArrowRight
                className="mt-1 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-dark"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-4">
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
