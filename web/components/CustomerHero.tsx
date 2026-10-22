import Link from "next/link";

import { Breadcrumb, JsonLd, breadcrumbLd } from "@/components/PageKit";
import { ShootTile, type ShootKind } from "@/components/ShootArt";
import { TypingHint } from "@/components/TypingHint";

const QUICK: { kind: ShootKind; label: string }[] = [
  { kind: "portrait", label: "Chân dung" },
  { kind: "fashion", label: "Thời trang" },
  { kind: "product", label: "Sản phẩm" },
  { kind: "wedding", label: "Cặp đôi" },
];

const HINTS = ["Chụp headshot cho CV", "Lookbook 8 ảnh cho shop", "Pre-wedding ngoài trời", "Ảnh mỹ phẩm nền trắng"];

const STATUS = [
  { label: "Đã đặt lịch", done: true },
  { label: "Đã có báo giá", done: true },
  { label: "Đang đến buổi chụp", done: false },
];

export function CustomerHero() {
  return (
    <section className="customer-hero relative overflow-hidden bg-white text-[#1a2744]">
      <JsonLd data={breadcrumbLd("Dành cho khách", "/khach-hang")} />
      <div className="customer-hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pb-14 lg:pt-12">
        <div>
          <Breadcrumb crumb="Dành cho khách" />
          <p
            className="hero-up mt-8 inline-flex items-center gap-2 rounded-full bg-[#fff0f6] px-3.5 py-1.5 text-[12.5px] font-bold text-[#e3146f] ring-1 ring-pink-100"
            style={{ animationDelay: "80ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e3146f] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e3146f]" />
            </span>
            Dành cho khách hàng
          </p>
          <h1
            className="hero-up mt-5 text-[2.2rem] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-[2.9rem] lg:text-[2.75rem] xl:text-[3.2rem]"
            style={{ animationDelay: "160ms" }}
          >
            Cần Mẫu Ảnh Cho Buổi Chụp?{" "}
            <span className="mt-1 block">
              Chọn <span className="customer-mark">Mẫu Đúng Concept</span>
            </span>
          </h1>
          <p className="hero-up mt-5 max-w-xl text-[17px] leading-8 text-stone-600" style={{ animationDelay: "240ms" }}>
            Mô tả yêu cầu buổi chụp, xem portfolio và chọn mẫu ảnh phù hợp phong cách của bạn. Chốt giá trên đơn, theo dõi đến khi buổi chụp xong.
          </p>

          <Link
            href="/tai-ung-dung"
            className="customer-search hero-up mt-8 flex max-w-xl items-center gap-3 rounded-full bg-white p-2 pl-5 ring-1 ring-stone-200"
            style={{ animationDelay: "320ms" }}
            aria-label="Tải ứng dụng để đặt lịch chụp"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <span className="min-w-0 flex-1 truncate text-[15.5px]">
              <TypingHint phrases={HINTS} />
            </span>
            <span className="shrink-0 rounded-full bg-[#e3146f] px-5 py-3 text-[14.5px] font-semibold text-white transition-colors">
              Đặt lịch
            </span>
          </Link>

          <div className="hero-up mt-5 flex flex-wrap items-center gap-2" style={{ animationDelay: "400ms" }}>
            {QUICK.map((item) => (
              <Link
                key={item.label}
                href="#nhom-viec"
                className="customer-chip inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3.5 text-[13.5px] font-semibold text-[#1a2744] ring-1 ring-stone-200"
              >
                <ShootTile kind={item.kind} small className="h-7 w-7 rounded-full" />
                {item.label}
              </Link>
            ))}
            <Link href="#nhom-viec" className="cta-more ml-1 text-[13.5px] font-semibold text-[#e3146f]">
              Xem kiểu buổi chụp <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="hero-scale relative mx-auto w-full max-w-[440px]" style={{ animationDelay: "220ms" }} aria-hidden>
          <div className="absolute inset-x-6 -bottom-4 top-6 rotate-[4deg] rounded-[2rem] bg-[#e3146f]" />
          <div className="absolute inset-x-3 -bottom-2 top-3 rotate-[2deg] rounded-[2rem] bg-[#ffd2a6]" />

          <div className="relative rounded-[2rem] bg-white p-5 shadow-[0_30px_60px_rgba(26,39,68,0.14)] ring-1 ring-stone-100 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-stone-400">Đơn của bạn</p>
              <span className="rounded-full bg-[#e9f8ef] px-2.5 py-1 text-[11.5px] font-bold text-[#1f9254]">Đang xử lý</span>
            </div>

            <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#f7f8fb] p-3">
              <ShootTile kind="fashion" small className="h-16 w-16 shrink-0 rounded-xl" />
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-[#e3146f]">Thời trang</p>
                <p className="text-[15.5px] font-bold leading-snug">Lookbook thu đông, cần 1 mẫu nữ</p>
                <p className="mt-0.5 flex items-center gap-1 text-[12.5px] text-stone-500">
                  <img src="/radius-pin.webp" alt="" className="h-3.5 w-3.5 object-contain" />
                  Studio · Quận 3
                </p>
              </div>
            </div>

            <ol className="mt-5 space-y-3">
              {STATUS.map((step, index) => (
                <li key={step.label} className="flex items-center gap-3">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                      step.done ? "bg-[#1a2744] text-white" : "customer-pulse bg-[#e3146f] text-white"
                    }`}
                  >
                    {step.done ? "✓" : index + 1}
                  </span>
                  <span className={`text-[14.5px] ${step.done ? "text-stone-500" : "font-semibold text-[#1a2744]"}`}>{step.label}</span>
                  {!step.done ? <span className="customer-dots ml-auto flex gap-1"><i /><i /><i /></span> : null}
                </li>
              ))}
            </ol>

            <div className="mt-5 flex items-center gap-3 border-t border-dashed border-stone-200 pt-4">
              <img src="/avatar-2.webp" alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-white" />
              <div className="min-w-0 flex-1">
                <p className="text-[14.5px] font-bold">Mẫu ảnh bạn đã chọn</p>
                <p className="text-[12.5px] text-stone-500">Hồ sơ đã xét duyệt · gần địa điểm</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0f6]">
                <img src="/radius-chat.webp" alt="" className="h-6 w-6 object-contain" />
              </span>
            </div>
          </div>

          <div className="float-b absolute -bottom-7 left-2 hidden items-center gap-2 rounded-2xl bg-white py-2 pl-2 pr-3.5 text-[13px] font-semibold shadow-[0_16px_34px_rgba(26,39,68,0.14)] ring-1 ring-stone-100 sm:flex lg:-left-8">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#fff0f6]">
              <img src="/coin-dollar.webp" alt="" className="h-5 w-5 object-contain" />
            </span>
            Giá chốt trên đơn
          </div>
          <div className="float-c absolute -top-10 right-0 hidden items-center gap-2 rounded-2xl bg-[#1a2744] py-2 pl-2 pr-3.5 text-[13px] font-semibold text-white shadow-[0_16px_34px_rgba(26,39,68,0.25)] sm:flex xl:-right-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
              <img src="/ai-robot-v3.webp" alt="" className="h-6 w-6 object-contain" />
            </span>
            Trợ lý AI gợi ý mẫu ảnh
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:pb-16" aria-hidden>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex shrink-0 items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-[12.5px] font-semibold ring-1 ring-stone-200">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff0f6]">
              <img src="/radius-pin.webp" alt="" className="h-4 w-4 object-contain" />
            </span>
            <span className="hidden sm:inline">Mẫu đúng yêu cầu</span>
          </span>
          <div className="relative h-12 flex-1">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#f1d3b5]" />
            <span className="customer-track-fill absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#e3146f]" />
            <div className="customer-track-run absolute inset-y-0 left-0 right-12">
              <span className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white ring-2 ring-[#e3146f]">
                <img src="/avatar-2.webp" alt="" className="h-10 w-10 rounded-full object-cover" />
              </span>
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-2 rounded-full bg-[#1a2744] py-1.5 pl-1.5 pr-3.5 text-[12.5px] font-semibold text-white">
            <span className="customer-track-home flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
              <img src="/float-house-out.webp" alt="" className="h-5 w-5 object-contain" />
            </span>
            Nhà bạn
          </span>
        </div>
      </div>
    </section>
  );
}
