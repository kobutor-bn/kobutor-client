import React from "react";
import {useOrderHistory} from "../../Services/store/hooks/order.ts";
import Error from "../Error.tsx";
import {Link} from "react-router-dom";

const OrderHistory: React.FC = () => {
    const {orders, isLoading, error} = useOrderHistory();
    console.log(orders);

    // if (!isLoading) return <Loading/>
    if (error) return <Error error={error}/>

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6">Order History</h1>

                {orders ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders!.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white border rounded-md shadow-md p-4 flex flex-col justify-between"
                            >
                                <div>
                                    <p className="text-sm uppercase text-gray-500">Order ID: {order.id}</p>
                                    <p className="font-medium text-gray-800 mt-2">
                                        Placed on: {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700">
                                        Total: ${order.total_amount.toFixed(2)}
                                    </p>
                                    <p className={`mt-1 ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </p>
                                </div>
                                <Link
                                    to={`/order/${order.id}`}
                                    className="mt-4 inline-block text-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
                                >
                                    View Order
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">You have no past orders.</p>
                )}
            </div>
        </div>
    );
};

const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
        case "completed":
            return "text-green-600 font-semibold";
        case "pending":
            return "text-yellow-600 font-semibold";
        case "cancelled":
            return "text-red-600 font-semibold";
        default:
            return "text-gray-600 font-semibold";
    }
};

export default OrderHistory;