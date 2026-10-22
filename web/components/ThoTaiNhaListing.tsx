import Link from "next/link";

import { PublicTaskerCard } from "@/components/PublicTaskerCard";
import type { PublicTasker } from "@/lib/publicTaskerTypes";
import {
  cityListingPath,
  listingHref,
  THO_DISTRICTS,
  THO_FILTER_CITIES,
  type ThoCity,
} from "@/lib/thoLocations";
import { APP_DOWNLOAD_URL, SUPPORT_EMAIL } from "@/lib/site";

const FAQS = [
  {
    q: "Đặt mẫu ảnh trên CastNow như thế nào?",
    a: "Bạn mở app CastNow, chọn kiểu buổi chụp và người phù hợp, rồi đặt lịch theo khung giờ. Người bạn chọn đến địa điểm đã hẹn. Thanh toán được xử lý trong ứng dụng.",
  },
  {
    q: "Hồ sơ trên CastNow có đáng tin không?",
    a: "CastNow công khai hồ sơ mẫu ảnh, ảnh portfolio và khu vực nhận lịch để bạn chọn trước khi đặt trong app.",
  },
  {
    q: "Giá một buổi chụp là bao nhiêu?",
    a: "Mức giá dao động theo kiểu buổi chụp, thời lượng và khu vực. Chi tiết hiện khi đặt trong ứng dụng, không phát sinh phí ẩn ngoài các khoản đã hiện trên đơn.",
  },
  {
    q: "CastNow có những kiểu buổi chụp nào?",
    a: "Chân dung, thời trang, sản phẩm, cưới và cặp đôi, sự kiện, gia đình, ngoại cảnh và ảnh thương mại. Trong app có thể lọc theo kiểu buổi chụp.",
  },
  {
    q: "Đặt lịch chụp có thể hủy hoặc đổi giờ không?",
    a: "Bạn có thể hủy hoặc đổi lịch theo chính sách hiển thị trong ứng dụng trước giờ bắt đầu. Chi tiết điều kiện được cập nhật trên từng đơn đặt.",
  },
  {
    q: "Vì sao nên đặt trên CastNow?",
    a: "CastNow giúp bạn tiết kiệm thời gian tìm kiếm, xem portfolio và chọn mẫu phù hợp yêu cầu rồi đặt lịch ngay trên điện thoại.",
  },
];

function pageWindow(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  const pages: (number | "…")[] = [];
  if (start > 1) pages.push(1);
  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages - 1) pages.push("…");
  if (end < totalPages) pages.push(totalPages);
  return pages;
}

function Pagination({
  page,
  totalPages,
  citySlug,
  district,
}: {
  page: number;
  totalPages: number;
  citySlug?: string;
  district?: string;
}) {
  if (totalPages <= 1) return null;
  const href = (p: number) => listingHref(citySlug, { district, page: p });
  return (
    <nav className="tho-pagination" aria-label="Phân trang">
      <Link
        className="tho-page-btn"
        href={href(Math.max(1, page - 1))}
        aria-disabled={page <= 1 ? "true" : "false"}
        aria-label="Trang trước"
      >
        ‹
      </Link>
      {pageWindow(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="tho-page-ellipsis">
            …
          </span>
        ) : (
          <Link
            key={p}
            className="tho-page-num"
            href={href(p)}
            data-active={p === page ? "true" : "false"}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Link>
        ),
      )}
      <Link
        className="tho-page-btn"
        href={href(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages ? "true" : "false"}
        aria-label="Trang sau"
      >
        ›
      </Link>
    </nav>
  );
}

