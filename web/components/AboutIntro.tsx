import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { COMPANY } from "@/lib/site";

const AUDIENCES = [
  {
    tag: "Khách hàng & doanh nghiệp",
    index: "01",
    tone: "customer" as const,
    title: "Đặt buổi chụp như đặt một cuộc hẹn",
    body: "Cá nhân, cặp đôi, shop hay thương hiệu chọn kiểu chụp, xem portfolio và chốt lịch trong vài phút. Giá, số ảnh và quyền dùng ghi rõ trên đơn.",
    points: ["Chọn concept & mẫu", "Báo giá trên đơn", "Theo dõi lịch chụp"],
    href: "/khach-hang",
    cta: "Dành cho khách hàng",
    image: "/shoots/fashion.webp",
    imageAlt: "Mẫu ảnh lookbook cho khách đặt lịch",
  },
  {
    tag: "Mẫu ảnh",
    index: "02",
    tone: "model" as const,
    title: "Portfolio của bạn là tấm danh thiếp",
    body: "Chủ động nhận lịch lookbook, quảng cáo và concept quanh khu vực bạn ở. Không chờ casting qua tin nhắn — lời mời hiện thẳng trên app.",
    points: ["Hồ sơ được duyệt", "Lịch mời trong app", "Thanh toán rõ ràng"],
    href: "/nhan-lich-chup",
    cta: "Nhận lịch làm mẫu",
    image: "/shoots/portrait.webp",
    imageAlt: "Mẫu ảnh nhận lịch trên CastNow",
  },
];

const VALUES = [
  { n: "01", title: "Minh bạch", body: "Báo giá, phạm vi và thời hạn bàn giao ảnh nằm trên đơn trước buổi chụp." },
  { n: "02", title: "Gần bạn", body: "Ưu tiên mẫu ảnh đang nhận lịch trong bán kính khoảng 10km quanh địa điểm chụp." },
  { n: "03", title: "Bạn tự chọn", body: "App gợi ý, nhưng bạn xem portfolio, so sánh và tự quyết định mẫu ảnh." },
  { n: "04", title: "Chuyên nghiệp", body: "Hồ sơ được xét duyệt, đánh giá thật sau mỗi buổi chụp được giữ trên hồ sơ." },
];

