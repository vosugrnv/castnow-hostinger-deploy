import { blogKind } from "@/components/BlogKit";
import { ShootTile } from "@/components/ShootArt";
import { BLOG_POSTS } from "@/lib/blog";

/** rem tính từ mép khung nội dung max-w-6xl (36rem mỗi bên) ra phía lề. */
const gutter = (rem: number) => `calc(50% - 36rem - ${rem}rem)`;

const TAGS: { label: string; pos: React.CSSProperties; dur: number; delay: number }[] = [
  { label: "#Chân dung", pos: { left: gutter(7.5) }, dur: 17, delay: 0 },
  { label: "#Brief", pos: { left: gutter(6) }, dur: 20, delay: 8 },
  { label: "#Chọn mẫu", pos: { right: gutter(6.5) }, dur: 18, delay: 3 },
  { label: "#Portfolio", pos: { right: gutter(3) }, dur: 16, delay: 12 },
  { label: "#Nhận lịch", pos: { right: gutter(8.5) }, dur: 22, delay: 10 },
];

const MINI: { slug: string; pos: React.CSSProperties; tilt: number; dur: number; delay: number }[] = [
  { slug: "chuan-bi-buoi-chup-chan-dung", pos: { left: gutter(10.5), top: "10%" }, tilt: -6, dur: 8, delay: 0 },
  { slug: "brief-cho-mau-anh", pos: { left: gutter(14), top: "56%" }, tilt: 5, dur: 9, delay: 1.5 },
  { slug: "chon-nhiep-anh-gia", pos: { right: gutter(13), top: "6%" }, tilt: 6, dur: 9, delay: 0.8 },
  { slug: "portfolio-de-duoc-chon", pos: { right: gutter(10), top: "58%" }, tilt: -5, dur: 8, delay: 2.2 },
];

export function BlogHeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="blog-bg-dots absolute inset-0" />
      {TAGS.map((tag) => (
        <span
          key={tag.label}
          className="blog-bg-tag"
          style={{ ...tag.pos, animationDuration: `${tag.dur}s`, animationDelay: `${tag.delay}s` }}
        >
          {tag.label}
        </span>
      ))}
      {MINI.map((mini) => {
        const post = BLOG_POSTS.find((item) => item.slug === mini.slug);
        if (!post) return null;
        return (
          <span key={mini.slug} className="blog-bg-mini" style={{ ...mini.pos, ["--tilt" as string]: `${mini.tilt}deg` }}>
            <span className="blog-bg-mini-in" style={{ animationDuration: `${mini.dur}s`, animationDelay: `${mini.delay}s` }}>
              <ShootTile kind={blogKind(post)} small className="aspect-[16/10] w-full rounded-[0.7rem]" />
              <span className="mt-2 block px-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#e3146f]">{post.category}</span>
              <span className="blog-bg-mini-line mt-1.5 w-[88%]" />
              <span className="blog-bg-mini-line mt-1 w-[60%]" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
