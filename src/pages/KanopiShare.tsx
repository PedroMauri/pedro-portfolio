import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Expand, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { ShareCarousel } from "@/components/ShareCarousel";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  KANOPI_SHARE_PASSWORD,
  KANOPI_SHARE_STORAGE_KEY,
} from "@/content/kanopiShare";
import { getCaseBySlug } from "@/content/cases";
import { kanopiShareSeo } from "@/content/seo";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const BRANDING_SLIDES = [
  {
    src: "/share/kanopi/branding/01-brand-guidelines-cover.png",
    caption: "Brand guidelines cover",
  },
  {
    src: "/share/kanopi/branding/02-logomark-wordmark.png",
    caption: "Logomark and wordmark",
  },
  {
    src: "/share/kanopi/branding/09-color-palette.png",
    caption: "Color palette",
  },
  {
    src: "/share/kanopi/branding/10-typography.png",
    caption: "Typography",
  },
  {
    src: "/share/kanopi/branding/07-alternative-backgrounds.png",
    caption: "Logo on alternative backgrounds",
  },
] as const;

const MARKET_RESEARCH_SLIDES = [
  {
    src: "/share/kanopi/02a-competitors.png",
    caption: "Identify competitors",
  },
  {
    src: "/share/kanopi/02b-feature-analysis.png",
    caption: "Feature and functionality analysis",
  },
] as const;

const WEB_HIFI_SLIDES = [
  {
    src: "/cases/yethos/hifi-web.png",
    caption: "Phase 1 — Early web hi-fi: community homepage structure (cover, join, discussions, files, members)",
  },
  {
    src: "/share/kanopi/10a-hifi-web-community-home.png",
    caption: "Phase 2 — Refined homepage: setup feedback, interactions feed, and clearer community chrome",
  },
  {
    src: "/share/kanopi/10b-hifi-web-channels-annotated.png",
    caption: "Phase 3 — Channels become the primary surface (nested nav + annotated IA decisions)",
  },
  {
    src: "/share/kanopi/10c-hifi-web-channels-card.png",
    caption: "Phase 4 — Later UI polish: channel cards and community header patterns",
  },
  {
    src: "/cases/yethos/hifi-channels.png",
    caption:
      "Phase 5 — Mobile hi-fi: community channels with follow state, activity stats, channel list, and feed with composer",
  },
] as const;

