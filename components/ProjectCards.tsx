import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

type P = { id: string; sector: string; title: string; problem: string; solution: string; tech: string[] };

export function ProjectCards({ limit }: { limit?: number }) {
  const t = useTranslations();
  const items = (t.raw("work.projects") as P[]).slice(0, limit);
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.08}>
          <article className="card flex h-full flex-col p-7">
            <p className="eyebrow">{p.sector}</p>
            <h3 className="h3 mt-3">{p.title}</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="font-semibold text-white">{t("common.problem")}</dt><dd className="mt-1 text-mist">{p.problem}</dd></div>
              <div><dt className="font-semibold text-white">{t("common.solution")}</dt><dd className="mt-1 text-mist">{p.solution}</dd></div>
            </dl>
            <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={t("common.stack")}>
              {p.tech.map((x) => <li key={x} className="rounded-full border border-sky/20 px-3 py-1 text-xs text-sky">{x}</li>)}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
