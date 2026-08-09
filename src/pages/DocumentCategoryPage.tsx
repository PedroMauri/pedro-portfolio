import { Navigate, Link, useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import { AdminBackLink } from "@/components/AdminBackLink";
import { Seo } from "@/components/Seo";
import { ADMIN_PATH, ADMIN_STORAGE_KEY, DOCUMENTS_PATH } from "@/content/admin";
import { DOCUMENT_CATEGORIES } from "@/content/documentsCatalog";
import { DEFAULT_OG_IMAGE, type SeoPage } from "@/content/seo";
import { profile } from "@/content/profile";

const BY_SLUG = Object.fromEntries(
  DOCUMENT_CATEGORIES.map((category) => {
    const slug = category.path.replace(`${DOCUMENTS_PATH}/`, "");
    return [slug, category];
  })
);

function categorySeo(label: string, path: string, description: string): SeoPage {
  return {
    path,
    title: `${label} | Documents | ${profile.name}`,
    description,
    image: DEFAULT_OG_IMAGE,
    type: "website",
    noindex: true,
  };
}

export default function DocumentCategoryPage() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";
  const { slug = "" } = useParams();
  const category = BY_SLUG[slug];

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  if (!category) {
    return <Navigate to={DOCUMENTS_PATH} replace />;
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={categorySeo(category.label, category.path, category.description)} />
      <AdminBackLink to={DOCUMENTS_PATH} label="Back to documents" />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Documents</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        {category.label}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{category.description}</p>

      <ul className="mt-10 space-y-3 border-t border-border pt-6">
        {category.files.map((file) => (
          <li key={file.href}>
            <a
              href={file.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-4 transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FileText className="mt-0.5 size-5 shrink-0 text-accent-dark" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-base font-medium text-foreground group-hover:text-accent-dark">
                  {file.label}
                </span>
                {file.note ? <span className="mt-1 block text-sm text-muted">{file.note}</span> : null}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <Link
        to={DOCUMENTS_PATH}
        className="mt-12 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Back to documents
      </Link>
    </section>
  );
}
