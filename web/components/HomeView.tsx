import type { ReactNode } from "react";
import Link from "next/link";

import { AiDemoCard } from "@/components/AiDemoCard";
import { BgVideo } from "@/components/BgVideo";
import { FaqExclusive } from "@/components/FaqExclusive";
import { HeroPhone } from "@/components/HeroPhone";
import { PointRails } from "@/components/PointRails";
import { ServiceRails } from "@/components/ServiceRails";
import { AppCta, DownloadStrip, ExperienceSection, ServiceCard } from "@/components/SampleSections";
import { SectionNav } from "@/components/SectionNav";
import { ShootTile, type ShootKind } from "@/components/ShootArt";
import { HOME_FAQS, SERVICES } from "@/lib/site";
import { cityListingPath, THO_FILTER_CITIES } from "@/lib/thoLocations";

const LISTING = "/mau-anh-nhiep-anh-gia";

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

const POINTS = [
  {
    label: "Điểm 1",
    title: "Mẫu ảnh đến đúng địa điểm",
    paragraphs: [
      "Bạn nhập studio, quán cà phê, công viên hoặc nhà riêng. App ưu tiên mẫu ảnh trong bán kính khoảng 10km và hiện khoảng cách trước khi chốt.",
      "Không cần hỏi số điện thoại truyền miệng hay nhắn từng fanpage. Chọn kiểu buổi chụp và khung giờ, người bạn chọn nhận lịch rồi đến đúng chỗ.",
    ],
    closer: "Bạn thấy khoảng cách trên app trước khi đặt.",
    icon: (
      <Glyph>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.2" />
      </Glyph>
    ),
  },
  {
    label: "Điểm 2",
    title: "Xem portfolio, tự chọn người",
    paragraphs: [
      "Hồ sơ, ảnh portfolio, phong cách, khu vực nhận lịch và đánh giá nằm trên cùng một màn hình. Bạn so sánh rồi tự bấm chọn, app không gán người hộ.",
      "Trợ lý AI nghe concept bạn kể và gợi ý người gần phong cách. Đó chỉ là bước lọc đầu, quyết định vẫn ở bạn.",
    ],
    closer: "Quyết định cuối cùng luôn là của bạn.",
    icon: (
      <Glyph>
        <circle cx="10" cy="8" r="3" />
        <path d="M4.2 19c1-2.6 2.7-4 5.8-4s4.8 1.4 5.8 4" />
        <path d="M16 14.5l1.5 1.5 3.2-3.2" />
      </Glyph>
    ),
  },
  {
    label: "Điểm 3",
    title: "Mọi kiểu chụp, một hồ sơ mẫu",
    paragraphs: [
      "Chân dung, thời trang, sản phẩm, cưới, sự kiện, gia đình, ngoại cảnh và ảnh thương mại nằm chung một chỗ.",
      "Bạn chọn mẫu ảnh đúng concept, gửi brief, chốt giờ và theo dõi trên cùng một đơn.",
    ],
    closer: "8 kiểu chụp, phủ 63 tỉnh thành.",
    icon: (
      <Glyph>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </Glyph>
    ),
  },
  {
    label: "Điểm 4",
    title: "Rõ giá, rõ ảnh bàn giao",
    paragraphs: [
      "Báo giá, số ảnh, ảnh chỉnh hay ảnh gốc, thời hạn bàn giao và quyền sử dụng được ghi trên đơn trước buổi chụp.",
      "Đơn hiện trạng thái trên app: ai nhận lịch, đang đến, buổi chụp đã xong. Thanh toán và đánh giá ngay trên đơn.",
    ],
    closer: "Mọi bước nằm trong app, từ lúc hẹn đến lúc nhận ảnh.",
    icon: (
      <Glyph>
        <path d="M5 6h14v9H8l-3 3V6z" />
        <path d="M9 10h6M9 13h4" />
      </Glyph>
    ),
  },
];

const SERVICE_TONES = [
  { bg: "#f6e8ff", fg: "#9d17c9", spot: "157, 23, 201" },
  { bg: "#ffe8f0", fg: "#e3146f", spot: "227, 20, 111" },
  { bg: "#f1ebff", fg: "#7c3aed", spot: "124, 58, 237" },
  { bg: "#ffe9ef", fg: "#e11d48", spot: "225, 29, 72" },
  { bg: "#fbe8ff", fg: "#c026d3", spot: "192, 38, 211" },
  { bg: "#fff0e6", fg: "#ea580c", spot: "234, 88, 12" },
  { bg: "#efeaff", fg: "#6d28d9", spot: "109, 40, 217" },
  { bg: "#ffe8ee", fg: "#be123c", spot: "190, 18, 60" },
];

const AUDIENCES: { kind: ShootKind; title: [string, string]; lead: string; items: string[]; cta: string }[] = [
  {
    kind: "fashion",
    title: ["Mẫu cho shop", "và thương hiệu"],
    lead: "Shop quần áo, mỹ phẩm và thương hiệu chọn mẫu cho lookbook, ảnh mặc thử.",
    items: ["Lookbook, ảnh mặc thử đăng sàn", "Ảnh quảng cáo, mạng xã hội", "Số outfit và quyền dùng ảnh"],
    cta: "Xem hồ sơ mẫu ảnh",
  },
  {
    kind: "model",
    title: ["Mẫu cho concept", "và sự kiện"],
    lead: "Chân dung, pre-wedding và sự kiện chọn mẫu đúng phong cách, đúng không khí.",
    items: ["Chân dung, headshot, profile", "Pre-wedding, kỷ niệm cặp đôi", "Concept ngoại cảnh, sự kiện"],
    cta: "Chọn mẫu ảnh phù hợp",
  },
];

