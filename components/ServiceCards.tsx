import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

const ICONS: Record<string, React.ReactNode> = {
  web: <path d="M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01" />,
  software: <path d="M4 5h16v10H4zM8 19h8M12 15v4M8 9l2 2-2 2M12 13h4" />,
  ai: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2M9 9h6v6H9z" />,
  consulting: <path d="M6 6a2 2 0 1 0 0 .01M18 6a2 2 0 1 0 0 .01M12 18a2 2 0 1 0 0 .01M7.5 7.5l3.5 9M16.5 7.5L13 16.5M8 6h8" />,
};

export function ServiceCards() {
  const t = useTranslations();
  const items = t.raw("services.items") as { id: string; title: string; short: string }[];
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((s, i) => (
        <Reveal key={s.id} delay={i * 0.08}>
          <Link href={`/services#${s.id}`} className="card group flex h-full flex-col p-7 transition-colors hover:border-sky/50">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-sky/10 text-sky">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[s.id]}</svg>
            </span>
            <h3 className="h3">{s.title}</h3>
            <p className="mt-2 flex-1 text-mist">{s.short}</p>
            <span className="mt-5 text-sm font-semibold text-sky">{t("common.learnMore")} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
