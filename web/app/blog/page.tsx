import Link from "next/link";

import { BlogBrowser } from "@/components/BlogBrowser";
import { BlogCover, BlogHeroCollage, CategoryTag } from "@/components/BlogKit";
import { ButtonLink, JsonLd, SectionHead } from "@/components/PageKit";
import { Reveal } from "@/components/Reveal";
import { AppCta } from "@/components/SampleSections";
import { BLOG_CATEGORIES, BLOG_POSTS, formatDate, type BlogCategory } from "@/lib/blog";
import { SITE_URL, ZALO_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog CastNow – Chọn mẫu ảnh đúng concept",
  description:
    "Gợi ý chọn mẫu ảnh đúng concept, viết brief lookbook, làm moodboard và nhận lịch làm mẫu trên CastNow.",
  path: "/blog",
});

const TOPIC_META: {
  cat: BlogCategory;
  title: string;
  body: string;
  cover: string;
  position: string;
}[] = [
  { cat: "Chọn mẫu", title: "Chọn mẫu đúng yêu cầu", body: "Portfolio, phong cách và concept trước khi chốt.", cover: "/blog/choose.webp", position: "center 42%" },
  { cat: "Lookbook", title: "Lookbook & shop", body: "Outfit, quyền dùng ảnh và brief cho mẫu.", cover: "/blog/lookbook.webp", position: "center 22%" },
  { cat: "Brief", title: "Brief & moodboard", body: "Viết ngắn nhưng đủ để mẫu báo giá sát.", cover: "/blog/brief.webp", position: "center 48%" },
  { cat: "Concept", title: "Concept buổi chụp", body: "Pre-wedding, sản phẩm có mẫu và không khí set.", cover: "/blog/wedding.webp", position: "center 32%" },
  { cat: "Chân dung", title: "Chân dung", body: "Ánh sáng, trang phục và chuẩn bị trước buổi.", cover: "/blog/portrait.webp", position: "center 20%" },
  { cat: "Nhận lịch", title: "Nhận lịch làm mẫu", body: "Portfolio và khu vực để khách dễ chọn bạn.", cover: "/blog/receive.webp", position: "center 28%" },
];

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.published.localeCompare(a.published));
  const [featured, second, third, ...rest] = sorted;
  const side = [second, third].filter(Boolean);
  const browserPosts = [featured, ...side, ...rest];

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog CastNow",
          url: `${SITE_URL}/blog`,
          description: "Gợi ý chọn mẫu ảnh đúng concept và cách đặt buổi chụp trên CastNow.",
          inLanguage: "vi-VN",
          blogPost: BLOG_POSTS.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: `${SITE_URL}/blog/${post.slug}`,
            datePublished: post.published,
            description: post.excerpt,
            image: `${SITE_URL}${post.cover}`,
          })),
        }}
      />

      <section className="blog-band relative overflow-hidden">
        <div className="blog-band-grid pointer-events-none absolute inset-0" aria-hidden />
        <span className="blog-band-orb blog-band-orb-a pointer-events-none absolute" aria-hidden />
        <span className="blog-band-orb blog-band-orb-b pointer-events-none absolute" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pb-20 lg:pt-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a21caf] shadow-sm ring-1 ring-pink-100/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e3146f]" aria-hidden />
              Blog CastNow
            </p>
            <h1 className="mt-5 max-w-xl text-[2.2rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#1a2744] sm:text-[2.85rem] lg:text-[3.15rem]">
              Chọn Mẫu Ảnh <span className="brand-text">Đúng Concept</span>
              <span className="mt-2 block text-[1.25rem] font-medium tracking-[-0.02em] text-[#5c6b84] sm:text-[1.45rem]">
                Đọc trước khi đặt lịch
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-8 text-stone-600">
              Portfolio, brief, moodboard và cách chọn mẫu phù hợp yêu cầu buổi chụp — kèm ảnh minh họa thật theo từng chủ đề.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#bai-noi-bat">Bài nổi bật</ButtonLink>
              <ButtonLink href="#tat-ca-bai" variant="ghost">
                Tất cả bài viết →
              </ButtonLink>
            </div>
            <dl className="mt-9 grid max-w-md grid-cols-3 gap-3">
              {[
                [String(BLOG_POSTS.length), "bài viết"],
                [String(BLOG_CATEGORIES.length), "chủ đề"],
                ["3–5", "phút / bài"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[1.15rem] bg-white/85 px-2.5 py-3.5 text-center shadow-sm ring-1 ring-pink-100/90 backdrop-blur-sm">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">{label}</dt>
                  <dd className="mt-1 text-[1.35rem] font-extrabold tracking-tight text-[#1a2744]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <BlogHeroCollage />
        </div>
      </section>

      <section id="bai-noi-bat" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a21caf]">Nổi bật</p>
              <h2 className="mt-2 text-[1.65rem] font-extrabold tracking-tight text-[#1a2744] sm:text-[1.9rem]">
                Đọc Trước Khi Chọn Mẫu
              </h2>
            </div>
            <Link href="#tat-ca-bai" className="text-[14px] font-semibold text-[#e3146f] hover:underline">
              Xem tất cả →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-6">
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="blog-card blog-feature group relative grid h-full items-stretch gap-0 overflow-hidden rounded-[1.8rem] border border-[#e3146f]/12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
              >
                <span className="blog-feature-dots" aria-hidden />
                <div className="relative overflow-hidden">
                  <BlogCover post={featured} eager className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[340px]" />
                  <span className="absolute left-4 top-4">
                    <CategoryTag light>Bài nổi bật</CategoryTag>
                  </span>
                </div>
                <div className="relative flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold">
                    <span className="text-[#e3146f]">{featured.category}</span>
                    <span className="h-1 w-1 rounded-full bg-stone-300" aria-hidden />
                    <span className="text-stone-500">
                      {featured.readMin} phút · {formatDate(featured.published)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[1.45rem] font-extrabold leading-[1.22] tracking-[-0.03em] text-[#1a2744] transition-colors group-hover:text-[#e3146f] sm:text-[1.7rem]">
                    {featured.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-stone-600">{featured.excerpt}</p>
                  <span className="blog-more mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#1a2744] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors group-hover:bg-[#e3146f]">
                    Đọc bài <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {side.map((post, index) => (
                <Reveal key={post.slug} delay={(index + 1) * 80}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-card group flex h-full gap-4 overflow-hidden rounded-[1.5rem] bg-[#fff8fb] p-3 ring-1 ring-pink-100 transition hover:ring-[#e3146f]/40 sm:flex-col lg:flex-row lg:items-center"
                  >
                    <BlogCover
                      post={post}
                      className="aspect-[16/10] w-full shrink-0 rounded-[1.1rem] sm:aspect-[16/9] lg:aspect-square lg:h-[7.5rem] lg:w-[7.5rem]"
                    />
                    <div className="min-w-0 px-1 py-1 lg:pr-2">
                      <p className="text-[12px] font-bold text-[#e3146f]">{post.category}</p>
                      <h3 className="mt-1 line-clamp-2 text-[16px] font-bold leading-snug tracking-[-0.02em] text-[#1a2744] group-hover:text-[#e3146f]">
                        {post.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-stone-500">{post.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f0ff]/70">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <SectionHead
            center
            kicker="Chủ đề"
            title="Đọc Theo Việc Bạn Đang Cần"
            lead="Mỗi chủ đề gắn ảnh thật theo kiểu buổi chụp — dễ nhận ra nội dung trước khi đọc."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOPIC_META.map((topic, index) => {
              const count = BLOG_POSTS.filter((p) => p.category === topic.cat).length;
              return (
                <Reveal as="li" key={topic.cat} delay={(index % 3) * 70}>
                  <Link
                    href="#tat-ca-bai"
                    className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_14px_30px_rgba(124,58,237,0.08)] ring-1 ring-pink-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#e3146f]/35"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#f3e6ee]">
                      <img
                        src={topic.cover}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: topic.position }}
                        loading="lazy"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" aria-hidden />
                      <span className="absolute bottom-3 left-3 inline-flex rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#e3146f] shadow-sm">
                        {topic.cat} · {count}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[17px] font-bold tracking-[-0.02em] text-[#1a2744] group-hover:text-[#e3146f]">{topic.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-6 text-stone-500">{topic.body}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#e3146f]">
                        Xem bài cùng chủ đề <span aria-hidden>→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="tat-ca-bai" className="scroll-mt-20 bg-[#f7f8fb]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead
            center
            kicker="Tất cả bài"
            title="Thư Viện Gợi Ý Đặt Mẫu Ảnh"
            lead="Lọc theo chủ đề — mỗi bài có ảnh bìa đúng kiểu buổi chụp để bạn nhận diện nhanh."
          />
          <div className="mt-10">
            <BlogBrowser posts={browserPosts} />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:pt-20">
          <Reveal className="relative overflow-hidden rounded-[1.8rem] bg-[#1a2744] text-white">
            <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block" aria-hidden>
              <div className="grid h-full grid-cols-2 gap-1.5 p-3 opacity-90">
                {["/blog/choose.webp", "/blog/lookbook.webp", "/blog/portrait.webp", "/blog/wedding.webp"].map((src) => (
                  <img key={src} src={src} alt="" className="h-full w-full rounded-[1rem] object-cover object-[center_20%]" loading="lazy" />
                ))}
              </div>
              <span className="absolute inset-0 bg-gradient-to-r from-[#1a2744] via-[#1a2744]/55 to-transparent" />
            </div>
            <div className="relative flex flex-col items-start gap-6 p-7 sm:p-10 lg:max-w-[58%] lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="mb-4 flex -space-x-2 lg:hidden">
                  {["/blog/choose.webp", "/blog/lookbook.webp", "/blog/portrait.webp"].map((src) => (
                    <img key={src} src={src} alt="" className="h-10 w-10 rounded-full object-cover object-[center_15%] ring-2 ring-[#1a2744]" />
                  ))}
                </div>
                <h2 className="text-[1.6rem] font-extrabold leading-tight tracking-[-0.025em] sm:text-[1.9rem]">
                  Đã Rõ Concept? Chọn Mẫu Trên App
                </h2>
                <p className="mt-3 text-[15.5px] leading-7 text-white/70">
                  Xem portfolio thật, so mẫu đúng yêu cầu và chốt lịch trên CastNow.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/tai-ung-dung">Tải ứng dụng</ButtonLink>
                <ButtonLink href="/cau-hoi" variant="light">
                  Câu hỏi thường gặp
                </ButtonLink>
                <ButtonLink href={ZALO_URL} variant="ghost">
                  Nhắn Zalo
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AppCta />
    </main>
  );
}
