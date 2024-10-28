// src/features/Product/ProductDetails.tsx
import React from 'react';
import DetailsCard from '../../../Components/Card/DetailsCard';
import NormalSlider from '../../../Components/Slider/NormalSlider/NormalSlider';

interface ProductDetailsProps {
    product: IProduct.Item;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => (
    <div className="max-w-screen-2xl mx-auto flex flex-col gap-3 p-4 pt-20">
        <DetailsCard item={product} />
        <div className="font-montserrat font-semibold pt-8">
            <NormalSlider title="Recently Viewed" slide={undefined} />
        </div>
    </div>
);

export default ProductDetails;