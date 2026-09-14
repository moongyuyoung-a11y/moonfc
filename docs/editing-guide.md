# 홈페이지 수정 가이드

"무엇을 바꾸고 싶은지"에 따라 어느 파일을 고치면 되는지 정리한 표입니다. 코드를 모르더라도 문구·데이터 파일은 직접 수정할 수 있고, 레이아웃·디자인 변경은 이 저장소에서 Claude Code 에 요청하면 됩니다.

## 바로 고칠 수 있는 것 (문구·데이터)

| 바꾸고 싶은 것 | 파일 | 비고 |
| --- | --- | --- |
| 회사 한 줄 소개, 대표 소개 문장 | `src/lib/site.ts` → `description`, `founder.description` | 모든 페이지·JSON-LD·llms.txt 에 동시에 반영 |
| 주소·활동 지역·사업자등록번호·이메일 | `src/lib/site.ts` → `region`, `business`, `contact` | 비워두면 해당 줄은 출력 안 됨 |
| 서비스 이름·요약·대상 | `src/lib/site.ts` → `services` | 홈 카드, 서비스 페이지 상단, Service JSON-LD 에 반영 |
| 메뉴 순서·이름 | `src/lib/site.ts` → `nav` | |
| 홈 상단 핵심 숫자, 고객 후기, 협력 기관 | `src/lib/trust.ts` | 배열이 비어 있으면 섹션 자체가 숨겨짐 |
| 대표 경력·강의 이력·학력·자격 | `src/lib/profile.ts` | 대표 소개 페이지 |
| FAQ 추가·수정 | `src/lib/faq.ts` | `category` 로 어느 서비스 페이지에 뜰지 결정 |
| 블로그 글 | `content/insights/*.md` | 파일 하나 = 글 하나. README 의 frontmatter 예시 참고 |
| 대표 사진 | `public/images/founder.webp` | 720×900 세로형 WebP 권장 |
| 홈 첫 화면 배경 사진 | `public/images/hero.webp` | 1600×900 가로형 WebP. 센터·강의 현장 사진 권장. 어두운 오버레이가 자동으로 덮임 |
| OG 이미지(링크 공유 썸네일) | `public/images/og-default.png` | 1200×630 PNG |
| 로고·파비콘 | `public/images/logo.png`, `src/app/icon.svg` | |
| 도메인, 폼 주소, 카카오채널, 검색엔진 확인값 | `.env` (Vercel 에서는 Environment Variables) | `.env.example` 참고 |

## 페이지별 본문 (문단·표·카드)

| 페이지 | 파일 |
| --- | --- |
| 홈 | `src/app/page.tsx` |
| 컨설팅 | `src/app/consulting/page.tsx` |
| FC 교육 | `src/app/fc-education/page.tsx` |
| 강의·출강 | `src/app/lecture/page.tsx` |
| 인사이트 목록 / 글 상세 템플릿 | `src/app/insights/page.tsx`, `src/app/insights/[slug]/page.tsx` |
| 대표 소개 | `src/app/about/page.tsx` |
| 상담 신청 | `src/app/contact/page.tsx`, 폼 항목은 `src/components/ContactForm.tsx` |
| FAQ | `src/app/faq/page.tsx` |

각 페이지 상단의 `metadata` 블록이 검색 결과에 보이는 제목(title, 30자 이내)과 설명(description, 80자 이내)입니다.

## 디자인 (색·글꼴·간격)

- 색상, 둥글기, 최대 폭 등은 `src/app/globals.css` 맨 위 `:root` 변수에서 한 번에 바꿉니다.
  - `--navy` 기본 브랜드색, `--accent` 강조색(링크·버튼 포인트), `--surface` 회색 배경
- 글꼴: 제목은 `src/fonts/Pretendard-Bold.subset.woff2`(`src/app/layout.tsx` 의 `localFont`), 본문은 시스템 글꼴. 본문까지 웹폰트로 바꾸면 모바일 성능 점수가 약 10점 떨어지므로 권장하지 않음
- 헤더·푸터는 `src/components/Header.tsx`, `Footer.tsx`

## 수정 후 확인

```bash
npm run build && npm run validate:schema
```

빌드가 통과하고 검사 스크립트가 "모든 검사 통과" 를 출력하면 배포해도 됩니다. GitHub 에 푸시하면 GitHub Actions 가 자동으로 GitHub Pages 에 배포합니다 (저장소 Actions 탭에서 진행 상황 확인).

## Claude Code 에 요청할 때

이 저장소를 연 세션에서 다음처럼 요청하면 됩니다.

- "홈 상단 문구를 ○○로 바꿔줘"
- "컨설팅 페이지에 사례 섹션 하나 추가해줘"
- "인사이트에 '○○' 주제로 글 초안 써줘"
- "강조색을 파란색에서 ○○로 바꿔줘"

수정 후에는 항상 빌드·검사·라이트하우스를 다시 돌려 점수가 유지되는지 확인합니다.
