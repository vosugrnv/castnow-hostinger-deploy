import { notFound } from "next/navigation";

import { JsonLd, breadcrumbLd } from "@/components/PageKit";
import { ThoTaiNhaListing } from "@/components/ThoTaiNhaListing";
import { filterPublicTaskers, listPublicTaskers, paginate } from "@/lib/publicTaskers";
import { pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { cityListingPath, getCityBySlug, THO_FILTER_CITIES, THO_PAGE_SIZE } from "@/lib/thoLocations";

type Params = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ district?: string; page?: string }>;
};

export function generateStaticParams() {
  return THO_FILTER_CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Params) {
  const city = getCityBySlug((await params).city);
  if (!city) return {};
  return pageMeta({
    title: `Mẫu ảnh tại ${city.label}`,
    description: `Xem hồ sơ mẫu ảnh tại ${city.label} trên CastNow. Chọn mẫu phù hợp rồi đặt lịch trong ứng dụng.`,
    path: cityListingPath(city.slug),
  });
}

export default async function ThoTaiNhaCityPage({ params, searchParams }: Params) {
  const citySlug = (await params).city;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const query = await searchParams;
  const district = (query.district || "").trim();
  const all = await listPublicTaskers();
  const matched = filterPublicTaskers(all, {
    cityLabel: city.label,
    districtSlug: district || undefined,
  });
  const { items: taskers, page, totalPages } = paginate(matched, Number(query.page), THO_PAGE_SIZE);
  const path = cityListingPath(city.slug);

  return (
    <main>
      <JsonLd
        data={breadcrumbLd(`Mẫu ảnh tại ${city.label}`, path, {
          label: "Mẫu ảnh",
          href: "/mau-anh-nhiep-anh-gia",
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Mẫu ảnh tại ${city.label}`,
          url: `${SITE_URL}${path}`,
          numberOfItems: taskers.length,
          itemListElement: taskers.slice(0, 20).map((tasker, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/mau-anh-nhiep-anh-gia/${tasker.slug}`,
            name: tasker.name,
          })),
        }}
      />
      <ThoTaiNhaListing
        taskers={taskers}
        selectedCity={city}
        selectedDistrict={district || undefined}
        page={page}
        totalPages={totalPages}
      />
    </main>
  );
}
