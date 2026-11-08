export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/kode-sv-horizontal-cyan.svg" alt="Kode SV" className={`w-auto ${className}`} />
  );
}
