import {z} from "zod";

export const reviewSchema = z.object({
    title: z.string().min(1, "Please enter title").max(100, "Title too long"),
    rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
    desc: z.string().min(10, "Description must be at least 1").max(100, "Description must be at most 100"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});