import { Navigate, Link, useParams } from "react-router-dom";
import { AdminBackLink } from "@/components/AdminBackLink";
import { Seo } from "@/components/Seo";
import {
  ADMIN_PATH,
  ADMIN_STORAGE_KEY,
  IMMIGRATION_FOLDERS,
  IMMIGRATION_PATH,
} from "@/content/admin";
import { DEFAULT_OG_IMAGE, type SeoPage } from "@/content/seo";
import { profile } from "@/content/profile";

const FOLDER_BY_SLUG = Object.fromEntries(
  IMMIGRATION_FOLDERS.filter((folder) => folder.to !== `${IMMIGRATION_PATH}/documents` && folder.to !== `${IMMIGRATION_PATH}/aaip`).map(
    (folder) => {
      const slug = folder.to.replace(`${IMMIGRATION_PATH}/`, "");
      return [slug, folder];
    }
  )
);

function folderSeo(label: string, path: string, description: string): SeoPage {
  return {
    path,
    title: `${label} | Immigration | ${profile.name}`,
    description,
    image: DEFAULT_OG_IMAGE,
    type: "website",
    noindex: true,
  };
}

export default function ImmigrationFolder() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";
  const { slug = "" } = useParams();
  const folder = FOLDER_BY_SLUG[slug];

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  if (!folder) {
    return <Navigate to={IMMIGRATION_PATH} replace />;
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={folderSeo(folder.label, folder.to, folder.description)} />
      <AdminBackLink to={IMMIGRATION_PATH} label="Back to immigration" />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Immigration</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        {folder.label}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {folder.description}. Content will be added next.
      </p>
      <Link
        to={IMMIGRATION_PATH}
        className="mt-8 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Back to immigration
      </Link>
    </section>
  );
}
