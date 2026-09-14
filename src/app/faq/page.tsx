import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { graph, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { faqs, faqCategories, faqsByCategory } from "@/lib/faq";
import { CTA } from "@/components/CTA";
import { getAllInsights } from "@/lib/insights";

const crumbs = [
  { name: "홈", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export const metadata = buildMetadata({
  title: "자주 묻는 질문 FAQ",
  description: "피트니스 경영 컨설팅, FC 교육, 강의 출강에 대해 자주 묻는 질문과 답변. 문프스컨설팅그룹(MOONFC)",
  path: "/faq",
});

export default function FaqPage() {
  const posts = getAllInsights();
  return (
    <>
      <JsonLd data={graph(faqPageSchema(faqs, absoluteUrl("/faq")), breadcrumbSchema(crumbs))} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
      </div>
      <PageHero
        eyebrow="FAQ"
        title="자주 묻는 질문"
        lead={`${site.name}(${site.nameEn})의 컨설팅, FC 교육, 강의 출강에 대해 상담에서 자주 받는 질문을 서비스별로 정리했습니다. 여기에 없는 질문은 상담 신청 페이지로 보내 주세요.`}
      >
        <ul className="faq-toc" aria-label="서비스별 바로가기" style={{ marginTop: 20 }}>
          {faqCategories.map((c) => (
            <li key={c.key}>
              <a href={`#faq-${c.key}`}>{c.label}</a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section">
        <div className="container">
          {faqCategories.map((c) => {
            const items = faqsByCategory(c.key);
            const key = c.key;
            const related = key === "general" ? [] : posts.filter((p) => p.service.includes(key)).slice(0, 3);
            return (
              <div className="faq-group" key={c.key} id={`faq-${c.key}`}>
                <div className="faq-group-head">
                  <h2>{c.label}</h2>
                  {c.path && <Link href={c.path}>서비스 페이지 보기 →</Link>}
                </div>
                <FaqList items={items} />
                {related.length > 0 && (
                  <p style={{ marginTop: 14 }}>
                    관련 글:{" "}
                    {related.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 && " · "}
                        <Link href={`/insights/${p.slug}`}>{p.title}</Link>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <CTA title="여기에 없는 질문이 있다면" body="센터 상황을 적어 보내 주시면 맞춰서 답변드립니다. 사전 상담은 무료입니다." />
    </>
  );
}
