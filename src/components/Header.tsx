import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <span className="brand-en">{site.nameEn}</span>
          <span className="brand-ko">{site.name}</span>
        </Link>
        <nav className="nav-desktop" aria-label="주요 메뉴">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="btn btn-primary btn-sm header-cta">
          상담 신청
        </Link>
        <details className="nav-mobile">
          <summary aria-label="메뉴 열기">
            <span className="hamburger" aria-hidden="true" />
            <span className="sr-only">메뉴</span>
          </summary>
          <nav aria-label="모바일 메뉴">
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="btn btn-primary">
                  상담 신청
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
