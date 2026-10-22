"use client";

import { useState } from "react";

import type { PublicTasker } from "@/lib/publicTaskerTypes";

function AvatarFallback({
  tasker,
  className,
  letterClassName,
}: {
  tasker: PublicTasker;
  className?: string;
  letterClassName?: string;
}) {
  if (tasker.avatarUrl) {
    return <img src={tasker.avatarUrl} alt={tasker.name} className={className} />;
  }
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-[#ffc7dd] to-[#e3146f] ${letterClassName}`} aria-hidden>
      <span className="font-extrabold text-white">{tasker.name.trim().charAt(0).toUpperCase()}</span>
    </div>
  );
}

export function TaskerPhotoGallery({ tasker }: { tasker: PublicTasker }) {
  const urls = (tasker.galleryUrls?.length ? tasker.galleryUrls : tasker.avatarUrl ? [tasker.avatarUrl] : []).filter(
    Boolean,
  ) as string[];
  const [active, setActive] = useState(0);
  const hasMany = urls.length > 1;
  const current = urls[Math.min(active, Math.max(urls.length - 1, 0))];

  function go(delta: number) {
    if (!urls.length) return;
    setActive((i) => (i + delta + urls.length) % urls.length);
  }

  return (
    <div className="tkp-gallery">
      <div className="tkp-gallery-main">
        {current ? (
          <img src={current} alt={tasker.name} className="tkp-gallery-img" />
        ) : (
          <AvatarFallback tasker={tasker} className="tkp-gallery-img" letterClassName="tkp-gallery-fallback text-[3.5rem]" />
        )}
        {hasMany ? (
          <>
            <button type="button" className="tkp-gallery-nav is-prev" aria-label="Ảnh trước" onClick={() => go(-1)}>
              ‹
            </button>
            <button type="button" className="tkp-gallery-nav is-next" aria-label="Ảnh sau" onClick={() => go(1)}>
              ›
            </button>
          </>
        ) : null}
      </div>
      {hasMany ? (
        <div className="tkp-gallery-thumbs" role="tablist" aria-label="Ảnh hồ sơ">
          {urls.map((url, i) => (
            <button
              key={url}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`tkp-gallery-thumb${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <img src={url} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
