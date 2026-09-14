import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllInsights } from "@/lib/insights";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllInsights();
  const latest = posts[0]?.updated ?? posts[0]?.date;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/consulting"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/fc-education"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/lecture"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/insights"), lastModified: latest ? new Date(latest) : now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/insights/${p.slug}`),
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}
