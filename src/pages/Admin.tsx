import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { Seo } from "@/components/Seo";
import {
  ADMIN_LINKS,
  ADMIN_PASSWORD,
  ADMIN_STORAGE_KEY,
} from "@/content/admin";
import { adminSeo } from "@/content/seo";
import { cn } from "@/lib/utils";

function AdminGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const errorId = useId();
  const titleId = useId();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "1");
      setError(false);
      onUnlock();
      return;
    }
    setError(true);
  }

  return (
    <section className="mx-auto max-w-md px-5 py-20 sm:px-8 sm:py-28" aria-labelledby={titleId}>
      <Seo page={adminSeo} />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Private</p>
      <h1 id={titleId} className="mt-3 text-3xl font-medium tracking-tight text-foreground">
        Admin
      </h1>
      <p className="mt-4 text-muted">Enter the admin password to continue.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        <label className="block text-sm font-medium text-foreground" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={value}
          aria-invalid={error}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        {error ? (
          <p id={errorId} role="alert" className="text-sm text-red-600 dark:text-red-400">
            Incorrect password. Please try again.
          </p>
        ) : null}
        <button
          type="submit"
          className="inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Unlock
        </button>
      </form>
    </section>
  );
}

function AdminHub({ onLogout }: { onLogout: () => void }) {
  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={adminSeo} />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Private</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Admin
          </h1>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-1 inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Log out
        </button>
      </div>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Quick links to the public portfolio, company-specific shares, and personal spaces.
      </p>

      <ul className="mt-10 space-y-4">
        {ADMIN_LINKS.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={cn(
                "group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              )}
            >
              <div className="min-w-0">
                <p className="text-base font-medium text-foreground">{link.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{link.description}</p>
              </div>
              <ArrowRight
                className="mt-1 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-dark"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 flex items-center gap-2 text-sm text-muted-soft">
        <Lock className="size-3.5" aria-hidden="true" />
        Not listed in site navigation or search indexes.
      </p>
    </section>
  );
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1"
  );

  function logout() {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setUnlocked(false);
  }

  return unlocked ? (
    <AdminHub onLogout={logout} />
  ) : (
    <AdminGate onUnlock={() => setUnlocked(true)} />
  );
}
