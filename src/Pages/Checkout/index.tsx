import { useBkash } from 'react-bkash';
import {CheckoutService} from "../../Services/checkout";

const Checkout = () => {
    console.log("fff")
    const { error, loading, triggerBkash } = useBkash({
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
        <div className="h-screen">
            <div className="flex">
                <button className="p-3 mx-auto border-black border-2 bg-red-500 rounded-lg" onClick={triggerBkash}>Pay with bKash</button>
            </div>
        </div>
    );
};

export default Checkout;