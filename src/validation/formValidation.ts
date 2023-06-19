import { z } from "zod";

export const writeFormSchema = z.object({
  title: z.string().min(20),
  description: z.string().min(60),
  text: z.string().min(100),
});

export const createTagSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});
