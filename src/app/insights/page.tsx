import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site, services } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InsightCard } from "@/components/InsightCard";
import { getAllInsights } from "@/lib/insights";
import { CTA } from "@/components/CTA";
import { absoluteUrl } from "@/lib/site";

const crumbs = [
  { name: "홈", path: "/" },
  { name: "인사이트", path: "/insights" },
];

export const metadata = buildMetadata({
  title: "피트니스경영 인사이트 · 헬스장 운영 노하우",
  description: "헬스장 매출 관리, FC 상담, 재등록, 직원 운영에 대해 현장 경험을 바탕으로 쓴 글. 문프스컨설팅그룹(MOONFC) 피트니스경영연구소",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = getAllInsights();
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(crumbs), {
          "@type": "Blog",
          "@id": absoluteUrl("/insights#blog"),
          name: `${site.nameEn} 인사이트`,
          url: absoluteUrl("/insights"),
          inLanguage: "ko",
          publisher: { "@id": absoluteUrl("/#organization") },
          blogPost: posts.slice(0, 20).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(`/insights/${p.slug}`),
            datePublished: p.date,
          })),
        })}
      />
      <div className="container">
        <Breadcrumbs items={crumbs} />
      </div>
      <PageHero
        eyebrow="Insights"
        title="피트니스 경영 인사이트"
        lead={`${site.nameEn} 인사이트는 헬스장·피트니스센터 매출 관리, FC 상담, 재등록, 직원 운영에 대해 컨설팅 현장에서 확인한 내용을 정리하는 곳입니다. 세미나·교육 일정도 이곳에 공지합니다.`}
      />

      <section className="section">
        <div className="container">
          {categories.length > 1 && (
            <ul className="faq-toc" aria-label="카테고리">
              {categories.map((c) => (
                <li key={c}>
                  <a href={`#cat-${encodeURIComponent(c)}`}>{c}</a>
                </li>
              ))}
            </ul>
          )}
          {posts.length === 0 ? (
            <p>아직 발행된 글이 없습니다.</p>
          ) : (
            categories.map((c) => (
              <div key={c} className="faq-group" id={`cat-${encodeURIComponent(c)}`}>
                <h2>{c}</h2>
                <div className="grid grid-3">
                  {posts
                    .filter((p) => p.category === c)
                    .map((p) => (
                      <InsightCard key={p.slug} post={p} />
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="section alt" aria-labelledby="services-link-title">
        <div className="container">
          <h2 id="services-link-title">글에서 다루는 서비스</h2>
          <div className="grid grid-3">
            {Object.values(services).map((s) => (
              <div className="card" key={s.key}>
                <h3>
                  <Link href={s.path}>{s.name}</Link>
                </h3>
                <p>{s.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
