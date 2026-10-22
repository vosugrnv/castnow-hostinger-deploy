import Link from "next/link";

import { type ShootKind } from "@/components/ShootArt";
import { type BlogCategory, type BlogPost } from "@/lib/blog";

const CATEGORY_KIND: Record<BlogCategory, ShootKind> = {
  "Chân dung": "portrait",
  Lookbook: "fashion",
  "Chọn mẫu": "model",
  Brief: "fashion",
  Concept: "wedding",
  "Nhận lịch": "model",
};

const CATEGORY_KIND_FALLBACK: Record<BlogCategory, string> = {
  "Chân dung": "/blog/portrait.webp",
  Lookbook: "/blog/lookbook.webp",
  "Chọn mẫu": "/blog/choose.webp",
  Brief: "/blog/brief.webp",
  Concept: "/blog/wedding.webp",
  "Nhận lịch": "/blog/receive.webp",
};

export function blogKind(post: BlogPost): ShootKind {
  return CATEGORY_KIND[post.category] ?? "portrait";
}

export function blogCoverSrc(post: BlogPost) {
  return post.cover || CATEGORY_KIND_FALLBACK[post.category] || "/blog/hero-model.webp";
}

/** Ảnh chân dung / mẫu: neo phần đầu vào khung, tránh cắt mặt. */
export function BlogCover({
  post,
  className = "",
  eager = false,
  framed = false,
  position = "center 28%",
}: {
  post: BlogPost;
  className?: string;
  eager?: boolean;
  framed?: boolean;
  position?: string;
}) {
  const src = blogCoverSrc(post);
  return (
    <div className={`relative overflow-hidden bg-[#f3e6ee] ${className}`} role="img" aria-label={post.title}>
      <img
        src={src}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        style={{ objectPosition: position }}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden />
      {framed ? (
        <span className="pointer-events-none absolute inset-[8%]" aria-hidden>
          <i className="absolute left-0 top-0 h-[16%] w-[16%] rounded-tl-[30%] border-l-2 border-t-2 border-white/75" />
          <i className="absolute right-0 top-0 h-[16%] w-[16%] rounded-tr-[30%] border-r-2 border-t-2 border-white/75" />
          <i className="absolute bottom-0 left-0 h-[16%] w-[16%] rounded-bl-[30%] border-b-2 border-l-2 border-white/75" />
          <i className="absolute bottom-0 right-0 h-[16%] w-[16%] rounded-br-[30%] border-b-2 border-r-2 border-white/75" />
        </span>
      ) : null}
    </div>
  );
}

export function CategoryTag({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
        light ? "bg-white/95 text-[#1a2744] shadow-sm backdrop-blur-sm" : "bg-[#fff0f6] text-[#e3146f]"
      }`}
    >
      {children}
    </span>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card lift-card group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white p-3 shadow-[0_14px_32px_rgba(163,16,90,0.06)] ring-1 ring-pink-100/80"
    >
      <div className="relative">
        <BlogCover post={post} className="aspect-[4/3] rounded-[1.15rem]" position="center 22%" />
        <span className="absolute bottom-3 left-3">
          <CategoryTag light>{post.category}</CategoryTag>
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-4">
        <p className="text-[12.5px] font-medium text-stone-400">{post.readMin} phút đọc</p>
        <h3 className="mt-1.5 text-[17.5px] font-bold leading-snug tracking-[-0.015em] text-[#1a2744] transition-colors group-hover:text-[#e3146f]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[14px] leading-6 text-stone-500">{post.excerpt}</p>
        <span className="blog-more mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-semibold text-[#e3146f]">
          Đọc bài <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

/** Hero collage: 1 ảnh lớn + 2 ảnh nhỏ, không chip đè gây lệch layout. */
export function BlogHeroCollage() {
  return (
    <div className="blog-hero-stage relative mx-auto w-full max-w-[440px] lg:ml-auto lg:max-w-[460px]">
      <span className="blog-hero-glow pointer-events-none absolute inset-[6%] rounded-[2rem]" aria-hidden />
      <div className="relative grid grid-cols-[1.15fr_0.85fr] grid-rows-[minmax(0,1fr)_minmax(0,0.92fr)] gap-3">
        <figure className="relative row-span-2 overflow-hidden rounded-[1.4rem] bg-[#f3e6ee] shadow-[0_22px_40px_rgba(26,39,68,0.14)] ring-1 ring-white/80">
          <img
            src="/blog/hero-model.webp"
            alt="Mẫu áo dài Việt Nam"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 28%" }}
            loading="eager"
          />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a2744] shadow-sm">
            Chọn mẫu
          </figcaption>
        </figure>
        <figure className="relative overflow-hidden rounded-[1.25rem] bg-[#f3e6ee] shadow-[0_16px_32px_rgba(26,39,68,0.12)] ring-1 ring-white/80">
          <img
            src="/blog/lookbook.webp"
            alt="Lookbook áo dài"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 22%" }}
            loading="eager"
          />
          <figcaption className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a2744] shadow-sm">
            Lookbook
          </figcaption>
        </figure>
        <figure className="relative overflow-hidden rounded-[1.25rem] bg-[#f3e6ee] shadow-[0_16px_32px_rgba(26,39,68,0.12)] ring-1 ring-white/80">
          <img
            src="/blog/portrait.webp"
            alt="Chân dung mẫu Việt Nam"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 20%" }}
            loading="eager"
          />
          <figcaption className="absolute bottom-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a2744] shadow-sm">
            Chân dung
          </figcaption>
        </figure>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Điểm nổi bật blog">
        {["Portfolio rõ concept", "Brief + moodboard", "Chọn mẫu đúng yêu cầu"].map((label) => (
          <li
            key={label}
            className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-semibold text-[#1a2744] shadow-sm ring-1 ring-pink-100"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
