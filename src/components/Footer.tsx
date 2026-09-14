import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-name">
            <strong>{site.name}</strong> <span>({site.nameEn} · {site.abbr})</span>
          </p>
          <p className="footer-tagline">{site.tagline}</p>
          <p className="footer-desc">{site.shortDescription}</p>
          <p className="footer-meta">
            대표 {site.founder.name} · {site.region.countryName} {site.region.addressRegion}
          </p>
        </div>
        <nav className="footer-nav" aria-label="바닥글 메뉴">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/contact">상담 신청</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-social">
          <p className="footer-social-title">채널</p>
          <ul>
            <li>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">
                유튜브 FC문프스
              </a>
            </li>
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                인스타그램 @moonfc_guide
              </a>
            </li>
            <li>
              <a href="/rss.xml">RSS</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name} {site.nameEn}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
