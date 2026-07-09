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
  previewVariant?: "workflow" | "onboarding";
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
  keyDecision?: KeyDecision;
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
    slug: "workflow-automation-platform",
    title: "Reducing approval cycle time for operations teams",
    company: "B2B Operations Platform",
    role: "Lead Product Designer",
    year: "2025",
    duration: "8 weeks",
    tags: ["Research", "Dashboard", "Design system"],
    summary:
      "Replaced a fragmented 12-step approval path with one guided workflow teams could finish without leaving the product.",
    heroLine:
      "Guided workflow cut confusion at handoffs and reduced support load in pilot accounts.",
    accent: "from-indigo-500 to-violet-600",
    previewVariant: "workflow",
    featured: true,
    meta: {
      team: "2 designers, 1 PM, 4 engineers",
      platform: "Web app — admin and approver roles",
      methods: "Interviews, journey map, prototype, usability test",
    },
    context:
      "Mid-market companies used the platform to route purchase and policy approvals. Power users knew the workarounds; new managers took two to three times longer and escalated to support weekly.",
    statCallout: "68% of drop-off happened between steps 4 and 6 in the legacy flow.",
    myRole:
      "I led discovery and end-to-end UI for the approval module. Partnered with PM on scope, ran 10 interviews, and facilitated design critique with engineering. I extended the existing design system rather than creating one-off screens.",
    problemBefore: {
      description:
        "Approvals were scattered across modals, tabs, and email handoffs. Status lived in different places depending on who you asked.",
      pains: [
        "No single view of where a request stood in the chain",
        "Approvers relied on email threads outside the product",
        "Bulk actions required exporting to spreadsheets",
        "New users could not tell if a step was waiting on them or another team",
      ],
    },
    insights: [
      {
        type: "quote",
        label: "User voice",
        body: "I never know if it's waiting on me or finance.",
        attribution: "Operations manager, 120-person company",
      },
      {
        type: "data",
        label: "Analytics + interviews",
        body: "68% of drop-off happened between steps 4 and 6 — the handoff between department approvers.",
      },
      {
        type: "opportunity",
        label: "Design opportunity",
        body: "Users wanted progress visibility more than fewer clicks. Clarity beat minimalism.",
      },
    ],
    process: [
      {
        title: "Discovery",
        description:
          "10 stakeholder and user interviews, support ticket audit, and end-to-end journey map with pain points at each handoff.",
      },
      {
        title: "Explore",
        description:
          "Three navigation models — wizard, split view, and timeline — tested as clickable prototypes with 8 users.",
      },
      {
        title: "Prototype",
        description:
          "High-fidelity flows in Figma with realistic states: pending, rejected, escalated, and bulk approval.",
      },
      {
        title: "Validate",
        description:
          "Moderated usability tests followed by a pilot with one customer team before full rollout.",
      },
      {
        title: "Ship",
        description:
          "Paired with engineering through two release cycles; empty and error states shipped as first-class screens.",
      },
    ],
    keyDecision: {
      title: "Navigation model",
      explored: ["Step wizard", "Split-panel with timeline", "Tab-based sections"],
      chosen: "Split-panel with persistent status",
      rationale:
        "Status stayed visible while users reviewed details on the right. Trade-off: more horizontal space on desktop; mobile became a step list with a sticky status bar.",
    },
    solution:
      "Shipped a guided workflow with persistent status, inline context for each step, and a single source of truth for approvers.",
    solutionDetails: [
      "List + detail panel for scanning and acting on multiple requests",
      "Inline rejection reasons and escalation paths",
      "Bulk select and approve for high-volume approvers",
    ],
    solutionStates: ["Pending review", "Rejected with reason", "Bulk selection", "First-time empty state"],
    beforeAfter: {
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "12 steps across modals and email. Status unclear. No bulk actions.",
      afterDescription: "Single surface with progress, context, and actions in one place.",
    },
    impact: [
      "Pilot sessions showed roughly 30% reduction in median completion time",
      "Support tickets tagged approval flow decreased after six weeks",
      "Post-task confidence scores improved in moderated usability tests",
    ],
    impactMetrics: [
      { value: "~30%", label: "Faster completion in pilot" },
      { value: "-18%", label: "Approval-related support tickets" },
      { value: "4.2→4.7", label: "Task confidence score" },
    ],
    impactCaveat:
      "Full rollout metrics were still maturing at time of writing. Pilot data from 12 moderated sessions and one customer team.",
    reflection:
      "Clarity beat minimalism. B2B users do not need fewer steps — they need visible progress and trustworthy state. Next time I would involve customer success earlier for edge-case inventory.",
  },
  {
    slug: "saas-onboarding",
    title: "Self-serve onboarding for admin users",
    company: "HR Tech SaaS",
    role: "Product Designer",
    year: "2024",
    duration: "6 weeks",
    tags: ["Onboarding", "UX Writing", "Design system"],
    summary:
      "Rebuilt first-run setup so admins could configure their workspace without scheduling a call.",
    heroLine:
      "Checklist-based setup increased self-serve activation during trial.",
    accent: "from-slate-600 to-slate-800",
    previewVariant: "onboarding",
    featured: true,
    meta: {
      team: "1 designer, 1 PM, 3 engineers",
      platform: "Web app — admin setup hub",
      methods: "Analytics audit, IA, prototype, feature flag launch",
    },
    context:
      "New admin accounts required an onboarding call before they could invite their team. Conversion from trial to activated workspace lagged behind product benchmarks.",
    myRole:
      "Owned the onboarding experience end-to-end: audit, information architecture, UI design, and copy guidelines aligned with the design system.",
    problemBefore: {
      description:
        "Setup tasks were buried across settings pages with no sense of progress or priority.",
      pains: [
        "Admins did not know which steps were required vs optional",
        "Validation errors only appeared at the final submit",
        "No way to skip and return without losing context",
      ],
    },
    insights: [
      {
        type: "data",
        label: "Funnel analysis",
        body: "40% of trial admins dropped off before inviting their first team member.",
      },
      {
        type: "quote",
        label: "User voice",
        body: "I assumed I was done, then got blocked when I tried to invite someone.",
        attribution: "HR admin, 80-person company",
      },
      {
        type: "opportunity",
        label: "Design opportunity",
        body: "A checklist with time estimates could replace the need for a kickoff call.",
      },
    ],
    process: [
      {
        title: "Audit",
        description:
          "Reviewed analytics funnels, session recordings, and sales notes to find where admins dropped off.",
      },
      {
        title: "Structure",
        description:
          "Grouped setup tasks into required vs optional paths with clear progress and estimated time.",
      },
      {
        title: "System alignment",
        description:
          "Extended existing form and empty-state components instead of one-off screens.",
      },
      {
        title: "Launch",
        description:
          "Rolled out behind a feature flag, monitored activation metrics for two weeks, then iterated on two choke points.",
      },
    ],
    keyDecision: {
      title: "Setup structure",
      explored: ["Linear wizard", "Checklist hub", "Contextual prompts in-app"],
      chosen: "Checklist hub with skip and return",
      rationale:
        "Admins could see the full picture upfront and tackle tasks in flexible order. Trade-off: more UI on first visit, mitigated with time estimates per task.",
    },
    solution:
      "A checklist-based setup hub with contextual help, sensible defaults, and the ability to skip and return. Each step validated input inline.",
    solutionDetails: [
      "Required vs optional tasks clearly labeled",
      "Inline validation on each step",
      "Contextual help without leaving the flow",
    ],
    solutionStates: ["Empty checklist", "In progress", "Completed workspace"],
    beforeAfter: {
      beforeLabel: "Before",
      afterLabel: "After",
      beforeDescription: "Scattered settings pages. No progress. Surprise errors at the end.",
      afterDescription: "Single hub with progress, inline validation, and flexible order.",
    },
    impact: [
      "Increase in self-serve workspace activation during trial",
      "Fewer onboarding calls requested in the first week",
      "Positive qualitative feedback on clarity from CS team",
    ],
    impactMetrics: [
      { value: "+24%", label: "Self-serve activation" },
      { value: "-35%", label: "Onboarding calls week 1" },
      { value: "4.5/5", label: "CS clarity rating" },
    ],
    impactCaveat: "Activation lift measured over 8 weeks post-launch vs prior cohort.",
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
