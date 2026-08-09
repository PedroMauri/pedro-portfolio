import { useMemo, useState } from "react";
import type { QuizItem } from "@/content/frenchCourse";

type QuizBlockProps = {
  items: QuizItem[];
  onComplete?: (score: number, total: number) => void;
};

export function QuizBlock({ items, onComplete }: QuizBlockProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return items.reduce((acc, item) => {
      return acc + (answers[item.id] === item.correctIndex ? 1 : 0);
    }, 0);
  }, [answers, items, submitted]);

  const allAnswered = items.every((item) => answers[item.id] !== undefined);

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
    const nextScore = items.reduce((acc, item) => {
      return acc + (answers[item.id] === item.correctIndex ? 1 : 0);
    }, 0);
    onComplete?.(nextScore, items.length);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="space-y-5">
      {items.map((item) => {
        const chosen = answers[item.id];
        return (
          <fieldset key={item.id} className="space-y-2">
            <legend className="text-sm font-medium text-foreground">{item.prompt}</legend>
            <div className="space-y-2">
              {item.options.map((option, index) => {
                const selected = chosen === index;
                let stateClass = "border-border bg-card hover:bg-accent-softer";
                if (submitted) {
                  if (index === item.correctIndex) {
                    stateClass = "border-accent bg-accent-softer";
                  } else if (selected) {
                    stateClass = "border-border bg-card opacity-60";
                  }
                } else if (selected) {
                  stateClass = "border-foreground bg-accent-softer";
                }
                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm text-foreground ${stateClass}`}
                  >
                    <input
                      type="radio"
                      className="mt-0.5"
                      name={item.id}
                      checked={selected}
                      disabled={submitted}
                      onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: index }))}
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
            {submitted && item.explain && chosen !== item.correctIndex ? (
              <p className="text-xs text-muted">{item.explain}</p>
            ) : null}
          </fieldset>
        );
      })}

      <div className="flex flex-wrap items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-40"
          >
            Conferir respostas
          </button>
        ) : (
          <>
            <p className="text-sm font-medium text-foreground">
              Acertos: {score}/{items.length}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
            >
              Tentar de novo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
