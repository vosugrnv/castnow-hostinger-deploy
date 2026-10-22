"use client";

import { useState } from "react";

import { BlogCard } from "@/components/BlogKit";
import { Reveal } from "@/components/Reveal";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/blog";

const ALL = "Tất cả";

export function BlogBrowser({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<string>(ALL);
  const used = BLOG_CATEGORIES.filter((c) => posts.some((p) => p.category === c));
  const shown = active === ALL ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Lọc theo chủ đề">
        {[ALL, ...used].map((cat) => {
          const on = cat === active;
          const count = cat === ALL ? posts.length : posts.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                on ? "bg-[#1a2744] text-white shadow-md shadow-stone-300/50" : "bg-white/90 text-[#1a2744] ring-1 ring-pink-100 hover:ring-[#e3146f]"
              }`}
            >
              {cat}
              <span className={`ml-1.5 text-[12px] ${on ? "text-white/60" : "text-stone-400"}`}>{count}</span>
            </button>
          );
        })}
      </div>
      {shown.length === 0 ? (
        <p className="mt-12 text-center text-[15px] text-stone-500">Chưa có bài trong chủ đề này.</p>
      ) : (
        <ul key={active} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((post, index) => (
            <Reveal as="li" key={post.slug} delay={(index % 3) * 90}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </ul>
      )}
    </>
  );
}
