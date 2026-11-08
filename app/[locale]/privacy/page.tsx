import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/privacy") };
}

function PageContent() {
  const t = useTranslations("privacy");
  const sections = t.raw("sections") as { h: string; p: string }[];
  return (
    <article className="container-x max-w-3xl py-20 md:py-28">
      <h1 className="h1 !text-[clamp(2rem,5vw,3.25rem)]">{t("title")}</h1>
      <p className="mt-3 text-sm text-dim">{t("updated")}</p>
      <p className="mt-6 rounded-lg border border-dashed border-sky/30 p-3 text-sm text-dim">{t("draft")}</p>
      {sections.map((s) => (
        <section key={s.h} className="mt-10"><h2 className="h3">{s.h}</h2><p className="mt-2 text-lg">{s.p}</p></section>
      ))}
    </article>
  );
}

export default async function Page({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageContent />;
}
