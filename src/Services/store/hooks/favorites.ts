import {useAddFavoriteMutation, useGetFavoritesQuery, useRemoveFavoriteMutation} from "../apiSlice.ts";

export const useFavorites = () => {
    const {data, isLoading, error}
        = useGetFavoritesQuery();

    const products = data ? data : [];

    return {
        products,
        isLoading,
        error,
    };
};

export const useAddFavorite = () => {
    const [addFav, {data, isLoading, error}]
        = useAddFavoriteMutation();

    return {
        addFav,
        data,
        isLoading,
        error,
    };
};

export const useRemoveFavorite = () => {
    const [removeFav, {data, isLoading, error}]
        = useRemoveFavoriteMutation();

    return {
        removeFav,
        data,
        isLoading,
        error,
    };
};