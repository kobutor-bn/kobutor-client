import React from "react";
import LazyImage from "../Services/lazy/lazyImage.tsx";
import {useFormMutation} from "../Services/store/hooks/form.ts";
import {userInfoFormConfig} from "./Form/config.ts";
import {userInfoSchema} from "./Form/schema.ts";
import {z} from "zod";
import {useUpdateUser} from "../Services/store/hooks/user.ts";
import Form from "./Form";
import Modal from "./Popup/Modal";
import {Category} from "../Services/typings/Enums.ts";

const OrderPreview: React.FC<IOrder.Preview> = ({user, products, selectedAddress}) => {
    const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity!, 0);
    const {request, isUpdateOpen, setIsUpdateOpen} = useFormMutation();
    const {updateUser} = useUpdateUser();

    const updateUserConfig = {
        ...userInfoFormConfig,
        schema: userInfoSchema,
        onSubmit: async (values: z.infer<typeof userInfoSchema>) => {
            const updateUserValues: IUser.Update = {
                ...values,
                id: user!.id,
            };

            await request("update", updateUser, updateUserValues);
        },
    };

    const renderByCategory = (product: IProduct.Item, category: string) => {
        switch (category) {
            case Category.Electronics:
                return <LazyImage
                    className="w-28 h-28 object-cover rounded-md"
                    src={product.image!}
                    alt={product.title}
                />
            case Category.WomenBags:
                return <>
                    <LazyImage
                        className="w-28 h-28 object-cover rounded-md"
                        src={product.image!}
                        alt={product.title}
                    />
                    <div className="flex items-center font-semibold text-rose-500 gap-2">
                        <p>Color: </p>
                        <div
                            className={`h-5 w-5 p-0.5 cursor-pointer rounded-full border-2 border-black`}
                            style={{backgroundColor: product.color}}
                        ></div>
                    </div>
                </>
        }
    }

    const userInfo = () => {
        return <div className="mb-6 bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p>
                <strong>Email:</strong>{" "}
                {user.email || <span className="text-red-700 italic">Please provide an email</span>}
            </p>
            <p>
                <strong>Phone:</strong>{" "}
                {user.phone || <span className="text-red-700 italic">Please provide a phone number</span>}
            </p>
            <Modal
                isOpen={isUpdateOpen}
                setIsOpen={setIsUpdateOpen}
                trigger={
                    <div className="flex justify-end">
                        <button className="text-blue-500 underline">
                            Edit
                        </button>
                    </div>
                }
                body={
                    <Form
                        title="Update Contact Info"
                        {...updateUserConfig}
                        defaultValues={user}
                    />
                }
            />
        </div>
    }

    const lsProducts = () => {
        console.log(products)
        return <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            <ul className="space-y-4">
                {products.map((item) => (
                    <li
                        key={item.id}
                        className="flex flex-col lg:flex-row items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm gap-4 lg:gap-6"
                    >
                        {renderByCategory(item, item.category)}
                        <div className="flex flex-col lg:flex-1 lg:px-4 text-center lg:text-left">
                            <p className="font-medium text-lg">{item.title}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-lg">${(item.price * item.quantity!).toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    }

    const price = () => {
        return <div className="bg-gray-50 p-4 rounded-md text-right">
            <h3 className="text-lg font-semibold">Total Price</h3>
            <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
        </div>
    }

    const shippingInfo = () => {
        return <div className="mb-6 bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            {selectedAddress ? (
                <div>
                    <p className="font-medium">{selectedAddress.detail}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.city}, {selectedAddress.postal_code}</p>
                </div>
            ) : (
                <p className="text-red-700 italic">No address selected. Please choose one.</p>
            )}
        </div>
    }
    return (
        <div className="p-6 border rounded-md shadow-md bg-white max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6 flex-wrap">
                <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
            {userInfo()}
            {shippingInfo()}
            {lsProducts()}
            {price()}
        </div>
    );
};

export default OrderPreview;