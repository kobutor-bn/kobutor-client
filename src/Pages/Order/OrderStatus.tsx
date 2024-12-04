import React from "react";
import {useSelector} from "react-redux";
import {orderSelector} from "../../Services/store/slices/order.ts";
import {PiClipboardBold} from "react-icons/pi";
import {userSelector} from "../../Services/store/slices/auth.ts";

const OrderStatus: React.FC = () => {
    const order = useSelector(orderSelector);
    const user = useSelector(userSelector);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(order.id || "No Order ID");
        alert("Order ID copied to clipboard!");
    };

    // Responsive classes using Tailwind
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white border rounded-md shadow-lg p-6">
                <div className="flex justify-between items-center flex-wrap mb-6">
                    <h2 className="text-xl font-semibold">Order Status</h2>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-500 text-sm">Order ID:</p>
                        <p className="text-gray-900 font-medium">{order.id || "PLACEHOLDER_ORDER_ID"}</p>
                        <PiClipboardBold
                            className="h-6 w-6 text-blue-500 cursor-pointer"
                            onClick={copyToClipboard}
                        />
                    </div>
                </div>

                <section className="mb-6 bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
                    <div className="space-y-2">
                        <p>
                            <strong>Name:</strong> {order.user_id}
                        </p>
                        <p>
                            <strong>Email:</strong> {user!.email ||
                            <span className="text-red-500 italic">Not provided</span>}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user!.phone ||
                            <span className="text-red-500 italic">Not provided</span>}
                        </p>
                    </div>
                </section>

                <section className="mb-6 bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                    <div>
                        {order.address ? (
                            <>
                                <p className="font-medium">{order.address.detail}</p>
                                <p className="text-sm text-gray-600">
                                    {order.address.city}, {order.address.postal_code}
                                </p>
                            </>
                        ) : (
                            <p className="text-red-500 italic">No address provided.</p>
                        )}
                    </div>
                </section>

                <section className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Products</h3>
                    <ul className="space-y-4">
                        {order.products.map((product) => (
                            <li
                                key={product.id}
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
                                <p className="text-lg font-semibold">${(product.price * product.quantity!).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="bg-gray-50 p-4 rounded-md text-right">
                    <h3 className="text-lg font-semibold">Total Price</h3>
                    <p className="text-2xl font-bold">${order.total_amount.toFixed(2)}</p>
                </section>
            </div>
        </div>
    );
};

export default OrderStatus;