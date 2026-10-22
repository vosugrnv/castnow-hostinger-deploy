import { notFound } from "next/navigation";

import { JsonLd, breadcrumbLd } from "@/components/PageKit";
import { PublicTaskerProfile } from "@/components/PublicTaskerProfile";
import { filterPublicTaskers, getPublicTaskerBySlug, listPublicTaskers } from "@/lib/publicTaskers";
import { pageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export function generateStaticParams() {
  return [];
}

function absoluteImage(url: string | null) {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export async function generateMetadata({ params }: Params) {
  const tasker = await getPublicTaskerBySlug((await params).slug);
  if (!tasker) return {};
  return pageMeta({
    title: `${tasker.name} — Mẫu ảnh ${tasker.city}`,
    description: tasker.bio.slice(0, 155),
    path: `/mau-anh-nhiep-anh-gia/${tasker.slug}`,
    image: absoluteImage(tasker.avatarUrl),
  });
}

export default async function PublicTaskerPage({ params }: Params) {
  const slug = (await params).slug;
  const [tasker, all] = await Promise.all([getPublicTaskerBySlug(slug), listPublicTaskers()]);
  if (!tasker) notFound();

  const path = `/mau-anh-nhiep-anh-gia/${tasker.slug}`;
  const others = all.filter((item) => item.slug !== tasker.slug);
  const sameCity = filterPublicTaskers(others, { cityLabel: tasker.city });
  const sameService = others.filter((item) =>
    item.services.some((s) => tasker.services.includes(s)),
  );
  const related = [
    ...sameCity,
    ...sameService.filter((item) => !sameCity.some((c) => c.slug === item.slug)),
    ...others.filter(
      (item) =>
        !sameCity.some((c) => c.slug === item.slug) &&
        !sameService.some((s) => s.slug === item.slug),
    ),
  ].slice(0, 8);

  return (
    <main>
      <JsonLd data={breadcrumbLd(tasker.name, path, { label: "Mẫu ảnh", href: "/mau-anh-nhiep-anh-gia" })} />
      {tasker.source === "real" ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: tasker.name,
            description: tasker.bio,
            image: absoluteImage(tasker.avatarUrl),
            address: { "@type": "PostalAddress", addressLocality: tasker.city, addressCountry: "VN" },
            url: `${SITE_URL}${path}`,
          }}
        />
      ) : null}
      <PublicTaskerProfile tasker={tasker} nearby={related} />
    </main>
  );
}
