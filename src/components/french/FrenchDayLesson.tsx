import { type ReactNode, useMemo } from "react";
import { Check } from "lucide-react";
import { DayPlayButton } from "@/components/french/SpeakButton";
import { QuizBlock } from "@/components/french/QuizBlock";
import { useFrenchSpeech } from "@/hooks/useFrenchSpeech";
import { buildFullDayAudio, type CourseDay, type DayProgress } from "@/content/frenchCourse";

type FrenchDayLessonProps = {
  day: CourseDay;
  progress: DayProgress;
  onPatch: (patch: Partial<DayProgress>) => void;
};

function DoneToggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        checked
          ? "border-accent bg-accent-softer text-foreground"
          : "border-border bg-card text-muted"
      }`}
    >
      <Check className={`size-3.5 ${checked ? "opacity-100" : "opacity-30"}`} aria-hidden />
      {checked ? "Feito" : label}
    </button>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8 border-t border-border pt-8">
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function FrenchDayLesson({ day, progress, onPatch }: FrenchDayLessonProps) {
  const { speaking, lineIndex } = useFrenchSpeech();
  const fullAudio = useMemo(() => buildFullDayAudio(day), [day]);

  return (
    <div>
      <div>
        <p className="text-sm text-muted">
          {day.label} · {day.minutes}
        </p>
        <h2 className="mt-1 text-2xl font-medium tracking-tight text-foreground">{day.title}</h2>
        <p className="mt-1 text-sm text-muted">{day.focus}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-accent-softer px-5 py-5">
        <p className="text-sm font-medium text-foreground">Áudio da lição</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Um único play: português explica, francês ensina; no final recapitula o vocabulário e
          a gramática do dia. Ideal para academia ou carro.
        </p>
        <div className="mt-4">
          <DayPlayButton lines={fullAudio} />
        </div>
        <DoneToggle
          checked={Boolean(progress.audioDone)}
          label="Marcar áudio do dia como ouvido"
          onChange={(audioDone) => onPatch({ audioDone })}
        />
      </div>

      <Block title="Roteiro (acompanhe enquanto ouve)">
        <ol className="space-y-2">
          {fullAudio.map((line, i) => {
            const active = speaking && lineIndex === i;
            return (
              <li
                key={`${line.lang}-${i}-${line.text.slice(0, 24)}`}
                className={`rounded-xl border px-4 py-3 text-sm leading-relaxed transition-colors ${
                  active
                    ? "border-foreground bg-accent-softer text-foreground"
                    : "border-border bg-card text-foreground"
                }`}
              >
                <span className="mr-2 text-xs font-medium uppercase tracking-[0.08em] text-muted">
                  {line.lang === "pt" ? "PT" : "FR"}
                </span>
                {line.text}
              </li>
            );
          })}
        </ol>
      </Block>

      <Block title="Vocabulário do dia">
        <ul className="divide-y divide-border rounded-xl border border-border">
          {day.vocab.map((item) => (
            <li key={item.fr} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
              <span className="font-medium text-foreground">{item.fr}</span>
              <span className="text-sm text-muted">{item.pt}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title={`Gramática — ${day.grammar.title}`}>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground">
          {day.grammar.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Block>

      <Block title={`Escrita — ${day.writing.title}`}>
        <p className="text-sm leading-relaxed text-muted">{day.writing.prompt}</p>
        {day.writing.example ? (
          <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-card px-4 py-3 text-sm whitespace-pre-wrap text-foreground">
            {day.writing.example}
          </pre>
        ) : null}
        <label className="mt-4 block">
          <span className="sr-only">Sua escrita</span>
          <textarea
            value={progress.writingText ?? ""}
            onChange={(e) => onPatch({ writingText: e.target.value })}
            rows={6}
            placeholder="Escreva aqui…"
            className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </label>
        <DoneToggle
          checked={Boolean(progress.writingDone)}
          label="Marcar escrita como feita"
          onChange={(writingDone) => onPatch({ writingDone })}
        />
      </Block>

      <Block title="Quiz do dia">
        <QuizBlock
          items={day.quiz}
          onComplete={(quizScore, quizTotal) => onPatch({ quizDone: true, quizScore, quizTotal })}
        />
        <DoneToggle
          checked={Boolean(progress.quizDone)}
          label="Marcar quiz como feito"
          onChange={(quizDone) => onPatch({ quizDone })}
        />
      </Block>
    </div>
  );
}
