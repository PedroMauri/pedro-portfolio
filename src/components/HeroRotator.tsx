import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroRotator({ className }: { className?: string }) {
  const lines = profile.heroLines;
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % lines.length);
      setKey((current) => current + 1);
    }, 3200);
    return () => window.clearInterval(id);
  }, [lines.length, reduceMotion]);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-4xl overflow-hidden text-center",
        // Fixed height so welcome stays put when lines wrap to 1 or 2 rows
        "h-[5.5rem] sm:h-[6.5rem] md:h-[7.25rem] lg:h-[7.75rem]",
        className
      )}
    >
      <h1
        key={reduceMotion ? "static" : key}
        className={cn(
          "absolute inset-x-0 top-0 text-balance text-center text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.35rem]",
          !reduceMotion && "animate-fade-swap"
        )}
      >
        {reduceMotion ? lines[0] : lines[index]}
      </h1>
    </div>
  );
}
