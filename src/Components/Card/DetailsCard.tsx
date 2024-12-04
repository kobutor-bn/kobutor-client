import React, {useEffect, useState} from 'react';
import Button from '../Button';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import LazyImage from '../../Services/lazy/lazyImage';
import {useCategoryMap} from './CategoryMap.tsx';
import {userSelector} from '../../Services/store/slices/auth.ts';
import {useAddFavorite, useFavorites, useRemoveFavorite} from '../../Services/store/hooks/favorites.ts';
import './CartCard.css';
import {useAddToCart} from "../../Services/store/hooks/cart.ts";
import {cartSelector} from "../../Services/store/slices/cart.ts";
import {Category} from "../../Services/typings/Enums.ts";
import {setItem} from "../../Services/store/slices/order.ts";

interface DetailsCardProps {
    item: IProduct.Item;
    category: string;
}

const DetailsCard: React.FC<DetailsCardProps> = (props) => {
    const {item, category} = props;
    const dispatch = useDispatch();
    const {selectedColor, selectedImage, renderAttrByCategory, renderImagesByCategory} = useCategoryMap({item});
    const user = useSelector(userSelector);
    const cart = useSelector(cartSelector);
    const [qty, setQty] = useState(1);

    const {products} = useFavorites();
    const {addFav} = useAddFavorite();
    const {removeFav} = useRemoveFavorite();
    const [isFavorited, setIsFavorited] = useState(false);
    const {addToCart, isLoading: addCartLoading} = useAddToCart();

    useEffect(() => {
        const isProductFavorited = products.some((product: IProduct.Item) => product.id === item.id);
        setIsFavorited(isProductFavorited);
    }, [products, item.id]);

    const handleFavoriteClick = () => {
        if (isFavorited) {
            removeFav(item.id);
            setIsFavorited(false);
        } else {
            addFav(item.id);
            setIsFavorited(true);
        }
    };

    const handleAddToBag = (product: IProduct.FinalProduct, e: React.MouseEvent) => {
        const updatedProduct = {...product, product_id: product.id, quantity: qty};

        switch (item.category) {
            case Category.WomenBags:
                updatedProduct.image = selectedImage!;
                updatedProduct.color = selectedColor!; // Add selected color
                console.log(updatedProduct);
                addToCart({
                    id: cart!.id,
                    item: updatedProduct,
                })
                    .then(() => {
                        createPlusOneAnimation(e);
                    });
                break;

            case Category.Electronics:
                updatedProduct.image = product.images[0];
                console.log(updatedProduct);
                addToCart({
                    id: cart!.id,
                    item: updatedProduct,
                })
                    .then(() => {
                        createPlusOneAnimation(e);
                    });
                break;
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
            const endX = bagIcon.left - e.clientX + bagIcon.width / 2;
            const endY = bagIcon.top - e.clientY + bagIcon.height / 2;
            plusOne.style.setProperty('--endX', `${endX}px`);
            plusOne.style.setProperty('--endY', `${endY}px`);
            plusOne.addEventListener('animationend', () => {
                document.body.removeChild(plusOne);
            });
        }
    };

    const calcQty = (operand: string) => {
        if (operand === '+') setQty((prevQty) => prevQty + 1);
        if (operand === '-' && qty > 1) setQty((prevQty) => prevQty - 1);
    };

    useEffect(() => {
        const p: IProduct.Item = {
            ...item,
            quantity: qty,
        };

        dispatch(
            setItem({
                user_id: user!.id,
                products: [p],
            })
        );
    }, []);

    return (
        <div className="max-w-screen-2xl mx-auto bg-white border-black overflow-hidden">
            <div className="md:flex">
                <div className="flex flex-col w-fit">
                    {selectedImage ? (
                        <LazyImage className="object-fill" src={selectedImage} alt={item.title}/>
                    ) : (
                        <div className="h-52 w-52 bg-gray-200 flex items-center justify-center">No Image</div>
                    )}
                    <div className="flex overflow-x-scroll gap-3 py-5">{renderImagesByCategory(category)}</div>
                </div>
                <div className="py-8 md:px-8 relative">
                    {/* Heart Button */}
                    <button
                        onClick={handleFavoriteClick}
                        className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md transition ${
                            isFavorited ? 'text-rose-500' : 'text-gray-400'
                        } hover:text-rose-500`}
                        aria-label="Add to favorites"
                    >
                        {isFavorited ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.35l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        )}
                    </button>

                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-montserrat font-semibold">
                        {item.category}
                    </div>
                    <a
                        href="#"
                        className="block mt-1 text-lg leading-tight font-montserrat font-semibold text-black hover:underline"
                    >
                        {item.title}
                    </a>
                    <p className="font-Nunito font-light mt-2 text-slate-500">{item.desc}</p>
                    <div className="md:flex-none items-center justify-between">
                        <p className="font-montserrat text-rose-500 font-semibold">${item.price}</p>
                        <div className="flex flex-col py-4 gap-3">
                            <div className="flex gap-3">{renderAttrByCategory(category)}</div>
                        </div>

                        {/* Improved Quantity Selector */}
                        <div className="font-montserrat flex flex-col py-4 gap-3">
                            <div
                                className="flex items-center justify-center gap-5 bg-gray-100 py-2 px-4 rounded-full shadow-md w-fit mx-auto">
                                <button
                                    onClick={() => calcQty('-')}
                                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full transition-all"
                                >
                                    -
                                </button>
                                <span className="text-lg font-semibold text-black">{qty}</span>
                                <button
                                    onClick={() => calcQty('+')}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition-all"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <p className="font-Nunito underline pt-3">Size Guide</p>
                        {user && (
                            <div className="flex flex-col gap-3 py-4">
                                <Button
                                    onClick={(e) => handleAddToBag(item, e)}
                                    text="Add to Bag"
                                    size="large"
                                    color="primary"
                                    isLoading={addCartLoading}
                                />
                                <Link to={'/order/summary'}>
                                    <Button
                                        text="Buy now"
                                        size="large"
                                        color="primary"
                                    />
                                </Link>
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