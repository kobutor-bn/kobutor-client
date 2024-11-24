declare namespace ICart {
    interface Item {
        id: string;
        user_id: string;
        items?: Product[];
        quantity: number;
        price: number;
    }

    interface Product {
        product_id: string;
        quantity: number;
        title: string;
        price: number;
        desc: string;
        category: string;
        image: string;
        color: string;
    }

    interface Color {
        color: string;
        image: string;
    }

    interface Global {
        cart: Item | null;
        isCartLoading?: boolean;
    }

    interface Create {
        user_id?: string;
        items: IProduct.Item[];
        quantity?: number;
        price?: number;
    }

    interface Cart {
        id: string;
        product_id: string;
    }
}