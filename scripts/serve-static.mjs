/**
 * out/ 를 Vercel 정적 호스팅과 같은 규칙(/about → about.html)으로 서빙하는 로컬 서버.
 * 사용: node scripts/serve-static.mjs [port]
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = path.join(process.cwd(), "out");
const PORT = Number(process.argv[2] ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8", ".woff2": "font/woff2",
};

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/$/, "") || "/";
  const candidates = clean === "/" ? ["index.html"] : [clean, `${clean}.html`, path.join(clean, "index.html")];
  for (const c of candidates) {
    const p = path.join(ROOT, c);
    if (p.startsWith(ROOT) && fs.existsSync(p) && fs.statSync(p).isFile()) return { p, status: 200 };
  }
  return { p: path.join(ROOT, "404.html"), status: 404 };
}

http
  .createServer((req, res) => {
    const { p, status } = resolve(req.url ?? "/");
    const type = TYPES[path.extname(p)] ?? "application/octet-stream";
    const gzip = /\bgzip\b/.test(req.headers["accept-encoding"] ?? "") && /^(text\/|application\/(json|xml|javascript))/.test(type);
    res.writeHead(status, {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
      ...(gzip ? { "Content-Encoding": "gzip" } : {}),
    });
    const stream = fs.createReadStream(p);
    (gzip ? stream.pipe(zlib.createGzip()) : stream).pipe(res);
  })
  .listen(PORT, () => console.log(`serving out/ at http://localhost:${PORT}`));
