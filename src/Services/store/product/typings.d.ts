declare namespace IProduct {
    interface Item {
        id: string;
        title: string;
        category: string;
        desc: string;
        price: number;
        colors: { [key: string]: string };
        tags: string[];
    }

    type Items = Item[];

    enum Category {
        WomenBags = 'Women Bags',
        Electronics = 'Electronics',
    }
}