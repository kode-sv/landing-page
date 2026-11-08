export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <span className={`inline-flex translate-y-0.5 items-center gap-0.5 leading-none ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/kode-sv-simbolo-cyan.svg"
        alt=""
        aria-hidden
        className="h-full w-auto shrink-0"
      />
      <span className="font-brand text-[1.05em] leading-none tracking-wide text-royal">
        ode&nbsp;SV
      </span>
      <span className="sr-only">Kode SV</span>
    </span>
  );
}
