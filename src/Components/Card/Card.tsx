import React from "react";
import Fixed from "./ProductCard/Fixed.tsx";
import Dynamic from "./ProductCard/Dynamic.tsx";

const Card: React.FC<{ item: IProduct.Item, size: string }> = ({item, size}) => {

    return (
        <>
            {size === 'fixed' ?
                <Fixed item={item} size={size}/> :
                <Dynamic item={item} size={size}/>}
        </>
    )
}

export default Card;