import { useTranslations } from "next-intl";
import { CiCalendar } from "react-icons/ci";
import { BOOKING_URL } from "@/lib/site";
import { SectionLink } from "./SectionLink";

export function BookButton({ label, variant = "primary", className = "" }: { label?: string; variant?: "primary" | "ghost"; className?: string }) {
  const t = useTranslations("nav");
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`;
  const text = label ?? t("book");
  const content = (
    <>
      <CiCalendar className="text-[1.25em] shrink-0" aria-hidden />
      {text}
    </>
  );
  return BOOKING_URL ? (
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
  ) : (
    <SectionLink href="/contact" section="agenda" className={cls}>{content}</SectionLink>
  );
}
