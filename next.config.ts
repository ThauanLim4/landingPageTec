import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `output: "standalone"` quebra o deploy na Vercel com Next 16.3
  // (bug upstream: vercel/next.js#96646 — ENOENT em .next/next-server.js.nft.json).
  // A Vercel monta o deploy por conta própria e não usa o standalone.
  trailingSlash: false,
};

export default nextConfig;
