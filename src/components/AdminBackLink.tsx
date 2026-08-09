import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function AdminBackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
      {label}
    </Link>
  );
}
