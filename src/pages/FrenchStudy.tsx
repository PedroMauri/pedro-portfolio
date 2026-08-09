import { useCallback, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AdminBackLink } from "@/components/AdminBackLink";
import { FrenchDayLesson } from "@/components/french/FrenchDayLesson";
import { AudioTestButton } from "@/components/french/SpeakButton";
import { Seo } from "@/components/Seo";
import { ADMIN_PATH, ADMIN_STORAGE_KEY } from "@/content/admin";
import {
  frenchCourseRoadmap,
  getWeek,
  isDayComplete,
  loadCourseProgress,
  saveCourseProgress,
  weekCompletionPercent,
  type CourseProgress,
  type DayProgress,
} from "@/content/frenchCourse";
import { frenchStudyGoal, tefNclc7Scores } from "@/content/frenchStudy";
import { ieltsEnglishScores } from "@/content/ieltsEnglish";
import { frenchStudySeo } from "@/content/seo";
import { frenchSpeech } from "@/lib/frenchSpeech";

export default function FrenchStudy() {
  const unlocked = sessionStorage.getItem(ADMIN_STORAGE_KEY) === "1";
  const [progress, setProgress] = useState<CourseProgress>(() =>
    typeof window !== "undefined" ? loadCourseProgress() : { currentWeek: 1, weeks: {} },
  );
  const [dayId, setDayId] = useState<string>("mon");
  const [showTargets, setShowTargets] = useState(false);

  const week = getWeek(progress.currentWeek) ?? getWeek(1)!;
  const weekProgress = progress.weeks[String(week.week)] ?? { days: {} };
  const activeDay = week.days.find((d) => d.id === dayId) ?? week.days[0];
  const percent = weekCompletionPercent(week, weekProgress);

  const dayProgress: DayProgress = weekProgress.days[activeDay.id] ?? {};

  const persist = useCallback((next: CourseProgress) => {
    setProgress(next);
    saveCourseProgress(next);
  }, []);

  const patchDay = useCallback(
    (patch: Partial<DayProgress>) => {
      const key = String(week.week);
      const prevWeek = progress.weeks[key] ?? { days: {} };
      const prevDay = prevWeek.days[activeDay.id] ?? {};
      const nextDay = { ...prevDay, ...patch };
      const next: CourseProgress = {
        ...progress,
        weeks: {
          ...progress.weeks,
          [key]: {
            ...prevWeek,
            days: {
              ...prevWeek.days,
              [activeDay.id]: nextDay,
            },
          },
        },
      };
      persist(next);
    },
    [activeDay.id, persist, progress, week.week],
  );

  const completedDays = useMemo(
    () => week.days.filter((d) => isDayComplete(weekProgress.days[d.id])).length,
    [week.days, weekProgress.days],
  );

  if (!unlocked) {
    return <Navigate to={ADMIN_PATH} replace />;
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={frenchStudySeo} />
      <AdminBackLink to={ADMIN_PATH} label="Voltar ao admin" />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">
        Curso no site · {week.phase}
      </p>
      <h1 className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Francês · Semana {week.week}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        {week.title}. {week.theme}. Tudo acontece aqui: um play por dia com explicação em português
        e francês para ouvir, mais escrita e quiz.
      </p>

      <div className="mt-8">
        <AudioTestButton />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-accent-softer px-5 py-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">
              Semana {week.week} · {completedDays}/{week.days.length} dias
            </p>
            <p className="mt-1 text-sm text-muted">
              Nível {week.level} · Meta: {frenchStudyGoal.target}
            </p>
          </div>
          <p className="text-2xl font-medium text-foreground">{percent}%</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-card">
          <div
            className="h-full rounded-full bg-foreground transition-[width]"
            style={{ width: `${percent}%` }}
          />
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
          {week.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-foreground">
          <span className="font-medium">Checkpoint: </span>
          {week.checkpoint}
        </p>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {week.days.map((d) => {
          const done = isDayComplete(weekProgress.days[d.id]);
          const active = d.id === activeDay.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                frenchSpeech.stop();
                setDayId(d.id);
              }}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : done
                    ? "border-accent bg-accent-softer text-foreground"
                    : "border-border bg-card text-foreground"
              }`}
            >
              {d.label.slice(0, 3)}
              {done ? " ✓" : ""}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <FrenchDayLesson day={activeDay} progress={dayProgress} onPatch={patchDay} />
      </div>

      <section className="mt-16">
        <h2 className="text-lg font-medium text-foreground">Roadmap do curso</h2>
        <p className="mt-2 text-sm text-muted">
          As semanas entram no site conforme formos gravando. Você está na Semana 1.
        </p>
        <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
          {frenchCourseRoadmap.map((w) => {
            const isCurrent = w.week === week.week;
            return (
              <li
                key={w.week}
                className={`flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 ${
                  isCurrent ? "bg-accent-softer" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Semana {w.week} · {w.title}
                    {isCurrent ? " · agora" : ""}
                  </p>
                  <p className="text-sm text-muted">{w.theme}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.08em] text-muted">
                  {w.published ? w.level : "Em breve"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12">
        <button
          type="button"
          onClick={() => setShowTargets((v) => !v)}
          className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          {showTargets ? "Ocultar" : "Mostrar"} metas TEF NCLC 7 e nota CRS
        </button>
        {showTargets ? (
          <div className="mt-4 space-y-4">
            <p className="text-sm leading-relaxed text-muted">
              {frenchStudyGoal.whyNotIelts} {frenchStudyGoal.crsBonus} Seu inglês (IELTS GT): L
              {ieltsEnglishScores.listening}/R{ieltsEnglishScores.reading}/W
              {ieltsEnglishScores.writing}/S{ieltsEnglishScores.speaking}.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[24rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="px-4 py-3 font-medium">Skill</th>
                    <th className="px-4 py-3 font-medium">Mín. NCLC 7</th>
                    <th className="px-4 py-3 font-medium">/ máx</th>
                  </tr>
                </thead>
                <tbody>
                  {tefNclc7Scores.map((row) => (
                    <tr key={row.skill} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-3">{row.skill}</td>
                      <td className="px-4 py-3 font-medium">{row.min}</td>
                      <td className="px-4 py-3 text-muted">{row.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </section>

      <Link
        to={ADMIN_PATH}
        className="mt-12 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Voltar ao admin
      </Link>
    </article>
  );
}
