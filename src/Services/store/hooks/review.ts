import {useAddReviewMutation, useGetReviewDetailsQuery, useGetReviewsQuery} from "../apiSlice.ts";

export const useReviews = () => {
    const {data, isLoading, error}
        = useGetReviewsQuery('');

    const reviews = data ? data.items : [];

    return {
        reviews,
        isLoading,
        error,
    };
};

export const useReviewDetails = (id: string) => {
    const {data, isLoading, error} = useGetReviewDetailsQuery(id);

    const review = data!;

    return {
        review,
        isLoading,
        error,
    };
};

export const useAddReview = () => {
    const [ addReview, { isLoading, error}]
        = useAddReviewMutation();

    return {
        addReview,
        isLoading,
        error,
    };
};