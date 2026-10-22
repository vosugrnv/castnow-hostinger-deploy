"use client";

import { useEffect, useState, type ReactNode } from "react";

import { ShootTile, type ShootKind } from "@/components/ShootArt";

const OBJECTS = [
  { img: "/icon3d-pin.webp", tag: "Đến đúng địa điểm" },
  { img: "/icon3d-chat.webp", tag: "Bạn tự chọn" },
  { img: "/icon3d-camera.webp", tag: "8 kiểu buổi chụp" },
  { img: "/icon3d-calendar.webp", tag: "Chốt lịch trên đơn" },
];

const SERVICE_TILES: ShootKind[] = ["portrait", "fashion", "wedding", "product"];

const STATUS = ["Đã nhận đơn", "Đang đến", "Đã xong"];

function Check() {
  return (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 6.2 5 8.5 9.5 3.5" />
    </svg>
  );
}

function Scene({ on, children, className = "" }: { on: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`rail-scene absolute inset-0 flex flex-col items-center justify-center ${on ? "is-on" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function PointRails({ listId }: { listId: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(`#${listId} > li`));
    if (!items.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.5;
      let next = 0;
      items.forEach((item, index) => {
        if (item.getBoundingClientRect().top <= probe) next = index;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [listId]);

  return (
    <div className="pointer-events-none absolute inset-0 hidden xl:block" aria-hidden>
      <div className="absolute inset-y-0 left-0 w-[calc((100%-48rem)/2)]">
        <div className="sticky top-[calc(50vh-170px)] ml-auto h-[340px] w-[190px] pr-6 2xl:w-[230px]">
          {OBJECTS.map((object, index) => (
            <Scene key={object.img} on={active === index}>
              <div className="rail-bob">
                <img src={object.img} alt="" loading="lazy" className="h-[150px] w-auto object-contain 2xl:h-[180px]" />
              </div>
              <span className="mt-4 rounded-full bg-[#ffeef5] px-3 py-1 text-[11px] font-bold text-[#a3105a]">{object.tag}</span>
            </Scene>
          ))}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-stone-400">
              ĐIỂM <span className="text-[#1a2744]">0{active + 1}</span> / 04
            </span>
            <span className="flex gap-1.5">
              {OBJECTS.map((object, index) => (
                <i key={object.img} className={`block h-1 rounded-full transition-all duration-500 ${index === active ? "w-6 bg-[#e3146f]" : "w-2 bg-stone-200"}`} />
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 right-0 w-[calc((100%-48rem)/2)]">
        <div className="sticky top-[calc(50vh-150px)] mr-auto h-[300px] w-[210px] pl-6 2xl:w-[240px]">
          <Scene on={active === 0}>
            <div className="rail-bob w-full rounded-3xl bg-white p-3 ring-1 ring-stone-200">
              <div className="relative h-[120px] overflow-hidden rounded-2xl">
                <img src="/screen-map.webp" alt="" loading="lazy" className="h-full w-full object-cover" />
                <span className="rail-ping absolute left-[calc(50%-2rem)] top-[calc(50%-2rem)] h-16 w-16 rounded-full border-2 border-[#e3146f]" />
                <img src="/float-marker-lg.webp" alt="" loading="lazy" className="absolute left-1/2 top-1/2 h-10 w-auto -translate-x-1/2 -translate-y-[80%]" />
              </div>
              <p className="mt-3 text-[12px] font-bold text-[#1a2744]">Người gần địa điểm chụp</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-stone-500">
                <img src="/radius-pin.webp" alt="" className="h-3 w-3 object-contain" />
                Trong bán kính 10km
              </p>
            </div>
          </Scene>

          <Scene on={active === 1}>
            <div className="rail-bob w-full rounded-3xl bg-white p-4 ring-1 ring-stone-200">
              <div className="flex items-center gap-3">
                <img src="/avatar-1.webp" alt="" loading="lazy" className="h-12 w-12 rounded-full object-cover ring-2 ring-[#ffc9de]" />
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#1a2744]">Hồ sơ mẫu ảnh</p>
                  <p className="mt-0.5 text-[11px] text-stone-500">Khu vực và portfolio</p>
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                <span className="block h-1.5 w-full rounded-full bg-stone-100" />
                <span className="block h-1.5 w-4/5 rounded-full bg-stone-100" />
              </div>
              <span className="rail-press mt-4 flex items-center justify-center gap-1.5 rounded-full bg-[#e3146f] py-2 text-[12px] font-bold text-white">
                <Check />
                Chọn người này
              </span>
            </div>
          </Scene>

          <Scene on={active === 2}>
            <div className="rail-bob w-full rounded-3xl bg-white p-3 ring-1 ring-stone-200">
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_TILES.map((kind, index) => (
                  <div key={kind} className="rail-tile" style={{ animationDelay: `${index * 0.6}s` }}>
                    <ShootTile kind={kind} small className="aspect-square w-full rounded-xl" />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-[12px] font-bold text-[#1a2744]">Mọi buổi chụp, một app</p>
            </div>
          </Scene>

          <Scene on={active === 3}>
            <div className="rail-bob w-full rounded-3xl bg-white p-4 ring-1 ring-stone-200">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">Trạng thái đơn</p>
              <ol className="mt-3 space-y-2.5">
                {STATUS.map((label, index) => (
                  <li key={label} className="rail-status flex items-center gap-2.5" style={{ animationDelay: `${index * 0.9}s` }}>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e3146f] text-white">
                      <Check />
                    </span>
                    <span className="text-[12.5px] font-semibold text-[#1a2744]">{label}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#fff2f7] px-3 py-2">
                <span className="text-[11.5px] font-semibold text-[#1a2744]">Thanh toán trên đơn</span>
                <img src="/coin-single.webp" alt="" loading="lazy" className="h-5 w-5 object-contain" />
              </div>
            </div>
          </Scene>
        </div>
      </div>
    </div>
  );
}
