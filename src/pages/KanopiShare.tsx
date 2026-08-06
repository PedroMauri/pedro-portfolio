import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent, type ReactNode, type FocusEvent as ReactFocusEvent } from "react";
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
    caption: "Phase 1: Early web hi-fi: community homepage structure (cover, join, discussions, files, members)",
  },
  {
    src: "/share/kanopi/10b-hifi-web-channels-annotated.png",
    caption: "Phase 2: Channels become the primary surface (nested nav + annotated IA decisions)",
  },
  {
    src: "/cases/yethos/hifi-channels.png",
    caption:
      "Phase 3: Mobile hi-fi: community channels with follow state, activity stats, channel list, and more",
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
      <div className="border-b border-border bg-card px-4 py-2.5">
        <p className="text-sm font-medium text-foreground/90 sm:text-sm">
          Tip: use the expand icon in the prototype toolbar to view fullscreen. There&apos;s a
          small bug: if screens don&apos;t advance, press the{" "}
          <span className="text-foreground">Criar</span> button to continue to the next page.
        </p>
      </div>
      <div className="relative aspect-[16/9] w-full bg-card">
        <iframe
          title={title}
          src={src}
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
        <p className="sr-only">
          Interactive Figma prototype embed. If the frame does not load, open the prototype from the
          caption link context or contact the page owner.
        </p>
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
  const describeId = useId();
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
            <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white opacity-100 shadow-sm backdrop-blur-sm sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
              <Expand className="size-3.5" aria-hidden="true" />
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
          aria-describedby={describeId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p id={titleId} className="truncate text-sm font-medium text-foreground">
                  {caption}
                </p>
                <p id={describeId} className="mt-0.5 text-xs text-muted">
                  Scroll inside the dialog if the image is larger than the viewport.
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close expanded image"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="size-4" aria-hidden="true" />
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

function SubTitle({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-lg font-medium text-foreground text-balance">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-base leading-relaxed text-foreground/80 sm:text-lg">{children}</p>;
}

function Skill({
  title,
  body,
  children,
}: {
  title: string;
  body: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="text-base font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-base leading-relaxed text-foreground/80">{body}</p>
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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ChapterNav() {
  function scrollTo(id: string) {
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    if (id === "ch-home") {
      window.scrollTo({ top: 0, behavior });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
    }
  }

  return (
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
            className="rounded-xl border border-border bg-card/95 px-3 py-2 text-left text-xs font-medium leading-snug text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 2xl:text-sm"
          >
            {chapter.label}
          </button>
        ))}
      </div>
    </nav>
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

  function hideNow() {
    clearClose();
    setOpen(false);
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
    hideNow,
  };
}

function HoverPreviewPortal({
  open,
  coords,
  placeBelow,
  cardId,
  titleId,
  label,
  widthClass,
  onShow,
  onHide,
  children,
}: {
  open: boolean;
  coords: { top: number; left: number };
  placeBelow: boolean;
  cardId: string;
  titleId: string;
  label: string;
  widthClass: string;
  onShow: () => void;
  onHide: () => void;
  children: ReactNode;
}) {
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      id={cardId}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-label={`${label} preview`}
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
      onFocusCapture={onShow}
      onBlurCapture={(event) => {
        const next = event.relatedTarget as Node | null;
        if (next && event.currentTarget.contains(next)) return;
        onHide();
      }}
    >
      {children}
    </div>,
    document.body
  );
}

function ProductHoverCard({
  href,
  label,
  title,
  company,
  role,
  year,
  summary,
  image,
  tags,
  external = false,
  ctaLabel = "Open case study",
  eyebrow = "Case study",
  imagePosition = "top",
}: {
  href: string;
  label: string;
  title: string;
  company: string;
  role: string;
  year: string;
  summary: string;
  image: string;
  tags: string[];
  external?: boolean;
  ctaLabel?: string;
  eyebrow?: string;
  imagePosition?: "top" | "center";
}) {
  const preview = useHoverPreview();
  const titleId = useId();
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const triggerLinkRef = useRef<HTMLAnchorElement>(null);
  const triggerClass =
    "font-medium text-accent-dark underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm";
  const ctaClass =
    "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

  useEffect(() => {
    if (!preview.open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      preview.hideNow();
      triggerLinkRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [preview.open]);

  function onTriggerKeyDown(event: ReactKeyboardEvent<HTMLAnchorElement>) {
    if (event.key === "Escape" && preview.open) {
      event.preventDefault();
      preview.hideNow();
      return;
    }
    if (event.key === "ArrowDown" && preview.open) {
      event.preventDefault();
      ctaRef.current?.focus();
      return;
    }
    if (event.key === "Tab" && !event.shiftKey && preview.open) {
      event.preventDefault();
      ctaRef.current?.focus();
    }
  }

  function onTriggerBlur(event: ReactFocusEvent<HTMLAnchorElement>) {
    const next = event.relatedTarget as Node | null;
    if (next && document.getElementById(preview.cardId)?.contains(next)) return;
    preview.hide();
  }

  const triggerProps = {
    ref: triggerLinkRef,
    "aria-expanded": preview.open,
    "aria-haspopup": "dialog" as const,
    "aria-controls": preview.open ? preview.cardId : undefined,
    className: triggerClass,
    onFocus: preview.show,
    onBlur: onTriggerBlur,
    onKeyDown: onTriggerKeyDown,
  };

  return (
    <span
      ref={preview.triggerRef}
      className="relative inline-block"
      onMouseEnter={preview.show}
      onMouseLeave={preview.hide}
    >
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" {...triggerProps}>
          {label}
        </a>
      ) : (
        <Link to={href} {...triggerProps}>
          {label}
        </Link>
      )}
      <HoverPreviewPortal
        open={preview.open}
        coords={preview.coords}
        placeBelow={preview.placeBelow}
        cardId={preview.cardId}
        titleId={titleId}
        label={label}
        widthClass="w-80"
        onShow={preview.show}
        onHide={preview.hide}
      >
        <div className="aspect-[16/9] overflow-hidden bg-cream">
          <img
            src={image}
            alt=""
            className={cn(
              "h-full w-full object-cover",
              imagePosition === "center" ? "object-center" : "object-top"
            )}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-accent-dark">
            {eyebrow} · {company}
          </p>
          <p id={titleId} className="mt-1 text-sm font-semibold leading-snug text-foreground">
            {title}
          </p>
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
          {external ? (
            <a
              ref={ctaRef}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClass}
              onFocus={preview.show}
            >
              {ctaLabel}
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          ) : (
            <Link ref={ctaRef} to={href} className={ctaClass} onFocus={preview.show}>
              {ctaLabel}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          )}
        </div>
      </HoverPreviewPortal>
    </span>
  );
}

function BuildClockLink({ withCard = false }: { withCard?: boolean }) {
  const buildClock = getCaseBySlug("buildclock-field-time-tracking");
  if (!withCard || !buildClock) {
    return <>BuildClock</>;
  }

  return (
    <ProductHoverCard
      href={`/case-studies/${buildClock.slug}`}
      label="BuildClock"
      title={buildClock.title}
      company={buildClock.company}
      role={buildClock.role}
      year={buildClock.year}
      summary={buildClock.summary}
      image={buildClock.thumbnail ?? "/cases/buildclock/active-workers.png"}
      tags={buildClock.tags}
      ctaLabel="Open case study"
      eyebrow="Case study"
    />
  );
}

function LeafLink({ withCard = false }: { withCard?: boolean }) {
  const leaf = getCaseBySlug("leaf-team-network-health");
  if (!withCard || !leaf) {
    return <>Leaf</>;
  }

  return (
    <ProductHoverCard
      href={`/case-studies/${leaf.slug}`}
      label="Leaf"
      title={leaf.title}
      company={leaf.company}
      role={leaf.role}
      year={leaf.year}
      summary={leaf.summary}
      image={leaf.thumbnail ?? "/cases/leaf/thumbnail.png"}
      tags={leaf.tags}
      ctaLabel="Open case study"
      eyebrow="Case study"
      imagePosition="center"
    />
  );
}

function KanopiThemeMount({ children }: { children: ReactNode }) {
  useTheme();
  return <>{children}</>;
}

function Gate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const errorId = useId();
  const titleId = useId();

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
    <section className="mx-auto max-w-md px-5 py-20 sm:px-8 sm:py-28" aria-labelledby={titleId}>
      <Seo page={kanopiShareSeo} />
      <ThemeToggle />
      <p className="mt-4 text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Private share</p>
      <h1 id={titleId} className="mt-3 text-3xl font-medium tracking-tight text-foreground">
        Kanopi application
      </h1>
      <p className="mt-4 text-muted">Enter the password shared with you to view this page.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
        <label className="block text-sm font-medium text-foreground" htmlFor="share-password">
          Password
        </label>
        <input
          id="share-password"
          type="password"
          autoComplete="current-password"
          value={value}
          aria-invalid={error}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        {error ? (
          <p id={errorId} role="alert" className="text-sm text-red-600 dark:text-red-400">
            Incorrect password. Please try again.
          </p>
        ) : null}
        <button
          type="submit"
          className="inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
      <ChapterNav />
      <ThemeToggle />
      <p className="mt-4 text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Private share</p>
      <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Kanopi application responses
      </h1>
      <p className="mt-4 text-lg text-muted">
        Pedro Mauri · Primary example:{" "}
        {yethos ? (
          <ProductHoverCard
            href={`/case-studies/${yethos.slug}`}
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
        )}
      </p>

      <P>
        Hi Vicki. Thank you for getting back to me. I chose{" "}
        <strong className="text-foreground">Yethos</strong> as my example because it follows the same
        phase structure you asked about (Discovery, Content Strategy, UX Strategy, and Visual Design), end to
        end on a community-focused platform where I led from research through polished UI. It’s the clearest
        demonstration of how I approach website and product strategy work.
      </P>

      <P>
        Below I walk through each phase with goals and activities, deliverables, and how research and
        feedback informed what came next.
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
        <strong className="text-foreground">Activities:</strong> Competitor analysis: features, strengths,
        weaknesses, and gaps. Defined Lean UX personas with motivations, behaviors, and use scenarios, then
        refined them through prototype tests.
      </P>
      <P>
        <strong className="text-foreground">Deliverables:</strong> Competitive teardown, opportunity framing,
        persona set + scenarios.
      </P>
      <P>
        <strong className="text-foreground">Into the next phase:</strong> Research showed differentiation
        should come from a clearer community hierarchy and stronger privacy/moderation, not more “social
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
        (Lean UX), so Discovery hypotheses were checked before locking Visual Design.
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
        expandable
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
        caption="User flow: Community Dashboard"
        expandable
      />
      <PrototypeEmbed
        src="https://embed.figma.com/proto/H5HP7S1xWwoWA9gotybIC0/Yethos---Screens?node-id=3216-60979&node-type=frame&scaling=min-zoom&content-scaling=fixed&page-id=707%3A9176&starting-point-node-id=3216%3A60979&embed-host=share"
        caption="Interactive Figma prototype: create community, channels, and topics"
      />

      <ChapterTitle id="ch-visual-design">1d. Visual Design</ChapterTitle>
      <P>
        <strong className="text-foreground">Goals:</strong> A distinct, community-first brand and UI that
        supports clear CTAs and long sessions.
      </P>
      <P>
        <strong className="text-foreground">Activities:</strong> Logo and brand system. Evolved community
        UI from early web hi-fi through channels patterns, then polished web and mobile. Collaborated with
        the project manager so design stayed tied to business goals for a scalable MVP.
      </P>
      <P>
        <strong className="text-foreground">Deliverables:</strong> Brand guidelines, hi-fi UI, presentation-ready
        prototype.
      </P>
      <P>
        <strong className="text-foreground">Into the next phase:</strong> Usability feedback and PM alignment
        shaped what shipped in the presentation prototype versus what stayed marked for later, so Visual
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
        title="Facilitating client meetings and presenting: 4"
        body={
          <>
            Regularly ran client and stakeholder sessions on{" "}
            <BuildClockLink withCard /> (a live field time-tracking product for Canadian contractors), with
            owners and PMs on job sites, walking through product decisions, recommendations, and next steps.
          </>
        }
      />
      <Skill
        title="Figma: 4"
        body="Primary tool on Yethos for wires, interactive prototypes, and hi-fi UI systems end to end."
      />
      <Skill
        title="Interaction design & prototyping: 4"
        body="On Yethos, clickable prototypes made influencer meetings and shadowing actionable. We adapted a large part of the MVP (especially creation flows and hierarchy) before locking final UI."
      />
      <Skill
        title="User research & usability testing: 4"
        body="Field research on BuildClock: site visits, observation, and competitive teardown, plus MVP testing with early contractor customers that changed scope."
      />
      <Skill
        title="Content strategy & information architecture: 4"
        body={
          <>
            On <LeafLink withCard /> (an HR platform for large corporate teams) structured information
            architecture for roles and responsibilities and made Team Network Health readable as
            manager-facing signals, not a raw data dump.
          </>
        }
      />
      <Skill
        title="Accessible design / WCAG: 3"
        body="Design for clarity and usable controls, e.g. BuildClock mobile web for field workers (large tap targets, simple clock-in). I haven’t led formal WCAG audits and would follow Kanopi’s accessibility practice closely."
      />
      <Skill
        title="Managing multiple projects: 4"
        body="Balanced BuildClock with parallel client and agency work without dropping communication or quality."
      />
      <Skill
        title="Collaborating with strategists, developers, content, PMs: 4"
        body="For complex UI I document behavior and constraints and share with the team, especially the PM, for review before build. The example below is from Yethos: a Community Box spec written so design, PM, and engineering stay aligned."
      >
        <Figure
          src="/share/kanopi/09-community-box-spec.png"
          caption="Example of how I document important components for PM and engineering review"
        />
      </Skill>

      <ChapterTitle id="ch-impact">3. Impact at Kanopi</ChapterTitle>
      <P>
        <strong className="text-foreground">Most immediate impact for Kanopi’s clients:</strong> I can take
        a website from zero to launch with confidence: discovery through IA/content structure, UX, and visual
        design, including WordPress builds when that’s the right stack. I’m especially useful when information
        is scattered and users need to evaluate or act quickly.
      </P>
      <P>
        <strong className="text-foreground">
          The types of challenges you are especially well suited to solve:
        </strong>{" "}
        Taking a client’s early vision (sketches, references, or rough ideas) and turning it into a clear
        structure on paper, then into screens that still honor what they want while staying logical toward
        the end goal.
      </P>
      <P>
        <strong className="text-foreground">
          How you would balance client goals, audience needs, accessibility, and technical constraints:
        </strong>{" "}
        I treat client goals, audience needs, accessibility, and technical constraints as things to
        negotiate early, not trade-offs to discover late. On products like BuildClock that meant readable
        field UI and a focused MVP (punches + timesheet) instead of a bloated suite. I surface what’s in /
        out so the experience stays shippable.
      </P>
      <P>
        <strong className="text-foreground">
          One example of a recommendation or design decision you made that created a meaningful outcome:
        </strong>{" "}
        On BuildClock I initially pushed a robust Finance area so punches could feed invoice workflows.
        Early MVP use with contractor customers showed they already used external finance tools and got
        confused by punches “disappearing” across reports, so I changed the recommendation to a simpler
        Reports export (period / jobsite / rates) and aligned with the co-founder to drop the heavier model.
        Outcome: a clearer admin path to billing without overbuilding.
      </P>

      <ChapterTitle id="ch-additional">4. Additional questions</ChapterTitle>
      <SubTitle>
        Tell us about a time research, user feedback, or analytics changed your original design
        recommendation. What did you learn, and what did you do differently?
      </SubTitle>
      <P>
        On Yethos, competitive research and early persona work pushed toward a broad “social + community”
        feature set. Usability testing with influencers showed people struggled when creation and hierarchy
        weren’t clear, so I changed the recommendation: tighten the MVP around Community → Channel → Topic
        and core creation flows first.
      </P>
      <P>
        <strong className="text-foreground">What I learned:</strong> competitor breadth is not the same as
        user clarity. More features early made the product harder to understand, not more valuable.
      </P>
      <P>
        <strong className="text-foreground">What I did differently:</strong> I cut the presentation scope to
        the hierarchy and creation paths that tested well, marked secondary admin ideas for later, and rebuilt
        the prototype around meaningful participation instead of shipping every competitor pattern.
      </P>

      <SubTitle>
        Describe a time you had to explain or defend a strategic recommendation to a client or stakeholder
        who saw the problem differently. How did you build alignment?
      </SubTitle>
      <P>
        When feature appetite grew beyond the original MVP goals, the project manager wanted more of the
        wishlist in v1. I argued for a scalable foundation (privacy, moderation, and community-centric
        structure) over packing every request into the first release.
      </P>
      <P>
        <strong className="text-foreground">How I built alignment:</strong> I sat with the project manager
        and walked through the research synthesis, IA, and flows side by side, so the trade-offs were visible:
        what users needed to understand first versus what would crowd the first release. We agreed to prove
        the core experience in a presentation prototype first, then grow from that foundation once it was
        clear and testable.
      </P>

      <div className="mt-16 space-y-3 border-t border-border pt-8">
        <p className="text-sm font-medium text-foreground">Accessibility note</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          This share page was reviewed for WCAG 2.2 AA practices used across the experience: labeled
          password field with announced errors, keyboard-friendly chapter navigation and carousels
          (arrows only when focused), expandable images with dialog focus management, case previews
          usable with keyboard (Escape to dismiss), and respect for reduced motion preferences.
        </p>
        <p className="text-sm text-muted-soft">
          Confidential application materials · Not listed in site navigation or search indexes.
        </p>
      </div>
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
