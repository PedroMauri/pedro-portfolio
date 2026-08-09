import { Navigate, Link } from "react-router-dom";
import { AdminBackLink } from "@/components/AdminBackLink";
import { Seo } from "@/components/Seo";
import { ADMIN_PATH, ADMIN_STORAGE_KEY } from "@/content/admin";
import { frenchStudySeo } from "@/content/seo";

export default function FrenchStudy() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={frenchStudySeo} />
      <AdminBackLink to={ADMIN_PATH} label="Back to admin" />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Private study</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        French
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Personal IELTS French study space. Content will be added next.
      </p>
      <Link
        to={ADMIN_PATH}
        className="mt-8 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Back to admin
      </Link>
    </section>
  );
}
