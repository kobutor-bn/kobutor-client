import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../config/stripe';
import { orderSelector } from '../../Services/store/slices/order';
import { userSelector } from '../../Services/store/slices/auth';
import Loading from '../../Components/Loading';
import CheckoutForm from "../CheckoutForm";
import { HiOutlineShieldCheck, HiOutlineLockClosed } from 'react-icons/hi';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const order = useSelector(orderSelector);
    const user = useSelector(userSelector);
    const [clientSecret, setClientSecret] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Redirect if no order data
        if (!order?.total_amount || !order?.products?.length) {
            navigate('/cart');
            return;
        }

        // Create Payment Intent
        const createPaymentIntent = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_API_PROXY_TARGET}/v1/payment/intent`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        },
                        body: JSON.stringify({
                            order_id: order.id || `order_${Date.now()}`,
                            amount: order.total_amount,
                            currency: 'eur',
                            payment_method: 'card',
                            metadata: {
                                user_id: user?.id || '',
                                user_email: user?.email || '',
                                products: JSON.stringify(order.products.map(p => ({
                                    id: p.product_id,
                                    quantity: p.quantity
                                })))
                            }
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to create payment intent');
                }

                const data = await response.json();
                setClientSecret(data.client_secret);
            } catch (err: any) {
                setError(err.message || 'Failed to initialize payment');
                console.error('Payment intent error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        createPaymentIntent();
    }, [order, user, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loading />
                    <p className="mt-4 text-gray-600 font-Nunito">
                        Preparing secure checkout...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-2">
                        Payment Error
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/cart')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                    >
                        Return to Cart
                    </button>
                </div>
            </div>
        );
    }

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#2563eb',
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#ef4444',
            fontFamily: 'system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Secure Checkout
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <HiOutlineShieldCheck className="h-5 w-5 text-green-600" />
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HiOutlineLockClosed className="h-5 w-5 text-green-600" />
                            <span>SSL Encrypted</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Order Summary - Left Side */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                            <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-6">
                                Order Summary
                            </h2>

                            {/* Products */}
                            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                {order.products.map((product) => (
                                    <div
                                        key={product.product_id}
                                        className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate">
                                                {product.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {product.quantity}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                €{(product.price * product.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Shipping Address */}
                            {order.address && (
                                <div className="mb-6 pb-6 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        Shipping Address
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {order.address.detail}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {order.address.city}, {order.address.postal_code}
                                    </p>
                                </div>
                            )}

                            {/* Total */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>€{order.total_amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-semibold">FREE</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-900">
                                            Total
                                        </span>
                                        <span className="text-2xl font-bold text-blue-600">
                                            €{order.total_amount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form - Right Side */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                            <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-6">
                                Payment Details
                            </h2>

                            {clientSecret && (
                                <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm clientSecret={clientSecret} />
                                </Elements>
                            )}
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-6 bg-blue-50 rounded-xl p-6">
                            <div className="flex items-start gap-3">
                                <HiOutlineShieldCheck className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        Your payment is secure
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        We use industry-standard SSL encryption to protect your payment information. Your card details are never stored on our servers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;