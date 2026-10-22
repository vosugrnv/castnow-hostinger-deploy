import Link from "next/link";

import type { PublicTasker } from "@/lib/publicTaskerTypes";

function StarIcon() {
  return (
    <svg className="tho-star" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 3.6 14.4 9l5.9.5-4.5 3.8 1.4 5.7L12 16.5 6.8 19l1.4-5.7L3.7 9.5 9.6 9 12 3.6Z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="tho-pin" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.5c-3.6 0-6.5 2.9-6.5 6.5 0 4.6 5.4 10.8 6.1 11.6a.6.6 0 0 0 .9 0c.7-.8 6.1-7 6.1-11.6 0-3.6-2.9-6.5-6.6-6.5Zm0 8.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Z"
      />
    </svg>
  );
}

export function PublicTaskerCard({ tasker }: { tasker: PublicTasker }) {
  const reviewLabel =
    tasker.jobCount != null ? `(${tasker.jobCount} đánh giá)` : null;

  return (
    <article className="tho-card">
      <Link href={`/mau-anh-nhiep-anh-gia/${tasker.slug}`} className="tho-card-link">
        <div className="tho-card-photo">
          {tasker.avatarUrl ? (
            <img src={tasker.avatarUrl} alt={tasker.name} className="tho-card-img" loading="lazy" />
          ) : (
            <span className="tho-card-fallback" aria-hidden>
              {tasker.name.trim().charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="tho-card-body">
          <h3 className="tho-card-name">{tasker.name}</h3>
          {tasker.rating != null ? (
            <p className="tho-card-rating">
              <StarIcon />
              <strong>{tasker.rating.toFixed(1).replace(/\.0$/, "")}</strong>
              {reviewLabel ? <span>{reviewLabel}</span> : null}
            </p>
          ) : null}
          <p className="tho-card-city">
            <PinIcon />
            <span>{tasker.city}</span>
          </p>
          <span className="tho-card-cta">Đặt</span>
        </div>
      </Link>
    </article>
  );
}
