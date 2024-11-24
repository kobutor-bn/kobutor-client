import {z} from "zod";

export const reviewSchema = z.object({
    title: z.string().min(1, "Please enter title").max(100, "Title too long"),
    rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
    desc: z.string().min(10, "Description must be at least 10 characters long").max(100, "Description must be at most 100"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const userSettingsSchema = z.object({
    name: z.string(),
    username: z.string().min(5, "Username too short!"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    new_password: z.string().min(4),
    email: z.string().email("Invalid email address"),
    phone: z.number().transform(data => Number(data)),
    avatar: z.string().optional(),
    isVerified: z.boolean().optional()
}).superRefine(({new_password, password}, ctx) => {
    if (new_password !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['new_password']
        });
    }
});

export const userInfoSchema = z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
});

export const addrSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    detail: z.string().min(10, {message: "Address detail must be at least 10 characters long."}),
    city: z.string().min(2, {message: "City name must be at least 2 characters long."}),
    postal_code: z
        .string()
        .regex(/^\d{4,10}$/, {message: "Postal code must be between 4 and 10 digits."}),
});

export const createAddrSchema = z.object({
    detail: z.string().min(10, {message: "Address detail must be at least 10 characters long."}),
    city: z.string().min(2, {message: "City name must be at least 2 characters long."}),
    postal_code: z
        .string()
        .regex(/^\d{4,10}$/, {message: "Postal code must be between 4 and 10 digits."}),
})