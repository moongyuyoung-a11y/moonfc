import type { NextConfig } from "next";

/**
 * GitHub Pages 프로젝트 사이트(https://<user>.github.io/moonfc/)처럼 하위 경로에 배포할 때만
 * NEXT_PUBLIC_BASE_PATH="/moonfc" 를 넣는다. 커스텀 도메인(mcg.co.kr)·Vercel 에서는 비워 둔다.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  // 서버 없이 정적 파일만 생성 (Vercel / 어떤 정적 호스팅에도 배포 가능)
  output: "export",
  trailingSlash: false,
  images: {
    // 정적 export에서는 이미지 최적화 서버가 없으므로 미리 WebP로 변환해 둔 파일을 그대로 씀
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
