import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // admin-web là app Next.js độc lập — bảng quản trị CastNow.
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
