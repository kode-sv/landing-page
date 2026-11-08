import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BookButton } from "@/components/BookButton";
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
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-16 md:py-24">
        <div aria-hidden className="absolute inset-0">
          <ShapeWaves
            text="|< ode"
            fontFamily='Geist, "Geist Sans", system-ui, sans-serif'
            fontWeight={500}
            textSize={0.75}
            shapes="squares"
            cellSize={10}
            dotSize={0.75}
            color="#929292"
            hoverColor="#ffffff"
            backgroundColor="#00072d"
            speed={1}
            scale={1}
            contrast={1}
            brightness={0.32}
            flow={0}
            direction={0}
            fade={0.3}
            interactive={true}
            splashRadius={40}
            splashStrength={0.4}
            glow={0.35}
            intro={true}
            introDuration={1.6}
            paused={false}
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full bg-gradient-to-r from-ink via-ink/75 to-transparent lg:w-1/2"
        />
        <div className="container-x relative z-10">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 className="h1 mt-6">{t("hero.title")}</h1>
            <p className="mt-6 max-w-xl text-lg text-mist md:text-xl">{t("hero.subtitle")}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookButton label={t("hero.primary")} />
              <Link href="/services" className="btn btn-ghost">{t("hero.secondary")}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">{t("services.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("services.title")}</h2>
            <p className="mt-4 text-lg">{t("services.intro")}</p>
          </Reveal>
          <ServiceCards />
          <div className="mt-8"><Link href="/services" className="btn btn-ghost">{c("viewAll")}</Link></div>
        </div>
      </section>

      <section className="border-y border-sky/10 bg-navy/30 py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">{t("tech.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("tech.title")}</h2>
            <p className="mt-4 text-lg">{t("tech.intro")}</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tech.map((g, i) => (
              <Reveal key={g.t} delay={i * 0.07}>
                <div className="card h-full p-6">
                  <h3 className="eyebrow">{g.t}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((x) => <li key={x} className="rounded-full border border-sky/20 px-3 py-1.5 text-sm text-white">{x}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">{t("process.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("process.title")}</h2>
          </Reveal>
          <ol className="grid gap-5 md:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <li className="card h-full p-6">
                  <span className="font-brand text-2xl text-sky">0{i + 1}</span>
                  <h3 className="h3 mt-4">{s.t}</h3>
                  <p className="mt-2 text-sm">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-sky/10 py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">{t("work.eyebrow")}</p>
            <h2 className="h2 mt-4">{t("work.title")}</h2>
            <p className="mt-4 text-lg">{t("work.intro")}</p>
          </Reveal>
          <ProjectCards />
          <div className="mt-8"><Link href="/work" className="btn btn-ghost">{c("viewWork")}</Link></div>
        </div>
      </section>

      <section id="form" className="scroll-mt-20 border-t border-sky/10 py-20 md:py-28">
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
