import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  KANOPI_SHARE_PASSWORD,
  KANOPI_SHARE_STORAGE_KEY,
} from "@/content/kanopiShare";
import { kanopiShareSeo } from "@/content/seo";

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

function Skill({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-5">
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-1 text-base leading-relaxed text-muted">{body}</p>
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
      <Figure src="/share/kanopi/02-market-research.png" caption="Competitors and feature comparison" />
      <Figure src="/share/kanopi/03-personas.png" caption="Persona definition and Lean UX loop" />

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
        white). High-fidelity UI for web and mobile. Collaborated with the project manager so design stayed
        tied to business goals for a scalable MVP.
      </P>
      <P>
        <strong className="text-foreground">Deliverables:</strong> Brand guidelines, hi-fi UI, presentation-ready
        prototype.
      </P>
      <Figure src="/share/kanopi/05-brand-ui.png" caption="Brand system and UI screens" />
      <Figure src="/share/kanopi/07-conclusion.png" caption="Project conclusion" />

      <SectionTitle>2) Self-assessment</SectionTitle>
      <Skill
        title="Facilitating client meetings and presenting — 4"
        body="Presented process and recommendations through structured decks and stakeholder alignment with the PM on Yethos; also client-facing work in agency settings."
      />
      <Skill
        title="Figma — 4"
        body="Wires, prototypes, and hi-fi UI systems for Yethos end-to-end."
      />
      <Skill
        title="Interaction design & prototyping — 4"
        body="Role-based flows and prototypes for community/channel/topic creation; iterated after usability tests."
      />
      <Skill
        title="User research & usability testing — 4"
        body="Competitive research, Lean persona validation with influencers, usability testing and adjustments."
      />
      <Skill
        title="Content strategy & information architecture — 4"
        body="Defined Community → Channel → Topic hierarchy, core pages, and navigation—central to the product."
      />
      <Skill
        title="Accessible design / WCAG — 3"
        body="Designed for clarity, hierarchy, and usable controls across devices; I haven’t led formal WCAG audits and would follow Kanopi’s accessibility practice closely."
      />
      <Skill
        title="Managing multiple projects — 4"
        body="Agency experience (Upsigns) delivering parallel client work alongside product projects."
      />
      <Skill
        title="Collaborating with strategists, developers, content, PMs — 4"
        body="Worked closely with the PM on Yethos to keep UX aligned to goals; regular collaboration with engineering/brand in other roles."
      />

      <SectionTitle>3) Impact at Kanopi</SectionTitle>
      <P>
        <strong className="text-foreground">Immediate impact:</strong> Bringing a clear discovery →
        IA/content structure → UX → visual path to client website work—especially when information is
        scattered and users need to evaluate or act quickly.
      </P>
      <P>
        <strong className="text-foreground">Challenges I fit:</strong> Complex navigation/IA, multi-role
        experiences, research-backed prioritization, turning strategy into testable prototypes and polished
        UI.
      </P>
      <P>
        <strong className="text-foreground">Balancing goals:</strong> On Yethos we balanced business goals
        (engagement, monetization options, scalable MVP) with audience needs (privacy, ease of use,
        meaningful community interaction) and technical MVP scope (explicit “not yet” features in flows).
      </P>
      <P>
        <strong className="text-foreground">Meaningful decision:</strong> Structuring the product as Community
        → Channel → Topic and leading community pages with activity/overview signals—so users could
        understand value faster. Usability feedback reinforced clarity over decorative complexity.
      </P>

      <SectionTitle>4) Additional questions</SectionTitle>
      <SubTitle>When research/feedback changed my recommendation</SubTitle>
      <P>
        Competitor and persona work initially pushed a broad “social + community” feature set. Usability
        testing with influencers showed we needed a tighter MVP: clearer hierarchy and creation flows first,
        with some admin features marked not-yet. I refined personas and deferred scope so the prototype
        stayed focused on meaningful community interaction.
      </P>
      <Figure src="/share/kanopi/03-personas.png" caption="Lean UX refine loop (personas)" />

      <SubTitle>Defending a recommendation with a stakeholder</SubTitle>
      <P>
        I collaborated closely with the project manager when feature appetite grew. Using research synthesis
        (privacy, moderation, community-centric structure) and the IA/flows, I argued for a scalable
        foundation over packing every competitor feature into v1. We aligned on a prototype that
        demonstrated the core experience and left room for growth.
      </P>
      <Figure src="/share/kanopi/07-conclusion.png" caption="Project conclusion / alignment" />

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
