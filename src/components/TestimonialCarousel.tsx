import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/content/profile";
import { cn } from "@/lib/utils";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [testimonials.length]);

  const item = testimonials[index];

  return (
    <div className="rounded-[1.75rem] border border-border bg-cream p-6 sm:p-10">
      <div className="min-h-[220px]">
        <p className="text-balance text-xl leading-relaxed text-foreground sm:text-2xl">
          “{item.quote}”
        </p>
        <div className="mt-8">
          <p className="font-medium text-foreground">{item.name}</p>
          <p className="mt-1 text-muted">{item.role}</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === index ? "w-8 bg-accent" : "w-2.5 bg-border hover:bg-muted-soft"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setIndex((current) => (current - 1 + testimonials.length) % testimonials.length)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-accent-soft"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIndex((current) => (current + 1) % testimonials.length)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition-colors hover:bg-accent-soft"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
