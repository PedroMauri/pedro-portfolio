import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setIndex((value) => (value - 1 + total) % total);
      }
      if (event.key === "ArrowRight") {
        setIndex((value) => (value + 1) % total);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  if (!current) return null;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-cream">
      <div className="relative bg-white">
        <img
          key={current.src}
          src={current.src}
          alt={current.caption}
          className="mx-auto max-h-[70vh] w-full object-contain"
          loading="lazy"
          decoding="async"
        />
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => setIndex((value) => (value - 1 + total) % total)}
          className="absolute left-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-sm transition-colors hover:bg-accent-soft"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setIndex((value) => (value + 1) % total)}
          className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-sm transition-colors hover:bg-accent-soft"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <figcaption className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="mt-0.5 text-sm text-muted">
            {index + 1} / {total} — {current.caption}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${slideIndex + 1}: ${slide.caption}`}
              aria-current={slideIndex === index}
              onClick={() => setIndex(slideIndex)}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                slideIndex === index ? "bg-accent-dark" : "bg-border hover:bg-muted-soft"
              )}
            />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
