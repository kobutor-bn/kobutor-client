import React, {useEffect, useState} from 'react';
import Button from '../Button';
import {useDispatch, useSelector} from 'react-redux';
import {AddToBag} from '../../Pages/Cart/Cart';
import {addFavorite, removeFavorite} from '../../Services/store/slices/user';
import {RootState} from '../../Services/store';
import './CartCard.css';
import Modal from "../Popup/Modal";
import {toggleModal} from "../../Services/store/slices/modal";
import ModalContent from "../Popup/Modal/ModalContent";
import LoginPrompt from "../Popup/Modal/LoginPrompt";
import LazyImage from "../../Services/lazy/lazyImage.tsx";

const DetailsCard: React.FC<{ item: IProduct.Item }> = ({item}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.user?.favorites);
    const [isFavorite, setIsFavorite] = useState(favorites?.some(fav => fav.id === item.id));
    const [selectedColor, setSelectedColor] = useState<IProduct.Color | undefined>(undefined);
    const [selectedImage, setSelectedImage] = useState<IProduct.Image | undefined>(undefined);
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (item.colors && item.colors.length > 0) {
            const initialSelectedColor = item.colors[0];
            setSelectedColor(initialSelectedColor);
            setSelectedImage(initialSelectedColor.images[0]);
        }
        setIsFavorite(favorites?.some(fav => fav.id === item.id));
    }, [favorites, item]);

    const handleFavoriteClick = () => {
        if (isFavorite) {
            dispatch(removeFavorite(item.id));
        } else {
            dispatch(addFavorite(item));
        }
    };

    const handleAddToBag = (e: React.MouseEvent) => {
        dispatch(AddToBag(item));
        createPlusOneAnimation(e);
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

    const handleImageClick = (img: IProduct.Image) => {
        setSelectedImage(img);
    };

    const handleColorClick = (color: IProduct.Color) => {
        setSelectedColor(color);
        setSelectedImage(color.images[0]);
    };

    return (
        <div className="max-w-screen-2xl mx-auto bg-white border-black overflow-hidden">
            <div className="md:flex">
                <div className="flex flex-col w-fit md:w-3/5">
                    {selectedImage ? (
                        <LazyImage className="object-fill" src={selectedImage.imgUrl} alt={item.title}/>
                    ) : (
                        <div className="h-52 w-52 bg-gray-200 flex items-center justify-center">
                            No Image
                        </div>
                    )}
                    <div className="flex overflow-x-scroll gap-3 py-5">
                        {selectedColor?.images.map((img, i) => (
                            <LazyImage
                                src={img.imgUrl}
                                key={i}
                                onClick={() => handleImageClick(img)}
                                className={`border border-black h-52 w-52 cursor-pointer hover:brightness-90 ${selectedImage === img ? 'border-red-500 border-4' : ''}`}
                                alt={item.title}/>
                        ))}
                    </div>
                </div>
                <div className="py-8 md:px-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Furniture</div>
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                        {item.title}
                    </a>
                    <p className="mt-2 text-slate-500">{item.desc}</p>
                    <div className="md:flex-none items-center justify-between">
                        <p className="text-rose-500 font-bold">${item.price}</p>
                        <div className="flex flex-col py-4 gap-3">
                            <p className="font-bold">Color: Black</p>
                            <div className="flex gap-3">
                                {item.colors.map((color, i) => (
                                    <div
                                        key={i}
                                        className={`h-6 w-6 p-0.5 bg-clip-content cursor-pointer rounded-full border-2 ${selectedColor === color ? 'border-red-600' : 'border-black'}`}
                                        style={{backgroundColor: color.color}}
                                        onClick={() => handleColorClick(color)}
                                    >
                                    </div>
                                ))}
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
                        {user !== null ?
                            <div className="flex flex-col gap-3 py-4">
                                <Button onClick={handleAddToBag} text="Add to Bag" size="large" color="primary"/>
                                <Button
                                    onClick={handleFavoriteClick}
                                    text={isFavorite ? '♥ Favorite' : '♡ Favorite'}
                                    size="large"
                                    color="secondary"
                                    style={{
                                        borderColor: 'gray',
                                        color: isFavorite ? 'red' : 'black',
                                    }}
                                />
                            </div>
                            :
                            <div className="flex flex-col gap-3 py-4">
                                <Modal
                                    trigger={<Button text="Add to Bag" size="large" color="primary"
                                                     onClick={() => dispatch(toggleModal())}/>}
                                    body={<ModalContent content={<LoginPrompt/>}/>}/>
                                <Modal
                                    trigger={<Button
                                        onClick={() => dispatch(toggleModal())}
                                        text={isFavorite ? '♥ Favorite' : '♡ Favorite'}
                                        size="large"
                                        color="secondary"
                                        style={{
                                            borderColor: 'gray',
                                            color: isFavorite ? 'red' : 'black',
                                        }}
                                    />}
                                    body={<ModalContent content={<LoginPrompt/>}/>}/>

                            </div>
                        }

                        <p className="underline">View Product Details</p>
                        <ul className="list-disc px-5 text-lg py-3">
                            <li>Color Shown: Black</li>
                            <li>Model: Something</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsCard;