import Image from "next/image";
import Link from "next/link";

import { Breadcrumb, ButtonLink, JsonLd, SectionHead, breadcrumbLd } from "@/components/PageKit";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/seo";
import { APP_DOWNLOAD_URL, APP_STORE_URL, COMPANY, PLAY_STORE_URL, SITE_URL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Hướng dẫn đặt lịch chụp trên CastNow",
  description:
    "Đã xem hồ sơ mẫu ảnh trên web? Tải app CastNow, chọn kiểu buổi chụp và đặt lịch mẫu phù hợp trong bán kính khoảng 10km.",
  path: "/huong-dan-dat-lich",
});

const STEPS = [
  {
    title: "Tải và mở CastNow",
    body: "Cài app từ App Store hoặc Google Play, đăng nhập bằng số điện thoại.",
    icon: "/logo-castnow.webp",
  },
  {
    title: "Chọn kiểu chụp và địa điểm",
    body: "Chọn chân dung, thời trang, sản phẩm hay sự kiện, nhập địa điểm để app tìm người trong bán kính khoảng 10km.",
    icon: "/float-marker-out.webp",
  },
  {
    title: "Chọn mẫu ảnh và đặt lịch",
    body: "Xem portfolio, gửi brief trong đơn nếu cần, rồi xác nhận lịch trong app.",
    icon: "/float-clock-out.webp",
  },
];

