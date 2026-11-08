import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { CONTACT_EMAIL } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  return (
    <footer className="border-t border-sky/10 bg-ink">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-8" />
          <p className="mt-4 max-w-xs text-sm text-dim">{t("tagline")}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-sm text-sky hover:underline">{CONTACT_EMAIL}</a>
        </div>
        <nav aria-label={t("pages")}>
          <p className="eyebrow mb-4">{t("pages")}</p>
          <ul className="space-y-2 text-sm">
            {(["services", "work", "about", "contact"] as const).map((k) => (
              <li key={k}><Link href={`/${k}`} className="text-mist hover:text-white">{n(k)}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t("legal")}>
          <p className="eyebrow mb-4">{t("legal")}</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="text-mist hover:text-white">{t("privacy")}</Link></li>
            <li><Link href="/terms" className="text-mist hover:text-white">{t("terms")}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-sky/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-dim md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Kode SV. {t("rights")}</span>
          <span>{t("regions")}</span>
        </div>
      </div>
    </footer>
  );
}
