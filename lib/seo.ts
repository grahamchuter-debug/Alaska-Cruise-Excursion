import type { Metadata } from "next";
import { SITE } from "./site";
import { absoluteUrl } from "./paths";

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage,
}: PageSEO): Metadata {
  const url = absoluteUrl(SITE.url, path);
  const socialTitle = path === "/" ? title : `${title} | ${SITE.name}`;
  const image = ogImage ?? `${SITE.url}/og-default.jpg`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    keywords: [
      "Alaska cruise",
      "shore excursions",
      "cruise ports",
      "cruise planning",
      ...keywords,
    ],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    publisher: SITE.name,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE.name,
      title: socialTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
