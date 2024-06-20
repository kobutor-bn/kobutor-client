declare namespace IUser {
    type Props = {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        favorites: IProduct.Item[];
    };
}