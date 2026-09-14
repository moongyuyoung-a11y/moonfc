import Link from "next/link";
import { site } from "@/lib/site";

export function CTA({
  title = "센터 상황을 먼저 들려주세요",
  body = "사전 상담은 무료입니다. 센터 규모와 지금 가장 큰 고민을 적어 주시면 대표가 직접 확인하고 맞는 진행 방식을 안내드립니다.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container cta-inner">
        <div>
          <h2 id="cta-title">{title}</h2>
          <p>{body}</p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn btn-light">
            무료 상담 신청
          </Link>
          {site.contact.kakaoChannelUrl ? (
            <a href={site.contact.kakaoChannelUrl} className="btn btn-kakao" target="_blank" rel="noopener noreferrer">
              카카오톡 채널
            </a>
          ) : (
            <Link href="/faq" className="btn btn-ghost-light">
              자주 묻는 질문
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
