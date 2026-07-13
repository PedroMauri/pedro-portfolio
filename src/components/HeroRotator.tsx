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
    <div className={cn("relative mx-auto min-h-[3.2em] w-full overflow-hidden text-center", className)}>
      <p
        key={key}
        className="animate-fade-swap mx-auto max-w-4xl text-balance text-center text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.35rem]"
      >
        {lines[index]}
      </p>
    </div>
  );
}
