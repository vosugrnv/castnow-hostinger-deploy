import type { MetadataRoute } from "next";

import { BLOG_POSTS } from "@/lib/blog";
import { filterPublicTaskers, listPublicTaskers } from "@/lib/publicTaskers";
import { cityListingPath, THO_FILTER_CITIES } from "@/lib/thoLocations";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

/** Ngày sửa nội dung gần nhất của các trang tĩnh; cập nhật khi đổi nội dung trang. */
const PAGES_UPDATED = new Date("2026-10-19");

const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/khach-hang", priority: 0.9, changeFrequency: "monthly" },
  { path: "/mau-anh-nhiep-anh-gia", priority: 0.9, changeFrequency: "weekly" },
  { path: "/nhan-lich-chup", priority: 0.9, changeFrequency: "monthly" },
  { path: "/huong-dan-dat-lich", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tai-ung-dung", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/gioi-thieu", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cau-hoi", priority: 0.7, changeFrequency: "monthly" },
  { path: "/lien-he", priority: 0.7, changeFrequency: "monthly" },
  { path: "/dieu-khoan-su-dung", priority: 0.3, changeFrequency: "yearly" },
  { path: "/bao-mat", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: PAGES_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
  const posts = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const allTaskers = await listPublicTaskers();
  const cities = THO_FILTER_CITIES.filter(
    (city) => filterPublicTaskers(allTaskers, { cityLabel: city.label }).length > 0,
  ).map((city) => ({
    url: `${SITE_URL}${cityListingPath(city.slug)}`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));
  const taskers = allTaskers.map((tasker) => ({
    url: `${SITE_URL}/mau-anh-nhiep-anh-gia/${tasker.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...pages, ...posts, ...cities, ...taskers];
}
