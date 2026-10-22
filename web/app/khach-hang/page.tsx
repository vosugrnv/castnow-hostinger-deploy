import Link from "next/link";

import { CustomerHero } from "@/components/CustomerHero";
import { SectionHead, StepList } from "@/components/PageKit";
import { Reveal } from "@/components/Reveal";
import { AppCta } from "@/components/SampleSections";
import { ShootTile } from "@/components/ShootArt";
import { FAQ_GROUPS, SERVICES, ZALO_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Đặt lịch mẫu ảnh đúng concept",
  description:
    "Đặt mẫu ảnh trên CastNow. Chọn chân dung, thời trang, sản phẩm, cưới hoặc sự kiện, xem portfolio và chọn mẫu phù hợp yêu cầu, chốt báo giá trên đơn.",
  path: "/khach-hang",
});

const STEPS = [
  { title: "Đăng nhập bằng số điện thoại", body: "Tải CastNow, đăng nhập bằng số của bạn và chọn tỉnh thành buổi chụp.", img: "/float-shield-out.webp" },
  { title: "Nhập địa điểm chụp", body: "Studio, quán, công viên hoặc nhà. Địa điểm lưu lại để lần sau đặt nhanh hơn.", img: "/float-house-out.webp" },
  { title: "Chọn kiểu chụp hoặc hỏi trợ lý AI", body: "Chọn chân dung, thời trang, sản phẩm… hoặc kể concept để trợ lý gợi ý.", img: "/ai-robot-v3.webp" },
  { title: "Xem báo giá, tự chọn mẫu", body: "So portfolio, khu vực nhận lịch, khoảng cách và mức giá rồi bấm chọn.", img: "/float-coins-out.webp" },
  { title: "Theo dõi đến khi buổi chụp xong", body: "Nhắn brief trong đơn, thanh toán trên app hoặc QR, đánh giá sau buổi chụp.", img: "/radius-chat.webp" },
];

const BENEFITS = [
  { img: "/radius-pin.webp", title: "Mẫu ở gần địa điểm", body: "App ưu tiên mẫu ảnh trong bán kính khoảng 10km và hiện khoảng cách trước khi bạn chốt." },
  { img: "/coin-dollar.webp", title: "Biết giá trước khi đồng ý", body: "Mẫu ảnh gửi báo giá trên đơn kèm khung giờ và phạm vi buổi chụp." },
  { img: "/radius-chat.webp", title: "Brief nằm trong đơn", body: "Đổi giờ, gửi moodboard, hỏi thêm đều nhắn trong đơn. Không cần đưa số điện thoại ra ngoài ngay từ đầu." },
  { img: "/float-shield-out.webp", title: "Hồ sơ đã được xét duyệt", body: "Mẫu ảnh khai portfolio, khu vực và ảnh chân dung, được duyệt trước khi nhận lịch." },
];

const QUICK_FAQ = FAQ_GROUPS.flatMap((group) => group.items).filter((item) =>
  ["Đặt lịch mất bao lâu?", "Giá buổi chụp được tính thế nào?", "Muốn đổi giờ hoặc hủy lịch thì làm sao?"].includes(item.q),
);

const QA_ICONS: Record<string, string> = {
  "Đặt lịch mất bao lâu?": "/float-clock-out.webp",
  "Giá buổi chụp được tính thế nào?": "/coin-dollar.webp",
  "Muốn đổi giờ hoặc hủy lịch thì làm sao?": "/radius-chat.webp",
};

const FAQ_COUNT = FAQ_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

