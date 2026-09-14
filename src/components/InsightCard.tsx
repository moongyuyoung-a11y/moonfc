import Link from "next/link";
import type { InsightMeta } from "@/lib/insights";

export function InsightCard({ post, headingLevel = 3 }: { post: InsightMeta; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="insight-card">
      <p className="insight-meta">
        <span className="badge">{post.category}</span>
        <time dateTime={post.date}>{post.date.replace(/-/g, ".")}</time>
      </p>
      <H className="insight-title">
        <Link href={`/insights/${post.slug}`}>{post.title}</Link>
      </H>
      <p className="insight-summary">{post.summary[0]}</p>
    </article>
  );
}

export function RelatedInsights({
  posts,
  title = "관련 인사이트",
}: {
  posts: InsightMeta[];
  title?: string;
}) {
  if (!posts.length) return null;
  return (
    <section className="section" aria-labelledby="related-insights-title">
      <div className="container">
        <h2 id="related-insights-title">{title}</h2>
        <div className="grid grid-3">
          {posts.map((p) => (
            <InsightCard key={p.slug} post={p} />
          ))}
        </div>
        <p className="more-link">
          <Link href="/insights">인사이트 전체 보기 →</Link>
        </p>
      </div>
    </section>
  );
}
