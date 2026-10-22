import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CastNow – Đặt lịch mẫu ảnh đúng concept",
    short_name: "CastNow",
    description: "Chọn mẫu ảnh phù hợp yêu cầu. Xem portfolio, chốt giá trên đơn.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e3146f",
    lang: "vi",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
