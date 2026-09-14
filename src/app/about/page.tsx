import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { graph, personSchema, breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTA } from "@/components/CTA";
import { career, lectures, media, credentials } from "@/lib/profile";

const crumbs = [
  { name: "홈", path: "/" },
  { name: "대표 소개", path: "/about" },
];

export const metadata = buildMetadata({
  title: "대표 문규영 소개",
  description: "문프스컨설팅그룹(MOONFC) 대표 문규영(컨설턴트 문프스)의 경력, 강의 이력, 활동. 헬스장 현장 경험을 바탕으로 한 피트니스 경영 컨설턴트",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          personSchema({ alumniOf: credentials.education, awards: credentials.awards }),
          breadcrumbSchema(crumbs),
          {
            "@type": "ProfilePage",
            "@id": absoluteUrl("/about#profilepage"),
            url: absoluteUrl("/about"),
            mainEntity: { "@id": absoluteUrl("/about#person") },
            inLanguage: "ko",
          },
        )}
      />
      <div className="container">
        <Breadcrumbs items={crumbs} />
      </div>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-photo">
              <img
                src={site.founder.image}
                alt={`${site.name} 대표 ${site.founder.name} 프로필 사진`}
                width={720}
                height={900}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div>
              <p className="eyebrow">About</p>
              <h1>
                대표 {site.founder.name} <small style={{ fontWeight: 500, fontSize: "0.6em", color: "var(--muted)" }}>({site.founder.alias})</small>
              </h1>
              <p className="lead">{site.founder.description}</p>
              <p>
                헬스장 현장에서 FC와 관리자로 일하며 매출이 어떻게 만들어지고 어디서 새는지를 직접 겪었습니다. 그 경험을 바탕으로 지금은 센터 대표에게는 경영 컨설팅을, FC와 관리자에게는 교육을, 기업과 대학에는 강의를 하고 있습니다. 유튜브 채널 <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">FC문프스</a>와 인스타그램 <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">@moonfc_guide</a>에서 현장 이야기를 나눕니다.
              </p>
              <ul className="stat-list">
                <li>
                  <span className="k">소속</span>
                  <span>
                    {site.name} ({site.nameEn}) 대표 · 피트니스경영연구소
                  </span>
                </li>
                <li>
                  <span className="k">전문 분야</span>
                  <span>피트니스센터 경영 진단·개선, FC 상담 프로세스, FC·관리자 교육</span>
                </li>
                <li>
                  <span className="k">활동 지역</span>
                  <span>
                    {site.region.countryName} 전 지역 (주 활동지 {site.region.addressRegion})
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="career-title">
        <div className="container narrow">
          <h2 id="career-title">경력</h2>
          <ul className="timeline">
            {career.map((c, i) => (
              <li key={i}>
                <span className="when">{c.when}</span>
                <span>
                  <strong>{c.title}</strong>
                  {c.detail && <> — {c.detail}</>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="lectures-title" id="lectures">
        <div className="container narrow">
          <h2 id="lectures-title">강의·출강 이력</h2>
          <ul className="timeline">
            {lectures.map((l, i) => (
              <li key={i}>
                <span className="when">{l.when}</span>
                <span>
                  <strong>{l.org}</strong> — {l.topic}
                </span>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/lecture">강의·출강 안내 보기 →</Link>
          </p>
        </div>
      </section>

      {(credentials.education.length > 0 || credentials.certificates.length > 0 || credentials.awards.length > 0) && (
        <section className="section alt" aria-labelledby="cred-title">
          <div className="container narrow">
            <h2 id="cred-title">학력·자격·수상</h2>
            <ul>
              {credentials.education.map((e) => (
                <li key={e}>{e}</li>
              ))}
              {credentials.certificates.map((e) => (
                <li key={e}>{e}</li>
              ))}
              {credentials.awards.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {media.length > 0 && (
        <section className="section" aria-labelledby="media-title">
          <div className="container narrow">
            <h2 id="media-title">콘텐츠·미디어</h2>
            <ul>
              {media.map((m) => (
                <li key={m.url}>
                  <a href={m.url} target="_blank" rel="noopener noreferrer">
                    {m.title}
                  </a>{" "}
                  — {m.desc}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section alt" aria-labelledby="principle-title">
        <div className="container narrow">
          <h2 id="principle-title">일하는 원칙</h2>
          <ol>
            <li>
              <strong>숫자를 먼저 본다.</strong> 센터 대표의 느낌보다 매출 데이터와 상담 기록에서 문제를 찾습니다.
            </li>
            <li>
              <strong>현장에서 확인한다.</strong> 회의실에서 만든 전략은 상담 데스크에서 검증되어야 합니다.
            </li>
            <li>
              <strong>사람이 남게 한다.</strong> 컨설팅이 끝난 뒤에도 센터 직원이 스스로 굴릴 수 있는 방식만 남깁니다.
            </li>
          </ol>
        </div>
      </section>

      <CTA title="대표에게 직접 상담받기" body="컨설팅, 교육, 강의 문의 모두 대표 문규영이 직접 확인하고 답합니다." />
    </>
  );
}
