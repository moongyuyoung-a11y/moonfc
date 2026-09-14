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

const s = services["fc-education"];
const crumbs = [
  { name: "홈", path: "/" },
  { name: s.shortName, path: s.path },
];

export const metadata = buildMetadata({
  title: "FC 교육 · 피트니스 컨설턴트 양성 과정",
  description: "FC(피트니스 컨설턴트) 양성 과정, FC DEEP SIGHT·PRO FC 세미나, 관리자 집중 양성 과정. MOONFC FC 교육 안내",
  path: s.path,
});

export default function FcEducationPage() {
  const faqs = faqsByCategory("fc-education");
  const posts = getInsightsByService("fc-education");

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema("fc-education", {
            serviceType: "피트니스 컨설턴트(FC) 교육",
            offers: ["FC 양성 과정", "FC DEEP SIGHT 세미나", "PRO FC 세미나", "관리자 집중 양성 과정"],
          }),
          breadcrumbSchema(crumbs),
          faqPageSchema(faqs, absoluteUrl(s.path)),
        )}
      />
      <div className="container">
        <Breadcrumbs items={crumbs} />
      </div>
      <PageHero
        eyebrow="FC Education"
        title="FC(피트니스 컨설턴트) 교육"
        lead={`${site.name}(${site.nameEn})의 FC 교육은 헬스장·피트니스센터에서 회원 상담과 등록을 담당하는 FC(Fitness Consultant)를 현장에서 바로 일할 수 있게 양성하는 과정입니다. 기본 양성 과정, 세미나(FC DEEP SIGHT, PRO FC), 관리자 집중 양성 과정으로 나뉘며 모두 실습 중심으로 진행합니다.`}
      >
        <div className="hero-actions" style={{ marginTop: 20 }}>
          <Link href="/contact" className="btn btn-primary">
            교육 문의하기
          </Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="fc-def-title">
        <div className="container narrow">
          <h2 id="fc-def-title">FC는 어떤 일을 하는 사람인가</h2>
          <p>
            FC는 센터에 방문한 고객을 상담하고 회원 등록과 재등록을 이끄는 직무입니다. 안내 데스크와 다른 점은 <strong>매출의 시작점</strong>을 책임진다는 것입니다. 같은 방문객 수라도 FC의 상담 능력에 따라 등록률과 객단가가 달라지기 때문에, 센터 매출에서 FC의 비중은 트레이너 못지않게 큽니다.
          </p>
          <p>
            그런데 FC를 체계적으로 가르치는 곳은 드뭅니다. 대부분 선배 어깨너머로 배우거나 혼자 부딪히며 익힙니다. MOONFC의 FC 교육은 그 공백을 메우기 위해 만들었습니다.
          </p>
        </div>
      </section>

      <section className="section alt" aria-labelledby="programs-title">
        <div className="container">
          <h2 id="programs-title">교육 프로그램</h2>
          <div className="grid grid-2">
            <article className="card" id="fc-course">
              <h3>FC 양성 과정</h3>
              <p>
                <strong>대상:</strong> FC 지망자, 입사 1년 이내 신입 FC
              </p>
              <p>
                방문 상담의 흐름, 고객 니즈 파악, 가격·프로그램 제안, 미등록 고객 후속 관리, 재등록 관리, 일일 업무 관리를 단계별로 다룹니다. 실제 상담 상황을 재현하는 실습 비중이 높고, 수료 후에도 현장에서 막히는 상황을 질문할 수 있습니다.
              </p>
            </article>
            <article className="card" id="fc-deep-sight">
              <h3>세미나: FC DEEP SIGHT</h3>
              <p>
                <strong>대상:</strong> FC 입문자, 기본기를 다시 잡고 싶은 현직 FC
              </p>
              <p>
                FC 직무의 본질과 상담 구조를 깊이 이해하는 세미나입니다. 왜 고객이 등록하고 왜 등록하지 않는지, 상담에서 어떤 순서로 무엇을 확인해야 하는지를 다룹니다. 이론과 사례를 함께 봅니다.
              </p>
            </article>
            <article className="card" id="pro-fc">
              <h3>세미나: PRO FC</h3>
              <p>
                <strong>대상:</strong> 현직 FC, 팀 내 성과 상위권으로 가려는 FC
              </p>
              <p>
                현직 FC가 성과를 한 단계 올리기 위한 실전 세미나입니다. 고단가 제안, 반론 대응, 재등록 전환, 개인 목표 관리와 데이터 기록 방법을 다룹니다. 참가자의 실제 상담 사례를 가지고 함께 분석합니다.
              </p>
            </article>
            <article className="card" id="manager-course">
              <h3>관리자 집중 양성 과정</h3>
              <p>
                <strong>대상:</strong> 점장, 팀장, 매니저, 센터 대표
              </p>
              <p>
                FC 팀을 이끄는 사람이 해야 하는 일을 다룹니다. 팀 목표 설정과 관리, 직원 교육 방법, 매출 데이터 읽는 법, 일일·주간 미팅 운영, 성과가 낮은 직원 코칭. 개인 상담 기술이 아니라 팀을 움직이는 방법이 주제입니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="method-title">
        <div className="container">
          <h2 id="method-title">교육 방식</h2>
          <ol className="steps horizontal">
            <li>
              <h3>상황 재현</h3>
              <p>강의만 듣고 끝나지 않습니다. 실제 방문 상담 상황을 재현하고 참가자가 직접 상담을 진행한 뒤 피드백을 받습니다.</p>
            </li>
            <li>
              <h3>사례 분석</h3>
              <p>등록에 성공한 상담과 실패한 상담을 나란히 놓고 어디서 갈렸는지 봅니다. 참가자가 가져온 실제 사례를 우선으로 다룹니다.</p>
            </li>
            <li>
              <h3>현장 적용 점검</h3>
              <p>교육 후 일정 기간 동안 현장에서 적용하며 생기는 질문을 받고 답합니다. 배운 것이 실제 성과로 이어지는지가 기준입니다.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section alt" aria-labelledby="schedule-title">
        <div className="container narrow">
          <h2 id="schedule-title">일정과 신청</h2>
          <p>
            세미나 일정은 <Link href="/insights">인사이트</Link> 페이지와{" "}
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              인스타그램
            </a>
            에 공지합니다. FC 양성 과정과 관리자 과정은 기수제 또는 센터 단위 출강으로 진행하며, 센터 직원 대상 단체 교육도 가능합니다. 교육비는 과정과 인원에 따라 다르므로 상담 신청 시 안내드립니다.
          </p>
          <p>
            <Link href="/contact" className="btn btn-outline">
              교육 일정·비용 문의
            </Link>
          </p>
        </div>
      </section>

      <RelatedInsights posts={posts} title="FC 관련 인사이트" />
      <FaqTeaser items={faqs} title="FC 교육 FAQ" />
      <CTA title="FC 교육이 우리 센터에 맞는지 먼저 확인해 보세요" body="개인 참가와 센터 단체 교육 모두 가능합니다. 현재 FC 인원과 고민을 적어 주시면 맞는 과정을 안내드립니다." />
    </>
  );
}
