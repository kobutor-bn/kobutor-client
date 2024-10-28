/**
 * @author zahin
 */
import {IPaymentRequest} from "react-bkash";

export class CheckoutService {
    static async createPayment(paymentRequest: IPaymentRequest) {
        const res = await fetch('http://localhost:2335/v1/bkash', {
            method: 'POST',
            body: JSON.stringify(paymentRequest),
        });
        return await res.json();
    }

    static async executePayment(paymentID: string) {
        return await fetch(`<your backend api>/execute/${paymentID}`, {
            method: 'POST',
        }).then((res) => res.json());
    }
}