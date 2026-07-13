import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export function HeroRotator({ className }: { className?: string }) {
  const lines = profile.heroLines;
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % lines.length);
      setKey((current) => current + 1);
    }, 3200);
    return () => window.clearInterval(id);
  }, [lines.length]);

  return (
    <div className={cn("relative min-h-[3.2em] overflow-hidden", className)}>
      <p
        key={key}
        className="animate-fade-swap text-balance text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.35rem]"
      >
        {lines[index]}
      </p>
    </div>
  );
}
