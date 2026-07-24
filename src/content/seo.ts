import { cases, type CaseStudy } from "@/content/cases";
import { profile } from "@/content/profile";

export const SITE_URL = "https://pedromauri.com";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const SITE_NAME = "Pedro Mauri — Product Design Portfolio";
export const DEFAULT_DESCRIPTION =
  "Pedro Mauri — Product design (UX & UI) portfolio. Case studies across B2B SaaS and digital products.";
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
    url: absoluteUrl(`/case-studies/${caseStudy.slug}`),
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
    path: `/case-studies/${caseStudy.slug}`,
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

export const caseStudiesSeo: SeoPage = {
  path: "/case-studies",
  title: `Case Studies | ${profile.name}`,
  description:
    "Selected product design case studies across B2B SaaS, community platforms, and shipped digital products.",
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

export function getCaseSeo(slug: string): SeoPage | undefined {
  const caseStudy = cases.find((item) => item.slug === slug);
  return caseStudy ? casePage(caseStudy) : undefined;
}

export function getIndexableSeoPages(): SeoPage[] {
  const listed = cases.filter((item) => !item.comingSoon);
  return [homeSeo, aboutSeo, resumeSeo, caseStudiesSeo, privacySeo, ...listed.map(casePage)];
}
