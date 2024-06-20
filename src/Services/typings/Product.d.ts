declare namespace IProduct {
    interface Item {
        id: string;
        title: string;
        desc: string;
        imgUrl: string;
        price: number;
        category: string;
        size: string;
        colors: Color[];
        quantity: number;
        stock: number;
    }

    interface Color {
        color: string;
        images: Image[];
    }

    interface Items {
        items: Item[];
    }

    interface Image {
        imgUrl: string;
    }
}