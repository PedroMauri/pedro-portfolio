import { Helmet } from "react-helmet-async";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteImageUrl,
  absoluteUrl,
  type SeoPage,
} from "@/content/seo";

interface SeoProps {
  page: SeoPage;
}

export function Seo({ page }: SeoProps) {
  const url = absoluteUrl(page.path);
  const image = absoluteImageUrl(page.image ?? DEFAULT_OG_IMAGE);
  const type = page.type ?? "website";
  const jsonLdItems = page.jsonLd
    ? Array.isArray(page.jsonLd)
      ? page.jsonLd
      : [page.jsonLd]
    : [];

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={image} />

      {jsonLdItems.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
