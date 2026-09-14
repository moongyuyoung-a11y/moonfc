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
import { stats, testimonials, partners } from "@/lib/trust";

export const metadata = buildMetadata({
  title: "피트니스 컨설팅 · 헬스장 경영 컨설팅 MOONFC",
  description: "헬스장·피트니스센터 매출 구조를 진단하고 개선하는 피트니스 경영 컨설팅, FC 교육, 기업·대학 강의. 문프스컨설팅그룹(MOONFC)",
  path: "/",
});

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19h16M7 16v-5M12 16V7M17 16v-8" />
  </svg>
);
const IconField = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6" />
  </svg>
);
const IconPeople = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
  </svg>
);
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M10 9l5 3-5 3z" />
  </svg>
);
const IconCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);
const IconDoc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6M10 17h6" />
  </svg>
);

export default function HomePage() {
  const posts = getAllInsights().slice(0, 3);
  const homeFaqs = faqs.filter((f) => ["consulting-what", "consulting-period", "fc-what"].includes(f.id));

  return (
    <>
      <JsonLd data={graph(localBusinessSchema(), personSchema())} />

      {/* 1. 히어로: 누구를 위한 무엇인지 한 문장 */}
      <section className="hero">
        <div className="container">
          <p className="eyebrow">{site.tagline}</p>
          <h1>
            헬스장 대표와 FC를 위한
            <br />
            피트니스 경영 컨설팅, {site.nameEn}
          </h1>
          <p className="lead">{site.description}</p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">
              무료 사전 상담 신청
            </Link>
            <Link href="/consulting" className="btn btn-outline">
              컨설팅 진행 방식 보기
            </Link>
          </div>
          <p className="hero-note">
            대표 컨설턴트 {site.founder.name}({site.founder.alias}) · {site.region.countryName} 전 지역 진행 · 사전 상담 무료
          </p>
          <ul className="hero-points" aria-label="MOONFC의 세 가지 원칙">
            <li>
              <span className="check" aria-hidden="true">✓</span>
              <span>
                <strong>숫자로 진단합니다</strong>
                상담 전환율, 재등록률, 객단가부터 봅니다. 느낌이 아니라 데이터에서 문제를 찾습니다.
              </span>
            </li>
            <li>
              <span className="check" aria-hidden="true">✓</span>
              <span>
                <strong>현장에서 실행합니다</strong>
                보고서로 끝내지 않습니다. 바뀐 방식이 상담 데스크에 자리 잡을 때까지 함께 점검합니다.
              </span>
            </li>
            <li>
              <span className="check" aria-hidden="true">✓</span>
              <span>
                <strong>사람을 남깁니다</strong>
                FC와 관리자가 스스로 굴릴 수 있는 체계와 교육을 남기는 것이 목표입니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. 핵심 숫자 (src/lib/trust.ts 에 값이 있을 때만) */}
      {stats.length > 0 && (
        <section className="section alt" aria-labelledby="stats-title" style={{ paddingBlock: 48 }}>
          <div className="container">
            <h2 id="stats-title" className="sr-only">
              숫자로 보는 MOONFC
            </h2>
            <ul className="stats">
              {stats.map((s) => (
                <li key={s.label}>
                  <span className="num">{s.value}</span>
                  <span className="label">{s.label}</span>
                  {s.note && <span className="note">{s.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 3. 핵심 서비스 3개 */}
      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Services</p>
            <h2 id="services-title">센터의 단계에 맞는 세 가지 서비스</h2>
            <p>센터 운영자에게는 경영 컨설팅을, FC와 관리자에게는 교육을, 기업과 대학에는 강의를 제공합니다.</p>
          </div>
          <div className="grid grid-3">
            {Object.values(services).map((s, i) => (
              <article className="card hover" key={s.key}>
                <span className="card-index">0{i + 1}</span>
                <h3>
                  <Link href={s.path}>{s.name}</Link>
                </h3>
                <p>{s.summary}</p>
                <p className="card-meta">대상: {s.audience}</p>
                <Link href={s.path} className="card-link arrow">
                  {s.shortName} 자세히 보기{" "}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 왜 MOONFC 인가 */}
      <section className="section alt" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Why {site.nameEn}</p>
            <h2 id="why-title">현장에서 시작한 컨설팅이라 다릅니다</h2>
            <p>헬스장 상담 데스크에서 FC와 관리자로 일한 경험이 출발점입니다. 그래서 회의실 전략이 아니라 내일 아침 상담부터 바꿀 수 있는 방법을 이야기합니다.</p>
          </div>
          <div className="grid grid-3">
            <div className="card">
              <div className="icon">
                <IconChart />
              </div>
              <h3>매출 구조를 숫자로 나눕니다</h3>
              <p>방문 수 × 상담 전환율 × 객단가 + 재등록. 어느 숫자가 새는지 먼저 찾고, 광고비를 늘리기 전에 손댈 순서를 정합니다.</p>
            </div>
            <div className="card">
              <div className="icon">
                <IconField />
              </div>
              <h3>상담 데스크에서 검증합니다</h3>
              <p>설계한 상담 흐름과 재등록 관리 방식을 실제 상담에 적용하고, 주 단위로 지표가 움직이는지 함께 확인합니다. 움직이지 않으면 원인을 다시 찾습니다.</p>
            </div>
            <div className="card">
              <div className="icon">
                <IconPeople />
              </div>
              <h3>FC와 관리자를 키웁니다</h3>
              <p>컨설팅이 끝나도 센터가 스스로 굴러가려면 사람이 남아야 합니다. FC 양성 과정, 세미나, 관리자 과정으로 그 기반을 만듭니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 진행 과정 */}
      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Process</p>
            <h2 id="process-title">진단 → 전략 → 실행, 세 단계로 진행합니다</h2>
            <p>어느 서비스든 순서는 같습니다. 먼저 현재 상태를 정확히 보고, 우선순위를 정한 뒤, 현장에서 바꿉니다.</p>
          </div>
          <ol className="steps horizontal">
            <li>
              <h3>진단</h3>
              <p>매출 데이터, 등록·재등록 기록, 상담 과정을 확인합니다. 필요하면 상담을 직접 참관합니다.</p>
            </li>
            <li>
              <h3>전략</h3>
              <p>매출에 가장 크게 영향을 주는 문제부터 우선순위를 정하고 센터 상황에 맞는 방식을 설계합니다.</p>
            </li>
            <li>
              <h3>실행</h3>
              <p>직원 교육과 현장 적용으로 옮기고, 지표 변화를 함께 확인하며 조정합니다.</p>
            </li>
          </ol>
          <p className="more-link">
            <Link href="/consulting" className="arrow">
              컨설팅 항목과 비용 안내 방식{" "}
            </Link>
          </p>
        </div>
      </section>

      {/* 6. 대표 소개 */}
      <section className="section alt" aria-labelledby="founder-title">
        <div className="container founder-preview">
          <div className="founder-photo">
            <img
              src={site.founder.image}
              alt={`${site.name} 대표 ${site.founder.name} 프로필 사진`}
              width={720}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className="eyebrow">Consultant</p>
            <h2 id="founder-title">
              대표 {site.founder.name} <small style={{ fontWeight: 500, color: "var(--muted)", fontSize: "0.6em" }}>{site.founder.alias}</small>
            </h2>
            <p className="founder-quote">센터 대표의 느낌보다 매출 데이터와 상담 기록에서 문제를 찾습니다. 회의실에서 만든 전략은 상담 데스크에서 검증되어야 합니다.</p>
            <p className="founder-meta">
              {site.name}({site.nameEn}) {site.founder.jobTitle} · 피트니스경영연구소
            </p>
            <p>{site.founder.description}</p>
            <p>
              <Link href="/about" className="btn btn-outline">
                경력과 강의 이력 보기
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 7. 후기 / 협력 기관 (데이터가 있을 때만) */}
      {(testimonials.length > 0 || partners.length > 0) && (
        <section className="section" aria-labelledby="proof-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Voices</p>
              <h2 id="proof-title">함께한 센터와 기관</h2>
            </div>
            {testimonials.length > 0 && (
              <div className="grid grid-3">
                {testimonials.map((t) => (
                  <article className="testimonial" key={t.quote}>
                    <blockquote>{t.quote}</blockquote>
                    <footer>
                      {t.who}
                      {t.where && ` · ${t.where}`}
                    </footer>
                  </article>
                ))}
              </div>
            )}
            {partners.length > 0 && (
              <p style={{ marginTop: 28, color: "var(--muted)" }}>
                <strong style={{ color: "var(--navy)" }}>출강·협력 기관:</strong> {partners.join(" · ")}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 8. 콘텐츠 채널 + 최근 인사이트 */}
      <section className="section" aria-labelledby="content-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Contents</p>
            <h2 id="content-title">현장에서 확인한 것을 기록합니다</h2>
            <p>헬스장 매출, FC 상담, 재등록, 직원 운영에 대해 컨설팅과 교육 현장에서 확인한 내용을 글과 영상으로 남깁니다.</p>
          </div>
          <div className="grid grid-3" style={{ marginBottom: 28 }}>
            <a className="channel-card" href={site.social.youtube} target="_blank" rel="noopener noreferrer">
              <span className="icon">
                <IconPlay />
              </span>
              <span>
                <h3>유튜브 FC문프스</h3>
                <p>FC 상담과 헬스장 운영 이야기를 영상으로</p>
              </span>
            </a>
            <a className="channel-card" href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              <span className="icon">
                <IconCamera />
              </span>
              <span>
                <h3>인스타그램 @moonfc_guide</h3>
                <p>세미나·교육 일정 공지와 짧은 현장 노트</p>
              </span>
            </a>
            <Link className="channel-card" href="/insights">
              <span className="icon">
                <IconDoc />
              </span>
              <span>
                <h3>인사이트</h3>
                <p>피트니스 경영에 대해 길게 정리한 글</p>
              </span>
            </Link>
          </div>
          {posts.length > 0 && (
            <div className="grid grid-3">
              {posts.map((p) => (
                <InsightCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="section alt" aria-labelledby="home-faq-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 id="home-faq-title">자주 묻는 질문</h2>
          </div>
          <FaqList items={homeFaqs} />
          <p className="more-link">
            <Link href="/faq" className="arrow">
              서비스별 FAQ 전체 보기{" "}
            </Link>
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
