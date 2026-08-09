import { Pause, Volume2 } from "lucide-react";
import { useFrenchSpeech } from "@/hooks/useFrenchSpeech";
import { frenchSpeech } from "@/lib/frenchSpeech";
import type { ScriptLine } from "@/content/frenchCourse";

type DayPlayButtonProps = {
  lines: ScriptLine[];
  label?: string;
};

/** Um único play para a lição inteira do dia. */
export function DayPlayButton({ lines, label = "Play — lição completa do dia" }: DayPlayButtonProps) {
  const { speaking, error, toggleDay } = useFrenchSpeech();

  return (
    <div className="space-y-2">
      <button
        type="button"
        onPointerDown={() => {
          void frenchSpeech.warmUp();
        }}
        onClick={() => toggleDay(lines)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:w-auto"
      >
        {speaking ? <Pause className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
        {speaking ? "Parar" : label}
      </button>
      {error ? <p className="text-xs leading-relaxed text-muted">{error}</p> : null}
    </div>
  );
}

export function AudioTestButton() {
  const { speaking, error, engine, toggleDay } = useFrenchSpeech();

  return (
    <div className="rounded-2xl border border-border bg-card px-4 py-4">
      <p className="text-sm font-medium text-foreground">Teste de áudio</p>
      <p className="mt-1 text-sm text-muted">
        Deve ouvir português e depois francês. Se a aba estiver muda, clique no ícone de alto-falante
        na aba do Chrome.
      </p>
      <div className="mt-3">
        <button
          type="button"
          onPointerDown={() => {
            void frenchSpeech.warmUp();
          }}
          onClick={() => toggleDay(frenchSpeech.testScript())}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background"
        >
          {speaking ? <Pause className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
          {speaking ? "Parar" : "Testar áudio"}
        </button>
      </div>
      {engine ? (
        <p className="mt-2 text-xs text-muted">
          Motor: {engine === "web-audio" || engine === "local-mp3" ? "Web Audio ✓" : engine}
        </p>
      ) : null}
      {error ? <p className="mt-2 text-xs text-muted">{error}</p> : null}
    </div>
  );
}
