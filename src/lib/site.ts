/**
 * 사이트 전역 설정.
 * 브랜드명·대표명·서비스명 표기는 이 파일의 값만 사용해 모든 페이지에서 동일하게 유지합니다.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://mcg.co.kr"
).replace(/\/$/, "");

/** 하위 경로 배포 시 접두어 (예: "/moonfc"). 보통은 빈 문자열 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** public/ 아래 정적 파일 경로에 basePath 를 붙인다. <img src>, CSS 배경 등에 사용 */
export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export const site = {
  /** 한글 브랜드명 (정식 표기) */
  name: "문프스컨설팅그룹",
  /** 영문 표기는 MOONFC 로 통일. 약칭 MCG */
  nameEn: "MOONFC",
  abbr: "MCG",
  /** 부제 */
  tagline: "문프스 컨설팅 · 피트니스경영연구소",
  /** 한 문장 소개 (GEO: 모든 답변 근거의 기준 문장) */
  description:
    "문프스컨설팅그룹(MOONFC)은 헬스장·피트니스센터의 매출 구조를 진단하고 개선하는 피트니스 경영 컨설팅 회사입니다. FC(피트니스 컨설턴트) 교육과 기업·대학 강의를 함께 운영합니다.",
  shortDescription:
    "헬스장·피트니스센터 경영 컨설팅, FC 교육, 강의를 하는 문프스컨설팅그룹(MOONFC)",
  url: SITE_URL,
  locale: "ko_KR",
  /** 대표 */
  founder: {
    name: "문규영",
    alias: "컨설턴트 문프스",
    jobTitle: "대표 컨설턴트",
    description:
      "문규영은 문프스컨설팅그룹(MOONFC) 대표이자 피트니스경영연구소를 이끄는 피트니스 경영 컨설턴트입니다. 헬스장 현장 운영 경험을 바탕으로 경영 컨설팅, FC 교육, 강의를 진행합니다.",
    image: "/images/founder.webp",
  },
  /** 지역 — 실제 주 활동지로 수정 */
  region: {
    country: "KR",
    countryName: "대한민국",
    /** TODO: 주 활동지 입력 (예: 서울특별시) */
    addressRegion: "서울특별시",
    /** TODO: 상세 주소가 있으면 입력, 없으면 빈 문자열 유지 */
    streetAddress: "",
    areaServed: "대한민국 전 지역",
  },
  /** 사업자 정보 (푸터·JSON-LD). 비어 있으면 출력하지 않음 */
  business: {
    /** TODO: 사업자등록번호 (예: 000-00-00000) */
    registrationNumber: "",
    /** TODO: 통신판매업 신고번호가 있으면 입력 */
    mailOrderNumber: "",
    /** 설립 연도 (예: "2021") */
    foundingYear: "",
  },
  /** 연락 채널 */
  contact: {
    /** TODO: 대표 이메일 */
    email: "",
    kakaoChannelUrl: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || "",
    formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  },
  social: {
    youtube: "https://www.youtube.com/@FC%EB%AC%B8%ED%94%84%EC%8A%A4",
    instagram: "https://www.instagram.com/moonfc_guide/",
  },
  /** 검색엔진 소유 확인 값. 비어 있으면 태그를 출력하지 않음 */
  verification: {
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  ogImage: "/images/og-default.png",
} as const;

export type ServiceKey = "consulting" | "fc-education" | "lecture";

export const services: Record<
  ServiceKey,
  {
    key: ServiceKey;
    name: string;
    shortName: string;
    path: string;
    summary: string;
    audience: string;
  }
> = {
  consulting: {
    key: "consulting",
    name: "피트니스센터 경영 컨설팅",
    shortName: "컨설팅",
    path: "/consulting",
    summary:
      "헬스장·피트니스센터의 매출 구조, 회원 관리, 직원 운영을 진단하고 개선 전략을 실행까지 함께 합니다.",
    audience: "헬스장·필라테스·PT샵 대표, 점장, 관리자",
  },
  "fc-education": {
    key: "fc-education",
    name: "FC(피트니스 컨설턴트) 교육",
    shortName: "FC 교육",
    path: "/fc-education",
    summary:
      "회원 상담과 등록을 담당하는 FC를 양성하는 교육 과정과 세미나(FC DEEP SIGHT, PRO FC), 관리자 집중 양성 과정을 운영합니다.",
    audience: "FC 지망자, 현직 FC, 센터 관리자·점장",
  },
  lecture: {
    key: "lecture",
    name: "강의·출강",
    shortName: "강의·출강",
    path: "/lecture",
    summary:
      "피트니스 기업, 프랜차이즈, 대학 관련 학과를 대상으로 피트니스 경영과 FC 실무 강의를 출강합니다.",
    audience: "피트니스 기업·프랜차이즈 본사, 대학 체육·스포츠 관련 학과, 교육 기관",
  },
};

export const nav = [
  { href: "/consulting", label: "컨설팅" },
  { href: "/fc-education", label: "FC 교육" },
  { href: "/lecture", label: "강의·출강" },
  { href: "/insights", label: "인사이트" },
  { href: "/about", label: "대표 소개" },
  { href: "/faq", label: "FAQ" },
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
