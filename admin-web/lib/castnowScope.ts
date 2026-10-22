/**
 * Admin CastNow dùng chung backend với TaskNow cũ.
 * Lọc bỏ đơn/hồ sơ thuộc dịch vụ tại nhà TaskNow; chỉ giữ dữ liệu mẫu ảnh / buổi chụp.
 */

const TASKNOW_HOME_MARKERS = [
  "dọn dẹp",
  "điện lạnh",
  "nội thất",
  "sửa chữa",
  "bảo trì",
  "lắp đặt",
  "lắp ráp",
  "chuyển nhà",
  "vận chuyển",
  "sân vườn",
  "công nghệ & it",
  "it tại nhà",
  "giao việc",
  "hỗ trợ cá nhân",
  "sơn sửa",
  "cải tạo nhà",
  "máy lạnh",
  "tổng vệ sinh",
  "thiết bị gia dụng",
  "vệ sinh máy",
  "thợ tại nhà",
  "sofa",
  "tủ bếp",
];

const CASTNOW_MARKERS = [
  "chụp",
  "ảnh",
  "mẫu ảnh",
  "lookbook",
  "chân dung",
  "thời trang",
  "pre-wedding",
  "cưới",
  "sự kiện",
  "concept",
  "portfolio",
  "headshot",
  "fashion",
  "model",
  "nhận lịch",
  "buổi chụp",
  "album",
  "moodboard",
];

function normalizeVi(input: string): string {
  return input.trim().toLowerCase().normalize("NFC");
}

/** Đơn/dịch vụ thuộc TaskNow thợ tại nhà (không phải CastNow). */
export function isTaskNowHomeService(text: string | null | undefined): boolean {
  const t = normalizeVi(text ?? "");
  if (!t) return false;
  if (CASTNOW_MARKERS.some((m) => t.includes(m))) return false;
  return TASKNOW_HOME_MARKERS.some((m) => t.includes(m));
}

/** Giữ bản ghi nếu không khớp dịch vụ nhà TaskNow. */
export function isCastNowScoped(...fields: Array<string | null | undefined>): boolean {
  return !fields.some((field) => isTaskNowHomeService(field));
}

/** Đổi nhãn TaskNow → CastNow khi hiển thị. */
export function brandDisplayName(name: string | null | undefined): string {
  if (!name) return "—";
  return name.replace(/Task\s*Now/gi, "CastNow").replace(/tasknow/gi, "CastNow");
}

export function filterCastNowRows<T extends { total_count?: number }>(
  rows: T[],
  keep: (row: T) => boolean,
): T[] {
  const filtered = rows.filter(keep);
  if (filtered.length === 0) return filtered;
  const total = filtered.length;
  return filtered.map((row, index) => (index === 0 ? { ...row, total_count: total } : row));
}
