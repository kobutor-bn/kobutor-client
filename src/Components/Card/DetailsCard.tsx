import React from 'react';
import Button from '../Button';
import {useDispatch, useSelector} from 'react-redux';
import {AddToBag} from '../../Services/store/slices/Cart';
import {userSelector} from '../../Services/store/slices/user';
import './CartCard.css';
import Modal from "../Popup/Modal";
import {toggleModal} from "../../Services/store/slices/modal";
import ModalContent from "../Popup/Modal/ModalContent";
import LoginPrompt from "../Popup/Modal/LoginPrompt";
import LazyImage from "../../Services/lazy/lazyImage";
import {useCategoryMap} from "./CategoryMap.tsx";

interface DetailsCardProps {
    item: IProduct.Item;
    category: string;
}

const DetailsCard: React.FC<DetailsCardProps> = (props) => {
    const { item, category } = props;

    const dispatch = useDispatch();
    const { selectedColor, selectedImage, renderAttrByCategory, renderImagesByCategory } = useCategoryMap({ item });
    const user = useSelector(userSelector);

    const handleAddToBag = (e: React.MouseEvent) => {
        if (selectedColor) {
            dispatch(AddToBag({item, selectedColor: selectedColor}));
            createPlusOneAnimation(e);
        }
    };

    const createPlusOneAnimation = (e: React.MouseEvent) => {
        const bagIcon = document.querySelector('.bag-icon')?.getBoundingClientRect();
        if (bagIcon) {
            const plusOne = document.createElement('div');
            plusOne.textContent = '+1';
            plusOne.className = 'plus-one';
            plusOne.style.top = `${e.clientY}px`;
            plusOne.style.left = `${e.clientX}px`;
            document.body.appendChild(plusOne);
            const endX = bagIcon.left - e.clientX + (bagIcon.width / 2);
            const endY = bagIcon.top - e.clientY + (bagIcon.height / 2);
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
                <div className="flex flex-col w-fit">
                    {selectedImage ? (
                        <LazyImage className="object-fill" src={selectedImage} alt={item.title}/>
                    ) : (
                        <div className="h-52 w-52 bg-gray-200 flex items-center justify-center">
                            No Image
                        </div>
                    )}
                    <div className="flex overflow-x-scroll gap-3 py-5">
                        {renderImagesByCategory(category)}
                    </div>
                </div>
                <div className="py-8 md:px-8">
                    <div
                        className="uppercase tracking-wide text-sm text-indigo-500 font-montserrat font-semibold">{item.category}</div>
                    <a href="#"
                       className="block mt-1 text-lg leading-tight font-montserrat font-semibold text-black hover:underline">
                        {item.title}
                    </a>
                    <p className="font-Nunito font-light mt-2 text-slate-500">{item.desc}</p>
                    <div className="md:flex-none items-center justify-between">
                        <p className="font-montserrat text-rose-500 font-semibold">${item.price}</p>
                        <div className="flex flex-col py-4 gap-3">
                            <p className="font-bold">Color: {selectedColor}</p>
                            <div className="flex gap-3">
                                {renderAttrByCategory(category)}
                            </div>
                        </div>
                        <div className="font-montserrat flex flex-col py-4 gap-3">
                            <p className="font-bold">Size: Any</p>
                            <div className="flex gap-3">
                                <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">S</div>
                                <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">M</div>
                                <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">LG</div>
                                <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">XL</div>
                            </div>
                        </div>
                        <p className="font-Nunito underline pt-3">Size Guide</p>
                        {user ? (
                            <div className="flex flex-col gap-3 py-4">
                                <Button onClick={handleAddToBag} text="Add to Bag" size="large" color="primary"/>
                                <Button
                                    // onClick={handleFavoriteClick}
                                    // text={isFavorite ? '♥ Favorite' : '♡ Favorite'}
                                    text='♥ Favorite'
                                    size="large"
                                    color="secondary"
                                    style={{
                                        borderColor: 'gray',
                                        // color: isFavorite ? 'red' : 'black',
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 py-4">
                                <Modal
                                    trigger={<Button text="Add to Bag" size="large" color="primary"
                                                     onClick={() => dispatch(toggleModal())}/>}
                                    body={<ModalContent content={<LoginPrompt/>}/>}
                                />
                                <Modal
                                    trigger={<Button
                                        onClick={() => dispatch(toggleModal())}
                                        // text={isFavorite ? '♥ Favorite' : '♡ Favorite'}
                                        text="♥ Favorite"
                                        size="large"
                                        color="secondary"
                                        style={{
                                            borderColor: 'gray',
                                            // color: isFavorite ? 'red' : 'black',
                                        }}
                                    />}
                                    body={<ModalContent content={<LoginPrompt/>}/>}
                                />
                            </div>
                        )}
                        <p className="font-Nunito underline">View Product Details</p>
                        <ul className="font-Nunito list-disc px-5 text-lg py-3">
                            <li>Color Shown: {selectedColor}</li>
                            <li>Model: Something</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;