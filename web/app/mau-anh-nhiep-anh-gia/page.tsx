import { permanentRedirect } from "next/navigation";

import { JsonLd, breadcrumbLd } from "@/components/PageKit";
import { ThoTaiNhaListing } from "@/components/ThoTaiNhaListing";
import { listPublicTaskers, paginate } from "@/lib/publicTaskers";
import { pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { cityListingPath, findFilterCity, THO_PAGE_SIZE } from "@/lib/thoLocations";

export const metadata = pageMeta({
  title: "Mẫu ảnh theo concept",
  description:
    "Xem hồ sơ mẫu ảnh trên CastNow. Chọn mẫu phù hợp concept rồi đặt lịch trong ứng dụng.",
  path: "/mau-anh-nhiep-anh-gia",
});

type Props = { searchParams: Promise<{ page?: string; city?: string }> };

export default async function ThoTaiNhaPage({ searchParams }: Props) {
  const query = await searchParams;
  if (query.city) {
    const city = findFilterCity(query.city);
    permanentRedirect(city ? cityListingPath(city.slug) : "/mau-anh-nhiep-anh-gia");
  }

  const all = await listPublicTaskers();
  const { items, page, totalPages } = paginate(all, Number(query.page), THO_PAGE_SIZE);

  return (
    <main>
      <JsonLd data={breadcrumbLd("Mẫu ảnh", "/mau-anh-nhiep-anh-gia")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Mẫu ảnh CastNow",
          url: `${SITE_URL}/mau-anh-nhiep-anh-gia`,
          numberOfItems: all.length,
          itemListElement: items.slice(0, 20).map((tasker, index) => ({
            "@type": "ListItem",
            position: (page - 1) * THO_PAGE_SIZE + index + 1,
            url: `${SITE_URL}/mau-anh-nhiep-anh-gia/${tasker.slug}`,
            name: tasker.name,
          })),
        }}
      />
      <ThoTaiNhaListing taskers={items} page={page} totalPages={totalPages} />
    </main>
  );
}
