import Link from "next/link";

import { AppHeroBg } from "@/components/AppHeroBg";
import { JsonLd, PageHero, SectionHead, StepList } from "@/components/PageKit";
import { Reveal } from "@/components/Reveal";
import { StepsBg } from "@/components/StepsBg";
import { APP_DOWNLOAD_URL, APP_STORE_URL, COMPANY, PLAY_STORE_URL, SITE_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Tải ứng dụng CastNow cho điện thoại",
  description:
    "Tải app CastNow trên App Store cho iPhone, iPad và Google Play cho Android. Quét mã QR để cài nhanh, đăng nhập bằng số điện thoại và đặt lịch mẫu ảnh gần địa điểm chụp.",
  path: "/tai-ung-dung",
});

const STEPS = [
  { title: "Đăng nhập bằng số điện thoại", body: "Mở app sau khi cài, nhập số điện thoại để tạo tài khoản.", img: "/float-shield-out.webp" },
  { title: "Chọn tỉnh thành và địa điểm chụp", body: "Chọn studio, quán hoặc ngoại cảnh để app tìm mẫu ảnh trong bán kính khoảng 10km.", img: "/float-marker-out.webp" },
  { title: "Đặt lịch hoặc nhận lịch", body: "Đặt buổi chụp, hoặc chuyển sang hồ sơ mẫu ảnh để nhận lịch.", img: "/float-star-out.webp" },
];

const INSIDE = [
  ["/ai-robot-v3.webp", "Trợ lý AI gợi ý kiểu chụp"],
  ["/radius-pin.webp", "Bản đồ mẫu ảnh trong 10km"],
  ["/radius-chat.webp", "Gửi brief ngay trong đơn"],
  ["/coin-dollar.webp", "Thanh toán và mã QR"],
];

function StoreCard({ href, store, note, apple }: { href: string; store: string; note: string; apple?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="lift-card group flex items-center gap-4 rounded-[1.3rem] bg-[#1a2744] px-5 py-4 text-white"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
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
      <span className="text-[20px] text-white/60 transition-transform group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </a>
  );
}

export default function DownloadPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MobileApplication",
          name: "CastNow",
          operatingSystem: "iOS, Android",
          applicationCategory: "LifestyleApplication",
          inLanguage: "vi",
          url: `${SITE_URL}/tai-ung-dung`,
          downloadUrl: APP_DOWNLOAD_URL,
          installUrl: APP_DOWNLOAD_URL,
          publisher: { "@type": "Organization", name: COMPANY },
        }}
      />
      <PageHero
        crumb="Tải ứng dụng"
        path="/tai-ung-dung"
        background={<AppHeroBg />}
        kicker="Tải app"
        title={
          <>
            Tải CastNow, <span className="text-[#e3146f]">Đặt Buổi Chụp Trong Vài Chạm</span>
          </>
        }
        lead="Cài CastNow trên điện thoại, đăng nhập bằng số điện thoại và đặt mẫu ảnh gần địa điểm chụp — hoặc mở hồ sơ để nhận lịch ngay trong app."
        art={
          <div className="relative mx-auto max-w-[400px]">
            <img
              src="/float-star-out.webp"
              alt=""
              className="float-a pointer-events-none absolute -right-2 -top-14 z-10 h-24 w-24 object-contain drop-shadow-[0_14px_18px_rgba(26,39,68,0.18)] sm:-right-8 sm:h-28 sm:w-28"
            />
            <div className="rounded-[1.8rem] bg-white p-6 shadow-[0_30px_60px_rgba(26,39,68,0.12)] ring-1 ring-stone-100 sm:p-7">
              <div className="flex items-center gap-5">
                <img src="/qr-castnow.png" alt="Mã QR tải ứng dụng CastNow" className="h-32 w-32 rounded-2xl ring-1 ring-stone-100 sm:h-36 sm:w-36" />
                <div>
                  <p className="text-[18px] font-bold leading-snug tracking-[-0.01em] text-[#1a2744]">Quét mã để tải nhanh</p>
                  <p className="mt-2 text-[14px] leading-6 text-stone-500">Mở camera điện thoại và hướng vào mã QR.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                <StoreCard href={APP_STORE_URL} store="App Store" note="iPhone · iPad" apple />
                <StoreCard href={PLAY_STORE_URL} store="Google Play" note="Điện thoại Android" />
              </div>
            </div>
          </div>
        }
      />

      <section className="relative overflow-hidden bg-white">
        <StepsBg />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead kicker="Sau khi cài" center title="Bắt Đầu Dùng CastNow Trong 3 Bước" />
          <StepList steps={STEPS} />
        </div>
      </section>

      <section className="bg-[#f6f8fb]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <SectionHead
              kicker="Trong app"
              title="Một App Cho Mọi Buổi Chụp"
              lead="Đặt lịch, theo dõi đơn, gửi brief và thanh toán đều nằm trong CastNow. Mẫu ảnh dùng cùng ứng dụng ở chế độ nhận lịch."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {INSIDE.map(([img, label], index) => (
                <Reveal as="li" key={label} delay={index * 70}>
                  <div className="lift-card flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 ring-1 ring-stone-100">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff0f6]">
                      <img src={img} alt="" className="lift-icon h-8 w-8 object-contain" />
                    </span>
                    <span className="text-[15px] font-semibold text-[#1a2744]">{label}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={120}>
            <div className="h-full rounded-[1.8rem] border border-pink-100 bg-white p-8 sm:p-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0f6]">
                <img src="/float-shield-out.webp" alt="" className="h-9 w-9 object-contain" />
              </span>
              <h2 className="mt-5 text-[1.5rem] font-extrabold tracking-[-0.025em] text-[#1a2744]">Cài Đúng Ứng Dụng CastNow</h2>
              <p className="mt-3 text-[15px] leading-7 text-stone-600">
                Trên cửa hàng có thể có ứng dụng tên gần giống. Trước khi cài, hãy kiểm tra:
              </p>
              <ul className="mt-5 space-y-3 text-[15px] leading-6 text-stone-700">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e3146f]" />
                  <span>
                    Nhà phát triển: <strong className="font-semibold text-[#1a2744]">{COMPANY}</strong>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e3146f]" />
                  <span>
                    Trên Android, gói ứng dụng là <strong className="font-semibold text-[#1a2744]">com.castnow.app</strong>.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e3146f]" />
                  <span>
                    Hoặc quét mã QR trên trang này để tới đúng ứng dụng.
                  </span>
                </li>
              </ul>
              <Link href="/cau-hoi" className="cta-more mt-6 inline-flex text-[15px] font-semibold text-[#e3146f]">
                Câu hỏi thường gặp <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
