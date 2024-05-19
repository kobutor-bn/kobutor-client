import CartCard from "../../Components/Card/CartCard.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";

function Cart() {
    const items = useSelector((state: RootState) => state.cart.items);

    return (
        <>
            <div className="lg:flex lg:mx-auto max-w-5xl p-5">
                <div className="">
                    <div className="max-w-screen-md mx-auto border-b-[1px] border-b-gray-400 my-6 pb-6">
                        <p className="text-center text-2xl font-bold">Cart</p>
                        <p className="lg:hidden text-center text-lg font-semibold text-rose-500 tracking-widest">4 Items
                            |
                            USD 400</p>
                    </div>
                    {items.map((item: ICart.Item, i) => {
                        return <CartCard item={item} key={i}/>
                    })}
                </div>

                <div className="max-w-screen-md mx-auto flex flex-col gap-4 pt-16 lg:py-6">
                    <p className="text-2xl font-bold">Summary</p>
                    <div className="flex justify-between border-b-[1px] border-b-gray-400 max-w-screen-lg gap-3 py-3">
                        <p className="text-lg font-semibold">Subtotal (5 Items)</p>
                        <p className="text-lg font-semibold">USD 100</p>
                    </div>
                    <div className="flex justify-between border-b-[1px] border-b-gray-400 max-w-screen-lg gap-3 py-3">
                        <p className="text-2xl font-bold">Total</p>
                        <p className="text-lg font-semibold">USD 100</p>
                    </div>
                    <p>Delivery fee (if applicable) will be calculated at checkout.</p>
                </div>

            </div>
            <div className="lg:flex lg:mx-auto max-w-5xl p-5 flex flex-col gap-4 my-11">
                <p className="text-2xl font-bold">Favorites</p>
                <p>Want to view your favorites? <span className="underline">Join us</span> or <span
                    className="underline">Sign in</span></p>
            </div>
            <div className="fixed flex bg-white w-full h-28 bottom-0 border-t border-t-black text-white text-center">
                <div className="w-4/5 rounded-full p-5 bg-black mx-auto my-auto">Checkout</div>
            </div>
        </>

    );
}

export default Cart;