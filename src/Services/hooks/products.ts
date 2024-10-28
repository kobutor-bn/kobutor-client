// src/hooks/useTagData.ts
// import { useGetTagByIdQuery, useGetTagByTitleQuery } from '../services/api/tagApiSlice';
import {useGetProductDetailsQuery, useGetProductsQuery, useLazyGetProductsQuery} from "../store/apiSlice.ts";

export const useProducts = () => {
    const { data, error, isLoading }
        = useGetProductsQuery('');

    const products = data ? data.items : [];

    return {
        data,
        products,
        isLoading,
        error,
    };
};

export const useProductDetails = (id: string) => {
    const { data, error, isLoading }
        = useGetProductDetailsQuery(id);

    return {
        data,
        isLoading,
        error,
    };
}

export const useProductsCategory = () => {
    const [fetchProducts, { data, error, isFetching, isError }]
        = useLazyGetProductsQuery();

    const categoryProducts = data ? data.items : [];

    return {
        fetchProducts,
        categoryProducts,
        isFetching,
        error: isError ? error : null,
    };
};
// export const useTagById = (id: string) => {
//     const { data, error, isLoading } = useGetTaggedProductsQuery(id);
//
//     // Add additional logic if needed (e.g., transform data)
//     return {
//         data,
//         isLoading,
//         error,
//     };

// };