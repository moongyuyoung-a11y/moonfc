import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  const info: string[] = [];
  info.push(`상호: ${site.name} (${site.nameEn})`);
  info.push(`대표: ${site.founder.name}`);
  if (site.business.registrationNumber) info.push(`사업자등록번호: ${site.business.registrationNumber}`);
  if (site.business.mailOrderNumber) info.push(`통신판매업신고: ${site.business.mailOrderNumber}`);
  info.push(
    `주소: ${site.region.countryName} ${site.region.addressRegion}${site.region.streetAddress ? ` ${site.region.streetAddress}` : ""}`,
  );
  if (site.contact.email) info.push(`이메일: ${site.contact.email}`);

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-name">
            <strong>{site.name}</strong> <span>{site.nameEn} · {site.abbr}</span>
          </p>
          <p className="footer-tagline">{site.tagline}</p>
          <p className="footer-desc">{site.description}</p>
          <ul className="footer-info">
            {info.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <nav className="footer-nav" aria-label="바닥글 메뉴">
          <p className="footer-col-title">메뉴</p>
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
          <p className="footer-col-title">채널</p>
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
            {site.contact.kakaoChannelUrl && (
              <li>
                <a href={site.contact.kakaoChannelUrl} target="_blank" rel="noopener noreferrer">
                  카카오톡 채널
                </a>
              </li>
            )}
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
        <p>피트니스 경영 컨설팅 · FC 교육 · 강의</p>
      </div>
    </footer>
  );
}
