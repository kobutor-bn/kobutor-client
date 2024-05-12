import React from "react";
import Fixed from "./ProductCard/Fixed.tsx";
import Dynamic from "./ProductCard/Dynamic.tsx";

interface CardProps {
    title: string;
    desc: string;
    imgUrl: string;
    price: number;
    size: 'fixed' | 'dynamic';
}

const Card: React.FC<CardProps> = (props) => {
    const {title, desc, price, imgUrl, size} = props;

    return (
        <>
            {size === 'fixed' ?
                <Fixed title={title} desc={desc} imgUrl={imgUrl} price={price} size={size}/> :
                <Dynamic title={title} desc={desc} imgUrl={imgUrl} price={price} size={size}/>}
        </>
    )
}

export default Card;