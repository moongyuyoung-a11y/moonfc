import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "페이지를 찾을 수 없습니다", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow">
        <h1>페이지를 찾을 수 없습니다</h1>
        <p>주소가 바뀌었거나 삭제된 페이지입니다. 아래 링크에서 원하는 내용을 찾아보세요.</p>
        <ul>
          <li><Link href="/">홈</Link></li>
          <li><Link href="/consulting">피트니스센터 경영 컨설팅</Link></li>
          <li><Link href="/fc-education">FC 교육</Link></li>
          <li><Link href="/insights">인사이트</Link></li>
          <li><Link href="/contact">상담 신청</Link></li>
        </ul>
      </div>
    </section>
  );
}
