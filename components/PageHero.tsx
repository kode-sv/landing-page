export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="relative overflow-hidden border-b border-sky/10 pb-16 pt-20 md:pb-24 md:pt-28">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div className="container-x relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h1 mt-5 max-w-3xl !text-[clamp(2.25rem,5.5vw,4rem)]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-mist md:text-xl">{intro}</p>
      </div>
    </section>
  );
}
