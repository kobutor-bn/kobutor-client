declare namespace IUser {
    type Info = {
        id: string;
        phone: string;
        email?: string;
        name?: string;
        cart_id?: string;
        avatar?: string;
        roles?: string[];
        username: string;
        created_at?: number;
        permissions?: string[];
        favorites?: IProduct.Item[];
    };

    type LoginParams = {
        account: string;
        secret: string;
        source: string;
    };

    type Query = {
        username: string;
    };

    type Create = {
        roles: string[];
        username: string;
        password: string;
    };

    type Update = {
        id: number;
        roles: string[];
        status: string;
        username: string;
        password: string;
    };
}