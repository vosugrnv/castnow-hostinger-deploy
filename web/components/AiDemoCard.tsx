"use client";

import { useEffect, useRef, useState } from "react";

const EXAMPLES = [
  { ask: "Cần mẫu ảnh chân dung ngoài trời, chiều nay.", group: "Chụp chân dung" },
  { ask: "Lookbook thời trang 8 mẫu, studio hoặc phố.", group: "Chụp thời trang" },
  { ask: "Chụp sản phẩm mỹ phẩm nền trắng cho shop.", group: "Chụp sản phẩm" },
  { ask: "Pre-wedding cuối tuần, công viên gần nhà.", group: "Chụp cưới & cặp đôi" },
];

const TYPE_MS = 38;
const THINK_MS = 1000;
const STEP_MS = 750;
const HOLD_MS = 2600;
const FADE_MS = 400;

const STATUS = ["Đang nghe", "Đang phân tích", "Đã gợi ý"];

export function AiDemoCard() {
  const root = useRef<HTMLDivElement>(null);
  const [example, setExample] = useState(0);
  const [typed, setTyped] = useState(EXAMPLES[0].ask.length);
  const [phase, setPhase] = useState(5);
  const [active, setActive] = useState(false);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotion(true);
    setTyped(0);
    setPhase(0);
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.3 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!motion || !active) return;
    const ask = EXAMPLES[example].ask;
    let delay = 0;
    let next: () => void;
    if (phase === 0) {
      if (typed < ask.length) {
        delay = TYPE_MS;
        next = () => setTyped(typed + 1);
      } else {
        delay = 300;
        next = () => setPhase(1);
      }
    } else if (phase === 1) {
      delay = THINK_MS;
      next = () => setPhase(2);
    } else if (phase < 4) {
      delay = STEP_MS;
      next = () => setPhase(phase + 1);
    } else if (phase === 4) {
      delay = HOLD_MS;
      next = () => setPhase(5);
    } else {
      delay = FADE_MS;
      next = () => {
        setExample((example + 1) % EXAMPLES.length);
        setTyped(0);
        setPhase(0);
      };
    }
    const timer = window.setTimeout(next, delay);
    return () => window.clearTimeout(timer);
  }, [motion, active, phase, typed, example]);

  const current = EXAMPLES[example];
  const done = motion ? Math.max(0, Math.min(3, phase - 1)) : 3;
  const fading = motion && phase === 5;
  const status = phase === 0 ? STATUS[0] : phase === 1 ? STATUS[1] : STATUS[2];
  const steps = [
    ["Gợi ý kiểu buổi chụp", current.group],
    ["Lọc người gần địa điểm", "Trong bán kính 10km quanh nơi chụp"],
    ["Bạn tự chọn", "Xem hồ sơ, chốt giờ và giá"],
  ];

  return (
    <div ref={root} className="rounded-[1.7rem] bg-white/95 p-4 shadow-[0_22px_44px_rgba(124,58,237,0.14)] ring-1 ring-[#e8d0ff]">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a21caf]">
          <span className="ai-live" aria-hidden />
          Trong app
        </p>
        <span className="flex items-center gap-1.5 rounded-full bg-[#f5e9ff] px-2 py-0.5 text-[10px] font-semibold text-[#7e22ce]">
          {motion && phase === 1 ? (
            <span className="ai-dots flex gap-0.5" aria-hidden>
              <i />
              <i />
              <i />
            </span>
          ) : null}
          {motion ? status : "Trợ lý AI"}
        </span>
      </div>

      <div className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}>
        <p className="mt-3 min-h-[72px] rounded-2xl bg-gradient-to-br from-[#fff2f8] to-[#f4ebff] px-3.5 py-3 text-[15px] font-semibold leading-6 tracking-[-0.02em] text-[#1a2744]">
          <span className="mr-1 text-[1.35rem] leading-none text-[#a21caf]">“</span>
          {current.ask.slice(0, typed)}
          {motion && phase === 0 ? (
            <span className="typing-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-[#e3146f]" aria-hidden />
          ) : null}
        </p>

        <ol className="relative mt-4 space-y-3">
          <span className="absolute bottom-[26px] left-[11px] top-[14px] w-px bg-[#ead9ff]" aria-hidden />
          <span
            className="absolute bottom-[26px] left-[11px] top-[14px] w-px origin-top bg-gradient-to-b from-[#b40fe0] to-[#e3146f] transition-transform duration-700 ease-out"
            style={{ transform: `scaleY(${done <= 1 ? 0 : (done - 1) / 2})` }}
            aria-hidden
          />
          {steps.map(([title, body], index) => {
            const on = done > index;
            return (
              <li key={title} className="relative grid grid-cols-[24px_1fr] items-start gap-3">
                <span
                  className={`relative z-10 mt-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-300 ${
                    on ? "bg-[#e3146f] text-white" : "bg-[#faf5ff] text-[#c4a8e8] ring-1 ring-[#e8d0ff]"
                  }`}
                >
                  {on ? (
                    <svg viewBox="0 0 12 12" className="ai-check h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M2.5 6.2 5 8.5 9.5 3.5" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span className={`transition-all duration-500 ${on ? "translate-x-0 opacity-100" : "translate-x-1 opacity-40"}`}>
                  <span className="block text-[13px] font-semibold tracking-[-0.01em] text-[#1a2744]">{title}</span>
                  <span className="mt-0.5 block text-[12px] leading-5 text-stone-500">{body}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
