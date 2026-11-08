"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { leadSchema, type LeadInput, SERVICES, BUDGETS } from "@/lib/schema";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale() as "es" | "en";
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { budget: "", website: "" },
  });

  async function onSubmit(data: LeadInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, locale }) });
      if (!res.ok) throw new Error();
      setStatus("ok");
      reset();
    } catch { setStatus("error"); }
  }

  if (status === "ok") {
    return (
      <div role="status" className="card p-8 text-center">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-sky/15 text-sky" aria-hidden>✓</span>
        <h3 className="h3">{t("success.title")}</h3>
        <p className="mt-2 text-mist">{t("success.text")}</p>
      </div>
    );
  }

  const err = (k: keyof typeof errors) => errors[k] ? t(`errors.${k as "name"}`) : null;
  const L = ({ id, children }: { id: string; children: React.ReactNode }) => <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white">{children}</label>;
  const E = ({ id, k }: { id: string; k: keyof typeof errors }) => err(k) ? <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-[#ff9a9e]">{err(k)}</p> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card space-y-5 p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div><L id="name">{t("name")}</L>
          <input id="name" autoComplete="name" className="field" aria-invalid={!!errors.name} aria-describedby="name-err" {...register("name")} /><E id="name" k="name" /></div>
        <div><L id="email">{t("email")}</L>
          <input id="email" type="email" autoComplete="email" className="field" aria-invalid={!!errors.email} aria-describedby="email-err" {...register("email")} /><E id="email" k="email" /></div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div><L id="company">{t("company")}</L>
          <input id="company" autoComplete="organization" className="field" aria-invalid={!!errors.company} aria-describedby="company-err" {...register("company")} /><E id="company" k="company" /></div>
        <div><L id="service">{t("service")}</L>
          <select id="service" className="field" defaultValue="" aria-invalid={!!errors.service} aria-describedby="service-err" {...register("service")}>
            <option value="" disabled>{t("servicePlaceholder")}</option>
            {SERVICES.map((s) => <option key={s} value={s}>{t(`services.${s}`)}</option>)}
          </select><E id="service" k="service" /></div>
      </div>
      <div><L id="budget">{t("budget")}</L>
        <select id="budget" className="field" {...register("budget")}>
          <option value="">{t("budgetPlaceholder")}</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{t(`budgets.${b}`)}</option>)}
        </select></div>
      <div><L id="message">{t("message")}</L>
        <textarea id="message" rows={5} className="field resize-y" aria-invalid={!!errors.message} aria-describedby="message-err" {...register("message")} /><E id="message" k="message" /></div>

      {/* Honeypot anti-spam: invisible para personas */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-mist">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[#a6e1fa]" aria-invalid={!!errors.consent} {...register("consent")} />
          <span>{t("consent")} <Link href="/privacy" className="text-sky underline">{t("privacy")}</Link></span>
        </label>
        <E id="consent" k="consent" />
      </div>

      {status === "error" && <p role="alert" className="rounded-lg border border-[#ff7b80]/40 bg-[#ff7b80]/10 p-3 text-sm text-[#ffb3b6]">{t("error")}</p>}
      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full disabled:opacity-60 md:w-auto">
        {isSubmitting ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
