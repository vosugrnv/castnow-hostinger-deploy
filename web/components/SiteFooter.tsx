import Link from "next/link";

import { FooterNetwork } from "@/components/FooterNetwork";
import { COMPANY, SOCIALS, SUPPORT_EMAIL } from "@/lib/site";

const SOCIAL_ICONS: Record<(typeof SOCIALS)[number]["id"], { bg: string; path: string }> = {
  facebook: {
    bg: "#3b5998",
    path: "M13.6 21v-7.4h2.5l.4-2.9h-2.9V8.9c0-.8.2-1.4 1.4-1.4h1.6V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.1H7.9v2.9h2.6V21h3.1z",
  },
  twitter: {
    bg: "#1da1f2",
    path: "M21.5 6.6c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.4.9a3.8 3.8 0 0 0-6.5 3.5A10.8 10.8 0 0 1 4.2 5.5a3.8 3.8 0 0 0 1.2 5.1c-.6 0-1.2-.2-1.7-.5 0 1.9 1.3 3.4 3.1 3.8-.6.2-1.1.2-1.7.1.5 1.5 1.9 2.6 3.6 2.7A7.6 7.6 0 0 1 3 18.3 10.8 10.8 0 0 0 8.8 20c7 0 10.8-5.8 10.8-10.8v-.5c.8-.6 1.4-1.2 1.9-2.1z",
  },
  youtube: {
    bg: "#e62117",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12c0 1.6.1 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8zM10 15V9l5.2 3L10 15z",
  },
  tiktok: {
    bg: "#000000",
    path: "M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.4-2.5V9.6a5.8 5.8 0 0 0-6.5 5.8 5.8 5.8 0 0 0 5.8 5.6 5.8 5.8 0 0 0 5.8-5.8V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.4-1.6z",
  },
};

const LINK_GROUPS = [
  {
    title: "Khám phá",
    links: [
      ["/gioi-thieu", "Về CastNow"],
      ["/mau-anh-nhiep-anh-gia", "Mẫu ảnh"],
      ["/khach-hang", "Đặt lịch chụp"],
      ["/nhan-lich-chup", "Nhận lịch chụp"],
      ["/huong-dan-dat-lich", "Hướng dẫn đặt lịch"],
      ["/blog", "Blog"],
      ["/tai-ung-dung", "Tải ứng dụng"],
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      ["/cau-hoi", "Câu hỏi thường gặp"],
      ["/lien-he", "Liên hệ"],
      ["/dieu-khoan-su-dung", "Điều khoản sử dụng"],
      ["/bao-mat", "Bảo mật"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#1a2744] text-white">
      <FooterNetwork />
      <div className="relative mx-auto max-w-6xl px-4 pb-4 pt-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)_minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-10">
          <div className="max-w-xs">
            <Link href="/" className="flex w-fit items-center gap-3">
              <img src="/logo-castnow.webp" alt="" className="h-11 w-11 rounded-xl object-cover" />
              <span className="text-[22px] font-extrabold tracking-[-0.02em]">
                Cast<span className="text-[#ff3d7f]">Now</span>
              </span>
            </Link>
            <p className="mt-5 text-[15px] leading-7 text-white/65">
              Đặt lịch mẫu ảnh. Xem hồ sơ, chốt giờ và báo giá ngay trên CastNow.
            </p>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-[17px] font-bold tracking-[-0.01em]">{group.title}</p>
              <ul className="mt-5 space-y-3 text-[15px] text-white/65">
                {group.links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href} className="footer-link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[17px] font-bold tracking-[-0.01em]">Theo dõi chúng tôi</p>
            <div className="mt-5 flex items-center gap-2.5">
              {SOCIALS.map((social) => {
                const icon = SOCIAL_ICONS[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="footer-social flex h-10 w-10 items-center justify-center rounded-full text-white ring-1 ring-white/20"
                    style={{ backgroundColor: icon.bg }}
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden>
                      <path d={icon.path} />
                    </svg>
                  </a>
                );
              })}
            </div>
            <Link
              href="/lien-he"
              className="footer-cta mt-6 inline-flex items-center gap-2 rounded-full bg-[#e3146f] px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#ff3d7f]"
            >
              Liên hệ hỗ trợ <span aria-hidden>→</span>
            </Link>
            <p className="mt-3 text-[14px] text-white/65">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="footer-link">{SUPPORT_EMAIL}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-6xl overflow-hidden px-4 sm:px-6" aria-hidden>
        <p className="footer-word flex select-none justify-center pt-6 text-[19vw] font-extrabold leading-[0.8] tracking-[-0.05em] lg:text-[13.5rem]">
          {"CastNow".split("").map((letter, index) => (
            <span key={index} style={{ transitionDelay: `${index * 30}ms`, animationDelay: `${index * 0.18}s` }}>
              {letter}
            </span>
          ))}
        </p>
      </div>
      <div className="relative bg-[#141f38]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {COMPANY}. CastNow là nền tảng kết nối, không trực tiếp cung cấp dịch vụ chụp ảnh.
          </p>
          <div className="flex shrink-0 gap-5">
            <Link href="/bao-mat" className="footer-link">Bảo mật</Link>
            <Link href="/dieu-khoan-su-dung" className="footer-link">Điều khoản</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
