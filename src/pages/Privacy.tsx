import { Seo } from "@/components/Seo";
import { privacySeo } from "@/content/seo";

export default function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={privacySeo} />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Privacy</p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Privacy
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
        <p>
          This site uses{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent-dark underline-offset-2 hover:underline"
          >
            Vercel Web Analytics
          </a>{" "}
          to understand aggregate traffic (page views and basic audience metrics).
        </p>
        <p>
          Vercel Web Analytics is privacy-friendly: it does not use cookies for tracking, and it
          does not collect personal information that identifies you as an individual.
        </p>
        <p>
          If you have questions, email{" "}
          <a
            href="mailto:contact@pedromauri.com"
            className="font-medium text-accent-dark underline-offset-2 hover:underline"
          >
            contact@pedromauri.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
