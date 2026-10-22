"use client";

import { useEffect, useRef } from "react";

import { ShootTile, type ShootKind } from "@/components/ShootArt";

type Prop = { kind: ShootKind; tag: string; top: string; depth: number; delay: number; tilt: string };

const LEFT: Prop[] = [
  { kind: "portrait", tag: "Chân dung", top: "12%", depth: 70, delay: 0, tilt: "-6deg" },
  { kind: "fashion", tag: "Lookbook", top: "46%", depth: 40, delay: 1.2, tilt: "5deg" },
  { kind: "wedding", tag: "Cặp đôi", top: "78%", depth: 90, delay: 0.6, tilt: "-4deg" },
];

const RIGHT: Prop[] = [
  { kind: "product", tag: "Sản phẩm", top: "18%", depth: 55, delay: 0.4, tilt: "4deg" },
  { kind: "event", tag: "Sự kiện", top: "50%", depth: 85, delay: 1.6, tilt: "-5deg" },
  { kind: "outdoor", tag: "Ngoại cảnh", top: "82%", depth: 45, delay: 0.9, tilt: "6deg" },
];

function Column({ props, side }: { props: Prop[]; side: "left" | "right" }) {
  return (
    <div className={`absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-[calc((100%-72rem)/2)]`}>
      {props.map((prop, index) => (
        <div
          key={prop.kind}
          className="svc-prop absolute w-[min(130px,52%)]"
          style={{ top: prop.top, left: side === "left" ? "68%" : "32%", ["--depth" as string]: `${prop.depth}px` }}
        >
          <div className="svc-reveal flex flex-col items-center" style={{ transitionDelay: `${index * 140}ms` }}>
            <div className="svc-bob w-full" style={{ animationDelay: `${prop.delay}s`, ["--tilt" as string]: prop.tilt }}>
              <ShootTile
                kind={prop.kind}
                small
                className="aspect-square w-full rounded-[1.6rem] shadow-[0_22px_40px_rgba(163,16,90,0.22)]"
              />
            </div>
            <span className="mt-3 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#1a2744] ring-1 ring-[#d5e0ec]">
              {prop.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServiceRails() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (rect.height / 2 + window.innerHeight / 2);
      el.style.setProperty("--svc-shift", Math.max(-1, Math.min(1, progress)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-live", entry.isIntersecting);
        if (entry.isIntersecting) el.classList.add("is-seen");
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    if (!reduced) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="svc-rails pointer-events-none absolute inset-0 hidden min-[1400px]:block" aria-hidden>
      <Column props={LEFT} side="left" />
      <Column props={RIGHT} side="right" />
    </div>
  );
}
