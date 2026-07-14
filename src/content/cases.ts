export interface ProcessStep {
  title: string;
  description: string;
}

export interface Insight {
  type: "quote" | "data" | "opportunity";
  label: string;
  body: string;
  attribution?: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
}

export interface KeyDecision {
  title: string;
  explored: string[];
  chosen: string;
  rationale: string;
}

export interface DesignDecision {
  title: string;
  description: string;
}

export interface CaseFigure {
  src: string;
  alt: string;
  caption: string;
}

export interface CaseLearning {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  role: string;
  year: string;
  duration?: string;
  tags: string[];
  summary: string;
  heroLine?: string;
  accent: string;
  previewVariant?: "workflow" | "onboarding" | "community";
  thumbnail?: string;
  /** Extra cover zoom for thumbnails with unwanted mat/border edges. */
  thumbnailZoom?: number;
  featured: boolean;
  comingSoon?: boolean;
  liveUrl?: string;
  /** Nicole-format overview paragraphs */
  overview: string[];
  goals: string[];
  responsibilities: string[];
  collaborators: string;
  timeline: string;
  businessNeed: string;
  userNeed: string;
  problemStatement: string;
  howMightWe: string;
  learnings: CaseLearning[];
  meta?: {
    team: string;
    platform: string;
    methods: string;
  };
  context: string;
  statCallout?: string;
  myRole: string;
  problemBefore?: {
    description: string;
    pains: string[];
  };
  insights?: Insight[];
  process: ProcessStep[];
  figures?: {
    process?: CaseFigure;
    roadmap?: CaseFigure;
    sitemap?: CaseFigure;
    userFlow?: CaseFigure;
    wireframe?: CaseFigure;
    solution?: CaseFigure;
    solutions?: CaseFigure[];
  };
  keyDecision?: KeyDecision;
  keyDecisions?: DesignDecision[];
  solution: string;
  solutionDetails?: string[];
  impact: string[];
  impactMetrics?: ImpactMetric[];
  impactCaveat?: string;
  reflection: string;
}

