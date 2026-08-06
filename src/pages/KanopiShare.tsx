import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { ShareCarousel } from "@/components/ShareCarousel";
import {
  KANOPI_SHARE_PASSWORD,
  KANOPI_SHARE_STORAGE_KEY,
} from "@/content/kanopiShare";
import { kanopiShareSeo } from "@/content/seo";

const BRANDING_SLIDES = [
  {
    src: "/share/kanopi/branding/01-brand-guidelines-cover.png",
    caption: "Brand guidelines cover",
  },
  {
    src: "/share/kanopi/branding/02-logomark-wordmark.png",
    caption: "Logomark and wordmark construction",
  },
  {
    src: "/share/kanopi/branding/03-logo-construction.png",
    caption: "Logo construction and proportions",
  },
  {
    src: "/share/kanopi/branding/04-clearspace.png",
    caption: "Clearspace",
  },
  {
    src: "/share/kanopi/branding/05-minimum-size.png",
    caption: "Minimum size",
  },
  {
    src: "/share/kanopi/branding/06-logo-donts.png",
    caption: "Logo don’ts",
  },
  {
    src: "/share/kanopi/branding/07-alternative-backgrounds.png",
    caption: "Logo on alternative backgrounds",
  },
  {
    src: "/share/kanopi/branding/08-mono-color.png",
    caption: "Mono color logo",
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
    src: "/share/kanopi/branding/11-watermark.png",
    caption: "Imagery watermark guidelines",
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

function Figure({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-cream">
      <img src={src} alt={caption} className="w-full" loading="lazy" decoding="async" />
      <figcaption className="border-t border-border px-4 py-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mt-14 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
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
    <section className="mx-auto max-w-md px-5 py-20 sm:px-8 sm:py-28">
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
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Seo page={kanopiShareSeo} />
      <p className="text-sm font-medium uppercase tracking-[0.1em] text-accent-dark">Private share</p>
      <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Kanopi application responses
      </h1>
      <p className="mt-4 text-lg text-muted">
        Pedro Mauri · Primary example:{" "}
        <Link
          to="/case-studies/yethos-community-discovery"
          className="font-medium text-accent-dark underline-offset-2 hover:underline"
        >
          Yethos
        </Link>{" "}
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
          <a
            href="https://www.linkedin.com/in/felipepuddu/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent-dark underline-offset-2 hover:underline"
          >
            Felipe Puddu
          </a>
          . I was hired full-time on this project from{" "}
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

      <SectionTitle>1) Approach across a project</SectionTitle>
      <P>
        I follow a structured path similar to how Kanopi frames website work. On Yethos the workflow was:
        Market research → Personas → Information architecture → Brand → Wireframes/prototypes → UI →
        Usability testing → Presentation.
      </P>
      <Figure
        src="/share/kanopi/01-goal-workflow.png"
        caption="Goal and full project workflow"
      />

      <SubTitle>Discovery</SubTitle>
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
        <strong className="text-foreground">2. Rapid Development and User Testing:</strong> After the
        prototype was completed, we conducted quick tests with influencers to validate our assumptions and
        refine the personas based on their feedback.
      </P>
      <P>
        <strong className="text-foreground">Lean UX Flow for Persona Development</strong>
      </P>
      <P>Below is a flowchart illustrating how research and iterations were applied:</P>
      <Figure
        src="/share/kanopi/03b-persona-flow.png"
        caption="Persona development flow"
      />
      <Figure src="/share/kanopi/03-personas.png" caption="Persona structure" />

      <SubTitle>Content Strategy</SubTitle>
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
      <Figure
        src="/share/kanopi/04-ia-userflows.png"
        caption="Information architecture and role-based community dashboard flows"
      />

      <SubTitle>UX Strategy</SubTitle>
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
      <Figure src="/share/kanopi/06-prototypes.png" caption="Prototype scenarios" />

      <SubTitle>Visual Design</SubTitle>
      <P>
        <strong className="text-foreground">Goals:</strong> A distinct, community-first brand and UI that
        supports clear CTAs and long sessions.
      </P>
      <P>
        <strong className="text-foreground">Activities:</strong> Logo and brand system (orange “Y”, dark/navy +
        white). First high-fidelity community page wire (annotated structure), then polished UI for web and
        mobile. Collaborated with the project manager so design stayed tied to business goals for a scalable
        MVP.
      </P>
      <P>
        <strong className="text-foreground">Deliverables:</strong> Brand guidelines, hi-fi UI, presentation-ready
        prototype.
      </P>
      <ShareCarousel slides={[...BRANDING_SLIDES]} label="Yethos brand guidelines" />
      <Figure
        src="/share/kanopi/08-first-hifi-wire-community.png"
        caption="First hi-fi wire — community page (annotated layout, cover 6:1, profile 16:9, favorites, discussions, files, people)"
      />
      <Figure src="/share/kanopi/07-conclusion.png" caption="Project conclusion" />

      <SectionTitle>2) Self-assessment</SectionTitle>
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

      <SectionTitle>3) Impact at Kanopi</SectionTitle>
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

      <SectionTitle>4) Additional questions</SectionTitle>
      <SubTitle>When research/feedback changed my recommendation</SubTitle>
      <P>
        I start with a direction from research, then treat usability feedback as a forcing function to cut
        scope. When testing shows users struggle, I tighten the MVP—clearer hierarchy and core flows first,
        defer secondary features—rather than defending a broader feature set.
      </P>

      <SubTitle>Defending a recommendation with a stakeholder</SubTitle>
      <P>
        When feature appetite grows, I bring research synthesis and the IA/flows back to the table and argue
        for a scalable foundation over packing every request into v1. I collaborate closely with the PM so we
        align on a prototype that proves the core experience and leaves room to grow.
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

  if (!unlocked) {
    return <Gate onUnlock={() => setUnlocked(true)} />;
  }

  return <Content />;
}
