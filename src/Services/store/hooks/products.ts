import {useGetProductDetailsQuery, useGetProductsQuery, useLazyGetProductsQuery} from "../apiSlice.ts";

export const useProducts = () => {
    const {data, isLoading, error}
        = useGetProductsQuery('');

    const products = data ? data.items : [];

    return {
        products,
        isLoading,
        error,
    };
};

export const useLazyProducts = () => {
    const [fetchProducts, {data, error, isFetching, isError}]
        = useLazyGetProductsQuery();

    const products = data ? data.items : [];

    return {
        fetchProducts,
        products,
        isFetching,
        error: isError ? error : null,
    };
};

export const useProductDetails = (id: string) => {
    const {data, error, isLoading}
        = useGetProductDetailsQuery(id);

    const product: IProduct.Item = data!;

    return {
        product,
        isLoading,
        error,
    };
}