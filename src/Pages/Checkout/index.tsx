import {useBkash} from 'react-bkash';
import {CheckoutService} from "../../Services/checkout";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import Button from "../../Components/Button.tsx";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const checkoutSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
    const [selectedPayment, setSelectedPayment] = useState<'bKash' | 'Stripe' | null>(null);
    const {register, handleSubmit, formState: {errors}} = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    });

    const stripe = useStripe();
    const elements = useElements();

    const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
        if (selectedPayment === 'bKash') {
            await handleBkashPayment();
        } else if (selectedPayment === 'Stripe' && stripe && elements) {
            await handleStripePayment();
        }
    };

    const handleBkashPayment = async () => {
        console.log("Redirecting to bKash payment...");
        triggerBkash();
    };

    const handleStripePayment = async () => {
        if (!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error("Payment error:", error);
        } else {
            console.log("Stripe Payment successful:", paymentMethod);
        }
    };


    const {error, loading, triggerBkash} = useBkash({
        onSuccess: (data) => {
            console.log(data); // this contains data from api response from onExecutePayment
        },
        onClose: () => {
            console.log('Bkash iFrame closed');
        },
        bkashScriptURL: 'https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js', // https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js
        amount: 1000,
        onCreatePayment: async (paymentRequest) => {
            console.log("fff")
            try {
                return await CheckoutService.createPayment(paymentRequest);
            } catch (error) {
                console.error(error);
            }
            // must return the following object:
            // {
            // 	paymentID: string;
            // 	createTime: string;
            // 	orgLogo: string;
            // 	orgName: string;
            // 	transactionStatus: string;
            // 	amount: string;
            // 	currency: string;
            // 	intent: string;
            // 	merchantInvoiceNumber: string;
            // }
        },
        onExecutePayment: async (paymentID) => {
            console.log("zzz")
            try {
                return await CheckoutService.executePayment(paymentID);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div
            className="max-w-lg w-full mx-auto flex flex-col justify-center items-center gap-5 p-6 bg-gray-50 rounded-md shadow-lg">
            <h2 className="font-bold text-3xl text-center">Checkout</h2>

            {/* Order Summary */}
            <div className="w-full p-4 mb-6 bg-white rounded-lg shadow">
                <h3 className="font-semibold text-xl mb-3">Order Summary</h3>
                <p>Item(s) description, quantity, price</p>
                <p className="font-bold text-lg">Total: $99.99</p>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-5">
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Full Name"
                    className="border-[1px] p-3 w-full rounded"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <input
                    type="email"
                    {...register("email")}
                    placeholder="Email Address"
                    className="border-[1px] p-3 w-full rounded"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <input
                    type="text"
                    {...register("phone")}
                    placeholder="Phone Number"
                    className="border-[1px] p-3 w-full rounded"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                <input
                    type="text"
                    {...register("address")}
                    placeholder="Shipping Address"
                    className="border-[1px] p-3 w-full rounded"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                {/* Payment Method Selection */}
                <div className="flex flex-col w-full gap-2 mt-4">
                    <p className="font-semibold">Select Payment Method:</p>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="bKash"
                            checked={selectedPayment === 'bKash'}
                            onChange={() => setSelectedPayment('bKash')}
                            className="mr-2"
                        />
                        bKash
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="Stripe"
                            checked={selectedPayment === 'Stripe'}
                            onChange={() => setSelectedPayment('Stripe')}
                            className="mr-2"
                        />
                        Credit/Debit Card (via Stripe)
                    </label>
                </div>

                {/* Stripe Payment Fields */}
                {selectedPayment === 'Stripe' && (
                    <div className="w-full p-3 border border-gray-300 rounded">
                        <Elements stripe={stripePromise}>
                            <CardElement options={{hidePostalCode: true}} className="p-2"/>
                        </Elements>
                    </div>
                )}

                <Button text="Confirm and Pay" size="large" color="primary"/>
            </form>
        </div>
    );
};

export default Checkout;