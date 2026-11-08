import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { alternates, BOOKING_URL, CAL_LINK, CONTACT_EMAIL } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/contact") };
}

function ContactPageContent() {
  const t = useTranslations("contact");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} intro={t("hero.intro")} />
      <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-[1.3fr_0.7fr]">
        <div id="form" className="scroll-mt-24"><ContactForm /></div>
        <aside id="agenda" className="scroll-mt-24 space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-7">
            <h2 className="h3">{t("book.title")}</h2>
            <p className="mt-3 text-sm">{t("book.text")}</p>
            {CAL_LINK
              ? <iframe title={t("book.title")} src={`${BOOKING_URL}?embed=true&theme=light&layout=month_view`} className="mt-5 h-[640px] w-full rounded-xl border border-navy/15 bg-white" loading="lazy" />
              : <p className="mt-5 rounded-lg border border-dashed border-navy/15 p-3 text-xs text-dim">Configura NEXT_PUBLIC_CAL_LINK (p. ej. kode-sv/30min) para activar el calendario.</p>}
            <p className="mt-3 text-xs text-dim">{t("book.tz")}</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="block text-sm text-azure hover:underline">{CONTACT_EMAIL}</a>
        </aside>
      </div>
    </>
  );
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPageContent />;
}
