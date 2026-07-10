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
    legacySteps?: string[];
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
  solutionStates?: string[];
  beforeAfter?: {
    beforeLabel: string;
    afterLabel: string;
    beforeDescription: string;
    afterDescription: string;
  };
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
    duration: "10 weeks",
    tags: ["Research", "IA", "Community", "Prototyping"],
    summary:
      "Helping users quickly understand a community's value before joining by redesigning the experience around clarity, activity, and trust.",
    heroLine:
      "Helping users evaluate a community's value before joining — through clarity, activity signals, and trust.",
    accent: "from-violet-600 to-indigo-700",
    previewVariant: "community",
    thumbnail: "/cases/yethos/hifi-community.png",
    featured: true,
    meta: {
      team: "Founder, Product Designer, 2 Engineers",
      platform: "Responsive web application",
      methods:
        "Competitive analysis, user research, IA, user flows, wireframing, prototyping, usability testing, design system",
    },
    context:
      "Yethos was designed around communities, allowing creators to build public, private, and paid spaces for people with shared interests. While the platform offered flexible community management, users struggled to evaluate whether a community was relevant before joining. Important information was scattered across different pages, forcing users to spend unnecessary time exploring before deciding to participate. The challenge was not creating another community page — it was helping users answer one question as quickly as possible: \"Is this community worth joining?\"",
    statCallout:
      "Users explored multiple pages before understanding whether a community was worth joining.",
    myRole:
      "I led the end-to-end product design process for the Community experience. Working directly with the founders, I was responsible for product discovery, information architecture, UX strategy, interaction design, high-fidelity interfaces, and usability validation. Throughout the project I collaborated closely with engineering to ensure design decisions were technically feasible while maintaining a scalable experience for future platform growth.",
    problemBefore: {
      description:
        "The existing experience made community evaluation unnecessarily difficult. Because information was fragmented across different screens, users had to navigate through multiple interactions before understanding a community's value. This created friction during discovery and reduced confidence before joining.",
      legacySteps: ["About page", "Members list", "Topics", "Pricing", "Feed", "Settings"],
      pains: [
        "Could not immediately understand what the community was about",
        "No clear signal of whether the community was active",
        "Hard to see who participated and what topics were discussed",
        "Premium communities did not justify their cost at first glance",
      ],
    },
    insights: [
      {
        type: "data",
        label: "Community health",
        body: "Activity, member count, and discussions created confidence faster than descriptions alone.",
      },
      {
        type: "opportunity",
        label: "Fragmented navigation",
        body: "Users visited multiple pages before understanding scope, activity, or cost of premium communities.",
      },
      {
        type: "quote",
        label: "Conversations over copy",
        body: "Visible discussions drove trust more than promotional descriptions.",
      },
    ],
    process: [
      {
        title: "Research",
        description: "Competitive analysis, user personas, and evaluation of how users assess online communities.",
      },
      {
        title: "Structure",
        description: "Information architecture and user flows to reduce navigation before join decisions.",
      },
      {
        title: "Explore",
        description: "Wireframes and interactive prototypes balancing community identity with engagement signals.",
      },
      {
        title: "Validate",
        description: "Usability testing and design iterations with founders and engineering.",
      },
      {
        title: "Deliver",
        description: "High-fidelity interfaces aligned with the design system for scalable implementation.",
      },
    ],
    figures: {
      process: {
        src: "/cases/yethos/project-workflow.png",
        alt: "Full project workflow",
        caption:
          "The complete design process used throughout the project, from research and persona definition to usability validation and prototype delivery.",
      },
      sitemap: {
        src: "/cases/yethos/sitemap-ia.png",
        alt: "Community site map",
        caption:
          "Information architecture created to simplify navigation and surface the most relevant information earlier in the user journey.",
      },
      userFlow: {
        src: "/cases/yethos/user-flow.png",
        alt: "User flow diagram",
        caption:
          "Mapping the primary user journeys helped identify unnecessary navigation steps and opportunities to simplify interactions.",
      },
      wireframe: {
        src: "/cases/yethos/wireframe-homepage.png",
        alt: "Community homepage wireframe",
        caption:
          "Early exploration focused on prioritizing engagement signals, community metadata, and content hierarchy before moving into high-fidelity design.",
      },
      solution: {
        src: "/cases/yethos/hifi-community.png",
        alt: "Final community page design",
        caption:
          "The redesigned experience helps users evaluate a community before asking them to commit.",
      },
    },
    keyDecisions: [
      {
        title: "Surface community health before visual content",
        description:
          "Instead of leading with large banners or descriptions, the page highlights meaningful engagement metrics so users immediately understand whether a community is active.",
      },
      {
        title: "Prioritize conversations",
        description:
          "Recent discussions appear immediately below the community overview. Research suggested users trusted authentic conversations more than promotional copy.",
      },
      {
        title: "Expose community scope",
        description:
          "Topic tags provide an immediate overview of subjects discussed inside each community, reducing uncertainty before joining.",
      },
      {
        title: "Support quick scanning",
        description:
          "Information hierarchy emphasizes progressive disclosure, allowing users to understand the community within seconds while still providing deeper content further down the page.",
      },
    ],
    solution:
      "The redesigned experience centered on a single principle: help users evaluate a community before asking them to commit. The final interface combines community overview, activity indicators, member engagement, topic discovery, recent conversations, and clear content hierarchy — reducing exploration time while increasing confidence throughout the discovery process.",
    solutionDetails: [
      "Community overview with activity indicators at the top",
      "Recent conversations surfaced before deep navigation",
      "Topic tags for immediate scope understanding",
      "Progressive disclosure for deeper content below the fold",
    ],
    impact: [
      "Participants evaluated communities faster in moderated sessions",
      "Navigation hierarchy rated clearer vs. legacy structure",
      "Higher confidence before joining in post-task interviews",
      "Reduced cognitive load during first-visit scanning",
    ],
    impactMetrics: [
      { value: "Faster", label: "Community evaluation" },
      { value: "Clearer", label: "Navigation hierarchy" },
      { value: "Higher", label: "Pre-join confidence" },
    ],
    impactCaveat:
      "Findings from usability validation during product development; production rollout metrics were not available at time of writing.",
    reflection:
      "Users do not join communities because they are beautifully designed. They join because they quickly understand the value they will receive. By prioritizing clarity, activity signals, and information architecture over visual decoration, the experience became easier to scan, easier to trust, and ultimately easier to join.",
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
