import { z } from "zod";

const projectStatusEnum = z.enum(["draft", "active", "completed", "archived"]);

export const createProjectSchema = z.object({
  client_id: z.string().uuid(),
  name: z.string().trim().min(1).max(150),
  description: z.string().trim().max(2000).optional(),
  status: projectStatusEnum.default("draft"),
  value: z.number().nonnegative().default(0),
  currency: z.string().trim().min(3).max(3).default("IDR"),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
