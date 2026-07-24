/** Shared SEO route data for post-build HTML injection (kept in sync with src/content/seo.ts). */

export const SITE_URL = "https://pedromauri.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const SITE_NAME = "Pedro Mauri — Product Design Portfolio";
export const THEME_COLOR = "#00959f";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pedro Mauri",
  jobTitle: "Product designer (UX & UI)",
  url: SITE_URL,
  email: "contact@pedromauri.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressCountry: "CA",
  },
  sameAs: ["https://www.linkedin.com/in/pedromauri/"],
  image: DEFAULT_OG_IMAGE,
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Pedro Mauri — Product design (UX & UI) portfolio. Case studies across B2B SaaS and digital products.",
  author: { "@type": "Person", name: "Pedro Mauri" },
};

const cases = [
  {
    slug: "buildclock-field-time-tracking",
    title: "Stop chasing timesheets — field time tracking for Canadian contractors",
    summary:
      "Designed and shipped a field time tracking product so Canadian contractors can GPS clock-in, approve hours, and export billing-ready packages — without chasing Friday timesheets.",
    image: `${SITE_URL}/cases/buildclock/active-workers.png`,
    year: "2026",
    company: "BuildClock",
  },
  {
    slug: "yethos-community-discovery",
    title: "Improving Community Discovery and Engagement",
    summary:
      "Redesigned the community experience so users can evaluate relevance, activity, and trust before joining.",
    image: `${SITE_URL}/cases/yethos/hifi-channels.png`,
    year: "2021",
    company: "Yethos",
  },
  {
    slug: "leaf-team-network-health",
    title: "Leaf — HR management for large teams and Team Network Health",
    summary:
      "Designed Leaf, an HR platform for large corporate teams — streamlining team creation, communication, and manager insights, with Team Network Health as a key differentiator.",
    image: `${SITE_URL}/cases/leaf/thumbnail.png`,
    year: "2019 – 2021",
    company: "Leaf",
  },
];

function caseJsonLd(item) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.summary,
    url: `${SITE_URL}/case-studies/${item.slug}`,
    author: { "@type": "Person", name: "Pedro Mauri", url: SITE_URL },
    about: item.company,
    dateCreated: item.year,
    image: item.image,
  };
}

export const pages = [
  {
    path: "/",
    title: "Pedro Mauri | UX & Product Design Portfolio",
    description:
      "Pedro Mauri — Product design (UX & UI) portfolio. Case studies across B2B SaaS and digital products.",
    image: DEFAULT_OG_IMAGE,
    type: "website",
    jsonLd: [person, website],
  },
  {
    path: "/about",
    title: "About | Pedro Mauri",
    description:
      "I'm Pedro, a product designer and strategic problem solver. With experience across B2B SaaS and digital products, I specialize in complex workflows, information architecture, and high-impact product experiences that improve usability and drive measurable outcomes.",
    image: DEFAULT_OG_IMAGE,
    type: "website",
    jsonLd: [person],
  },
  {
    path: "/resume",
    title: "Resume | Pedro Mauri",
    description:
      "Download the resume of Pedro Mauri, Product designer (UX & UI) based in Calgary, Canada.",
    image: DEFAULT_OG_IMAGE,
    type: "website",
    jsonLd: [person],
  },
  {
    path: "/case-studies",
    title: "Case Studies | Pedro Mauri",
    description:
      "Selected product design case studies across B2B SaaS, community platforms, and shipped digital products.",
    image: DEFAULT_OG_IMAGE,
    type: "website",
    jsonLd: [website],
  },
  {
    path: "/privacy",
    title: "Privacy | Pedro Mauri",
    description:
      "How pedromauri.com uses Vercel Web Analytics — privacy-friendly, cookie-free traffic measurement.",
    image: DEFAULT_OG_IMAGE,
    type: "website",
    jsonLd: [],
  },
  ...cases.map((item) => ({
    path: `/case-studies/${item.slug}`,
    title: `${item.title} | Pedro Mauri`,
    description: item.summary,
    image: item.image,
    type: "article",
    jsonLd: [person, caseJsonLd(item)],
  })),
];
