/**
 * 대표 소개 페이지 데이터.
 * E-E-A-T 를 위해 사실 기반으로 구체적으로 채워야 합니다.
 * 아래 항목은 구조 예시이며 실제 이력으로 교체하세요.
 * (대괄호 [ ] 안의 내용은 반드시 실제 정보로 바꿔야 합니다)
 */

export type CareerItem = { when: string; title: string; detail?: string };
export type LectureItem = { when: string; org: string; topic: string };
export type MediaItem = { title: string; url: string; desc: string };

export const career: CareerItem[] = [
  { when: "현재", title: "문프스컨설팅그룹(MOONFC) 대표", detail: "피트니스경영연구소 운영, 피트니스센터 경영 컨설팅·FC 교육·강의" },
  { when: "[연도]", title: "[피트니스 브랜드/센터명] [직책]", detail: "[담당 업무: 예) FC 팀 운영, 지점 매출 관리, 신규 지점 오픈]" },
  { when: "[연도]", title: "[피트니스 브랜드/센터명] FC", detail: "[담당 업무: 예) 회원 상담·등록, 재등록 관리]" },
];

export const lectures: LectureItem[] = [
  { when: "[연도]", org: "[기업/프랜차이즈명]", topic: "[강의 주제: 예) FC 상담 실무 교육]" },
  { when: "[연도]", org: "[대학교 학과명]", topic: "[강의 주제: 예) 피트니스 산업의 이해와 진로]" },
  { when: "[연도]", org: "MOONFC 세미나", topic: "FC DEEP SIGHT / PRO FC" },
];

export const credentials = {
  education: [] as string[], // 예: "OO대학교 체육학과 졸업"
  certificates: [] as string[], // 예: "생활스포츠지도사 2급 (보디빌딩)"
  awards: [] as string[], // 예: "OO브랜드 연간 매출 1위 지점 매니저 (2021)"
};

export const media: MediaItem[] = [
  {
    title: "유튜브 채널 FC문프스",
    url: "https://www.youtube.com/@FC%EB%AC%B8%ED%94%84%EC%8A%A4",
    desc: "FC 상담, 헬스장 운영에 대한 현장 이야기를 영상으로 다룹니다.",
  },
  {
    title: "인스타그램 @moonfc_guide",
    url: "https://www.instagram.com/moonfc_guide/",
    desc: "세미나·교육 일정 공지와 짧은 현장 노트.",
  },
];
