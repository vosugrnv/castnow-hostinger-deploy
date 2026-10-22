import Link from "next/link";

import { Breadcrumb, ButtonLink, JsonLd, breadcrumbLd } from "@/components/PageKit";
import { COMPANY } from "@/lib/site";

const POINTS = [
  { value: "10km", label: "Bán kính ưu tiên", note: "Mẫu ảnh gần địa điểm chụp" },
  { value: "63", label: "Tỉnh thành", note: "Phủ rộng trên toàn quốc" },
  { value: "1", label: "Đơn thống nhất", note: "Brief, giá và thanh toán" },
];

export function AboutHero() {
  return (
    <section className="about-hero relative overflow-hidden" aria-labelledby="about-hero-title">
      <JsonLd data={breadcrumbLd("Về CastNow", "/gioi-thieu")} />
      <div className="about-hero-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="about-hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="about-hero-glow about-hero-glow-a pointer-events-none absolute" aria-hidden />
      <div className="about-hero-glow about-hero-glow-b pointer-events-none absolute" aria-hidden />
      <div className="about-hero-line pointer-events-none absolute inset-y-0 left-1/2 hidden w-px lg:block" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:pb-20 lg:pt-12">
        <Breadcrumb crumb="Về CastNow" />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-0 lg:pt-2">
          <div className="flex flex-col justify-center lg:pr-14 xl:pr-16">
            <p
              className="hero-up flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.28em] text-[#e3146f]"
              style={{ animationDelay: "60ms" }}
            >
              <span className="h-px w-8 bg-[#e3146f]" />
              Về CastNow
            </p>
            <h1
              id="about-hero-title"
              className="hero-up mt-5 text-[2.35rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#1a2744] sm:text-[3rem] lg:text-[3.15rem]"
              style={{ animationDelay: "140ms" }}
            >
              Buổi chụp gặp{" "}
              <span className="font-serif font-semibold italic tracking-[-0.01em] text-[#e3146f]">đúng mẫu ảnh</span>
            </h1>
            <p
              className="hero-up mt-5 max-w-md text-[16.5px] leading-8 text-stone-600"
              style={{ animationDelay: "220ms" }}
            >
              CastNow do <span className="font-semibold text-[#1a2744]">{COMPANY}</span> phát triển — nền tảng đặt lịch mẫu ảnh,
              không còn phụ thuộc tin nhắn truyền miệng.
            </p>
            <div className="hero-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "300ms" }}>
              <ButtonLink href="/tai-ung-dung">Tải ứng dụng</ButtonLink>
              <ButtonLink href="/khach-hang" variant="ghost">
                Cách đặt lịch →
              </ButtonLink>
            </div>
            <p className="hero-up mt-8 text-[13.5px] text-stone-400" style={{ animationDelay: "360ms" }}>
              Cần hỗ trợ?{" "}
              <Link href="/lien-he" className="font-semibold text-[#e3146f] hover:underline">
                Liên hệ CastNow
              </Link>
            </p>
          </div>

          <div className="flex flex-col justify-center border-t border-pink-200/70 pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0 xl:pl-16">
            <p
              className="hero-up text-[12px] font-bold uppercase tracking-[0.24em] text-stone-400"
              style={{ animationDelay: "120ms" }}
            >
              CastNow trong một nhìn
            </p>
            <ul className="mt-6 space-y-0">
              {POINTS.map((item, index) => (
                <li
                  key={item.label}
                  className="hero-up about-hero-stat grid grid-cols-[5.5rem_1fr] items-center gap-4 border-b border-pink-100 py-5 last:border-b-0 sm:grid-cols-[6.5rem_1fr] sm:gap-6"
                  style={{ animationDelay: `${180 + index * 80}ms` }}
                >
                  <span className="font-serif text-[2.4rem] font-semibold italic leading-none tracking-[-0.03em] text-[#e3146f] sm:text-[2.75rem]">
                    {item.value}
                  </span>
                  <span>
                    <span className="block text-[16px] font-bold tracking-[-0.01em] text-[#1a2744]">{item.label}</span>
                    <span className="mt-1 block text-[14px] leading-6 text-stone-500">{item.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