const FACTS = [
  { label: "Đặt lịch trong app", path: "M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" },
  { label: "Brief trong đơn", path: "M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3V6a1 1 0 0 1 1-1z" },
  { label: "Mẫu ảnh gần ~10km", path: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" },
];

function StoreCard({ href, store, note, apple }: { href: string; store: string; note: string; apple?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="guide-store group flex items-center gap-4 rounded-[1.3rem] bg-[#1a2744] px-5 py-4 text-white"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-transform duration-300 group-hover:scale-110">
        {apple ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
            <path d="M16.4 12.7c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.3.8s-1.7-.8-2.8-.8c-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7 1.9-1.1 2.6-2.1c.8-1.2 1.1-2.3 1.2-2.4-.1 0-2.2-.8-2.2-3.7zM14.7 6.8c.6-.7 1-1.7.9-2.8-1 .1-2.1.6-2.8 1.4-.6.7-1.1 1.8-.9 2.8 1.1.1 2.1-.5 2.8-1.4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
            <path fill="#34a853" d="M3 20.5 13.5 12 3 3.5v17z" />
            <path fill="#fbbc04" d="M16.8 14.7 13.5 12l3.3-2.7 4.2 2.4c.7.4.7 1.2 0 1.6l-4.2 2.4z" />
            <path fill="#4285f4" d="M3 3.5 13.5 12l3.3-2.7L5.2 2.2C4.3 1.7 3 2.3 3 3.5z" />
            <path fill="#ea4335" d="M13.5 12 3 20.5c0 1.2 1.3 1.8 2.2 1.3l11.6-6.8L13.5 12z" />
          </svg>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] text-white/60">{note}</span>
        <span className="block text-[18px] font-bold leading-tight">{store}</span>
      </span>
      <span className="text-[20px] text-white/60 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#ff8fb8]" aria-hidden>
        →
      </span>
    </a>
  );
}

function QrCard() {
  return (
    <div className="relative mx-auto max-w-[420px] px-4 sm:px-6">
      <Image
        src="/float-marker-out.webp"
        alt=""
        width={120}
        height={180}
        className="float-a pointer-events-none absolute -left-2 -top-10 z-10 h-auto w-14 sm:-left-4 sm:w-16"
        aria-hidden
      />
      <Image
        src="/radius-chat.webp"
        alt=""
        width={160}
        height={160}
        className="float-b pointer-events-none absolute -right-1 top-24 z-10 h-auto w-14 sm:-right-3 sm:w-[4.5rem]"
        aria-hidden
      />
      <Image
        src="/float-star-out.webp"
        alt=""
        width={160}
        height={160}
        className="float-c pointer-events-none absolute -bottom-8 -left-1 z-10 h-auto w-12 sm:w-14"
        aria-hidden
      />

      <div className="guide-qr-card relative rounded-[2rem] bg-white p-6 ring-1 ring-[#e3146f]/10 sm:p-7">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0 rounded-2xl bg-[#fff5f9] p-2.5">
            <span className="guide-corner left-0 top-0 rounded-tl-xl border-l-[3px] border-t-[3px]" aria-hidden />
            <span className="guide-corner right-0 top-0 rounded-tr-xl border-r-[3px] border-t-[3px]" aria-hidden />
            <span className="guide-corner bottom-0 left-0 rounded-bl-xl border-b-[3px] border-l-[3px]" aria-hidden />
            <span className="guide-corner bottom-0 right-0 rounded-br-xl border-b-[3px] border-r-[3px]" aria-hidden />
            <div className="relative overflow-hidden rounded-xl bg-white">
              <img src="/qr-castnow.png" alt="Mã QR tải ứng dụng CastNow" className="h-28 w-28 sm:h-32 sm:w-32" />
              <div className="guide-scan pointer-events-none absolute inset-x-0 top-0 h-full" aria-hidden>
                <span className="block h-[3px] rounded-full bg-[#e3146f]/80" />
                <span className="block h-6 bg-gradient-to-b from-[#e3146f]/15 to-transparent" />
              </div>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#fff0f6] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#e3146f]">
              <span className="guide-live h-1.5 w-1.5 rounded-full bg-[#e3146f]" />
              Quét để tải
            </span>
            <p className="mt-2.5 text-[18px] font-bold leading-snug tracking-[-0.01em] text-[#1a2744]">Quét mã để tải nhanh</p>
            <p className="mt-1.5 text-[14px] leading-6 text-stone-500">Mở camera điện thoại và hướng vào mã QR.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3">
          <StoreCard href={APP_STORE_URL} store="App Store" note="iPhone · iPad" apple />
          <StoreCard href={PLAY_STORE_URL} store="Google Play" note="Điện thoại Android" />
        </div>
      </div>
    </div>
  );
}

export default function HuongDanDatThoPage() {
  return (
    <main>
      <JsonLd data={breadcrumbLd("Hướng dẫn đặt lịch chụp", "/huong-dan-dat-lich")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Hướng dẫn đặt lịch chụp trên CastNow",
          description: "Các bước đặt mẫu ảnh sau khi xem hồ sơ trên web.",
          url: `${SITE_URL}/huong-dan-dat-lich`,
          step: STEPS.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.body,
          })),
        }}
      />

      <section className="relative overflow-hidden bg-[#fff5f9] text-[#1a2744]">
        <div className="guide-street pointer-events-none absolute inset-0" aria-hidden>
          <img src="/dalat-bg.webp" alt="" className="h-full w-full object-cover object-bottom" />
        </div>
        <div className="guide-dots pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:pb-28 lg:pt-12">
          <div>
            <Breadcrumb crumb="Hướng dẫn đặt lịch chụp" />
            <p
              className="hero-up mt-8 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#e3146f]"
              style={{ animationDelay: "80ms" }}
            >
              <span className="h-px w-8 bg-[#e3146f]" />
              Đặt lịch trong app
            </p>
            <h1
              className="hero-up mt-4 text-[2.3rem] font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-[3rem] lg:text-[3.35rem]"
              style={{ animationDelay: "160ms" }}
            >
              Đã chọn mẫu ảnh?{" "}
              <span className="relative inline-block text-[#e3146f]">
                Đặt Lịch Trong CastNow
                <svg viewBox="0 0 300 12" preserveAspectRatio="none" className="guide-underline absolute -bottom-2 left-0 h-3 w-full" aria-hidden>
                  <path d="M2 9C60 3 140 2 298 7" fill="none" stroke="#e3146f" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" pathLength={1} />
                </svg>
              </span>
            </h1>
            <p className="hero-up mt-6 max-w-xl text-[17px] leading-8 text-stone-600" style={{ animationDelay: "240ms" }}>
              Hồ sơ và portfolio trên web giúp bạn tham khảo trước. Việc đặt lịch, gửi brief và thanh toán diễn ra trong ứng dụng CastNow.
            </p>
            <div className="hero-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "320ms" }}>
              <ButtonLink href={APP_DOWNLOAD_URL}>Tải ứng dụng</ButtonLink>
              <ButtonLink href="/mau-anh-nhiep-anh-gia" variant="ghost">
                Xem hồ sơ mẫu ảnh
              </ButtonLink>
            </div>
            <ul className="mt-9 flex flex-wrap gap-2 lg:flex-nowrap">
              {FACTS.map((fact, index) => (
                <li
                  key={fact.label}
                  className="hero-up flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/85 py-1 pl-1 pr-3 text-[13px] font-semibold text-[#1a2744] ring-1 ring-[#e3146f]/15"
                  style={{ animationDelay: `${420 + index * 90}ms` }}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff0f6]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="#e3146f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d={fact.path} />
                    </svg>
                  </span>
                  {fact.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-scale" style={{ animationDelay: "220ms" }}>
            <QrCard />
          </div>
        </div>
      </section>

      <section className="guide-grid relative overflow-hidden bg-white">
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHead kicker="3 bước" center title="Đặt Lịch Sau Khi Xem Hồ Sơ Web" />

          <Reveal className="relative mt-14">
            <div className="relative mb-8 hidden grid-cols-3 md:grid" aria-hidden>
              <div className="guide-track absolute left-[16.66%] right-[16.66%] top-1/2 h-[3px] -translate-y-1/2">
                <span className="guide-track-fill block h-full rounded-full bg-[#e3146f]" />
              </div>
              {STEPS.map((step, index) => (
                <div key={step.title} className="flex justify-center">
                  <span
                    className="guide-dot relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1a2744] text-[15px] font-extrabold text-white ring-[6px] ring-white"
                    style={{ transitionDelay: `${300 + index * 450}ms` }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
            <ol className="grid gap-6 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <li key={step.title} className="guide-step-in" style={{ transitionDelay: `${200 + index * 160}ms` }}>
                  <div className="guide-step group relative h-full rounded-[1.6rem] bg-white p-7 text-center ring-1 ring-[#e3146f]/10">
                    <div className="relative mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.4rem] bg-[#fff0f6] ring-4 ring-white">
                      <Image
                        src={step.icon}
                        alt=""
                        width={112}
                        height={112}
                        className="guide-step-icon h-12 w-12 object-contain"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.2em] text-[#e3146f]">Bước {index + 1}</p>
                    <h3 className="mt-2 text-[19px] font-bold tracking-[-0.015em] text-[#1a2744]">{step.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-7 text-stone-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 pb-20 sm:px-6 lg:pb-28">
        <Reveal className="relative mx-auto max-w-[69rem] overflow-hidden rounded-[2rem] bg-[#1a2744] px-6 py-12 text-white sm:px-12 lg:py-14">
          <div className="guide-dots-dark pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff8fb8]">
                <span className="h-px w-8 bg-[#ff8fb8]" />
                Bắt đầu ngay
              </p>
              <h2 className="mt-4 max-w-xl text-[1.9rem] font-extrabold leading-[1.18] tracking-[-0.03em] sm:text-[2.3rem]">
                Xem hồ sơ trên web, <span className="text-[#ff8fb8]">đặt lịch trong app</span>
              </h2>
              <p className="mt-4 max-w-lg text-[16px] leading-7 text-white/70">
                Tìm mẫu ảnh theo tỉnh thành và kiểu chụp trên web, rồi mở CastNow để đặt mẫu phù hợp gần địa điểm.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={APP_DOWNLOAD_URL}>Tải ứng dụng</ButtonLink>
                <ButtonLink href="/mau-anh-nhiep-anh-gia" variant="light">
                  Xem hồ sơ mẫu ảnh
                </ButtonLink>
              </div>
            </div>
            <div className="relative mx-auto hidden px-12 sm:block lg:mr-6">
              <Image
                src="/float-shield-out.webp"
                alt=""
                width={200}
                height={246}
                className="float-b pointer-events-none absolute -top-8 left-0 z-10 h-auto w-16 lg:w-20"
                aria-hidden
              />
              <Image
                src="/float-star-out.webp"
                alt=""
                width={200}
                height={198}
                className="float-c pointer-events-none absolute -bottom-6 right-0 z-10 h-auto w-14 lg:w-[4.5rem]"
                aria-hidden
              />
              <div className="float-a flex h-52 w-52 items-center justify-center rounded-[2.6rem] bg-white lg:h-64 lg:w-64 lg:rounded-[3rem]">
                <Image
                  src="/logo-castnow.webp"
                  alt="Ứng dụng CastNow"
                  width={320}
                  height={320}
                  className="h-44 w-44 lg:h-56 lg:w-56"
                />
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-8 text-center text-[14px] text-stone-500">
          Nhà phát triển: <strong className="font-semibold text-[#1a2744]">{COMPANY}</strong>
          {" · "}
          <Link href="/tai-ung-dung" className="font-semibold text-[#e3146f]">
            Chi tiết tải ứng dụng
          </Link>
        </p>
      </section>
    </main>
  );
}
