# MOONFC 공식 홈페이지

문프스컨설팅그룹(MOONFC) 공식 홈페이지. 피트니스센터 경영 컨설팅 · FC 교육 · 강의.

- Next.js 16 (App Router) **정적 export** — 서버 없이 Vercel/어떤 정적 호스팅에도 배포 가능
- 한국어(`lang="ko"`), 모바일 우선, 외부 스크립트 없음. 제목용 글꼴 Pretendard Bold(OFL, 한글 2,350자 서브셋 약 180KB)만 셀프호스팅하고 본문은 시스템 글꼴을 써서 첫 화면이 폰트를 기다리지 않게 함
- SEO/GEO: 페이지별 title·description·canonical·OG·Twitter, JSON-LD(@graph), sitemap.xml, robots.txt, rss.xml, llms.txt

## 실행

```bash
npm install
npm run dev              # http://localhost:3000
npm run build            # out/ 에 정적 파일 생성
node scripts/serve-static.mjs   # out/ 를 Vercel 과 같은 규칙으로 로컬 서빙 (http://localhost:4173)
npm run validate:schema  # 빌드 결과의 JSON-LD·메타·h1·img alt 검사
npm run lighthouse       # 라이트하우스(모바일) 실행 → reports/
```

## 구조

```
src/app/                 페이지 (App Router)
  page.tsx               홈
  consulting/            컨설팅
  fc-education/          FC 교육
  lecture/               강의·출강
  insights/              인사이트 목록, [slug] 글 상세
  about/                 대표 소개
  contact/               상담 신청 (폼 + 카카오채널)
  faq/                   FAQ
  sitemap.ts robots.ts   자동 생성
  rss.xml/ llms.txt/     라우트 핸들러로 생성
src/lib/site.ts          브랜드명·대표·지역·SNS·검증 태그 등 전역 설정 (표기 통일의 기준)
src/lib/faq.ts           FAQ 데이터 (질문/답변/카테고리)
src/lib/profile.ts       대표 경력·강의 이력 데이터  ← 실제 이력으로 교체 필요
src/lib/trust.ts         핵심 숫자·고객 후기·협력 기관 (비어 있으면 섹션 숨김)
src/lib/schema.ts        JSON-LD 빌더
src/lib/seo.ts           메타태그 빌더
content/insights/*.md    블로그 글 (frontmatter + 마크다운)
public/images/           WebP 이미지, OG 이미지
public/fonts/            제목용 Pretendard Bold 서브셋 (라이선스 파일 포함)
scripts/                 검증·라이트하우스·로컬 서버 스크립트
docs/launch-checklist.md 배포 후 서치어드바이저/서치콘솔 등록 절차
docs/editing-guide.md    무엇을 바꾸려면 어느 파일을 고치는지 정리한 수정 가이드
docs/seo-plan.md         검색 상위 노출을 위한 운영 계획
```

## 배포 전 반드시 바꿀 것

| 항목 | 위치 |
| --- | --- |
| 배포 도메인 | `.env`의 `NEXT_PUBLIC_SITE_URL` (기본값 `https://moonfc.kr`) |
| 주 활동지·주소 | `src/lib/site.ts` → `region` |
| 대표 경력·강의 이력·학력·자격 | `src/lib/profile.ts` (대괄호 `[ ]` 항목 전부) |
| 대표 프로필 사진 | `public/images/founder.webp` (720×900 권장, WebP) |
| OG 이미지 | `public/images/og-default.png` (1200×630) |
| 로고 | `public/images/logo.png` (512×512), `src/app/icon.svg` |
| 상담 폼 전송 주소 | `.env`의 `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree, Web3Forms 등) |
| 카카오톡 채널 URL | `.env`의 `NEXT_PUBLIC_KAKAO_CHANNEL_URL` |
| 검색엔진 소유 확인 값 | `.env`의 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |

`.env.example` 을 복사해 `.env` 로 만들고 값을 채우면 됩니다. Vercel 에서는 프로젝트 설정 → Environment Variables 에 같은 이름으로 넣습니다.

## 상담 신청 폼 (서버 없이 DB 수집)

정적 사이트이므로 폼 데이터는 외부 폼 서비스로 보냅니다. `ContactForm` 은 `multipart/form-data` 를 `NEXT_PUBLIC_FORM_ENDPOINT` 로 POST 합니다.

- **Formspree**: 폼 생성 후 `https://formspree.io/f/xxxxxxx` 를 넣으면 대시보드에서 접수 내역(DB) 확인, 이메일 알림, CSV 내보내기 가능
- **Web3Forms**: 액세스 키 발급 후 `https://api.web3forms.com/submit` 을 넣고, `ContactForm.tsx` 의 hidden 필드에 `access_key` 추가
- 값을 비워두면 폼 전송 시 카카오톡 채널 안내 메시지만 표시됩니다

## 블로그 글 쓰기

`content/insights/새-글.md` 파일을 만들면 빌드 시 자동으로 목록·sitemap·RSS·llms.txt 에 포함됩니다.

```md
---
title: "본문 제목 (h1)"
seoTitle: "검색용 짧은 제목 (30자 이내)"
description: "meta description (80자 이내)"
summary:
  - "요약 1"
  - "요약 2"
  - "요약 3"
date: "2026-09-01"
category: "센터 경영"
tags: ["헬스장 매출", "재등록률"]
service: ["consulting"]          # consulting | fc-education | lecture — 관련 서비스 페이지와 상호 링크
faq: ["consulting-what"]         # src/lib/faq.ts 의 id — 관련 FAQ 링크
keyPoints:
  - "핵심 정리 1"
  - "핵심 정리 2"
image: "/images/xxx.webp"        # 선택
imageAlt: "이미지 설명"           # image 가 있으면 필수
---

첫 문단은 질문에 바로 답하는 문장으로 시작합니다.

## h2 소제목
본문…
```

글 템플릿(제목 / 요약 3줄 / h2 본문 / 핵심 정리 / 관련 서비스·FAQ·글 링크 / 작성자 정보)은 `src/app/insights/[slug]/page.tsx` 가 자동으로 구성합니다.

## FAQ 추가

`src/lib/faq.ts` 의 `faqs` 배열에 항목을 추가합니다. `category` 에 따라 해당 서비스 페이지와 FAQ 페이지에 자동 노출되고 FAQPage JSON-LD 에 포함됩니다. 답변은 2~4문장, 단독으로 읽어도 완결되게 씁니다.
