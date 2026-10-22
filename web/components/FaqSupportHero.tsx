import { Breadcrumb, JsonLd, breadcrumbLd } from "@/components/PageKit";
import { FAQ_GROUPS, SUPPORT_EMAIL, ZALO_URL } from "@/lib/site";

const CHIPS = [
  { img: "/icon3d-chat.webp", label: "Đặt lịch thế nào?", className: "faq-hero-chip faq-hero-chip-a" },
  { img: "/coin-dollar.webp", label: "Thanh toán ra sao?", className: "faq-hero-chip faq-hero-chip-b" },
  { img: "/float-star-out.webp", label: "Nhận lịch chụp", className: "faq-hero-chip faq-hero-chip-c" },
] as const;

/** Hero trung tâm hỗ trợ — chữ trái, robot + chip nổi phải. */
export function FaqSupportHero() {
  return (
    <section className="faq-hero relative overflow-hidden" aria-labelledby="faq-hero-title">
      <JsonLd data={breadcrumbLd("Câu hỏi thường gặp", "/cau-hoi")} />
      <span className="faq-hero-blob faq-hero-blob-a" aria-hidden />
      <span className="faq-hero-blob faq-hero-blob-b" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 lg:pb-20 lg:pt-12">
        <div>
          <Breadcrumb crumb="Câu hỏi thường gặp" />
          <p
            className="hero-up mt-8 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em] text-[#e3146f]"
            style={{ animationDelay: "80ms" }}
          >
            <span className="h-px w-8 bg-[#e3146f]" aria-hidden />
            Trung tâm hỗ trợ
          </p>
          <h1
            id="faq-hero-title"
            className="hero-up mt-4 text-[2.2rem] font-extrabold leading-[1.12] tracking-[-0.035em] text-[#1a2744] sm:text-[2.85rem] lg:text-[3.05rem]"
            style={{ animationDelay: "160ms" }}
          >
            Câu Hỏi Thường Gặp <span className="text-[#e3146f]">Về CastNow</span>
          </h1>
          <p
            className="hero-up mt-5 max-w-xl text-[17px] leading-8 text-stone-600"
            style={{ animationDelay: "240ms" }}
          >
            Mọi điều cần biết về đặt mẫu ảnh, giá và thanh toán, nhận lịch làm mẫu và tài khoản. Chưa thấy câu trả lời?
            Viết cho đội ngũ CastNow qua email hoặc Zalo.
          </p>
          <div className="hero-up mt-8 flex flex-wrap gap-2.5" style={{ animationDelay: "320ms" }}>
            {FAQ_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="btn-lift rounded-full bg-white px-4 py-2.5 text-[14px] font-semibold text-[#1a2744] shadow-sm ring-1 ring-stone-200/90 transition hover:ring-[#e3146f]"
              >
                {group.title}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-scale relative mx-auto w-full max-w-[440px]" style={{ animationDelay: "200ms" }} aria-hidden>
          <div className="faq-hero-stage relative mx-auto aspect-square w-full max-w-[400px]">
            <span className="faq-hero-orbit faq-hero-orbit-outer" />
            <span className="faq-hero-orbit faq-hero-orbit-mid" />
            <span className="faq-hero-spot" />
            <img src="/ai-robot-v3.webp" alt="" className="faq-hero-robot float-a" />
            {CHIPS.map((chip) => (
              <div key={chip.label} className={chip.className}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff0f6]">
                  <img src={chip.img} alt="" className="h-6 w-6 object-contain" />
                </span>
                <span className="text-[13.5px] font-semibold leading-snug text-[#1a2744]">{chip.label}</span>
              </div>
            ))}
          </div>
          <p className="sr-only">
            Minh họa trợ lý CastNow kèm gợi ý đặt lịch, thanh toán và nhận lịch chụp.
          </p>
        </div>
      </div>

      <div className="relative border-t border-pink-100/80 bg-white/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 text-[13.5px] text-stone-500 sm:px-6">
          <p>
            Không thấy câu trả lời?{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-[#e3146f] hover:underline">
              Gửi email
            </a>{" "}
            hoặc{" "}
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#e3146f] hover:underline">
              nhắn Zalo
            </a>
            .
          </p>
          <a href="#co-ban" className="inline-flex items-center gap-1.5 font-semibold text-[#1a2744] hover:text-[#e3146f]">
            Xem theo chủ đề <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
