import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Nunito, Playfair_Display } from "next/font/google";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";

import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be",
});

const nunito = Nunito({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  preload: false,
});

const TITLE = "CastNow – Đặt lịch mẫu ảnh đúng concept";
const DESCRIPTION =
  "Chọn mẫu ảnh phù hợp yêu cầu buổi chụp: chân dung, thời trang, sản phẩm, cưới và sự kiện. Xem portfolio, so hồ sơ và chốt giá trên đơn.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · CastNow",
  },
  description: DESCRIPTION,
  applicationName: "CastNow",
  keywords: [
    "đặt lịch mẫu ảnh",
    "thuê mẫu ảnh",
    "đặt lịch chụp ảnh",
    "chụp ảnh chân dung",
    "chụp lookbook",
    "chụp ảnh sản phẩm",
    "chụp ảnh cưới",
    "chụp ảnh sự kiện",
    "CastNow",
  ],
  authors: [{ name: "LITETECH COMPANY LIMITED" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "CastNow",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [{ url: "/og-castnow.png", width: 1200, height: 630, alt: "CastNow – Đặt lịch mẫu ảnh đúng concept" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-castnow.png"] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#e3146f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.variable} ${nunito.variable} ${playfair.variable} font-sans antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
