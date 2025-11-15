import sm from "../../assets/vlad-bunu-d2Q0ZXnWI_c-unsplash.jpg";
import lg from "../../assets/clay-banks-fEVaiLwWvlU-unsplash.jpg";

export const Banner = {
    Large: lg,
    Small: sm,
} as const;

export type Banner = typeof Banner[keyof typeof Banner];

export enum Category {
    WomenBags = 'Women Bags',
    Electronics = 'Electronics',
}

export enum Tag {
    FeaturedThisWeek = 'Featured This Week',
    BestSeller = 'Best Seller',
}