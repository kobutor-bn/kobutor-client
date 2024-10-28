declare namespace ICart {
    interface Item {
        id: string;
        title: string;
        desc: string;
        price: number;
        selectedColor: string;
        colors: { [key: string]: string };
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