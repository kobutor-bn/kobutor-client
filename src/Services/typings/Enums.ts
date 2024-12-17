const minioURI = import.meta.env.VITE_API_MINIO_BASE;

export const Banner = {
    Large: `http://${minioURI}/kobutor/2024/photo-1587731556938-38755b4803a6.jpg`,
    Small: `http://${minioURI}/kobutor/2024/vlad-bunu-d2Q0ZXnWI_c-unsplash.jpg`,
} as const;

export enum Category {
    WomenBags = 'Women Bags',
    Electronics = 'Electronics',
}

export enum Tag {
    FeaturedThisWeek = 'Featured This Week',
    BestSeller = 'Best Seller',
}