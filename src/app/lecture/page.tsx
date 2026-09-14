import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { services, site, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { graph, serviceSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { FaqTeaser } from "@/components/FaqList";
import { RelatedInsights } from "@/components/InsightCard";
import { faqsByCategory } from "@/lib/faq";
import { getInsightsByService } from "@/lib/insights";

const s = services.lecture;
const crumbs = [
  { name: "홈", path: "/" },
  { name: s.shortName, path: s.path },
];

export const metadata = buildMetadata({
  title: "피트니스 경영 강의 · 기업·대학 출강",
  description: "피트니스 기업·프랜차이즈 직원 교육과 대학 체육·스포츠 학과 강의. 피트니스 경영과 FC 실무 주제로 출강하는 MOONFC",
  path: s.path,
});

export default function LecturePage() {
  const faqs = faqsByCategory("lecture");
  const posts = getInsightsByService("lecture");

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema("lecture", {
            serviceType: "피트니스 경영 강의·출강",
            offers: ["기업·프랜차이즈 직원 교육", "대학 특강·정규 강의", "피트니스 산업 세미나 강연"],
          }),
          breadcrumbSchema(crumbs),
          faqPageSchema(faqs, absoluteUrl(s.path)),
        )}
      />
      <div className="container">
        <Breadcrumbs items={crumbs} />
      </div>
      <PageHero
        eyebrow="Lecture"
        title="기업·대학 강의 출강"
        lead={`${site.name}(${site.nameEn})은 피트니스 기업·프랜차이즈와 대학 체육·스포츠 관련 학과를 대상으로 피트니스 경영과 FC 실무 강의를 출강합니다. 대표 ${site.founder.name}이 직접 강의하며, 요청 기관의 목적에 맞춰 주제와 구성을 새로 만듭니다.`}
      >
        <div className="hero-actions" style={{ marginTop: 20 }}>
          <Link href="/contact" className="btn btn-primary">
            출강 문의하기
          </Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="lecture-types-title">
        <div className="container">
          <h2 id="lecture-types-title">강의 유형</h2>
          <div className="grid grid-2">
            <article className="card">
              <h3>기업·프랜차이즈 직원 교육</h3>
              <p>
                피트니스 브랜드 본사와 가맹점 직원을 대상으로 합니다. FC 상담 실무, 지점 매출 관리, 재등록 관리, 관리자 역할처럼 현장에서 바로 쓰는 주제를 다룹니다. 1회 특강부터 여러 회차 과정까지 구성할 수 있습니다.
              </p>
            </article>
            <article className="card">
              <h3>대학 강의·특강</h3>
              <p>
                체육·스포츠·헬스케어 관련 학과 학생을 대상으로 합니다. 피트니스 산업의 구조, 센터에서 실제로 하는 일, FC와 트레이너의 진로, 취업 후 첫 1년에 알아야 할 것들을 현장 경험을 바탕으로 이야기합니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="topics-title">
        <div className="container">
          <h2 id="topics-title">주요 강의 주제</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">주제</th>
                  <th scope="col">주요 대상</th>
                  <th scope="col">내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>피트니스센터 매출 구조의 이해</td>
                  <td>기업, 대학</td>
                  <td>신규·재등록·PT 매출이 어떻게 만들어지고 어디서 새는지</td>
                </tr>
                <tr>
                  <td>FC 상담 실무</td>
                  <td>기업</td>
                  <td>방문 상담 흐름, 니즈 파악, 제안과 마무리, 후속 관리</td>
                </tr>
                <tr>
                  <td>지점 관리자의 역할</td>
                  <td>기업</td>
                  <td>목표 관리, 데이터 읽기, 직원 교육과 코칭</td>
                </tr>
                <tr>
                  <td>피트니스 산업과 진로</td>
                  <td>대학</td>
                  <td>산업 구조, 직무별 실제 업무, 취업 준비와 첫 1년</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>위 주제 외에도 기관의 요청에 맞춰 새로 구성합니다.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="history-title">
        <div className="container narrow">
          <h2 id="history-title">강의 이력</h2>
          <p>
            대표 문규영의 강의·출강 이력은 <Link href="/about#lectures">대표 소개 페이지</Link>에 기관명과 연도 기준으로 정리되어 있습니다.
          </p>
        </div>
      </section>

      <section className="section alt" aria-labelledby="request-title">
        <div className="container narrow">
          <h2 id="request-title">출강 요청 방법</h2>
          <ol>
            <li>상담 신청 페이지에 기관명, 대상(직군·학년·인원), 희망 일정, 원하는 주제를 적어 보내주세요.</li>
            <li>목적에 맞는 주제와 시간 구성을 제안하고 강의료를 안내드립니다. 강의료는 시간, 인원, 지역에 따라 다르며 기관 규정에 맞춰 조정 가능합니다.</li>
            <li>일정 확정 후 기관 상황에 맞게 강의 자료를 새로 구성해 진행합니다.</li>
          </ol>
          <p>
            <Link href="/contact" className="btn btn-outline">
              출강 요청하기
            </Link>
          </p>
        </div>
      </section>

      <RelatedInsights posts={posts} title="강의 관련 인사이트" />
      <FaqTeaser items={faqs} title="강의·출강 FAQ" />
      <CTA title="기관에 맞는 강의 구성을 제안해 드립니다" body="대상과 목적, 희망 일정을 알려 주시면 주제 구성과 강의료를 안내드립니다." />
    </>
  );
}
