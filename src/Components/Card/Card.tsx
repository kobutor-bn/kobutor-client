import React from "react";
import Button from "../Button.tsx";
import {AppDispatch} from "../../store.ts";
import {useDispatch} from "react-redux";
import {AddToBag} from "../../Pages/Cart/state.ts";
import chair from "../../assets/chair.jpg";

const Card: React.FC<{ item: IProduct.Item }> = ({item}) => {
    const dispatch: AppDispatch = useDispatch();

    const handleAddToBag = (e: React.MouseEvent) => {
        dispatch(AddToBag(item));
        createPlusOneAnimation(e);
    };

    const createPlusOneAnimation = (e: React.MouseEvent) => {
        const button = e.currentTarget;
        const rect = (button as HTMLElement).getBoundingClientRect();
        const bagIcon = document.querySelector('.bag-icon')?.getBoundingClientRect();

        if (bagIcon) {
            const plusOne = document.createElement('div');
            plusOne.textContent = '+1';
            plusOne.className = 'plus-one';
            plusOne.style.top = `${rect.top}px`;
            plusOne.style.left = `${rect.left}px`;
            document.body.appendChild(plusOne);

            const endX = bagIcon.left - rect.left + (bagIcon.width / 2);
            const endY = bagIcon.top - rect.top + (bagIcon.height / 2);

            plusOne.style.setProperty('--endX', `${endX}px`);
            plusOne.style.setProperty('--endY', `${endY}px`);

            plusOne.addEventListener('animationend', () => {
                document.body.removeChild(plusOne);
            });
        }
    };

    return (
        <div className="max-w-screen-2xl mx-auto bg-white border-black overflow-hidden">
            <div className="md:flex">
                <div className="flex flex-col w-fit md:w-3/5">
                    <img className="object-fill" src={item.imgUrl} alt=""/>
                    <div className="flex overflow-x-scroll gap-3 py-5">
                        <img src={chair} className="border border-black h-52 w-52 hover:brightness-90" alt=""/>
                        <img src={chair} className="border border-black h-52 w-52 hover:brightness-90" alt=""/>
                        <img src={chair} className="border border-black h-52 w-52 hover:brightness-90" alt=""/>
                        <img src={chair} className="border border-black h-52 w-52 hover:brightness-90" alt=""/>
                        <img src={chair} className="border border-black h-52 w-52 hover:brightness-90" alt=""/>
                    </div>
                </div>
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
                            <Button onClick={handleAddToBag} text="Add to Bag" size="large"
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