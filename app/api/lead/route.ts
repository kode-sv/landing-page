import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/schema";

// Rate limit en memoria (por instancia). Para producción usar Upstash/Vercel KV.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });

  // Honeypot lleno => bot; respondemos OK sin procesar.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { consent: _c, website: _w, ...lead } = parsed.data;
  const payload = { ...lead, source: "kode-sv.com", receivedAt: new Date().toISOString() };

  // Notificación por correo (Resend)
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  let delivered = false;
  if (key && to) {
    const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
    const rows = Object.entries(payload).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${esc(k)}</b></td><td>${esc(String(v ?? "—"))}</td></tr>`).join("");
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? "Kode SV <onboarding@resend.dev>",
          to: to.split(",").map((x) => x.trim()),
          reply_to: lead.email,
          subject: `Nuevo lead: ${lead.name} (${lead.company})`,
          html: `<table>${rows}</table>`,
        }),
      });
      if (!res.ok) throw new Error(`resend ${res.status}`);
      delivered = true;
    } catch (e) {
      console.error("[lead] resend failed", e);
    }
  }

  // Destino del lead: Kode SV Admin / CRM / Zapier / Make vía webhook.
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(process.env.LEAD_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : {}) },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      delivered = true;
    } catch (e) {
      console.error("[lead] webhook failed", e);
    }
  }
  if (!delivered) {
    if (key || hook) return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    console.log("[lead] (sin destino configurado) nuevo prospecto:", payload);
  }
  return NextResponse.json({ ok: true });
}
