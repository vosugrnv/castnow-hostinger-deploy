import {
  fetchPublicVirtualTaskers,
  fetchPublicWorkers,
  type PublicVirtualTaskerRow,
  type PublicWorkerRow,
} from "@/lib/fetchPublicWorkers";
import type { PublicTasker } from "@/lib/publicTaskerTypes";
import { slugifyVi } from "@/lib/slugifyVi";
import { cityMatchesLabel, findFilterCity, normalizeCityLabel, THO_DISTRICTS } from "@/lib/thoLocations";

function realFromRow(row: PublicWorkerRow): PublicTasker {
  const name = (row.full_name || "").trim() || "Hồ sơ CastNow";
  const userId = String(row.user_id || "").trim() || "worker";
  const skills = Array.isArray(row.skills) ? row.skills.filter(Boolean) : [];
  const bio =
    (row.bio || "").trim() ||
    `${name} trên CastNow — xem hồ sơ và đặt lịch chụp trong ứng dụng.`;
  const cityRaw = (row.working_city || "").trim() || "Việt Nam";

  return {
    id: userId,
    slug: `${slugifyVi(name)}-${userId}`,
    name,
    avatarUrl: (row.avatar_url || "").trim() || null,
    city: normalizeCityLabel(cityRaw),
    services: skills.length ? skills : ["Mẫu ảnh"],
    bio,
    highlights: [
      "Nhận lịch qua ứng dụng CastNow",
      "Phục vụ trong khu vực đã đăng ký",
      "Đặt lịch và chat trong app",
    ],
    rating: row.rating != null ? Number(row.rating) : undefined,
    jobCount: row.total_jobs != null ? Number(row.total_jobs) : undefined,
    source: "real",
  };
}

function resolveDistrict(cityLabel: string, district: string | null) {
  const label = (district || "").trim();
  if (!label) return { district: undefined, districtSlug: undefined };
  const city = findFilterCity(cityLabel);
  const known = city ? THO_DISTRICTS[city.slug]?.find((d) => d.label === label) : undefined;
  return { district: label, districtSlug: known?.slug ?? slugifyVi(label) };
}

function parseOffers(raw: PublicVirtualTaskerRow["service_offers"]) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => ({
      service: String(item?.service || "").trim(),
      label: String(item?.label || "").trim(),
      price: Math.round(Number(item?.price) || 0),
      featured: Boolean(item?.featured),
    }))
    .filter((item) => item.service && item.label && item.price > 0);
}

function virtualFromRow(row: PublicVirtualTaskerRow): PublicTasker {
  const name = (row.full_name || "").trim() || "Hồ sơ CastNow";
  const city = normalizeCityLabel((row.city || "").trim() || "Việt Nam");
  const services = Array.isArray(row.services) ? row.services.filter(Boolean) : [];
  const highlights = Array.isArray(row.highlights) ? row.highlights.filter(Boolean) : [];
  const offers = parseOffers(row.service_offers);
  const v = row.photo_version ?? 0;
  const galleryUrls: string[] = [];
  if (row.has_photo) galleryUrls.push(`/mau-anh-nhiep-anh-gia/anh/${row.id}?slot=1&v=${v}`);
  if (row.has_photo2) galleryUrls.push(`/mau-anh-nhiep-anh-gia/anh/${row.id}?slot=2&v=${v}`);
  if (row.has_photo3) galleryUrls.push(`/mau-anh-nhiep-anh-gia/anh/${row.id}?slot=3&v=${v}`);

  return {
    id: row.id,
    slug: `${slugifyVi(name)}-${row.id}`,
    name,
    avatarUrl: galleryUrls[0] ?? null,
    galleryUrls,
    city,
    ...resolveDistrict(city, row.district),
    services: services.length ? services : ["Mẫu ảnh"],
    bio: (row.bio || "").trim() || `${name} trên CastNow — đặt lịch chụp trong ứng dụng.`,
    highlights,
    rating: row.rating != null ? Number(row.rating) : undefined,
    jobCount: row.review_count != null ? Number(row.review_count) : undefined,
    source: "virtual",
    offers,
  };
}

export function filterPublicTaskers(
  taskers: PublicTasker[],
  opts: { cityLabel?: string; districtSlug?: string },
): PublicTasker[] {
  let list = taskers;
  if (opts.cityLabel) {
    list = list.filter((t) => cityMatchesLabel(t.city, opts.cityLabel!));
  }
  if (opts.districtSlug) {
    list = list.filter((t) => t.districtSlug === opts.districtSlug);
  }
  return list;
}

export async function listPublicTaskers(): Promise<PublicTasker[]> {
  const [realRows, virtualRows] = await Promise.all([fetchPublicWorkers(), fetchPublicVirtualTaskers()]);
  return [...realRows.map(realFromRow), ...virtualRows.map(virtualFromRow)];
}

export async function getPublicTaskerBySlug(slug: string): Promise<PublicTasker | null> {
  const all = await listPublicTaskers();
  return all.find((t) => t.slug === slug) ?? null;
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  return {
    items: items.slice((current - 1) * pageSize, current * pageSize),
    page: current,
    totalPages,
  };
}
