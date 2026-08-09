import { cases, type CaseStudy } from "@/content/cases";
import { profile } from "@/content/profile";

export const SITE_URL = "https://pedromauri.com";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const SITE_NAME = "Pedro Mauri — Product Design Portfolio";
export const DEFAULT_DESCRIPTION =
  "Pedro Mauri — Product design (UX & UI) portfolio. Selected projects across B2B SaaS and digital products.";
export const THEME_COLOR = "#00959f";

export interface SeoPage {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized}`;
}

export function absoluteImageUrl(image = DEFAULT_OG_IMAGE): string {
  return absoluteUrl(image);
}

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    url: SITE_URL,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressCountry: "CA",
    },
    sameAs: [profile.linkedin],
    image: absoluteImageUrl(DEFAULT_OG_IMAGE),
  };
}

function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    author: { "@type": "Person", name: profile.name },
  };
}

function caseStudyJsonLd(caseStudy: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseStudy.title,
    description: caseStudy.summary,
    url: absoluteUrl(`/projects/${caseStudy.slug}`),
    author: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
    about: caseStudy.company,
    dateCreated: caseStudy.year,
    image: absoluteImageUrl(caseStudy.thumbnail ?? DEFAULT_OG_IMAGE),
  };
}

function casePage(caseStudy: CaseStudy): SeoPage {
  return {
    path: `/projects/${caseStudy.slug}`,
    title: `${caseStudy.title} | ${profile.name}`,
    description: caseStudy.summary,
    image: caseStudy.thumbnail ?? DEFAULT_OG_IMAGE,
    type: "article",
    jsonLd: [personJsonLd(), caseStudyJsonLd(caseStudy)],
  };
}

export const homeSeo: SeoPage = {
  path: "/",
  title: "Pedro Mauri | UX & Product Design Portfolio",
  description: DEFAULT_DESCRIPTION,
  image: DEFAULT_OG_IMAGE,
  type: "website",
  jsonLd: [personJsonLd(), websiteJsonLd()],
};

export const aboutSeo: SeoPage = {
  path: "/about",
  title: `About | ${profile.name}`,
  description: `${profile.aboutHeadline} ${profile.bio[0]}`,
  image: DEFAULT_OG_IMAGE,
  type: "website",
  jsonLd: personJsonLd(),
};

export const resumeSeo: SeoPage = {
  path: "/resume",
  title: `Resume | ${profile.name}`,
  description: `Download the resume of ${profile.name}, ${profile.title} based in ${profile.location}.`,
  image: DEFAULT_OG_IMAGE,
  type: "website",
  jsonLd: personJsonLd(),
};

export const projectsSeo: SeoPage = {
  path: "/projects",
  title: `Projects | ${profile.name}`,
  description:
    "Selected product design projects across B2B SaaS, community platforms, and shipped digital products.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  jsonLd: websiteJsonLd(),
};

export const privacySeo: SeoPage = {
  path: "/privacy",
  title: `Privacy | ${profile.name}`,
  description:
    "How pedromauri.com uses Vercel Web Analytics — privacy-friendly, cookie-free traffic measurement.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
};

export const notFoundSeo: SeoPage = {
  path: "/404",
  title: `Page not found | ${profile.name}`,
  description: "The page you requested could not be found.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const kanopiShareSeo: SeoPage = {
  path: "/share/kanopi",
  title: `Private share | ${profile.name}`,
  description: "Password-protected application materials.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const adminSeo: SeoPage = {
  path: "/admin",
  title: `Admin | ${profile.name}`,
  description: "Private admin hub.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const privatePortfolioSeo: SeoPage = {
  path: "/admin/private-portfolio",
  title: `Private portfolio | ${profile.name}`,
  description: "Company-specific private application shares.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const frenchStudySeo: SeoPage = {
  path: "/study/french",
  title: `French study | ${profile.name}`,
  description: "Private IELTS French study space.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const immigrationSeo: SeoPage = {
  path: "/immigration",
  title: `Immigration | ${profile.name}`,
  description: "Private immigration notes and materials.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const documentsSeo: SeoPage = {
  path: "/immigration/documents",
  title: `Documents | Immigration | ${profile.name}`,
  description: "Private shared documents for immigration processes.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const ieltsEnglishSeo: SeoPage = {
  path: "/immigration/documents/ielts-english",
  title: `IELTS English | Documents | ${profile.name}`,
  description: "Private IELTS English TRF and IDP account reference.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const wesSeo: SeoPage = {
  path: "/immigration/documents/wes",
  title: `WES | Documents | ${profile.name}`,
  description: "Private WES ECA report and account reference for IRCC.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const workHistorySeo: SeoPage = {
  path: "/immigration/documents/work-history",
  title: `Work history | Documents | ${profile.name}`,
  description: "Schedule A work history and reference letters for Express Entry.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export const aaipSeo: SeoPage = {
  path: "/immigration/aaip",
  title: `AAIP | Immigration | ${profile.name}`,
  description: "Private AAIP profile snapshot for the next Worker EOI.",
  image: DEFAULT_OG_IMAGE,
  type: "website",
  noindex: true,
};

export function getCaseSeo(slug: string): SeoPage | undefined {
  const caseStudy = cases.find((item) => item.slug === slug);
  return caseStudy ? casePage(caseStudy) : undefined;
}

export function getIndexableSeoPages(): SeoPage[] {
  const listed = cases.filter((item) => !item.comingSoon);
  return [homeSeo, aboutSeo, projectsSeo, privacySeo, ...listed.map(casePage)];
}
