declare namespace ICart {
    interface Item {
        id: string;
        title: string;
        desc: string;
        imgUrl: string;
        price: number;
        colors: Color[];
        category: string;
        size: string;
        quantity: number;
        stock: number;
    }


    interface Color {
        color: string;
        images: Image[];
    }

    interface Items {
        qty: number;
        price: number;
        items: Item[];
    }
}