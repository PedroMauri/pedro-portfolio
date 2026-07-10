import { useState } from "react";
import { ImageIcon } from "lucide-react";
import type { CaseFigure as CaseFigureType } from "@/content/cases";
import { cn } from "@/lib/utils";

interface CaseFigureProps {
  figure: CaseFigureType;
  className?: string;
  aspectRatio?: string;
}

export function CaseFigure({ figure, className, aspectRatio = "aspect-[16/10]" }: CaseFigureProps) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-sm", className)}>
      <div className={cn("relative w-full bg-slate-50", aspectRatio)}>
        {!failed ? (
          <img
            src={figure.src}
            alt={figure.alt}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <ImageIcon className="size-6" />
            </div>
            <p className="text-sm font-medium text-foreground">{figure.alt}</p>
            <p className="max-w-xs text-xs text-muted">
              Image export pending — add PNG to{" "}
              <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">{figure.src}</code>
            </p>
          </div>
        )}
      </div>
      {figure.caption ? (
        <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted">
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
