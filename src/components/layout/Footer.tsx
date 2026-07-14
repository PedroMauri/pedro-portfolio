import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { profile } from "@/content/profile";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-accent-softer">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profile.photo}
            alt=""
            className="size-12 rounded-full object-cover ring-2 ring-white"
          />
          <div>
            <p className="text-xl font-medium tracking-tight text-foreground">{profile.name}</p>
            <p className="mt-1 text-muted">{profile.title}</p>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-5 text-sm font-medium md:justify-end">
            <Link to="/" className="text-muted transition-colors hover:text-accent-dark">
              Home
            </Link>
            <Link to="/case-studies" className="text-muted transition-colors hover:text-accent-dark">
              Case Studies
            </Link>
            <Link to="/about" className="text-muted transition-colors hover:text-accent-dark">
              About
            </Link>
            <Link to="/resume" className="text-muted transition-colors hover:text-accent-dark">
              Resume
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-3 md:justify-end">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex size-10 items-center justify-center rounded-full bg-white text-accent-dark shadow-sm transition-transform hover:-translate-y-0.5"
              aria-label="Email"
            >
              <Mail className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white text-accent-dark shadow-sm transition-transform hover:-translate-y-0.5"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <p className="text-sm text-muted-soft">© {new Date().getFullYear()} – {profile.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
