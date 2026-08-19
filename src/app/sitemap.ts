import type { MetadataRoute } from "next";

const baseUrl = "https://rezacode.cloud";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/web-demo", "/docs", "/api-docs", "/certifications"];
  return ["en", "id"].flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route}`,
          id: `${baseUrl}/id${route}`,
        },
      },
    })),
  );
}
