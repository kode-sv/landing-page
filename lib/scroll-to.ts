const STORAGE_KEY = "kode:scrollTo";
const RETRY_DELAYS_MS = [0, 0, 50] as const;

export function setPendingScroll(id: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, id);
}

export function consumePendingScroll(): string | null {
  if (typeof window === "undefined") return null;
  const id = sessionStorage.getItem(STORAGE_KEY);
  if (id) sessionStorage.removeItem(STORAGE_KEY);
  return id;
}

export function scrollToId(id: string, attempt = 0) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (attempt >= RETRY_DELAYS_MS.length - 1) return;
  const delay = RETRY_DELAYS_MS[attempt + 1] ?? 0;
  const next = () => scrollToId(id, attempt + 1);
  if (delay > 0) setTimeout(next, delay);
  else requestAnimationFrame(next);
}
