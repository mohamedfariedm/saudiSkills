import { z } from "zod";

export const blogSchema = z.object({
  // English fields
  title_en: z.string().min(3, "Title (EN) must be at least 3 characters"),
  description_en: z
    .string()
    .min(10, "Description (EN) must be at least 10 characters"),
  content_en: z.string().min(50, "Content (EN) must be at least 50 characters"),
  slug_en: z.string().min(3, "Slug (EN) must be at least 3 characters"),

  // Arabic fields
  title_ar: z.string().min(3, "Title (AR) must be at least 3 characters"),
  description_ar: z
    .string()
    .min(10, "Description (AR) must be at least 10 characters"),
  content_ar: z.string().min(50, "Content (AR) must be at least 50 characters"),
  slug_ar: z.string().min(3, "Slug (AR) must be at least 3 characters"),

  // Common fields
  status: z.enum(["draft", "published", "archived"]),
  publishDate: z.date().optional(),
  featuredImage: z.instanceof(File).optional(),
  tags: z.array(z.string()).min(1, "Select at least one tag"),
});

export type BlogFormData = z.infer<typeof blogSchema>;
