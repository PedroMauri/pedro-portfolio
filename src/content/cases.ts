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
  featured: boolean;
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
    sitemap?: CaseFigure;
    userFlow?: CaseFigure;
    wireframe?: CaseFigure;
    solution?: CaseFigure;
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
    accent: "from-violet-600 to-indigo-700",
    previewVariant: "community",
    thumbnail: "/cases/yethos/hifi-community.png",
    featured: true,
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
      process: {
        src: "/cases/yethos/project-workflow.png",
        alt: "Product design workflow",
        caption: "End-to-end process from discovery and research through validation and handoff.",
      },
      userFlow: {
        src: "/cases/yethos/user-flow.png",
        alt: "Community experience user flow",
        caption:
          "Primary flows for members and creators — discover, evaluate, join, engage, and manage.",
      },
      wireframe: {
        src: "/cases/yethos/wireframe-homepage.png",
        alt: "Community homepage wireframe",
        caption:
          "Early wireframe prioritizing engagement metrics, community metadata, and feed hierarchy.",
      },
      solution: {
        src: "/cases/yethos/hifi-community.png",
        alt: "Final community page designs",
        caption:
          "High-fidelity community homepage and topic detail — follow state, activity stats, and conversation-first feed.",
      },
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
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug);
}

export function getFeaturedCases(): CaseStudy[] {
  return cases.filter((item) => item.featured);
}

export function getCaseThumbnail(caseStudy: CaseStudy): string | undefined {
  return caseStudy.thumbnail ?? caseStudy.figures?.solution?.src;
}
