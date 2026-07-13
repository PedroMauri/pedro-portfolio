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
      className="reveal rounded-[1.5rem] border border-border bg-white p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(11,11,11,0.06)]"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent-dark">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 text-xl font-medium tracking-tight text-foreground">{strength.title}</h3>
      <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{strength.description}</p>
    </div>
  );
}
