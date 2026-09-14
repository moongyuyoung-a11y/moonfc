import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { site, services, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { graph, articleSchema, breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllInsights, getInsight, getRelatedInsights } from "@/lib/insights";
import { InsightCard } from "@/components/InsightCard";
import { faqs } from "@/lib/faq";
import { CTA } from "@/components/CTA";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description ?? post.summary[0].slice(0, 80),
    path: `/insights/${post.slug}`,
    type: "article",
    image: post.image,
    imageAlt: post.imageAlt,
    publishedTime: post.date,
    modifiedTime: post.updated,
    tags: post.tags,
  });
}

export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "홈", path: "/" },
    { name: "인사이트", path: "/insights" },
    { name: post.title, path: `/insights/${post.slug}` },
  ];
  const related = getRelatedInsights(post);
  const relatedFaqs = faqs.filter((f) => post.faq.includes(f.id));
  const relatedServices = post.service.map((k) => services[k]).filter(Boolean);

  return (
    <>
      <JsonLd data={graph(articleSchema(post), breadcrumbSchema(crumbs))} />
      <div className="container narrow">
        <Breadcrumbs items={crumbs} />
      </div>

      <article>
        <header className="article-header">
          <div className="container narrow">
            <p className="eyebrow">{post.category}</p>
            <h1>{post.title}</h1>
            <p className="article-meta">
              <span>
                <Link href="/about">{site.founder.name}</Link> · {site.name}
              </span>
              <span>
                발행 <time dateTime={post.date}>{post.date.replace(/-/g, ".")}</time>
              </span>
              {post.updated && (
                <span>
                  수정 <time dateTime={post.updated}>{post.updated.replace(/-/g, ".")}</time>
                </span>
              )}
              <span>읽는 시간 약 {post.readingMinutes}분</span>
            </p>
          </div>
        </header>

        <div className="container narrow">
          <aside className="article-summary" aria-label="요약">
            <p>요약</p>
            <ul>
              {post.summary.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </aside>

          {post.image && (
            <img src={post.image} alt={post.imageAlt ?? post.title} width={1200} height={630} loading="lazy" decoding="async" />
          )}

          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.keyPoints.length > 0 && (
            <section className="key-points" aria-labelledby="key-points-title">
              <h2 id="key-points-title">핵심 정리</h2>
              <ul>
                {post.keyPoints.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </section>
          )}

          {post.tags.length > 0 && (
            <ul className="tag-list" aria-label="태그">
              {post.tags.map((t) => (
                <li key={t}>
                  <span>#{t}</span>
                </li>
              ))}
            </ul>
          )}

          {relatedServices.length > 0 && (
            <section aria-labelledby="related-services-title">
              <h2 id="related-services-title">관련 서비스</h2>
              <ul>
                {relatedServices.map((s) => (
                  <li key={s.key}>
                    <Link href={s.path}>{s.name}</Link> — {s.summary}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedFaqs.length > 0 && (
            <section aria-labelledby="related-faq-title">
              <h2 id="related-faq-title">관련 FAQ</h2>
              <ul>
                {relatedFaqs.map((f) => (
                  <li key={f.id}>
                    <Link href={`/faq#${f.id}`}>{f.question}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="author-box" aria-label="작성자 정보">
            <img src={site.founder.image} alt={`${site.founder.name} 대표 프로필 사진`} width={72} height={72} loading="lazy" decoding="async" />
            <div>
              <p className="author-name">
                {site.founder.name} ({site.founder.alias}) · {site.name} {site.founder.jobTitle}
              </p>
              <p className="author-desc">{site.founder.description}</p>
              <p className="author-desc">
                <Link href="/about">대표 소개 보기 →</Link>
              </p>
            </div>
          </section>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section alt" aria-labelledby="related-posts-title">
          <div className="container">
            <h2 id="related-posts-title">관련 글</h2>
            <div className="grid grid-3">
              {related.map((p) => (
                <InsightCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
