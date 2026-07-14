export interface Strength {
  title: string;
  description: string;
  icon: "experience" | "design" | "code" | "qa" | "mindset" | "collab";
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface FunStat {
  value: string;
  label: string;
}

export interface ExperienceItem {
  company: string;
  roles: {
    title: string;
    period: string;
    tags?: string[];
  }[];
}

export const profile = {
  name: "Pedro Mauri",
  shortName: "Pedro",
  title: "Product designer (UX & UI)",
  welcome: "Welcome! I'm Pedro",
  aboutGreeting: "Hello! Nice to meet you.",
  aboutHeadline: "I'm Pedro, a product designer and strategic problem solver.",
  email: "hello@pedromauri.com",
  linkedin: "https://www.linkedin.com/in/pedro-mauri/",
  location: "Canada",
  resumeUrl: "#", // Placeholder — replace with PDF URL
  currentRole: "I am a product designer",
  heroLines: [
    "I am a product designer",
    "I turn complex problems into clear, user-friendly solutions",
    "I have a meticulous eye for detail",
    "I have been crafting designs for B2B SaaS",
  ],
  bio: [
    "With experience across B2B SaaS and digital products, I specialize in complex workflows, information architecture, and high-impact product experiences that improve usability and drive measurable outcomes.",
    "I've led design for community platforms, discovery flows, and product systems — and founded BuildClock with engineering support, a field time tracking product for Canadian contractors.",
    "Outside of design, I enjoy [hobby], [hobby], and mentoring designers.",
    "I love meeting new people, so feel free to connect!",
  ],
  funStats: [
    { value: "[#]", label: "designers mentored" },
    { value: "[#]", label: "countries visited" },
    { value: "[#]", label: "projects shipped" },
    { value: "[#]", label: "years designing" },
  ] satisfies FunStat[],
  experience: [
    {
      company: "BuildClock",
      roles: [
        {
          title: "Founder & Product Designer",
          period: "2026 - Present",
          tags: ["B2B SaaS", "Field ops", "0 to 1"],
        },
      ],
    },
    {
      company: "Yethos",
      roles: [
        {
          title: "Product Designer",
          period: "2021",
          tags: ["Community", "Mobile web", "B2C"],
        },
      ],
    },
    {
      company: "[Previous Company]",
      roles: [
        {
          title: "[Role Title]",
          period: "[Month Year] - [Month Year]",
          tags: ["Placeholder"],
        },
      ],
    },
  ] satisfies ExperienceItem[],
  strengths: [
    {
      title: "[X]+ Years of Experience",
      description:
        "My background spans B2B SaaS and digital products, including complex workflows, community platforms, and product systems.",
      icon: "experience",
    },
    {
      title: "Proficient in UX & UI Design",
      description:
        "I apply design thinking to craft intuitive, user-centered solutions that align with business objectives.",
      icon: "design",
    },
    {
      title: "Comfortable with Design Systems",
      description:
        "I build and extend component systems so teams ship consistent, scalable interfaces faster.",
      icon: "code",
    },
    {
      title: "Strong Visual & Design QA",
      description:
        "I catch subtle details others often miss and communicate them clearly to engineering partners.",
      icon: "qa",
    },
    {
      title: "Humble & Purposeful Mindset",
      description:
        "I value feedback, collaboration, and continuous learning to create impactful, user-centered solutions.",
      icon: "mindset",
    },
    {
      title: "Effective Collaborator",
      description:
        "I've worked with product, engineering, founders, and stakeholders to launch products end to end.",
      icon: "collab",
    },
  ] satisfies Strength[],
  testimonials: [
    {
      quote:
        "[Placeholder testimonial — replace with a real quote from a manager or peer about Pedro's collaboration, craft, and impact.]",
      name: "[Name]",
      role: "[Title] @ [Company]",
    },
    {
      quote:
        "[Placeholder testimonial — highlight ownership, attention to detail, and partnership with engineering or product.]",
      name: "[Name]",
      role: "[Title] @ [Company]",
    },
    {
      quote:
        "[Placeholder testimonial — emphasize user advocacy, strategic thinking, and measurable outcomes.]",
      name: "[Name]",
      role: "[Title] @ [Company]",
    },
  ] satisfies Testimonial[],
};
