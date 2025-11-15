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
        review: ResReview,
        user: ResUser,
        product: ResProduct,
    }

    interface ResReview {
        id: string;
        rating: string;
        title: string;
        desc: string;
        created_at: string;
    }

    interface ResUser {
        id: string;
        name: string;
        avatar: string;y
        username: string;
    }

    interface ResProduct {
        id: string;
        title: string;
        desc: string;
        images: string[];
    }
}