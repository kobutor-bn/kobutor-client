declare namespace IUser {
    type Info = {
        id: string;
        phone?: number;
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

    type Address = {
        id: string;
        user_id: string;
        detail: string;
        city: string;
        postal_code: string;
    }

    type LoginParams = {
        account: string;
        secret: string;
        source: string;
    };

    type Auth = {
        user: IUser.Info | null;
        isAuthenticated: boolean;
        isUserLoading: boolean;
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
        id?: string;
        phone?: number;
        email?: string;
        username?: string;
        password?: string;
    };
}