import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/FinalCta";
import { Reveal } from "@/components/Reveal";
import { alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "/services") };
}

type S = { id: string; title: string; desc: string; solves: string[]; features: string[]; tech: string[]; example: string };

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="eyebrow mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((x) => <li key={x} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />{x}</li>)}
      </ul>
    </div>
  );
}

function ServicesPageContent() {
  const t = useTranslations("services");
  const items = t.raw("items") as S[];
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} intro={t("hero.intro")} />
      <div className="container-x space-y-8 py-16 md:py-24">
        {items.map((s, i) => (
          <Reveal key={s.id}>
            <section id={s.id} className="card scroll-mt-24 p-7 md:p-10">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <span className="font-brand text-sm text-sky">0{i + 1}</span>
                  <h2 className="h2 mt-3">{s.title}</h2>
                  <p className="mt-4 text-lg">{s.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={t("labels.tech")}>
                    {s.tech.map((x) => <li key={x} className="rounded-full border border-sky/20 px-3 py-1 text-xs text-sky">{x}</li>)}
                  </ul>
                  <Link href={`/contact?service=${s.id}#form`} className="btn btn-primary mt-7">Cotizar / Quote →</Link>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <List title={t("labels.solves")} items={s.solves} />
                  <List title={t("labels.features")} items={s.features} />
                  <div className="rounded-xl border border-sky/15 bg-ink/50 p-4 sm:col-span-2">
                    <p className="eyebrow mb-2">{t("labels.example")}</p>
                    <p className="text-white">{s.example}</p>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
      <FinalCta />
    </>
  );
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesPageContent />;
}
