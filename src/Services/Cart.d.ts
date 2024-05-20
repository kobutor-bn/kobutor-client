declare namespace ICart {
    interface Item {
        id: string;
        title: string;
        desc: string;
        imgUrl: string;
        price: number;
        category: string;
        size: string;
        quantity: number;
        stock: number;
    }

    interface Items {
        qty: number;
        price: number;
        items: Item[];
    }
}