import React, {useState} from "react";
import {Link} from "react-router-dom";
import Modal from "../Popup/Modal";
import {FaTrashAlt} from "react-icons/fa";
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
    // const {addNotification} = useNotification();

    const calcQty = async (operand: string) => {
        const updatedItem = {...item, product_id: item.product_id, quantity: 1};
        try {
            if (operand === "+") {
                item.quantity = 1
                await addToCart({id: cart!.id, item: updatedItem});
                // addNotification("Item added to cart", "success");
            } else if (operand === "-" && item.quantity! > 0) {
                await decreaseFromCart({id: cart!.id, product_id: item.product_id});
                // addNotification("Item removed from cart", "success");
            }
        } catch (error) {
            // addNotification("Action failed", "error");
        }
    };

    const renderImgByCategory = (category: string) => {
        switch (category) {
            case "Electronics":
                return (
                    <LazyImage
                        className="object-fill w-full h-64 md:h-80"
                        key={item.product_id}
                        src={item.image!}
                        alt={item.title}
                    />
                );
            case "Women Bags":
                return (
                    <>
                        <LazyImage
                            className="object-fill w-full h-64 md:h-80"
                            key={item.product_id}
                            src={item.image!}
                            alt={item.title}
                        />
                    </>

                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-screen-md mx-auto flex flex-col md:flex-row gap-4 border-b-[1px] border-b-gray-300 py-6">
            {/* Product Image */}
            <Link
                to={`/item/details/${item.product_id}`}
                className="flex-shrink-0 w-full md:w-1/3 aspect-w-4 aspect-h-3">
                {renderImgByCategory(item.category)}
            </Link>

            {/* Product Details */}
            <div className="flex flex-col justify-between w-full gap-4">
                {/* Product Title and Price */}
                <div className="flex justify-between items-center">
                    <Link to={`/product/details/${item.product_id}`}>
                        <h2 className="font-montserrat text-lg md:text-xl font-bold hover:text-indigo-600 transition">
                            {item.title}
                        </h2>
                    </Link>
                    <p className="text-lg font-semibold text-gray-700">{`$${item.price}`}</p>
                </div>

                {/* Product Description and Category */}
                <div className="flex flex-col gap-1">
                    <p className="font-nunito text-sm md:text-base text-gray-600">{item.desc}</p>
                    <p className="text-indigo-500 font-montserrat font-semibold text-sm md:text-base">
                        {item.category}
                    </p>
                    {item.category === Category.WomenBags && (
                        <div className="flex items-center font-semibold text-rose-500 gap-2">
                            <p>Color: </p>
                            <div
                                className={`h-5 w-5 p-0.5 cursor-pointer rounded-full border-2 border-black`}
                                style={{backgroundColor: item.color}}
                            ></div>
                        </div>
                    )}
                </div>

                {/* Quantity Controls and Trash Icon */}
                <div className="flex justify-between items-center gap-4">
                    {/* Quantity Buttons */}
                    <div className="font-montserrat flex flex-col gap-2">
                        <div
                            className="flex items-center gap-4 bg-gray-100 py-2 px-4 rounded-full shadow-md">
                            <button
                                disabled={decreaseIsLoading}
                                onClick={() => calcQty('-')}
                                className={`bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full transition-all ${
                                    decreaseIsLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                -
                            </button>
                            <span className="text-lg md:text-xl font-semibold text-black">
                        {item.quantity}
                    </span>
                            <button
                                disabled={addLoading}
                                onClick={() => calcQty('+')}
                                className={`bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition-all ${
                                    addLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <Modal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        trigger={
                            <FaTrashAlt
                                className="text-gray-700 hover:text-red-600 text-xl cursor-pointer transition-transform transform hover:scale-110 ml-4"
                            />
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

    )
}

export default CartCard;