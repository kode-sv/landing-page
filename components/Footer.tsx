import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LangSwitcher } from "./LangSwitcher";
import { CONTACT_EMAIL } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  return (
    <footer className="border-t border-azure/20 bg-gradient-to-b from-white to-mist/50">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-8" />
          <p className="mt-4 max-w-xs text-sm text-navy/65">{t("tagline")}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-sm text-azure hover:underline">{CONTACT_EMAIL}</a>
        </div>
        <nav aria-label={t("pages")}>
          <p className="eyebrow mb-4">{t("pages")}</p>
          <ul className="space-y-2 text-sm">
            {(["services", "work", "about", "contact"] as const).map((k) => (
              <li key={k}>
                <Link href={`/${k}`} className="text-navy/80 hover:text-ink">{n(k)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t("legal")}>
          <p className="eyebrow mb-4">{t("legal")}</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="text-navy/80 hover:text-ink">{t("privacy")}</Link></li>
            <li><Link href="/terms" className="text-navy/80 hover:text-ink">{t("terms")}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-navy/10">
        <div className="container-x flex flex-col gap-3 py-5 text-xs text-navy/65 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Kode SV. {t("rights")}</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <span>{t("regions")}</span>
            <LangSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
