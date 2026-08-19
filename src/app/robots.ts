import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio/"] },
    sitemap: "https://rezacode.cloud/sitemap.xml",
    host: "https://rezacode.cloud",
  };
}
