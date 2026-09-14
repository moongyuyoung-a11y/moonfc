import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { site, SITE_URL, BASE_PATH } from "@/lib/site";

/**
 * 제목용 웹폰트: Pretendard Bold (OFL) 를 KS X 1001 한글 2,350자 + 라틴/기호로 서브셋 (약 180KB).
 * 본문은 시스템 글꼴을 써서 첫 화면(LCP)이 폰트 로드를 기다리지 않는다.
 */
const heading = localFont({
  src: "../fonts/Pretendard-Bold.subset.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--font-heading-face",
  fallback: ["-apple-system", "BlinkMacSystemFont", "system-ui", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} ${site.nameEn} | 피트니스 경영 컨설팅·FC 교육`,
    template: `%s | ${site.nameEn}`,
  },
  description: site.shortDescription,
  applicationName: site.nameEn,
  authors: [{ name: site.founder.name, url: `${SITE_URL}/about` }],
  creator: site.name,
  publisher: site.name,
  keywords: ["피트니스 컨설팅", "헬스장 경영 컨설팅", "FC 교육", "피트니스경영", "피트니스 컨설턴트", "문프스", "MOONFC"],
  formatDetection: { telephone: true, email: true },
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(site.verification.naver ? { other: { "naver-site-verification": site.verification.naver } } : {}),
  },
  icons: { icon: `${BASE_PATH}/icon.svg` },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1f3a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={heading.variable}>
      <body>
        <a href="#main" className="skip-link">
          본문 바로가기
        </a>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
