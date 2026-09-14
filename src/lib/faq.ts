import type { ServiceKey } from "./site";

export type FaqItem = {
  id: string;
  question: string;
  /** 2~4문장. 단독으로 읽어도 완결되게 작성 */
  answer: string;
  category: ServiceKey | "general";
};

export const faqCategories: { key: FaqItem["category"]; label: string; path?: string }[] = [
  { key: "consulting", label: "피트니스센터 경영 컨설팅", path: "/consulting" },
  { key: "fc-education", label: "FC 교육", path: "/fc-education" },
  { key: "lecture", label: "강의·출강", path: "/lecture" },
  { key: "general", label: "일반 문의" },
];

export const faqs: FaqItem[] = [
  // 컨설팅
  {
    id: "consulting-what",
    category: "consulting",
    question: "피트니스 경영 컨설팅은 무엇을 해주나요?",
    answer:
      "문프스컨설팅그룹(MOONFC)의 피트니스 경영 컨설팅은 헬스장·피트니스센터의 매출 구조, 회원 등록·재등록 흐름, 직원 운영 방식을 진단하고 개선안을 실행까지 함께하는 서비스입니다. 진단 단계에서 매출 데이터와 상담 과정을 직접 확인한 뒤, 센터 상황에 맞는 전략을 세우고 현장에서 적용합니다. 보고서만 전달하고 끝나는 방식이 아니라 실행 결과를 확인하는 것까지가 컨설팅 범위입니다.",
  },
  {
    id: "consulting-who",
    category: "consulting",
    question: "어떤 규모의 센터가 컨설팅을 받을 수 있나요?",
    answer:
      "개인이 운영하는 소규모 헬스장부터 여러 지점을 가진 피트니스 브랜드까지 규모와 관계없이 진행할 수 있습니다. 다만 규모에 따라 진단 항목과 기간이 달라지므로, 상담 신청 시 센터 규모와 현재 가장 큰 고민을 함께 적어 주시면 맞는 방식을 안내드립니다. 오픈 전 센터의 준비 단계 컨설팅도 가능합니다.",
  },
  {
    id: "consulting-period",
    category: "consulting",
    question: "컨설팅 기간과 비용은 어떻게 정해지나요?",
    answer:
      "컨설팅 비용은 정찰가가 아니라 진단 범위, 지점 수, 방문 횟수에 따라 견적으로 안내합니다. 먼저 무료 사전 상담에서 센터 상황을 듣고, 필요한 진단 범위를 정한 뒤 기간과 비용을 제안드립니다. 일반적으로 진단에서 실행 점검까지 1개월에서 3개월 단위로 진행합니다.",
  },
  {
    id: "consulting-result",
    category: "consulting",
    question: "컨설팅을 받으면 매출이 얼마나 오르나요?",
    answer:
      "매출 상승 폭은 센터의 현재 상태, 상권, 직원 구성에 따라 다르기 때문에 특정 숫자를 약속하지는 않습니다. 대신 진단 단계에서 상담 전환율, 재등록률, 객단가처럼 개선 가능한 지표를 먼저 확인하고, 그 지표가 실제로 움직였는지를 기준으로 결과를 함께 확인합니다. 지표가 바뀌지 않으면 원인을 다시 찾는 것까지 컨설팅에 포함됩니다.",
  },
  // FC 교육
  {
    id: "fc-what",
    category: "fc-education",
    question: "FC(피트니스 컨설턴트)는 어떤 직무인가요?",
    answer:
      "FC는 Fitness Consultant의 약자로, 헬스장·피트니스센터에서 방문 고객을 상담하고 회원 등록과 재등록을 이끄는 직무입니다. 단순 안내 데스크가 아니라 센터 매출의 시작점을 담당하는 자리이며, 상담 능력에 따라 같은 방문객 수에서도 등록률이 크게 달라집니다. 문프스컨설팅그룹(MOONFC)은 이 직무를 체계적으로 배울 수 있는 교육 과정을 운영합니다.",
  },
  {
    id: "fc-course",
    category: "fc-education",
    question: "FC 양성 과정에서는 무엇을 배우나요?",
    answer:
      "FC 양성 과정은 방문 상담의 흐름, 고객 니즈 파악, 가격·프로그램 제안, 재등록 관리, 일일 업무 관리까지 FC가 현장에서 바로 써야 하는 실무를 단계별로 다룹니다. 이론 설명보다 실제 상담 상황을 재현하는 실습 비중이 높습니다. 수료 후에도 현장에서 막히는 상황을 질문할 수 있는 창구를 열어 둡니다.",
  },
  {
    id: "fc-seminar",
    category: "fc-education",
    question: "FC DEEP SIGHT와 PRO FC 세미나는 무엇이 다른가요?",
    answer:
      "FC DEEP SIGHT는 FC 직무의 본질과 상담 구조를 깊이 이해하는 데 초점을 둔 세미나이고, PRO FC는 현직 FC가 성과를 높이기 위한 실전 기술과 관리 방법을 다루는 심화 세미나입니다. FC를 처음 시작하거나 기본기를 다시 잡고 싶다면 FC DEEP SIGHT, 이미 현장에 있고 다음 단계로 가고 싶다면 PRO FC가 맞습니다. 세미나 일정은 인사이트 페이지와 SNS를 통해 공지합니다.",
  },
  {
    id: "fc-manager",
    category: "fc-education",
    question: "관리자 집중 양성 과정은 누가 들으면 좋은가요?",
    answer:
      "관리자 집중 양성 과정은 FC 팀을 이끌어야 하는 점장, 팀장, 매니저와 곧 그 역할을 맡을 예정인 분을 위한 과정입니다. 개인 상담 성과가 아니라 팀의 목표 관리, 직원 교육, 매출 데이터 관리처럼 관리자가 해야 하는 일을 다룹니다. 센터 대표가 직접 듣고 운영에 적용하는 경우도 많습니다.",
  },
  // 강의
  {
    id: "lecture-topic",
    category: "lecture",
    question: "기업·대학 강의는 어떤 주제로 진행되나요?",
    answer:
      "기업 강의는 피트니스 브랜드·프랜차이즈 직원을 대상으로 한 FC 실무, 상담 기술, 지점 매출 관리 주제가 많고, 대학 강의는 체육·스포츠 관련 학과 학생을 대상으로 피트니스 산업 구조와 취업 후 실제 업무를 다룹니다. 요청 기관의 목적에 따라 주제와 시간을 조정합니다. 1회성 특강부터 여러 회차로 구성된 과정까지 가능합니다.",
  },
  {
    id: "lecture-request",
    category: "lecture",
    question: "출강 요청은 어떻게 하나요?",
    answer:
      "상담 신청 페이지에서 기관명, 대상, 희망 일정, 주제를 적어 보내주시면 일정과 강의료를 안내드립니다. 강의료는 시간, 인원, 지역에 따라 달라지며 기관 규정에 맞춰 조정할 수 있습니다. 강의 자료는 요청 기관의 상황에 맞게 새로 구성합니다.",
  },
  // 일반
  {
    id: "general-online",
    category: "general",
    question: "지방에 있는 센터도 컨설팅이나 교육이 가능한가요?",
    answer:
      "가능합니다. 컨설팅은 방문 진단과 온라인 점검을 함께 진행하며, 교육과 세미나는 지역에 따라 출강 또는 온라인으로 진행합니다. 지역과 관계없이 먼저 상담을 신청해 주시면 진행 방식을 함께 정합니다.",
  },
  {
    id: "general-contact",
    category: "general",
    question: "상담은 어떻게 신청하나요?",
    answer:
      "상담 신청 페이지의 폼에 이름, 연락처, 센터명 또는 소속, 문의 내용을 적어 보내주시면 확인 후 연락드립니다. 카카오톡 채널로도 문의할 수 있습니다. 사전 상담은 무료이며, 상담 후 진행 여부를 결정하시면 됩니다.",
  },
];

export function faqsByCategory(category: FaqItem["category"]): FaqItem[] {
  return faqs.filter((f) => f.category === category);
}
