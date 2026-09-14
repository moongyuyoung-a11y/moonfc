import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site, services } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { graph, localBusinessSchema, personSchema } from "@/lib/schema";
import { getAllInsights } from "@/lib/insights";
import { InsightCard } from "@/components/InsightCard";
import { CTA } from "@/components/CTA";
import { faqs } from "@/lib/faq";
import { FaqList } from "@/components/FaqList";

export const metadata = buildMetadata({
  title: `${site.name} ${site.nameEn} | 피트니스 경영 컨설팅`,
  description: "헬스장·피트니스센터 매출 구조를 진단하고 개선하는 경영 컨설팅, FC 교육, 기업·대학 강의. 문프스컨설팅그룹(MOONFC)",
  path: "/",
});

export default function HomePage() {
  const posts = getAllInsights().slice(0, 3);
  const homeFaqs = faqs.filter((f) => ["consulting-what", "fc-what", "general-contact"].includes(f.id));

  return (
    <>
      <JsonLd data={graph(localBusinessSchema(), personSchema())} />

      <section className="hero">
        <div className="container">
          <p className="eyebrow">{site.tagline}</p>
          <h1>헬스장 대표와 FC를 위한 피트니스 경영 컨설팅, {site.nameEn}</h1>
          <p className="lead">{site.description}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              무료 사전 상담 신청
            </Link>
            <Link href="/consulting" className="btn btn-light">
              컨설팅 과정 보기
            </Link>
          </div>
          <p className="hero-note">대표 컨설턴트 {site.founder.name}({site.founder.alias}) · {site.region.countryName} 전 지역 진행</p>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <h2 id="services-title">핵심 서비스</h2>
          <p className="lead">센터 운영자에게는 경영 컨설팅을, FC와 관리자에게는 교육을, 기업과 대학에는 강의를 제공합니다.</p>
          <div className="grid grid-3">
            {Object.values(services).map((s) => (
              <article className="card" key={s.key}>
                <h3>
                  <Link href={s.path}>{s.name}</Link>
                </h3>
                <p>{s.summary}</p>
                <p>
                  <small>대상: {s.audience}</small>
                </p>
                <Link href={s.path} className="card-link">
                  자세히 보기 →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="why-title">
        <div className="container">
          <h2 id="why-title">MOONFC가 일하는 방식</h2>
          <div className="grid grid-3">
            <div className="card">
              <h3>숫자로 진단합니다</h3>
              <p>상담 전환율, 재등록률, 객단가처럼 센터 매출을 구성하는 지표를 먼저 확인합니다. 느낌이 아니라 데이터에서 문제를 찾습니다.</p>
            </div>
            <div className="card">
              <h3>현장에서 실행합니다</h3>
              <p>보고서를 전달하고 끝나지 않습니다. FC 상담 방식, 직원 미팅, 재등록 관리까지 바뀐 방식이 현장에 자리 잡을 때까지 함께 점검합니다.</p>
            </div>
            <div className="card">
              <h3>사람을 키웁니다</h3>
              <p>컨설팅이 끝나도 센터가 스스로 굴러가려면 FC와 관리자가 성장해야 합니다. 교육 과정과 세미나로 그 기반을 만듭니다.</p>
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section" aria-labelledby="latest-title">
          <div className="container">
            <h2 id="latest-title">최근 인사이트</h2>
            <div className="grid grid-3">
              {posts.map((p) => (
                <InsightCard key={p.slug} post={p} />
              ))}
            </div>
            <p className="more-link">
              <Link href="/insights">인사이트 전체 보기 →</Link>
            </p>
          </div>
        </section>
      )}

      <section className="section alt" aria-labelledby="home-faq-title">
        <div className="container">
          <h2 id="home-faq-title">자주 묻는 질문</h2>
          <FaqList items={homeFaqs} />
          <p className="more-link">
            <Link href="/faq">서비스별 FAQ 전체 보기 →</Link>
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
