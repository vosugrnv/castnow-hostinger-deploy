import { SectionHead, StepList } from "@/components/PageKit";
import { TaskerHero } from "@/components/TaskerHero";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { AppCta } from "@/components/SampleSections";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Nhận lịch làm mẫu ảnh trên CastNow",
  description:
    "Đăng ký mẫu ảnh trên CastNow: nhận lịch chân dung, thời trang, sản phẩm, cưới và sự kiện quanh khu bạn chọn.",
  path: "/nhan-lich-chup",
});

const TRADES = [
  "Mẫu ảnh chân dung",
  "Mẫu thời trang",
  "Chân dung",
  "Thời trang / lookbook",
  "Chụp sản phẩm",
  "Chụp cưới",
  "Chụp sự kiện",
  "Chụp gia đình",
  "Ngoại cảnh",
  "Ảnh thương mại",
];

const STEPS = [
  { title: "Tải app và đăng nhập", body: "Cài CastNow, đăng nhập bằng số điện thoại của bạn.", img: "/logo-castnow.webp" },
  { title: "Chọn hồ sơ mẫu ảnh", body: "Gửi phong cách bạn nhận và các kiểu buổi chụp bạn làm được.", img: "/float-medal-out.webp" },
  { title: "Thêm portfolio, khai khu vực", body: "Ảnh chân dung rõ và khu vực bạn nhận lịch hằng ngày.", img: "/float-marker-out.webp" },
  { title: "Được duyệt, bật nhận lịch", body: "Sau khi hồ sơ được duyệt, bật nhận lịch theo tỉnh thành bạn đang ở.", img: "/float-star-out.webp" },
];

const TOOLS = [
  { img: "/radius-pin.webp", title: "Lịch mới quanh khu vực", body: "Đơn hiện theo tỉnh thành và khu vực bạn đang bật nhận lịch." },
  { img: "/radius-chat.webp", title: "Chat với khách trong đơn", body: "Hỏi concept, xin moodboard, chốt giờ đến — không cần đưa số riêng ngay từ đầu." },
  { img: "/coin-dollar.webp", title: "Ví và sao kê", body: "Theo dõi số dư, lịch sử giao dịch và gửi yêu cầu rút tiền ngay trong app." },
  { img: "/float-coins-out.webp", title: "Thu tiền bằng mã QR", body: "Khách trả tại buổi chụp chỉ cần quét mã QR của bạn. Giao dịch vẫn ghi trên ví." },
  { img: "/float-medal-out.webp", title: "Đánh giá sau mỗi buổi", body: "Khách đánh giá ngay trên đơn. Portfolio và đánh giá tốt giúp khách mới yên tâm chọn bạn." },
  { img: "/float-shield-out.webp", title: "Hỗ trợ trong app", body: "Kênh hỗ trợ nằm ngay trong app khi bạn cần." },
];

export default function WorkerPage() {
  return (
    <main>
      <TaskerHero />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <SectionHead
              kicker="Ai phù hợp"
              title="Nhận Lịch Đúng Phong Cách Của Bạn"
              lead="Bạn chọn kiểu buổi chụp mình làm tốt với tư cách mẫu ảnh."
            />
            <Reveal delay={120}>
              <ul className="flex flex-wrap gap-2.5">
                {TRADES.map((trade) => (
                  <li
                    key={trade}
                    className="btn-lift rounded-full bg-[#fff5f9] px-4 py-2 text-[14.5px] font-semibold text-[#1a2744] ring-1 ring-pink-100 hover:ring-[#e3146f]"
                  >
                    {trade}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8fb]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead
            kicker="Cách tham gia" center
            title="4 Bước Để Bắt Đầu Nhận Lịch"
            lead="Đăng ký ngay trong app. Hồ sơ được xét duyệt trước khi lịch mới hiện về, để khách yên tâm khi chọn bạn."
          />
          <StepList steps={STEPS} />
        </div>
      </section>

      <section id="cong-cu" className="tools-section relative scroll-mt-20 overflow-hidden bg-white">
        <div className="tools-section-dots pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead
            kicker="Công cụ" center
            title="Công Cụ Nhận Lịch Trên CastNow"
            lead="Mọi thứ cần để nhận lịch, trao đổi brief và nhận tiền đều nằm trong app."
          />
          <ul className="tools-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, index) => (
              <Reveal as="li" key={tool.title} delay={index * 110}>
                <TiltCard className="tool-card relative h-full rounded-[1.6rem] border border-[#e3146f]/10 p-7">
                  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.6rem]" aria-hidden>
                    <span className="tool-card-fill" />
                    <span className="tool-card-dots" />
                  </span>
                  <span className="tool-card-num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="tool-card-tile relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.3rem]">
                    <img src={tool.img} alt="" className="tool-card-icon h-12 w-12 object-contain" />
                  </span>
                  <h3 className="tool-card-title relative mt-6 text-[18px] font-bold tracking-[-0.01em] text-[#1a2744]">{tool.title}</h3>
                  <p className="tool-card-body relative mt-2 text-[15px] leading-7 text-stone-600">{tool.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white pb-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.8rem] bg-[#1a2744] p-8 text-white sm:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.05]" />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:items-center">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#ff8fb8]">Quan hệ hợp tác</p>
                  <h2 className="mt-3 text-[1.8rem] font-extrabold leading-tight tracking-[-0.03em]">Bạn Là Đối Tác, Không Phải Nhân Viên</h2>
                </div>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Tự chủ lịch", "Bật hoặc tắt nhận lịch chụp theo thời gian của bạn."],
                    ["Tự chọn đơn", "Đọc brief, gửi báo giá, nhận buổi chụp hợp phong cách."],
                    ["Chịu trách nhiệm", "Hoàn thành buổi chụp và bàn giao ảnh đúng đơn."],
                  ].map(([title, body]) => (
                    <li key={title} className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10">
                      <p className="text-[16px] font-bold">{title}</p>
                      <p className="mt-1.5 text-[14px] leading-6 text-white/70">{body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AppCta />
    </main>
  );
}
