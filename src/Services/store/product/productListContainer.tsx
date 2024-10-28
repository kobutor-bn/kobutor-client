// src/features/Product/ProductListContainer.tsx
import React from 'react';
import ProductList from './productList';
import {useGetProductsQuery} from "../apiSlice.ts";
import {CgSpinner} from "react-icons/cg";

const ProductListContainer: React.FC = () => {
    const {
        data: products = [],
        isLoading,
        isError,
        error
    } = useGetProductsQuery('');

    if (isLoading) return <CgSpinner title="Loading Products" />;
    if (isError) return <div>{error.toString()}</div>;

    return <ProductList products={products} />;
};

export default ProductListContainer;