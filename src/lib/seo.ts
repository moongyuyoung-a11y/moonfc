import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

type PageMeta = {
  /** 30자 이내 권장 */
  title: string;
  /** 80자 이내 권장 */
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
};

/** 페이지별 고유 title / description / canonical / OG / Twitter 메타 생성 */
export function buildMetadata(meta: PageMeta): Metadata {
  const url = absoluteUrl(meta.path);
  const image = absoluteUrl(meta.image ?? site.ogImage);
  const fullTitle = meta.path === "/" ? meta.title : `${meta.title} | ${site.nameEn}`;

  return {
    // layout 의 title.template 과 이중 적용되지 않도록 absolute 사용
    title: { absolute: fullTitle },
    description: meta.description,
    alternates: { canonical: url, types: { "application/rss+xml": absoluteUrl("/rss.xml") } },
    robots: meta.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: meta.type ?? "website",
      url,
      title: fullTitle,
      description: meta.description,
      siteName: `${site.name} ${site.nameEn}`,
      locale: site.locale,
      images: [{ url: image, width: 1200, height: 630, alt: meta.imageAlt ?? `${site.name} ${site.nameEn}` }],
      ...(meta.type === "article"
        ? {
            publishedTime: meta.publishedTime,
            modifiedTime: meta.modifiedTime ?? meta.publishedTime,
            authors: [absoluteUrl("/about")],
            tags: meta.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: meta.description,
      images: [image],
    },
  };
}
