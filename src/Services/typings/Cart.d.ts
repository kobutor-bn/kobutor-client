declare namespace ICart {
    interface Item {
        id: string;
        items?: IProduct.Item[];
        quantity: number;
        price: number;
    }
}