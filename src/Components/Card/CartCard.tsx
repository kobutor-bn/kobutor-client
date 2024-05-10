import React from "react";

interface CardProps {
    title: string;
    desc: string;
    imgUrl: string;
    price: number;
    category: string;
    size: string;
    quantity: number;
    // children: React.ReactNode;
}

const CartCard: React.FC<CardProps> = (props) => {
    const {title, desc, price, imgUrl, category, quantity, size} = props;

    return (
        <div className="max-w-screen-md mx-auto flex gap-4 border-b-[1px] border-b-gray-400 py-6">
            <div className="">
                <img className="h-20 w-28" src={imgUrl} alt=""/>
            </div>
            <div className="flex flex-col max-w-full w-full">
                <div className="flex justify-between">
                    <p className="font-bold">{title}</p>
                    <p className="">{price}</p>
                </div>
                <div className="text-zinc-500">
                    <p className="max-w-3xl">{desc}</p>
                    <p>{category}</p>
                    <p>{size}</p>
                    <p>{quantity}</p>
                </div>
            </div>
        </div>
    )
}

export default CartCard;