import Link from "next/link";

import { AboutHero } from "@/components/AboutHero";
import { AboutIntro } from "@/components/AboutIntro";
import { FaqExclusive } from "@/components/FaqExclusive";
import { JsonLd, SectionHead } from "@/components/PageKit";
import { Reveal } from "@/components/Reveal";
import { StoreButton } from "@/components/SampleSections";
import { ShootTile, type ShootKind } from "@/components/ShootArt";
import { APP_STORE_URL, COMPANY, PLAY_STORE_URL, SITE_URL, SUPPORT_EMAIL, ZALO_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Về CastNow – Đặt lịch mẫu ảnh đúng concept",
  description:
    "CastNow do LITETECH COMPANY LIMITED phát triển, kết nối người cần buổi chụp với mẫu ảnh gần địa điểm. 8 kiểu chụp, 63 tỉnh thành.",
  path: "/gioi-thieu",
});

const FACTS = [
  { value: "8", label: "kiểu buổi chụp", note: "Chân dung, thời trang, sản phẩm, cưới, sự kiện…" },
  { value: "63", label: "tỉnh thành", note: "Chọn khu vực ngay khi mở app" },
  { value: "10km", label: "bán kính ưu tiên", note: "Mẫu ảnh ở gần địa điểm của bạn" },
  { value: "1", label: "đơn cho mọi việc", note: "Brief, lịch, giá và thanh toán chung một chỗ" },
];

const GALLERY: { kind: ShootKind; label: string; span: string }[] = [
  { kind: "wedding", label: "Pre-wedding Hội An", span: "sm:col-span-2 sm:row-span-2" },
  { kind: "fashion", label: "Lookbook phố Sài Gòn", span: "" },
  { kind: "portrait", label: "Chân dung studio", span: "" },
  { kind: "outdoor", label: "Ngoại cảnh Đà Lạt", span: "" },
  { kind: "product", label: "Ảnh sản phẩm", span: "" },
  { kind: "family", label: "Gia đình tại nhà", span: "sm:col-span-2" },
  { kind: "commercial", label: "Ảnh thương hiệu", span: "" },
  { kind: "event", label: "Sự kiện khai trương", span: "" },
];

const FEATURES = [
  { img: "/icon3d-chat.webp", title: "Trợ lý AI", body: "Kể concept bằng lời thường, trợ lý gợi ý kiểu chụp và người gần phong cách." },
  { img: "/icon3d-pin.webp", title: "Bản đồ 10km", body: "Thấy mẫu ảnh quanh địa điểm trước khi chốt lịch." },
  { img: "/icon3d-calendar.webp", title: "Lịch và trạng thái đơn", body: "Biết ai đã nhận lịch, đang đến hay buổi chụp đã xong." },
  { img: "/icon3d-camera.webp", title: "Portfolio đã duyệt", body: "Hồ sơ, ảnh portfolio và đánh giá thật sau mỗi buổi chụp." },
  { img: "/radius-chat.webp", title: "Brief trong đơn", body: "Gửi moodboard, đổi giờ, hỏi thêm mà không cần đưa số riêng." },
  { img: "/coin-dollar.webp", title: "Thanh toán và ví", body: "Trả trong app hoặc quét QR tại buổi chụp, người nhận lịch rút tiền từ ví." },
];

