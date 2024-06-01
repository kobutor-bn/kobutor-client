import CartCard from "../../Components/Card/CartCard.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import Button from "../../Components/Button.tsx";
import {BsTruck} from "react-icons/bs";

function Cart() {
    const items = useSelector((state: RootState) => state.cart.items);
    const cart = useSelector((state: RootState) => state.cart);

    return (
        <>
            {cart.qty === 0 ? <p className="mx-auto text-center text-2xl font-bold p-5 py-20">Cart is Empty!</p> :
                (
                    <div className="lg:flex lg:mx-auto max-w-5xl p-5">
                        <div className="">
                            <div className="max-w-screen-md mx-auto border-b-[1px] border-b-gray-400 my-6 pb-6">
                                <p className="text-center text-2xl font-bold">Cart</p>
                                <p className="lg:hidden text-center text-lg font-semibold text-rose-500 tracking-widest">{cart.qty} Items
                                    |
                                    USD {cart.price}</p>
                            </div>
                            {items.map((item: ICart.Item, i) => {
                                return <CartCard item={item} key={i}/>
                            })}
                        </div>

                        <div className="max-w-screen-md mx-auto flex flex-col gap-4 pt-16 lg:py-6">
                            <p className="text-2xl font-bold">Summary</p>
                            <div
                                className="flex justify-between border-b-[1px] border-b-gray-400 max-w-screen-lg gap-3 py-3">
                                <p className="text-lg font-semibold">Subtotal ({cart.qty} Items)</p>
                                <p className="text-lg font-semibold">USD {cart.price}</p>
                            </div>
                            <div
                                className="flex justify-between border-b-[1px] border-b-gray-400 max-w-screen-lg gap-3 py-3">
                                <p className="text-2xl font-bold">Total</p>
                                <p className="text-lg font-semibold">USD {cart.price}</p>
                            </div>
                            <div className="flex items-center gap-5 py-4">
                                <BsTruck className="h-9 w-9 md:h-6 md:w-6"/>
                                <p>Delivery fee (if applicable) will be calculated at checkout.</p>
                            </div>
                            <Button text="Checkout" color="primary" shape="circle"></Button>
                        </div>
                    </div>
                )}

            <div className="lg:flex lg:mx-auto max-w-5xl p-5 flex flex-col gap-4 my-11">
                <p className="text-2xl font-bold">Favorites</p>
                <p>Want to view your favorites? <span className="underline">Join us</span> or <span
                    className="underline">Sign in</span></p>
            </div>
            <div
                className="lg:hidden fixed flex bg-white w-full h-28 bottom-0 border-t border-t-black text-white text-center">
                <div className="w-4/5 rounded-full p-5 bg-black mx-auto my-auto">Checkout</div>
            </div>
        </>

    );
}

export default Cart;