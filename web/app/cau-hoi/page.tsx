import { FaqExclusive } from "@/components/FaqExclusive";
import { FaqSupportHero } from "@/components/FaqSupportHero";
import { JsonLd } from "@/components/PageKit";
import { Reveal } from "@/components/Reveal";
import { AppCta } from "@/components/SampleSections";
import { FAQ_GROUPS, FAQS, SUPPORT_EMAIL, ZALO_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Câu hỏi thường gặp về CastNow",
  description:
    "Giải đáp về CastNow: cách đặt mẫu ảnh, bán kính 10km, trợ lý AI, báo giá trên đơn, thanh toán, đăng ký nhận lịch làm mẫu và xóa tài khoản.",
  path: "/cau-hoi",
});

export default function FaqPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <FaqSupportHero />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-20">
          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-stone-400">Chủ đề</p>
            <ol className="mt-4 space-y-1 border-l border-stone-200">
              {FAQ_GROUPS.map((group) => (
                <li key={group.id}>
                  <a href={`#${group.id}`} className="toc-link -ml-px flex items-center justify-between border-l-2 border-transparent py-1.5 pl-4 text-[14.5px] text-stone-600">
                    {group.title}
                    <span className="text-[12px] text-stone-400">{group.items.length}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-[1.3rem] bg-[#1a2744] p-5 text-white">
              <p className="text-[15px] font-bold">Cần hỗ trợ thêm?</p>
              <p className="mt-1.5 text-[13.5px] leading-6 text-white/70">Gửi câu hỏi kèm mã đơn nếu có.</p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="footer-cta mt-4 flex items-center justify-center gap-2 rounded-full bg-[#e3146f] px-4 py-2.5 text-[14px] font-semibold">
                Gửi email <span aria-hidden>→</span>
              </a>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift mt-2 flex items-center justify-center rounded-full bg-white/10 px-4 py-2.5 text-[14px] font-semibold ring-1 ring-white/20"
              >
                Nhắn Zalo
              </a>
            </div>
          </aside>

          <div className="space-y-14">
            <FaqExclusive name="faq" />
            {FAQ_GROUPS.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-24">
                <Reveal>
                  <h2 className="flex items-center gap-3 text-[1.5rem] font-extrabold tracking-[-0.025em] text-[#1a2744] sm:text-[1.75rem]">
                    <span className="h-7 w-1.5 rounded-full bg-[#e3146f]" />
                    {group.title}
                  </h2>
                </Reveal>
                <div className="mt-6 space-y-3">
                  {group.items.map((item, index) => (
                    <Reveal key={item.q} delay={index * 60}>
                      <details name="faq" className="faq-item rounded-[1.2rem] border border-stone-200 bg-white px-6 py-5">
                        <summary className="flex cursor-pointer items-center justify-between gap-4 text-[16.5px] font-semibold leading-snug text-[#1a2744]">
                          <h3>{item.q}</h3>
                          <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff0f6] text-[20px] leading-none text-[#e3146f]">
                            +
                          </span>
                        </summary>
                        <p className="faq-body mt-3 text-[15.5px] leading-7 text-stone-600">{item.a}</p>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}

            <Reveal className="lg:hidden">
              <div className="rounded-[1.4rem] bg-[#1a2744] p-6 text-white">
                <p className="text-[17px] font-bold">Cần hỗ trợ thêm?</p>
                <p className="mt-1.5 text-[14px] leading-6 text-white/70">Gửi câu hỏi kèm mã đơn nếu có, hoặc nhắn qua Zalo.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="footer-cta inline-flex items-center gap-2 rounded-full bg-[#e3146f] px-5 py-2.5 text-[14px] font-semibold">
                    {SUPPORT_EMAIL}
                  </a>
                  <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="btn-lift inline-flex rounded-full bg-white/10 px-5 py-2.5 text-[14px] font-semibold ring-1 ring-white/20">
                    Nhắn Zalo
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AppCta />
    </main>
  );
}
