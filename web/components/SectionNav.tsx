"use client";

import { useEffect, useState, type MouseEvent } from "react";

const SECTIONS = [
  { id: "bat-dau", label: "Bắt đầu" },
  { id: "huong-dan", label: "Hướng dẫn" },
  { id: "dich-vu", label: "Dịch vụ" },
  { id: "doi-tuong", label: "Mẫu ảnh" },
  { id: "trai-nghiem", label: "Cách đặt lịch" },
  { id: "vi-sao", label: "Vì sao CastNow" },
  { id: "ai", label: "Trợ lý AI" },
  { id: "ban-kinh", label: "Gần địa điểm" },
  { id: "thanh-pho", label: "Tỉnh thành" },
  { id: "cau-hoi", label: "Hỏi đáp" },
  { id: "nhan-lich", label: "Nhận lịch" },
  { id: "tai-app", label: "Tải app" },
];

const HEADER_OFFSET = 64;

export function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const footer = document.querySelector("footer");
      setHidden(!!footer && footer.getBoundingClientRect().top < window.innerHeight / 2 + 160);
      const probe = window.innerHeight * 0.4;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= probe) current = s.id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = SECTIONS[SECTIONS.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    const top = id === SECTIONS[0].id ? 0 : el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      className={`fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-300 xl:block ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-label="Mục trên trang"
    >
      <ol className="flex flex-col gap-3">
        {SECTIONS.map((section) => {
          const on = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => go(event, section.id)}
                aria-current={on ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border-2 transition-all duration-300 ${
                    on ? "scale-125 border-brand-500 bg-brand-500" : "border-stone-300 bg-white group-hover:border-brand-500"
                  }`}
                />
                <span
                  className={`text-xs font-semibold transition-colors duration-300 ${
                    on ? "text-ink" : "text-transparent group-hover:text-stone-500"
                  }`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
