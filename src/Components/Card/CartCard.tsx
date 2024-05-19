import React from "react";

const CartCard: React.FC<{ item: ICart.Item }> = ({item}) => {
    return (
        <div className="max-w-screen-md mx-auto flex gap-4 border-b-[1px] border-b-gray-400 py-6">
            <div className="">
                <img className="h-20 w-28" src={item.imgUrl} alt=""/>
            </div>
            <div className="flex flex-col max-w-full w-full">
                <div className="flex justify-between">
                    <p className="font-bold">{item.title}</p>
                    <p className="">{item.price}</p>
                </div>
                <div className="text-zinc-500">
                    <p className="max-w-3xl">{item.desc}</p>
                    <p>{item.category}</p>
                    <p>{item.size}</p>
                    <p>{item.quantity}</p>
                </div>
            </div>
        </div>
    )
}

export default CartCard;