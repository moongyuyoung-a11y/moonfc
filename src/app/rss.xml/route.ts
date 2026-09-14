import { absoluteUrl, site } from "@/lib/site";
import { getAllInsights } from "@/lib/insights";

export const dynamic = "force-static";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const posts = getAllInsights();
  const lastBuild = posts[0] ? new Date(posts[0].updated ?? posts[0].date).toUTCString() : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/insights/${p.slug}`);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.summary.join(" "))}</description>
      <category>${esc(p.category)}</category>
      <author>${esc(site.founder.name)}</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${site.name} ${site.nameEn} 인사이트`)}</title>
    <link>${absoluteUrl("/insights")}</link>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
    <description>${esc(site.shortDescription)}</description>
    <language>ko</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
