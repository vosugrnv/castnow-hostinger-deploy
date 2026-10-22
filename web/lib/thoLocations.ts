import { slugifyVi } from "@/lib/slugifyVi";

export type ThoCity = {
  label: string;
  slug: string;
};

/** Thứ tự gần giống Zena — đủ tỉnh/thành để bộ lọc chuẩn. */
export const THO_FILTER_CITIES: ThoCity[] = [
  "TP.HCM",
  "Hà Nội",
  "Đà Nẵng",
  "Hải Phòng",
  "Khánh Hòa",
  "Bắc Ninh",
  "Cần Thơ",
  "An Giang",
  "Bắc Giang",
  "Bình Dương",
  "Quảng Ninh",
  "Lâm Đồng",
  "Bà Rịa - Vũng Tàu",
  "Cà Mau",
  "Đắk Lắk",
  "Gia Lai",
  "Ninh Bình",
  "Hòa Bình",
  "Thanh Hóa",
  "Thái Nguyên",
  "Tiền Giang",
  "Thừa Thiên Huế",
  "Vĩnh Long",
  "Bạc Liêu",
  "Lào Cai",
  "Quảng Nam",
  "Thái Bình",
  "Đồng Nai",
  "Kiên Giang",
  "Ninh Thuận",
  "Quảng Ngãi",
  "Tuyên Quang",
  "Vĩnh Phúc",
  "Bình Định",
  "Hà Tĩnh",
  "Hậu Giang",
  "Nghệ An",
  "Hà Nam",
  "Quảng Bình",
  "Đồng Tháp",
  "Hải Dương",
  "Hưng Yên",
  "Kon Tum",
  "Lạng Sơn",
  "Nam Định",
  "Phú Thọ",
  "Quảng Trị",
  "Sóc Trăng",
  "Tây Ninh",
  "Điện Biên",
  "Long An",
  "Phú Yên",
  "Yên Bái",
  "Bình Thuận",
  "Cao Bằng",
  "Bến Tre",
  "Bắc Kạn",
  "Đắk Nông",
  "Sơn La",
  "Bình Phước",
  "Hà Giang",
  "Lai Châu",
  "Trà Vinh",
].map((label) => ({
  label,
  slug: label === "TP.HCM" ? "tp-hcm" : slugifyVi(label),
}));

/** Slug alias (đã bỏ dấu) → slug tỉnh trong bộ lọc. */
const CITY_SLUG_ALIASES: Record<string, string> = {
  "ho-chi-minh": "tp-hcm",
  "ho-chi-minh-city": "tp-hcm",
  "tp-ho-chi-minh": "tp-hcm",
  "thanh-pho-ho-chi-minh": "tp-hcm",
  hcm: "tp-hcm",
  hcmc: "tp-hcm",
  "sai-gon": "tp-hcm",
  saigon: "tp-hcm",
  hanoi: "ha-noi",
  danang: "da-nang",
  hue: "thua-thien-hue",
  "nha-trang": "khanh-hoa",
  "vung-tau": "ba-ria-vung-tau",
  "ba-ria": "ba-ria-vung-tau",
  "dac-lac": "dak-lak",
  "dac-nong": "dak-nong",
};

export const THO_DISTRICTS: Record<string, { label: string; slug: string }[]> = {
  "ha-noi": [
    "Ba Đình",
    "Hoàn Kiếm",
    "Tây Hồ",
    "Long Biên",
    "Cầu Giấy",
    "Đống Đa",
    "Hai Bà Trưng",
    "Hoàng Mai",
    "Thanh Xuân",
    "Nam Từ Liêm",
    "Bắc Từ Liêm",
    "Hà Đông",
    "Sơn Tây",
    "Đông Anh",
    "Gia Lâm",
    "Sóc Sơn",
    "Thanh Trì",
    "Mê Linh",
    "Hoài Đức",
    "Thường Tín",
  ].map((label) => ({ label, slug: slugifyVi(label) })),
  "tp-hcm": [
    "Quận 1",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 7",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Bình Thạnh",
    "Phú Nhuận",
    "Tân Bình",
    "Tân Phú",
    "Gò Vấp",
    "Thủ Đức",
    "Bình Tân",
    "Hóc Môn",
    "Củ Chi",
    "Nhà Bè",
    "Bình Chánh",
  ].map((label) => ({ label, slug: slugifyVi(label) })),
  "da-nang": [
    "Hải Châu",
    "Thanh Khê",
    "Sơn Trà",
    "Ngũ Hành Sơn",
    "Liên Chiểu",
    "Cẩm Lệ",
    "Hòa Vang",
  ].map((label) => ({ label, slug: slugifyVi(label) })),
  "hai-phong": [
    "Hồng Bàng",
    "Ngô Quyền",
    "Lê Chân",
    "Hải An",
    "Kiến An",
    "Đồ Sơn",
    "Dương Kinh",
  ].map((label) => ({ label, slug: slugifyVi(label) })),
  "can-tho": ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt"].map((label) => ({
    label,
    slug: slugifyVi(label),
  })),
  "binh-duong": ["Thủ Dầu Một", "Dĩ An", "Thuận An", "Bến Cát", "Tân Uyên"].map((label) => ({
    label,
    slug: slugifyVi(label),
  })),
  "dong-nai": ["Biên Hòa", "Long Khánh", "Nhơn Trạch", "Trảng Bom", "Long Thành"].map((label) => ({
    label,
    slug: slugifyVi(label),
  })),
  "khanh-hoa": ["Nha Trang", "Cam Ranh", "Ninh Hòa", "Diên Khánh"].map((label) => ({
    label,
    slug: slugifyVi(label),
  })),
  "thua-thien-hue": ["Huế", "Hương Thủy", "Hương Trà", "Phú Vang"].map((label) => ({
    label,
    slug: slugifyVi(label),
  })),
  "ba-ria-vung-tau": ["Vũng Tàu", "Bà Rịa", "Phú Mỹ", "Long Điền"].map((label) => ({
    label,
    slug: slugifyVi(label),
  })),
};

export function getCityBySlug(slug: string): ThoCity | undefined {
  return THO_FILTER_CITIES.find((c) => c.slug === slug);
}

export function cityListingPath(citySlug?: string) {
  return citySlug ? `/mau-anh-nhiep-anh-gia-${citySlug}` : "/mau-anh-nhiep-anh-gia";
}

/** Khớp mọi cách ghi tỉnh (có/không dấu, "Thành phố …", "Tỉnh …") về tỉnh trong bộ lọc. */
export function findFilterCity(raw: string): ThoCity | undefined {
  const slug = slugifyVi(raw.trim())
    .replace(/^(thanh-pho|tinh|tp)-/, "")
    .replace(/-(city|province)$/, "");
  if (!slug) return undefined;
  const target = CITY_SLUG_ALIASES[slug] ?? slug;
  return getCityBySlug(target);
}

export function cityMatchesLabel(taskerCity: string, label: string): boolean {
  return findFilterCity(taskerCity)?.label === label;
}

export function normalizeCityLabel(taskerCity: string): string {
  return findFilterCity(taskerCity)?.label ?? taskerCity;
}

export const THO_PAGE_SIZE = 40;

export function listingHref(
  citySlug: string | undefined,
  opts: { district?: string; page?: number } = {},
): string {
  const params = new URLSearchParams();
  if (opts.district) params.set("district", opts.district);
  if (opts.page && opts.page > 1) params.set("page", String(opts.page));
  const qs = params.toString();
  return `${cityListingPath(citySlug)}${qs ? `?${qs}` : ""}`;
}
