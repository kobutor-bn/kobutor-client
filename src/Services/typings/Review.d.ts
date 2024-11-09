declare namespace IReview {
    interface Item {
        id: string;
        rating: number;
        title: string;
        desc: string;
        created_at: string;
    }

    interface Create {
        user_id: string;
        product_id: string;
        title: string;
        rating: number;
        desc: string;
    }

    interface Response {
        review: {
            id: string;
            rating: string;
            title: string;
            desc: string;
            created_at: string;
        },
        user: {
            id: string;
            name: string;
            username: string;
        },
        product: {
            id: string;
            title: string;
            desc: string;
            images: string[];
        }
    }
}