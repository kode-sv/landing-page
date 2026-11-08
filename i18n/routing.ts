import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  // No forzamos el idioma por ubicación/navegador: el selector es visible.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
