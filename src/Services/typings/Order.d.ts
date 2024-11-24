declare namespace IOrder {
    type Item = {
        id: string;
        user_id: string;
        status: string;
        total_amount: number;
        products: Product[];
        currency: string;
        payment_details: PaymentDetails;
        address: IAddress.Item;
        created_at: string;
    };

    type PaymentDetails = {
        method: string;
        status: string;
        transaction_id: string;
    }

    type User = {
        user_id: string;
        username: string;
        name: string;
        phone: number;
        email: string;
        cart_id: string;
        avatar: string;
    }

    type Product = {
        product_id: string;
        quantity: number;
        title: string;
        price: number;
        desc: string;
        category: string;
        image: string;
        color: string;
    }

    type Address = {
        address_id: string;
        user_id: string;
        detail: string;
        city: string;
        postal_code: string;
    };

    type Preview = {
        user: IUser.Info;
        products: ICart.Product[];
        selectedAddress: IAddress.Item;
    };
}