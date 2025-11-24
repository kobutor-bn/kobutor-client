import React, {useState} from "react";
import {Link} from "react-router-dom";
import Modal from "../Popup/Modal";
import {HiOutlineTrash} from "react-icons/hi";
import {useSelector} from "react-redux";
import {useAddToCart, useDecreaseFromCart, useRemoveFromCart} from "../../Services/store/hooks/cart.ts";
import {cartSelector} from "../../Services/store/slices/cart.ts";
import Confirm from "../Popup/Modal/Confirm.tsx";
import LazyImage from "../../Services/lazy/lazyImage.tsx";
import {Category} from "../../Services/typings/Enums.ts";

interface Props {
    item: ICart.Product;
}

const CartCard: React.FC<Props> = ({item}) => {
    const cart = useSelector(cartSelector);
    const {addToCart, isLoading: addLoading} = useAddToCart();
    const {decreaseFromCart, isLoading: decreaseIsLoading} = useDecreaseFromCart();
    const {removeFromCart} = useRemoveFromCart();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const calcQty = async (operand: string) => {
        const updatedItem = {...item, product_id: item.product_id, quantity: 1};
        try {
            if (operand === "+") {
                await addToCart({id: cart!.id, item: updatedItem});
            } else if (operand === "-" && item.quantity! > 0) {
                await decreaseFromCart({id: cart!.id, product_id: item.product_id});
            }
        } catch (error) {
            console.error("Cart update failed:", error);
        }
    };

    const renderImgByCategory = () => {
        return (
            <LazyImage
                className="w-full h-full object-cover rounded-lg"
                key={item.product_id}
                src={item.image!}
                alt={item.title}
            />
        );
    };

    return (
        <div className="p-6 2xl:p-8 hover:bg-gray-50 transition-colors">
            <div className="flex gap-6">
                {/* Product Image */}
                <Link
                    to={`/product/details/${item.product_id}`}
                    className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 2xl:w-48 2xl:h-48 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-colors group"
                >
                    <div className="relative w-full h-full">
                        {renderImgByCategory()}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                    {/* Top Section: Title, Category, Price */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                            <Link to={`/product/details/${item.product_id}`} className="flex-1 min-w-0">
                                <h3 className="font-montserrat text-base md:text-lg 2xl:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                            </Link>
                            <p className="text-lg md:text-xl 2xl:text-3xl font-bold text-gray-900 flex-shrink-0">
                                €{item.price.toFixed(2)}
                            </p>
                        </div>

                        {/* Category Badge */}
                        <div className="flex items-center gap-2">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs 2xl:text-base font-semibold">
                                {item.category}
                            </span>
                            {item.category === Category.WomenBags && item.color && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm 2xl:text-lg text-gray-600">Color:</span>
                                    <div
                                        className="h-6 w-6 2xl:h-8 2xl:w-8 rounded-full border-2 border-gray-300 shadow-sm"
                                        style={{backgroundColor: item.color}}
                                        title={item.color}
                                    ></div>
                                </div>
                            )}
                        </div>

                        {/* Description - Desktop Only */}
                        {item.desc && (
                            <p className="hidden md:block font-Nunito text-sm 2xl:text-lg text-gray-600 line-clamp-2">
                                {item.desc}
                            </p>
                        )}
                    </div>

                    {/* Bottom Section: Quantity Controls & Delete */}
                    <div className="flex items-center justify-between gap-4 mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                            <button
                                disabled={decreaseIsLoading || item.quantity <= 1}
                                onClick={() => calcQty('-')}
                                className={`w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-md bg-white hover:bg-gray-200 text-gray-700 font-bold transition-all shadow-sm ${
                                    (decreaseIsLoading || item.quantity <= 1) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                                }`}
                                aria-label="Decrease quantity"
                            >
                                {decreaseIsLoading ? (
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                ) : (
                                    <span className="text-xl 2xl:text-2xl">−</span>
                                )}
                            </button>

                            <span className="font-montserrat text-lg md:text-xl 2xl:text-2xl font-bold text-gray-900 min-w-[2rem] text-center">
                                {item.quantity}
                            </span>

                            <button
                                disabled={addLoading}
                                onClick={() => calcQty('+')}
                                className={`w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm ${
                                    addLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                                }`}
                                aria-label="Increase quantity"
                            >
                                {addLoading ? (
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                ) : (
                                    <span className="text-xl 2xl:text-2xl">+</span>
                                )}
                            </button>
                        </div>

                        {/* Subtotal & Delete */}
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden md:block">
                                <p className="text-xs 2xl:text-base text-gray-500">Subtotal</p>
                                <p className="text-lg 2xl:text-2xl font-bold text-gray-900">
                                    €{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>

                            <Modal
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                trigger={
                                    <button
                                        className="p-2 2xl:p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        aria-label="Remove item"
                                    >
                                        <HiOutlineTrash className="h-6 w-6 2xl:h-8 2xl:w-8"/>
                                    </button>
                                }
                                body={
                                    <Confirm
                                        setIsOpen={setIsOpen}
                                        mutation={removeFromCart}
                                        mutationParams={{id: cart!.id, product_id: item.product_id}}
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;