import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/FinalCta";
import { alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/about") };
}

function AboutPageContent() {
  const t = useTranslations("about");
  const values = t.raw("values.items") as { t: string; d: string }[];
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} intro={t("hero.intro")} />
      <div className="container-x space-y-16 py-16 md:py-24">
        <section className="grid gap-8 lg:grid-cols-2">
          <div><h2 className="h2">{t("mission.title")}</h2><p className="mt-4 text-lg">{t("mission.text")}</p></div>
          <div><h2 className="h2">{t("reach.title")}</h2><p className="mt-4 text-lg">{t("reach.text")}</p></div>
        </section>
        <section>
          <h2 className="h2 mb-8">{t("values.title")}</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.t} className="card p-6"><h3 className="h3">{v.t}</h3><p className="mt-2 text-sm">{v.d}</p></li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="h2 mb-4">{t("team.title")}</h2>
          <p className="rounded-xl border border-dashed border-navy/15 p-6 text-dim">{t("team.note")}</p>
        </section>
      </div>
      <FinalCta />
    </>
  );
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageContent />;
}
