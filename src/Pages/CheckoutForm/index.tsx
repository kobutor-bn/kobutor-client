import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { HiOutlineCheckCircle } from 'react-icons/hi';

interface CheckoutFormProps {
    clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage('');

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/order/status`,
                },
                redirect: 'if_required',
            });

            if (error) {
                setErrorMessage(error.message || 'An error occurred during payment');
                setIsProcessing(false);
            } else {
                // Payment successful
                navigate('/order/status', {
                    state: { paymentSuccess: true }
                });
            }
        } catch (err: any) {
            setErrorMessage(err.message || 'Payment failed');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement
                options={{
                    layout: 'tabs',
                }}
            />

            {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-red-800">Payment Error</h3>
                            <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={`w-full font-semibold py-4 px-6 rounded-lg text-white transition-all transform ${
                    isProcessing || !stripe
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'
                } shadow-lg`}
            >
                {isProcessing ? (
                    <div className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        <span>Processing...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        <HiOutlineCheckCircle className="h-6 w-6" />
                        <span>Pay Now</span>
                    </div>
                )}
            </button>

            <p className="text-xs text-center text-gray-500">
                By completing your purchase you agree to our{' '}
                <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
            </p>
        </form>
    );
};

export default CheckoutForm;