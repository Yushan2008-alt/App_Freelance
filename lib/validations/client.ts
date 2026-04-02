import { z } from "zod";

const clientStatusEnum = z.enum(["active", "inactive"]);

export const createClientSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).optional(),
  phone: z.string().trim().max(50).optional(),
  company: z.string().trim().max(120).optional(),
  address: z.string().trim().max(400).optional(),
  country: z.string().trim().max(120).optional(),
  currency: z.string().trim().min(3).max(3).default("IDR"),
  notes: z.string().trim().max(2000).optional(),
  status: clientStatusEnum.default("active"),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
