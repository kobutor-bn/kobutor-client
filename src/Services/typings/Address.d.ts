declare namespace IAddress {
    type Item = {
        id?: string;
        address_id?: string;
        user_id: string;
        detail: string;
        city: string;
        postal_code: string;
    };

    type Create = {
        user_id: string;
        detail: string;
        city: string;
        postal_code: string;
    }

    type Update = {
        id: string;
        user_id: string;
        detail: string;
        city: string;
        postal_code: string;
    }
}