export const cases: CaseStudy[] = [
{
    slug: "buildclock-field-time-tracking",
    title: "Stop chasing timesheets — field time tracking for Canadian contractors",
    company: "BuildClock",
    role: "Founder & Product Designer",
    year: "2026",
    tags: ["B2B SaaS", "0 to 1", "Field ops", "Mobile web"],
    summary:
      "Designed and shipped a field time tracking product so Canadian contractors can GPS clock-in, approve hours, and export billing-ready packages — without chasing Friday timesheets.",
    heroLine:
      "Two personas, one platform: workers punch in under 10 seconds; admins close the week with confidence.",
    accent: "from-emerald-600 to-teal-700",
    previewVariant: "workflow",
    featured: true,
    liveUrl: "https://www.buildclock.io/",
    thumbnail: "/cases/buildclock/active-workers.png",
    overview: [
      "Canadian contractors lose hours every week to timesheet chase: forgotten clock-outs, spreadsheets that don't match the field, and midnight math before billing deadlines.",
      "As Founder & Product Designer I owned problem framing, dual-persona experience design, MVP scope, and interaction design — partnering with one engineer to ship the live product at buildclock.io.",
    ],
    goals: [
      "Replace Friday timesheet chaos with a trustworthy punch-to-billing loop.",
      "Give workers a near-zero-friction mobile clock-in without app installs.",
      "Give admins live visibility, approval flows, and billing-ready exports.",
    ],
    responsibilities: [
      "Product vision & dual-persona UX",
      "MVP scoping & interaction design",
      "Shipped product partnership with engineering",
    ],
    collaborators: "Founder & Product Designer + 1 Engineer",
    timeline: "2026",
    businessNeed:
      "Close weeks accurately and bill clients with confidence — without manual hour reconciliation.",
    userNeed:
      "Workers need to clock in fast on-site; supervisors need live status, approvals, and exports.",
    problemStatement:
      "Every Friday looked the same: chase punches, reconcile spreadsheets, and bill with uncertainty.",
    howMightWe:
      "How might we design one platform for two jobs — field clock-in and week close — without forcing app-store installs?",
    learnings: [
      {
        title: "Two personas, two interfaces",
        description:
          "Admins and workers have different jobs. One product only works when each role gets a dedicated experience.",
      },
      {
        title: "Closing the week is the product",
        description:
          "GPS clock-in is the entry point; approve + export is what removes Friday chaos.",
      },
      {
        title: "Installs kill adoption",
        description:
          "Mobile web let crews punch on day one — clarity and speed beat native-app polish for field ops.",
      },
    ],
    meta: {
      team: "Founder & Product Designer + 1 Engineer",
      platform: "Mobile web (no app install) · Desktop admin",
      methods: "Problem discovery, dual-persona IA, MVP scoping, interaction design, shipped product",
    },
    context:
      "Canadian contractors lose hours every week to timesheet chase: forgotten clock-outs, spreadsheets that don't match the field, and midnight math before billing deadlines. BuildClock needed a product that worked for crews on-site and for admins closing the week — without forcing app-store installs.",
    statCallout:
      "Every Friday looked the same: chase punches, reconcile spreadsheets, bill with uncertainty.",
    myRole:
      "As Founder & Product Designer I owned problem framing, dual-persona experience design, MVP scope, and interaction design — partnering with one engineer to ship the live product at buildclock.io.",
    problemBefore: {
      description:
        "Field attendance lived across texts, memory, and mismatched spreadsheets. Supervisors lacked live visibility, and billing depended on manual hour calculation — errors got passed to clients.",
      pains: [
        "Workers forget to clock out; timesheets arrive late",
        "Punch data scattered across messages and sheets",
        "Hours calculated manually — mistakes billed to clients",
        "No clear view of who is on-site right now",
      ],
    },
    insights: [
      {
        type: "opportunity",
        label: "Two jobs, two interfaces",
        body: "Admins need live crew status, review queues, and exports. Workers need a near-zero-friction clock-in. One product — different views.",
      },
      {
        type: "data",
        label: "Installs kill adoption",
        body: "Crews will punch from a phone browser. Native apps add friction for contractors who just need to start the day.",
      },
      {
        type: "quote",
        label: "Closing the week is the product",
        body: "GPS clock-in only matters if supervisors can approve and export billing packages without another Friday firefight.",
      },
    ],
    process: [
      {
        title: "Map the Friday chaos",
        description:
          "Captured the end-to-end pain from punch → approval → invoice for Canadian contractor workflows.",
      },
      {
        title: "Split personas early",
        description:
          "Designed admin/supervisor and worker experiences as separate jobs, not one overloaded screen.",
      },
      {
        title: "Scope a ruthless MVP",
        description:
          "Prioritized GPS attendance, geofence trust, approval flows, weekly PDF export, and CAD billing.",
      },
      {
        title: "Design for mobile web first",
        description:
          "Optimized clock-in and dashboards for phone use so crews never need an app store download.",
      },
      {
        title: "Ship and iterate live",
        description:
          "Partnered with engineering to launch the full product loop — from create account to review and bill — as a working SaaS.",
      },
    ],
    keyDecision: {
      title: "Native apps vs mobile web for field crews",
      explored: ["Native iOS/Android apps", "Hybrid / PWA-heavy stack", "Mobile web, no installs"],
      chosen: "Mobile web for workers and mobile-friendly admin — no app store required",
      rationale:
        "Contractors need crews clocking in on day one. Removing installs reduced adoption friction while still delivering GPS-tagged punches and supervisor flows on phone or desktop.",
    },
    keyDecisions: [
      {
        title: "GPS + geofence as trust layer",
        description:
          "Auto-approve inside the jobsite fence; flag punches outside — fewer disputes, clearer accountability.",
      },
      {
        title: "Live status + review queue for admins",
        description:
          "Supervisors see who's active, review exceptions, and act from desktop or phone with the same mental model.",
      },
      {
        title: "Week close + PDF export",
        description:
          "Approval in-app and one-click billing packages turn Friday chaos into a closed week.",
      },
      {
        title: "CAD-native, Stripe-secured billing",
        description:
          "Pricing and checkout match Canadian contractors: transparent Basic plan, no stored card data on our side.",
      },
    ],
    figures: {
      solutions: [
        {
          src: "/cases/buildclock/active-workers.png",
          alt: "Admin dashboard with active workers",
          caption:
            "Admin — live Active Workers dashboard with site status and quick Switch / Out actions.",
        },
      ],
    },
    solution:
      "BuildClock is a dual-persona field time tracking product: workers select a jobsite and clock in with GPS verification; admins and supervisors run live crew status, approve punches, and export weekly reports for client billing — all mobile-friendly, with no app installs.",
    solutionDetails: [
      "Worker clock-in designed to complete in under 10 seconds",
      "Admin dashboard with active workers, review queue, and weekly reports",
      "GPS-tagged attendance with geofence auto-approve / flag outside",
      "Supervisor sign-off and PDF export for billing packages",
      "Multi-site orgs with Stripe Checkout billing in CAD",
    ],
    impact: [
      "Shipped a full 0→1 product loop: signup → invite crew → punch → approve → export",
      "Removed app-install friction for field workers via mobile web",
      "Gave supervisors live on-site visibility instead of chasing texts",
      "Turned week close into an in-product workflow with PDF export for billing",
    ],
    impactMetrics: [
      { value: "0→1", label: "Shipped MVP" },
      { value: "0 apps", label: "Installs required" },
      { value: "CAD", label: "Billing ready" },
    ],
    impactCaveat:
      "Qualitative outcomes from an early shipped MVP with a small team; production growth metrics are still maturing.",
    reflection:
      "For field SaaS, clarity for two personas beats feature depth. Closing the week — approve and export — was the real product; GPS clock-in was the entry point that made that week trustworthy.",
  },
{
    slug: "yethos-community-discovery",
    title: "Improving Community Discovery and Engagement",
    company: "Yethos",
    role: "Product Designer",
    year: "2021",
    tags: ["Research", "IA", "Community", "Prototyping"],
    summary:
      "Redesigned the community experience so users can evaluate relevance, activity, and trust before joining.",
    heroLine:
      "Clarity, activity signals, and conversation-first layout to answer one question: is this community worth joining?",
    accent: "from-[#DD6B20] to-[#C45A14]",
    previewVariant: "community",
    thumbnail: "/cases/yethos/hifi-channels.png",
    featured: true,
    overview: [
      "Yethos lets creators build public, private, and paid communities. Users struggled to judge whether a community was worth joining — key information lived across multiple pages, so discovery felt slow and uncertain.",
      "I led end-to-end product design for the Community experience: discovery, information architecture, interaction design, high-fidelity UI, and usability validation — working directly with founders and engineering.",
    ],
    goals: [
      "Help users evaluate a community’s value before joining.",
      "Surface activity, scope, and conversations in one scannable hierarchy.",
      "Reduce steps and cognitive load between discovery and the join decision.",
    ],
    responsibilities: [
      "End-to-end UX & UI design",
      "Information architecture & user flows",
      "Prototyping & usability validation",
    ],
    collaborators: "Founder, Product Designer, 2 Engineers",
    timeline: "2021",
    businessNeed:
      "Increase join confidence and engagement by making community value obvious at first glance.",
    userNeed:
      "Quickly understand what a community is about, how active it is, and whether it is worth joining.",
    problemStatement:
      "Users struggle to quickly understand a community’s value, leading to slow discovery, fragmented evaluation, and uncertain join decisions.",
    howMightWe:
      "How might we help users evaluate relevance, activity, and trust before joining — without forcing them across multiple pages?",
    learnings: [
      {
        title: "Clarity beats polish",
        description:
          "Users join when they quickly understand the value — not when the page looks polished.",
      },
      {
        title: "Activity signals build trust",
        description:
          "Follower counts, comments, and live discussions outperformed promotional copy.",
      },
      {
        title: "Architecture is the product",
        description:
          "Information hierarchy and conversation-first layout mattered more than visual decoration.",
      },
    ],
    meta: {
      team: "Founder, Product Designer, 2 Engineers",
      platform: "Mobile web application",
      methods: "Competitive analysis, research, IA, user flows, prototyping, usability testing",
    },
    context:
      "Yethos lets creators build public, private, and paid communities. Users struggled to judge whether a community was worth joining — key information lived across multiple pages, so discovery felt slow and uncertain.",
    statCallout:
      "Users had to explore several screens before understanding a community's value.",
    myRole:
      "I led end-to-end product design for the Community experience: discovery, information architecture, interaction design, high-fidelity UI, and usability validation — working directly with founders and engineering.",
    problemBefore: {
      description:
        "Evaluation was fragmented. Users could not quickly see what a community was about, how active it was, who participated, or whether premium access was justified.",
      pains: [
        "No at-a-glance view of community activity or health",
        "Scope and topics hidden behind extra navigation",
        "Promotional copy outweighed visible conversations",
        "Join decision required too many steps",
      ],
    },
    insights: [
      {
        type: "data",
        label: "Community health",
        body: "Activity, member count, and discussions built confidence faster than descriptions alone.",
      },
      {
        type: "opportunity",
        label: "Fragmented navigation",
        body: "Users visited multiple pages before understanding scope, activity, or premium pricing.",
      },
      {
        type: "quote",
        label: "Conversations over copy",
        body: "Visible discussions drove trust more than promotional descriptions.",
      },
    ],
    process: [],
    figures: {
      roadmap: {
        src: "/cases/yethos/roadmap.png",
        alt: "Yethos product roadmap from vision to prioritized initiatives",
        caption:
          "Product roadmap linking vision to goals, initiatives, and resources — UX foundations prioritized first to unlock community growth.",
      },
      sitemap: {
        src: "/cases/yethos/information-architecture.png",
        alt: "Information architecture from platform elements to core pages",
        caption:
          "From platform elements to hierarchy and core pages — community discovery and the community page as the primary evaluation surface.",
      },
      userFlow: {
        src: "/cases/yethos/user-flow.png",
        alt: "Community user flow for members and managers",
        caption:
          "Primary flows for members and community managers — discover, join, engage, explore topics, and manage settings.",
      },
      wireframe: {
        src: "/cases/yethos/wireframe-homepage.png",
        alt: "Community homepage wireframe",
        caption:
          "Early wireframe prioritizing engagement metrics, community metadata, and feed hierarchy.",
      },
      solutions: [
        {
          src: "/cases/yethos/hifi-channels.png",
          alt: "Final community channels designs — mobile",
          caption:
            "Mobile — community channels with follow state, activity stats, channel list, and channel feed with composer.",
        },
        {
          src: "/cases/yethos/hifi-web.png",
          alt: "Final community homepage design — web",
          caption:
            "Web — community homepage with cover, join CTA, favorites, interactions, discussions table, files, and members.",
        },
      ],
    },
    keyDecisions: [
      {
        title: "Surface community health first",
        description:
          "Engagement metrics appear before decorative content so users immediately read activity signals.",
      },
      {
        title: "Prioritize conversations",
        description:
          "Recent discussions sit below the overview — authentic posts beat promotional copy for trust.",
      },
      {
        title: "Expose community scope",
        description: "Topic tags summarize what the community covers before a user commits to join.",
      },
      {
        title: "Support quick scanning",
        description:
          "Progressive disclosure lets users grasp value in seconds while deeper content stays one scroll away.",
      },
    ],
    solution:
      "The final design helps users evaluate a community before committing. Overview stats, topic scope, and live conversations sit in one scannable hierarchy — from unfollowed to followed states through to topic-level discussion.",
    impact: [
      "Faster community evaluation in moderated usability sessions",
      "Clearer navigation hierarchy vs. the previous structure",
      "Higher confidence before joining in post-task interviews",
      "Lower cognitive load on first visit",
    ],
    impactMetrics: [
      { value: "Faster", label: "Community evaluation" },
      { value: "Clearer", label: "Navigation hierarchy" },
      { value: "Higher", label: "Pre-join confidence" },
    ],
    impactCaveat:
      "Findings from usability validation during product development; production metrics were not available.",
    reflection:
      "Users join when they quickly understand the value — not when the page looks polished. Clarity, activity signals, and information architecture mattered more than visual decoration.",
  },
{
    slug: "leaf-team-network-health",
    title: "Leaf — HR management for large teams and Team Network Health",
    company: "Leaf",
    role: "Product Designer",
    year: "—",
    tags: ["B2B SaaS", "HR Tech", "Dashboards", "Team health"],
    summary:
      "Designed Leaf, an HR platform for large corporate teams — streamlining team creation, communication, and manager insights, with Team Network Health as a key differentiator.",
    heroLine:
      "Help managers see team dynamics early — through clear structure, communication, and a health score grounded in employee feedback.",
    accent: "from-[#548C7C] to-[#3F6B5E]",
    previewVariant: "workflow",
    featured: true,
    thumbnail: "/cases/leaf/thumbnail.png",
    thumbnailZoom: 1.12,
    overview: [
      "Leaf is a human resources management application designed for companies with large teams. The platform simplifies management across departments within large corporate accounts — enabling teams creation, information sharing, and management of direct reports.",
      "As Product Designer I shaped core experiences across calendars and scheduling, chat, health checks, and performance insights for teams and members — with special focus on Team Network Health.",
    ],
    goals: [
      "Streamline management of large teams with an intuitive interface for creating and managing teams and sub-teams.",
      "Give managers actionable insight into employee well-being and performance through dashboards, planning tools, and interaction history.",
      "Facilitate seamless communication between team members and managers via integrated chat and engagement features.",
      "Develop Team Network Health so organizations can understand team dynamics and address challenges early.",
    ],
    responsibilities: [
      "End-to-end product design",
      "Information architecture",
      "Wireframes to high-fidelity UI",
      "Team Network Health feature design",
    ],
    collaborators: "Product and engineering partners (details not documented in source board)",
    timeline: "Product design project",
    businessNeed:
      "Large corporate accounts needed one platform to organize teams, share information, and manage direct reports at scale.",
    userNeed:
      "Managers need clear roles, better communication with teams, and early signals when team dynamics are unhealthy.",
    problemStatement:
      "In large organizations, overlapping responsibilities, weak communication lines, and invisible team dynamics make people management reactive instead of proactive.",
    howMightWe:
      "How might we help managers understand Team Network Health and act early — without adding more process overhead?",
    learnings: [
      {
        title: "Complex systems need clear IA",
        description:
          "Roles & Responsibilities pages taught how critical information architecture is when many teams and reporting lines overlap.",
      },
      {
        title: "Health needs a signal managers can trust",
        description:
          "Team Network Health only works when employee feedback becomes a readable score and graph — not a raw data dump.",
      },
      {
        title: "Low-fi first, branded UI second",
        description:
          "Moving from grayscale flows to teal branded hi-fi kept exploration fast before committing to visual polish.",
      },
    ],
    meta: {
      team: "Product Designer + product/engineering partners",
      platform: "Web application",
      methods: "Research, brainstorming, wireframing, visual design, feature collaboration",
    },
    context:
      "Leaf serves companies with large teams that need to create teams, share information, and manage direct reports — including calendars, chat, health checks, and performance insights.",
    statCallout:
      "Managers needed earlier visibility into team dynamics — not just task lists and org charts.",
    myRole:
      "As Product Designer I owned the UX for core Leaf management flows and co-designed Team Network Health — from research themes through wireframes, branded UI, and collaboration on the health-score experience.",
    problemBefore: {
      description:
        "Large-team HR tools often left managers without a clear view of communication gaps, overlapping responsibilities, or early relationship friction inside their teams.",
      pains: [
        "Communication lines between managers and teams were unclear",
        "Roles overlapped, reducing accountability",
        "No early signal when team dynamics were degrading",
        "Managers lacked a single place for insights, planning, and history",
      ],
    },
    insights: [
      {
        type: "opportunity",
        label: "Communication",
        body: "Improving the line of communication between managers and their teams was a primary research focus.",
      },
      {
        type: "data",
        label: "Roles & responsibilities",
        body: "Clear role definition was needed to avoid overlapping duties and improve accountability.",
      },
      {
        type: "quote",
        label: "Team Network Health",
        body: "A feature to visualize team dynamics from employee feedback — using a custom algorithm — became the strategic differentiator.",
      },
    ],
    process: [
      {
        title: "Research & brainstorm",
        description:
          "Focused on communication, roles & responsibilities, and Team Network Health as the core opportunity areas.",
      },
      {
        title: "Low-fidelity wireframes",
        description:
          "Explored Team Creation flow, Team Member Profiles, and Roles & Responsibilities pages in grayscale.",
      },
      {
        title: "High-fidelity visual design",
        description:
          "Brought the product into a teal-green branded system: dashboards, profiles, lists, and interactive feedback states.",
      },
      {
        title: "Collaborate on Team Network Health",
        description:
          "Designed dynamic employee questions, health-score presentation, and color-coded relationship graphs for managers.",
      },
    ],
    figures: {
      wireframe: {
        src: "/cases/leaf/wireframes-lofi.png",
        alt: "Leaf low-fidelity wireframes",
        caption:
          "Low-fidelity exploration — edit achievement, Team Network Health graph, profile quick-view, notes, healthcheck survey, and achievements.",
      },
      solutions: [
        {
          src: "/cases/leaf/wireframes-hifi.png",
          alt: "Leaf high-fidelity UI screens",
          caption:
            "High-fidelity product UI — Team Network Health graphs, dashboard with Health Score, employee profiles, NPS cards, and explanatory modal.",
        },
      ],
    },
    keyDecisions: [
      {
        title: "Team Network Health as a first-class feature",
        description:
          "Employee feedback feeds an algorithm that produces a Health Score managers can explore through a network graph.",
      },
      {
        title: "Separate structure from sentiment",
        description:
          "Roles & Responsibilities clarify ownership, while Network Health surfaces relationship dynamics — two different jobs.",
      },
      {
        title: "Dashboards for action, not decoration",
        description:
          "Profiles, health scores, and interaction histories were designed to help managers plan and intervene earlier.",
      },
    ],
    solution:
      "The final Leaf experience helps large teams organize and communicate — with Team Network Health giving managers a color-coded view of relationship strength, feedback context, and a Health Score based on employee input.",
    solutionDetails: [
      "Team creation and management for teams and sub-teams",
      "Team member profiles with role and Health Score",
      "Network graph visualization of team connections",
      "Feedback and task-assignment interaction patterns",
      "Roles & Responsibilities pages with clearer accountability",
    ],
    impact: [
      "Established a design system language in teal-green for Leaf’s web product",
      "Delivered wire-to-hi-fi coverage for team creation, profiles, and roles",
      "Defined Team Network Health as a measurable, manager-facing insight surface",
      "Strengthened learning on complex IA and algorithm-informed UX",
    ],
    impactMetrics: [
      { value: "Health", label: "Score model" },
      { value: "Network", label: "Dynamics graph" },
      { value: "IA", label: "Roles clarity" },
    ],
    impactCaveat:
      "Outcomes described from the design case board; production business metrics were not included in the source material.",
    reflection:
      "Leaf was a strong learning project — especially Team Network Health and the information architecture behind Roles & Responsibilities. Complex people systems need both clear structure and trustworthy signals.",
  },
];

/** Display order on Home and Case Studies. */
const CASE_DISPLAY_ORDER = [
  "buildclock-field-time-tracking",
  "yethos-community-discovery",
  "leaf-team-network-health",
] as const;

function sortCasesByDisplayOrder(list: CaseStudy[]): CaseStudy[] {
  const rank = new Map(CASE_DISPLAY_ORDER.map((slug, index) => [slug, index]));
  return [...list].sort((a, b) => {
    const aRank = rank.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bRank = rank.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return aRank - bRank;
  });
}

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug);
}

export function getFeaturedCases(): CaseStudy[] {
  return sortCasesByDisplayOrder(cases.filter((item) => item.featured));
}

export function getListedCases(): CaseStudy[] {
  return sortCasesByDisplayOrder(cases);
}

export function getCaseThumbnail(caseStudy: CaseStudy): string | undefined {
  return (
    caseStudy.thumbnail ??
    caseStudy.figures?.solutions?.[0]?.src ??
    caseStudy.figures?.solution?.src
  );
}