export default function CustomerPage() {
  return (
    <main>
      <CustomerHero />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead
            kicker="Cách đặt" center
            title="Đặt Lịch Chụp Trên CastNow Trong 5 Bước"
            lead="Từ lúc mở app đến lúc mẫu ảnh có mặt, mỗi bước đều hiện trên màn hình để bạn biết lịch đang ở đâu."
          />
          <StepList steps={STEPS} />
        </div>
      </section>

      <section id="nhom-viec" className="scroll-mt-20 bg-[#f6f8fb]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead
            kicker="Dịch vụ" center
            title="Các Kiểu Buổi Chụp Trong Một App"
            lead="Chọn đúng kiểu, mô tả concept — app tìm mẫu ảnh phù hợp quanh địa điểm của bạn."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Reveal as="li" key={service.title} delay={(index % 3) * 80}>
                <div className="lift-card img-zoom flex h-full items-center gap-4 overflow-hidden rounded-[1.4rem] bg-white p-3 pr-5 ring-1 ring-stone-100">
                  <ShootTile kind={service.kind} small className="h-24 w-24 shrink-0 rounded-2xl" />
                  <span className="min-w-0">
                    <span className="text-[12px] font-bold text-[#e3146f]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-0.5 text-[16.5px] font-bold leading-snug tracking-[-0.01em] text-[#1a2744]">{service.title}</h3>
                    <p className="mt-1 text-[14px] leading-6 text-stone-500">{service.note}</p>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead kicker="Lý do chọn" center title="Vì Sao Đặt Buổi Chụp Qua CastNow" />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {BENEFITS.map((item, index) => (
              <Reveal as="li" key={item.title} delay={(index % 2) * 100}>
                <div className="lift-card flex h-full gap-5 rounded-[1.4rem] border border-stone-200 bg-white p-6">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#fff0f6]">
                    <img src={item.img} alt="" className="lift-icon h-11 w-11 object-contain" />
                  </span>
                  <span>
                    <h3 className="text-[18px] font-bold tracking-[-0.01em] text-[#1a2744]">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-stone-600">{item.body}</p>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#f6f8fb]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead
            center
            kicker="Hỏi nhanh"
            title="Câu Hỏi Khách Hay Gặp"
            lead="Ba điều khách thường hỏi trước khi đặt buổi chụp lần đầu."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {QUICK_FAQ.map((item, index) => (
              <Reveal as="li" key={item.q} delay={index * 100}>
                <article className="qa-card group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-stone-200 bg-white p-7">
                  <span
                    className="qa-num pointer-events-none absolute right-6 top-5 select-none text-[4.25rem] font-extrabold leading-none text-[#eef1f6]"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0f6]">
                    <img src={QA_ICONS[item.q] ?? "/ai-pic-bubble.webp"} alt="" className="qa-icon h-9 w-9 object-contain" />
                  </span>
                  <h3 className="relative mt-6 text-[19px] font-bold leading-snug tracking-[-0.015em] text-[#1a2744]">{item.q}</h3>
                  <span className="qa-line relative mt-4 block h-[3px] w-10 rounded-full bg-[#e3146f]" aria-hidden />
                  <p className="relative mt-4 text-[15px] leading-7 text-stone-600">{item.a}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-8">
            <div className="relative flex flex-col items-start gap-5 overflow-hidden rounded-[1.6rem] bg-[#1a2744] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <span className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/[0.05]" aria-hidden />
              <div className="relative flex items-center gap-4">
                <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 sm:flex">
                  <img src="/ai-robot-v3.webp" alt="" className="float-a h-10 w-10 object-contain" />
                </span>
                <div>
                  <p className="text-[19px] font-bold tracking-[-0.015em]">Chưa thấy câu bạn cần?</p>
                  <p className="mt-1 text-[14.5px] leading-6 text-white/70">
                    {FAQ_COUNT} câu hỏi về đặt lịch, thanh toán, mẫu ảnh và tài khoản đang chờ bạn.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-wrap gap-3">
                <Link
                  href="/cau-hoi"
                  className="btn-lift inline-flex items-center gap-2 rounded-full bg-[#e3146f] px-5 py-3 text-[14.5px] font-semibold text-white hover:bg-[#ff3d7f]"
                >
                  Xem tất cả câu hỏi <span aria-hidden>→</span>
                </Link>
                <Link
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lift inline-flex items-center rounded-full bg-white/10 px-5 py-3 text-[14.5px] font-semibold text-white ring-1 ring-white/25 hover:bg-white/15"
                >
                  Nhắn Zalo
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AppCta />
    </main>
  );
}
