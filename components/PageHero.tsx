export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="relative overflow-hidden border-b border-azure/20 bg-gradient-to-br from-mist via-sky/30 to-white pb-16 pt-20 md:pb-24 md:pt-28">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full bg-azure/20 blur-3xl" />
      <div className="container-x relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h1 mt-5 max-w-3xl !text-[clamp(2.25rem,5.5vw,4rem)]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-navy/80 md:text-xl">{intro}</p>
      </div>
    </section>
  );
}
