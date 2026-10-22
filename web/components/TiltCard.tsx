"use client";

import { useRef } from "react";

export function TiltCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function setTilt(rx: number, ry: number) {
    const node = ref.current;
    if (!node) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      node.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    });
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt(-y * 10, x * 12);
  }

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={() => setTilt(0, 0)} className={className}>
      {children}
    </div>
  );
}
