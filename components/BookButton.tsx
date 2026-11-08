import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BOOKING_URL } from "@/lib/site";

export function BookButton({ label, variant = "primary", className = "" }: { label?: string; variant?: "primary" | "ghost"; className?: string }) {
  const t = useTranslations("nav");
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`;
  const text = label ?? t("book");
  return BOOKING_URL ? (
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={cls}>{text}</a>
  ) : (
    <Link href="/contact#agenda" className={cls}>{text}</Link>
  );
}
