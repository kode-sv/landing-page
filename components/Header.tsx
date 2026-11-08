"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { BOOKING_URL } from "@/lib/site";

const LINKS = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  return (
    <div role="group" aria-label={t("language")} className="flex rounded-full border border-sky/25 p-0.5 text-xs font-semibold">
      {(["es", "en"] as const).map((l) => (
        <Link key={l} href={pathname} locale={l} hrefLang={l} aria-current={l === locale ? "true" : undefined}
          className={`rounded-full px-3 py-1 uppercase transition-colors ${l === locale ? "bg-sky text-ink" : "text-mist hover:text-white"}`}>
          {l}
        </Link>
      ))}
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const book = BOOKING_URL ? { href: BOOKING_URL, ext: true } : { href: "/contact#agenda", ext: false };

  return (
    <header className="sticky top-0 z-50 border-b border-sky/10 bg-ink/80 backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-sky focus:px-3 focus:py-2 focus:text-ink">{t("skip")}</a>
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Kode SV"><Logo className="h-7" /></Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {LINKS.map(({ href, key }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return <Link key={key} href={href} aria-current={active ? "page" : undefined}
              className={`text-sm transition-colors ${active ? "text-white" : "text-mist hover:text-white"}`}>{t(key)}</Link>;
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LangSwitcher />
          {book.ext
            ? <a href={book.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-2 !text-sm">{t("book")}</a>
            : <Link href="/contact#agenda" className="btn btn-primary !py-2 !text-sm">{t("book")}</Link>}
        </div>
        <button type="button" className="md:hidden rounded-lg border border-sky/25 p-2 text-white" aria-expanded={open} aria-controls="mobile-nav"
          aria-label={open ? t("close") : t("menu")} onClick={() => setOpen((o) => !o)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="border-t border-sky/10 bg-ink md:hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Principal">
            {LINKS.map(({ href, key }) => (
              <Link key={key} href={href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-lg text-white">{t(key)}</Link>
            ))}
            <div className="mt-3 flex items-center justify-between">
              <LangSwitcher />
              <Link href="/contact#agenda" onClick={() => setOpen(false)} className="btn btn-primary !py-2 !text-sm">{t("book")}</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
