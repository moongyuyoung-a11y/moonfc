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

const s = services.consulting;
const crumbs = [
  { name: "홈", path: "/" },
  { name: s.shortName, path: s.path },
];

export const metadata = buildMetadata({
  title: "헬스장 경영 컨설팅 · 피트니스센터 매니지먼트",
  description: "헬스장 매출 구조 진단부터 전략 수립, 현장 실행까지. 문프스컨설팅그룹(MOONFC)의 피트니스센터 매니지먼트 컨설팅 과정과 비용 안내",
  path: s.path,
});

export default function ConsultingPage() {
  const faqs = faqsByCategory("consulting");
  const posts = getInsightsByService("consulting");

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema("consulting", {
            serviceType: "피트니스 경영 컨설팅",
            offers: ["센터 경영 진단", "매출 구조 개선 전략", "FC 상담 프로세스 구축", "재등록 관리 체계", "오픈 준비 컨설팅"],
          }),
          breadcrumbSchema(crumbs),
          faqPageSchema(faqs, absoluteUrl(s.path)),
        )}
      />
      <div className="container">
        <Breadcrumbs items={crumbs} />
      </div>
      <PageHero
        eyebrow="Fitness Center Management"
        title="헬스장·피트니스센터 경영 컨설팅"
        lead={`${site.name}(${site.nameEn})의 경영 컨설팅은 헬스장·피트니스센터의 매출 구조를 진단하고, 개선 전략을 세운 뒤, 현장에서 실행되는 것까지 확인하는 서비스입니다. 회원 등록·재등록 흐름과 직원 운영 방식을 데이터로 들여다보고 센터가 스스로 굴러가는 구조를 만듭니다.`}
      >
        <div className="hero-actions" style={{ marginTop: 20 }}>
          <Link href="/contact" className="btn btn-primary">
            무료 사전 상담 신청
          </Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="who-title">
        <div className="container">
          <h2 id="who-title">이런 센터에 맞습니다</h2>
          <div className="grid grid-2">
            <div className="card">
              <h3>방문은 있는데 등록이 안 되는 센터</h3>
              <p>광고비를 써서 방문객은 늘었는데 등록률이 낮다면 상담 과정에 문제가 있을 가능성이 큽니다. FC 상담 흐름을 진단하고 다시 설계합니다.</p>
            </div>
            <div className="card">
              <h3>신규는 되는데 재등록이 빠지는 센터</h3>
              <p>신규 매출에만 의존하면 광고비가 늘수록 이익이 줄어듭니다. 재등록 시점 관리와 회원 접점을 체계로 만듭니다.</p>
            </div>
            <div className="card">
              <h3>직원마다 성과 차이가 큰 센터</h3>
              <p>잘하는 직원 한 명에게 매출이 몰려 있으면 그 직원이 나갈 때 매출도 같이 빠집니다. 개인기가 아니라 시스템으로 성과가 나오게 만듭니다.</p>
            </div>
            <div className="card">
              <h3>오픈을 앞둔 센터</h3>
              <p>오픈 전 가격 구조, 직원 채용 기준, 사전 등록 운영을 미리 잡으면 오픈 후 시행착오 기간을 줄일 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="process-title">
        <div className="container">
          <h2 id="process-title">진행 흐름: 진단 → 전략 → 실행</h2>
          <ol className="steps horizontal">
            <li>
              <h3>진단</h3>
              <p>
                최근 6~12개월 매출 데이터, 회원 등록·재등록 기록, 상담 과정을 확인합니다. 필요하면 방문 상담을 직접 참관하거나 미스터리 방문으로 실제 응대를 봅니다. 결과는 지표 중심의 진단서로 정리합니다.
              </p>
            </li>
            <li>
              <h3>전략</h3>
              <p>
                진단에서 나온 문제 중 매출에 가장 크게 영향을 주는 순서로 우선순위를 정합니다. 가격·프로그램 구조, FC 상담 스크립트, 재등록 관리 주기, 직원 목표 관리 방식을 센터 상황에 맞게 설계합니다.
              </p>
            </li>
            <li>
              <h3>실행</h3>
              <p>
                설계한 내용을 직원 교육과 현장 적용으로 옮깁니다. 주 단위 또는 격주 단위로 지표 변화를 함께 확인하고, 움직이지 않는 지표는 원인을 다시 찾아 조정합니다.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="scope-title">
        <div className="container">
          <h2 id="scope-title">컨설팅에서 다루는 항목</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">영역</th>
                  <th scope="col">주요 내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>매출 구조</td>
                  <td>신규·재등록·PT 매출 비중, 객단가, 상품 구성, 가격 정책</td>
                </tr>
                <tr>
                  <td>상담 프로세스</td>
                  <td>방문 응대 흐름, 니즈 파악, 제안 방식, 마무리, 미등록 고객 후속 관리</td>
                </tr>
                <tr>
                  <td>회원 관리</td>
                  <td>재등록 시점 관리, 이탈 징후 대응, 회원 접점 설계</td>
                </tr>
                <tr>
                  <td>직원 운영</td>
                  <td>FC·트레이너 목표 관리, 인센티브 구조, 일일 미팅과 보고 체계</td>
                </tr>
                <tr>
                  <td>관리자 역량</td>
                  <td>점장·팀장의 데이터 관리, 직원 교육, 문제 해결 방식</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="case-title">
        <div className="container">
          <h2 id="case-title">사례로 보는 접근 방식</h2>
          <p className="lead">
            컨설팅 결과는 센터마다 다르기 때문에 특정 숫자를 약속하지 않습니다. 대신 어떤 식으로 문제를 찾고 무엇을 바꾸는지를 아래 사례 형식으로 보여드립니다. 실제 사례는 센터 동의를 받은 범위에서 인사이트 페이지에 공개합니다.
          </p>
          <div className="grid grid-2">
            <article className="card">
              <h3>상담 전환율이 낮았던 센터</h3>
              <p>
                <strong>문제:</strong> 방문 상담 대비 등록 비율이 낮았고, 상담 시간은 오히려 길었습니다.
                <br />
                <strong>원인:</strong> FC가 시설 설명에 시간을 쓰고 고객이 온 이유를 묻지 않았습니다.
                <br />
                <strong>조치:</strong> 상담 흐름을 니즈 파악 → 제안 → 마무리 순으로 재구성하고 2주간 실제 상담을 함께 점검했습니다.
              </p>
            </article>
            <article className="card">
              <h3>재등록률이 계속 떨어지던 센터</h3>
              <p>
                <strong>문제:</strong> 신규 등록은 꾸준했지만 만기 회원의 재등록이 줄고 있었습니다.
                <br />
                <strong>원인:</strong> 만기 안내가 만료 당일에만 이루어졌고, 담당자가 정해져 있지 않았습니다.
                <br />
                <strong>조치:</strong> 만기 30일 전부터 접점을 설계하고 담당 FC를 지정해 주간 단위로 재등록 현황을 관리하게 했습니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="price-title">
        <div className="container narrow">
          <h2 id="price-title">비용 안내 방식</h2>
          <p>
            컨설팅 비용은 정찰가로 정해져 있지 않습니다. 진단 범위(지점 수, 직원 수), 방문 횟수, 기간에 따라 달라지기 때문에 사전 상담 후 견적으로 안내드립니다.
          </p>
          <ul className="stat-list">
            <li>
              <span className="k">사전 상담</span>
              <span>무료. 센터 상황을 듣고 컨설팅이 필요한지, 어떤 범위가 맞는지 함께 판단합니다.</span>
            </li>
            <li>
              <span className="k">진단</span>
              <span>단독 진행 가능. 데이터 분석과 현장 확인 후 진단서를 전달합니다.</span>
            </li>
            <li>
              <span className="k">진단+전략+실행</span>
              <span>보통 1~3개월 단위. 방문 점검 횟수와 온라인 점검 방식에 따라 구성합니다.</span>
            </li>
            <li>
              <span className="k">다지점·프랜차이즈</span>
              <span>지점 수와 본사 지원 범위에 따라 별도 견적.</span>
            </li>
          </ul>
          <p>
            <Link href="/contact" className="btn btn-outline">
              견적 문의하기
            </Link>
          </p>
        </div>
      </section>

      <RelatedInsights posts={posts} title="컨설팅 관련 인사이트" />
      <FaqTeaser items={faqs} title="컨설팅 FAQ" />
      <CTA />
    </>
  );
}
