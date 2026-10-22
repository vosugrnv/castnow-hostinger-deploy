"use client";

import { useEffect } from "react";

/** Dự phòng cho trình duyệt chưa hỗ trợ <details name>: chỉ giữ một câu trả lời mở. */
export function FaqExclusive({ name }: { name: string }) {
  useEffect(() => {
    const onToggle = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement) || !target.open || target.getAttribute("name") !== name) return;
      document.querySelectorAll<HTMLDetailsElement>(`details[name="${name}"][open]`).forEach((item) => {
        if (item !== target) item.open = false;
      });
    };
    document.addEventListener("toggle", onToggle, true);
    return () => document.removeEventListener("toggle", onToggle, true);
  }, [name]);

  return null;
}
