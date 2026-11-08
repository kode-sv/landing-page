import { z } from "zod";

export const SERVICES = ["web", "software", "ai", "consulting", "other"] as const;
export const BUDGETS = ["lt5", "5to15", "15to40", "gt40"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(2).max(120),
  service: z.enum(SERVICES),
  budget: z.enum(BUDGETS).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(4000),
  consent: z.literal(true),
  website: z.string().max(0).optional(), // honeypot
  locale: z.enum(["es", "en"]).optional(),
});
export type LeadInput = z.infer<typeof leadSchema>;
