import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookButton } from "./BookButton";
import { Reveal } from "./Reveal";

export function FinalCta() {
  const t = useTranslations("home.final");
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-sky/20 bg-gradient-to-br from-royal via-navy to-ink px-6 py-16 text-center md:px-16">
            <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-azure/40 blur-3xl" />
            <h2 className="h2 relative mx-auto max-w-2xl">{t("title")}</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-mist">{t("text")}</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookButton label={t("primary")} />
              <Link href="/contact#form" className="btn btn-ghost">{t("secondary")}</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
