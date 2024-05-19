declare namespace ICart {
    interface Item {
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