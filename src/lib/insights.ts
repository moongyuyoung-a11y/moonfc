import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { ServiceKey } from "./site";

export type InsightMeta = {
  slug: string;
  title: string;
  /** <title> 태그용 짧은 제목 (30자 이내). 없으면 title 사용 */
  seoTitle?: string;
  /** meta description (80자 이내). 없으면 summary[0] 을 80자에서 자름 */
  description?: string;
  /** 요약 3줄: 목록·메타 description·GEO 첫 문단에 사용 */
  summary: string[];
  date: string; // YYYY-MM-DD
  updated?: string;
  category: string;
  tags: string[];
  /** 관련 서비스 (내부 링크용) */
  service: ServiceKey[];
  /** 관련 FAQ id */
  faq: string[];
  /** 핵심 정리 */
  keyPoints: string[];
  image?: string;
  imageAlt?: string;
  draft?: boolean;
};

export type Insight = InsightMeta & { html: string; readingMinutes: number };

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

function readAll(): { slug: string; raw: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      slug: f.replace(/\.md$/, ""),
      raw: fs.readFileSync(path.join(CONTENT_DIR, f), "utf8"),
    }));
}

function toMeta(slug: string, data: Record<string, unknown>): InsightMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    description: data.description ? String(data.description) : undefined,
    summary: Array.isArray(data.summary) ? data.summary.map(String) : [String(data.summary ?? "")],
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    category: String(data.category ?? "인사이트"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    service: Array.isArray(data.service) ? (data.service as ServiceKey[]) : [],
    faq: Array.isArray(data.faq) ? data.faq.map(String) : [],
    keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints.map(String) : [],
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    draft: Boolean(data.draft),
  };
}

export function getAllInsights(): InsightMeta[] {
  return readAll()
    .map(({ slug, raw }) => toMeta(slug, matter(raw).data))
    .filter((m) => !m.draft && m.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsightsByService(service: ServiceKey, limit = 3): InsightMeta[] {
  return getAllInsights()
    .filter((m) => m.service.includes(service))
    .slice(0, limit);
}

export function getRelatedInsights(current: InsightMeta, limit = 3): InsightMeta[] {
  const others = getAllInsights().filter((m) => m.slug !== current.slug);
  const score = (m: InsightMeta) =>
    m.service.filter((s) => current.service.includes(s)).length * 2 +
    m.tags.filter((t) => current.tags.includes(t)).length;
  return others
    .map((m) => ({ m, s: score(m) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.m);
}

export async function getInsight(slug: string): Promise<Insight | null> {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);
  const html = String(processed);
  const words = content.replace(/\s+/g, "").length;
  return {
    ...toMeta(slug, data),
    html,
    readingMinutes: Math.max(1, Math.round(words / 500)),
  };
}
