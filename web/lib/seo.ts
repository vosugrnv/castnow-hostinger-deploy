import type { Metadata } from "next";

export function pageMeta({
  title,
  description,
  path,
  image,
  article,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  article?: { published: string };
}): Metadata {
  const images = image ? [{ url: image }] : [{ url: "/og-castnow.png", width: 1200, height: 630 }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(article ? { type: "article" as const, publishedTime: article.published } : { type: "website" as const }),
      locale: "vi_VN",
      siteName: "CastNow",
      title: `${title} · CastNow`,
      description,
      url: path,
      images,
    },
    twitter: { card: "summary_large_image", title: `${title} · CastNow`, description, images: images.map((i) => i.url) },
  };
}
