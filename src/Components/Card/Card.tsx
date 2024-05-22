import React from "react";
import Button from "../Button.tsx";
import {AppDispatch} from "../../store.ts";
import {useDispatch} from "react-redux";
import {AddToBag} from "../../Pages/Cart/state.ts";

const Card: React.FC<{ item: IProduct.Item }> = ({item}) => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className="max-w-screen-2xl mx-auto bg-white border-black overflow-hidden">
            <div className={`md:flex`}>
                <img className={`object-fill w-fit md:w-3/5`} src={item.imgUrl} alt=""/>
                <div className="py-8 md:px-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Furniture
                    </div>
                    <a href="#"
                       className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                        {item.title}</a>
                    <p className="mt-2 text-slate-500">{item.desc}</p>
                    <div className='md:flex-none items-center justify-between'>
                        <p className="text-rose-500 font-bold">${item.price}</p>
                        <div className="flex flex-col py-4 gap-3">
                            <p className="font-bold">Color: Black</p>
                            <div className="flex gap-3">
                                <div className="h-5 w-5 rounded-full border-2 border-black"></div>
                                <div className="h-5 w-5 rounded-full border-2 border-black"></div>
                            </div>
                        </div>
                        <div className="flex flex-col py-4 gap-3">
                            <p className="font-bold">Size: Black</p>
                            <div className="flex gap-3">
                                <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">S</div>
                                <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">M</div>
                                <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">LG</div>
                                <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">XL</div>
                            </div>
                        </div>
                        <p className="underline pt-3">Size Guide</p>
                        <div className="flex flex-col gap-3 py-4">
                            <Button onClick={() => dispatch(AddToBag(item))} text="Add to Bag" size="large"
                                    color='primary'></Button>
                            <Button text="Favorite ♡" size="large" color='secondary'></Button>
                        </div>
                        <p className="underline">View Product Details</p>
                        <ul className="list-disc px-5 text-lg py-3">
                            <li>Color Shown: Black</li>
                            <li>Model: Something</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;