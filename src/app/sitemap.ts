import type { MetadataRoute } from "next";
import { pages } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(pages).map((slug) => ({
    url: `https://www.beachavencomplex.com/${slug === "home" ? "" : slug + "/"}`,
    changeFrequency: "monthly",
    priority: slug === "home" ? 1 : 0.8,
  }));
}
