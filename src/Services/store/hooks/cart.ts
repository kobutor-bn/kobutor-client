import {useGetCartQuery} from "../apiSlice.ts";

export const useCart = (user_id: string) => {
    const { data, isLoading, error }
        = useGetCartQuery(user_id, {
        skip: !user_id,
    });

    const cart = data ? data : null;

    return {
        cart,
        isLoading,
        error,
    };
};