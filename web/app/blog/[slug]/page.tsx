import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard, BlogCover, CategoryTag } from "@/components/BlogKit";
import { Breadcrumb, ButtonLink, JsonLd, breadcrumbLd } from "@/components/PageKit";
import { Reveal } from "@/components/Reveal";
import { AppCta } from "@/components/SampleSections";
import { BLOG_POSTS, formatDate, getPost, relatedPosts } from "@/lib/blog";
import { COMPANY, SITE_URL } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.img,
    article: { published: post.published },
  });
}

export default async function BlogPostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  const related = relatedPosts(post);

  return (
    <main>
      <JsonLd data={breadcrumbLd(post.title, path, { label: "Blog", href: "/blog" })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: `${SITE_URL}${post.img}`,
          datePublished: post.published,
          dateModified: post.published,
          inLanguage: "vi-VN",
          mainEntityOfPage: `${SITE_URL}${path}`,
          author: { "@type": "Organization", name: "CastNow", url: SITE_URL },
          publisher: {
            "@type": "Organization",
            name: COMPANY,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-castnow.png` },
          },
        }}
      />

      <section className="relative overflow-hidden bg-[#fff5f9] text-[#1a2744]">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#ffe0ee]" aria-hidden />
        <div
          className={`relative mx-auto px-4 pt-10 sm:px-6 lg:pt-12 ${
            post.photo ? "max-w-4xl pb-10" : "grid max-w-5xl items-center gap-10 pb-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14 lg:pb-16"
          }`}
        >
          <div>
            <Breadcrumb crumb={post.title} parent={{ label: "Blog", href: "/blog" }} />
            <div className="hero-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "80ms" }}>
              <CategoryTag>{post.category}</CategoryTag>
              <span className="text-[13.5px] text-stone-500">
                {post.readMin} phút đọc · <time dateTime={post.published}>{formatDate(post.published)}</time>
              </span>
            </div>
            <h1
              className="hero-up mt-4 text-[2rem] font-extrabold leading-[1.15] tracking-[-0.035em] sm:text-[2.6rem] lg:text-[2.9rem]"
              style={{ animationDelay: "160ms" }}
            >
              {post.title}
            </h1>
            <p className="hero-up mt-5 max-w-3xl text-[17px] leading-8 text-stone-600" style={{ animationDelay: "240ms" }}>
              {post.excerpt}
            </p>
            <div className="hero-up mt-6 flex items-center gap-3" style={{ animationDelay: "300ms" }}>
              <img src="/logo-castnow.webp" alt="" className="h-10 w-10 rounded-xl object-cover" />
              <div className="text-[13.5px] leading-5">
                <p className="font-semibold text-[#1a2744]">Đội ngũ CastNow</p>
                <p className="text-stone-500">Mẹo trong app</p>
              </div>
            </div>
          </div>
          {post.photo ? null : (
            <div className="post-illus hero-scale relative mx-auto w-full max-w-[300px] lg:max-w-none" style={{ animationDelay: "200ms" }}>
              <span className="post-illus-dots" aria-hidden />
              <div className="post-illus-card relative overflow-hidden rounded-[2rem]">
                <BlogCover post={post} eager className="aspect-square" />
              </div>
              <img src="/float-star-out.webp" alt="" className="float-a pointer-events-none absolute -right-5 -top-6 h-16 w-16 object-contain" aria-hidden />
            </div>
          )}
        </div>
      </section>
      {post.photo ? (
        <div className="bg-[linear-gradient(to_bottom,#fff7ef_50%,#ffffff_50%)]">
          <div className="hero-scale mx-auto max-w-5xl px-4 sm:px-6" style={{ animationDelay: "200ms" }}>
            <BlogCover
              post={post}
              eager
              className="aspect-[16/9] rounded-[1.8rem] sm:aspect-[21/9]"
            />
          </div>
        </div>
      ) : null}

      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-20">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-stone-400">Trong bài</p>
            <ol className="mt-4 space-y-1 border-l border-stone-200">
              {post.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="toc-link -ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[14px] leading-6 text-stone-600"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
            <Link
              href="/blog"
              className="mt-6 hidden items-center gap-1.5 text-[14px] font-semibold text-[#e3146f] hover:underline lg:inline-flex"
            >
              <span aria-hidden>←</span> Tất cả bài viết
            </Link>
          </aside>

          <article className="blog-body max-w-[680px]">
            {post.sections.map((section) => (
              <Reveal key={section.id}>
                <h2 id={section.id} className="scroll-mt-24">
                  {section.heading}
                </h2>
                {section.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}

            <Reveal className="blog-tip">
              <p className="blog-tip-label">Mẹo nhỏ</p>
              <p>{post.tip}</p>
            </Reveal>

            <Reveal className="mt-10 flex flex-col gap-5 rounded-[1.5rem] bg-[#1a2744] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-[19px] font-bold tracking-[-0.015em]">Cần đặt buổi chụp?</p>
                <p className="mt-1.5 text-[14.5px] leading-6 text-white/70">
                  Đặt lịch trên CastNow, mẫu ảnh gần địa điểm gửi báo giá để bạn tự chọn.
                </p>
              </div>
              <div className="shrink-0">
                <ButtonLink href="/tai-ung-dung">Tải ứng dụng</ButtonLink>
              </div>
            </Reveal>
          </article>
        </div>
      </section>

      <section className="bg-[#f7f8fb]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[1.7rem] font-extrabold tracking-[-0.03em] text-[#1a2744] sm:text-[2rem]">Bài Viết Liên Quan</h2>
            <Link href="/blog" className="text-[15px] font-semibold text-[#e3146f] hover:underline">
              Xem tất cả →
            </Link>
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal as="li" key={item.slug} delay={index * 90}>
                <BlogCard post={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <AppCta />
    </main>
  );
}
