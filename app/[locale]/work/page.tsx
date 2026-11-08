import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ProjectCards } from "@/components/ProjectCards";
import { FinalCta } from "@/components/FinalCta";
import { alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.work" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/work") };
}

function WorkPageContent() {
  const t = useTranslations("work");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} intro={t("hero.intro")} />
      <div className="container-x py-16 md:py-24">
        <ProjectCards />
        <p className="mt-8 text-sm text-dim">{t("notice")}</p>
      </div>
      <FinalCta />
    </>
  );
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WorkPageContent />;
}
