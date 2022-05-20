import * as z from "zod";

export const PersonSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.number().optional(),
  pet: z.enum(["dog", "cat"]).optional()
});

export type Person = z.infer<typeof PersonSchema>;
