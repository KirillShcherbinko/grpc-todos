import { EStatus } from "@/types";
import { z } from "zod";

export const todoSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(EStatus),
});

export type TTodoForm = z.infer<typeof todoSchema>;
