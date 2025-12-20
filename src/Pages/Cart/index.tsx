import CartCard from "../../Components/Card/CartCard.tsx";
import Button from "../../Components/Button.tsx";
import {HiOutlineTruck, HiOutlineShieldCheck, HiOutlineTag} from "react-icons/hi";
import {Link} from "react-router-dom";
import TagSlider from "../../Components/TagSlider";
import {useCart} from "../../Services/store/hooks/cart.ts";
import Loading from "../../Components/Loading";
import Error from "../Error.tsx";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../Services/store/slices/auth.ts";
import {useEffect} from "react";
import {setItem} from "../../Services/store/slices/order.ts";

function Cart() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const {cart, isLoading, error} = useCart(user!.id);
    const totalAmount = cart!.items!.reduce((sum: number, product: ICart.Product) => sum + product.price * product.quantity, 0);
    const shippingCost = totalAmount >= 50 ? 0 : 4.99;
    const finalTotal = totalAmount + shippingCost;

    useEffect(() => {
        if (cart?.items) {
            dispatch(
                setItem({
                    total_amount: finalTotal,
                    user_id: user!.id,
                    products: cart!.items!.map((product: ICart.Product) => ({...product})),
                })
            );
        }
    }, [finalTotal, cart?.items]);

    if (isLoading) return <Loading/>;
    if (error) return <Error error={error}/>;

    // Empty Cart State
    if (!cart?.items || cart.quantity === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gray-50">
                <div className="text-center space-y-6 max-w-md">
                    <div className="text-gray-300 mb-8">
                        <svg className="mx-auto h-32 w-32 2xl:h-40 2xl:w-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                        </svg>
                    </div>
                    <h2 className="font-montserrat text-3xl md:text-4xl 2xl:text-6xl font-bold text-gray-900">Your cart is empty</h2>
                    <p className="font-Nunito text-gray-600 text-base md:text-lg 2xl:text-2xl">Looks like you haven't added anything yet</p>
                    <Link to="/product/listing">
                        <Button
                            text="Start Shopping"
                            color="primary"
                            shape="circle"
                            className="!px-8 !py-4 2xl:!px-12 2xl:!py-6 !text-base 2xl:!text-2xl mt-6"
                        />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="font-Nunito bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-8 2xl:py-12">
                    <h1 className="font-montserrat text-center text-3xl md:text-5xl 2xl:text-7xl font-bold text-gray-900 mb-3">
                        Shopping Cart
                    </h1>
                    <p className="text-center text-base md:text-lg 2xl:text-2xl text-gray-600">
                        {cart.quantity} {cart.quantity === 1 ? 'item' : 'items'} • €{totalAmount.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-8 2xl:py-12 pb-32 lg:pb-12">
                <div className="lg:flex lg:gap-8 space-y-8 lg:space-y-0">
                    {/* Cart Items Column */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                            <div className="p-6 2xl:p-8 border-b border-gray-200">
                                <h2 className="font-montserrat text-2xl 2xl:text-4xl font-bold text-gray-900">
                                    Cart Items ({cart.quantity})
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {cart.items?.map((product: ICart.Product, i) => (
                                    <CartCard key={i} item={product}/>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Column */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-md p-6 2xl:p-8 sticky top-[220px] space-y-6">
                            <h2 className="font-montserrat text-2xl 2xl:text-4xl font-bold text-gray-900">
                                Order Summary
                            </h2>

                            {/* Price Breakdown */}
                            <div className="space-y-4 py-4">
                                <div className="flex justify-between text-base 2xl:text-xl">
                                    <span className="text-gray-600">Subtotal ({cart.quantity} items)</span>
                                    <span className="font-semibold">€{totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base 2xl:text-xl">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">
                                        {shippingCost === 0 ? (
                                            <span className="text-green-600">FREE</span>
                                        ) : (
                                            `€${shippingCost.toFixed(2)}`
                                        )}
                                    </span>
                                </div>

                                {/* Free Shipping Progress */}
                                {totalAmount < 50 && (
                                    <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                                        <div className="flex items-center gap-2 text-sm 2xl:text-lg text-blue-700">
                                            <HiOutlineTruck className="h-5 w-5 2xl:h-7 2xl:w-7"/>
                                            <span className="font-semibold">
                                                Add €{(50 - totalAmount).toFixed(2)} more for FREE shipping!
                                            </span>
                                        </div>
                                        <div className="w-full bg-blue-200 rounded-full h-2 2xl:h-3">
                                            <div
                                                className="bg-blue-600 h-2 2xl:h-3 rounded-full transition-all duration-300"
                                                style={{width: `${(totalAmount / 50) * 100}%`}}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-xl 2xl:text-3xl font-bold">
                                        <span>Total</span>
                                        <span className="text-blue-600">€{finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="flex flex-col gap-4">
                                <div className="space-y-3">
                                    <button
                                        className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm 2xl:text-lg">
                                        <HiOutlineTag className="h-5 w-5"/>
                                        <span>Add promo code</span>
                                    </button>
                                </div>

                                {/* Checkout Button */}
                                <Link to="/order/summary">
                                    <Button
                                        text="Proceed to Checkout"
                                        color="primary"
                                        shape="circle"
                                        className="w-full !py-4 2xl:!py-6 !text-base 2xl:!text-2xl font-bold shadow-lg hover:shadow-xl transition-all"
                                    />
                                </Link>
                            </div>


                            {/* Trust Badges */}
                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-3 text-sm 2xl:text-lg text-gray-600">
                                    <HiOutlineShieldCheck
                                        className="h-6 w-6 2xl:h-8 2xl:w-8 text-green-600 flex-shrink-0"/>
                                    <span>Secure SSL encrypted checkout</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm 2xl:text-lg text-gray-600">
                                    <HiOutlineTruck className="h-6 w-6 2xl:h-8 2xl:w-8 text-blue-600 flex-shrink-0"/>
                                    <span>Free EU shipping on orders over €50</span>
                                </div>
                            </div>

                            {/* Continue Shopping */}
                            <Link to="/product/listing">
                                <button className="w-full text-center text-blue-600 hover:text-blue-700 font-semibold text-sm 2xl:text-lg py-3">
                                    ← Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Fixed Checkout Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-2xl z-50">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-2xl font-bold text-gray-900">€{finalTotal.toFixed(2)}</p>
                    </div>
                    <Link to="/order/summary" className="flex-1 ml-4">
                        <Button
                            text="Checkout"
                            color="primary"
                            shape="circle"
                            className="w-full !py-4 !text-lg font-bold"
                        />
                    </Link>
                </div>
            </div>

            {/* Recently Viewed Section */}
            {user && (
                <div className="max-w-screen-2xl mx-auto px-4 md:px-6 pb-16 2xl:pb-24">
                    <TagSlider title="You May Also Like" id="cs1ict7q4o9j8k43gqcg"/>
                </div>
            )}
        </div>
    );
}

export default Cart;