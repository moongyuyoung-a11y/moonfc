/**
 * 정적 빌드(out/)를 로컬 서버로 띄우고 Lighthouse(모바일)를 돌린다.
 * 사전 준비: npm run build. lighthouse 는 npx --yes 로 실행되므로 별도 설치 불필요 (네트워크 필요)
 * Chrome 경로가 자동 탐지되지 않으면 CHROME_PATH 환경변수를 지정
 * 사용: node scripts/lighthouse.mjs [경로...]
 * 결과: reports/lighthouse-*.json, 콘솔 요약
 */
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PORT = 4173;
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/consulting", "/fc-education", "/insights", "/insights/gym-sales-structure-diagnosis", "/about", "/contact", "/faq"];
const reportsDir = path.join(process.cwd(), "reports");
fs.mkdirSync(reportsDir, { recursive: true });

const server = spawn(process.execPath, [path.join(process.cwd(), "scripts", "serve-static.mjs"), String(PORT)], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 2500));

const chrome = process.env.CHROME_PATH ?? "";
const results = [];
try {
  for (const p of pages) {
    const name = p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_");
    const out = path.join(reportsDir, `lighthouse-${name}.json`);
    execSync(
      `npx --yes lighthouse http://localhost:${PORT}${p} --quiet --output=json --output-path=${out} --form-factor=mobile --chrome-flags="--headless=new --no-sandbox --disable-gpu" ${chrome ? `--chrome-path=${chrome}` : ""}`,
      { stdio: "inherit", env: { ...process.env, CHROME_PATH: chrome || process.env.CHROME_PATH } },
    );
    const r = JSON.parse(fs.readFileSync(out, "utf8"));
    const c = r.categories;
    results.push({
      page: p,
      performance: Math.round(c.performance.score * 100),
      accessibility: Math.round(c.accessibility.score * 100),
      "best-practices": Math.round(c["best-practices"].score * 100),
      seo: Math.round(c.seo.score * 100),
    });
  }
} finally {
  server.kill();
}
console.table(results);
