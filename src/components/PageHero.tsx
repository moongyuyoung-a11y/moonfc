import type { ReactNode } from "react";

/**
 * 하위 페이지 상단. h1 은 페이지당 1개.
 * lead 는 "질문에 바로 답하는 문장" 으로 시작 (GEO)
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
        </div>
        <div>
          <p className="lead">{lead}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
