declare namespace IProduct {
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
        items: Item[];
    }
}