function PrototypeEmbed({
  src,
  caption,
  title = "Yethos interactive prototype",
}: {
  src: string;
  caption: string;
  title?: string;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-cream">
      <div className="relative aspect-[16/9] w-full bg-card">
        <iframe
          title={title}
          src={src}
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <figcaption className="border-t border-border px-4 py-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

function Figure({
  src,
  caption,
  expandable = false,
}: {
  src: string;
  caption: string;
  expandable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = triggerRef.current;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-cream">
        {expandable ? (
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Expand image: ${caption}`}
            className="group relative block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <img src={src} alt={caption} className="w-full" loading="lazy" decoding="async" />
            <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white opacity-90 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
              <Expand className="size-3.5" />
              Expand
            </span>
          </button>
        ) : (
          <img src={src} alt={caption} className="w-full" loading="lazy" decoding="async" />
        )}
        <figcaption className="border-t border-border px-4 py-3 text-sm text-muted">{caption}</figcaption>
      </figure>

      {expandable && open ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
              <p id={titleId} className="truncate text-sm font-medium text-foreground">
                {caption}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close expanded image"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent-soft"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="max-h-[calc(100vh-7rem)] overflow-auto bg-slate-100/80 p-3 sm:p-6">
              <img
                src={src}
                alt={caption}
                decoding="async"
                className="mx-auto block h-auto w-auto max-w-none"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ChapterTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="mt-20 scroll-mt-28 border-b border-border pb-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
    >
      {children}
    </h2>
  );
}

function SubTitle({ children }: { children: string }) {
  return <h3 className="mt-8 text-lg font-medium text-foreground">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{children}</p>;
}

function Skill({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-1 text-base leading-relaxed text-muted">{body}</p>
      {children}
    </div>
  );
}

const CHAPTERS = [
  { id: "ch-home", label: "0. Overview" },
  { id: "ch-discovery", label: "1a. Discovery" },
  { id: "ch-content-strategy", label: "1b. Content Strategy" },
  { id: "ch-ux-strategy", label: "1c. UX Strategy" },
  { id: "ch-visual-design", label: "1d. Visual Design" },
  { id: "ch-self-assessment", label: "2. Self-assessment" },
  { id: "ch-impact", label: "3. Impact at Kanopi" },
  { id: "ch-additional", label: "4. Additional questions" },
] as const;

function ChapterNav() {
  function scrollTo(id: string) {
    if (id === "ch-home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <nav
        aria-label="Chapters"
        className="sticky top-0 z-30 -mx-5 mb-8 border-b border-border bg-background/95 px-5 py-3 backdrop-blur-sm sm:-mx-8 sm:px-8 xl:hidden"
      >
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollTo(chapter.id)}
              className="shrink-0 rounded-full border border-border bg-cream px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:bg-accent-soft"
            >
              {chapter.label}
            </button>
          ))}
        </div>
      </nav>

      <nav
        aria-label="Chapters"
        className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-52 items-center justify-end pr-4 xl:flex 2xl:pr-8"
      >
        <div className="pointer-events-auto flex w-44 flex-col gap-1.5 2xl:w-52">
          {CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollTo(chapter.id)}
              className="rounded-xl border border-border bg-card/95 px-3 py-2 text-left text-xs font-medium leading-snug text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent-soft 2xl:text-sm"
            >
              {chapter.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

function useHoverPreview() {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const closeTimer = useRef<number | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const cardId = useId();

  function clearClose() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function updatePosition() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = 320;
    const left = Math.min(
      Math.max(12, rect.left + rect.width / 2 - width / 2),
      window.innerWidth - width - 12
    );
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeBelow = spaceBelow > 280 || rect.top < 280;
    setCoords({
      top: placeBelow ? rect.bottom + 10 : rect.top - 10,
      left,
    });
    return placeBelow;
  }

  const [placeBelow, setPlaceBelow] = useState(true);

  function show() {
    clearClose();
    const below = updatePosition();
    if (typeof below === "boolean") setPlaceBelow(below);
    setOpen(true);
  }

  function hide() {
    clearClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  }

  useLayoutEffect(() => {
    if (!open) return;
    const onMove = () => {
      const below = updatePosition();
      if (typeof below === "boolean") setPlaceBelow(below);
    };
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open]);

  useEffect(() => () => clearClose(), []);

  return {
    open,
    coords,
    placeBelow,
    triggerRef,
    cardId,
    show,
    hide,
  };
}

function HoverPreviewPortal({
  open,
  coords,
  placeBelow,
  cardId,
  widthClass,
  onShow,
  onHide,
  children,
}: {
  open: boolean;
  coords: { top: number; left: number };
  placeBelow: boolean;
  cardId: string;
  widthClass: string;
  onShow: () => void;
  onHide: () => void;
  children: ReactNode;
}) {
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      id={cardId}
      role="tooltip"
      className={cn(
        "fixed z-[200] overflow-hidden rounded-xl border border-border bg-card shadow-xl",
        widthClass
      )}
      style={{
        top: coords.top,
        left: coords.left,
        transform: placeBelow ? "none" : "translateY(-100%)",
      }}
      onMouseEnter={onShow}
      onMouseLeave={onHide}
    >
      {children}
    </div>,
    document.body
  );
}

function LinkedInHoverCard({
  href,
  name,
  headline,
  location,
}: {
  href: string;
  name: string;
  headline: string;
  location: string;
}) {
  const preview = useHoverPreview();

  return (
    <span
      ref={preview.triggerRef}
      className="relative inline-block"
      onMouseEnter={preview.show}
      onMouseLeave={preview.hide}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-describedby={preview.open ? preview.cardId : undefined}
        className="font-medium text-accent-dark underline-offset-2 hover:underline"
        onFocus={preview.show}
        onBlur={preview.hide}
      >
        {name}
      </a>
      <HoverPreviewPortal
        open={preview.open}
        coords={preview.coords}
        placeBelow={preview.placeBelow}
        cardId={preview.cardId}
        widthClass="w-72"
        onShow={preview.show}
        onHide={preview.hide}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0A66C2] text-sm font-semibold text-white">
              FP
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold text-foreground">{name}</p>
                <LinkedInIcon className="size-3.5 shrink-0 text-[#0A66C2]" />
              </div>
              <p className="mt-0.5 text-xs leading-snug text-muted">{headline}</p>
              <p className="mt-1 text-xs text-muted-soft">{location}</p>
            </div>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            <LinkedInIcon className="size-3.5" />
            View LinkedIn profile
          </a>
        </div>
      </HoverPreviewPortal>
    </span>
  );
}

function CaseStudyHoverCard({
  to,
  label,
  title,
  company,
  role,
  year,
  summary,
  image,
  tags,
}: {
  to: string;
  label: string;
  title: string;
  company: string;
  role: string;
  year: string;
  summary: string;
  image: string;
  tags: string[];
}) {
  const preview = useHoverPreview();

  return (
    <span
      ref={preview.triggerRef}
      className="relative inline-block"
      onMouseEnter={preview.show}
      onMouseLeave={preview.hide}
    >
      <Link
        to={to}
        aria-describedby={preview.open ? preview.cardId : undefined}
        className="font-medium text-accent-dark underline-offset-2 hover:underline"
        onFocus={preview.show}
        onBlur={preview.hide}
      >
        {label}
      </Link>
      <HoverPreviewPortal
        open={preview.open}
        coords={preview.coords}
        placeBelow={preview.placeBelow}
        cardId={preview.cardId}
        widthClass="w-80"
        onShow={preview.show}
        onHide={preview.hide}
      >
        <div className="aspect-[16/9] overflow-hidden bg-cream">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-accent-dark">
            Case study · {company}
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted-soft">
            {role} · {year}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">{summary}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-cream px-2 py-0.5 text-[10px] font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            to={to}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Open case study
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </HoverPreviewPortal>
    </span>
  );
}

function KanopiThemeMount({ children }: { children: ReactNode }) {
  useTheme();
  return <>{children}</>;
}

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (value.trim() === KANOPI_SHARE_PASSWORD) {
      sessionStorage.setItem(KANOPI_SHARE_STORAGE_KEY, "1");
      setError(false);
      onUnlock();
      return;
    }
    setError(true);
  }

  return (
    <section className="relative mx-auto max-w-md px-5 py-20 sm:px-8 sm:py-28">
      <div className="absolute right-5 top-6 sm:right-8">
        <ThemeToggle />
      </div>
      <Seo page={kanopiShareSeo} />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Private share</p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground">Kanopi application</h1>
      <p className="mt-4 text-muted">Enter the password shared with you to view this page.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-foreground" htmlFor="share-password">
          Password
        </label>
        <input
          id="share-password"
          type="password"
          autoComplete="current-password"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        {error ? <p className="text-sm text-red-700">Incorrect password. Please try again.</p> : null}
        <button
          type="submit"
          className="inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          Unlock
        </button>
      </form>
    </section>
  );
}

function Content() {
  const yethos = getCaseBySlug("yethos-community-discovery");

  return (
    <article className="relative mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={kanopiShareSeo} />
      <div className="fixed right-4 top-[5.25rem] z-40 xl:right-8">
        <ThemeToggle />
      </div>
      <ChapterNav />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Private share</p>
      <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Kanopi application responses
      </h1>
      <p className="mt-4 text-lg text-muted">
        Pedro Mauri · Primary example:{" "}
        {yethos ? (
          <CaseStudyHoverCard
            to={`/case-studies/${yethos.slug}`}
            label="Yethos"
            title={yethos.title}
            company={yethos.company}
            role={yethos.role}
            year={yethos.year}
            summary={yethos.summary}
            image={yethos.thumbnail ?? "/cases/yethos/hifi-channels.png"}
            tags={yethos.tags}
          />
        ) : (
          <Link
            to="/case-studies/yethos-community-discovery"
            className="font-medium text-accent-dark underline-offset-2 hover:underline"
          >
            Yethos
          </Link>
        )}{" "}
        (research → IA → prototype → UI → usability)
      </p>

      <P>
        Thank you for the questions. I’ve answered them using <strong className="text-foreground">Yethos</strong>
        , an end-to-end UX/UI project where I led discovery through visual design for a community-focused
        platform. It’s the clearest example of my process for website/product strategy work.
      </P>

      <div className="mt-8 rounded-2xl border border-border bg-cream px-5 py-5 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">
          Client reference
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          Stakeholder and my contractor on Yethos:{" "}
          <LinkedInHoverCard
            href="https://www.linkedin.com/in/felipepuddu/"
            name="Felipe Puddu"
            headline="Senior Engineering Manager at Luma Health"
            location="Milan, Lombardy, Italy"
          />
          . I was hired on this project from{" "}
          <strong className="text-foreground">2021 to 2023</strong> as product/visual designer. The team
          also included 2 frontend developers, 1 backend developer, 1 PM, and 1 marketing person. All
          images used in this share were produced and used in the real project. You’re welcome to contact
          him as a reference for confirmation — he is based in Italy:{" "}
          <a
            href="tel:+393339940143"
            className="font-medium text-accent-dark underline-offset-2 hover:underline"
          >
            +39 333 994 0143
          </a>
          .
        </p>
      </div>

      <P>
        Below I walk through Discovery, Content Strategy, UX Strategy, and Visual Design using Yethos as the
        example—goals and activities, deliverables, and how research/feedback informed the next phase.
      </P>
      <SubTitle>Project Scope / Workflow</SubTitle>
      <Figure
        src="/share/kanopi/01-goal-workflow.png"
        caption="Project Scope / Workflow"
        expandable
      />

      <ChapterTitle id="ch-discovery">1a. Discovery</ChapterTitle>
      <P>
        <strong className="text-foreground">Goals:</strong> Understand the market and who we were designing
        for before defining structure or UI.
      </P>
      <P>
        <strong className="text-foreground">Activities:</strong> Competitor analysis (Facebook, Twitter,
        Reddit, Discord, Circle)—features, strengths, weaknesses, and gaps. Identified needs around privacy,
        ease of use, moderation, and community-centric design. Defined Lean UX personas
        (Influencer/Admin, Moderator, Active Member) with motivations, behaviors, and use scenarios, then
        refined them through prototype tests with influencers.
      </P>
      <P>
        <strong className="text-foreground">Deliverables:</strong> Competitive teardown, opportunity framing,
        persona set + scenarios.
      </P>
      <P>
        <strong className="text-foreground">Into the next phase:</strong> Research showed differentiation
        should come from a clearer community hierarchy and stronger privacy/moderation—not more “social
        network” noise. That fed IA and content structure.
      </P>
      <SubTitle>Market research and analysis</SubTitle>
      <ShareCarousel
        slides={[...MARKET_RESEARCH_SLIDES]}
        label="Market research and analysis"
      />

      <SubTitle>Persona Definition</SubTitle>
      <P>
        <strong className="text-foreground">Lean UX Objectives and Process for Personas</strong>
      </P>
      <P>
        Our goal was to validate key design hypotheses, ensuring that the product’s features and experience
        aligned with the expectations of influencers, who play a critical role in Yethos.
      </P>
      <P>
        <strong className="text-foreground">1. Defining Hypothetical Personas:</strong> We created initial
        personas based on market research, focusing on influencers’ common activities, objectives, and
        motivations, including the desire for authentic engagement and monetization opportunities.
      </P>
      <P>
        <strong className="text-foreground">2. Validate later in the loop:</strong> After the first
        prototype existed, we ran quick tests with influencers and refined the personas from that feedback
        (Lean UX)—so Discovery hypotheses were checked before locking Visual Design.
      </P>
      <Figure src="/share/kanopi/03-personas.png" caption="Persona structure" />

      <ChapterTitle id="ch-content-strategy">1b. Content Strategy</ChapterTitle>
      <P>
        <strong className="text-foreground">Goals:</strong> Define what content and structure users need to
        evaluate and participate in a community without hunting across pages.
      </P>
      <P>
        <strong className="text-foreground">Activities:</strong> Mapped platform content into{" "}
        <strong className="text-foreground">Community → Channel → Topic</strong>, plus profiles,
        notifications, and moderation. Defined core pages (home/discovery, community overview, channel,
        profile) and what each should surface first.
      </P>
      <P>
        <strong className="text-foreground">Deliverables:</strong> Information hierarchy, core page
        definitions, navigation model (top bar + sidebar).
      </P>
      <P>
        <strong className="text-foreground">Into the next phase:</strong> Hierarchy and page jobs became the
        brief for flows, wires, and UI.
      </P>

      <SubTitle>Information Architecture</SubTitle>
      <P>
        This section outlines the structure and organization of the platform, focusing initially on the web
        version for MVP development. Our goal was to conduct research and gather user feedback after the
        prototype was completed. Based on the insights collected during testing, we planned to iterate and
        refine the web experience, followed by the adaptation of the platform for mobile devices.
      </P>
      <Figure
        src="/share/kanopi/04-ia-structure.png"
        caption="Platform elements, information hierarchy, and core pages"
      />

      <ChapterTitle id="ch-ux-strategy">1c. UX Strategy</ChapterTitle>
      <P>
        <strong className="text-foreground">Goals:</strong> Make creation and participation flows intuitive
        for admins, moderators, and members.
      </P>
      <P>
        <strong className="text-foreground">Activities:</strong> Mapped admin/mod flows (community setup,
        members, reports, statistics, requests). Built interactive prototypes for create community, create
        channels, and create topics. Ran usability testing and adjusted before final UI polish.
      </P>
      <P>
        <strong className="text-foreground">Deliverables:</strong> User flows, clickable prototypes, usability
        revisions.
      </P>
      <P>
        <strong className="text-foreground">Into the next phase:</strong> Testing validated what to keep in the
        MVP vs mark “not yet,” and which interactions needed clearer hierarchy in UI.
      </P>

      <SubTitle>User Flow Mapping</SubTitle>
      <P>
        The following is a key user flow developed for the web MVP to ensure intuitive user interaction:
      </P>
      <Figure
        src="/share/kanopi/04b-user-flow-dashboard.png"
        caption="User flow — Community Dashboard"
      />
      <PrototypeEmbed
        src="https://embed.figma.com/proto/H5HP7S1xWwoWA9gotybIC0/Yethos---Screens?node-id=3216-60979&node-type=frame&scaling=min-zoom&content-scaling=fixed&page-id=707%3A9176&starting-point-node-id=3216%3A60979&embed-host=share"
        caption="Interactive Figma prototype — create community, channels, and topics"
      />

      <ChapterTitle id="ch-visual-design">1d. Visual Design</ChapterTitle>
      <P>
        <strong className="text-foreground">Goals:</strong> A distinct, community-first brand and UI that
        supports clear CTAs and long sessions.
      </P>
      <P>
        <strong className="text-foreground">Activities:</strong> Logo and brand system. First
        high-fidelity community page wire (annotated structure), then polished UI for web and
        mobile. Collaborated with the project manager so design stayed tied to business goals for a scalable
        MVP.
      </P>
      <P>
        <strong className="text-foreground">Deliverables:</strong> Brand guidelines, hi-fi UI, presentation-ready
        prototype.
      </P>
      <P>
        <strong className="text-foreground">Into the next phase:</strong> Usability feedback and PM alignment
        shaped what shipped in the presentation prototype versus what stayed marked for later—so Visual
        Design supported a focused MVP handoff, not an endless feature surface.
      </P>
      <ShareCarousel slides={[...BRANDING_SLIDES]} label="Yethos brand guidelines" />
      <ShareCarousel slides={[...WEB_HIFI_SLIDES]} label="Web hi-fi evolution" />
      <SubTitle>Conclusion</SubTitle>
      <P>
        Yethos is a dynamic and flexible social platform that allows for deep interaction within niche-based
        communities. By collaborating closely with the project manager, I ensured that the final product met
        the original goals, delivering a scalable MVP that lays the foundation for future growth and success.
        The project demonstrates my ability to design comprehensive user experiences while keeping the
        business goals in focus.
      </P>

      <ChapterTitle id="ch-self-assessment">2. Self-assessment</ChapterTitle>
      <Skill
        title="Facilitating client meetings and presenting — 4"
        body="Comfortable running and presenting in client/stakeholder meetings—walking through process, recommendations, and design decisions clearly."
      />
      <Skill
        title="Figma — 4"
        body="Primary tool for wires, interactive prototypes, and hi-fi UI systems day to day."
      />
      <Skill
        title="Interaction design & prototyping — 4"
        body="Strong at mapping complex flows and building clickable prototypes, then iterating from usability feedback."
      />
      <Skill
        title="User research & usability testing — 4"
        body="Experience with competitive research, persona work, and usability testing to inform and validate design decisions."
      />
      <Skill
        title="Content strategy & information architecture — 4"
        body="Confident structuring content hierarchies, page jobs, and navigation so products stay clear and scalable."
      />
      <Skill
        title="Accessible design / WCAG — 3"
        body="Design with clarity, hierarchy, and usable controls in mind; I haven’t led formal WCAG audits and would follow Kanopi’s accessibility practice closely."
      />
      <Skill
        title="Managing multiple projects — 4"
        body="Agency experience delivering parallel client work without dropping quality or communication."
      />
      <Skill
        title="Collaborating with strategists, developers, content, PMs — 4"
        body="Work closely with PMs and cross-functional partners; for important components I document behavior and constraints and share with the team—especially the PM—for review before build."
      >
        <Figure
          src="/share/kanopi/09-community-box-spec.png"
          caption="Example of how I document important components for PM and engineering review"
        />
      </Skill>

      <ChapterTitle id="ch-impact">3. Impact at Kanopi</ChapterTitle>
      <P>
        <strong className="text-foreground">Immediate impact:</strong> I can jump into client website work
        with a clear path from discovery to IA/content structure, UX, and visual design—especially when
        information is scattered and users need to evaluate or act quickly.
      </P>
      <P>
        <strong className="text-foreground">Challenges I fit:</strong> Complex navigation and information
        architecture, multi-role experiences, research-backed prioritization, and turning strategy into
        testable prototypes and polished UI.
      </P>
      <P>
        <strong className="text-foreground">Balancing goals:</strong> I treat business goals, user needs, and
        technical scope as constraints to negotiate early—not trade-offs to discover late. I surface what’s
        in / out for the MVP so the experience stays focused and shippable.
      </P>
      <P>
        <strong className="text-foreground">Meaningful decision:</strong> I prioritize structural clarity
        (hierarchy, page jobs, what users see first) over decorative complexity. When usability feedback
        points to confusion, I simplify the model before adding more UI.
      </P>

      <ChapterTitle id="ch-additional">4. Additional questions</ChapterTitle>
      <SubTitle>When research/feedback changed my recommendation</SubTitle>
      <P>
        On Yethos, competitive research and early persona work pushed toward a broad “social + community”
        feature set. Usability testing with influencers showed people struggled when creation and hierarchy
        weren’t clear—so I changed the recommendation: tighten the MVP around Community → Channel → Topic
        and core creation flows first, and mark secondary admin features as “not yet.” That kept the
        prototype focused on meaningful participation instead of shipping every competitor pattern.
      </P>

      <SubTitle>Defending a recommendation with a stakeholder</SubTitle>
      <P>
        When feature appetite grew beyond the original MVP goals, I worked with the project manager using
        research synthesis (privacy, moderation, community-centric structure) and the IA/flows to argue for a
        scalable foundation over packing every request into v1. We aligned on a presentation prototype that
        proved the core experience and left explicit room to grow—rather than diluting clarity to satisfy a
        longer wishlist.
      </P>

      <p className="mt-16 text-sm text-muted-soft">
        Confidential application materials · Not listed in site navigation or search indexes.
      </p>
    </article>
  );
}

export default function KanopiShare() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(KANOPI_SHARE_STORAGE_KEY) === "1"
  );

  return (
    <KanopiThemeMount>
      {unlocked ? <Content /> : <Gate onUnlock={() => setUnlocked(true)} />}
    </KanopiThemeMount>
  );
}
