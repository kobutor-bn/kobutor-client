import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAddress, useCreateAddress} from "../../Services/store/hooks/address.ts";
import Modal from "../../Components/Popup/Modal";
import OrderPreview from "../../Components/OrderPreview.tsx";
import Button from "../../Components/Button.tsx";
import Form from "../../Components/Form";
import {addrFormConfig} from "../../Components/Form/config.ts";
import {addrSchema} from "../../Components/Form/schema.ts";
import {z} from "zod";
import Loading from "../../Components/Loading";
import Error from "../Error.tsx";
import {useUser} from "../../Services/store/hooks/user.ts";
import {useCreateOrder} from "../../Services/store/hooks/order.ts";
import {useDispatch, useSelector} from "react-redux";
import {orderSelector, setItem} from "../../Services/store/slices/order.ts";

function OrderSummary() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useUser();
    const order = useSelector(orderSelector);

    // State
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isCreateAddrOpen, setIsCreateAddrOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<IAddress.Item | null>(null);
    const totalAmount = order.products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    // Hooks
    const {addresses, isLoading: isAddrLoading, error: addrError} = useAddress(user!.id!);
    const {addAddr, isLoading: addAddrLoading} = useCreateAddress();
    const {createOrder, error} = useCreateOrder();

    // Address Creation Form Config
    const configWithSubmit = {
        ...addrFormConfig,
        schema: addrSchema,
        onSubmit: async (values: z.infer<typeof addrSchema>) => {
            try {
                await addAddr({...values, user_id: user!.id}).unwrap();
                setIsCreateAddrOpen(false);
            } catch (error) {
                console.error("Error during form submission:", error);
            }
        },
    };


    // Address Modal Content
    const renderAddressModalContent = () => (
        <div>
            <h3 className="text-lg font-bold mb-4">Select a Shipping Address</h3>
            {isAddrLoading ? (
                <Loading/>
            ) : addrError ? (
                <Error error={addrError}/>
            ) : addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            onClick={() => {
                                handleAddressChange(addr);
                                setIsAddressModalOpen(false); // Close modal on selection
                            }}
                            className={`p-4 border rounded-md shadow-sm cursor-pointer transition ${
                                selectedAddress?.id === addr.id ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
                            }`}
                        >
                            <p className="font-medium">{addr.detail}</p>
                            <p className="text-sm text-gray-600">{addr.city}, {addr.postal_code}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-yellow-100 p-4 rounded-md text-yellow-800">
                    <p>No addresses available. Please add one.</p>
                </div>
            )}

            <Modal
                isOpen={isCreateAddrOpen}
                setIsOpen={setIsCreateAddrOpen}
                trigger={
                    <Button
                        text="Add Address"
                        onClick={() => setIsCreateAddrOpen(true)}
                        disabled={addAddrLoading || addresses.length >= 3}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    />
                }
                body={<Form title="Add Address" {...configWithSubmit} />}
            />
        </div>
    );

    useEffect(() => {
        dispatch(setItem({
            total_amount: totalAmount,
        }))

        console.log(order);
    }, []);

    const handleAddressChange = (addr: IAddress.Item) => {
        setSelectedAddress(addr);
        dispatch(
            setItem({
                address: {
                    address_id: addr.id,
                    user_id: addr.user_id,
                    detail: addr.city,
                    city: addr.detail,
                    postal_code: addr.postal_code,
                },
            })
        );
    }

    const submitOrder = async () => {
        try {
            const response = await createOrder(order).unwrap();
            dispatch(setItem(response));
            navigate('/order/status');
        } catch (err) {
            return <Error error={error}/>;
        }
    }

    return (
        <>
            <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Checkout</h1>
                    <Button
                        text="Confirm Order"
                        onClick={submitOrder}
                        className="hidden md:flex bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    />
                </div>

                <OrderPreview
                    user={user!}
                    products={order.products}
                    selectedAddress={selectedAddress!}
                />

                <div className="flex flex-col gap-5 mt-4">
                    <h3 className="text-lg font-semibold">Choose Address:</h3>
                    {selectedAddress ? (
                        <div className="border p-4 rounded-md shadow-md bg-gray-50">
                            <p className="font-medium">{selectedAddress.detail}</p>
                            <p className="text-sm text-gray-600">{selectedAddress.city}, {selectedAddress.postal_code}</p>
                        </div>
                    ) : (
                        <p className="text-red-500 italic">No address selected. Please add or select one.</p>
                    )}
                    <Modal
                        isOpen={isAddressModalOpen}
                        trigger={<Button text="Choose Address"/>}
                        setIsOpen={setIsAddressModalOpen}
                        body={renderAddressModalContent()}
                    />
                </div>


            </div>
            <div
                className="md:hidden z-10 fixed flex justify-center bg-white w-full py-4 bottom-0 border-t border-black text-center">
                <Button
                    text="Confirm Order"
                    onClick={submitOrder}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                />
            </div>
        </>

    );
}

export default OrderSummary;