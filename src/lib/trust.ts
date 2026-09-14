/**
 * 신뢰 요소 데이터. 사실 확인된 값만 넣으세요.
 * 배열이 비어 있으면 해당 섹션은 렌더링되지 않습니다.
 */

/** 핵심 숫자 (홈 상단). 예: { value: "120+", label: "컨설팅·교육 진행 센터", note: "2021~2026 누적" } */
export const stats: { value: string; label: string; note?: string }[] = [
  // { value: "[숫자]", label: "컨설팅 진행 센터", note: "누적" },
  // { value: "[숫자]", label: "FC 교육 수료 인원", note: "누적" },
  // { value: "[숫자]", label: "기업·대학 강의 횟수" },
  // { value: "[연도]년", label: "현장 경력 시작" },
];

/** 고객 후기 (센터 동의 받은 것만). */
export const testimonials: { quote: string; who: string; where?: string }[] = [
  // { quote: "상담 순서를 바꾼 뒤 두 달 만에 등록률이 눈에 띄게 올랐습니다.", who: "OO휘트니스 대표", where: "경기 수원" },
];

/** 협력·출강 기관명 (로고 대신 텍스트로 표기). */
export const partners: string[] = [
  // "OO대학교 스포츠학과", "OO피트니스 프랜차이즈",
];
