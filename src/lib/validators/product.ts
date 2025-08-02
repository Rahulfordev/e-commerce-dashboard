import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0.01, "Price must be greater than 0")
  ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid image URL"),
});

export type ProductFormData = z.infer<typeof productSchema>;
