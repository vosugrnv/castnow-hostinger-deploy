import Link from "next/link";

import { TaskerPhotoGallery } from "@/components/TaskerPhotoGallery";
import { TaskerReviews } from "@/components/TaskerReviews";
import type { PublicTasker } from "@/lib/publicTaskerTypes";
import { cityListingPath, findFilterCity } from "@/lib/thoLocations";
import { buildVirtualReviews } from "@/lib/virtualTaskerReviews";

const SERVICE_BLURBS: { match: RegExp; body: string }[] = [
  { match: /chân dung/i, body: "Chụp chân dung theo concept bạn gửi. Báo giá sau khi xem brief và địa điểm." },
  { match: /thời trang|lookbook|mẫu/i, body: "Buổi chụp thời trang hoặc lookbook. Thống nhất số look, trang phục và thời lượng trên đơn." },
  { match: /sản phẩm/i, body: "Chụp sản phẩm theo số mẫu và phông nền. Báo giá theo số ảnh và mức độ dựng hình." },
  { match: /cưới|cặp đôi|pre-wedding/i, body: "Ảnh cưới và cặp đôi theo địa điểm, số giờ và số ảnh chỉnh." },
  { match: /sự kiện/i, body: "Phủ sóng sự kiện theo thời lượng và số mẫu ảnh." },
  { match: /gia đình/i, body: "Ảnh gia đình tại studio hoặc ngoại cảnh. Chốt số người và khung giờ trước." },
  { match: /ngoại cảnh/i, body: "Buổi chụp ngoài trời theo địa điểm và giờ ánh sáng." },
  { match: /thương mại|doanh nghiệp/i, body: "Ảnh thương mại cho hồ sơ, lookbook hoặc chiến dịch. Phạm vi chốt trên đơn." },
];

function serviceBody(name: string) {
  const hit = SERVICE_BLURBS.find((item) => item.match.test(name));
  return hit?.body ?? `${name}: xem portfolio và nhận báo giá trong ứng dụng CastNow trước khi chốt lịch.`;
}

function formatVnd(price: number) {
  return `${price.toLocaleString("vi-VN")}đ`;
}

