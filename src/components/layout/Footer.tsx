import { Link } from "react-router-dom";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-foreground">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.title}</p>
        </div>
        <div className="flex gap-6 text-sm">
          <Link to="/work" className="text-muted transition-colors hover:text-foreground">Work</Link>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-foreground">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-foreground">Email</a>
        </div>
      </div>
    </footer>
  );
}
