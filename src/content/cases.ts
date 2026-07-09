export interface ProcessStep {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  role: string;
  year: string;
  tags: string[];
  summary: string;
  accent: string;
  featured: boolean;
  context: string;
  myRole: string;
  process: ProcessStep[];
  solution: string;
  impact: string[];
  reflection: string;
}

export const cases: CaseStudy[] = [
  {
    slug: "workflow-automation-platform",
    title: "Redesigning a multi-step approval workflow",
    company: "B2B Operations Platform",
    role: "Lead Product Designer",
    year: "2025",
    tags: ["Research", "Prototyping", "Dashboard"],
    summary:
      "Simplified a 12-step approval process into a guided flow that reduced task completion time and support tickets.",
    accent: "from-indigo-500 to-violet-600",
    featured: true,
    context:
      "Operations teams relied on a legacy approval tool with scattered steps across modals, tabs, and email handoffs. New users struggled to understand status, and experienced users built workarounds outside the product.",
    myRole:
      "I led discovery, mapped the end-to-end workflow, designed the new step-by-step experience, and paired with engineering through two release cycles.",
    process: [
      {
        title: "Discovery",
        description:
          "Interviewed ops managers and ICs, audited support tickets, and mapped the current journey with pain points at each handoff.",
      },
      {
        title: "Ideation",
        description:
          "Explored three navigation models tested as clickable prototypes with 8 users.",
      },
      {
        title: "Prototyping",
        description:
          "Built high-fidelity flows in Figma with realistic data states: pending, rejected, escalated, and bulk approval.",
      },
      {
        title: "Validation",
        description:
          "Ran moderated usability tests and a pilot with one customer team before full rollout.",
      },
    ],
    solution:
      "Shipped a guided workflow with persistent status, inline context for each step, and a single source of truth for approvers.",
    impact: [
      "Median time-to-complete dropped in pilot sessions",
      "Support tickets tagged approval flow decreased after launch",
      "Higher confidence scores in post-task usability tests",
    ],
    reflection:
      "B2B users do not need fewer steps. They need visible progress and trustworthy state.",
  },
  {
    slug: "saas-onboarding",
    title: "Self-serve onboarding for admin users",
    company: "HR Tech SaaS",
    role: "Product Designer",
    year: "2024",
    tags: ["Onboarding", "UX Writing", "Design system"],
    summary:
      "Rebuilt first-run setup so admins could configure their workspace without scheduling a call.",
    accent: "from-slate-600 to-slate-800",
    featured: true,
    context:
      "New admin accounts required an onboarding call before they could invite their team. Conversion from trial to activated workspace lagged behind product benchmarks.",
    myRole:
      "Owned the onboarding experience end-to-end: audit, information architecture, UI design, and copy guidelines aligned with the design system.",
    process: [
      {
        title: "Audit",
        description:
          "Reviewed analytics funnels, session recordings, and sales notes to find where admins dropped off.",
      },
      {
        title: "Structure",
        description:
          "Grouped setup tasks into required vs. optional paths with clear progress and estimated time.",
      },
      {
        title: "System alignment",
        description:
          "Extended existing form and empty-state components instead of one-off screens.",
      },
      {
        title: "Launch",
        description:
          "Rolled out behind a feature flag and iterated on two choke points.",
      },
    ],
    solution:
      "A checklist-based setup hub with contextual help, sensible defaults, and the ability to skip and return.",
    impact: [
      "Increase in self-serve workspace activation during trial",
      "Fewer onboarding calls requested in the first week",
      "Positive qualitative feedback on clarity from CS team",
    ],
    reflection:
      "Onboarding is a trust problem. Every screen needed to answer: where am I, what is required, and what happens next?",
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug);
}

export function getFeaturedCases(): CaseStudy[] {
  return cases.filter((item) => item.featured);
}
