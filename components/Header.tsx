"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CiCalendar } from "react-icons/ci";
import { Link, usePathname } from "@/i18n/navigation";
import { scrollToId } from "@/lib/scroll-to";
import { BOOKING_URL } from "@/lib/site";
import { Logo } from "./Logo";
import { SectionLink } from "./SectionLink";

const LINKS = [
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-azure/20 bg-white/85 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-sky focus:px-3 focus:py-2 focus:text-ink"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("main");
        }}
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-6 md:px-10 lg:px-12 xl:px-16">
        <Link href="/" aria-label="Kode SV" className="inline-flex items-center leading-none">
          <Logo className="h-7" />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {LINKS.map(({ href, key }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`text-base font-bold transition-colors ${active ? "text-royal" : "text-royal/70 hover:text-royal"}`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {BOOKING_URL
            ? (
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-2 !text-sm">
                <CiCalendar className="text-[1.25em] shrink-0" aria-hidden />
                {t("book")}
              </a>
            )
            : (
              <SectionLink href="/contact" section="agenda" className="btn btn-primary !py-2 !text-sm">
                <CiCalendar className="text-[1.25em] shrink-0" aria-hidden />
                {t("book")}
              </SectionLink>
            )}
        </div>
        <button
          type="button"
          className="md:hidden rounded-lg border border-azure/25 p-2 text-royal"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t("close") : t("menu")}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="border-t border-navy/10 bg-white md:hidden">
          <nav className="mx-auto flex w-full flex-col gap-1 px-6 py-4 md:px-10 lg:px-12 xl:px-16" aria-label="Principal">
            {LINKS.map(({ href, key }) => (
              <Link key={key} href={href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-lg font-bold text-royal">
                {t(key)}
              </Link>
            ))}
            <div className="mt-3">
              {BOOKING_URL
                ? (
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-2 !text-sm" onClick={() => setOpen(false)}>
                    <CiCalendar className="text-[1.25em] shrink-0" aria-hidden />
                    {t("book")}
                  </a>
                )
                : (
                  <SectionLink href="/contact" section="agenda" onClick={() => setOpen(false)} className="btn btn-primary !py-2 !text-sm">
                    <CiCalendar className="text-[1.25em] shrink-0" aria-hidden />
                    {t("book")}
                  </SectionLink>
                )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
