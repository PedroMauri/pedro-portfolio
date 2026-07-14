import pedroPhoto from "@/assets/pedro-mauri.jpg";

export interface Strength {
  title: string;
  description: string;
  icon: "experience" | "design" | "code" | "qa" | "mindset" | "collab";
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
  email: "contact@pedromauri.com",
  phone: "+1 (368) 299-6803",
  website: "https://www.pedromauri.com",
  linkedin: "https://www.linkedin.com/in/pedro-mauri/",
  location: "Calgary, Canada",
  photo: pedroPhoto,
  resumeUrl: "/pedro-mauri-resume.pdf",
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
    "Outside of design, I enjoy soccer and video games.",
    "I love meeting new people, so feel free to connect!",
  ],
  experience: [
    {
      company: "BuildClock",
      roles: [
        {
          title: "Senior Product Designer",
          period: "Dec 2024 – Present",
          tags: ["Part-time", "Remote"],
        },
      ],
    },
    {
      company: "Mattali Drywall Inc.",
      roles: [
        {
          title: "Product Experience & Growth Strategist",
          period: "Aug 2023 – Present",
          tags: ["Full-time", "Hybrid"],
        },
      ],
    },
    {
      company: "Yethos",
      roles: [
        {
          title: "Product Designer",
          period: "Jul 2021 – Jul 2023",
          tags: ["Part-time", "Remote"],
        },
      ],
    },
    {
      company: "Leaf",
      roles: [
        {
          title: "Product Designer",
          period: "Jan 2019 – Jun 2021",
          tags: ["Part-time", "Remote"],
        },
      ],
    },
    {
      company: "Upsigns Digital Communication",
      roles: [
        {
          title: "Senior Product Designer",
          period: "Apr 2019 – Jul 2023",
          tags: ["Full-time"],
        },
      ],
    },
  ] satisfies ExperienceItem[],
  strengths: [
    {
      title: "7+ Years of Experience",
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
};
