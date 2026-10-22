"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/gioi-thieu", label: "Về CastNow" },
  { href: "/khach-hang", label: "Đặt lịch" },
  { href: "/mau-anh-nhiep-anh-gia", label: "Mẫu ảnh" },
  { href: "/nhan-lich-chup", label: "Nhận lịch" },
  { href: "/blog", label: "Blog" },
  { href: "/cau-hoi", label: "Câu hỏi" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-pink-100/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/logo-castnow.webp" alt="" className="h-10 w-10 rounded-xl object-cover" />
          <span className="text-lg font-extrabold tracking-tight text-ink">
            Cast<span className="text-brand-500">Now</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm lg:gap-7 font-medium text-stone-600 md:flex">
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/nhan-lich-chup"
            className="hidden whitespace-nowrap rounded-full border border-brand-500 px-4 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-500 hover:text-white sm:inline-flex md:hidden lg:inline-flex"
          >
            Nhận lịch chụp
          </Link>
          <Link
            href="/tai-ung-dung"
            className="whitespace-nowrap rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-600"
          >
            Tải ứng dụng
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 text-ink md:hidden"
            aria-expanded={open}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-pink-100 bg-white px-4 py-3 md:hidden">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-3 text-sm font-medium text-stone-700 hover:bg-brand-50"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/nhan-lich-chup"
            className="mt-2 block rounded-full border border-brand-500 px-4 py-2.5 text-center text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-500 hover:text-white sm:hidden"
            onClick={() => setOpen(false)}
          >
            Nhận lịch chụp
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
