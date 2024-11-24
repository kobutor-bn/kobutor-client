import CartCard from "../../Components/Card/CartCard.tsx";
import Button from "../../Components/Button.tsx";
import {BsTruck} from "react-icons/bs";
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

    useEffect(() => {
        dispatch(
            setItem({
                total_amount: totalAmount,
                user_id: user!.id,
                products: cart!.items!.map((product: ICart.Product) => ({...product})),
            })
        );
    }, []);

    if (isLoading) return <Loading/>;
    if (error) return <Error error={error}/>;

    if (!(cart!.items)) return <div>There is no Item in your cart!</div>

    return (
        <>
            <div className="font-Nunito relative">
                <div className="pb-32 lg:py-20">
                    {cart!.quantity === 0 ? (
                        <p className="mx-auto text-center text-2xl font-bold p-5 py-20">Cart is Empty!</p>
                    ) : (
                        <div className="lg:flex lg:mx-auto max-w-5xl p-5 space-y-6 lg:space-y-0 lg:space-x-8">
                            <div className="w-full lg:w-2/3">
                                <div className="max-w-screen-md mx-auto border-b-[1px] border-gray-300 my-6 pb-6">
                                    <p className="font-montserrat text-center text-3xl font-bold">Cart</p>
                                    <p className="font-montserrat lg:hidden text-center text-lg font-semibold text-rose-500 tracking-widest mt-2">
                                        {cart!.quantity} Items | USD {cart!.price.toFixed(2)}
                                    </p>
                                </div>
                                {cart!.items?.map((product: ICart.Product, i) => (
                                    <CartCard
                                        key={i}
                                        item={product}
                                    />
                                ))}
                            </div>

                            <div className="w-full lg:w-1/3 max-w-screen-md mx-auto flex flex-col gap-6 pt-16 lg:py-6">
                                <p className="font-montserrat text-3xl font-semibold">Summary</p>
                                <div className="flex justify-between border-b-[1px] border-gray-300 gap-3 py-3">
                                    <p className="text-lg font-semibold">Subtotal ({cart!.quantity} Items)</p>
                                    <p className="text-lg font-semibold">USD {cart!.price.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between border-b-[1px] border-gray-300 gap-3 py-3">
                                    <p className="text-2xl font-bold">Total</p>
                                    <p className="text-lg font-semibold">USD {cart!.price.toFixed(2)}</p>
                                </div>
                                <div className="font-Nunito font-light flex items-center gap-5 py-4">
                                    <BsTruck className="h-9 w-9 md:h-6 md:w-6 text-gray-500"/>
                                    <p className="text-gray-600">Delivery fee (if applicable) will be calculated at
                                        checkout.</p>
                                </div>
                                <Link to={'/order/summary'}>
                                    <Button
                                        className="hidden lg:flex justify-center"
                                        text="Checkout"
                                        color="primary"
                                        shape="circle"></Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {user ?
                        <></> :
                        <div className="lg:flex lg:mx-auto max-w-5xl p-5 flex flex-col gap-4 my-11">
                            <p className="text-2xl font-bold">Favorites</p>
                            <p className="flex gap-2">
                                Want to view your favorites?
                                <Link to={'/register'}>
                                    <span className="underline text-blue-600">Join us</span>
                                </Link>
                                or
                                <Link to={'/account/login'}>
                                    <span className="underline text-blue-600">Sign in</span>
                                </Link>
                            </p>
                        </div>
                    }

                </div>
                <div
                    className="lg:hidden z-10 fixed flex justify-center bg-white w-full py-4 bottom-0 border-t border-black text-center">
                    <Link to={'/order/summary'}>
                        <Button
                            text="Checkout"
                            color="primary"
                            shape="circle"></Button>
                    </Link>
                </div>
                {user ?
                    <div className="font-montserrat font-semibold pt-8">
                        <TagSlider title={"Recently Viewed"}></TagSlider>
                    </div>
                    :
                    <div></div>
                }
            </div>
        </>

    );
}

export default Cart;