// src/hooks/useTagData.ts
// import { useGetTagByIdQuery, useGetTagByTitleQuery } from '../services/api/tagApiSlice';
import {useGetTaggedProductsQuery} from "../store/apiSlice.ts";

export const useTag = (title: string) => {
    const { data, error, isLoading }
        = useGetTaggedProductsQuery(title || '', {
        skip: !title,
    });

    const products = data ? data.items : [];
    // Add additional logic if needed (e.g., transform data)
    return {
        data,
        products,
        isLoading,
        error,
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