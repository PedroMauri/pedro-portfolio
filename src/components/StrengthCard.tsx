import {
  Code2,
  Eye,
  Handshake,
  History,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";
import type { Strength } from "@/content/profile";
import { useReveal } from "@/hooks/useReveal";

const icons = {
  experience: History,
  design: LayoutTemplate,
  code: Code2,
  qa: Eye,
  mindset: Sparkles,
  collab: Handshake,
};

export function StrengthCard({ strength, index = 0 }: { strength: Strength; index?: number }) {
  const ref = useReveal<HTMLDivElement>();
  const Icon = icons[strength.icon];

  return (
    <div
      ref={ref}
      className="reveal mx-auto w-full max-w-md rounded-[1.5rem] border border-border bg-white p-6 text-center transition-shadow hover:shadow-[0_12px_40px_rgba(11,11,11,0.06)] sm:max-w-none sm:text-left"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="mx-auto hidden size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent-dark sm:mx-0 sm:flex">
        <Icon className="size-5" />
      </div>
      <h3 className="text-xl font-medium tracking-tight text-foreground sm:mt-5">{strength.title}</h3>
      <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{strength.description}</p>
    </div>
  );
}
