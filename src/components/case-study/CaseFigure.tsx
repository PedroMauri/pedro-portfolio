import { useState } from "react";
import { ImageIcon } from "lucide-react";
import type { CaseFigure as CaseFigureType } from "@/content/cases";
import { cn } from "@/lib/utils";

interface CaseFigureProps {
  figure: CaseFigureType;
  className?: string;
  /** Wireframes get extra padding so low-fi sketches read at a smaller, clearer scale. */
  variant?: "default" | "wireframe";
}

/** Fixed frame so every case image occupies the same visual area. */
const FRAME_HEIGHT = "h-[380px] sm:h-[420px]";

export function CaseFigure({
  figure,
  className,
  variant = "default",
}: CaseFigureProps) {
  const [failed, setFailed] = useState(false);
  const isWireframe = variant === "wireframe";

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-white shadow-sm",
        className
      )}
    >
      <div
        className={cn(
          "relative flex w-full items-center justify-center bg-white",
          FRAME_HEIGHT,
          isWireframe ? "p-12 sm:p-16 md:p-20" : "p-8 sm:p-10 md:p-12"
        )}
      >
        {!failed ? (
          <img
            src={figure.src}
            alt={figure.alt}
            className={cn(
              "object-contain object-center",
              isWireframe
                ? "max-h-[52%] max-w-[42%] rounded-xl border-[3px] border-slate-300 bg-black shadow-md"
                : "max-h-full max-w-full"
            )}
            loading="lazy"
            onError={() => setFailed(true)}
          />
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
  );
}
