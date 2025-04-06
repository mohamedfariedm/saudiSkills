import { z } from "zod";

export const userSchema = z.object({
  // Personal Section
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),

  // Role Section
  role: z.enum(["user", "admin", "editor"]),
  bio: z.string().min(10, "Bio must be at least 10 characters"),

  // Media Section
  images: z.array(z.instanceof(File)),

  // Frameworks Section
  frameworks: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .min(1, "Select at least one framework"),
});

export type UserFormData = z.infer<typeof userSchema>;