const COMMUNITY: { kind: ShootKind; cat: string; title: string; body: string; slug: string }[] = [
  { kind: "model", cat: "Chọn mẫu", title: "Chọn mẫu ảnh đúng concept", body: "Portfolio và phong cách trước khi chốt lịch.", slug: "chon-mau-anh-dung-concept" },
  { kind: "fashion", cat: "Lookbook", title: "Lookbook cho shop", body: "Outfit, quyền dùng ảnh và brief cho mẫu.", slug: "lookbook-cho-shop" },
  { kind: "portrait", cat: "Brief", title: "Làm moodboard buổi chụp", body: "5 ảnh rõ giúp mẫu hiểu concept nhanh.", slug: "moodboard-buoi-chup" },
];

const TOP_CITIES = THO_FILTER_CITIES.slice(0, 24);

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-white" aria-hidden>
      <img src="/hero-waves.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-70 [filter:hue-rotate(-50deg)_saturate(1.3)]" />
      <div className="absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-white/80 via-white/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e3146f] text-white">
      <svg viewBox="0 0 20 20" className="h-3 w-3 fill-none stroke-current" strokeWidth="3" aria-hidden>
        <path d="M4.5 10.5l3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function HomeView() {
  return (
    <main>
      <SectionNav />

      <section id="bat-dau" className="hero-wash relative" aria-labelledby="hero-title">
        <HeroBackdrop />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pt-12 pb-11 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-6 lg:pt-16">
          <div className="text-center lg:text-left">
            <p className="hero-up inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#1a2744] shadow-sm" style={{ animationDelay: "0.04s" }}>
              <img src="/logo-castnow.webp" alt="" className="h-4 w-4" />
              Nền tảng đặt lịch chụp ảnh tại Việt Nam
            </p>
            <h1 id="hero-title" className="hero-up mx-auto mt-4 max-w-xl text-[30px] font-extrabold leading-[1.2] tracking-tight text-[#1a2744] sm:text-[34px] md:text-5xl lg:mx-0 lg:max-w-none lg:text-[46px]" style={{ animationDelay: "0.12s" }}>
              Đặt lịch <span className="brand-text">mẫu ảnh</span>{" "}
              <span className="mt-1 block">
                <span className="brand-text">đúng concept</span> buổi chụp
              </span>
            </h1>
            <p className="hero-up mx-auto mt-4 max-w-md text-balance text-[15px] leading-7 text-stone-500 lg:mx-0 lg:max-w-none" style={{ animationDelay: "0.2s" }}>
              CastNow giúp bạn chọn mẫu ảnh phù hợp chân dung, thời trang, sản phẩm, cưới và sự kiện. Xem portfolio, so hồ sơ theo yêu cầu, chốt giá trên đơn.
            </p>
            <div className="hero-up mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start" style={{ animationDelay: "0.28s" }}>
              <Link
                href="/tai-ung-dung"
                className="brand-bg inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow-md shadow-pink-200 transition hover:brightness-110"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] text-[#e3146f]">▶</span>
                Tải ứng dụng
              </Link>
              <Link
                href={LISTING}
                className="inline-flex items-center rounded-full border border-pink-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#1a2744] transition hover:border-[#e3146f]"
              >
                Xem hồ sơ mẫu ảnh
              </Link>
            </div>
            <div className="hero-up mt-6 flex items-center justify-center gap-3 lg:justify-start" style={{ animationDelay: "0.36s" }}>
              <div className="flex -space-x-2">
                {["/avatar-1.webp", "/avatar-2.webp", "/avatar-3.webp"].map((src) => (
                  <img key={src} src={src} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm" />
                ))}
                <span className="brand-bg flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white">+</span>
              </div>
              <p className="text-left text-sm text-stone-600">
                <span className="font-extrabold text-ink">63 tỉnh thành</span>
                <span className="text-stone-500"> · </span>
                <Link href="/nhan-lich-chup" className="font-semibold text-[#e3146f] hover:underline">
                  Bạn là mẫu ảnh? Nhận lịch →
                </Link>
              </p>
            </div>
          </div>
          <HeroPhone />
        </div>
      </section>

      <DownloadStrip />

      <section id="huong-dan" className="scroll-mt-20 bg-white" aria-labelledby="huong-dan-title">
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-14 sm:px-6 lg:pt-16">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white px-5 py-8 text-[#1a2744] shadow-[0_16px_40px_rgba(26,39,68,0.05)] sm:px-10 sm:py-12">
            <h2 id="huong-dan-title" className="text-[1.7rem] font-extrabold leading-tight tracking-[-0.03em] sm:text-3xl">
              Hướng Dẫn Thuê Mẫu Ảnh Trên CastNow
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-8 text-stone-600">
              <p>
                CastNow là ứng dụng của LITETECH COMPANY LIMITED, dùng khi bạn cần một buổi chụp: chân dung, thời trang, sản phẩm, cưới, sự kiện hoặc ảnh thương mại. Bạn mô tả concept trên app thay vì nhắn tin từng fanpage hay hỏi số điện thoại truyền miệng.
              </p>
              <p>
                Người bạn đặt là mẫu ảnh tự chọn trên app. CastNow không cử ekip của công ty. App giữ phần kết nối: chọn kiểu chụp, chọn địa điểm, xem hồ sơ đã được xét duyệt, chốt lịch trên đơn, gửi brief và thanh toán.
              </p>
            </div>

            <h3 className="mt-10 text-[1.3rem] font-extrabold tracking-[-0.02em] sm:text-[1.45rem]">Các bước đặt lịch chụp</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-8 text-stone-600 marker:font-bold marker:text-[#e3146f]">
              <li>Tải CastNow trên App Store hoặc Google Play, đăng nhập bằng số điện thoại và chọn tỉnh thành.</li>
              <li>Nhập địa điểm chụp: studio, quán cà phê, công viên hoặc nhà riêng. Địa điểm có thể lưu để lần sau đặt nhanh hơn.</li>
              <li>Chọn kiểu buổi chụp, hoặc kể concept với trợ lý AI nếu chưa chắc mẫu ảnh nào hợp buổi chụp.</li>
              <li>Mở hồ sơ, xem portfolio và báo giá, rồi tự bấm chọn mẫu phù hợp yêu cầu.</li>
              <li>Theo dõi trạng thái trên đơn, thanh toán trong app và đánh giá sau buổi chụp.</li>
            </ol>

            <h3 className="mt-10 text-[1.3rem] font-extrabold tracking-[-0.02em] sm:text-[1.45rem]">Giá thuê mẫu ảnh</h3>
            <div className="mt-4 space-y-4 text-[15px] leading-8 text-stone-600">
              <p>
                CastNow không niêm một mức giá duy nhất cho mọi buổi. Cùng một kiểu chụp, báo giá còn tùy concept, thời lượng, số ảnh bàn giao, quyền sử dụng ảnh và địa điểm. Bạn đọc mức được gửi, kèm khung giờ, rồi mới chốt. Mức đã chốt nằm trên đơn.
              </p>
              <p>
                Khách thanh toán trong app. Nếu trả tại buổi chụp, bạn có thể quét mã QR của người nhận lịch, giao dịch vẫn ghi trên ví.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#f7f4f8] px-5 py-5">
                <h3 className="text-[16px] font-bold">Viết brief để buổi chụp đúng ý</h3>
                <p className="mt-2 text-[14.5px] leading-7 text-stone-600">
                  Ghi concept, số outfit, số ảnh cần, địa điểm và giờ vàng nếu chụp ngoài trời. Gửi kèm moodboard trong đơn để mẫu ảnh chuẩn bị đúng.
                </p>
                <Link href="/blog/brief-cho-mau-anh" className="mt-4 inline-flex text-sm font-semibold text-[#e3146f]">
                  Cách viết brief →
                </Link>
              </div>
              <div className="rounded-2xl bg-[#f7f4f8] px-5 py-5">
                <h3 className="text-[16px] font-bold">Ảnh bàn giao và quyền sử dụng</h3>
                <p className="mt-2 text-[14.5px] leading-7 text-stone-600">
                  Số ảnh chỉnh, ảnh gốc, thời hạn bàn giao và phạm vi dùng ảnh (cá nhân hay thương mại) nên thống nhất trên đơn trước buổi chụp.
                </p>
                <Link href="/dieu-khoan-su-dung#hinh-anh" className="mt-4 inline-flex text-sm font-semibold text-[#e3146f]">
                  Điều khoản hình ảnh →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="dich-vu" className="scroll-mt-20" aria-labelledby="dich-vu-title">
        <div className="relative bg-[#f6eef5]">
          <ServiceRails />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a21caf]">Dịch vụ chụp ảnh</p>
              <h2 id="dich-vu-title" className="mt-3 text-3xl font-extrabold tracking-tight text-[#1a2744] sm:text-4xl">
                Dịch Vụ Chụp Ảnh Trên CastNow
              </h2>
              <p className="mt-4 leading-7 text-stone-500">
                Từ <strong className="font-semibold text-[#1a2744]">chụp ảnh chân dung</strong>, <strong className="font-semibold text-[#1a2744]">lookbook thời trang</strong> đến <strong className="font-semibold text-[#1a2744]">ảnh sản phẩm</strong>, <strong className="font-semibold text-[#1a2744]">ảnh cưới</strong> và <strong className="font-semibold text-[#1a2744]">sự kiện</strong>. Chọn đúng kiểu, mô tả concept, app gợi ý mẫu ảnh phù hợp yêu cầu.
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service, index) => (
                <ServiceCard
                  key={service.kind}
                  index={index}
                  kind={service.kind}
                  title={service.title}
                  body={service.body}
                  closer={service.closer}
                  tone={SERVICE_TONES[index]}
                  href={LISTING}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="doi-tuong" className="audience-band relative scroll-mt-20 overflow-hidden" aria-labelledby="doi-tuong-title">
        <div className="relative z-10 mx-auto grid max-w-[90rem] items-center gap-8 px-4 py-20 sm:px-6 xl:grid-cols-[260px_minmax(0,1fr)_260px] xl:gap-10 xl:px-8">
          <aside className="audience-deco audience-deco-left pointer-events-none relative mx-auto hidden h-[520px] w-[260px] xl:block" aria-hidden>
            <span className="audience-deco-orb audience-deco-orb-a" />
            <span className="audience-deco-orb audience-deco-orb-a2" />
            <span className="audience-deco-panel" />
            <span className="audience-deco-ring" />
            <span className="audience-deco-glow" />
            <svg className="audience-deco-arc" viewBox="0 0 220 360" fill="none" aria-hidden>
              <path d="M36 48c68 36 118 102 128 220" stroke="url(#audienceArcL)" strokeWidth="1.6" strokeDasharray="4 8" strokeLinecap="round" />
              <circle cx="36" cy="48" r="4" fill="#e3146f" fillOpacity="0.7" />
              <circle cx="164" cy="268" r="3.5" fill="#ff7a00" fillOpacity="0.55" />
              <defs>
                <linearGradient id="audienceArcL" x1="36" y1="48" x2="164" y2="268" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#e3146f" stopOpacity="0.65" />
                  <stop offset="1" stopColor="#ff7a00" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
            <div className="audience-deco-stack audience-deco-stack-a">
              <div className="audience-deco-mini">
                <img src="/avatar-1.webp" alt="" className="audience-deco-avatar" />
                <div>
                  <span className="audience-deco-mini-title">Lan Anh</span>
                  <span className="audience-deco-mini-meta">Lookbook · 4.9</span>
                </div>
              </div>
              <div className="audience-deco-chip">8 outfit · shop thời trang</div>
            </div>
            <img src="/icon3d-camera.webp" alt="" className="audience-deco-hero" />
            <img src="/float-star-out.webp" alt="" className="audience-deco-float audience-deco-float-star" />
            <img src="/float-marker-out.webp" alt="" className="audience-deco-float audience-deco-float-marker" />
            <div className="audience-deco-card audience-deco-card-a">
              <span className="audience-deco-card-kicker">Lookbook</span>
              <span className="audience-deco-card-title">Shop &amp; thương hiệu</span>
              <span className="audience-deco-card-meta">★★★★★ · sẵn sàng nhận</span>
            </div>
            <div className="audience-deco-pill audience-deco-pill-a">
              <img src="/icon3d-pin.webp" alt="" />
              <span>Trong 10km</span>
            </div>
            <div className="audience-deco-badge audience-deco-badge-a">
              <img src="/icon3d-chat.webp" alt="" />
              <span>Brief rõ</span>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a21caf] shadow-sm ring-1 ring-pink-100/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e3146f]" aria-hidden />
                Hai lối đặt lịch
              </p>
              <h2 id="doi-tuong-title" className="mt-4 text-3xl font-extrabold tracking-tight text-[#1a2744] sm:text-4xl">
                Đặt Mẫu Ảnh Cho Buổi Chụp Nào?
              </h2>
              <p className="mt-4 leading-7 text-stone-500">
                Chọn mẫu ảnh đúng concept của buổi chụp. Hồ sơ được xét duyệt trước khi nhận lịch.
              </p>
            </div>
            <div className="mt-12 grid gap-6">
              {AUDIENCES.map((audience, index) => (
                <article key={audience.kind} className={`audience-card relative flex flex-col gap-5 overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:flex-row lg:items-start lg:gap-8 ${index === 1 ? "audience-card-b" : ""}`}>
                  <span className="audience-card-index" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                  <div className="audience-card-media">
                    <ShootTile kind={audience.kind} className="h-full w-full rounded-[1.35rem]" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="pr-10 text-[1.35rem] font-extrabold leading-snug tracking-[-0.02em] text-[#1a2744] sm:text-[1.5rem]">
                      {audience.title[0]} {audience.title[1]}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[15px] leading-7 text-stone-600">{audience.lead}</p>
                    <ul className="mt-4 flex flex-col gap-2.5 text-[14.5px] text-[#1a2744] sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2.5">
                      {audience.items.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <Check />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={LISTING}
                      className="brand-bg mt-5 inline-flex w-full items-center justify-center gap-2 self-end rounded-full px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-pink-300/50 sm:w-auto sm:min-w-[15.5rem]"
                    >
                      {audience.cta}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <p className="audience-note relative mx-auto mt-7 w-full px-5 py-4 text-center text-[15px] leading-7 text-[#1a2744] lg:whitespace-nowrap">
              <strong className="font-bold">Một đơn cho cả buổi.</strong> Concept, số outfit, giờ, địa điểm và báo giá của mẫu ảnh nằm chung một chỗ.
            </p>
          </div>

          <aside className="audience-deco audience-deco-right pointer-events-none relative mx-auto hidden h-[520px] w-[260px] xl:block" aria-hidden>
            <span className="audience-deco-orb audience-deco-orb-b" />
            <span className="audience-deco-orb audience-deco-orb-b2" />
            <span className="audience-deco-panel audience-deco-panel-b" />
            <span className="audience-deco-ring audience-deco-ring-b" />
            <span className="audience-deco-glow audience-deco-glow-b" />
            <svg className="audience-deco-arc audience-deco-arc-b" viewBox="0 0 220 360" fill="none" aria-hidden>
              <path d="M184 56c-68 32-116 106-126 224" stroke="url(#audienceArcR)" strokeWidth="1.6" strokeDasharray="4 8" strokeLinecap="round" />
              <circle cx="184" cy="56" r="4" fill="#a21caf" fillOpacity="0.7" />
              <circle cx="58" cy="280" r="3.5" fill="#ff5c93" fillOpacity="0.55" />
              <defs>
                <linearGradient id="audienceArcR" x1="184" y1="56" x2="58" y2="280" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a21caf" stopOpacity="0.65" />
                  <stop offset="1" stopColor="#ff5c93" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
            <div className="audience-deco-stack audience-deco-stack-b">
              <div className="audience-deco-mini">
                <img src="/avatar-2.webp" alt="" className="audience-deco-avatar" />
                <div>
                  <span className="audience-deco-mini-title">Minh Châu</span>
                  <span className="audience-deco-mini-meta">Concept · đã duyệt</span>
                </div>
              </div>
              <div className="audience-deco-chip audience-deco-chip-b">Pre-wedding · cặp đôi</div>
            </div>
            <img src="/icon3d-calendar.webp" alt="" className="audience-deco-hero audience-deco-hero-b" />
            <img src="/float-shield-out.webp" alt="" className="audience-deco-float audience-deco-float-shield" />
            <img src="/float-clock-out.webp" alt="" className="audience-deco-float audience-deco-float-clock" />
            <div className="audience-deco-card audience-deco-card-b">
              <span className="audience-deco-card-kicker">Concept</span>
              <span className="audience-deco-card-title">Sự kiện &amp; cặp đôi</span>
              <span className="audience-deco-card-meta">Hồ sơ đã duyệt</span>
            </div>
            <div className="audience-deco-pill audience-deco-pill-b">
              <img src="/float-star-out.webp" alt="" />
              <span>Chốt trên đơn</span>
            </div>
            <div className="audience-deco-badge audience-deco-badge-b">
              <img src="/float-medal-out.webp" alt="" />
              <span>Đánh giá thật</span>
            </div>
          </aside>
        </div>
      </section>

      <ExperienceSection />

      <section id="vi-sao" className="scroll-mt-20" aria-labelledby="vi-sao-title">
        <div className="relative bg-white">
          <PointRails listId="diem-noi-bat" />
          <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6">
            <div className="text-center">
              <h2 id="vi-sao-title" className="text-3xl font-extrabold tracking-tight text-[#1a2744] sm:text-4xl">
                Vì Sao Đặt Buổi Chụp Trên CastNow?
              </h2>
              <p className="mt-4 leading-7 text-stone-500">
                CastNow nối bạn với mẫu ảnh: <strong className="font-semibold text-[#1a2744]">chọn kiểu chụp</strong>, xem portfolio và <strong className="font-semibold text-[#1a2744]">chọn mẫu đúng concept</strong>. Bạn tự quyết định trên đơn, không phải tự đi tìm.
              </p>
            </div>
            <ol id="diem-noi-bat" className="mt-14">
              {POINTS.map((point, index) => (
                <li key={point.label} className="group relative grid grid-cols-[3rem_1fr] gap-6 pb-12 last:pb-0">
                  <div className="flex justify-center">
                    {index < POINTS.length - 1 && <span className="absolute bottom-0 left-6 top-12 w-px -translate-x-1/2 bg-stone-200" />}
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white text-[#1a2744] transition duration-300 group-hover:border-transparent group-hover:bg-[#e3146f] group-hover:text-white">
                      {point.icon}
                    </span>
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-semibold tracking-[0.14em] text-stone-400">{point.label}</p>
                    <h3 className="mt-1 text-[22px] font-extrabold tracking-tight text-[#1a2744]">{point.title}</h3>
                    {point.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mt-3 leading-7 text-stone-500">{paragraph}</p>
                    ))}
                    <p className="mt-3 font-semibold leading-7 text-brand-700">{point.closer}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="ai" className="ai-section relative overflow-hidden" aria-labelledby="ai-title">
        <div className="ai-grid pointer-events-none absolute inset-0" aria-hidden />
        <span className="ai-blob ai-blob-a pointer-events-none absolute" aria-hidden />
        <span className="ai-blob ai-blob-b pointer-events-none absolute" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-8 lg:py-24 xl:gap-12">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a21caf] shadow-sm ring-1 ring-fuchsia-100/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e3146f]" aria-hidden />
              Công nghệ AI
            </p>
            <h2 id="ai-title" className="mt-5 text-[2.2rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#1a2744] sm:text-[2.9rem]">
              Trợ Lý AI
              <span className="mt-2 block text-[1.35rem] font-medium leading-[1.25] tracking-[-0.02em] text-[#5c6b84] sm:text-[1.7rem]">
                Tìm mẫu ảnh <span className="hero-underline font-extrabold text-[#1a2744]">cùng bạn</span>
              </span>
            </h2>
            <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.75] text-stone-500">
              Chưa chắc mẫu ảnh nào hợp buổi chụp? Kể concept bằng lời thường: chân dung ngoài trời, lookbook studio, ảnh sản phẩm nền trắng.
            </p>
            <ol className="mt-9 grid gap-3 sm:grid-cols-3 sm:gap-3.5">
              {[
                ["01", "Kể concept", "Phong cách, địa điểm, thời gian."],
                ["02", "Nhận gợi ý", "Kiểu chụp và người gần khu vực."],
                ["03", "Bạn tự chọn", "Xem hồ sơ rồi tự bấm đặt."],
              ].map(([n, title, body]) => (
                <li key={n} className="ai-step rounded-[1.35rem] p-4">
                  <span className="ai-step-num">{n}</span>
                  <span className="mt-3 block text-[14.5px] font-bold tracking-[-0.02em] text-[#1a2744]">{title}</span>
                  <span className="mt-1 block text-[12.5px] leading-5 text-stone-500">{body}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="ai-stage relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <span className="ai-stage-glow pointer-events-none absolute" aria-hidden />
            <span className="ai-stage-ring pointer-events-none absolute" aria-hidden />
            <span className="ai-stage-ring ai-stage-ring-b pointer-events-none absolute" aria-hidden />
            <span className="ai-stage-floor pointer-events-none absolute" aria-hidden />
            <div className="ai-robot relative z-10 mx-auto flex justify-center pt-4 sm:pt-2">
              <img src="/ai-pic-star.webp" alt="" className="ai-pic-a pointer-events-none absolute right-[8%] top-[6%] z-20 w-[52px] drop-shadow-[0_10px_14px_rgba(196,92,230,0.35)] sm:w-[68px]" />
              <img src="/ai-pic-bubble.webp" alt="" className="ai-pic-b pointer-events-none absolute right-[2%] top-[38%] z-20 w-[58px] drop-shadow-[0_10px_14px_rgba(255,61,127,0.22)] sm:w-[76px]" />
              <img src="/ai-pic-heart.webp" alt="" className="ai-pic-c pointer-events-none absolute left-[6%] top-[28%] z-20 w-[46px] drop-shadow-[0_10px_14px_rgba(255,61,127,0.28)] sm:w-[58px]" />
              <img
                src="/ai-robot-v4.webp"
                alt="Trợ lý AI của CastNow gợi ý mẫu ảnh"
                loading="lazy"
                className="relative z-10 h-[300px] w-auto max-w-[82vw] object-contain drop-shadow-[0_28px_40px_rgba(124,58,237,0.22)] sm:h-[440px]"
              />
            </div>
            <div className="ai-panel relative z-20 mx-auto -mt-6 w-full max-w-[320px] sm:-mt-10 sm:absolute sm:bottom-6 sm:left-0 sm:mx-0 sm:max-w-[290px] lg:-left-2 xl:left-0">
              <AiDemoCard />
            </div>
          </div>
        </div>
      </section>

      <section id="ban-kinh" className="brand-radius relative overflow-hidden text-white" aria-labelledby="ban-kinh-title">
        <img src="/radius-key.webp" alt="" className="radius-bob pointer-events-none absolute left-3 top-7 z-20 hidden w-[78px] drop-shadow-[0_14px_16px_rgba(80,8,55,0.28)] xl:block" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14 lg:py-20">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
              <span className="h-px w-8 bg-white" />
              Bản đồ
            </p>
            <h2 id="ban-kinh-title" className="mt-5 text-[2.15rem] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[2.7rem]">
              Đặt Mẫu Ảnh
              <span className="mt-3 flex flex-wrap items-center gap-3 text-[1.35rem] font-medium leading-none tracking-[-0.02em] sm:text-[1.55rem]">
                Trong Bán Kính
                <span className="rounded-full bg-white px-3.5 py-1.5 text-[1.55rem] font-extrabold tracking-[-0.04em] text-[#e3146f] sm:text-[1.85rem]">10km</span>
              </span>
            </h2>
            <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.75] text-white">
              Bật vị trí khi dùng app để CastNow biết khu vực. Bản đồ hiện mẫu ảnh quanh địa điểm chụp, bạn thấy khoảng cách trước khi chốt lịch.
            </p>
            <ul className="mt-8 grid gap-3">
              {[
                ["/radius-compass.webp", "Chọn tỉnh thành", "Đặt lịch theo khu vực buổi chụp."],
                ["/radius-house.webp", "Địa điểm đã lưu", "Studio, quán cà phê hoặc nhà riêng."],
                ["/radius-pin.webp", "Theo dõi lịch", "Biết người đã nhận và đang đến."],
                ["/radius-chat.webp", "Nhắn trong đơn", "Gửi brief, không đưa số ra ngoài."],
              ].map(([src, title, body]) => (
                <li key={title} className="radius-card flex items-center gap-3.5 rounded-2xl bg-white px-3.5 py-3 text-[#1a2744] shadow-[0_12px_28px_rgba(110,10,70,0.16)]">
                  <img src={src} alt="" className="radius-card-icon h-14 w-14 shrink-0 object-contain" />
                  <span className="relative z-10 min-w-0">
                    <span className="block text-[15px] font-semibold tracking-[-0.01em]">{title}</span>
                    <span className="mt-0.5 block text-[13px] leading-5 text-stone-600">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative sm:mx-6 lg:mx-4">
            <img src="/radius-pin.webp" alt="" className="radius-bob pointer-events-none absolute -right-2 -top-8 z-20 hidden w-[78px] drop-shadow-[0_14px_16px_rgba(80,8,55,0.28)] sm:block" />
            <img src="/radius-chat.webp" alt="" className="radius-bob-b pointer-events-none absolute -bottom-7 -left-6 z-20 hidden w-[86px] drop-shadow-[0_14px_16px_rgba(80,8,55,0.22)] sm:block" />
            <div className="relative h-[380px] overflow-hidden rounded-[1.8rem] shadow-[0_24px_50px_rgba(90,8,60,0.28)] ring-4 ring-white/25 sm:h-[460px]">
              <img src="/screen-map.webp" alt="Bản đồ mẫu ảnh quanh địa điểm chụp" loading="lazy" className="radius-map absolute inset-0 h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(80,8,55,0.18)_100%)]" aria-hidden />
              <img src="/radius-path.webp" alt="" className="radius-bob-b pointer-events-none absolute left-[52%] top-[58%] z-10 w-[64px] drop-shadow-[0_10px_12px_rgba(80,8,55,0.28)] sm:w-[72px]" />
              <p className="absolute left-4 top-4 z-10 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-bold text-[#1a2744] shadow-md">
                Bán kính <span className="text-[#e3146f]">10km</span>
              </p>
              <div className="pointer-events-none absolute left-1/2 top-[46%] z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 sm:h-64 sm:w-64">
                <span className="radius-ring" />
                <span className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ff3d7f] bg-[#ff3d7f]/20 shadow-[0_0_0_10px_rgba(255,61,127,0.12)]" />
                <img src="/logo-castnow.webp" alt="" className="radius-home absolute left-1/2 top-1/2 w-[4.5rem] drop-shadow-[0_10px_12px_rgba(80,8,55,0.28)] sm:w-20" />
              </div>
              <img src="/avatar-1.webp" alt="" className="absolute left-[14%] top-[30%] z-10 h-10 w-10 rounded-full object-cover ring-[3px] ring-white shadow-md" />
              <img src="/avatar-2.webp" alt="" className="absolute right-[16%] top-[26%] z-10 h-11 w-11 rounded-full object-cover ring-[3px] ring-[#ff3d7f] shadow-md" />
              <img src="/avatar-3.webp" alt="" className="absolute bottom-[20%] left-[22%] z-10 h-9 w-9 rounded-full object-cover ring-[3px] ring-white shadow-md" />
              <p className="absolute bottom-3 right-3 z-10 rounded-full bg-white/92 px-2 py-0.5 text-[10px] font-medium text-stone-500">© OpenStreetMap</p>
            </div>
          </div>
        </div>
      </section>

      <section id="thanh-pho" className="scroll-mt-20 bg-[linear-gradient(180deg,#fff7fb_0%,#ffffff_100%)]" aria-labelledby="thanh-pho-title">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="max-w-xl">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#e3146f]">
                <span className="h-px w-8 bg-[#e3146f]" />
                63 tỉnh thành
              </p>
              <h2 id="thanh-pho-title" className="mt-2 text-[1.7rem] font-extrabold tracking-tight text-[#1a2744] sm:text-[1.9rem] lg:text-[2rem]">
                Mẫu ảnh theo{" "}
                <span className="font-serif font-semibold italic text-[#e3146f]">tỉnh thành</span>
              </h2>
              <p className="mt-2 max-w-md text-[14.5px] leading-6 text-stone-500">
                Chọn khu vực để xem hồ sơ mẫu ảnh đang nhận lịch gần địa điểm chụp của bạn.
              </p>
            </div>
            <Link
              href={LISTING}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#1a2744] px-4 py-2 text-[13.5px] font-semibold text-white transition hover:bg-[#e3146f] sm:self-auto"
            >
              Xem tất cả hồ sơ <span aria-hidden>→</span>
            </Link>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {TOP_CITIES.map((city) => (
              <li key={city.slug}>
                <Link
                  href={cityListingPath(city.slug)}
                  className="group flex items-center justify-between gap-1.5 rounded-xl border border-pink-100/90 bg-white px-3 py-2 text-[13px] font-semibold text-[#1a2744] shadow-[0_6px_14px_-12px_rgba(163,16,90,0.35)] transition hover:border-[#e3146f]/35 hover:bg-[#fff0f6] hover:text-[#e3146f]"
                >
                  <span className="min-w-0 truncate">{city.label}</span>
                  <span className="shrink-0 text-[12px] text-[#e3146f]/45 transition group-hover:translate-x-0.5 group-hover:text-[#e3146f]" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>


      <section id="cau-hoi" className="home-faq scroll-mt-20" aria-labelledby="cau-hoi-title">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <span className="home-faq-blob home-faq-blob-a" />
          <span className="home-faq-blob home-faq-blob-b" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:gap-12 lg:py-20">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#e3146f]">
              <span className="h-px w-8 bg-[#e3146f]" aria-hidden />
              Hỏi đáp
            </p>
            <h2 id="cau-hoi-title" className="mt-3 max-w-md text-[1.85rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#1a2744] sm:text-[2.15rem]">
              Câu hỏi thường gặp khi{" "}
              <span className="font-serif font-semibold italic text-[#e3146f]">đặt lịch chụp</span>
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-7 text-stone-500">
              Giải đáp nhanh về giá, cách thuê mẫu ảnh và nhận lịch làm mẫu trên CastNow.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Chủ đề nhanh">
              {["Giá & báo giá", "Shop / thương hiệu", "63 tỉnh thành", "Nhận lịch mẫu", "Bàn giao ảnh", "Thanh toán trên app"].map((label) => (
                <li
                  key={label}
                  className="rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-semibold text-[#1a2744] shadow-sm ring-1 ring-pink-100"
                >
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/cau-hoi"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a2744] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e3146f]"
              >
                Xem tất cả câu hỏi <span aria-hidden>→</span>
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white/90 px-4 py-2.5 text-sm font-semibold text-[#1a2744] transition hover:border-[#e3146f]/40 hover:text-[#e3146f]"
              >
                Liên hệ hỗ trợ
              </Link>
            </div>
            <div className="mt-8 hidden items-center gap-3 rounded-2xl border border-pink-100/80 bg-white/70 p-3 pr-4 shadow-sm backdrop-blur-sm lg:flex">
              <img src="/ai-robot-v3.webp" alt="" className="h-12 w-12 object-contain" />
              <p className="text-[13.5px] leading-5 text-stone-600">
                Chưa thấy câu trả lời? Hỏi trợ lý AI trong app hoặc viết cho đội ngũ CastNow.
              </p>
            </div>
          </div>

          <div className="home-faq-panel overflow-hidden rounded-[1.5rem] border border-pink-100/90 bg-white/90 shadow-[0_24px_50px_-32px_rgba(163,16,90,0.35)] backdrop-blur-sm">
            <FaqExclusive name="home-faq" />
            {HOME_FAQS.map((item, i) => (
              <details key={item.q} name="home-faq" className="faq-item home-faq-item group">
                <summary className="flex cursor-pointer items-start gap-3 px-4 py-3.5 sm:items-center sm:gap-4 sm:px-5 sm:py-4">
                  <span className="home-faq-num mt-0.5 font-serif text-[1.15rem] font-semibold italic leading-none text-[#e3146f]/55 sm:mt-0" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="min-w-0 flex-1 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[#1a2744] sm:text-[15.5px]">
                    {item.q}
                  </h3>
                  <span className="faq-icon mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff0f6] text-[18px] leading-none text-[#e3146f] sm:mt-0">
                    +
                  </span>
                </summary>
                <p className="faq-body px-4 pb-4 pl-[3.35rem] text-[14.5px] leading-7 text-stone-600 sm:px-5 sm:pb-4 sm:pl-[4.1rem]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cong-dong" className="community-band relative overflow-hidden scroll-mt-20" aria-labelledby="cong-dong-title">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: 14 }, (_, index) => (
            <img key={index} src="/nature-flower.webp" alt="" className="community-petal" />
          ))}
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e3146f]">Blog</p>
            <h2 id="cong-dong-title" className="mt-3 text-[2.15rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#1a2744] sm:text-4xl">
              Kinh Nghiệm Chuẩn Bị Buổi Chụp
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-stone-600">
              Gợi ý concept, cách chọn người và cách viết brief để buổi chụp đúng ý ngay từ đầu.
            </p>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {COMMUNITY.map((post) => (
              <li key={post.slug} className="community-card flex flex-col rounded-[1.35rem] bg-white p-3 shadow-[0_18px_40px_rgba(26,39,68,0.07)]">
                <div className="relative overflow-hidden rounded-2xl">
                  <ShootTile kind={post.kind} className="aspect-[16/10] w-full" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1a2744] shadow-sm">
                    {post.cat}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                  <h3 className="text-[17px] font-bold leading-snug tracking-[-0.02em] text-[#1a2744]">{post.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-6 text-stone-500">{post.body}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#e3146f]">
                    Đọc bài <span aria-hidden>→</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/blog" className="rounded-full bg-[#1a2744] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e3146f]">
              Xem blog →
            </Link>
            <Link href="/gioi-thieu" className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#1a2744] shadow-sm transition hover:border-[#c45ce6]">
              Giới thiệu CastNow →
            </Link>
          </div>
        </div>
      </section>

      <section id="nhan-lich" className="relative overflow-hidden bg-[#1a2744] text-white" aria-labelledby="nhan-lich-title">
        <BgVideo src="/videos/castnow-bg.mp4" poster="/videos/castnow-bg.jpg" className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(26,20,52,0.88)_0%,rgba(60,14,70,0.62)_55%,rgba(26,39,68,0.5)_100%)]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ff8fb8]">
                <span className="h-px w-8 bg-[#ff8fb8]" />
                Dành cho mẫu ảnh
              </p>
              <h2 id="nhan-lich-title" className="mt-4 text-[2.15rem] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-4xl">
                Nhận Lịch Chụp
                <br />
                Quanh Khu Bạn Ở
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-white/75">
                Mở hồ sơ mẫu ảnh, thêm portfolio và khu vực nhận lịch. Hồ sơ được xét duyệt trước khi lịch mới hiện về.
              </p>
            </div>
            <Link href="/nhan-lich-chup" className="brand-bg inline-flex w-fit shrink-0 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(227,20,111,0.35)] transition hover:brightness-110">
              Xem cách nhận lịch
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 lg:grid-cols-2">
            {[
              ["/radius-pin.webp", "Lịch theo khu vực", "Đơn mới theo tỉnh thành và khu vực đang bật nhận lịch."],
              ["/float-shield-out.webp", "Portfolio rõ ràng", "Ảnh, phong cách, khu vực, khách xem trước khi chọn."],
              ["/coin-dollar.webp", "Ví nhận lịch", "Số dư, sao kê và yêu cầu rút tiền."],
            ].map(([src, title, body]) => (
              <li key={title} className="tasker-card flex items-center gap-4 rounded-[1.4rem] bg-white px-5 py-4 text-[#1a2744] shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
                <img src={src} alt="" className="tasker-card-icon h-14 w-14 shrink-0 object-contain" />
                <span className="min-w-0">
                  <h3 className="text-[16px] font-bold tracking-[-0.01em]">{title}</h3>
                  <p className="mt-1 text-[13.5px] leading-6 text-stone-500">{body}</p>
                </span>
              </li>
            ))}
            <li className="tasker-card flex items-center gap-4 rounded-[1.4rem] bg-white px-5 py-4 text-[#1a2744] shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
              <svg viewBox="0 0 64 64" className="tasker-card-icon h-14 w-14 shrink-0" aria-hidden>
                <rect x="4" y="4" width="22" height="22" rx="5" fill="#1a2744" />
                <rect x="38" y="4" width="22" height="22" rx="5" fill="#1a2744" />
                <rect x="4" y="38" width="22" height="22" rx="5" fill="#1a2744" />
                <rect x="10" y="10" width="10" height="10" rx="2" fill="#fff" />
                <rect x="44" y="10" width="10" height="10" rx="2" fill="#fff" />
                <rect x="10" y="44" width="10" height="10" rx="2" fill="#fff" />
                <rect x="38" y="38" width="10" height="10" rx="2.5" fill="#e3146f" />
                <rect x="52" y="40" width="8" height="8" rx="2" fill="#1a2744" />
                <rect x="40" y="52" width="8" height="8" rx="2" fill="#c45ce6" />
                <rect x="52" y="52" width="8" height="8" rx="2" fill="#ff7a00" />
              </svg>
              <span className="min-w-0">
                <h3 className="text-[16px] font-bold tracking-[-0.01em]">Thu bằng QR</h3>
                <p className="mt-1 text-[13.5px] leading-6 text-stone-500">Khách quét mã khi thanh toán tại buổi chụp.</p>
              </span>
            </li>
          </ul>
        </div>
      </section>

      <AppCta />
    </main>
  );
}
