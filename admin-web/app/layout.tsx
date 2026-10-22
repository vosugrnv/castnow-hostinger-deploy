import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdminAuthProvider } from "@/components/AdminAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CastNow — Bảng quản trị",
  description: "Điều hành đặt mẫu ảnh, người dùng và đối tác CastNow",
  icons: { icon: "/favicon.png", apple: "/logo-castnow.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AdminAuthProvider>{children}</AdminAuthProvider>
      </body>
    </html>
  );
}