export function ThoTaiNhaListing({
  taskers,
  selectedCity,
  selectedDistrict,
  page = 1,
  totalPages = 1,
}: {
  taskers: PublicTasker[];
  selectedCity?: ThoCity;
  selectedDistrict?: string;
  page?: number;
  totalPages?: number;
}) {
  const title = selectedCity ? `Mẫu ảnh tại ${selectedCity.label}` : "Mẫu ảnh";
  const districts = selectedCity ? THO_DISTRICTS[selectedCity.slug] ?? [] : [];

  return (
    <section className="tho-page">
      <div className="tho-page-inner">
        <nav className="tho-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Trang chủ</Link>
          <span aria-hidden>›</span>
          {selectedCity ? (
            <>
              <Link href="/mau-anh-nhiep-anh-gia">Mẫu ảnh</Link>
              <span aria-hidden>›</span>
              <span>{title}</span>
            </>
          ) : (
            <span>Mẫu ảnh</span>
          )}
        </nav>

        <h1 className="tho-page-title">{title}</h1>

        <div className="tho-layout">
          <aside className="tho-filter">
            <h2 className="tho-filter-title">Bộ lọc</h2>
            <p className="tho-filter-subtitle">Thành phố</p>
            <ul className="tho-filter-list">
              <li>
                <Link
                  href="/mau-anh-nhiep-anh-gia"
                  className="tho-filter-item"
                  data-active={selectedCity ? "false" : "true"}
                >
                  <span>Tất cả</span>
                  <span aria-hidden>›</span>
                </Link>
              </li>
              {THO_FILTER_CITIES.map((city) => {
                const active = selectedCity?.slug === city.slug;
                return (
                  <li key={city.slug} className={active ? "tho-filter-city-open" : undefined}>
                    <Link
                      href={cityListingPath(city.slug)}
                      className="tho-filter-item"
                      data-active={active ? "true" : "false"}
                      data-expanded={active ? "true" : "false"}
                    >
                      <span>{city.label}</span>
                      <span aria-hidden>{active && districts.length ? "▾" : "›"}</span>
                    </Link>
                    {active && districts.length ? (
                      <ul className="tho-filter-districts">
                        {districts.map((district) => {
                          const districtActive = selectedDistrict === district.slug;
                          return (
                            <li key={district.slug}>
                              <Link
                                href={listingHref(city.slug, { district: district.slug })}
                                className="tho-filter-item tho-filter-district"
                                data-active={districtActive ? "true" : "false"}
                              >
                                <span>{district.label}</span>
                                <span aria-hidden>›</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="tho-listing">
            {taskers.length ? (
              <>
                <div className="tho-grid">
                  {taskers.map((tasker) => (
                    <PublicTaskerCard key={tasker.id} tasker={tasker} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  citySlug={selectedCity?.slug}
                  district={selectedDistrict}
                />
              </>
            ) : (
              <div className="tho-empty">
                <h2>Chưa có hồ sơ ở khu vực này</h2>
                <p>
                  Thử chọn <Link href="/mau-anh-nhiep-anh-gia">Tất cả</Link>
                  {selectedCity ? (
                    <>
                      {" "}
                      hoặc <Link href={cityListingPath(selectedCity.slug)}>{selectedCity.label}</Link>
                    </>
                  ) : null}
                  , rồi đặt lịch trong app CastNow.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="tho-below">
          <div className="tho-intro">
            <p>
              {selectedCity
                ? `Mẫu ảnh tại ${selectedCity.label} giúp bạn tìm người gần địa điểm chụp. Xem hồ sơ trên web rồi đặt lịch trong ứng dụng CastNow.`
                : "Thay vì hỏi số điện thoại truyền miệng, bạn xem hồ sơ mẫu ảnh trên CastNow rồi đặt lịch trong ứng dụng — mẫu bạn chọn đến đúng địa điểm, đúng kiểu buổi chụp."}
            </p>
            <p>
              CastNow kết nối bạn với mẫu ảnh gần địa điểm chụp, có hồ sơ công khai để tham khảo trước.
              Các kiểu chụp phổ biến gồm chân dung, thời trang, sản phẩm, cưới và cặp đôi, sự kiện, gia đình,
              ngoại cảnh và ảnh thương mại.
            </p>
          </div>

          <div className="tho-download-block">
            <h2>Tải app CastNow để xem hồ sơ và đặt lịch chụp</h2>
            <ul>
              <li>
                Tải ứng dụng:{" "}
                <a href={APP_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                  {APP_DOWNLOAD_URL}
                </a>
              </li>
              <li>Hỗ trợ: {SUPPORT_EMAIL}</li>
            </ul>
            <Link className="tho-guide-link" href="/huong-dan-dat-lich">
              Hướng dẫn đặt lịch mẫu ảnh trên ứng dụng CastNow
            </Link>
          </div>

          <div className="tho-faq">
            <h2>Câu hỏi thường gặp</h2>
            {FAQS.map((item) => (
              <div className="tho-faq-item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
