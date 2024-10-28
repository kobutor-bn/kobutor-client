// src/features/Product/ProductList.tsx
import React from 'react';
import ProductDetails from './productDetails';

interface ProductListProps {
    products: IProduct.Item[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
    <section className="products-list">
        <h2>Products</h2>
        {products.map((product) => (
            <ProductDetails key={product.id} product={product} />
        ))}
    </section>
);

export default ProductList;