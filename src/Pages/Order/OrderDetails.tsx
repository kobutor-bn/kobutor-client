import React from "react";
import {useParams} from "react-router-dom";
import {useOrderDetailsHistory} from "../../Services/store/hooks/order.ts";
import {PiClipboardBold} from "react-icons/pi";
import {useSelector} from "react-redux";
import {userSelector} from "../../Services/store/slices/auth.ts";

const OrderDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {item} = useOrderDetailsHistory(id!);
    const user = useSelector(userSelector);

    if (!item) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-xl">Order not found!</p>
            </div>
        );
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(item.id);
        alert("Order ID copied to clipboard!");
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white border rounded-md shadow-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center flex-wrap mb-6">
                    <h2 className="text-2xl font-semibold">Order Details</h2>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-500 text-sm">Order ID:</p>
                        <p className="text-gray-900 uppercase font-medium">{item.id}</p>
                        <PiClipboardBold
                            className="h-6 w-6 text-blue-500 cursor-pointer"
                            onClick={copyToClipboard}
                        />
                    </div>
                </div>

                {/* Customer Details */}
                <section className="mb-6 bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
                    <div className="space-y-2">
                        <p>
                            <strong>Name:</strong> {user!.name || "N/A"}
                        </p>
                        <p>
                            <strong>Email:</strong> {user!.email || (
                            <span className="text-red-500 italic">Not provided</span>
                        )}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user!.phone || (
                            <span className="text-red-500 italic">Not provided</span>
                        )}
                        </p>
                    </div>
                </section>

                {/* Shipping Address */}
                <section className="mb-6 bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                    {item.address ? (
                        <>
                            <p className="font-medium">{item.address.detail}</p>
                            <p className="text-sm text-gray-600">
                                {item.address.city}, {item.address.postal_code}
                            </p>
                        </>
                    ) : (
                        <p className="text-red-500 italic">No address provided.</p>
                    )}
                </section>

                {/* Products */}
                <section className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Products</h3>
                    <ul className="space-y-4">
                        {item.products.map((product) => (
                            <li
                                key={product.product_id}
                                className="flex flex-col sm:flex-row justify-between bg-gray-50 p-4 rounded-md shadow-md gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-28 h-28 object-cover rounded-md"
                                    />
                                    <div>
                                        <p className="font-medium">{product.title}</p>
                                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold">
                                    ${(product.price * product.quantity).toFixed(2)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Total Price */}
                <section className="bg-gray-50 p-4 rounded-md text-right">
                    <h3 className="text-lg font-semibold">Total Price</h3>
                    <p className="text-2xl font-bold">${item.total_amount.toFixed(2)}</p>
                </section>
            </div>
        </div>
    );
};

export default OrderDetails;