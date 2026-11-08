import { useTranslations } from "next-intl";
import { BookButton } from "./BookButton";
import { Reveal } from "./Reveal";
import { SectionLink } from "./SectionLink";

export function FinalCta() {
  const t = useTranslations("home.final");
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-sky/30 bg-gradient-to-br from-navy via-royal to-azure px-6 py-16 text-center md:px-16">
            <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-sky/35 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-sky/40 blur-3xl" />
            <h2 className="h2 relative mx-auto max-w-2xl !text-white">{t("title")}</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-sky">{t("text")}</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookButton label={t("primary")} className="btn-on-dark !bg-sky !text-royal hover:!bg-white hover:!text-royal" />
              <SectionLink href="/contact" section="form" className="btn btn-ghost-on-dark">{t("secondary")}</SectionLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
