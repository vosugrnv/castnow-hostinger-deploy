"use client";

import { useEffect, useState } from "react";

export function TypingHint({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = phrases[index];
    const done = !deleting && text === full;
    const empty = deleting && text === "";
    const delay = done ? 1800 : empty ? 300 : deleting ? 35 : 70;
    const timer = window.setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, phrases]);

  return (
    <span className="text-stone-400">
      {text}
      <span className="typing-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-[#e3146f]" aria-hidden />
    </span>
  );
}
