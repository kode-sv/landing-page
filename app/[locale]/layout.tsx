import type { Metadata } from "next";
import { Audiowide, Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToSection } from "@/components/ScrollToSection";
import { SITE_URL, alternates } from "@/lib/site";
import "../globals.css";

const brand = Audiowide({ weight: "400", subsets: ["latin"], variable: "--font-audiowide", display: "swap" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: "%s" },
    description: t("description"),
    alternates: alternates(locale, ""),
    openGraph: { type: "website", siteName: "Kode SV", locale: locale === "es" ? "es_SV" : "en_US", title: t("title"), description: t("description"), url: `${SITE_URL}/${locale}` },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }] },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kode SV",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/kode-sv-simbolo-cyan.svg`,
    areaServed: ["SV", "US", "Central America"],
  };

  return (
    <html lang={locale} className={`${brand.variable} ${display.variable} ${sans.variable}`}>
      <body>
        <NextIntlClientProvider>
          <ScrollToSection />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <Analytics />
      </body>
    </html>
  );
}
