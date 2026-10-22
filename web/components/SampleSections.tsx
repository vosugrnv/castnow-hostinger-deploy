"use client";

import { useEffect, useRef, useState } from "react";

import { AppHomeMock } from "@/components/AppHomeMock";
import { ShootTile, type ShootKind } from "@/components/ShootArt";
import { APP_STORE_URL as APP_STORE, PLAY_STORE_URL as PLAY_STORE, STEPS } from "@/lib/site";

const CHIPS = [
  "Chân dung",
  "Thời trang",
  "Sản phẩm",
  "Cưới",
  "Sự kiện",
  "Gia đình",
  "Ngoại cảnh",
  "Thương mại",
  "Mẫu ảnh",
  "Lookbook",
];

const STATS = [
  { to: 8, suffix: "", label: "Kiểu buổi chụp" },
  { to: 63, suffix: "", label: "Tỉnh thành trong app" },
  { to: 10, suffix: " km", label: "Gần địa điểm chụp" },
];

export function StoreButton({ href, store, apple }: { href: string; store: string; apple?: boolean }) {
  return (
    <a href={href} className="flex min-w-[150px] items-center gap-2.5 rounded-xl bg-[#172033] px-3.5 py-2 text-white">
      {apple ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
          <path d="M16.4 12.7c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8s-1.7-.8-2.8-.8c-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7 1.9-1.1 2.6-2.1c.8-1.2 1.1-2.3 1.2-2.4-.1 0-2.2-.8-2.2-3.7zM14.7 6.8c.6-.7 1-1.7.9-2.8-1 .1-2.1.6-2.8 1.4-.6.7-1.1 1.8-.9 2.8 1.1.1 2.1-.5 2.8-1.4z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
          <path fill="#34a853" d="M3 20.5 13.5 12 3 3.5v17z" />
          <path fill="#fbbc04" d="M16.8 14.7 13.5 12l3.3-2.7 4.2 2.4c.7.4.7 1.2 0 1.6l-4.2 2.4z" />
          <path fill="#4285f4" d="M3 3.5 13.5 12l3.3-2.7L5.2 2.2C4.3 1.7 3 2.3 3 3.5z" />
          <path fill="#ea4335" d="M13.5 12 3 20.5c0 1.2 1.3 1.8 2.2 1.3l11.6-6.8L13.5 12z" />
        </svg>
      )}
      <span>
        <span className="block text-[10px] leading-3 text-white/70">Tải từ</span>
        <span className="block text-sm font-bold leading-4">{store}</span>
      </span>
    </a>
  );
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    let started = false;

    const run = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setValue(to);
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setValue(Math.round(eased * to));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        run();
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function DownloadStrip() {
  return (
    <section className="relative z-10 bg-white pb-2">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white px-3 py-3.5 shadow-[0_12px_28px_rgba(26,39,68,0.05)] sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-6">
          <dl className="grid grid-cols-3 divide-x divide-stone-200 lg:min-w-[420px]">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-2 text-center sm:px-5">
                <dt className="text-[26px] font-extrabold leading-none tracking-tight text-[#1a2744] sm:text-[30px]">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </dt>
                <dd className="mt-1.5 text-[11px] leading-4 text-stone-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
          <div className="hidden h-11 w-px shrink-0 bg-stone-200 lg:block" />
          <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-end">
            <StoreButton href={APP_STORE} store="App Store" apple />
            <StoreButton href={PLAY_STORE} store="Google Play" />
            <div className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-[#f7f8fb] py-1 pl-1 pr-3">
              <img src="/qr-castnow.png" alt="Mã QR tải CastNow" className="h-12 w-12 rounded-lg bg-white p-0.5" />
              <p className="max-w-[88px] text-[11px] leading-4 text-stone-500">Quét mã QR để tới ứng dụng</p>
            </div>
          </div>
        </div>
      </div>
      <div className="group relative mt-6 overflow-hidden py-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
        <div className="chip-track flex w-max flex-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {CHIPS.map((label) => (
                <span
                  key={`${copy}-${label}`}
                  className="mx-1.5 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-[#1a2744] shadow-[0_8px_18px_rgba(26,39,68,0.06)] ring-1 ring-pink-100"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5c93]" />
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AppCta() {
  return (
    <section id="tai-app" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="cta-card relative overflow-hidden rounded-[2rem] border border-pink-100 bg-[#fff5f9] px-5 py-10 text-[#1a2744] sm:px-10 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ffdcec]" />
          <div className="pointer-events-none absolute -bottom-32 right-40 h-56 w-56 rounded-full bg-[#ffecf4]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:gap-14">
            <div>
              <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#e3146f]">
                <span className="h-px w-8 bg-[#e3146f]" />
                Tải CastNow
              </p>
              <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.15] tracking-[-0.03em] sm:text-[2.5rem]">
                Sắp Có Buổi Chụp?
                <br />
                Đặt mẫu ảnh <span className="brand-text">ngay trên CastNow.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-7 text-stone-600">
                Kể concept với trợ lý AI, chọn mẫu ảnh gần địa điểm và theo dõi lịch đến khi buổi chụp xong.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14.5px] font-semibold">
                {["Người gần địa điểm", "Chốt giá trên đơn", "Thanh toán trong app"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e3146f] text-white">
                      <svg viewBox="0 0 20 20" className="h-3 w-3 fill-none stroke-current" strokeWidth="3" aria-hidden>
                        <path d="M4.5 10.5l3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="cta-store">
                  <StoreButton href={APP_STORE} store="App Store" apple />
                </span>
                <span className="cta-store">
                  <StoreButton href={PLAY_STORE} store="Google Play" />
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[340px]">
              <img
                src="/float-star-out.webp"
                alt=""
                className="float-a pointer-events-none absolute -right-4 -top-12 z-10 h-24 w-24 object-contain drop-shadow-[0_14px_18px_rgba(26,39,68,0.18)] sm:-right-8 sm:h-28 sm:w-28"
              />
              <div className="cta-qr relative rounded-[1.6rem] bg-white p-6 text-center ring-1 ring-pink-100">
                <img src="/qr-castnow.png" alt="Mã QR tải CastNow" className="mx-auto h-40 w-40 rounded-2xl" />
                <p className="mt-4 text-[17px] font-bold tracking-[-0.01em]">Quét mã để tải app</p>
                <p className="mt-1 text-[14px] text-stone-500">Mở camera điện thoại và quét để tới ứng dụng CastNow</p>
                <a href="/cau-hoi" className="cta-more mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#e3146f]">
                  Câu hỏi thường gặp <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({
  index,
  kind,
  title,
  body,
  closer,
  tone,
  href,
}: {
  index: number;
  kind: ShootKind;
  title: string;
  body: string;
  closer: string;
  tone: { bg: string; fg: string; spot: string };
  href: string;
}) {
  return (
    <li
      className="service-card relative flex min-h-[230px] flex-col overflow-hidden rounded-3xl bg-white"
      style={{ "--card": tone.fg } as React.CSSProperties}
    >
      <div className="relative m-2 mb-0">
        <ShootTile kind={kind} className="aspect-[4/3] w-full rounded-[1.1rem]" alt={title} />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-[0.14em] text-[#1a2744] shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="relative flex flex-1 flex-col p-5 pt-4">
        <h3 className="text-lg font-extrabold leading-snug tracking-tight text-[#1a2744]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
        <a href={href} className="mt-auto pt-4 text-sm font-semibold leading-6" style={{ color: tone.fg }}>
          {closer} <span aria-hidden>→</span>
        </a>
      </div>
    </li>
  );
}

function PhoneStage({ index }: { index: number }) {
  return (
    <div className="relative mx-auto w-[300px] sm:w-[318px]">
      <img src="/icon3d-camera.webp" alt="" className="float-a pointer-events-none absolute -left-[4.5rem] -top-[4rem] z-20 hidden w-[104px] drop-shadow-[0_16px_20px_rgba(163,16,90,0.28)] lg:block" />
      <img src="/icon3d-chat.webp" alt="" className="float-b pointer-events-none absolute -right-[3rem] -top-[1.5rem] z-20 hidden w-[84px] drop-shadow-[0_14px_18px_rgba(163,16,90,0.26)] lg:block" />
      <img src="/icon3d-pin.webp" alt="" className="float-c pointer-events-none absolute -bottom-[5.5rem] -left-[4rem] z-20 hidden w-[92px] drop-shadow-[0_16px_20px_rgba(163,16,90,0.26)] lg:block" />
      <img src="/icon3d-calendar.webp" alt="" className="float-d pointer-events-none absolute -bottom-[2.5rem] -right-[2.75rem] z-20 hidden w-[88px] drop-shadow-[0_14px_18px_rgba(163,16,90,0.26)] lg:block" />
      {index === 0 && (
        <>
          <div className="pointer-events-none absolute left-full top-[28%] z-30 ml-4 hidden w-max rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_16px_34px_rgba(26,39,68,0.1)] ring-1 ring-slate-100 lg:block">
            <p className="whitespace-nowrap text-[15px] font-extrabold leading-none text-[#1a2744]">8 kiểu buổi chụp</p>
            <p className="mt-1 whitespace-nowrap text-[11px] text-stone-500">Trong một app</p>
          </div>
          <div className="pointer-events-none absolute right-full top-[24%] z-30 mr-3 hidden items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 shadow-[0_14px_30px_rgba(26,39,68,0.1)] ring-1 ring-pink-100 lg:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffeef5] text-[12px] font-extrabold text-[#ff3d7f]">5′</span>
            <span className="whitespace-nowrap text-[12px] font-bold text-[#1a2744]">Báo giá trong 5 phút</span>
          </div>
          <div className="pointer-events-none absolute bottom-[30%] left-full z-30 ml-4 hidden whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-[#1a2744] shadow-[0_14px_30px_rgba(26,39,68,0.1)] ring-1 ring-slate-100 lg:block">
            Người gần địa điểm
          </div>
        </>
      )}
      {index === 1 && (
        <>
          <div className="pointer-events-none absolute left-full top-[28%] z-30 ml-4 hidden w-max rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_16px_34px_rgba(26,39,68,0.1)] ring-1 ring-pink-100 lg:block">
            <p className="whitespace-nowrap text-[13px] font-extrabold text-[#ff3d7f]">Trợ lý AI</p>
            <p className="mt-1 whitespace-nowrap text-[11px] text-stone-500">Gợi ý kiểu chụp phù hợp</p>
          </div>
          <div className="pointer-events-none absolute bottom-[30%] left-full z-30 ml-4 hidden whitespace-nowrap rounded-full bg-white px-3 py-2 text-[12px] font-bold text-[#1a2744] shadow-[0_14px_30px_rgba(26,39,68,0.1)] ring-1 ring-slate-100 lg:block">
            Đính kèm moodboard
          </div>
        </>
      )}
      {index === 2 && (
        <div className="pointer-events-none absolute right-full top-[34%] z-30 mr-[-0.6rem] hidden w-max items-center gap-2 rounded-2xl bg-white px-2.5 py-2 shadow-[0_16px_34px_rgba(26,39,68,0.12)] ring-1 ring-slate-100 lg:flex">
          <img src="/avatar-1.webp" alt="" className="h-8 w-8 rounded-full object-cover" />
          <span>
            <span className="block whitespace-nowrap text-[12px] font-extrabold text-[#1a2744]">Báo giá khác</span>
            <span className="block whitespace-nowrap text-[10px] text-stone-400">Đã báo giá</span>
          </span>
        </div>
      )}
      {index === 3 && (
        <>
          <div className="pointer-events-none absolute left-full top-[28%] z-30 ml-4 hidden rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_16px_34px_rgba(26,39,68,0.1)] ring-1 ring-slate-100 lg:block">
            <p className="whitespace-nowrap text-[13px] font-extrabold text-[#1a2744]">Bàn giao ảnh trên đơn</p>
            <p className="mt-1 whitespace-nowrap text-[11px] text-stone-500">Ảnh chỉnh và ảnh gốc theo gói</p>
          </div>
          <div className="pointer-events-none absolute bottom-[30%] left-full z-30 ml-4 hidden whitespace-nowrap rounded-full bg-[#1a2744] px-3.5 py-2 text-[12px] font-bold text-white shadow-[0_14px_30px_rgba(26,39,68,0.16)] lg:block">
            Thanh toán trên đơn
          </div>
        </>
      )}
      <div className="float-phone relative">
        <span className="absolute -left-[3px] top-[92px] z-20 h-5 w-[3px] rounded-l bg-[#4a4a4e]" aria-hidden />
        <span className="absolute -left-[3px] top-[122px] z-20 h-10 w-[3px] rounded-l bg-[#3a3a3e]" aria-hidden />
        <span className="absolute -left-[3px] top-[170px] z-20 h-10 w-[3px] rounded-l bg-[#3a3a3e]" aria-hidden />
        <span className="absolute -right-[3px] top-[146px] z-20 h-14 w-[3px] rounded-r bg-[#3a3a3e]" aria-hidden />
        <div className="rounded-[2.85rem] bg-gradient-to-br from-[#8d8d92] via-[#2a2a2e] to-[#6a6a70] p-px shadow-[0_28px_50px_rgba(28,25,23,0.16)]">
          <div className="rounded-[2.8rem] bg-[#0c0c0e] p-[8px]">
            <div className="relative h-[548px] overflow-hidden rounded-[2.25rem] bg-[#fffafc] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] sm:h-[568px]">
              <div className="pointer-events-none absolute left-1/2 top-[8px] z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black">
                <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#1c1c28] ring-1 ring-[#2a3148]" />
              </div>
              <div className="flex items-center justify-between px-5 pb-1 pt-2.5 text-[10px] font-semibold text-[#1a2744]">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <span className="text-[9px]">5G</span>
                  <span className="h-[8px] w-[16px] rounded-[2px] border border-stone-800 p-[1px]">
                    <span className="block h-full w-3/4 rounded-[1px] bg-stone-800" />
                  </span>
                </span>
              </div>
              <div className="relative h-[calc(100%-34px)]">
                <HomeScreen on={index === 0} />
                <FormScreen on={index === 1} />
                <MapScreen on={index === 2} />
                <DoneScreen on={index === 3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Shot({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${on ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      {children}
    </div>
  );
}

function HomeScreen({ on }: { on: boolean }) {
  return (
    <Shot on={on}>
      <AppHomeMock compact />
    </Shot>
  );
}

function FormScreen({ on }: { on: boolean }) {
  return (
    <Shot on={on}>
      <div className="flex h-full flex-col bg-[#f3f5f9] text-[#1a2744]">
        <div className="flex items-center gap-2 bg-white px-3 py-2.5 shadow-sm">
          <span className="text-[16px] leading-none text-stone-400">‹</span>
          <p className="flex-1 text-center text-[13px] font-extrabold">Chụp chân dung</p>
          <span className="w-3" />
        </div>
        <div className="space-y-2 px-3 py-2.5">
          <div className="rounded-2xl bg-white px-3 py-2.5 shadow-sm">
            <p className="text-[10px] font-bold">Concept buổi chụp</p>
            <p className="mt-1 text-[10px] leading-4 text-stone-400">Mô tả concept để nhận báo giá đúng buổi chụp.</p>
          </div>
          <div className="rounded-2xl bg-white px-3 py-2.5 shadow-sm">
            <p className="text-[9px] font-semibold text-stone-400">Vị trí</p>
            <p className="mt-1 text-[11px] font-bold leading-4">Địa chỉ đã chọn trên bản đồ</p>
            <p className="mt-0.5 text-[9px] text-[#2f6fed]">Chạm để chỉnh sửa</p>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-[#ffe6f0] px-3 py-2.5">
            <p className="text-[10px] font-semibold text-stone-500">Thời gian</p>
            <p className="text-[12px] font-extrabold text-[#e11d48]">Thứ 7 · 16:00</p>
          </div>
          <div className="rounded-2xl bg-white px-3 py-2.5 shadow-sm">
            <p className="text-[10px] font-bold">Moodboard</p>
            <p className="text-[9px] text-stone-400">Giúp mẫu ảnh hiểu concept</p>
            <div className="mt-2 flex gap-2">
              <span className="h-11 w-11 rounded-xl bg-[#eef2f7]" />
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-slate-300 text-[16px] text-slate-300">+</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white px-3 py-2.5 shadow-sm">
            <p className="text-[10px] font-bold">Ghi chú</p>
            <p className="mt-1 text-[10px] text-stone-400">Thêm yêu cầu đặc biệt…</p>
          </div>
        </div>
        <div className="mt-auto px-3 pb-3">
          <div className="rounded-2xl bg-[#d9e6ff] py-3 text-center text-[13px] font-extrabold text-[#2f6fed]">Tìm mẫu ảnh</div>
        </div>
      </div>
    </Shot>
  );
}

function MapScreen({ on }: { on: boolean }) {
  const pins = [
    { img: "/avatar-1.webp", at: "left-[34%] top-[46%]" },
    { img: "/avatar-3.webp", at: "left-[58%] top-[40%]" },
    { img: "/avatar-2.webp", at: "left-[48%] top-[30%]", on: true },
  ];
  return (
    <Shot on={on}>
      <div className="relative h-full bg-[#e8eef2]">
        <img src="/screen-map.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute left-2 right-2 top-2 flex items-center gap-1 rounded-2xl bg-white/95 px-2.5 py-1.5 shadow-md">
          <span className="text-[14px] leading-none text-stone-400">‹</span>
          <p className="flex-1 text-center text-[11px] font-extrabold text-[#1a2744]">Chụp lookbook</p>
          <span className="w-3" />
        </div>
        {pins.map((pin) => (
          <img
            key={pin.at}
            src={pin.img}
            alt=""
            className={`absolute h-7 w-7 -translate-x-1/2 rounded-full object-cover shadow-md ${pin.at} ${pin.on ? "ring-2 ring-[#ff3d7f]" : "ring-2 ring-white"}`}
          />
        ))}
        <div className="absolute right-2 top-[22%] w-[158px] rounded-2xl bg-white p-2 shadow-[0_12px_28px_rgba(26,39,68,0.16)]">
          <div className="flex items-center gap-1.5">
            <img src="/avatar-2.webp" alt="" className="h-8 w-8 rounded-full object-cover" />
            <span className="min-w-0">
              <span className="block text-[11px] font-extrabold leading-none text-[#1a2744]">Mẫu ảnh</span>
              <span className="mt-1 block text-[9px] text-stone-400">0.6 km</span>
            </span>
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-[9px] font-bold text-[#ff3d7f]">
            <span className="h-2.5 w-2.5 rounded-full border border-[#ff3d7f]" />
            Đã gửi báo giá
          </p>
        </div>
        <p className="absolute bottom-[38%] right-2 rounded bg-white/80 px-1 text-[7px] text-stone-500">© OpenStreetMap</p>
        <div className="absolute inset-x-2 bottom-2 rounded-3xl bg-white px-3 py-2.5 shadow-[0_-8px_24px_rgba(26,39,68,0.12)]">
          <div className="flex items-start justify-between gap-2">
            <span>
              <span className="flex items-center gap-1 text-[11px] font-extrabold text-[#1a2744]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                Đã có báo giá
              </span>
              <span className="mt-0.5 block text-[9px] text-stone-400">Bạn tự chọn người trên bản đồ</span>
            </span>
            <span className="shrink-0 text-[10px] font-extrabold text-[#1a2744]">Trong 10km</span>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-2xl bg-[#f7f8fb] px-2 py-1.5">
            <img src="/avatar-2.webp" alt="" className="h-8 w-8 rounded-full object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-extrabold text-[#1a2744]">Mẫu ảnh</span>
              <span className="block text-[9px] text-stone-500">Đã gửi báo giá</span>
            </span>
            <span className="text-[10px] font-bold text-stone-500">0.6 km</span>
          </div>
        </div>
      </div>
    </Shot>
  );
}

function DoneScreen({ on }: { on: boolean }) {
  return (
    <Shot on={on}>
      <div className="flex h-full flex-col bg-[#f4f6fb] text-[#1a2744]">
        <div className="bg-white px-3 py-2.5 text-center shadow-sm">
          <p className="text-[10px] text-stone-400">Buổi chụp đã xong</p>
          <p className="text-[12px] font-extrabold">Lookbook thu đông · 8 ảnh</p>
        </div>
        <div className="flex gap-2 px-3 pt-3">
          <span className="rounded-full bg-[#e3146f] px-2.5 py-1 text-[10px] font-bold text-white">Ảnh đã chỉnh</span>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-stone-500">Ảnh gốc</span>
        </div>
        <div className="mx-3 mt-3 rounded-2xl bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold">Album bàn giao</p>
            <p className="text-[9px] text-stone-400">8/8 ảnh</p>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <img
                key={n}
                src={`/lookbook/${n}.webp`}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
        <div className="mx-3 mt-2 rounded-2xl bg-white p-3 shadow-sm">
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between">
              <span>Gói chụp 2 giờ</span>
              <span className="font-bold">Đã chốt trên đơn</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Quyền sử dụng</span>
              <span className="font-bold">Thương mại</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 border-t border-slate-100 pt-2">
            <img src="/avatar-2.webp" alt="" className="h-7 w-7 rounded-full object-cover" />
            <span className="flex-1 text-[10px] font-semibold">Đánh giá mẫu ảnh</span>
            <span className="text-[11px] text-[#c026d3]">★★★★★</span>
          </div>
        </div>
        <div className="mt-auto px-3 pb-3">
          <div className="brand-bg rounded-2xl py-3 text-center text-[12px] font-extrabold text-white">Tải album về máy</div>
        </div>
      </div>
    </Shot>
  );
}

function ExperienceBackdrop() {
  return (
    <div className="exp-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <img
        src="/dalat-bg.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="exp-bg-img absolute inset-0 h-full w-full object-cover object-[70%_center] mix-blend-multiply"
      />
    </div>
  );
}

export function ExperienceSection() {
  const pinRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const ignoreScrollUntil = useRef(0);

  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      if (reduced || window.innerWidth < 1024) {
        el.style.setProperty("--exp-shift", "0");
        return;
      }
      if (Date.now() < ignoreScrollUntil.current) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      const passed = Math.min(Math.max(-rect.top, 0), total);
      setIndex(Math.min(STEPS.length - 1, Math.floor((passed / total) * STEPS.length)));
      el.style.setProperty("--exp-shift", (passed / total).toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const selectStep = (next: number) => {
    setIndex(next);
    const el = pinRef.current;
    if (!el || window.innerWidth < 1024) return;
    const total = Math.max(el.offsetHeight - window.innerHeight, 1);
    const passed = ((next + 0.45) / STEPS.length) * total;
    const top = el.getBoundingClientRect().top + window.scrollY + passed;
    ignoreScrollUntil.current = Date.now() + 700;
    el.style.setProperty("--exp-shift", (passed / total).toFixed(3));
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="trai-nghiem" ref={pinRef} className="experience-pin relative overflow-x-clip bg-white">
      <div className="experience-sticky">
        <ExperienceBackdrop />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-0">
          <div className="lg:pr-8">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#c45ce6]">
              <span className="h-px w-8 bg-[#c45ce6]" />
              Trải nghiệm ứng dụng
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.2] tracking-tight text-[#1a2744] sm:text-4xl">
              Cách Đặt Lịch Chụp Trên CastNow
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-500">
              Bốn bước từ lúc chọn kiểu chụp đến lúc nhận ảnh: nhận gợi ý, tự chọn mẫu ảnh gần địa điểm, theo dõi đến khi buổi chụp xong.
            </p>
            <ol className="mt-8">
              {STEPS.map((step, i) => {
                const active = i === index;
                return (
                  <li key={step.n}>
                    <button
                      type="button"
                      onClick={() => selectStep(i)}
                      aria-current={active ? "step" : undefined}
                      className={`w-full border-l-2 py-3 pl-5 text-left transition ${
                        active
                          ? "border-[#c45ce6] bg-white/40"
                          : "border-transparent hover:border-[#e9d5ff] hover:bg-white/25"
                      }`}
                    >
                      <span className="grid grid-cols-[3.25rem_1fr] gap-1">
                        <span
                          className={`text-[28px] font-extrabold leading-none tracking-tight ${
                            active ? "text-[#ff3d7f]" : "text-[#ff3d7f]/55"
                          }`}
                        >
                          {step.n}
                        </span>
                        <span>
                          <span
                            className={`block text-[17px] font-extrabold ${
                              active ? "text-[#1a2744]" : "text-[#1a2744]/80"
                            }`}
                          >
                            {step.title}
                          </span>
                          <span className="mt-1.5 block text-sm leading-6 text-stone-500">{step.body}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          <PhoneStage index={index} />
        </div>
      </div>
    </section>
  );
}
