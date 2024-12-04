declare namespace ICart {
    interface Item {
        id: string;
        user_id: string;
        items?: IProduct.Item[];
        quantity: number;
        price: number;
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