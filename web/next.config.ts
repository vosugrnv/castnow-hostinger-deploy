import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async rewrites() {
    return [
      {
        source: "/mau-anh-nhiep-anh-gia-:city([a-z0-9-]+)",
        destination: "/mau-anh-nhiep-anh-gia/thanh-pho/:city",
      },
    ];
  },
  async redirects() {
    return [
      { source: "/tho-tai-nha-:city([a-z0-9-]+)", destination: "/mau-anh-nhiep-anh-gia-:city", permanent: true },
      { source: "/tho-tai-nha/thanh-pho/:city", destination: "/mau-anh-nhiep-anh-gia-:city", permanent: true },
      { source: "/tho-tai-nha", destination: "/mau-anh-nhiep-anh-gia", permanent: true },
      { source: "/tho-tai-nha/:path+", destination: "/mau-anh-nhiep-anh-gia/:path+", permanent: true },
      { source: "/tho", destination: "/nhan-lich-chup", permanent: true },
      { source: "/huong-dan-dat-tho", destination: "/huong-dan-dat-lich", permanent: true },
    ];
  },
};

export default nextConfig;
