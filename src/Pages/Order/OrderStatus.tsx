import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { orderSelector } from "../../Services/store/slices/order.ts";
import { PiClipboardBold } from "react-icons/pi";
import { userSelector } from "../../Services/store/slices/auth.ts";
import { HiOutlineCheckCircle } from "react-icons/hi";
import Button from "../../Components/Button";

const OrderStatus: React.FC = () => {
    const order = useSelector(orderSelector);
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if redirected from successful payment
    const paymentSuccess = location.state?.paymentSuccess;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(order.id || "No Order ID");
        alert("Order ID copied to clipboard!");
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white border rounded-2xl shadow-lg p-6 2xl:p-8">
                {/* Success Banner */}
                {paymentSuccess && (
                    <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <HiOutlineCheckCircle className="h-12 w-12 text-green-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-montserrat text-xl font-bold text-green-900 mb-1">
                                    Payment Successful!
                                </h3>
                                <p className="text-green-700">
                                    Your order has been confirmed and will be shipped soon.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-center flex-wrap mb-6 pb-6 border-b border-gray-200">
                    <h2 className="font-montserrat text-2xl 2xl:text-4xl font-bold text-gray-900">
                        Order Summary
                    </h2>
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                        <p className="text-gray-600 text-sm 2xl:text-lg">Order ID:</p>
                        <p className="text-gray-900 font-semibold font-mono text-sm 2xl:text-lg">
                            {order.id || "PENDING"}
                        </p>
                        <PiClipboardBold
                            className="h-5 w-5 2xl:h-7 2xl:w-7 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
                            onClick={copyToClipboard}
                        />
                    </div>
                </div>

                {/* Customer Details */}
                <section className="mb-6 bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-montserrat text-lg 2xl:text-2xl font-bold mb-4 text-gray-900">
                        Customer Details
                    </h3>
                    <div className="space-y-2 text-sm 2xl:text-lg">
                        <p>
                            <strong className="text-gray-700">Name:</strong>{' '}
                            <span className="text-gray-900">{user?.name || order.user_id}</span>
                        </p>
                        <p>
                            <strong className="text-gray-700">Email:</strong>{' '}
                            {user?.email ? (
                                <span className="text-gray-900">{user.email}</span>
                            ) : (
                                <span className="text-red-500 italic">Not provided</span>
                            )}
                        </p>
                        <p>
                            <strong className="text-gray-700">Phone:</strong>{' '}
                            {user?.phone ? (
                                <span className="text-gray-900">{user.phone}</span>
                            ) : (
                                <span className="text-red-500 italic">Not provided</span>
                            )}
                        </p>
                    </div>
                </section>

                {/* Shipping Address */}
                <section className="mb-6 bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-montserrat text-lg 2xl:text-2xl font-bold mb-4 text-gray-900">
                        Shipping Address
                    </h3>
                    <div className="text-sm 2xl:text-lg">
                        {order.address ? (
                            <>
                                <p className="font-medium text-gray-900">{order.address.detail}</p>
                                <p className="text-gray-600">
                                    {order.address.city}, {order.address.postal_code}
                                </p>
                            </>
                        ) : (
                            <p className="text-red-500 italic">No address provided.</p>
                        )}
                    </div>
                </section>

                {/* Products */}
                <section className="mb-6">
                    <h3 className="font-montserrat text-lg 2xl:text-2xl font-bold mb-4 text-gray-900">
                        Products
                    </h3>
                    <ul className="space-y-4">
                        {order.products.map((product) => (
                            <li
                                key={product.product_id}
                                className="flex flex-col sm:flex-row justify-between bg-gray-50 p-4 2xl:p-6 rounded-xl shadow-sm gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-24 h-24 2xl:w-32 2xl:h-32 object-cover rounded-lg"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900 text-base 2xl:text-xl">
                                            {product.title}
                                        </p>
                                        <p className="text-sm 2xl:text-lg text-gray-600">
                                            Quantity: {product.quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg 2xl:text-2xl font-bold text-gray-900">
                                    €{(product.price * product.quantity).toFixed(2)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Total */}
                <section className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                    <div className="flex justify-between items-center">
                        <h3 className="font-montserrat text-xl 2xl:text-3xl font-bold text-gray-900">
                            Total Amount
                        </h3>
                        <p className="text-3xl 2xl:text-5xl font-bold text-blue-600">
                            €{order.total_amount.toFixed(2)}
                        </p>
                    </div>
                </section>

                {/* Payment Button */}
                {!paymentSuccess && (
                    <div className="mt-8 flex justify-end">
                        <Button
                            text="Proceed to Payment"
                            color="primary"
                            shape="circle"
                            onClick={() => navigate('/checkout')}
                            className="!px-8 !py-4 2xl:!px-12 2xl:!py-6 !text-lg 2xl:!text-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderStatus;