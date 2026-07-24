import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { notFoundSeo } from "@/content/seo";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
      <Seo page={notFoundSeo} />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">404</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          Go home
        </Link>
        <Link
          to="/case-studies"
          className="inline-flex items-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
        >
          View case studies
        </Link>
      </div>
    </section>
  );
}
