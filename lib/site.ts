export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kode-sv.com";
// Usuario/evento de Cal.com, p. ej. "kode-sv/30min"
export const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "";
export const BOOKING_URL = CAL_LINK ? `https://cal.com/${CAL_LINK}` : "";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@kode-sv.com";
export const LOCALES = ["es", "en"] as const;
export const PAGES = ["", "/services", "/work", "/about", "/contact", "/privacy", "/terms"] as const;

export function alternates(locale: string, path: string) {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      es: `${SITE_URL}/es${path}`,
      en: `${SITE_URL}/en${path}`,
      "x-default": `${SITE_URL}/es${path}`,
    },
  };
}
