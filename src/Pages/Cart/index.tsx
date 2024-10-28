import CartCard from "../../Components/Card/CartCard.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../Services/store";
import Button from "../../Components/Button.tsx";
import {BsTruck} from "react-icons/bs";
import {Link} from "react-router-dom";
import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider.tsx";
import {userSelector} from "../../Services/store/slices/user.ts";

function Cart() {
    const items = useSelector((state: RootState) => state.cart.items);
    const cart = useSelector((state: RootState) => state.cart);
    const user = useSelector(userSelector);

    return (
        <>
            <div className="font-Nunito relative">
                <div className="pb-32 lg:py-20">
                    {cart.qty === 0 ? (
                        <p className="mx-auto text-center text-2xl font-bold p-5 py-20">Cart is Empty!</p>
                    ) : (
                        <div className="lg:flex lg:mx-auto max-w-5xl p-5 space-y-6 lg:space-y-0 lg:space-x-8">
                            <div className="w-full lg:w-2/3">
                                <div className="max-w-screen-md mx-auto border-b-[1px] border-gray-300 my-6 pb-6">
                                    <p className="font-montserrat text-center text-3xl font-bold">Cart</p>
                                    <p className="font-montserrat lg:hidden text-center text-lg font-semibold text-rose-500 tracking-widest mt-2">
                                        {cart.qty} Items | USD {cart.price.toFixed(2)}
                                    </p>
                                </div>
                                {items.map((item: ICart.Item, i) => (
                                    <CartCard item={item} key={i}/>
                                ))}
                            </div>

                            <div className="w-full lg:w-1/3 max-w-screen-md mx-auto flex flex-col gap-6 pt-16 lg:py-6">
                                <p className="font-montserrat text-3xl font-semibold">Summary</p>
                                <div className="flex justify-between border-b-[1px] border-gray-300 gap-3 py-3">
                                    <p className="text-lg font-semibold">Subtotal ({cart.qty} Items)</p>
                                    <p className="text-lg font-semibold">USD {cart.price.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between border-b-[1px] border-gray-300 gap-3 py-3">
                                    <p className="text-2xl font-bold">Total</p>
                                    <p className="text-lg font-semibold">USD {cart.price.toFixed(2)}</p>
                                </div>
                                <div className="font-Nunito font-light flex items-center gap-5 py-4">
                                    <BsTruck className="h-9 w-9 md:h-6 md:w-6 text-gray-500"/>
                                    <p className="text-gray-600">Delivery fee (if applicable) will be calculated at
                                        checkout.</p>
                                </div>
                                <Link to={'/checkout'}>
                                    <Button className="hidden lg:block" text="Checkout" color="primary"
                                            shape="circle"></Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {user !== null ?
                        <></> :
                        <div className="lg:flex lg:mx-auto max-w-5xl p-5 flex flex-col gap-4 my-11">
                            <p className="text-2xl font-bold">Favorites</p>
                            <p className="flex gap-2">
                                Want to view your favorites?
                                <Link to={'/register'}>
                                    <span className="underline text-blue-600">Join us</span>
                                </Link>
                                or
                                <Link to={'/login'}>
                                    <span className="underline text-blue-600">Sign in</span>
                                </Link>
                            </p>
                        </div>
                    }

                </div>
                <div
                    className="lg:hidden z-10 fixed flex bg-white w-full py-4 bottom-0 border-t border-black text-center">
                    <Link to={'/checkout'}>
                        <div className="w-4/5 rounded-full p-5 bg-black text-white mx-auto my-auto">
                            Checkout
                        </div>
                    </Link>
                </div>
                {user !== null ?
                    <div className="font-montserrat font-semibold pt-8">
                        <NormalSlider title={"Recently Viewed"} slide={undefined}></NormalSlider>
                    </div>
                    :
                    <div></div>
                }
            </div>
        </>

    );
}

export default Cart;