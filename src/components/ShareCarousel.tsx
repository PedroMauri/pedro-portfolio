import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselSlide {
  src: string;
  caption: string;
}

interface ShareCarouselProps {
  slides: CarouselSlide[];
  label?: string;
}

export function ShareCarousel({ slides, label = "Brand guidelines" }: ShareCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const current = slides[index];
  const regionId = useId();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    for (const slide of slides) {
      const image = new Image();
      image.src = slide.src;
    }
  }, [slides]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (!root.contains(document.activeElement)) return;

      event.preventDefault();
      if (event.key === "ArrowLeft") {
        setIndex((value) => (value - 1 + total) % total);
      } else {
        setIndex((value) => (value + 1) % total);
      }
    };

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [total]);

  if (!current) return null;

  const statusText = `Slide ${index + 1} of ${total}: ${current.caption}`;

  return (
    <figure
      ref={rootRef}
      className="my-8 overflow-hidden rounded-2xl border border-border bg-cream"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative aspect-[4/3] w-full bg-card sm:aspect-[16/10]">
        {slides.map((slide, slideIndex) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slideIndex === index ? slide.caption : ""}
            loading="eager"
            decoding="async"
            fetchPriority={slideIndex === 0 ? "high" : "low"}
            aria-hidden={slideIndex !== index}
            className={cn(
              "absolute inset-0 z-0 m-auto h-full w-full object-contain p-3 transition-opacity duration-150 sm:p-4",
              slideIndex === index ? "z-10 opacity-100" : "pointer-events-none opacity-0"
            )}
          />
        ))}
        <button
          type="button"
          aria-label="Previous slide"
          aria-controls={regionId}
          onClick={() => setIndex((value) => (value - 1 + total) % total)}
          className="absolute left-3 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          aria-controls={regionId}
          onClick={() => setIndex((value) => (value + 1) % total)}
          className="absolute right-3 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <figcaption className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p id={regionId} className="mt-0.5 text-sm text-muted" aria-live="polite" aria-atomic="true">
            {statusText}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${slideIndex + 1}: ${slide.caption}`}
              aria-current={slideIndex === index ? "true" : undefined}
              aria-controls={regionId}
              onClick={() => setIndex(slideIndex)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  slideIndex === index ? "bg-accent-dark" : "bg-border"
                )}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
