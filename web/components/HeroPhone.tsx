import { AppHomeMock } from "@/components/AppHomeMock";

export function HeroPhone() {
  return (
    <div className="hero-up relative mx-auto flex w-fit max-w-full items-center justify-center lg:ml-auto lg:translate-x-8 lg:justify-end xl:translate-x-14" style={{ animationDelay: "0.18s" }}>
      {/* Shared float so phone + side chip move up/down together */}
      <div className="float-phone flex items-center">
        <div className="relative w-[248px] pb-10 sm:w-[284px]">
          <span className="absolute -left-[3px] top-[88px] z-20 h-5 w-[3px] rounded-l bg-[#4a4a4e]" aria-hidden />
          <span className="absolute -left-[3px] top-[118px] z-20 h-10 w-[3px] rounded-l bg-[#3a3a3e]" aria-hidden />
          <span className="absolute -left-[3px] top-[164px] z-20 h-10 w-[3px] rounded-l bg-[#3a3a3e]" aria-hidden />
          <span className="absolute -right-[3px] top-[138px] z-20 h-14 w-[3px] rounded-r bg-[#3a3a3e]" aria-hidden />
          <div className="rounded-[2.85rem] bg-gradient-to-br from-[#8d8d92] via-[#2a2a2e] to-[#6a6a70] p-px shadow-[0_28px_50px_rgba(28,25,23,0.18)]">
            <div className="rounded-[2.8rem] bg-[#0c0c0e] p-[8px]">
              <div className="relative overflow-hidden rounded-[2.25rem] bg-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]">
                <div className="pointer-events-none absolute left-1/2 top-[8px] z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black">
                  <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#1c1c28] ring-1 ring-[#2a3148]" />
                </div>
                <div className="flex items-center justify-between px-5 pb-0.5 pt-2.5 text-[10px] font-semibold text-[#1a2744]">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <span className="text-[9px]">5G</span>
                    <span className="h-[8px] w-[16px] rounded-[2px] border border-stone-800 p-[1px]">
                      <span className="block h-full w-3/4 rounded-[1px] bg-stone-800" />
                    </span>
                  </span>
                </div>
                <div className="h-[470px] sm:h-[540px]" role="img" aria-label="Màn hình chính app CastNow với các kiểu buổi chụp và mẫu ảnh đúng concept">
                  <AppHomeMock />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 -translate-y-8">
            <div className="hero-scale flex items-center gap-2.5 rounded-2xl bg-white py-2 pl-2 pr-4 shadow-[0_16px_36px_rgba(255,79,139,0.16)] ring-1 ring-pink-100" style={{ animationDelay: "0.58s" }}>
              <span className="relative flex h-10 w-10 items-center justify-center">
                <span className="chip-ping absolute inset-1 rounded-full bg-[#ff5c93]" />
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f43f8e] to-[#ff3d7f] text-white shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.2" />
                  </svg>
                </span>
              </span>
              <span className="leading-tight">
                <span className="block text-[18px] font-extrabold leading-none tracking-tight text-[#1a2744]">63</span>
                <span className="mt-1 block whitespace-nowrap text-[11px] font-medium text-stone-500">Tỉnh thành trong app</span>
              </span>
            </div>
          </div>
        </div>
        <div className="relative mb-28 ml-2 hidden self-center lg:block">
          <svg width="78" height="42" viewBox="0 0 78 42" className="absolute -left-[4.25rem] top-1/2 -translate-y-1/2" aria-hidden>
            <path className="hero-stroke" pathLength="1" d="M6 32 C 24 34, 38 8, 72 14" stroke="#1a2744" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.4" />
            <path className="hero-dash" pathLength="1" d="M6 32 C 24 34, 38 8, 72 14" stroke="#ff5c93" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <circle cx="6" cy="32" r="3.2" fill="#ff5c93" />
          </svg>
          <div className="hero-pop flex w-max items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-[0_14px_34px_rgba(28,25,23,0.1)] ring-1 ring-pink-100">
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="chip-ping absolute inset-0 rounded-full bg-[#f43f8e]" />
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#f43f8e] to-[#ff3d7f] text-[12px] font-extrabold text-white">8</span>
            </span>
            <span className="whitespace-nowrap text-[13px] font-semibold text-[#1a2744]">Trong một app</span>
          </div>
        </div>
      </div>
    </div>
  );
}
