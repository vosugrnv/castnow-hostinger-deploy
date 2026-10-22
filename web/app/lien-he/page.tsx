import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { Breadcrumb, JsonLd, breadcrumbLd } from "@/components/PageKit";
import { Reveal } from "@/components/Reveal";
import { COMPANY, SITE_URL, SOCIALS, SUPPORT_EMAIL, ZALO_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Liên hệ CastNow",
  description:
    "Liên hệ đội ngũ CastNow qua email hoặc Zalo để được hỗ trợ đơn, tài khoản, hồ sơ mẫu ảnh hoặc hợp tác thương hiệu và studio.",
  path: "/lien-he",
});

const REASONS = [
  {
    title: "Hỗ trợ đơn & tài khoản",
    body: "Mã đơn, thanh toán ví, đổi lịch hoặc vấn đề đăng nhập. Ghi rõ mã đơn để xử lý nhanh hơn.",
  },
  {
    title: "Hợp tác thương hiệu",
    body: "Studio, shop, agency cần mẫu ảnh theo campaign — gửi brief ngắn và khu vực bạn cần.",
  },
  {
    title: "Hồ sơ mẫu ảnh",
    body: "Duyệt hồ sơ, cập nhật portfolio hay nhận lịch trên app. Đội ngũ sẽ hướng dẫn qua email hoặc Zalo.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Liên hệ CastNow",
          url: `${SITE_URL}/lien-he`,
          about: {
            "@type": "Organization",
            name: "CastNow",
            legalName: COMPANY,
            email: SUPPORT_EMAIL,
            url: SITE_URL,
            sameAs: [ZALO_URL, ...SOCIALS.map((s) => s.href)],
            contactPoint: {
              "@type": "ContactPoint",
              email: SUPPORT_EMAIL,
              contactType: "customer support",
              availableLanguage: "Vietnamese",
            },
          },
        }}
      />
      <JsonLd data={breadcrumbLd("Liên hệ", "/lien-he")} />

      <section className="contact-hero relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 contact-hero-wash" aria-hidden />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#ffd0e4] opacity-70 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#f3d6ff] opacity-60 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-20 lg:pt-12">
          <div>
            <Breadcrumb crumb="Liên hệ" />
            <p
              className="hero-up mt-8 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.28em] text-[#e3146f]"
              style={{ animationDelay: "80ms" }}
            >
              <span className="h-px w-8 bg-[#e3146f]" />
              Liên hệ
            </p>
            <h1
              className="hero-up mt-4 text-[2.35rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#1a2744] sm:text-[3.1rem] lg:text-[3.4rem]"
              style={{ animationDelay: "160ms" }}
            >
              Cast<span className="text-[#e3146f]">Now</span>
              <span className="mt-2 block font-serif text-[0.72em] font-semibold italic tracking-[-0.01em] text-[#a21caf]">
                luôn sẵn sàng nghe bạn
              </span>
            </h1>
            <p
              className="hero-up mt-5 max-w-xl text-[17px] leading-8 text-stone-600"
              style={{ animationDelay: "240ms" }}
            >
              Hỗ trợ đơn, hợp tác studio hay câu hỏi về hồ sơ mẫu ảnh — gửi qua email hoặc Zalo. Đội ngũ phản hồi trong giờ hành chính.
            </p>
            <div className="hero-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "320ms" }}>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#e3146f] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_28px_-10px_rgba(227,20,111,0.5)] transition hover:bg-[#c40f5f]"
              >
                Gửi email
                <span aria-hidden>→</span>
              </a>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3.5 text-[15px] font-bold text-[#1a2744] transition hover:border-[#e3146f] hover:text-[#e3146f]"
              >
                Nhắn Zalo
              </a>
            </div>
          </div>

          <div className="hero-scale relative hidden sm:block" style={{ animationDelay: "200ms" }}>
            <div className="contact-hero-frame relative overflow-hidden rounded-[2rem]">
              <img
                src="/shoots/fashion.webp"
                alt="Mẫu ảnh lookbook trên CastNow"
                className="contact-hero-img h-full w-full object-cover"
                style={{ objectPosition: "center 12%", aspectRatio: "4 / 5", maxHeight: "28rem" }}
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a2744]/70 via-[#1a2744]/10 to-transparent" aria-hidden />
              <div className="contact-hero-badge absolute bottom-5 left-5 right-5 rounded-2xl px-4 py-3.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e3146f]">Đội ngũ CastNow</p>
                <p className="mt-1 text-[15px] font-semibold tracking-[-0.01em] text-[#1a2744]">{COMPANY}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fffafc]" aria-labelledby="contact-channels-title">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#e3146f]">Kênh liên hệ</p>
                <h2 id="contact-channels-title" className="mt-3 max-w-lg text-[1.85rem] font-extrabold tracking-[-0.03em] text-[#1a2744] sm:text-[2.25rem]">
                  Chọn cách <span className="font-serif font-semibold italic text-[#e3146f]">gặp chúng tôi</span>
                </h2>
              </div>
              <p className="max-w-xs text-[14.5px] leading-7 text-stone-500 sm:text-right">
                Ba lối vào — email chính thức, Zalo nhanh, hoặc tự tìm câu trả lời trước.
              </p>
            </div>
          </Reveal>

          <div className="contact-bento mt-10 grid gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
            <Reveal className="h-full lg:col-span-7 lg:row-span-2">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="contact-tile contact-tile-email group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9 lg:min-h-0">
                <span className="contact-tile-orb contact-tile-orb-a" aria-hidden />
                <span className="contact-tile-orb contact-tile-orb-b" aria-hidden />
                <span className="pointer-events-none absolute -right-6 -top-4 select-none font-serif text-[11rem] leading-none text-[#e3146f]/[0.07]" aria-hidden>
                  @
                </span>
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#e3146f] ring-1 ring-pink-100">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
                      <rect x="3" y="6" width="18" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M4 8l8 5.5L20 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Email hỗ trợ
                  </span>
                  <span className="contact-tile-go flex h-11 w-11 items-center justify-center rounded-full bg-[#e3146f] text-lg text-white">→</span>
                </div>
                <p className="relative mt-auto pt-16 font-serif text-[1.85rem] font-semibold italic leading-tight tracking-[-0.02em] text-[#1a2744] sm:text-[2.35rem] lg:text-[2.55rem]">
                  {SUPPORT_EMAIL}
                </p>
                <p className="relative mt-4 max-w-sm text-[15px] leading-7 text-stone-600">
                  Kênh chính thức cho đơn, tài khoản và hợp tác. Phản hồi trong giờ hành chính.
                </p>
              </a>
            </Reveal>

            <Reveal className="h-full lg:col-span-5" delay={80}>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-tile contact-tile-zalo group relative flex h-full min-h-[11.5rem] flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7"
              >
                <span className="pointer-events-none absolute -right-3 bottom-0 select-none text-[7rem] font-extrabold leading-none text-white/[0.06]" aria-hidden>
                  Z
                </span>
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#8eb6ff]">Zalo</p>
                    <p className="mt-2 text-[1.35rem] font-extrabold tracking-[-0.02em] text-white sm:text-[1.5rem]">zalo.me/castnow</p>
                  </div>
                  <span className="contact-tile-go flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">→</span>
                </div>
                <p className="relative mt-auto pt-6 text-[14.5px] leading-7 text-white/65">Chat nhanh với đội ngũ khi cần hỗ trợ tức thì.</p>
              </a>
            </Reveal>

            <Reveal className="h-full lg:col-span-5" delay={140}>
              <Link href="/cau-hoi" className="contact-tile contact-tile-faq group relative flex h-full min-h-[11.5rem] flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7">
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#e3146f]">Câu hỏi thường gặp</p>
                    <p className="mt-2 text-[1.35rem] font-extrabold tracking-[-0.02em] text-[#1a2744] sm:text-[1.5rem]">
                      Xem trước <span className="font-serif font-semibold italic text-[#e3146f]">khi gửi</span>
                    </p>
                  </div>
                  <span className="contact-tile-go flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0f6] text-[#e3146f]">→</span>
                </div>
                <p className="relative mt-auto pt-6 text-[14.5px] leading-7 text-stone-500">
                  Đặt lịch, thanh toán, hồ sơ mẫu — nhiều câu đã có sẵn câu trả lời.
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#fffafc]" aria-labelledby="contact-form-title">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-20">
          <div>
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#a21caf]">Gửi tin nhắn</p>
              <h2 id="contact-form-title" className="mt-3 text-[1.85rem] font-extrabold tracking-[-0.03em] text-[#1a2744] sm:text-[2.1rem]">
                Viết ngắn — <span className="font-serif font-semibold italic text-[#e3146f]">chúng tôi đọc kỹ</span>
              </h2>
              <p className="mt-4 text-[15.5px] leading-7 text-stone-600">
                Điền form bên cạnh. Hệ thống mở email sẵn nội dung tới {SUPPORT_EMAIL}. Càng rõ mã đơn và nhu cầu, phản hồi càng nhanh.
              </p>
            </Reveal>

            <ul className="mt-8 space-y-4">
              {REASONS.map((reason, index) => (
                <Reveal as="li" key={reason.title} delay={index * 70}>
                  <div className="rounded-[1.35rem] border border-pink-100 bg-white px-5 py-4">
                    <p className="text-[15.5px] font-bold text-[#1a2744]">{reason.title}</p>
                    <p className="mt-1.5 text-[14.5px] leading-7 text-stone-600">{reason.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={100}>
            <div className="contact-form-panel rounded-[2rem] border border-pink-100 bg-white p-6 shadow-[0_24px_48px_-28px_rgba(163,16,90,0.35)] sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="contact-company-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#1a2744] px-6 py-10 text-white sm:px-10 sm:py-12">
              <span className="brand-bg pointer-events-none absolute inset-x-0 top-0 h-1.5" aria-hidden />
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e3146f]/20 blur-3xl" aria-hidden />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff8fb8]">Doanh nghiệp</p>
                  <h2 id="contact-company-title" className="mt-3 text-[1.7rem] font-extrabold tracking-[-0.03em] sm:text-[2rem]">
                    Đơn vị vận hành{" "}
                    <span className="font-serif font-semibold italic text-[#ff8fb8]">CastNow</span>
                  </h2>
                  <p className="mt-3 max-w-md text-[15px] leading-7 text-white/70">
                    CastNow là sản phẩm của {COMPANY}. Nền tảng kết nối khách đặt lịch với mẫu ảnh — không trực tiếp cung cấp dịch vụ chụp.
                  </p>
                </div>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Công ty", COMPANY],
                    ["Email", SUPPORT_EMAIL],
                    ["Zalo", "zalo.me/castnow"],
                    ["Website", "castnowvietnam.com"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-white/[0.07] px-5 py-4 ring-1 ring-white/10">
                      <dt className="text-[12px] uppercase tracking-[0.12em] text-white/55">{label}</dt>
                      <dd className="mt-1.5 text-[15px] font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="relative mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
                <p className="mr-auto text-[14px] text-white/60">Theo dõi CastNow</p>
                {SOCIALS.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/10 px-4 py-2 text-[13.5px] font-semibold text-white ring-1 ring-white/15 transition hover:bg-[#e3146f]"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-10 text-center text-[15px] text-stone-500">
              Muốn dùng CastNow ngay?{" "}
              <Link href="/tai-ung-dung" className="font-semibold text-[#e3146f] hover:underline">
                Tải ứng dụng
              </Link>{" "}
              hoặc xem{" "}
              <Link href="/cau-hoi" className="font-semibold text-[#e3146f] hover:underline">
                câu hỏi thường gặp
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
