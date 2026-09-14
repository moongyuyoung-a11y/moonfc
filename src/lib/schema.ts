import { site, absoluteUrl, services, type ServiceKey } from "./site";
import type { FaqItem } from "./faq";
import type { InsightMeta } from "./insights";

/** JSON-LD @id 는 사이트 전체에서 동일한 값을 써서 엔티티가 연결되게 한다 */
export const ids = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
  person: absoluteUrl("/about#person"),
  localBusiness: absoluteUrl("/#localbusiness"),
};

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: site.name,
    alternateName: [site.nameEn, site.abbr, "문프스 컨설팅", "피트니스경영연구소"],
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png"), width: 512, height: 512 },
    image: absoluteUrl(site.ogImage),
    description: site.description,
    founder: { "@id": ids.person },
    sameAs: [site.social.youtube, site.social.instagram],
    areaServed: { "@type": "Country", name: site.region.countryName },
    knowsAbout: ["피트니스 경영 컨설팅", "헬스장 경영", "FC 교육", "피트니스 컨설턴트 양성", "헬스장 매출 관리"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: absoluteUrl("/contact"),
      availableLanguage: "ko",
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: `${site.name} ${site.nameEn}`,
    inLanguage: "ko",
    publisher: { "@id": ids.organization },
  };
}

export function localBusinessSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": ids.localBusiness,
    name: `${site.name} (${site.nameEn})`,
    alternateName: site.nameEn,
    url: site.url,
    image: absoluteUrl(site.ogImage),
    description: site.description,
    parentOrganization: { "@id": ids.organization },
    founder: { "@id": ids.person },
    address: {
      "@type": "PostalAddress",
      addressCountry: site.region.country,
      addressRegion: site.region.addressRegion,
      ...(site.region.streetAddress ? { streetAddress: site.region.streetAddress } : {}),
    },
    areaServed: { "@type": "Country", name: site.region.countryName },
    priceRange: "견적 안내",
    sameAs: [site.social.youtube, site.social.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${site.nameEn} 서비스`,
      itemListElement: (Object.keys(services) as ServiceKey[]).map((k) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", "@id": absoluteUrl(`${services[k].path}#service`), name: services[k].name },
      })),
    },
  };
}

export function personSchema(extra?: { alumniOf?: string[]; awards?: string[]; hasOccupation?: string[] }) {
  return {
    "@type": "Person",
    "@id": ids.person,
    name: site.founder.name,
    alternateName: site.founder.alias,
    jobTitle: site.founder.jobTitle,
    description: site.founder.description,
    image: absoluteUrl(site.founder.image),
    url: absoluteUrl("/about"),
    worksFor: { "@id": ids.organization },
    affiliation: { "@id": ids.organization },
    nationality: { "@type": "Country", name: site.region.countryName },
    knowsAbout: ["피트니스 경영", "헬스장 매출 구조", "FC(피트니스 컨설턴트) 교육", "피트니스센터 매니지먼트"],
    sameAs: [site.social.youtube, site.social.instagram],
    ...(extra?.alumniOf?.length ? { alumniOf: extra.alumniOf.map((n) => ({ "@type": "Organization", name: n })) } : {}),
    ...(extra?.awards?.length ? { award: extra.awards } : {}),
  };
}

export function serviceSchema(key: ServiceKey, opts: { serviceType: string; offers?: string[] }) {
  const s = services[key];
  return {
    "@type": "Service",
    "@id": absoluteUrl(`${s.path}#service`),
    name: s.name,
    serviceType: opts.serviceType,
    description: s.summary,
    url: absoluteUrl(s.path),
    provider: { "@id": ids.organization },
    areaServed: { "@type": "Country", name: site.region.countryName },
    audience: { "@type": "Audience", audienceType: s.audience },
    ...(opts.offers?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: s.name,
            itemListElement: opts.offers.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
          },
        }
      : {}),
  };
}

export function faqPageSchema(items: FaqItem[], pageUrl: string) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function articleSchema(post: InsightMeta) {
  const url = absoluteUrl(`/insights/${post.slug}`);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.summary.join(" "),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: absoluteUrl(post.image ?? site.ogImage),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "ko",
    author: { "@id": ids.person },
    publisher: { "@id": ids.organization },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    isPartOf: { "@id": ids.website },
    about: post.service.map((k) => ({ "@id": absoluteUrl(`${services[k].path}#service`) })),
  };
}

export function contactPageSchema() {
  return {
    "@type": "ContactPage",
    "@id": absoluteUrl("/contact#contactpage"),
    url: absoluteUrl("/contact"),
    name: "상담 신청",
    about: { "@id": ids.organization },
    inLanguage: "ko",
  };
}

/** 여러 스키마를 하나의 @graph 로 묶음 */
export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
