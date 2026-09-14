# 배포 및 검색엔진 등록 체크리스트

## 1. 배포 전

- [ ] `.env` 에 `NEXT_PUBLIC_SITE_URL` 을 실제 도메인으로 설정 (예: `https://moonfc.kr`)
- [ ] `src/lib/site.ts` 의 `region` (주 활동지·주소) 수정
- [ ] `src/lib/profile.ts` 의 대괄호 `[ ]` 항목을 실제 경력·강의 이력·학력·자격으로 교체
- [ ] `public/images/founder.webp` 를 실제 대표 사진으로 교체 (WebP, 720×900 권장)
- [ ] `public/images/og-default.png` 를 브랜드 OG 이미지로 교체 (1200×630)
- [ ] `public/images/logo.png`, `src/app/icon.svg` 를 실제 로고로 교체
- [ ] 상담 폼 서비스(Formspree 등) 생성 후 `NEXT_PUBLIC_FORM_ENDPOINT` 설정, 테스트 전송 1회
- [ ] 카카오톡 채널 URL `NEXT_PUBLIC_KAKAO_CHANNEL_URL` 설정
- [ ] `npm run build && npm run validate:schema` 통과 확인

## 2. Vercel 배포

1. GitHub 저장소를 Vercel 에 Import (Framework: Next.js 자동 감지, 빌드 명령 `next build`, 출력 `out`)
2. Environment Variables 에 `.env` 의 값 등록 (Production/Preview 모두)
3. 도메인 연결: Vercel → Settings → Domains 에 도메인 추가, DNS 에 안내된 A/CNAME 레코드 등록
4. `www` ↔ 루트 도메인 중 하나를 대표로 정하고 나머지는 리다이렉트 (canonical 과 일치시킬 것)
5. 배포 후 확인
   - [ ] `https://도메인/sitemap.xml`
   - [ ] `https://도메인/robots.txt`
   - [ ] `https://도메인/rss.xml`
   - [ ] `https://도메인/llms.txt`
   - [ ] 모바일에서 각 페이지 열어 보기, 상담 폼 실제 전송 테스트

## 3. 구글 서치콘솔 (Google Search Console)

1. https://search.google.com/search-console 접속 → 속성 추가
2. **도메인** 속성(권장): DNS TXT 레코드로 확인. 또는 **URL 접두어** 속성: HTML 태그 방식 선택 시 `content="..."` 값을 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 에 넣고 재배포
3. 확인 완료 후 좌측 **Sitemaps** → `https://도메인/sitemap.xml` 제출
4. **URL 검사** 에서 홈·컨설팅·FC 교육·대표 소개 페이지 색인 요청
5. 1~2주 후 **페이지** 보고서에서 색인 상태, **개선사항** 에서 FAQ·브레드크럼 리치 결과 인식 여부 확인
6. 리치 결과 테스트: https://search.google.com/test/rich-results 에 각 페이지 URL 입력 (FAQPage, BreadcrumbList, Article, Organization 확인)

## 4. 네이버 서치어드바이저

1. https://searchadvisor.naver.com 접속 → 웹마스터 도구 → 사이트 등록 (`https://도메인`)
2. 소유 확인: **HTML 태그** 방식 선택 → `content="..."` 값을 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 에 넣고 재배포 → 소유확인 클릭
3. **요청 → 사이트맵 제출**: `https://도메인/sitemap.xml`
4. **요청 → RSS 제출**: `https://도메인/rss.xml`
5. **요청 → 웹 페이지 수집**: 홈·컨설팅·FC 교육·대표 소개·인사이트 글 URL 각각 요청
6. **검증 → robots.txt** 에서 수집 허용 확인 (Yeti 허용됨)
7. **검증 → 웹 페이지 최적화** 에서 홈 URL 검사 (title, description, OG, canonical 항목 확인)
8. 새 글 발행 시마다 **웹 페이지 수집** 에 URL 요청 (네이버는 RSS 만으로 반영이 느림)

## 5. AI 검색(GEO) 관련

- robots.txt 에서 GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended 허용됨 (차단하려면 `src/app/robots.ts` 수정)
- `/llms.txt` 가 회사 소개·서비스·글·FAQ 를 마크다운으로 제공
- 브랜드 표기 통일: 한글 `문프스컨설팅그룹`, 영문 `MOONFC`, 약칭 `MCG`, 대표 `문규영(컨설턴트 문프스)` — 모두 `src/lib/site.ts` 에서만 관리
- 유튜브·인스타그램 프로필의 소개란에 홈페이지 URL 을 넣어 sameAs 가 양방향이 되게 할 것
- 네이버 플레이스 / 구글 비즈니스 프로필 등록 시 상호·대표명·홈페이지 URL 을 사이트와 동일하게 입력

## 6. 운영

- 월 1~2회 인사이트 글 발행 (검색 유입의 핵심). 글마다 `service`, `faq` frontmatter 로 내부 링크 연결
- 세미나 일정은 인사이트 글로 발행 (RSS·sitemap 에 자동 포함)
- 분기마다 `npm run lighthouse` 로 성능 점검, 서치콘솔 **핵심 성능 지표(Core Web Vitals)** 확인
- 대표 소개 페이지의 강의 이력은 출강 때마다 추가 (E-E-A-T)
