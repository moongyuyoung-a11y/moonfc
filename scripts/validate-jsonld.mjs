/**
 * 빌드 결과(out/)의 HTML 을 검사한다.
 *  - JSON-LD 파싱 및 @type 목록
 *  - title 30자 / description 80자 권장 길이
 *  - h1 개수(정확히 1), lang="ko", canonical, og:image, twitter:card
 *  - img alt / loading 속성
 * 사용: node scripts/validate-jsonld.mjs
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const REQUIRED_TYPES = {
  "index.html": ["Organization", "WebSite", "ProfessionalService", "Person"],
  "consulting.html": ["Service", "BreadcrumbList", "FAQPage"],
  "fc-education.html": ["Service", "BreadcrumbList", "FAQPage"],
  "lecture.html": ["Service", "BreadcrumbList", "FAQPage"],
  "about.html": ["Person", "ProfilePage", "BreadcrumbList"],
  "faq.html": ["FAQPage", "BreadcrumbList"],
  "contact.html": ["ContactPage", "BreadcrumbList"],
  "insights.html": ["Blog", "BreadcrumbList"],
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return d.name === "_next" ? [] : walk(p);
    return d.name.endsWith(".html") && !d.name.startsWith("_") && d.name !== "404.html" ? [p] : [];
  });
}

const problems = [];
const rows = [];

for (const file of walk(OUT)) {
  const rel = path.relative(OUT, file);
  const html = fs.readFileSync(file, "utf8");
  const types = new Set();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [, json] of blocks) {
    try {
      const data = JSON.parse(json);
      const nodes = data["@graph"] ?? [data];
      for (const n of nodes) {
        if (!n["@type"]) problems.push(`${rel}: JSON-LD node without @type`);
        else types.add(n["@type"]);
      }
      if (!data["@context"]) problems.push(`${rel}: JSON-LD without @context`);
    } catch (e) {
      problems.push(`${rel}: JSON-LD parse error: ${e.message}`);
    }
  }
  const req = REQUIRED_TYPES[rel] ?? (rel.startsWith("insights/") ? ["Article", "BreadcrumbList"] : []);
  for (const t of req) if (!types.has(t)) problems.push(`${rel}: missing JSON-LD type ${t}`);

  const title = (html.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? "";
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  const lang = /<html[^>]*lang="ko"/.test(html);
  const canonical = /<link rel="canonical"/.test(html);
  const og = /<meta property="og:image"/.test(html);
  const tw = /<meta name="twitter:card"/.test(html);
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const imgNoAlt = imgs.filter((i) => !/\balt="/.test(i)).length;
  const imgNoLazy = imgs.filter((i) => !/loading="(lazy|eager)"/.test(i)).length;

  // title 은 " | MOONFC" 접미사 제외 길이로 판단
  const coreTitle = title.replace(/ \| MOONFC$/, "");
  if (coreTitle.length > 30) problems.push(`${rel}: title ${coreTitle.length}자 (권장 30자 이내): ${coreTitle}`);
  if (desc.length > 80) problems.push(`${rel}: description ${desc.length}자 (권장 80자 이내)`);
  if (!desc) problems.push(`${rel}: description 없음`);
  if (h1 !== 1) problems.push(`${rel}: h1 ${h1}개`);
  if (!lang) problems.push(`${rel}: lang="ko" 없음`);
  if (!canonical) problems.push(`${rel}: canonical 없음`);
  if (!og) problems.push(`${rel}: og:image 없음`);
  if (!tw) problems.push(`${rel}: twitter:card 없음`);
  if (imgNoAlt) problems.push(`${rel}: alt 없는 img ${imgNoAlt}개`);
  if (imgNoLazy) problems.push(`${rel}: loading 속성 없는 img ${imgNoLazy}개`);

  rows.push({ page: rel, title: coreTitle.length, desc: desc.length, h1, jsonld: [...types].join(",") });
}

console.table(rows);
for (const f of ["sitemap.xml", "robots.txt", "rss.xml", "llms.txt"]) {
  const ok = fs.existsSync(path.join(OUT, f));
  console.log(`${ok ? "✓" : "✗"} ${f}`);
  if (!ok) problems.push(`${f} 없음`);
}
if (problems.length) {
  console.log("\n문제:");
  for (const p of problems) console.log(" -", p);
  process.exit(1);
}
console.log("\n모든 검사 통과");
