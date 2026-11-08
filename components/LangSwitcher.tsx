"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  return (
    <div role="group" aria-label={t("language")} className="flex rounded-lg border border-azure/25 p-0.5 text-xs font-semibold">
      {(["es", "en"] as const).map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-md px-3 py-1 uppercase transition-colors ${
            l === locale ? "bg-royal text-white" : "text-royal/70 hover:text-royal"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
