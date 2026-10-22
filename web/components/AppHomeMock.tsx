import { shootPhoto, type ShootKind } from "@/components/ShootArt";

const KINDS: { kind: ShootKind; label: string }[] = [
  { kind: "portrait", label: "Chân dung" },
  { kind: "fashion", label: "Thời trang" },
  { kind: "product", label: "Sản phẩm" },
  { kind: "wedding", label: "Cặp đôi" },
  { kind: "event", label: "Sự kiện" },
  { kind: "family", label: "Gia đình" },
  { kind: "outdoor", label: "Ngoại cảnh" },
  { kind: "commercial", label: "Thương mại" },
];

const NEARBY = [
  { img: "/avatar-1.webp", role: "Mẫu ảnh", meta: "Lookbook · 1,2 km", rating: "4,9" },
  { img: "/avatar-2.webp", role: "Mẫu ảnh", meta: "Chân dung · 0,6 km", rating: "5,0" },
  { img: "/avatar-3.webp", role: "Mẫu ảnh", meta: "Sự kiện · 2,4 km", rating: "4,8" },
];

/** Màn hình chính của app CastNow, dựng bằng HTML để hiện trong khung điện thoại. */
export function AppHomeMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#fffafc] text-[#1a2744]">
      <div className="brand-bg px-3.5 pb-4 pt-3 text-white">
        <div className="flex items-center gap-2">
          <img src="/logo-castnow.webp" alt="" className="h-7 w-7 rounded-lg bg-white p-0.5" />
          <span className="min-w-0 flex-1">
            <span className="block text-[9px] text-white/80">Xin chào</span>
            <span className="block text-[12px] font-extrabold leading-tight">Bạn muốn chụp gì hôm nay?</span>
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] text-stone-400 shadow-sm">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          Tìm mẫu ảnh…
        </div>
      </div>

      <div className="px-3 pt-3">
        <p className="text-[11px] font-extrabold">Kiểu buổi chụp</p>
        <div className="mt-2 grid grid-cols-4 gap-x-1.5 gap-y-2.5">
          {KINDS.map((item) => (
            <span key={item.kind} className="flex flex-col items-center gap-1">
              <img
                src={shootPhoto(item.kind, true)}
                alt=""
                className="h-10 w-10 rounded-2xl object-cover shadow-[0_6px_14px_rgba(227,20,111,0.18)] ring-2 ring-white"
              />
              <span className="whitespace-nowrap text-[8.5px] font-semibold text-stone-600">{item.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-3 mt-3 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-pink-100">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#fff0f6]">
          <img src="/ai-robot-v3.webp" alt="" className="h-6 w-6 object-contain" />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-extrabold">Trợ lý AI</span>
          <span className="block truncate text-[8.5px] text-stone-500">“Mình cần chụp lookbook 8 ảnh chiều thứ 7”</span>
        </span>
      </div>

      <div className="px-3 pt-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-extrabold">Gần địa điểm của bạn</p>
          <span className="text-[9px] font-bold text-[#e3146f]">Trong 10km</span>
        </div>
        <ul className="mt-2 space-y-1.5">
          {NEARBY.slice(0, compact ? 2 : 3).map((person) => (
            <li key={person.img} className="flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-sm">
              <img src={person.img} alt="" className="h-8 w-8 rounded-full object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-extrabold">{person.role}</span>
                <span className="block text-[8.5px] text-stone-500">{person.meta}</span>
              </span>
              <span className="text-[9px] font-bold text-[#c026d3]">★ {person.rating}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto grid grid-cols-5 border-t border-stone-100 bg-white px-1 py-1.5 text-center text-[7.5px] font-semibold text-stone-400">
        {["Trang chủ", "Lịch chụp", "AI", "Cộng đồng", "Tài khoản"].map((label, index) => (
          <span key={label} className={index === 0 ? "text-[#e3146f]" : ""}>
            <span className={`mx-auto mb-0.5 block h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-[#e3146f]" : "bg-stone-300"}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
