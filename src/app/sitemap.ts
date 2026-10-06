import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://fynza.store";
  const blogSlugs = fs
    .readdirSync(path.join(process.cwd(), "src", "content", "blog"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  const routes = [
    "/etsy",
    "/etsy/calculator",
    "/etsy/faq",
    "/etsy/us",
    "/etsy/uk",
    "/etsy/eu",
    "/etsy/ca",
    "/etsy/au",
    "/etsy/in",
  ];

  return [
    ...routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date() })),
    ...blogSlugs.map((slug) => ({ url: `${base}/etsy/blog/${slug}`, lastModified: new Date() })),
  ];
}