const ABOUT_FAQS = [
  {
    q: "CastNow là gì?",
    a: "CastNow là nền tảng đặt lịch mẫu ảnh. Bạn chọn kiểu buổi chụp, xem hồ sơ, portfolio và báo giá, rồi chốt lịch ngay trên app. Mẫu ảnh bạn chọn đến đúng địa điểm, đúng khung giờ.",
  },
  {
    q: "CastNow có trực tiếp chụp ảnh không?",
    a: "Không. CastNow là nền tảng kết nối. Người thực hiện buổi chụp là mẫu ảnh bạn chọn. Giá, giờ và phạm vi buổi chụp được chốt trên đơn.",
  },
  {
    q: "Mẫu ảnh có phải nhân viên của CastNow không?",
    a: "Không. Mẫu ảnh là đối tác nhận lịch trên nền tảng, tự sắp xếp thời gian và chịu trách nhiệm buổi đã nhận. Hồ sơ và portfolio được xét duyệt trước khi nhận lịch.",
  },
  {
    q: "CastNow hoạt động ở những tỉnh thành nào?",
    a: "CastNow phủ 63 tỉnh thành. Sau khi bạn nhập địa điểm chụp, app ưu tiên mẫu ảnh đang nhận lịch trong bán kính khoảng 10km và hiện khoảng cách trước khi bạn chốt.",
  },
  {
    q: "Giá buổi chụp trên CastNow được tính thế nào?",
    a: "CastNow không áp một bảng giá cứng. Người nhận lịch đọc brief rồi gửi báo giá trên đơn, tùy kiểu chụp, thời lượng, số ảnh bàn giao và địa điểm. Bạn thấy mức giá trước khi đồng ý.",
  },
  {
    q: "Studio, thương hiệu muốn hợp tác với CastNow thì liên hệ ở đâu?",
    a: `Gửi email về ${SUPPORT_EMAIL} với tên đơn vị, nhu cầu và khu vực. Đội ngũ CastNow sẽ phản hồi qua email hoặc Zalo.`,
  },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: COMPANY,
          brand: { "@type": "Brand", name: "CastNow" },
          url: SITE_URL,
          logo: `${SITE_URL}/logo-castnow.png`,
          email: SUPPORT_EMAIL,
          sameAs: [ZALO_URL],
          contactPoint: { "@type": "ContactPoint", email: SUPPORT_EMAIL, contactType: "customer support", availableLanguage: "Vietnamese" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ABOUT_FAQS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <AboutHero />

      <AboutIntro moreLink={false} />

      <section className="brand-radius relative overflow-hidden text-white" aria-label="CastNow qua những con số">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-white/10 blur-2xl" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.32em] text-white/80">CastNow qua những con số</p>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {FACTS.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 90} className="text-center lg:border-l lg:border-white/25 lg:first:border-l-0">
                <dt className="font-serif text-[3.4rem] font-semibold italic leading-none sm:text-[4.2rem]">{fact.value}</dt>
                <dd className="mt-3">
                  <span className="block text-[15px] font-bold uppercase tracking-[0.14em]">{fact.label}</span>
                  <span className="mx-auto mt-2 block max-w-[22ch] text-[14px] leading-6 text-white/75">{fact.note}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="gallery-title">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHead
              kicker="Khoảnh khắc"
              title={
                <span id="gallery-title">
                  Những Buổi Chụp <span className="brand-text font-serif font-semibold italic">trên CastNow</span>
                </span>
              }
              lead="Mỗi kiểu chụp một câu chuyện, từ phố cổ Hội An, đồi thông Đà Lạt đến studio giữa lòng Sài Gòn."
            />
            <Link href="/mau-anh-nhiep-anh-gia" className="cta-more shrink-0 text-[15px] font-semibold text-[#e3146f]">
              Xem hồ sơ mẫu ảnh <span aria-hidden>→</span>
            </Link>
          </div>
          <ul className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4">
            {GALLERY.map((item, index) => (
              <Reveal as="li" key={item.kind} delay={(index % 4) * 70} className={`community-card ${item.span}`}>
                <ShootTile kind={item.kind} frame={false} className="h-full w-full rounded-[1.4rem]" label={item.label} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#f7f2f6]" aria-labelledby="features-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 lg:py-24">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_rgba(26,39,68,0.16)]">
              <ShootTile kind="photographer" className="aspect-[4/5] w-full" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a2744]/90 via-[#1a2744]/40 to-transparent p-7 pt-24 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ff8fb8]">Một app, hai phía</p>
                <p className="mt-2 font-serif text-[1.6rem] italic leading-snug">Khách đặt lịch, mẫu ảnh nhận lịch, cùng trên một đơn.</p>
              </div>
            </div>
            <div className="float-b absolute -right-4 -top-6 hidden w-36 overflow-hidden rounded-2xl shadow-[0_18px_36px_rgba(26,39,68,0.2)] ring-4 ring-white sm:block">
              <ShootTile kind="model" small className="aspect-square w-full" />
            </div>
          </Reveal>
          <div>
            <SectionHead
              kicker="Sản phẩm"
              title={<span id="features-title">Trong App CastNow Có Gì</span>}
              lead="Mỗi tính năng phục vụ một bước của buổi chụp, từ lúc tìm người đến lúc nhận ảnh."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature, index) => (
                <Reveal as="li" key={feature.title} delay={(index % 2) * 80}>
                  <div className="lift-card flex h-full gap-4 rounded-[1.3rem] bg-white p-5 ring-1 ring-stone-100">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fff0f6]">
                      <img src={feature.img} alt="" className="lift-icon h-10 w-10 object-contain" />
                    </span>
                    <span className="min-w-0">
                      <h3 className="text-[16.5px] font-bold tracking-[-0.01em] text-[#1a2744]">{feature.title}</h3>
                      <p className="mt-1.5 text-[14.5px] leading-6 text-stone-600">{feature.body}</p>
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <div className="relative grid gap-8 overflow-hidden rounded-[2rem] bg-[#1a2744] p-8 text-white sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
              <span className="brand-bg pointer-events-none absolute inset-x-0 top-0 h-1.5" aria-hidden />
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff8fb8]">Thông tin doanh nghiệp</p>
                <h2 className="mt-3 text-[1.8rem] font-extrabold tracking-[-0.03em]">
                  Đơn Vị Phát Triển <span className="font-serif font-semibold italic text-[#ff8fb8]">CastNow</span>
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  Cần hỗ trợ về đơn, tài khoản hay hợp tác với thương hiệu, studio, liên hệ trực tiếp với đội ngũ CastNow.
                </p>
              </div>
              <dl className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Doanh nghiệp", COMPANY, null],
                  ["Sản phẩm", "Ứng dụng CastNow", null],
                  ["Email hỗ trợ", SUPPORT_EMAIL, `mailto:${SUPPORT_EMAIL}`],
                  ["Zalo", "zalo.me/castnow", ZALO_URL],
                ].map(([label, value, href]) => (
                  <div key={label} className="rounded-2xl bg-white/[0.07] px-5 py-4 ring-1 ring-white/10">
                    <dt className="text-[12.5px] uppercase tracking-[0.12em] text-white/55">{label}</dt>
                    <dd className="mt-1.5 text-[15.5px] font-semibold">
                      {href ? (
                        <a href={href} className="footer-link" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="cau-hoi" className="scroll-mt-20 bg-[#fffafc]" aria-labelledby="about-faq-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 lg:py-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#a21caf]">
              <span className="h-px w-8 bg-[#a21caf]" />
              Hỏi đáp
            </p>
            <h2 id="about-faq-title" className="mt-4 text-[2.1rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#1a2744] sm:text-[2.5rem]">
              Câu Hỏi Thường Gặp <span className="brand-text font-serif font-semibold italic">về CastNow</span>
            </h2>
            <p className="mt-4 text-[15.5px] leading-7 text-stone-600">
              Những điều người dùng hay hỏi về nền tảng, đơn vị vận hành và cách CastNow kết nối khách với mẫu ảnh.
            </p>
            <div className="mt-7 rounded-[1.4rem] bg-white p-5 ring-1 ring-pink-100">
              <p className="text-[15px] font-bold text-[#1a2744]">Chưa thấy câu trả lời?</p>
              <p className="mt-1 text-[14px] leading-6 text-stone-500">Viết cho đội ngũ CastNow, kèm mã đơn nếu có.</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex rounded-full bg-[#1a2744] px-4 py-2 text-[13.5px] font-semibold text-white transition hover:bg-[#e3146f]">
                  {SUPPORT_EMAIL}
                </a>
                <Link href="/cau-hoi" className="inline-flex rounded-full border border-stone-200 px-4 py-2 text-[13.5px] font-semibold text-[#1a2744] transition hover:border-[#e3146f]">
                  Tất cả câu hỏi →
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <FaqExclusive name="about-faq" />
            {ABOUT_FAQS.map((item, index) => (
              <details key={item.q} name="about-faq" open={index === 0} className="faq-item rounded-[1.2rem] border border-stone-200 bg-white px-6 py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-[16.5px] font-semibold leading-snug text-[#1a2744]">
                  <h3>{item.q}</h3>
                  <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff0f6] text-[20px] leading-none text-[#e3146f]">+</span>
                </summary>
                <p className="faq-body mt-3 text-[15.5px] leading-7 text-stone-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="tai-app" className="scroll-mt-20 bg-white" aria-labelledby="about-cta-title">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.2rem] bg-[#1a1434] text-white shadow-[0_40px_80px_rgba(60,14,70,0.25)]">
              <img src="/dalat-bg.webp" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(26,20,52,0.95)_0%,rgba(60,14,70,0.82)_48%,rgba(163,16,90,0.45)_100%)]" aria-hidden />
              <span className="brand-bg pointer-events-none absolute inset-x-0 top-0 h-1.5" aria-hidden />

              <div className="relative grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 lg:px-14 lg:py-16">
                <div>
                  <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.26em] text-[#ff8fb8]">
                    <span className="h-px w-8 bg-[#ff8fb8]" />
                    Bắt đầu với CastNow
                  </p>
                  <h2 id="about-cta-title" className="mt-4 text-[2.1rem] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[2.8rem]">
                    Buổi chụp tiếp theo
                    <br />
                    <span className="font-serif font-semibold italic text-[#ffb3cf]">bắt đầu từ một chạm.</span>
                  </h2>
                  <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/75">
                    Tải CastNow để đặt mẫu ảnh gần địa điểm, hoặc mở hồ sơ để nhận lịch làm mẫu ngay trong app.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <span className="cta-store rounded-xl ring-1 ring-white/25">
                      <StoreButton href={APP_STORE_URL} store="App Store" apple />
                    </span>
                    <span className="cta-store rounded-xl ring-1 ring-white/25">
                      <StoreButton href={PLAY_STORE_URL} store="Google Play" />
                    </span>
                    <span className="flex items-center gap-3 rounded-xl bg-white/10 py-1.5 pl-1.5 pr-4 ring-1 ring-white/20 backdrop-blur">
                      <img src="/qr-castnow.png" alt="Mã QR tải CastNow" className="h-12 w-12 rounded-lg bg-white p-0.5" />
                      <span className="max-w-[96px] text-[11.5px] leading-4 text-white/75">Quét mã QR để tải ứng dụng</span>
                    </span>
                  </div>
                </div>

                <ul className="grid gap-4">
                  {[
                    { kind: "model" as ShootKind, eyebrow: "Bạn cần buổi chụp", title: "Đặt mẫu ảnh đúng concept", href: "/khach-hang" },
                    { kind: "photographer" as ShootKind, eyebrow: "Bạn là mẫu ảnh", title: "Nhận lịch làm mẫu trên CastNow", href: "/nhan-lich-chup" },
                  ].map((path, index) => (
                    <Reveal as="li" key={path.href} delay={index * 100}>
                      <Link
                        href={path.href}
                        className="group flex items-center gap-4 rounded-[1.4rem] bg-white/10 p-3 pr-5 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/[0.16] hover:ring-white/40"
                      >
                        <ShootTile kind={path.kind} small frame={false} className="h-20 w-20 shrink-0 rounded-2xl" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff8fb8]">{path.eyebrow}</span>
                          <span className="mt-1 block text-[17px] font-bold leading-snug">{path.title}</span>
                        </span>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[18px] text-[#e3146f] transition group-hover:translate-x-1" aria-hidden>
                          →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