export function AboutIntro({ moreLink = true }: { moreLink?: boolean }) {
  return (
    <section id="gioi-thieu-castnow" className="about-intro relative scroll-mt-20 overflow-hidden bg-white" aria-labelledby="about-title">
      <div className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full bg-[#f3d6ff] opacity-60 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#ffe0ea] opacity-70 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[#a21caf]">
            <span className="brand-bg h-[2px] w-10 rounded-full" />
            Giới thiệu CastNow
          </p>
          <h2 id="about-title" className="mt-5 max-w-4xl text-[2.2rem] font-extrabold leading-[1.12] tracking-[-0.035em] text-[#1a2744] sm:text-[3rem] lg:text-[3.5rem]">
            Kết nối mọi buổi chụp với{" "}
            <span className="brand-text whitespace-nowrap pr-1 font-serif font-semibold italic tracking-[-0.01em]">đúng mẫu ảnh</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 max-w-4xl text-[1.3rem] font-medium leading-[1.65] tracking-[-0.01em] text-[#3d475c] sm:text-[1.6rem]">
            CastNow là nền tảng đặt lịch{" "}
            <span className="font-bold text-[#e3146f]">mẫu ảnh</span> tại Việt Nam. Từ một buổi{" "}
            <span className="hero-underline font-semibold text-[#1a2744]">headshot ba mươi phút</span> đến cả bộ{" "}
            <span className="hero-underline font-semibold text-[#1a2744]">lookbook cho thương hiệu</span>, bạn tìm mẫu phù hợp,
            xem portfolio, chốt giá và lịch hẹn{" "}
            <span className="font-serif text-[1.08em] italic text-[#a21caf]">ngay trên một ứng dụng.</span>
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <Reveal>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.22em] text-stone-400">Câu chuyện của chúng tôi</h3>
            <p className="mt-4 text-[1.35rem] font-bold leading-snug tracking-[-0.02em] text-[#1a2744] sm:text-[1.55rem]">
              Một buổi chụp đẹp không nên bắt đầu bằng{" "}
              <span className="text-[#e3146f]">hàng chục tin nhắn</span>.
            </p>
            <div className="mt-5 space-y-4 text-[16px] leading-8 text-stone-600">
              <p>
                Trước đây, muốn thuê mẫu ảnh, bạn phải đăng bài trong hội nhóm, nhắn tin từng fanpage, chờ báo giá và đoán
                xem portfolio có đúng là của người đó không. Lịch hẹn nằm rải rác trong tin nhắn, đổi giờ hay hủy sát ngày là chuyện thường gặp.
              </p>
              <p>
                <strong className="font-semibold text-[#1a2744]">CastNow ra đời để gom tất cả về một chỗ.</strong> Hồ sơ được xét duyệt,
                portfolio hiện rõ, báo giá gửi trên đơn, lịch chụp có trạng thái theo dõi. Bạn dành thời gian cho concept và trang phục, phần
                tìm mẫu và chốt lịch để CastNow lo.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <figure className="about-quote relative h-full overflow-hidden rounded-[2rem] bg-[#1a2744] p-8 text-white sm:p-10">
              <span className="brand-text pointer-events-none absolute -top-6 left-6 select-none font-serif text-[9rem] leading-none" aria-hidden>
                “
              </span>
              <blockquote className="relative mt-10 font-serif text-[1.55rem] font-medium italic leading-[1.45] sm:text-[1.8rem]">
                Một bức ảnh đẹp bắt đầu từ việc gặp đúng người cầm máy và đúng người đứng trước ống kính.
              </blockquote>
              <figcaption className="relative mt-8 flex items-center gap-3 text-[14px] text-white/70">
                <img src="/logo-castnow.webp" alt="" className="h-9 w-9 rounded-xl bg-white p-1" />
                <span>
                  <span className="block font-semibold text-white">Đội ngũ CastNow</span>
                  <span className="block text-[12.5px]">{COMPANY}</span>
                </span>
              </figcaption>
              <span className="brand-bg pointer-events-none absolute inset-x-0 bottom-0 h-1.5" aria-hidden />
            </figure>
          </Reveal>
        </div>

        <div className="about-for-who mt-20 rounded-[2.2rem] px-4 py-12 sm:px-8 sm:py-14 lg:px-10">
          <Reveal>
            <p className="text-center text-[12px] font-bold uppercase tracking-[0.28em] text-[#a21caf]">CastNow dành cho ai</p>
            <h3 className="mx-auto mt-4 max-w-2xl text-center text-[1.85rem] font-extrabold leading-tight tracking-[-0.03em] text-[#1a2744] sm:text-[2.25rem]">
              Hai lối vào — <span className="font-serif font-semibold italic text-[#e3146f]">một nền tảng</span>
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-[15.5px] leading-7 text-stone-500">
              Khách đặt lịch buổi chụp. Mẫu ảnh nhận lịch đúng concept. Cùng app CastNow.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {AUDIENCES.map((item, index) => (
              <Reveal as="li" key={item.tag} delay={index * 100}>
                <article className={`about-for-who-card about-for-who-card-${item.tone} group flex h-full flex-col overflow-hidden rounded-[1.75rem]`}>
                  <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="about-for-who-img h-full w-full object-cover"
                      style={{ objectPosition: item.tone === "model" ? "center 22%" : "center 28%" }}
                      loading="lazy"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a2744]/75 via-[#1a2744]/15 to-transparent" aria-hidden />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a2744] shadow-sm">
                      {item.tag}
                    </span>
                    <span className="absolute bottom-4 right-4 font-serif text-[2.75rem] font-semibold italic leading-none text-white/90" aria-hidden>
                      {item.index}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
                    <h4 className="text-[1.35rem] font-extrabold leading-snug tracking-[-0.02em] text-[#1a2744] sm:text-[1.45rem]">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-[15px] leading-7 text-stone-600">{item.body}</p>
                    <ul className="mt-5 space-y-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-center gap-2.5 text-[14px] font-medium text-[#1a2744]">
                          <span className="brand-bg h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={item.href}
                      className={`about-for-who-cta mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-bold text-white sm:w-auto sm:self-start`}
                    >
                      {item.cta}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-20 rounded-[2rem] bg-[#fff6fa] px-6 py-10 ring-1 ring-pink-100 sm:px-10 lg:py-12">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-[1.6rem] font-extrabold tracking-[-0.025em] text-[#1a2744] sm:text-[1.9rem]">
                Giá trị <span className="font-serif font-semibold italic text-[#c026d3]">chúng tôi theo đuổi</span>
              </h3>
              {moreLink ? (
                <Link href="/gioi-thieu" className="cta-more text-[14.5px] font-semibold text-[#e3146f]">
                  Tìm hiểu thêm về CastNow <span aria-hidden>→</span>
                </Link>
              ) : null}
            </div>
          </Reveal>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <Reveal as="li" key={value.n} delay={index * 80}>
                <span className="brand-text block font-serif text-[2.6rem] font-semibold italic leading-none">{value.n}</span>
                <h4 className="mt-3 text-[17px] font-bold tracking-[-0.01em] text-[#1a2744]">{value.title}</h4>
                <p className="mt-2 text-[14.5px] leading-7 text-stone-600">{value.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <p className="mt-10 text-center text-[13.5px] text-stone-400">
            CastNow được phát triển và vận hành bởi <span className="font-semibold text-stone-500">{COMPANY}</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
