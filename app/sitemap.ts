import type { MetadataRoute } from "next";
import { LOCALES, PAGES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((p) =>
    LOCALES.map((l) => ({
      url: `${SITE_URL}/${l}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: { languages: { es: `${SITE_URL}/es${p}`, en: `${SITE_URL}/en${p}` } },
    })),
  );
}
