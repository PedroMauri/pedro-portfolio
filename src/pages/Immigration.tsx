import { Navigate, Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { ADMIN_PATH, ADMIN_STORAGE_KEY } from "@/content/admin";
import { immigrationSeo } from "@/content/seo";

export default function Immigration() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={immigrationSeo} />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Private</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Immigration
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Private immigration notes and materials. Content will be added next.
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
