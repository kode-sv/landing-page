import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LiaSitemapSolid } from "react-icons/lia";
import { Link } from "@/i18n/navigation";
import { BookButton } from "@/components/BookButton";
import { HeroIcons } from "@/components/HeroIcons";
import { ServiceCards } from "@/components/ServiceCards";
import { ProjectCards } from "@/components/ProjectCards";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { ShapeWaves } from "@/components/ShapeWaves";
import { alternates } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return { title: t("title"), description: t("description"), alternates: alternates(locale, "") };
}

function HomePageContent() {
  const t = useTranslations("home");
  const c = useTranslations("common");
  const steps = t.raw("process.steps") as { t: string; d: string }[];
  const tech = t.raw("tech.groups") as { t: string; items: string[] }[];

  return (
    <>
      <section
        className="relative grid min-h-[calc(100svh-4rem)] overflow-hidden bg-white lg:h-[calc(100svh-4rem)] lg:grid-cols-2"
        aria-label="Kode SV"
      >
        <div className="flex flex-col justify-center px-6 py-16 md:px-10 lg:px-12 xl:px-16">
          <div className="max-w-xl">
            <h1 className="h1">{t("hero.title")}</h1>
            <p className="mt-6 text-lg text-royal/75 md:text-xl">{t("hero.subtitle")}</p>
          </div>
          <HeroIcons />
          <div className="mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
            <BookButton label={t("hero.primary")} />
            <Link href="/services" className="btn btn-ghost">
              <LiaSitemapSolid className="text-[1.25em] shrink-0" aria-hidden />
              {t("hero.secondary")}
            </Link>
          </div>
        </div>
        <div aria-hidden className="relative min-h-[50vh] lg:min-h-0 lg:h-full">
          <div className="absolute inset-0">
            <ShapeWaves
              text="|< ode"
              fontFamily='Geist, "Geist Sans", system-ui, sans-serif'
              fontWeight={500}
              textSize={0.75}
              shapes="squares"
              cellSize={10}
              dotSize={0.75}
              color="#0a2472"
              hoverColor="#0e6ba8"
              backgroundColor="#ffffff"
              speed={1}
              scale={1}
              contrast={1.15}
              brightness={0.62}
              flow={0}
              direction={0}
              fade={0.2}
              interactive={true}
              splashRadius={40}
              splashStrength={0.4}
              glow={0.55}
              intro={true}
              introDuration={1.6}
              paused={false}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-azure/20 bg-gradient-to-b from-white to-mist/60 py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">{t("services.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("services.title")}</h2>
            <p className="mt-4 text-lg text-royal/75">{t("services.intro")}</p>
          </Reveal>
          <ServiceCards />
          <div className="mt-8"><Link href="/services" className="btn btn-ghost">{c("viewAll")}</Link></div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-azure bg-gradient-to-br from-navy via-royal to-navy py-20 text-white md:py-28">
        <div aria-hidden className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-azure/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-sky/25 blur-3xl" />
        <div className="container-x relative">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow !text-sky">{t("tech.eyebrow")}</p>
            <h2 className="h2 mt-4 !text-white">{t("tech.title")}</h2>
            <p className="mt-4 text-lg text-sky/90">{t("tech.intro")}</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tech.map((g, i) => (
              <Reveal key={g.t} delay={i * 0.07}>
                <div className="h-full rounded-[1.25rem] border border-sky/40 bg-white/10 p-6 shadow-[inset_0_1px_0_rgba(166,225,250,0.25)] backdrop-blur-sm">
                  <h3 className="eyebrow !text-sky">{g.t}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((x) => <li key={x} className="rounded-md border border-sky/40 bg-sky/15 px-3 py-1.5 text-sm text-sky">{x}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-sky/15 to-mist/40 py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">{t("process.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("process.title")}</h2>
          </Reveal>
          <ol className="grid gap-5 md:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <li className="card h-full p-6">
                  <span className="inline-flex rounded-lg bg-sky/50 px-2.5 py-1 font-brand text-2xl text-royal">0{i + 1}</span>
                  <h3 className="h3 mt-4">{s.t}</h3>
                  <p className="mt-2 text-sm text-royal/70">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-azure/20 bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">{t("work.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("work.title")}</h2>
            <p className="mt-4 text-lg text-royal/75">{t("work.intro")}</p>
          </Reveal>
          <ProjectCards />
          <div className="mt-8"><Link href="/work" className="btn btn-ghost">{c("viewWork")}</Link></div>
        </div>
      </section>

      <section id="form" className="scroll-mt-20 border-t border-azure/20 bg-gradient-to-br from-mist/60 via-sky/20 to-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">{t("contactForm.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("contactForm.title")}</h2>
            <p className="mt-4 text-lg">{t("contactForm.text")}</p>
            <div className="mt-6"><BookButton variant="ghost" /></div>
          </Reveal>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePageContent />;
}
