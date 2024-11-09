import {useGetUserQuery} from "../apiSlice.ts";

export const useUser = () => {
    const { data, error, isLoading }
        = useGetUserQuery();

    const info: IUser.Info = {
        avatar: "",
        cart_id: "",
        created_at: 0,
        email: "",
        favorites: [],
        id: "",
        name: "",
        permissions: [],
        phone: "",
        roles: [],
        username: ""
    };

    const user = data ? data : info;

    return {
        user,
        isLoading,
        error,
    };
};