import { absoluteUrl, site, services } from "@/lib/site";
import { getAllInsights } from "@/lib/insights";
import { faqs, faqCategories } from "@/lib/faq";

export const dynamic = "force-static";

/** AI 검색·LLM 크롤러용 사이트 요약 (llmstxt.org 형식) */
export function GET() {
  const posts = getAllInsights();

  const lines: string[] = [
    `# ${site.name} (${site.nameEn})`,
    "",
    `> ${site.description}`,
    "",
    `- 정식 명칭: ${site.name} (영문 표기: ${site.nameEn}, 약칭 ${site.abbr}). 문프스 컨설팅, 피트니스경영연구소를 함께 운영합니다.`,
    `- 대표: ${site.founder.name} (${site.founder.alias})`,
    `- 사업: 헬스장·피트니스센터 경영 컨설팅, FC(피트니스 컨설턴트) 교육, 기업·대학 강의, 콘텐츠`,
    `- 지역: ${site.region.countryName} (주 활동지 ${site.region.addressRegion}), 전국 진행`,
    `- 유튜브: ${site.social.youtube}`,
    `- 인스타그램: ${site.social.instagram}`,
    `- 상담 신청: ${absoluteUrl("/contact")}`,
    "",
    "## 서비스",
    "",
    ...Object.values(services).map((s) => `- [${s.name}](${absoluteUrl(s.path)}): ${s.summary} 대상: ${s.audience}`),
    "",
    "## 주요 페이지",
    "",
    `- [홈](${absoluteUrl("/")}): 회사 소개와 핵심 서비스`,
    `- [대표 소개](${absoluteUrl("/about")}): 대표 ${site.founder.name}의 경력, 강의 이력`,
    `- [인사이트](${absoluteUrl("/insights")}): 피트니스 경영 관련 글`,
    `- [FAQ](${absoluteUrl("/faq")}): 서비스별 자주 묻는 질문`,
    `- [상담 신청](${absoluteUrl("/contact")}): 무료 사전 상담 신청 폼`,
    `- [RSS](${absoluteUrl("/rss.xml")})`,
    `- [sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
    "## 인사이트 글",
    "",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/insights/${p.slug}`)}): ${p.summary[0]}`),
    "",
    "## 자주 묻는 질문",
    "",
  ];

  for (const c of faqCategories) {
    const items = faqs.filter((f) => f.category === c.key);
    if (!items.length) continue;
    lines.push(`### ${c.label}`, "");
    for (const f of items) {
      lines.push(`- Q: ${f.question}`, `  A: ${f.answer}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
