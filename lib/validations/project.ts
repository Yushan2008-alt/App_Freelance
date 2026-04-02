import { z } from "zod";

const projectStatusEnum = z.enum(["draft", "active", "completed", "archived"]);
const isoDateString = z
  .string()
  .date()
  .transform((value) => value.split("T")[0] ?? value);

export const createProjectSchema = z.object({
  client_id: z.string().uuid(),
  name: z.string().trim().min(1).max(150),
  description: z.string().trim().max(2000).optional(),
  status: projectStatusEnum.default("draft"),
  value: z.number().nonnegative().default(0),
  currency: z.string().trim().min(3).max(3).default("IDR"),
  start_date: isoDateString.optional(),
  deadline: isoDateString.optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
