"use client";

import { useMemo, useState } from "react";

import {
  reviewAbsoluteDate,
  type VirtualReview,
} from "@/lib/virtualTaskerReviews";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 3.6 14.4 9l5.9.5-4.5 3.8 1.4 5.7L12 16.5 6.8 19l1.4-5.7L3.7 9.5 9.6 9 12 3.6Z"
      />
    </svg>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="tkp-review-stars" aria-label={`${value} sao`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={i < value ? "is-on" : "is-off"} />
      ))}
    </span>
  );
}

type Filter = "all" | 5 | 4 | 3 | 2 | 1;

export function TaskerReviews({
  rating,
  reviewCount,
  reviews,
  emptyHint,
}: {
  rating: number | null;
  reviewCount: number;
  reviews: VirtualReview[];
  emptyHint: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return reviews;
    return reviews.filter((r) => r.rating === filter);
  }, [filter, reviews]);

  const pills: { key: Filter; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: 5, label: "5 ★" },
    { key: 4, label: "4 ★" },
    { key: 3, label: "3 ★" },
    { key: 2, label: "2 ★" },
    { key: 1, label: "1 ★" },
  ];

  return (
    <section className="tkp-card tkp-reviews">
      <div className="tkp-reviews-head">
        <p className="tkp-reviews-summary">
          <StarIcon className="tkp-star" />
          <strong>{rating != null ? (Number.isInteger(rating) ? rating : rating.toFixed(1)) : "—"}</strong>
          <span>({reviewCount} đánh giá)</span>
        </p>
        <div className="tkp-review-filters" role="tablist" aria-label="Lọc đánh giá">
          {pills.map((pill) => (
            <button
              key={String(pill.key)}
              type="button"
              role="tab"
              aria-selected={filter === pill.key}
              className={`tkp-review-pill${filter === pill.key ? " is-active" : ""}`}
              onClick={() => setFilter(pill.key)}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <ul className="tkp-review-list">
          {filtered.map((item) => (
            <li key={item.id} className="tkp-review-card">
              <div className="tkp-review-card-top">
                <Stars value={item.rating} />
                <time dateTime={reviewAbsoluteDate(item.daysAgo, "iso")}>
                  {reviewAbsoluteDate(item.daysAgo)}
                </time>
              </div>
              <p className="tkp-review-body">{item.body}</p>
              <p className="tkp-review-foot">
                Đang hiển thị bản gốc <button type="button" className="tkp-review-translate">Dịch</button>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="tkp-reviews-empty">{emptyHint}</p>
      )}
    </section>
  );
}
