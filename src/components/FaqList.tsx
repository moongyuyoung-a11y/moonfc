import Link from "next/link";
import type { FaqItem } from "@/lib/faq";

/** 질문 = h3, 답변 = 2~4문장 (GEO 구조) */
export function FaqList({ items, headingLevel = 3 }: { items: FaqItem[]; headingLevel?: 3 | 4 }) {
  const H = headingLevel === 4 ? "h4" : "h3";
  return (
    <div className="faq-list">
      {items.map((f) => (
        <article className="faq-item" key={f.id} id={f.id}>
          <H className="faq-q">{f.question}</H>
          <p className="faq-a">{f.answer}</p>
        </article>
      ))}
    </div>
  );
}

export function FaqTeaser({ items, title = "자주 묻는 질문" }: { items: FaqItem[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section className="section" aria-labelledby="faq-teaser-title">
      <div className="container">
        <h2 id="faq-teaser-title">{title}</h2>
        <FaqList items={items} />
        <p className="more-link">
          <Link href="/faq">전체 FAQ 보기 →</Link>
        </p>
      </div>
    </section>
  );
}