function groupOffers(tasker: PublicTasker) {
  const offers = tasker.offers ?? [];
  if (!offers.length) {
    return tasker.services.map((service) => ({ service, body: serviceBody(service), variants: [] as typeof offers }));
  }
  const order = [...tasker.services];
  for (const offer of offers) {
    if (!order.includes(offer.service)) order.push(offer.service);
  }
  return order
    .map((service) => ({
      service,
      body: serviceBody(service),
      variants: offers.filter((o) => o.service === service),
    }))
    .filter((group) => group.variants.length > 0 || tasker.services.includes(group.service));
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

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

function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#2b7cff" />
      <path
        d="M7.5 12.2 10.2 15l6.3-6.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Avatar({
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

export function PublicTaskerProfile({
  tasker,
  nearby = [],
}: {
  tasker: PublicTasker;
  nearby?: PublicTasker[];
}) {
  const place = tasker.district ? `${tasker.district}, ${tasker.city}` : tasker.city;
  const cityHref = cityListingPath(findFilterCity(tasker.city)?.slug);
  const rating = tasker.rating != null ? tasker.rating : null;
  const reviewCount = tasker.jobCount ?? 0;
  const services = tasker.services.length ? tasker.services : ["Mẫu ảnh"];

  const offerGroups = groupOffers(tasker);
  const priced = (tasker.offers ?? []).map((o) => o.price).filter((p) => p > 0);
  const priceMin = priced.length ? Math.min(...priced) : null;
  const priceMax = priced.length ? Math.max(...priced) : null;
  const virtualReviews = buildVirtualReviews(tasker);

  const faqs = [
    {
      q: `${tasker.name} phục vụ ở khu vực nào?`,
      a: `${tasker.name} phục vụ tại ${place}. Bạn có thể đặt lịch qua ứng dụng CastNow.`,
    },
    {
      q: `${tasker.name} nhận những kiểu buổi chụp nào?`,
      a: `${tasker.name} nhận: ${services.join(", ")}. Xem chi tiết từng gói ở mục Dịch vụ phía trên.`,
    },
    {
      q: `Giá dịch vụ của ${tasker.name} là bao nhiêu?`,
      a:
        priceMin != null && priceMax != null
          ? `Các gói của ${tasker.name} dao động từ ${formatVnd(priceMin)} đến ${formatVnd(priceMax)}. Giá cụ thể từng gói nằm ở mục Dịch vụ; đặt lịch và thanh toán trong app.`
          : "Giá theo báo giá trong app sau khi xem brief. Bạn tự chọn người phù hợp rồi thanh toán trong ứng dụng CastNow.",
    },
  ];

  return (
    <div className="tkp-page">
      <div className="tkp-inner">
        <nav aria-label="Breadcrumb" className="tkp-crumb">
          <Link href="/">Trang chủ</Link>
          <span aria-hidden>›</span>
          <Link href="/mau-anh-nhiep-anh-gia">Mẫu ảnh</Link>
          <span aria-hidden>›</span>
          <Link href={cityHref}>{tasker.city}</Link>
        </nav>

        <section className="tkp-hero">
          <TaskerPhotoGallery tasker={tasker} />

          <div className="tkp-info">
            <h1 className="tkp-name">
              <span>{tasker.name}</span>
              {tasker.source === "real" ? <VerifiedIcon className="tkp-verified" /> : null}
            </h1>
            <p className="tkp-city">
              <PinIcon className="tkp-pin" />
              <span>{place}</span>
            </p>
            {rating != null ? (
              <p className="tkp-rating">
                <StarIcon className="tkp-star" />
                <strong>{Number.isInteger(rating) ? rating : rating.toFixed(1)}</strong>
                <span>({reviewCount} đánh giá)</span>
              </p>
            ) : null}
            <p className="tkp-bio">{tasker.bio}</p>
            {tasker.highlights.length ? (
              <ul className="tkp-highlights">
                {tasker.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <div className="tkp-tags">
              {services.map((service) => (
                <span key={service} className="tkp-tag">
                  {service}
                </span>
              ))}
            </div>
            <Link href="/huong-dan-dat-lich" className="tkp-book">
              Đặt ngay
            </Link>
          </div>
        </section>

        <section className="tkp-card">
          <h2>Dịch vụ</h2>
          <div className="tkp-service-grid">
            {offerGroups.map((group) => (
              <article key={group.service} className="tkp-service">
                <h3>{group.service}</h3>
                <p>{group.body}</p>
                {group.variants.length ? (
                  <ul className="tkp-variants">
                    {group.variants.map((variant) => (
                      <li key={`${variant.service}-${variant.label}-${variant.price}`}>
                        <span className="tkp-variant-name">{variant.label}</span>
                        <span className="tkp-variant-price">
                          {variant.featured ? <span className="tkp-badge-featured">Đề xuất</span> : null}
                          <strong>{formatVnd(variant.price)}</strong>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="tkp-service-foot">
                    <span>Báo giá trong app</span>
                    <span>Theo mô tả đơn</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <TaskerReviews
          rating={rating}
          reviewCount={reviewCount}
          reviews={virtualReviews}
          emptyHint={
            reviewCount > 0 && tasker.source === "real"
              ? "Đánh giá chi tiết được xem trong ứng dụng CastNow sau khi đặt lịch."
              : "Chưa có đánh giá phù hợp với bộ lọc."
          }
        />

        <div className="tkp-split">
          <section className="tkp-faq">
            <h2>Câu hỏi thường gặp</h2>
            <dl>
              {faqs.map((item) => (
                <div key={item.q}>
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="tkp-closing">
            <p>
              {tasker.name} nhận lịch khu vực {place}. Hồ sơ trên CastNow giúp khách xem portfolio, báo giá và đặt buổi chụp minh bạch.
            </p>
            <p>
              CastNow hiển thị hồ sơ theo khu vực và kiểu buổi chụp. Bạn đọc mô tả, so sánh báo giá rồi tự chọn người phù hợp.
              Đặt lịch, chat và thanh toán đều diễn ra trong app.
            </p>
          </section>
        </div>

        <section className="tkp-card tkp-related">
          <div className="tkp-nearby-head">
            <h2>Hồ sơ liên quan</h2>
            <Link href="/mau-anh-nhiep-anh-gia" className="tkp-nearby-more">
              Xem tất cả →
            </Link>
          </div>
          {nearby.length ? (
            <div className="tkp-nearby-rail">
              {nearby.map((item) => (
                <Link key={item.slug} href={`/mau-anh-nhiep-anh-gia/${item.slug}`} className="tkp-nearby-card">
                  <div className="tkp-nearby-photo">
                    <Avatar
                      tasker={item}
                      className="h-full w-full object-cover"
                      letterClassName="h-full w-full text-[1.4rem]"
                    />
                  </div>
                  <p className="tkp-nearby-name">
                    <span>{item.name}</span>
                    {item.source === "real" ? <VerifiedIcon className="tkp-verified-sm" /> : null}
                  </p>
                  <p className="tkp-nearby-meta">
                    {item.rating != null ? (
                      <>
                        <StarIcon className="tkp-star-sm" />
                        <span>
                          {Number.isInteger(item.rating) ? item.rating : item.rating.toFixed(1)} · {item.city}
                        </span>
                      </>
                    ) : (
                      <span>{item.city}</span>
                    )}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="tkp-related-empty">
              Chưa có hồ sơ khác cùng khu vực.{" "}
              <Link href="/mau-anh-nhiep-anh-gia">Xem danh sách mẫu ảnh</Link>.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
