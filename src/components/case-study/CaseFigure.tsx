import { useEffect, useId, useRef, useState } from "react";
import { Expand, ImageIcon, X } from "lucide-react";
import type { CaseFigure as CaseFigureType } from "@/content/cases";
import { cn } from "@/lib/utils";

interface CaseFigureProps {
  figure: CaseFigureType;
  className?: string;
  /** Kept for callers; all variants now share the same frame size and padding. */
  variant?: "default" | "wireframe" | "diagram";
}

/** Shared frame — tall enough for MVP and portrait sketches at the same visual scale. */
const FRAME =
  "relative flex h-[min(70vh,560px)] w-full items-center justify-center bg-white p-4 sm:h-[640px] sm:p-6";

export function CaseFigure({ figure, className }: CaseFigureProps) {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = triggerRef.current;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <figure
        className={cn(
          "overflow-hidden rounded-2xl border border-border bg-white shadow-sm",
          className
        )}
      >
        <div className={FRAME}>
          {!failed ? (
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`Expand image: ${figure.alt}`}
              className="group relative flex h-full w-full cursor-zoom-in items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <img
                src={figure.src}
                alt={figure.alt}
                className="h-full w-auto max-w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
                onError={() => setFailed(true)}
              />
              <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-3.5" />
                Expand
              </span>
            </button>
          ) : (
            <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <ImageIcon className="size-6" />
              </div>
              <p className="text-sm font-medium text-foreground">{figure.alt}</p>
            </div>
          )}
        </div>
        {figure.caption ? (
          <figcaption className="border-t border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted">
            {figure.caption}
          </figcaption>
        ) : null}
      </figure>

      {open && !failed ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p id={titleId} className="truncate text-sm font-medium text-foreground">
                  {figure.alt}
                </p>
                {figure.caption ? (
                  <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{figure.caption}</p>
                ) : null}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close expanded image"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent-soft hover:text-accent"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-[calc(100vh-7rem)] overflow-auto bg-slate-100/80 p-3 sm:p-6">
              <img
                src={figure.src}
                alt={figure.alt}
                decoding="async"
                className="mx-auto block h-auto w-auto max-w-full"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
