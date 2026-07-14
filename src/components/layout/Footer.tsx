import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { profile } from "@/content/profile";

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
          <div className="mt-6 flex items-center gap-4 md:justify-end">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex size-10 items-center justify-center rounded-full bg-white text-accent-dark shadow-sm transition-transform hover:-translate-y-0.5"
              aria-label="Email"
            >
              <Mail className="size-4" />
            </a>
            <p className="text-sm text-muted-soft">© {new Date().getFullYear()} – {profile.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
