declare namespace IProduct {
    interface Item {
        id: string;
        title: string;
        category: string;
        desc: string;
        price: number;
        colors: Colors[];
        images: string[];
        tags: string[];
    }

    type Items = Item[];

    interface Colors {
        color: string;
        image: string;
    }
}