import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { site, SITE_URL } from "@/lib/site";

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
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1b2d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
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
