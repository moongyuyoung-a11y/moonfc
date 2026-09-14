import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
