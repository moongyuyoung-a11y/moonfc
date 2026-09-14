import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { graph, contactPageSchema, breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { faqs } from "@/lib/faq";

const crumbs = [
  { name: "홈", path: "/" },
  { name: "상담 신청", path: "/contact" },
];

export const metadata = buildMetadata({
  title: "상담 신청",
  description: "피트니스센터 경영 컨설팅, FC 교육, 강의 출강 문의. 사전 상담은 무료이며 폼 또는 카카오톡 채널로 신청할 수 있습니다.",
  path: "/contact",
});

export default function ContactPage() {
  const contactFaqs = faqs.filter((f) => ["general-contact", "general-online", "consulting-period"].includes(f.id));
  return (
    <>
      <JsonLd data={graph(contactPageSchema(), breadcrumbSchema(crumbs))} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
      </div>
      <PageHero
        eyebrow="Contact"
        title="상담 신청"
        lead={`${site.name}(${site.nameEn})의 사전 상담은 무료입니다. 컨설팅, FC 교육, 강의 출강 어떤 문의든 아래 폼에 남겨 주시면 대표 ${site.founder.name}이 직접 확인하고 영업일 기준 1~2일 안에 연락드립니다.`}
      />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2>문의 내용 남기기</h2>
            <ContactForm endpoint={site.contact.formEndpoint} kakaoUrl={site.contact.kakaoChannelUrl} />
          </div>
          <aside className="contact-aside">
            <div className="card">
              <h3>이렇게 적어 주시면 빠릅니다</h3>
              <ul>
                <li>
                  <strong>컨설팅:</strong> 센터 규모(회원 수·직원 수), 지점 수, 현재 가장 큰 고민
                </li>
                <li>
                  <strong>FC 교육:</strong> 개인 참가인지 센터 단체인지, 교육 대상 인원과 경력
                </li>
                <li>
                  <strong>강의 출강:</strong> 기관명, 대상, 희망 일정, 주제
                </li>
              </ul>
            </div>
            <div className="card">
              <h3>다른 채널</h3>
              <ul>
                {site.contact.kakaoChannelUrl && (
                  <li>
                    <a href={site.contact.kakaoChannelUrl} target="_blank" rel="noopener noreferrer">
                      카카오톡 채널
                    </a>
                  </li>
                )}
                <li>
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                    인스타그램 DM @moonfc_guide
                  </a>
                </li>
                <li>
                  <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">
                    유튜브 FC문프스
                  </a>
                </li>
              </ul>
            </div>
            <div className="card">
              <h3>먼저 읽어보면 좋은 페이지</h3>
              <ul>
                <li>
                  <Link href="/consulting">컨설팅 진행 흐름과 비용 안내 방식</Link>
                </li>
                <li>
                  <Link href="/fc-education">FC 교육 프로그램</Link>
                </li>
                <li>
                  <Link href="/faq">서비스별 FAQ</Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section alt" aria-labelledby="contact-faq-title">
        <div className="container">
          <h2 id="contact-faq-title">상담 전 자주 묻는 질문</h2>
          <FaqList items={contactFaqs} />
        </div>
      </section>
    </>
  );
}
